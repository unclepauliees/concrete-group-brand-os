import sharp from "sharp";
import { mkdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const dir = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(dir, "..");
const source = path.join(root, "assets/logo/source/TCG_Logo_No_Background.png");
const outDir = path.join(root, "assets/logo/generated");
mkdirSync(outDir, { recursive: true });

const INK = { r: 0x14, g: 0x14, b: 0x12 };
const BONE = { r: 0xf7, g: 0xf4, b: 0xed };

// Both approved source files turn out to already carry a real alpha channel
// (transparent ground, ~254-alpha mark) rather than the flattened near-white
// ground the brief assumed. Recoloring onto that existing alpha preserves its
// anti-aliased edges; re-deriving alpha from luminance produced a muddier
// blend on dark grounds, so that path was dropped in favor of this one.
async function buildMaster(color, outName) {
  const { data, info } = await sharp(source)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;
  const out = Buffer.alloc(width * height * 4);

  for (let i = 0; i < width * height; i++) {
    const alpha = data[i * channels + 3];

    out[i * 4] = color.r;
    out[i * 4 + 1] = color.g;
    out[i * 4 + 2] = color.b;
    out[i * 4 + 3] = alpha;
  }

  await sharp(out, { raw: { width, height, channels: 4 } })
    .png()
    .trim()
    .toFile(path.join(outDir, outName));
}

await buildMaster(INK, "monogram-ink.png");
await buildMaster(BONE, "monogram-bone.png");

console.log("logo: wrote monogram-ink.png (for bone grounds) and monogram-bone.png (for ink/green grounds) -> assets/logo/generated/");
