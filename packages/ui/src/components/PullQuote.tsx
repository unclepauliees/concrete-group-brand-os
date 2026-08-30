import type { PropsWithChildren } from "react";

/** Bodoni italic set between two hairline rules. */
export function PullQuote({ children, className = "" }: PropsWithChildren<{ className?: string }>) {
  return (
    <blockquote className={`tcg-pull-quote text-display-3 text-ink py-8 ${className}`}>
      {children}
    </blockquote>
  );
}
