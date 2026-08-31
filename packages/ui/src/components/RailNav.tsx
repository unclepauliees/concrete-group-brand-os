import { toRoman } from "../roman";
import type { Ground } from "./GroundSection";

type Orientation = "vertical" | "horizontal";

type RailNavProps = {
  sections: string[];
  activeIndex: number;
  onSelect: (index: number) => void;
  ground?: Ground;
  orientation?: Orientation;
  className?: string;
};

// mix-blend-mode: difference was the first approach here — it reads over any
// ground without a themed variant in principle, but Chrome silently drops the
// blend on a fixed-position element once the scrolled content behind it is
// promoted to separate compositing layers (which a long, section-heavy page
// like this one triggers). It rendered as plain unblended color, so bone text
// vanished over a bone ground. Driving color from the known active ground —
// already available from scroll-spy — is deterministic instead of relying on
// a compositing behavior this layout defeats.
const GROUND_TEXT: Record<Ground, string> = {
  bone: "text-ink",
  ink: "text-bone",
  green: "text-bone",
};

// The horizontal (mobile) orientation carries its own solid backdrop, since
// unlike the vertical rail it sits flush against the viewport edge where
// scrolled content can shift underneath it mid-gesture.
const GROUND_BG: Record<Ground, string> = {
  bone: "bg-bone-pure border-line",
  ink: "bg-ink-true border-line-strong",
  green: "bg-green-600 border-line-strong",
};

const CONTAINER: Record<Orientation, string> = {
  vertical: "flex flex-col gap-4",
  horizontal: "flex flex-row items-center justify-center gap-8 border-t px-4 py-3",
};

/** Roman-numeral rail, color driven by the active section's ground. */
export function RailNav({
  sections,
  activeIndex,
  onSelect,
  ground = "bone",
  orientation = "vertical",
  className = "",
}: RailNavProps) {
  const groundClass = orientation === "horizontal" ? `${GROUND_TEXT[ground]} ${GROUND_BG[ground]}` : GROUND_TEXT[ground];

  return (
    <nav className={`${CONTAINER[orientation]} ${groundClass} ${className}`} aria-label="Section navigation">
      {sections.map((label, i) => (
        <button
          key={label}
          onClick={() => onSelect(i)}
          data-active={i === activeIndex}
          aria-label={orientation === "horizontal" ? label : undefined}
          className="tcg-rail-item font-label text-label uppercase flex items-baseline gap-3 text-left bg-transparent border-0 cursor-pointer"
        >
          <span className="w-6 shrink-0">{toRoman(i + 1)}</span>
          {orientation === "vertical" && <span>{label}</span>}
        </button>
      ))}
    </nav>
  );
}
