import { access, readFile } from "node:fs/promises";

const requiredFiles = [
  "dist/index.html",
  "dist/hvac-boot-camp/index.html",
  "dist/how-it-works/index.html",
  "dist/pricing/index.html",
  "dist/try-boot-camp/index.html",
  "dist/unit-1/lesson-1/index.html",
  "dist/media/unit-1/10-heat-flow.mp4",
  "dist/404.html",
  "dist/robots.txt",
  "dist/images/hvac-training-solutions-logo.png",
];

for (const file of requiredFiles) {
  await access(file);
}

const [home, bootCamp, howItWorks, pricing, trial, lesson, robots] = await Promise.all([
  readFile("dist/index.html", "utf8"),
  readFile("dist/hvac-boot-camp/index.html", "utf8"),
  readFile("dist/how-it-works/index.html", "utf8"),
  readFile("dist/pricing/index.html", "utf8"),
  readFile("dist/try-boot-camp/index.html", "utf8"),
  readFile("dist/unit-1/lesson-1/index.html", "utf8"),
  readFile("dist/robots.txt", "utf8"),
]);

const builtPages = [
  ["/", home],
  ["/hvac-boot-camp/", bootCamp],
  ["/how-it-works/", howItWorks],
  ["/pricing/", pricing],
  ["/try-boot-camp/", trial],
  ["/unit-1/lesson-1/", lesson],
];

for (const [route, html] of builtPages) {
  if (!html.includes('name="robots" content="noindex,nofollow"')) {
    throw new Error(`${route} is missing the development noindex directive`);
  }
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

if (!trial.includes("An air conditioner cools a space by removing heat") || !trial.includes("From the air into the coil")) {
  throw new Error("Trial page is missing the current Unit 1 draft concept or check");
}

if (!lesson.includes("78°F") || !lesson.includes("45°F") || !lesson.includes("10-heat-flow.mp4") || !lesson.includes("From the air into the coil")) {
  throw new Error("Lesson 1 is missing its approved example, video, or check");
}

if (!robots.includes("Disallow: /")) {
  throw new Error("dist/robots.txt does not block development crawling");
}

console.log("Verified build routes and development crawler protection.");
