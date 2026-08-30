import type { PropsWithChildren } from "react";

/** Two-column editorial body flow. */
export function TwoColumnBody({ children, className = "" }: PropsWithChildren<{ className?: string }>) {
  return (
    <div className={`font-text text-text text-tx columns-1 md:columns-2 gap-12 [column-rule:1px_solid_var(--line)] ${className}`}>
      {children}
    </div>
  );
}
