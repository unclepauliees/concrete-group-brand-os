# TCG Brand OS

Proprietary and confidential. Brand operating system for The Concrete Group — design tokens, component library, and editorial guidelines site.

## Status

Phase 3 of 5 complete: repo scaffold, token system, logo alpha masters, component library.

## Structure

```
packages/tokens/   Single source of truth. tokens.json (Style Dictionary shape) -> dist/tokens.css + dist/tokens.resolved.json
packages/ui/        Component library — hairline components, wired to tokens only
apps/guidelines/     Vite/React/TS host app. Currently a component showcase; becomes the full editorial site in Phase 4
assets/logo/source/   Approved artwork, untouched. Do not edit or redraw.
assets/logo/generated/ Alpha-keyed masters, built by scripts/build-logo-masters.mjs
```

## Running the showcase

```
npm run dev
```

Builds tokens, builds/syncs logo masters, and starts the Vite dev server for `apps/guidelines` at `http://localhost:5173`.

## Component library

`packages/ui/src` — every component reads Tailwind utilities that resolve to `var(--token)`, never a literal value. Exported from `packages/ui/src/index.ts`:

`Reveal` (motion primitive, honors `prefers-reduced-motion`), `SectionHeader`, `WordmarkLockup`, `MonogramStage`, `EndorsementLockup`, `DropCap`, `PullQuote`, `TwoColumnBody`, `LaneIndexRow`, `StatisticBlock`, `HairlineDivider`, `Button`, `SwatchGrid`, `RampStrip`, `ContrastAuditTable`, `TypeSpecimenRow`, `RailNav`.

`ContrastAuditTable` computes WCAG ratios live from the resolved DOM values of the CSS custom properties (`packages/ui/src/contrast.ts`) rather than a hardcoded hex table, so the audit can't silently drift from the token source. Verified output matches the brief's contrast law exactly: gilt-500/bone fails (2.82:1), gilt-700/bone passes AA normal (5.36:1), green-500/bone passes AA normal (7.73:1), stone-500/bone is large-text only (3.32:1), bone/ink and bone/green-500 both clear comfortably.

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
