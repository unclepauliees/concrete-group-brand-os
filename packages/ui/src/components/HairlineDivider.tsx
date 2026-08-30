type HairlineDividerProps = {
  strong?: boolean;
  className?: string;
};

export function HairlineDivider({ strong = false, className = "" }: HairlineDividerProps) {
  return <hr className={`${strong ? "border-line-strong" : "border-line"} ${className}`} />;
}
