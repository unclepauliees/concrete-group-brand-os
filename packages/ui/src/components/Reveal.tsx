import { createElement, useEffect, useRef, useState, type PropsWithChildren, type ElementType } from "react";

type RevealProps = PropsWithChildren<{
  as?: ElementType;
  className?: string;
  delayMs?: number;
}>;

/** Slow, unhurried opacity + translateY reveal on scroll into view. */
export function Reveal({ as: Tag = "div", className = "", delayMs = 0, children }: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return createElement(
    Tag,
    {
      ref,
      className: `tcg-reveal ${className}`,
      style: {
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(var(--reveal-translate))",
        transition: `opacity var(--reveal-duration) var(--e) ${delayMs}ms, transform var(--reveal-duration) var(--e) ${delayMs}ms`,
      },
    },
    children
  );
}
