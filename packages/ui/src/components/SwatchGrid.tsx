type Swatch = { name: string; varName: string; onDark?: boolean };

type SwatchGridProps = {
  swatches: Swatch[];
  className?: string;
};

/** 1px gutters, no radius — colour swatch grid. */
export function SwatchGrid({ swatches, className = "" }: SwatchGridProps) {
  return (
    <div className={`grid grid-cols-2 md:grid-cols-4 gap-px bg-line ${className}`}>
      {swatches.map((s) => (
        <div key={s.varName} className="bg-bone">
          <div className="aspect-square border border-line" style={{ background: `var(${s.varName})` }} />
          <div className="px-3 py-3">
            <div className={`font-label text-label uppercase ${s.onDark ? "text-tx" : "text-tx"}`}>{s.name}</div>
            <div className="font-label text-label uppercase text-tx3 mt-1">{s.varName}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
