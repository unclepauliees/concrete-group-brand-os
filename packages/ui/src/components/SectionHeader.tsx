import { toRoman } from "../roman";

type SectionHeaderProps = {
  index: number;
  label: string;
  className?: string;
};

/** Roman-numeral section index (I–VII), tracked label, hairline rule. */
export function SectionHeader({ index, label, className = "" }: SectionHeaderProps) {
  return (
    <div className={`flex items-baseline gap-6 ${className}`}>
      <span className="font-display text-display-3 text-gilt-700 shrink-0">{toRoman(index)}</span>
      <span className="font-label text-label uppercase text-tx2 whitespace-nowrap">{label}</span>
      <span className="flex-1 border-t border-line" />
    </div>
  );
}
