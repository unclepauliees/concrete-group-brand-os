import type { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "fill" | "line";
};

const BASE =
  "font-label text-label uppercase px-8 py-4 rounded-none transition-colors duration-300 tracking-[.34em]";

// tx/bg (not the ink/bone constants) so a button always contrasts against
// whatever ground it's rendered in, including an inverted ground.
const VARIANTS: Record<NonNullable<ButtonProps["variant"]>, string> = {
  fill: "bg-tx text-bg hover:bg-green-700 hover:text-bone",
  line: "border border-tx text-tx hover:bg-tx hover:text-bg",
};

export function Button({ variant = "fill", className = "", ...props }: ButtonProps) {
  return <button className={`${BASE} ${VARIANTS[variant]} ${className}`} {...props} />;
}
