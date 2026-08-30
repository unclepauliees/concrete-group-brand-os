import { cpSync, mkdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const dir = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(dir, "..");
const src = path.join(root, "assets/logo/generated");
const dest = path.join(root, "apps/guidelines/public/logo");

mkdirSync(dest, { recursive: true });
cpSync(src, dest, { recursive: true });
console.log("logo: synced assets/logo/generated -> apps/guidelines/public/logo");
