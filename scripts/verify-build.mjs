import { access, readFile } from "node:fs/promises";

const publicLaunch = ["1", "true"].includes((process.env.MARKETING_PUBLIC_LAUNCH || "").toLowerCase());
const articles = JSON.parse(await readFile("src/data/legacy-articles.json", "utf8"));

const requiredFiles = [
  "dist/index.html",
  "dist/hvac-boot-camp/index.html",
  "dist/how-it-works/index.html",
  "dist/pricing/index.html",
  "dist/try-boot-camp/index.html",
  "dist/resources/index.html",
  "dist/about/index.html",
  "dist/contact/index.html",
  "dist/how-to-learn-hvac/index.html",
  "dist/blog/index.html",
  "dist/nate/index.html",
  "dist/commrecial-refrigeration-hvac-technicians/index.html",
  "dist/hvac-tech-course/index.html",
  "dist/epa-study-and-practice-test/index.html",
  "dist/hvac-training-resource-guide/index.html",
  "dist/privacy/index.html",
  "dist/terms/index.html",
  "dist/refund-policy/index.html",
  "dist/unit-1-prototype/index.html",
  "dist/404.html",
  "dist/robots.txt",
  "dist/_headers",
  "dist/EPA.pdf",
  "dist/images/hvac-training-solutions-logo.png",
];

for (const article of articles) {
  requiredFiles.push(`dist${article.path}index.html`);
}

for (const file of requiredFiles) {
  await access(file);
}

const [home, bootCamp, howItWorks, pricing, trial, resources, about, contact, beginner, blog, nate, refrigeration, oldTechCourse, epaGuide, resourceGuide, privacy, terms, refund, prototype, notFound, robots, headers] = await Promise.all([
  readFile("dist/index.html", "utf8"),
  readFile("dist/hvac-boot-camp/index.html", "utf8"),
  readFile("dist/how-it-works/index.html", "utf8"),
  readFile("dist/pricing/index.html", "utf8"),
  readFile("dist/try-boot-camp/index.html", "utf8"),
  readFile("dist/resources/index.html", "utf8"),
  readFile("dist/about/index.html", "utf8"),
  readFile("dist/contact/index.html", "utf8"),
  readFile("dist/how-to-learn-hvac/index.html", "utf8"),
  readFile("dist/blog/index.html", "utf8"),
  readFile("dist/nate/index.html", "utf8"),
  readFile("dist/commrecial-refrigeration-hvac-technicians/index.html", "utf8"),
  readFile("dist/hvac-tech-course/index.html", "utf8"),
  readFile("dist/epa-study-and-practice-test/index.html", "utf8"),
  readFile("dist/hvac-training-resource-guide/index.html", "utf8"),
  readFile("dist/privacy/index.html", "utf8"),
  readFile("dist/terms/index.html", "utf8"),
  readFile("dist/refund-policy/index.html", "utf8"),
  readFile("dist/unit-1-prototype/index.html", "utf8"),
  readFile("dist/404.html", "utf8"),
  readFile("dist/robots.txt", "utf8"),
  readFile("dist/_headers", "utf8"),
]);

const builtPages = [
  ["/", home],
  ["/hvac-boot-camp/", bootCamp],
  ["/how-it-works/", howItWorks],
  ["/pricing/", pricing],
  ["/try-boot-camp/", trial],
  ["/resources/", resources],
  ["/about/", about],
  ["/contact/", contact],
  ["/how-to-learn-hvac/", beginner],
  ["/blog/", blog],
  ["/nate/", nate],
  ["/commrecial-refrigeration-hvac-technicians/", refrigeration],
  ["/hvac-tech-course/", oldTechCourse],
  ["/epa-study-and-practice-test/", epaGuide],
  ["/hvac-training-resource-guide/", resourceGuide],
  ["/privacy/", privacy],
  ["/terms/", terms],
  ["/refund-policy/", refund],
  ["/unit-1-prototype/", prototype],
];

for (const [route, html] of builtPages) {
  const expected = publicLaunch && !["/unit-1-prototype/", "/hvac-tech-course/"].includes(route) ? "index,follow" : "noindex,nofollow";
  if (!html.includes(`name="robots" content="${expected}"`)) {
    throw new Error(`${route} is missing its ${expected} directive`);
  }
}

for (const article of articles) {
  const html = await readFile(`dist${article.path}index.html`, "utf8");
  const expected = publicLaunch && article.indexable !== false ? "index,follow" : "noindex,nofollow";
  if (!html.includes(`name="robots" content="${expected}"`)) {
    throw new Error(`${article.path} is missing its ${expected} directive`);
  }
  for (const match of html.matchAll(/src="(\/wp-content\/uploads\/[^"?#]+)(?:[?#][^"]*)?"/g)) {
    await access(`dist${match[1]}`);
  }
}

if (!notFound.includes('name="robots" content="noindex,nofollow"')) {
  throw new Error("The 404 page must remain noindex");
}

const internalTargets = new Set();
for (const [, html] of builtPages) {
  for (const match of html.matchAll(/href="(\/[^"]*)"/g)) {
    const target = match[1].split(/[?#]/)[0];
    if (target) internalTargets.add(target);
  }
}

for (const target of internalTargets) {
  const outputPath = target === "/"
    ? "dist/index.html"
    : target.endsWith("/")
      ? `dist${target}index.html`
      : `dist${target}`;
  await access(outputPath);
}

if (!pricing.includes("$479") || !pricing.includes("$97")) {
  throw new Error("Pricing page is missing one or more approved plan prices");
}

for (const plan of ["full", "monthly"]) {
  if (!pricing.includes(`data-checkout-plan="${plan}"`) || !pricing.includes(`data-payment-plan="${plan}"`)) {
    throw new Error(`Pricing is missing the ${plan} checkout and analytics marker`);
  }
}

// Missing media caused earlier recovery regressions: verify the selected
// original prototype's local media, rather than only the generated HTML.
for (const match of prototype.matchAll(/src="(\/media\/[^"?#]+)(?:[?#][^"]*)?"/g)) {
  await access(`dist${match[1]}`);
}

for (const [route, html] of [
  ["/", home],
  ["/hvac-boot-camp/", bootCamp],
  ["/pricing/", pricing],
  ["/try-boot-camp/", trial],
]) {
  if (html.includes('href="/unit-1-prototype/"')) {
    throw new Error(`${route} links the current-course sales journey to the future course prototype`);
  }
}

if (!home.includes('/try-boot-camp/') || !trial.includes('youtube-nocookie.com/embed/27uCRQ3B8r4')) {
  throw new Error("Marketing journey is missing Ron's current teaching sample");
}

if (!trial.includes("27-module Moodle course") || !bootCamp.includes("Moodle")) {
  throw new Error("Marketing journey does not clearly describe the current course delivery");
}

if (!pricing.includes("679 total") || !pricing.includes("textbook")) {
  throw new Error("Pricing must disclose the payment total and separate textbook");
}

if (!resources.includes("EPA.pdf")) {
  throw new Error("Resources page is missing the existing EPA PDF entry point");
}

if (!prototype.includes("boiling-water-demo.mp4") || !prototype.includes("pt-chart.jpg")) {
  throw new Error("The approved Unit 1 prototype is missing its demonstration or PT chart");
}

const pdf = await readFile("dist/EPA.pdf");
if (pdf.length < 100_000 || pdf.subarray(0, 4).toString() !== "%PDF") {
  throw new Error("The preserved EPA PDF is missing or invalid");
}

if (publicLaunch) {
  const sitemap = await readFile("dist/sitemap.xml", "utf8");
  if (!robots.includes("Sitemap: https://www.hvactrainingsolutions.net/sitemap.xml") || !sitemap.includes("/hvac-boot-camp/")) {
    throw new Error("Public robots or sitemap is incomplete");
  }
  if (sitemap.includes("/unit-1-prototype/") || !headers.includes("workers.dev/*")) {
    throw new Error("Development prototype or Worker preview search protection is missing");
  }
  for (const article of articles) {
    const inSitemap = sitemap.includes(`https://www.hvactrainingsolutions.net${article.path}</loc>`);
    if (inSitemap !== (article.indexable !== false)) {
      throw new Error(`${article.path} has an incorrect public sitemap inclusion`);
    }
  }
  for (const html of [home, bootCamp, pricing, trial]) {
    if (!html.includes('/js/marketing-analytics.js')) {
      throw new Error("Public marketing page is missing GA4 loader");
    }
  }
  if ([privacy, terms, refund].some((html) => /Development review|pending approval/i.test(html))) {
    throw new Error("Public policy pages still contain review-only copy");
  }
} else {
  if (!robots.includes("Disallow: /") || !headers.includes("X-Robots-Tag: noindex, nofollow")) {
    throw new Error("Development crawler protection is missing");
  }
  try {
    await access("dist/sitemap.xml");
    throw new Error("Development build should not publish a public sitemap");
  } catch (error) {
    if (error?.code !== "ENOENT") throw error;
  }
  if (home.includes('/js/marketing-analytics.js')) {
    throw new Error("Development traffic must not reach the public GA4 stream");
  }
}

console.log(`Verified ${articles.length} preserved articles, marketing routes, media, pricing, and ${publicLaunch ? "public" : "development"} search controls.`);
