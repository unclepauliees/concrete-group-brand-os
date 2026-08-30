type ThemeToggleProps = {
  dark: boolean;
  onToggle: () => void;
  className?: string;
};

/**
 * Fixed UI chrome, not editorial content — unlike RailNav it never needs to
 * read against a shifting ground, so it carries its own stable bone-pure
 * chip instead of inheriting --tx. Labels the version it switches TO.
 */
export function ThemeToggle({ dark, onToggle, className = "" }: ThemeToggleProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={dark}
      className={`font-label text-label uppercase tracking-[.34em] bg-bone-pure text-ink border border-ink px-5 py-3 rounded-none hover:bg-ink hover:text-bone-pure transition-colors duration-300 ${className}`}
    >
      {dark ? "Light" : "Dark"}
    </button>
  );
}
