type RampStripProps = {
  name: string;
  steps?: number[];
  className?: string;
};

export function RampStrip({ name, steps = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900], className = "" }: RampStripProps) {
  return (
    <div className={className}>
      <div className="font-label text-label uppercase text-tx3 mb-2">{name}</div>
      <div className="flex gap-px bg-line">
        {steps.map((step) => (
          <div key={step} className="flex-1 h-16 flex items-end justify-center pb-2" style={{ background: `var(--${name}-${step})` }}>
            <span className="font-label text-[8px] tracking-[.3em] uppercase" style={{ color: step >= 500 ? "var(--bone)" : "var(--ink)" }}>
              {step}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
