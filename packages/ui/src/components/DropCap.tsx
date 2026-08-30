import type { PropsWithChildren } from "react";

/** Editorial opener: 4.6em floated Bodoni initial in gilt via ::first-letter. */
export function DropCap({ children, className = "" }: PropsWithChildren<{ className?: string }>) {
  return <p className={`tcg-drop-cap font-text text-text text-tx ${className}`}>{children}</p>;
}
