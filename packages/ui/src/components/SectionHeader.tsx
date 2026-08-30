import { toRoman } from "../roman";

type SectionHeaderProps = {
  index: number;
  label: string;
  ground?: "bone" | "ink" | "green";
  className?: string;
};

// No single gilt shade clears AA on all three grounds (computed: gilt-500 on
// green-500 is 2.74:1). Pick per-ground so the numeral always clears AA-normal.
const NUMERAL_GILT: Record<NonNullable<SectionHeaderProps["ground"]>, string> = {
  bone: "text-gilt-700",
  ink: "text-gilt-500",
  green: "text-gilt-200",
};

/**
 * Roman-numeral section index (I–VII), tracked label, hairline rule.
 * The label is a real <h2> — a purely visual numeral+span pairing here
 * left the site with zero heading elements, so a screen reader's heading
 * outline was empty despite the page reading as seven clear sections.
 */
export function SectionHeader({ index, label, ground = "bone", className = "" }: SectionHeaderProps) {
  return (
    <div className={`flex items-baseline gap-6 ${className}`}>
      <span aria-hidden className={`font-display text-display-3 shrink-0 ${NUMERAL_GILT[ground]}`}>
        {toRoman(index)}
      </span>
      <h2 className="font-label text-label uppercase text-tx2 whitespace-nowrap m-0">{label}</h2>
      <span className="flex-1 border-t border-line" />
    </div>
  );
}
