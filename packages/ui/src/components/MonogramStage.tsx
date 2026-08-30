type MonogramStageProps = {
  ground?: "bone" | "ink" | "green";
  size?: number;
  showClearspace?: boolean;
  className?: string;
};

const GROUND_BG: Record<NonNullable<MonogramStageProps["ground"]>, string> = {
  bone: "bg-bone",
  ink: "bg-ink",
  green: "bg-green-500",
};

// import.meta.env.BASE_URL, not a hardcoded root-absolute path — a
// root-absolute src breaks under a non-root Vite `base` (e.g. GitHub Pages
// project sites, served from /<repo-name>/).
const base = import.meta.env.BASE_URL;
const MARK_SRC: Record<NonNullable<MonogramStageProps["ground"]>, string> = {
  bone: `${base}logo/monogram-ink.png`,
  ink: `${base}logo/monogram-bone.png`,
  green: `${base}logo/monogram-bone.png`,
};

/** Monogram on its governed ground, with an optional clearspace guide (radius of the ring). */
export function MonogramStage({ ground = "bone", size = 160, showClearspace = false, className = "" }: MonogramStageProps) {
  const clearspace = size * 0.5;
  return (
    <div
      className={`relative flex items-center justify-center ${GROUND_BG[ground]} ${className}`}
      style={{ width: size + clearspace * 2, height: size + clearspace * 2 }}
    >
      {showClearspace && (
        <div
          className="absolute border border-dashed border-gilt-500/60"
          style={{ inset: clearspace * 0.4 }}
        />
      )}
      <img src={MARK_SRC[ground]} alt="The Concrete Group monogram" style={{ width: size, height: size }} className="object-contain" />
    </div>
  );
}
