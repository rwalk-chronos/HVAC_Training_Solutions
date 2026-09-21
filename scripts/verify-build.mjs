import { access, readFile } from "node:fs/promises";

const requiredFiles = [
  "dist/index.html",
  "dist/hvac-boot-camp/index.html",
  "dist/404.html",
  "dist/robots.txt",
];

for (const file of requiredFiles) {
  await access(file);
}

const [home, bootCamp, robots] = await Promise.all([
  readFile("dist/index.html", "utf8"),
  readFile("dist/hvac-boot-camp/index.html", "utf8"),
  readFile("dist/robots.txt", "utf8"),
]);

for (const [route, html] of [
  ["/", home],
  ["/hvac-boot-camp/", bootCamp],
]) {
  if (!html.includes('name="robots" content="noindex,nofollow"')) {
    throw new Error(`${route} is missing the development noindex directive`);
  }
}

if (!robots.includes("Disallow: /")) {
  throw new Error("dist/robots.txt does not block development crawling");
}

console.log("Verified build routes and development crawler protection.");
