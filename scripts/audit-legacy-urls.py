#!/usr/bin/env python3
"""Compare published WordPress URLs and Search Console pages with built routes."""

import argparse
import csv
import io
from pathlib import Path
from urllib.parse import urlparse
import xml.etree.ElementTree as ET
import zipfile

ROOT = Path(__file__).resolve().parents[1]
WP = "{http://wordpress.org/export/1.2/}"
CHECKOUT_BLOCKERS = {
    "/hvac-boot-camp/monthly-plan/", "/hvac-boot-camp/pay-in-full/",
    "/hvac-boot-camp/hvac-boot-camp-payment-option/", "/hvac-boot-camp/course-purchase/",
    "/hvac-boot-camp/boot-camp-self-paced-enrollment-special/",
    "/hvac-boot-camp/boot-camp-monthly-plan-cloned-at-2022-07-11-154924/",
    "/hvac-tech-course-enrollement/",
}
TECHNICAL_PAGE_REVIEW = {
    "/hvac-boot-camp/brazing-lesson-part-1/", "/hvac-boot-camp/brazing-lesson-part-2/",
    "/hvac-boot-camp/brazing-lesson-part-3/", "/hvac-boot-camp/thermistor-snippet/",
}


def next_action(entry, route_status):
    if route_status in {"preserved", "mapped"}:
        return "verify at cutover"
    path = entry["path"]
    if path in CHECKOUT_BLOCKERS:
        return "checkout blocker: retain WordPress payment/enrollment until tested replacement"
    if path in TECHNICAL_PAGE_REVIEW:
        return "review and preserve teaching content or map to approved replacement"
    if entry["type"] == "page":
        return "review old clone, webinar, form, or test page for a redirect or retirement"
    if entry["type"] == "search-only":
        return "restore media or review alias; no clicks in export"
    return "implement or map original article URL"


def path_from_url(url):
    path = urlparse(url).path
    if not path.startswith("/"):
        return None
    return path if path == "/" or "." in Path(path).name else path.rstrip("/") + "/"


def search_pages(gsc_zip):
    with zipfile.ZipFile(gsc_zip) as archive:
        rows = list(csv.DictReader(io.TextIOWrapper(archive.open("Pages.csv"), encoding="utf-8-sig")))
    pages = {}
    for row in rows:
        path = path_from_url(row["Top pages"])
        if path:
            data = pages.setdefault(path, {"clicks": 0, "impressions": 0})
            data["clicks"] += int(row["Clicks"])
            data["impressions"] += int(row["Impressions"])
    return pages


def published_urls(wxr):
    results = []
    for _, node in ET.iterparse(wxr, events=("end",)):
        if node.tag != "item":
            continue
        post_type = node.findtext(WP + "post_type")
        if node.findtext(WP + "status") == "publish" and post_type in {"post", "page"}:
            path = path_from_url(node.findtext("link") or "")
            if path:
                results.append({"type": post_type, "path": path, "title": node.findtext("title") or ""})
        node.clear()
    return results


def redirects():
    result = {}
    file = ROOT / "public" / "_redirects"
    if file.exists():
        for line in file.read_text().splitlines():
            fields = line.split()
            if len(fields) >= 3 and fields[2] in {"301", "308"}:
                result[fields[0]] = fields[1]
    return result


def status(path, redirects):
    target = ROOT / "dist" / (path.lstrip("/") + ("index.html" if path.endswith("/") else ""))
    if target.is_file():
        return "preserved", "same URL"
    redirect = redirects.get(path) or redirects.get(path.rstrip("/"))
    return ("mapped", redirect) if redirect else ("unresolved", "")


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("wxr")
    parser.add_argument("--gsc", required=True)
    args = parser.parse_args()
    if not (ROOT / "dist" / "index.html").exists():
        parser.error("Run npm run build before auditing routes")
    ranking = search_pages(args.gsc)
    mappings = redirects()
    entries = published_urls(args.wxr)
    seen = {entry["path"] for entry in entries}
    for path, data in ranking.items():
        if path not in seen:
            entries.append({"type": "search-only", "path": path, "title": "Not in WXR published posts/pages"})
    rows = []
    for entry in entries:
        path = entry["path"]
        result, target = status(path, mappings)
        traffic = ranking.get(path, {"clicks": 0, "impressions": 0})
        rows.append([entry["type"], path, entry["title"], traffic["clicks"], traffic["impressions"], result, target, next_action(entry, result)])
    rows.sort(key=lambda r: ({"page": 0, "post": 1, "search-only": 2}[r[0]], -r[3], -r[4], r[1]))
    output = ROOT / "docs" / "LEGACY_URL_INVENTORY_2026-09-24.csv"
    with output.open("w", newline="", encoding="utf-8") as file:
        writer = csv.writer(file, lineterminator="\n")
        writer.writerow(["type", "original_path", "title", "gsc_clicks", "gsc_impressions", "status", "destination", "next_action"])
        writer.writerows(rows)
    unresolved = [r for r in rows if r[5] == "unresolved"]
    clicked = [r for r in unresolved if r[3] > 0]
    print(f"{len(rows)} URLs; {len(unresolved)} unresolved, {len(clicked)} with clicks; inventory: {output}")
    for row in clicked:
        print(f"{row[3]} clicks {row[1]}")


if __name__ == "__main__":
    main()
