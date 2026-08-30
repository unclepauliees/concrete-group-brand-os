import type { CSSProperties, PropsWithChildren } from "react";
import { forwardRef } from "react";

export type Ground = "bone" | "ink" | "green";

// Re-declares the semantic layer (bg/surface/tx/tx2/tx3/line/line-strong) per
// ground. Every component in this library reads these same custom property
// names, so nothing downstream needs a "ground" prop of its own to adapt —
// CSS custom property scoping does the inversion. This is what the brief
// means by "dark and green are section grounds, not themes."
const GROUND_VARS: Record<Ground, CSSProperties> = {
  bone: {
    "--bg": "var(--bone)",
    "--surface": "var(--bone-pure)",
    "--tx": "var(--ink)",
    "--tx2": "var(--stone-600)",
    "--tx3": "var(--stone-500)",
    "--line": "var(--stone-300)",
    "--line-strong": "var(--stone-400)",
  } as CSSProperties,
  ink: {
    "--bg": "var(--ink)",
    "--surface": "var(--ink-true)",
    "--tx": "var(--bone)",
    "--tx2": "var(--stone-400)",
    "--tx3": "var(--stone-500)",
    "--line": "var(--stone-700)",
    "--line-strong": "var(--stone-600)",
  } as CSSProperties,
  green: {
    "--bg": "var(--green-500)",
    "--surface": "var(--green-600)",
    "--tx": "var(--bone)",
    "--tx2": "var(--green-100)",
    "--tx3": "var(--green-200)",
    "--line": "var(--green-400)",
    "--line-strong": "var(--green-300)",
  } as CSSProperties,
};

type GroundSectionProps = PropsWithChildren<{
  ground: Ground;
  id?: string;
  className?: string;
}>;

export const GroundSection = forwardRef<HTMLElement, GroundSectionProps>(function GroundSection(
  { ground, id, className = "", children },
  ref
) {
  return (
    <section
      ref={ref}
      id={id}
      data-ground={ground}
      style={{ ...GROUND_VARS[ground], background: "var(--bg)", color: "var(--tx)" }}
      className={className}
    >
      {children}
    </section>
  );
});
