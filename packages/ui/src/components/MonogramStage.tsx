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

const MARK_SRC: Record<NonNullable<MonogramStageProps["ground"]>, string> = {
  bone: "/logo/monogram-ink.png",
  ink: "/logo/monogram-bone.png",
  green: "/logo/monogram-bone.png",
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
