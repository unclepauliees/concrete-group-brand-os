type EndorsementLockupProps = {
  ground?: "bone" | "ink" | "green";
  className?: string;
};

const GROUND_TX: Record<NonNullable<EndorsementLockupProps["ground"]>, string> = {
  bone: "text-tx2",
  ink: "text-stone-400",
  green: "text-green-100",
};

/**
 * "Offered by / The Concrete Group." The house appears behind the work — the
 * couture label inside the garment, never the logo across the chest.
 */
export function EndorsementLockup({ ground = "bone", className = "" }: EndorsementLockupProps) {
  return (
    <div className={`font-label text-label uppercase ${GROUND_TX[ground]} ${className}`}>
      <div>Offered by</div>
      <div className="mt-1 font-display normal-case italic text-text tracking-normal">
        The Concrete Group
      </div>
    </div>
  );
}
