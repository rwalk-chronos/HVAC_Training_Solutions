#!/usr/bin/env python3
"""Preserve published WordPress posts at their original paths.

Run with the site's WXR export and Search Console Pages CSV/ZIP. The generated
JSON and downloaded same-site images are committed; the large WXR is not.
"""

import argparse
import csv
import html
from html.parser import HTMLParser
import io
import json
from pathlib import Path
import re
from concurrent.futures import ThreadPoolExecutor, as_completed
import urllib.parse
import urllib.request
import xml.etree.ElementTree as ET
import zipfile


ROOT = Path(__file__).resolve().parents[1]
WP = "{http://wordpress.org/export/1.2/}"
CONTENT = "{http://purl.org/rss/1.0/modules/content/}"
DC = "{http://purl.org/dc/elements/1.1/}"
SITE_HOSTS = {"hvactrainingsolutions.net", "www.hvactrainingsolutions.net"}
LINK_HOSTS = SITE_HOSTS | {
    "www.youtube.com", "youtube.com", "youtu.be", "www.epa.gov", "epa.gov",
    "www.natex.org", "natex.org", "www.bls.gov", "www.ahrinet.org",
    "www.lennox.com", "www.goodmanmfg.com", "en.wikipedia.org",
}
# Links inside old posts can point to checkout, webinar, and WordPress routes
# that will not exist after cutover. Point these to a working relevant page.
LEGACY_LINK_MAP = {
    "/download-2/": "/resources/",
    "/hvac-training-videos/video-page/": "/try-boot-camp/",
    "/enroll-now/": "/pricing/",
    "/hvac-tech-course/": "/hvac-boot-camp/",
    "/namaste-course/nate-study-course-coreheat-pump/": "/nate/",
    "/contact-us/": "/contact/",
    "/sign-up/": "/pricing/",
    "/product/hvac-technician-course-2/": "/pricing/",
    "/3-home/become-2/": "/hvac-boot-camp/",
    "/3-home/commrecial-refrigeration-hvac-technicians/": "/commrecial-refrigeration-hvac-technicians/",
    "/hvac-certification-course-cirriculum/": "/hvac-boot-camp/",
    "/boot-camp-webinar-registration/": "/try-boot-camp/",
}
# High-confidence thin or obsolete pages remain available at their old URLs,
# but should not enter the public sitemap until a human editorial review.
# Substantive technical posts remain indexable irrespective of short GSC data.
NOINDEX_PATHS = {
    "/refrigeration-cycle-part-1-video/",
    "/hvac-training-video-condenser/",
    "/3-phase-voltage-unbalance/",
    "/hvac-simulator-hvac-training/",
    "/hvac-training-video-lesson-compressor/",
    "/txv-operation-video/",
    "/module-review-posted/",
    "/free-hvac-training-testing-a-dual-capacitor/",
    "/hvac-training-survey/",
    "/hvac-schematics-contactors/",
    "/online-classroom-tour/",
    "/hvac-training-video-basic-pipe-preparation/",
    "/video-intro-to-oxyacetylene-torches/",
    "/free-hvac-training-schematic-diagrams/",
    "/commercial-refrigeration-classes/",
    "/awesome-day-hvac-training/",
    "/dont-forget-our-google-hangout-tonight-800-pm-est/",
    "/attn-contractors-need-help/",
    "/coming-soon-hvactraining-tv/",
    "/new-hvac-boot-camp/",
}
MEDIA_TYPES = {".png", ".jpg", ".jpeg", ".gif", ".webp", ".pdf"}
TAGS = {
    "p", "br", "hr", "h2", "h3", "h4", "h5", "strong", "b", "em", "i", "u",
    "ul", "ol", "li", "blockquote", "pre", "code", "table", "thead", "tbody",
    "tr", "th", "td", "figure", "figcaption", "a", "img", "div", "span",
    "sup", "sub", "dl", "dt", "dd",
}
BLOCKS = {"p", "h2", "h3", "h4", "h5", "ul", "ol", "li", "blockquote", "pre", "td", "th", "figcaption"}
SKIP = {"script", "style", "form", "button", "select", "textarea", "svg", "noscript", "object"}
VOID = {"br", "hr", "img"}


def media_path(value):
    parsed = urllib.parse.urlparse(html.unescape(value or ""))
    if parsed.hostname not in SITE_HOSTS or not parsed.path.startswith("/wp-content/uploads/"):
        return None
    path = urllib.parse.unquote(parsed.path)
    if ".." in Path(path).parts or Path(path).suffix.lower() not in MEDIA_TYPES:
        return None
    return path


def safe_link(value):
    value = html.unescape(value or "").strip()
    parsed = urllib.parse.urlparse(value)
    if value.startswith("#"):
        return value
    if parsed.scheme not in {"http", "https"} or parsed.hostname not in LINK_HOSTS:
        return None
    if parsed.hostname in SITE_HOSTS:
        path = urllib.parse.quote(urllib.parse.unquote(parsed.path), safe="/-._~%")
        if not path.endswith("/") and not Path(path).suffix:
            path += "/"
        path = LEGACY_LINK_MAP.get(path, path)
        return path + ("#" + parsed.fragment if parsed.fragment else "")
    return value


class ArticleHTML(HTMLParser):
    def __init__(self, available_media=None):
        super().__init__(convert_charrefs=True)
        self.available_media = available_media
        self.output = []
        self.stack = []
        self.skip_depth = 0
        self.media = set()
        self.missing = set()

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if self.skip_depth:
            if tag in SKIP or tag == "iframe":
                self.skip_depth += 1
            return
        if tag in SKIP:
            self.skip_depth = 1
            return
        if tag == "iframe":
            src = attrs.get("src", "")
            url = safe_link(src if src.startswith("http") else "https:" + src if src.startswith("//") else "")
            if url and urllib.parse.urlparse(url).hostname in {"www.youtube.com", "youtube.com", "youtu.be"}:
                self.output.append('<p><a href="' + html.escape(url, quote=True) + '" rel="noopener noreferrer">Watch the archived video on YouTube</a></p>')
            self.skip_depth = 1
            return
        if tag not in TAGS:
            return
        if tag == "img":
            path = media_path(attrs.get("src"))
            if path:
                self.media.add(path)
            if path and (self.available_media is None or path in self.available_media):
                alt = html.escape(attrs.get("alt") or "Article image", quote=True)
                self.output.append(f'<img src="{html.escape(path, quote=True)}" alt="{alt}" loading="lazy">')
            elif path:
                self.missing.add(path)
                self.output.append('<span class="archive-missing-image">Original article image pending transfer</span>')
            return
        if tag == "a":
            linked_media = media_path(attrs.get("href"))
            if linked_media:
                self.media.add(linked_media)
            href = safe_link(attrs.get("href"))
            if linked_media and self.available_media is not None and linked_media not in self.available_media:
                href = None
            if href:
                self.output.append('<a href="' + html.escape(href, quote=True) + '"' + (' rel="noopener noreferrer"' if href.startswith("http") else "") + ">")
                self.stack.append((tag, "a"))
            else:
                self.stack.append((tag, ""))
            return
        extra = ""
        if tag == "ol" and (attrs.get("start") or "").isdigit():
            extra = ' start="' + attrs["start"] + '"'
        if tag in {"th", "td"}:
            scope = attrs.get("scope")
            if scope in {"row", "col"}:
                extra = ' scope="' + scope + '"'
        self.output.append(f"<{tag}{extra}>")
        if tag not in VOID:
            self.stack.append((tag, tag))

    def handle_startendtag(self, tag, attrs):
        self.handle_starttag(tag, attrs)

    def handle_endtag(self, tag):
        if self.skip_depth:
            if tag in SKIP or tag == "iframe":
                self.skip_depth -= 1
            return
        if tag not in TAGS or tag in VOID:
            return
        for idx in range(len(self.stack) - 1, -1, -1):
            if self.stack[idx][0] == tag:
                actual = self.stack.pop(idx)[1]
                if actual:
                    self.output.append(f"</{actual}>")
                break

    def handle_data(self, data):
        if self.skip_depth:
            return
        if not data.strip():
            self.output.append("\n")
            return
        if not any(tag in BLOCKS for tag, _ in self.stack):
            data = re.sub(r"\n\s*\n+", "\n\n", data)
            parts = data.split("\n\n")
            for idx, part in enumerate(parts):
                if idx:
                    self.output.append("<br><br>")
                self.output.append(html.escape(part))
        else:
            self.output.append(html.escape(data))

    def result(self):
        # These are WordPress editing shortcodes, not lesson prose.
        text = "".join(self.output)
        return re.sub(r"\[(?:/?(?:vc_|et_|caption|gallery|embed|video|audio)[^\]]*)\]", "", text, flags=re.I)


def read_gsc(path):
    if not path:
        return {}
    if path.endswith(".zip"):
        archive = zipfile.ZipFile(path)
        rows = csv.DictReader(io.TextIOWrapper(archive.open("Pages.csv"), encoding="utf-8-sig"))
    else:
        rows = csv.DictReader(open(path, encoding="utf-8-sig", newline=""))
    ranking = {}
    for row in rows:
        parsed = urllib.parse.urlparse(row["Top pages"])
        p = parsed.path.rstrip("/") + "/" if parsed.path != "/" else "/"
        clicks = int(row["Clicks"])
        old = ranking.get(p, {"clicks": 0, "impressions": 0})
        ranking[p] = {"clicks": old["clicks"] + clicks, "impressions": old["impressions"] + int(row["Impressions"])}
    return ranking


def fetch_asset(path):
    dest = ROOT / "public" / path.lstrip("/")
    if dest.is_file():
        return path, None
    url = "https://www.hvactrainingsolutions.net" + urllib.parse.quote(path, safe="/-._~%")
    req = urllib.request.Request(url, headers={"User-Agent": "HVACTrainingSolutions migration/1.0"})
    try:
        with urllib.request.urlopen(req, timeout=25) as response:
            content_type = response.headers.get_content_type()
            if content_type not in {"image/png", "image/jpeg", "image/gif", "image/webp", "application/pdf"}:
                return path, "Unexpected MIME type: " + content_type
            data = response.read(8 * 1024 * 1024 + 1)
            if len(data) > 8 * 1024 * 1024:
                return path, "Larger than 8 MB"
        dest.parent.mkdir(parents=True, exist_ok=True)
        dest.write_bytes(data)
        return path, None
    except Exception as exc:
        return path, str(exc)


def load_posts(path):
    posts = []
    for _, item in ET.iterparse(path, events=("end",)):
        if item.tag != "item":
            continue
        if item.findtext(WP + "post_type") == "post" and item.findtext(WP + "status") == "publish":
            post_path = urllib.parse.urlparse(item.findtext("link") or "").path
            if post_path.startswith("/") and post_path.endswith("/"):
                body = item.findtext(CONTENT + "encoded") or ""
                meta = {node.findtext(WP + "meta_key"): node.findtext(WP + "meta_value") or "" for node in item.findall(WP + "postmeta")}
                collector = ArticleHTML()
                collector.feed(body)
                categories = [c.text for c in item.findall("category") if c.attrib.get("domain") == "category" and c.text and c.text != "Uncategorized"]
                posts.append({
                    "title": item.findtext("title") or "HVAC article", "path": post_path,
                    "body": body, "date": (item.findtext(WP + "post_date") or "")[:10],
                    "author": item.findtext(DC + "creator") or "Ron Walker",
                    "category": categories[0] if categories else "HVAC technical guide",
                    "description": meta.get("_yoast_wpseo_metadesc", ""),
                    "media": sorted(collector.media),
                })
        item.clear()
    return posts


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("wxr", help="WordPress WXR export XML")
    parser.add_argument("--gsc", help="Search Console Pages CSV or export ZIP")
    parser.add_argument("--fetch-media", action="store_true", help="Copy referenced same-site assets")
    args = parser.parse_args()
    posts = load_posts(args.wxr)
    ranking = read_gsc(args.gsc)
    paths = sorted({p for post in posts for p in post["media"]})
    errors = {}
    if args.fetch_media:
        with ThreadPoolExecutor(max_workers=10) as pool:
            for future in as_completed([pool.submit(fetch_asset, p) for p in paths]):
                p, error = future.result()
                if error:
                    errors[p] = error
    available = {p for p in paths if (ROOT / "public" / p.lstrip("/")).is_file()}
    errors = {p: errors.get(p, "Referenced in WXR but not available in the local media copy") for p in paths if p not in available}
    output = []
    for post in posts:
        renderer = ArticleHTML(available)
        renderer.feed(post.pop("body"))
        post["html"] = renderer.result()
        post["missingMedia"] = sorted(renderer.missing)
        post["gsc"] = ranking.get(post["path"], {"clicks": 0, "impressions": 0})
        post["indexable"] = post["path"] not in NOINDEX_PATHS
        if not post["description"]:
            post["description"] = re.sub(r"\s+", " ", html.unescape(re.sub("<[^>]+>", " ", post["html"]))).strip()[:155]
        output.append(post)
    output.sort(key=lambda p: (-p["gsc"]["clicks"], -p["gsc"]["impressions"], p["path"]))
    assert all(post["gsc"]["clicks"] == 0 for post in output if not post["indexable"]), "A noindex candidate earned recent clicks; review manually"
    data_dir = ROOT / "src" / "data"
    data_dir.mkdir(exist_ok=True)
    (data_dir / "legacy-articles.json").write_text(json.dumps(output, ensure_ascii=False, indent=2) + "\n")
    (ROOT / "docs" / "LEGACY_MEDIA_GAPS.json").write_text(json.dumps(errors, indent=2) + "\n")
    print(f"Imported {len(output)} posts, {len(available)}/{len(paths)} same-site media assets; {len(errors)} download errors")


if __name__ == "__main__":
    main()
