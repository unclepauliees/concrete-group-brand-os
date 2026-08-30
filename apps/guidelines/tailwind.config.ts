import type { Config } from "tailwindcss";

// Every value below is a var(--token) reference into packages/tokens — never a
// literal hex, px, or font name. Tailwind is a utility surface on top of the
// token layer, not a second source of truth.
const ramp = (name: string) =>
  Object.fromEntries(
    [50, 100, 200, 300, 400, 500, 600, 700, 800, 900].map((step) => [
      step,
      `var(--${name}-${step})`,
    ])
  );

export default {
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx}",
    "../../packages/ui/src/**/*.{ts,tsx}",
  ],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      ink: "var(--ink)",
      "ink-true": "var(--ink-true)",
      bone: "var(--bone)",
      "bone-pure": "var(--bone-pure)",
      green: { DEFAULT: "var(--green)", ...ramp("green") },
      gilt: { DEFAULT: "var(--gilt)", ...ramp("gilt") },
      stone: {
        ...ramp("stone"),
        950: "var(--stone-950)",
      },
      bg: "var(--bg)",
      surface: "var(--surface)",
      tx: "var(--tx)",
      tx2: "var(--tx2)",
      tx3: "var(--tx3)",
      line: "var(--line)",
      "line-strong": "var(--line-strong)",
    },
    fontFamily: {
      display: "var(--f-display)",
      text: "var(--f-text)",
      label: "var(--f-label)",
    },
    fontSize: {
      "display-1": [
        "var(--display-1-font-size)",
        { lineHeight: "var(--display-1-line-height)", letterSpacing: "var(--display-1-letter-spacing)" },
      ],
      "display-2": [
        "var(--display-2-font-size)",
        { lineHeight: "var(--display-2-line-height)", letterSpacing: "var(--display-2-letter-spacing)" },
      ],
      "display-3": [
        "var(--display-3-font-size)",
        { lineHeight: "var(--display-3-line-height)", letterSpacing: "var(--display-3-letter-spacing)" },
      ],
      statistic: [
        "var(--statistic-font-size)",
        { lineHeight: "var(--statistic-line-height)", letterSpacing: "var(--statistic-letter-spacing)" },
      ],
      label: [
        "var(--label-font-size)",
        { lineHeight: "var(--label-line-height)", letterSpacing: "var(--label-letter-spacing)" },
      ],
      "label-active": [
        "var(--label-active-font-size)",
        { lineHeight: "var(--label-active-line-height)", letterSpacing: "var(--label-active-letter-spacing)" },
      ],
      text: [
        "var(--text-font-size)",
        { lineHeight: "var(--text-line-height)", letterSpacing: "var(--text-letter-spacing)" },
      ],
    },
    letterSpacing: {
      "label-rest": "var(--label-tracking-rest)",
      "label-active": "var(--label-tracking-active)",
    },
    extend: {
      transitionTimingFunction: {
        house: "var(--e)",
      },
      borderColor: {
        DEFAULT: "var(--line)",
      },
      borderWidth: {
        hairline: "var(--hairline)",
      },
    },
  },
  plugins: [],
} satisfies Config;
