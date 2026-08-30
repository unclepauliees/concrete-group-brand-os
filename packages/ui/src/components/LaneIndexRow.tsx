type LaneIndexRowProps = {
  label: string;
  value: string;
  className?: string;
};

/** Tracked label on the left, Bodoni italic value on the right, hairline beneath. */
export function LaneIndexRow({ label, value, className = "" }: LaneIndexRowProps) {
  return (
    <div className={`flex items-baseline justify-between border-b border-line py-4 ${className}`}>
      <span className="font-label text-label uppercase text-tx3">{label}</span>
      <span className="font-display italic text-display-3 text-ink">{value}</span>
    </div>
  );
}
