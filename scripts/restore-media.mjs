import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";

const manifest = JSON.parse(await readFile("media-source/manifest.json", "utf8"));

for (const { destination, sha256, parts } of manifest) {
  let existing;
  try { existing = await readFile(destination); } catch { /* Restore missing output. */ }
  if (existing && createHash("sha256").update(existing).digest("hex") === sha256) continue;

  const chunks = await Promise.all(parts.map((part) => readFile(join("media-source", part))));
  const restored = Buffer.concat(chunks);
  const actual = createHash("sha256").update(restored).digest("hex");
  if (actual !== sha256) throw new Error(`Media integrity check failed for ${destination}`);
  await mkdir(dirname(destination), { recursive: true });
  await writeFile(destination, restored);
}
