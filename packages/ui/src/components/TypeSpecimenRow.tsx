type TypeSpecimenRowProps = {
  name: string;
  sample?: string;
  family: "display" | "text" | "label";
  sizeClass: string;
  className?: string;
};

const FAMILY_CLASS: Record<TypeSpecimenRowProps["family"], string> = {
  display: "font-display",
  text: "font-text",
  label: "font-label uppercase",
};

export function TypeSpecimenRow({ name, sample = "The Concrete Group", family, sizeClass, className = "" }: TypeSpecimenRowProps) {
  return (
    <div className={`flex items-baseline gap-8 border-b border-line py-6 ${className}`}>
      <span className="font-label text-label uppercase text-tx3 w-32 shrink-0">{name}</span>
      <span className={`${FAMILY_CLASS[family]} ${sizeClass} text-tx truncate`}>{sample}</span>
    </div>
  );
}
