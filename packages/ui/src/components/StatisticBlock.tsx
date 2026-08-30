type StatisticBlockProps = {
  value: string;
  caption: string;
  className?: string;
};

export function StatisticBlock({ value, caption, className = "" }: StatisticBlockProps) {
  return (
    <div className={className}>
      <div className="font-display text-statistic text-tx">{value}</div>
      <div className="font-label text-label uppercase text-tx3 mt-3">{caption}</div>
    </div>
  );
}
