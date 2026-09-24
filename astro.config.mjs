import { defineConfig } from "astro/config";
import { readFile, readdir, writeFile } from "node:fs/promises";
import { join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { marketingLaunchConfig } from "./src/lib/marketing-launch.mjs";

const site = "https://www.hvactrainingsolutions.net";
const { isPublicLaunch } = marketingLaunchConfig(process.env);

// Static Workers assets use the same build on workers.dev and a custom domain.
// Keep the workers.dev preview noindex even after the public domain is launched.
const workersPreviewHeader = "https://:version.:subdomain.workers.dev/*\n  X-Robots-Tag: noindex, nofollow\n";

async function indexablePaths(outputDirectory) {
  const urls = [];

  async function visit(directory) {
    for (const entry of await readdir(directory, { withFileTypes: true })) {
      const path = join(directory, entry.name);
      if (entry.isDirectory()) {
        await visit(path);
      } else if (entry.name === "index.html") {
        const html = await readFile(path, "utf8");
        if (!html.includes('name="robots" content="index,follow"')) continue;
        const route = `/${relative(outputDirectory, directory).split("\\").join("/")}/`.replace(/^\/\/$/, "/");
        if (route !== "/unit-1-prototype/") urls.push(route);
      }
    }
  }

  await visit(outputDirectory);
  return urls.sort();
}

function searchAssets() {
  return {
    name: "marketing-launch-search-assets",
    hooks: {
      "astro:build:done": async ({ dir }) => {
        const outputDirectory = fileURLToPath(dir);
        if (!isPublicLaunch) {
          await writeFile(join(outputDirectory, "robots.txt"), "User-agent: *\nDisallow: /\n");
          await writeFile(join(outputDirectory, "_headers"), "/*\n  X-Robots-Tag: noindex, nofollow\n");
          return;
        }

        for (const policy of ["privacy", "terms", "refund-policy"]) {
          const html = await readFile(join(outputDirectory, policy, "index.html"), "utf8");
          if (/development review|pending approval|before (?:the )?public launch|must be approved before/i.test(html)) {
            throw new Error(`The /${policy}/ policy is still a development draft; public marketing build refused.`);
          }
        }

        const routes = await indexablePaths(outputDirectory);
        if (!routes.includes("/") || !routes.includes("/hvac-boot-camp/")) {
          throw new Error("Public sitemap is missing an essential marketing page.");
        }

        const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${routes.map((route) => `  <url><loc>${new URL(route, site).href}</loc></url>`).join("\n")}\n</urlset>\n`;
        await writeFile(join(outputDirectory, "sitemap.xml"), sitemap);
        await writeFile(join(outputDirectory, "robots.txt"), `User-agent: *\nAllow: /\nSitemap: ${site}/sitemap.xml\n`);
        await writeFile(join(outputDirectory, "_headers"), `${workersPreviewHeader}\n/unit-1-prototype/*\n  X-Robots-Tag: noindex, nofollow\n`);
      },
    },
  };
}

export default defineConfig({
  site,
  trailingSlash: "always",
  integrations: [searchAssets()],
});
