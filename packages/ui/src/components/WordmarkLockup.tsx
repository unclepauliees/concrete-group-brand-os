import { createElement, type ElementType } from "react";

type WordmarkLockupProps = {
  ground?: "bone" | "ink" | "green";
  as?: ElementType;
  className?: string;
};

const GROUND_TX: Record<NonNullable<WordmarkLockupProps["ground"]>, string> = {
  bone: "text-ink",
  ink: "text-bone",
  green: "text-bone",
};

/**
 * italic "the" + roman "CONCRETE" + Jost "Group" at .62em tracking, indented
 * .62em to correct optical centring under the wider word above it. Renders
 * as a plain div by default; pass as="h1" where this lockup is the page's
 * actual title (the cover) so it participates in the heading outline —
 * Tailwind's preflight zeroes heading margin/size, so the swap is visually
 * silent.
 */
export function WordmarkLockup({ ground = "bone", as = "div", className = "" }: WordmarkLockupProps) {
  return createElement(
    as,
    { className: `font-display leading-none ${GROUND_TX[ground]} ${className}` },
    <div className="text-display-3">
      <span className="italic">the</span>{" "}
      <span className="not-italic tracking-[.02em]">CONCRETE</span>
    </div>,
    <div
      className="font-label text-label-active font-extralight uppercase mt-2"
      style={{ letterSpacing: ".62em", textIndent: ".62em" }}
    >
      Group
    </div>
  );
}
