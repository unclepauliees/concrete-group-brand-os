type PageLinkProps = {
  href: string;
  children: string;
  className?: string;
};

/** Fixed UI chrome, same stable bone-pure chip as ThemeToggle — the two other
 * pages in this system (guidelines site, applications gallery) need to be
 * discoverable from each other without guessing the URL. */
export function PageLink({ href, children, className = "" }: PageLinkProps) {
  return (
    <a
      href={href}
      className={`font-label text-label uppercase tracking-[.34em] bg-bone-pure text-ink border border-ink px-5 py-3 rounded-none hover:bg-ink hover:text-bone-pure transition-colors duration-300 inline-block ${className}`}
    >
      {children}
    </a>
  );
}
