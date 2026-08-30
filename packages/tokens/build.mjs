import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const dir = path.dirname(fileURLToPath(import.meta.url));
const raw = JSON.parse(readFileSync(path.join(dir, "tokens.json"), "utf8"));

const toKebab = (s) => s.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();

// resolve {category.token} references against the raw tree
function resolveRef(ref, tree) {
  const path_ = ref.slice(1, -1).split(".");
  let node = tree;
  for (const key of path_) node = node[key];
  if (node && typeof node === "object" && "value" in node) {
    return resolveValue(node.value, tree);
  }
  throw new Error(`Unresolvable token reference: ${ref}`);
}

function resolveValue(value, tree) {
  if (typeof value === "string" && value.startsWith("{") && value.endsWith("}")) {
    return resolveRef(value, tree);
  }
  return value;
}

// walk the tree, collecting flattened leaves: { cssVarName, value, resolvedTokenPath }
const leaves = [];

function walk(node, pathSegs) {
  if (node && typeof node === "object" && "value" in node) {
    const [category, ...rest] = pathSegs;
    const varName =
      rest.length === 0 ? toKebab(category) : rest.map(toKebab).join("-");
    leaves.push({ varName, value: resolveValue(node.value, raw), tokenPath: pathSegs.join(".") });
    return;
  }
  if (node && typeof node === "object") {
    for (const [k, v] of Object.entries(node)) walk(v, [...pathSegs, k]);
  }
}

for (const [category, subtree] of Object.entries(raw)) {
  walk(subtree, [category]);
}

const cssLines = leaves.map((l) => `  --${l.varName}: ${l.value};`);
const css = `:root {\n${cssLines.join("\n")}\n}\n`;

const flat = {};
for (const l of leaves) flat[l.tokenPath] = { value: l.value, cssVar: `--${l.varName}` };

mkdirSync(path.join(dir, "dist"), { recursive: true });
writeFileSync(path.join(dir, "dist", "tokens.css"), css);
writeFileSync(path.join(dir, "dist", "tokens.resolved.json"), JSON.stringify(flat, null, 2));
writeFileSync(path.join(dir, "dist", "tokens.json"), JSON.stringify(raw, null, 2));

console.log(`tokens: wrote ${leaves.length} CSS custom properties -> dist/tokens.css, dist/tokens.resolved.json`);
