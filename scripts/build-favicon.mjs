import sharp from "sharp";
import { mkdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const dir = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(dir, "..");
const mark = path.join(root, "assets/logo/generated/monogram-ink.png");
const outDir = path.join(root, "apps/guidelines/public");
mkdirSync(outDir, { recursive: true });

const BONE_PURE = { r: 0xfb, g: 0xfa, b: 0xf6 };

// The monogram governs "avatar, stamp, label, favicon" as one of its approved
// uses — ink mark on bone is one of the three approved grounds. Padding here
// mirrors the clearspace rule (>= ring radius) at favicon scale.
async function buildFavicon(size, outName, paddingRatio = 0.14) {
  const inner = Math.round(size * (1 - paddingRatio * 2));
  const markBuffer = await sharp(mark).resize(inner, inner, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } }).toBuffer();

  await sharp({
    create: { width: size, height: size, channels: 3, background: BONE_PURE },
  })
    .composite([{ input: markBuffer, gravity: "center" }])
    .png()
    .toFile(path.join(outDir, outName));
}

await buildFavicon(32, "favicon-32.png");
await buildFavicon(180, "apple-touch-icon.png", 0.16);
await buildFavicon(512, "favicon-512.png");

console.log("favicon: wrote favicon-32.png, apple-touch-icon.png, favicon-512.png -> apps/guidelines/public/");
