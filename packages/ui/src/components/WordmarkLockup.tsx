type WordmarkLockupProps = {
  ground?: "bone" | "ink" | "green";
  className?: string;
};

const GROUND_TX: Record<NonNullable<WordmarkLockupProps["ground"]>, string> = {
  bone: "text-ink",
  ink: "text-bone",
  green: "text-bone",
};

/**
 * italic "the" + roman "CONCRETE" + Jost "Group" at .62em tracking, indented
 * .62em to correct optical centring under the wider word above it.
 */
export function WordmarkLockup({ ground = "bone", className = "" }: WordmarkLockupProps) {
  return (
    <div className={`font-display leading-none ${GROUND_TX[ground]} ${className}`}>
      <div className="text-display-3">
        <span className="italic">the</span>{" "}
        <span className="not-italic tracking-[.02em]">CONCRETE</span>
      </div>
      <div
        className="font-label text-label-active font-extralight uppercase mt-2"
        style={{ letterSpacing: ".62em", textIndent: ".62em" }}
      >
        Group
      </div>
    </div>
  );
}
