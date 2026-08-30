import { toRoman } from "../roman";
import type { Ground } from "./GroundSection";

type RailNavProps = {
  sections: string[];
  activeIndex: number;
  onSelect: (index: number) => void;
  ground?: Ground;
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

/** Roman-numeral rail, color driven by the active section's ground. */
export function RailNav({ sections, activeIndex, onSelect, ground = "bone", className = "" }: RailNavProps) {
  return (
    <nav className={`flex flex-col gap-4 ${GROUND_TEXT[ground]} ${className}`} aria-label="Section navigation">
      {sections.map((label, i) => (
        <button
          key={label}
          onClick={() => onSelect(i)}
          data-active={i === activeIndex}
          className="tcg-rail-item font-label text-label uppercase flex items-baseline gap-3 text-left bg-transparent border-0 cursor-pointer"
        >
          <span className="w-6 shrink-0">{toRoman(i + 1)}</span>
          <span>{label}</span>
        </button>
      ))}
    </nav>
  );
}
