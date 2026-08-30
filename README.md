# TCG Brand OS

Proprietary and confidential. Brand operating system for The Concrete Group — design tokens, component library, editorial guidelines site, and application templates.

## Status

Phase 5 of 5 complete: repo scaffold, token system, logo alpha masters, component library, editorial guidelines site, applications, governance, light/dark toggle, accessibility audit.

**Live for external audit:** https://unclepauliees.github.io/concrete-group-brand-os/ · applications: https://unclepauliees.github.io/concrete-group-brand-os/applications.html

This repo is mirrored to a separate public GitHub repository (`unclepauliees/concrete-group-brand-os`) specifically so it can be reviewed without local setup — despite the confidentiality note below, that mirror and its Pages site are intentionally public at the owner's request. `.github/workflows/pages.yml` redeploys on every push to `main`.

## Quick start

```
npm install
npm run dev
```

One command. Builds tokens, builds and syncs the logo alpha masters, and starts the Vite dev server:
- `http://localhost:5173` — the guidelines site
- `http://localhost:5173/applications.html` — the six application templates

`npm run build` produces the static production build of both pages (`apps/guidelines/dist`).

## Structure

```
packages/tokens/        Single source of truth. tokens.json (Style Dictionary shape) -> dist/tokens.css + dist/tokens.resolved.json
packages/ui/             Component library — hairline components, wired to tokens only
apps/guidelines/          Two pages: the guidelines site (index.html) and the application templates (applications.html)
assets/logo/source/        Approved artwork, untouched. Do not edit or redraw.
assets/logo/generated/      Alpha-keyed masters, built by scripts/build-logo-masters.mjs
```

## Architecture

Three layers, each strictly downstream of the one before it:

1. **`packages/tokens/tokens.json`** — the only place a color, font, size, or motion curve is ever written as a literal value. Resolved and flattened by `packages/tokens/build.mjs` into `dist/tokens.css` (CSS custom properties) and `dist/tokens.resolved.json` (flat, Figma Tokens–plugin compatible).
2. **`packages/ui`** — React components that read those CSS custom properties through Tailwind utility classes (`apps/guidelines/tailwind.config.ts` maps every color/type/motion utility to a `var(--token)`, never a literal). No component in this layer hardcodes a hex, a px value, or a font name.
3. **`apps/guidelines`** — the two pages that consume the component library: the guidelines site and the application templates.

`GroundSection` is the mechanism behind the brief's "dark and green are section grounds, not themes": it re-declares the semantic layer (`--bg`/`--tx`/`--tx2`/`--tx3`/`--line`/`--line-strong`) as CSS custom properties scoped to whatever DOM subtree it wraps. Every other component already reads those same names, so nothing downstream needs a `ground` prop of its own to invert correctly — ordinary CSS custom property inheritance does the work. A handful of components (`SectionHeader`, `WordmarkLockup`, `MonogramStage`, `EndorsementLockup`, `RailNav`) do take an explicit `ground` prop, because they carry a fixed brand color (the gilt numeral, the monogram's ink/bone master) that has to change per ground rather than just inherit — no single gilt shade clears AA on bone, ink, and house-green-500 simultaneously (computed: gilt-500 on green-500 is 2.74:1), so those pick a ground-appropriate shade explicitly.

## Tokens

```
npm run tokens:build
```

Reads `packages/tokens/tokens.json`, resolves `{category.token}` references, and writes:
- `packages/tokens/dist/tokens.css` — CSS custom properties (`--green-500`, `--f-display`, `--e`, …), 91 in total
- `packages/tokens/dist/tokens.resolved.json` — flat, Figma Tokens–plugin compatible

Every token value in this repo traces back to `tokens.json`. No hardcoded hex, px, or font-family values downstream — if a value needs to change, it changes there and only there.

## Logo governance

Approved source artwork lives at `assets/logo/source/` (`TCG_Logo_No_Background.png`, `TCG_Logo_White.png`) and must never be edited, recolored, distorted, or redrawn.

**Finding, not assumption:** both source PNGs already carry a real alpha channel (transparent ground, ~254-alpha mark) rather than the flattened near-white ground the original brief described. The build script recolors onto that existing alpha instead of re-deriving alpha from luminance — the luminance approach was tried first and produced a muddier blend on dark grounds.

### Alpha-keying the logo

```
npm run logo:build
```

Runs `scripts/build-logo-masters.mjs` (Node + `sharp`), which reads the source PNG's existing alpha channel and floods the mark with the target ink/bone color, then trims to the mark's bounding box. Produces two masters in `assets/logo/generated/`, then `scripts/sync-logo-to-public.mjs` copies them into `apps/guidelines/public/logo/` for the app to serve:
- `monogram-ink.png` — charcoal mark, transparent ground, for use on bone
- `monogram-bone.png` — bone mark, transparent ground, for use on ink or house green

If a future logo revision needs a third ground-specific master, add a color/output-name pair to the `buildMaster` calls at the bottom of `build-logo-masters.mjs` — the luminance-vs-alpha tradeoff documented in the script's comment still applies if a new source file doesn't carry real alpha.

### Two governed signatures, never interchanged

- **Monogram** — the ring mark, alone. Used for avatar, stamp, label, favicon.
- **Wordmark lockup** — "*the* CONCRETE Group," built entirely from type tokens (Bodoni Moda + Jost), not from the artwork. Used for covers and title moments only.

Clearspace ≥ ring radius on all sides. Minimum size and the misuse set (recolour, distort, low-opacity, rotate) are demonstrated live in the guidelines site's Logo section (`MisuseGallery` in `packages/ui`) — each violation is produced with a CSS filter/transform on the real approved mark, not a separately drawn "wrong" asset.

**Endorsement lockup** ("Offered by / The Concrete Group") is the house appearing behind the work — used at the close of a section or the foot of an application, never as a header.

## Component library

`packages/ui/src`, exported from `packages/ui/src/index.ts`:

`Reveal` (motion primitive, honors `prefers-reduced-motion`), `GroundSection`, `SectionHeader`, `WordmarkLockup`, `MonogramStage`, `MisuseGallery`, `EndorsementLockup`, `DropCap`, `PullQuote`, `TwoColumnBody`, `LaneIndexRow`, `StatisticBlock`, `HairlineDivider`, `Button`, `SwatchGrid`, `RampStrip`, `ContrastAuditTable`, `TypeSpecimenRow`, `RailNav`.

`ContrastAuditTable` computes WCAG ratios live from the resolved DOM values of the CSS custom properties (`packages/ui/src/contrast.ts`) rather than a hardcoded hex table, so the audit can't silently drift from the token source. Verified output matches the brief's contrast law exactly: gilt-500/bone fails (2.82:1), gilt-700/bone passes AA normal (5.36:1), green-500/bone passes AA normal (7.73:1), stone-500/bone is large-text only (3.32:1), bone/ink and bone/green-500 both clear comfortably.

**`RailNav` does not use `mix-blend-mode: difference`, despite that being the brief's original spec.** It was tried first and looked correct in isolation, but on this page — a fixed-position overlay over several independently-scrolled, differently-colored sections — Chrome silently drops the blend once the scrolled content is promoted to separate compositing layers, which this layout reliably triggers. The failure mode is invisible text (bone-on-bone) with no console error. `RailNav` instead takes an explicit `ground` prop and sets a plain color from it; the app already knows the active ground from scroll-spy, so this is deterministic rather than relying on a compositing behavior this layout defeats.

## Guidelines site

`apps/guidelines/src/App.tsx` — a single-page scroll: a full-bleed ink cover (wordmark lockup, no rail clearance) followed by seven Roman-numeral sections — I. Positioning, II. Colour, III. Typography, IV. Logo, V. Motion, VI. Components, VII. Contrast & Accessibility — alternating bone, green, and ink grounds. A fixed left rail (desktop only, `lg:` and up) tracks scroll position via `IntersectionObserver` and lets you jump to any section; the numbered sections carry `lg:pl-96` so their content never sits underneath the fixed rail.

A fixed top-right `ThemeToggle` swaps bone↔ink across every section's own ground for a Light/Dark version of the whole site, without flattening the designed alternation — house green stays the chromatic constant either way, and grounds that exist purely to demonstrate the three canonical tokens (the logo's ink/bone/green trio, swatches, ramps, the contrast audit's fixed pairs) stay literal on purpose, since inverting those would misrepresent the tokens they're documenting.

The site carries a real heading outline for screen readers — `SectionHeader`'s label renders as an `<h2>` (the Roman numeral is `aria-hidden`, redundant with heading order) and the cover's `WordmarkLockup` renders `as="h1"` — plus a `<main>` landmark. `Applications.tsx` follows the same rule: each application's name (`Frame`'s caption) is the real `<h2>`; illustrative mockup copy inside a frame (e.g. `[Property Name]`) is a plain `<p>`, since it's sample content, not page structure.

## Applications

`apps/guidelines/src/Applications.tsx`, served at `applications.html` (a separate Vite entry point — `vite.config.ts` lists both `index.html` and `applications.html` under `build.rollupOptions.input`, so `npm run build` produces both). Six placements, every one composed from the same components and tokens as the guidelines site:

| Application | Proportions |
|---|---|
| Deck cover | 1920 × 1080 |
| Proposal cover | 8.5 × 11 in |
| Editorial content spread | 2 × 1 |
| Client-property microsite hero | 16 × 7 |
| Social template set (3 portrait crops) | 1080 × 1350 |
| Web hero | 16 × 6 |
| Email signature | 600 × 160 |

These are proportionally accurate live compositions, not pre-rendered exports — the deliverable is the component/token system, not a folder of PNGs. `[Client Name]` / `[Property Name]` / `[Full Name]` / `[Title]` are explicit placeholders; no client name, case data, or testimonial is fabricated anywhere in this repo.

## Swapping licensed faces

Bodoni Moda, Cormorant Garamond, and Jost are loaded as free Google Fonts stand-ins via `<link>` tags in `apps/guidelines/index.html` and `apps/guidelines/applications.html` — they are not a design decision, only what's available without a paid license. To swap in the licensed cuts (e.g. a proper Didot or house-licensed Bodoni):

1. Replace the Google Fonts `<link>` tags in both HTML files with your font-loading method of choice (self-hosted `@font-face`, Adobe Fonts, etc.).
2. Update `font.f-display`, `font.f-text`, and `font.f-label` in `packages/tokens/tokens.json` to the new family names (the `serif`/`sans-serif` fallback stack can stay).
3. `npm run tokens:build` — every component picks up the new faces automatically; nothing in `packages/ui` or `apps/guidelines` names a font directly.

## Consuming tokens downstream

Import `packages/tokens/dist/tokens.css` once at the app root; every component reads CSS custom properties from it. Tailwind (in `apps/guidelines/tailwind.config.ts`) maps utility classes to these same variables as the pattern to follow in any other consuming app — `colors.green[500] = "var(--green-500)"`, never a literal hex. `packages/tokens/dist/tokens.resolved.json` is the flat equivalent for non-Tailwind consumers (a Figma Tokens plugin import, a different design tool, a native app's own token layer).

## Deploying to GitHub Pages

`.github/workflows/pages.yml` runs `npm run build` with `GITHUB_PAGES=true` and deploys `apps/guidelines/dist` on every push to `main`. That env var matters: GitHub Pages serves a project repo (as opposed to a `<user>.github.io` root repo) from `/<repo-name>/`, not domain root, so `apps/guidelines/vite.config.ts` sets Vite's `base` to `/concrete-group-brand-os/` only when `GITHUB_PAGES` is set — local dev and any other deploy target stay at `/`.

This caught a real bug before it shipped: `MonogramStage` and `MisuseGallery` referenced the logo PNGs by a hardcoded root-absolute `src` (`"/logo/monogram-ink.png"`). Vite rewrites asset URLs it can statically analyze (an `import`), but a plain string in `src` is invisible to that pass — under the Pages subpath every monogram image would have 404'd. Fixed by building the path from `import.meta.env.BASE_URL` instead; verified against a real `vite preview --base /concrete-group-brand-os/` build before deploying. If you add another public-directory asset referenced by a literal path string anywhere in `packages/ui`, use the same pattern.

## Known environment hazard

An unrelated Nuxt/Vue project lives at `~/tsconfig.json` (outside this repo, at the home directory root). Vite's tsconfig resolution walks up the directory tree for any file lacking a local tsconfig and will pick up that project's `jsxImportSource: "vue"` if it reaches that far — this broke the initial build (React children rendered as Vue vnodes, with no useful error beyond "Objects are not valid as a React child") until `packages/ui/tsconfig.json` and a root `tsconfig.json` were added to stop the walk. Do not delete either file, and give any new top-level package its own tsconfig if this repo grows.
