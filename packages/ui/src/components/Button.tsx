import type { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "fill" | "line";
};

const BASE =
  "font-label text-label uppercase px-8 py-4 rounded-none transition-colors duration-300 tracking-[.34em]";

const VARIANTS: Record<NonNullable<ButtonProps["variant"]>, string> = {
  fill: "bg-ink text-bone hover:bg-green-700",
  line: "border border-ink text-ink hover:bg-ink hover:text-bone",
};

export function Button({ variant = "fill", className = "", ...props }: ButtonProps) {
  return <button className={`${BASE} ${VARIANTS[variant]} ${className}`} {...props} />;
}
