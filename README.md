# TCG Brand OS

Proprietary and confidential. Brand operating system for The Concrete Group — design tokens, component library, and editorial guidelines site.

## Status

Phase 4 of 5 complete: repo scaffold, token system, logo alpha masters, component library, editorial guidelines site.

## Structure

```
packages/tokens/   Single source of truth. tokens.json (Style Dictionary shape) -> dist/tokens.css + dist/tokens.resolved.json
packages/ui/        Component library — hairline components, wired to tokens only
apps/guidelines/     The guidelines site itself: cover + I–VII, Roman-numeral rail, alternating grounds
assets/logo/source/   Approved artwork, untouched. Do not edit or redraw.
assets/logo/generated/ Alpha-keyed masters, built by scripts/build-logo-masters.mjs
```

## Running the site

```
npm run dev
```

Builds tokens, builds/syncs logo masters, and starts the Vite dev server for `apps/guidelines` at `http://localhost:5173`. `npm run build` produces the static production build (`apps/guidelines/dist`).

The site is a single-page scroll: a full-bleed ink cover (wordmark lockup, no rail clearance) followed by seven Roman-numeral sections — I. Positioning, II. Colour, III. Typography, IV. Logo, V. Motion, VI. Components, VII. Contrast & Accessibility — alternating bone, green, and ink grounds. A fixed left rail (desktop only, `lg:` and up) tracks scroll position via `IntersectionObserver` and lets you jump to any section.

## Component library

`packages/ui/src` — every component reads Tailwind utilities that resolve to `var(--token)`, never a literal value. Exported from `packages/ui/src/index.ts`:

`Reveal` (motion primitive, honors `prefers-reduced-motion`), `GroundSection`, `SectionHeader`, `WordmarkLockup`, `MonogramStage`, `EndorsementLockup`, `DropCap`, `PullQuote`, `TwoColumnBody`, `LaneIndexRow`, `StatisticBlock`, `HairlineDivider`, `Button`, `SwatchGrid`, `RampStrip`, `ContrastAuditTable`, `TypeSpecimenRow`, `RailNav`.

`GroundSection` is what makes "dark and green are section grounds, not themes" (per the brief) actually work: it re-declares the semantic layer (`--bg`/`--tx`/`--tx2`/`--tx3`/`--line`/`--line-strong`) as CSS custom properties scoped to that section. Every other component already reads those same names, so nothing downstream needs its own `ground` prop to invert correctly — ordinary CSS custom property inheritance does it. `SectionHeader`, `WordmarkLockup`, `MonogramStage`, `EndorsementLockup`, and `RailNav` additionally accept an explicit `ground` prop where a fixed brand color (the gilt numeral, the monogram's ink/bone master) needs to change per ground rather than just inherit — a single gilt shade cannot clear AA on all three grounds simultaneously (computed: gilt-500 on green-500 is 2.74:1), so those pick a ground-appropriate shade.

`ContrastAuditTable` computes WCAG ratios live from the resolved DOM values of the CSS custom properties (`packages/ui/src/contrast.ts`) rather than a hardcoded hex table, so the audit can't silently drift from the token source. Verified output matches the brief's contrast law exactly: gilt-500/bone fails (2.82:1), gilt-700/bone passes AA normal (5.36:1), green-500/bone passes AA normal (7.73:1), stone-500/bone is large-text only (3.32:1), bone/ink and bone/green-500 both clear comfortably.

**`RailNav` does not use `mix-blend-mode: difference`, despite that being the brief's original spec.** It was tried first and looked correct in isolation, but on this page — a fixed-position overlay over several independently-scrolled, differently-colored sections — Chrome silently drops the blend once the scrolled content is promoted to separate compositing layers, which this layout reliably triggers. The failure mode is invisible text (bone-on-bone) with no console error. `RailNav` instead takes an explicit `ground` prop and sets a plain color from it; the app already knows the active ground from scroll-spy, so this is deterministic rather than relying on a compositing behavior this layout defeats.

**Known environment hazard:** an unrelated Nuxt/Vue project lives at `~/tsconfig.json` (outside this repo). Vite's tsconfig resolution walks up the directory tree for any file lacking a local tsconfig and will pick up that project's `jsxImportSource: "vue"` if it reaches that far — this broke the initial build (React children rendered as Vue vnodes) until `packages/ui/tsconfig.json` and a root `tsconfig.json` were added to stop the walk. Do not delete either file.

## Tokens

```
npm run tokens:build
```

Reads `packages/tokens/tokens.json`, resolves `{category.token}` references, and writes:
- `packages/tokens/dist/tokens.css` — CSS custom properties (`--green-500`, `--f-display`, `--e`, …)
- `packages/tokens/dist/tokens.resolved.json` — flat, Figma Tokens–plugin compatible

Every token value in this repo traces back to `tokens.json`. No hardcoded hex, px, or font-family values downstream.

## Logo governance

Approved source artwork lives at `assets/logo/source/` and must never be edited, recolored, distorted, or redrawn.

**Finding, not assumption:** both source PNGs already carry a real alpha channel (transparent ground, ~254-alpha mark) rather than the flattened near-white ground the original brief described. The build script recolors onto that existing alpha instead of re-deriving alpha from luminance — the luminance approach was tried first and produced a muddier blend on dark grounds.

```
npm run logo:build
```

Produces two masters in `assets/logo/generated/`, trimmed to the mark's bounding box:
- `monogram-ink.png` — charcoal mark, transparent ground, for use on bone
- `monogram-bone.png` — bone mark, transparent ground, for use on ink or house green

**Two governed signatures, never interchanged:**
- **Monogram** — the ring mark above, alone. Used for avatar, stamp, label, favicon.
- **Wordmark lockup** — "the CONCRETE Group," built from type tokens (Bodoni + Jost), not from the artwork. Used for covers and title moments only.

Clearspace ≥ ring radius on all sides. Never recolor outside the two approved masters, distort, rotate, drop opacity, or place the raw source file on a colored ground.

## Consuming tokens downstream

Import `packages/tokens/dist/tokens.css` once at the app root; every component reads CSS custom properties from it. Tailwind (in `apps/guidelines`) is configured to map utility classes to these same variables — see Phase 4.
