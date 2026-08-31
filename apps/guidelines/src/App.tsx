import { useEffect, useRef, useState } from "react";
import {
  GroundSection,
  RailNav,
  SectionHeader,
  WordmarkLockup,
  MonogramStage,
  MisuseGallery,
  EndorsementLockup,
  DropCap,
  PullQuote,
  TwoColumnBody,
  LaneIndexRow,
  StatisticBlock,
  Button,
  SwatchGrid,
  RampStrip,
  ContrastAuditTable,
  TypeSpecimenRow,
  Reveal,
  ThemeToggle,
  PageLink,
  type Ground,
} from "@tcg/ui";

type SectionSpec = { id: string; label: string; ground: Ground };

const SECTIONS: SectionSpec[] = [
  { id: "positioning", label: "Positioning", ground: "bone" },
  { id: "colour", label: "Colour", ground: "bone" },
  { id: "typography", label: "Typography", ground: "bone" },
  { id: "logo", label: "Logo", ground: "green" },
  { id: "motion", label: "Motion", ground: "bone" },
  { id: "components", label: "Components", ground: "bone" },
  { id: "contrast", label: "Contrast & Accessibility", ground: "ink" },
];

function useScrollSpy(ids: string[]) {
  const [active, setActive] = useState(-1);

  useEffect(() => {
    const elements = ids.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => !!el);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const idx = elements.indexOf(entry.target as HTMLElement);
            if (idx !== -1) setActive(idx);
          }
        }
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids]);

  return active;
}

export default function App() {
  const ids = SECTIONS.map((s) => s.id);
  const activeIndex = useScrollSpy(ids);
  const prefersReducedMotion = useRef(
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ).current;

  // The Light version reads as light throughout; the Dark version reads as
  // dark throughout — no alternating rhythm to invert, no mixed-mode pages.
  // House green is the one fixed brand constant that holds in both: the
  // Logo section stays green regardless of theme.
  const [dark, setDark] = useState(
    () => typeof window !== "undefined" && localStorage.getItem("tcg-dark") === "true"
  );
  useEffect(() => {
    localStorage.setItem("tcg-dark", String(dark));
  }, [dark]);
  const theme: Ground = dark ? "ink" : "bone";
  const activeGround: Ground =
    activeIndex !== -1 && SECTIONS[activeIndex].ground === "green" ? "green" : theme;

  const scrollTo = (index: number) => {
    document.getElementById(ids[index])?.scrollIntoView({
      behavior: prefersReducedMotion ? "auto" : "smooth",
      block: "start",
    });
  };

  return (
    // The lg:pl-96 gutter reserved for the fixed rail sits outside every
    // GroundSection's own background, so it always shows whatever this root
    // element paints — without this it stayed bone (the CSS default) even in
    // Dark, leaving a persistent light strip down the page.
    <div className="min-h-screen" style={{ background: `var(--${theme})` }}>
      <a
        href="#positioning"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:bg-bone focus:text-ink focus:px-4 focus:py-2 font-label text-label uppercase"
      >
        Skip to content
      </a>

      <RailNav
        sections={SECTIONS.map((s) => s.label)}
        activeIndex={activeIndex}
        onSelect={scrollTo}
        ground={activeGround}
        className="hidden lg:flex fixed left-10 top-1/2 -translate-y-1/2 z-40"
      />

      {/* Mobile equivalent: numerals only, fixed to the bottom edge, with its
          own solid backdrop since it sits flush against the viewport rather
          than floating over content like the desktop rail does. */}
      <RailNav
        sections={SECTIONS.map((s) => s.label)}
        activeIndex={activeIndex}
        onSelect={scrollTo}
        ground={activeGround}
        orientation="horizontal"
        className="flex lg:hidden fixed bottom-0 inset-x-0 z-40"
      />

      <ThemeToggle dark={dark} onToggle={() => setDark((d) => !d)} className="fixed top-6 right-6 z-50" />

      <PageLink href={`${import.meta.env.BASE_URL}applications.html`} className="fixed top-6 left-6 z-50">
        Applications
      </PageLink>

      <main className="pb-14 lg:pb-0">
      {/* Cover — full-bleed, not offset for rail clearance; the rail floats
          over it exactly as it does over any other ground. */}
      <GroundSection ground={theme} className="min-h-screen flex flex-col items-center justify-center px-8 text-center">
        <Reveal>
          <WordmarkLockup as="h1" ground={theme} className="text-center" />
        </Reveal>
        <Reveal delayMs={200}>
          <p className="font-text text-text mt-10 max-w-xl text-tx2">
            A brand operating system for a house built on structural permanence.
          </p>
        </Reveal>
        <Reveal delayMs={400}>
          <p className="font-label text-label uppercase text-tx3 mt-16">Scroll to begin — I. Positioning</p>
        </Reveal>
      </GroundSection>

      {/* lg:pl-96 reserves the width the fixed rail occupies (left-10 through
          its widest label, "Contrast & Accessibility") so short sections
          never sit underneath it. */}
      <div className="lg:pl-96">

      {/* I. Positioning */}
      <GroundSection ground={theme} id="positioning" className="px-8 md:px-24 py-32">
        <div className="max-w-[1400px] mx-auto">
          <Reveal>
            <SectionHeader index={1} label="Positioning" ground={theme} />
          </Reveal>
          <div className="grid md:grid-cols-2 gap-16 mt-16">
            <Reveal>
              <DropCap className="max-w-md">
                We don&rsquo;t chase noise, we build brands that last. The house confers status
                rather than chasing visibility — PR 4.0, structural permanence expressed as
                luxury restraint rather than volume.
              </DropCap>
            </Reveal>
            <Reveal delayMs={150}>
              <PullQuote>&ldquo;The recognized get covered. The recognizer gets cited.&rdquo;</PullQuote>
            </Reveal>
          </div>
          <Reveal delayMs={200} className="mt-16">
            <TwoColumnBody>
              <p>
                Concrete is the discipline, not the texture. Permanence is expressed as luxury
                restraint — hairline rules instead of cards, negative space instead of shadow,
                a Didone display face instead of a heavy grotesque.
              </p>
              <p>
                The house appears behind the work, the way a couture label sits inside the
                garment rather than the logo across the chest. Every application in this system
                follows that discipline first.
              </p>
            </TwoColumnBody>
          </Reveal>
        </div>
      </GroundSection>

      {/* II. Colour */}
      <GroundSection ground={theme} id="colour" className="px-8 md:px-24 py-32 border-t border-line">
        <div className="max-w-[1400px] mx-auto">
          <Reveal>
            <SectionHeader index={2} label="Colour" ground={theme} />
          </Reveal>
          <Reveal delayMs={150} className="mt-16">
            <SwatchGrid
              swatches={[
                { name: "Ink", varName: "--ink" },
                { name: "Bone", varName: "--bone" },
                { name: "House Green", varName: "--green-500" },
                { name: "Antique Gilt", varName: "--gilt-500" },
              ]}
            />
          </Reveal>
          <Reveal delayMs={250} className="mt-16 space-y-10">
            <RampStrip name="green" />
            <RampStrip name="gilt" />
            <RampStrip name="stone" />
          </Reveal>
          <Reveal delayMs={300} className="mt-16">
            <LaneIndexRow label="Chromatic events" value="Green & gilt only" />
            <LaneIndexRow label="Gilt-500 on bone" value="Rules &amp; marks only — fails AA text" />
            <LaneIndexRow label="Body copy on bone" value="Ink, or green-500" />
          </Reveal>
        </div>
      </GroundSection>

      {/* III. Typography */}
      <GroundSection ground={theme} id="typography" className="px-8 md:px-24 py-32 border-t border-line">
        <div className="max-w-[1400px] mx-auto">
          <Reveal>
            <SectionHeader index={3} label="Typography" ground={theme} />
          </Reveal>
          <Reveal delayMs={150} className="mt-16">
            <TypeSpecimenRow name="Display 1" family="display" sizeClass="text-display-1" sample="TCG" />
            <TypeSpecimenRow name="Display 2" family="display" sizeClass="text-display-2" />
            <TypeSpecimenRow name="Display 3" family="display" sizeClass="text-display-3" />
            <TypeSpecimenRow name="Statistic" family="display" sizeClass="text-statistic" sample="VII" />
            <TypeSpecimenRow name="Text" family="text" sizeClass="text-text" />
            <TypeSpecimenRow name="Label" family="label" sizeClass="text-label" />
          </Reveal>
          <Reveal delayMs={250} className="mt-16">
            <LaneIndexRow label="Display" value="Bodoni Moda" />
            <LaneIndexRow label="Text" value="Cormorant Garamond" />
            <LaneIndexRow label="Label" value="Jost, .42em tracking" />
          </Reveal>
        </div>
      </GroundSection>

      {/* IV. Logo — green is the chromatic constant and never inverts. */}
      <GroundSection ground="green" id="logo" className="px-8 md:px-24 py-32">
        <div className="max-w-[1400px] mx-auto">
          <Reveal>
            <SectionHeader index={4} label="Logo" ground="green" />
          </Reveal>
          <Reveal delayMs={150} className="mt-16">
            <div className="inline-flex gap-px bg-line">
              <MonogramStage ground="bone" showClearspace />
              <MonogramStage ground="ink" showClearspace />
              <MonogramStage ground="green" showClearspace />
            </div>
          </Reveal>
          <Reveal delayMs={250} className="mt-16 max-w-2xl">
            <p className="font-text text-text text-tx">
              Two governed signatures, never interchanged. The <em>monogram</em> — the ring
              resolving as a &ldquo;G&rdquo; enclosing lowercase <em>concrete</em> — identifies:
              avatar, stamp, label, favicon. The <em>wordmark lockup</em> presents: covers and
              title moments only.
            </p>
          </Reveal>
          <Reveal delayMs={350} className="mt-12">
            <LaneIndexRow label="Clearspace" value="≥ ring radius" />
            <LaneIndexRow label="Minimum size" value="64px digital · 0.375in print" />
            <LaneIndexRow label="Approved grounds" value="Ink, bone, house green" />
          </Reveal>
          <Reveal delayMs={450} className="mt-16">
            <span className="font-label text-label uppercase text-tx3 block mb-4">Misuse</span>
            <MisuseGallery />
          </Reveal>
          <Reveal delayMs={550} className="mt-16">
            <EndorsementLockup ground="green" />
          </Reveal>
        </div>
      </GroundSection>

      {/* V. Motion */}
      <GroundSection ground={theme} id="motion" className="px-8 md:px-24 py-32 border-t border-line">
        <div className="max-w-[1400px] mx-auto">
          <Reveal>
            <SectionHeader index={5} label="Motion" ground={theme} />
          </Reveal>
          <Reveal delayMs={150} className="mt-16 max-w-2xl">
            <p className="font-text text-text text-tx">
              Slow and unhurried: 1.1s reveals on <code className="font-label text-label">cubic-bezier(.19,1,.22,1)</code>.
              Nothing hurries. This page is the demonstration — every block on it faded up under
              that exact curve, and honours <code className="font-label text-label">prefers-reduced-motion</code>.
            </p>
          </Reveal>
          <Reveal delayMs={250} className="mt-12">
            <LaneIndexRow label="Reveal duration" value="1.1s" />
            <LaneIndexRow label="Reveal translate" value="28px → 0" />
            <LaneIndexRow label="Rail tracking" value=".30em → .44em on active" />
          </Reveal>
        </div>
      </GroundSection>

      {/* VI. Components */}
      <GroundSection ground={theme} id="components" className="px-8 md:px-24 py-32 border-t border-line">
        <div className="max-w-[1400px] mx-auto">
          <Reveal>
            <SectionHeader index={6} label="Components" ground={theme} />
          </Reveal>
          <Reveal delayMs={150} className="mt-16">
            <StatisticBlock value="17" caption="Governed components" />
          </Reveal>
          <Reveal delayMs={250} className="mt-16 flex gap-4">
            <Button variant="fill">Enter the archive</Button>
            <Button variant="line">Request the deck</Button>
          </Reveal>
        </div>
      </GroundSection>

      {/* VII. Contrast & Accessibility */}
      <GroundSection ground={theme} id="contrast" className="px-8 md:px-24 py-32">
        <div className="max-w-[1400px] mx-auto">
          <Reveal>
            <SectionHeader index={7} label="Contrast & Accessibility" ground={theme} />
          </Reveal>
          <Reveal delayMs={150} className="mt-16">
            <ContrastAuditTable />
          </Reveal>
          <Reveal delayMs={300} className="mt-24">
            <EndorsementLockup ground={theme} />
          </Reveal>
        </div>
      </GroundSection>
      </div>
      </main>
    </div>
  );
}
