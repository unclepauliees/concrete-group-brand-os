/** WCAG 2.1 relative-luminance contrast, computed against the resolved CSS
 * custom property values in the DOM — never against a hardcoded hex table,
 * so this audit can never silently drift from the token source. */
function resolveVar(varName: string): string {
  const probe = document.createElement("div");
  probe.style.color = `var(${varName})`;
  probe.style.position = "absolute";
  probe.style.visibility = "hidden";
  document.body.appendChild(probe);
  const resolved = getComputedStyle(probe).color;
  document.body.removeChild(probe);
  return resolved;
}

function relativeLuminance(rgb: string): number {
  const match = rgb.match(/\d+(\.\d+)?/g);
  if (!match) return 0;
  const [r, g, b] = match.slice(0, 3).map(Number).map((c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

export function contrastRatio(varA: string, varB: string): number {
  const la = relativeLuminance(resolveVar(varA));
  const lb = relativeLuminance(resolveVar(varB));
  const lighter = Math.max(la, lb);
  const darker = Math.min(la, lb);
  return (lighter + 0.05) / (darker + 0.05);
}

export type ContrastVerdict = "AA (normal)" | "AA (large only)" | "fail";

export function verdict(ratio: number): ContrastVerdict {
  if (ratio >= 4.5) return "AA (normal)";
  if (ratio >= 3) return "AA (large only)";
  return "fail";
}
