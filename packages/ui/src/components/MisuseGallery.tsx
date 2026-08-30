import type { CSSProperties } from "react";

type MisuseCase = { label: string; style: CSSProperties };

const CASES: MisuseCase[] = [
  { label: "Recolour", style: { filter: "sepia(1) saturate(6) hue-rotate(320deg)" } },
  { label: "Distort", style: { transform: "scaleX(1.6)" } },
  { label: "Low opacity", style: { opacity: 0.25 } },
  { label: "Rotate", style: { transform: "rotate(18deg)" } },
];

/** No off-brand color introduced for the "wrong" mark — the violation itself
 * (a sepia/hue-rotate filter, a skew, faded opacity, a tilt) is the point;
 * the strike is drawn in ink/gilt like everything else in the system. */
export function MisuseGallery({ className = "" }: { className?: string }) {
  return (
    <div className={`grid grid-cols-2 md:grid-cols-4 gap-px bg-line ${className}`}>
      {CASES.map((c) => (
        <div key={c.label} className="bg-bone-pure p-8 flex flex-col items-center gap-6">
          <div className="relative w-24 h-24 flex items-center justify-center">
            <img
              src={`${import.meta.env.BASE_URL}logo/monogram-ink.png`}
              alt=""
              aria-hidden
              className="w-full h-full object-contain"
              style={c.style}
            />
            <span
              className="absolute inset-0 border-t border-gilt-700"
              style={{ transform: "rotate(45deg)", transformOrigin: "center" }}
            />
          </div>
          <span className="font-label text-label uppercase text-tx3">{c.label}</span>
        </div>
      ))}
    </div>
  );
}
