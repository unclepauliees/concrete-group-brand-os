import { toRoman } from "../roman";

type RailNavProps = {
  sections: string[];
  activeIndex: number;
  onSelect: (index: number) => void;
  className?: string;
};

/** Roman-numeral rail. mix-blend-mode: difference reads over any ground without a themed variant. */
export function RailNav({ sections, activeIndex, onSelect, className = "" }: RailNavProps) {
  return (
    <nav className={`flex flex-col gap-4 ${className}`} aria-label="Section navigation">
      {sections.map((label, i) => (
        <button
          key={label}
          onClick={() => onSelect(i)}
          data-active={i === activeIndex}
          className="tcg-rail-item font-label text-label uppercase flex items-baseline gap-3 text-left bg-transparent border-0 cursor-pointer"
        >
          <span className="w-6 shrink-0">{toRoman(i + 1)}</span>
          <span>{label}</span>
        </button>
      ))}
    </nav>
  );
}
