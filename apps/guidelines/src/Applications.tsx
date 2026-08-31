import type { PropsWithChildren } from "react";
import {
  GroundSection,
  WordmarkLockup,
  MonogramStage,
  EndorsementLockup,
  DropCap,
  PullQuote,
  StatisticBlock,
  Reveal,
  PageLink,
} from "@tcg/ui";

type FrameProps = PropsWithChildren<{
  name: string;
  dimensions: string;
  aspect: string;
}>;

/**
 * Proportionally accurate preview, not a pixel-exact export — the deliverable
 * is the composition (real components, real tokens), not a rendered PNG.
 * The caption's name is a real <h2> (this page's six actual sections); the
 * illustrative copy inside the frame is sample content, not page structure,
 * so it stays out of the heading outline — see the h2->p swaps below.
 */
function Frame({ name, dimensions, aspect, children }: FrameProps) {
  return (
    <div>
      <div className={`border border-line overflow-hidden ${aspect}`}>{children}</div>
      <div className="flex items-baseline justify-between mt-4">
        <h2 className="font-label text-label uppercase text-tx2 m-0">{name}</h2>
        <span className="font-label text-label uppercase text-tx3">{dimensions}</span>
      </div>
    </div>
  );
}

export default function Applications() {
  return (
    <GroundSection ground="bone" className="min-h-screen px-8 md:px-24 py-24">
      <PageLink href={import.meta.env.BASE_URL} className="fixed top-6 left-6 z-50">
        Guidelines
      </PageLink>
      <main className="max-w-[1400px] mx-auto">
        <Reveal>
          <h1 className="font-display text-display-2 text-tx">Applications</h1>
          <p className="font-text text-text text-tx2 mt-6 max-w-2xl">
            Six placements, one discipline. Every composition below is built from the same
            token layer and component library as the guidelines site — nothing here is a
            one-off.
          </p>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-16 mt-20">
          {/* Deck cover */}
          <Reveal>
            <Frame name="Deck cover" dimensions="1920 × 1080" aspect="aspect-video">
              <GroundSection ground="ink" className="w-full h-full flex flex-col items-center justify-center gap-8 px-8 text-center">
                <WordmarkLockup ground="ink" className="text-center" />
                <span className="font-label text-label uppercase text-tx3">
                  Prepared for [Client Name] — MMXXVI
                </span>
              </GroundSection>
            </Frame>
          </Reveal>

          {/* Proposal cover */}
          <Reveal delayMs={100}>
            <Frame name="Proposal cover" dimensions="8.5 × 11 in" aspect="aspect-[8.5/11]">
              <GroundSection ground="green" className="w-full h-full flex flex-col justify-between p-10">
                <span className="font-label text-label uppercase text-tx3">Proposal</span>
                <div>
                  <p className="font-display italic text-display-3 text-tx leading-tight">
                    A house built on structural permanence.
                  </p>
                  <div className="mt-10">
                    <EndorsementLockup ground="green" />
                  </div>
                </div>
              </GroundSection>
            </Frame>
          </Reveal>

          {/* Editorial content spread */}
          <Reveal delayMs={150} className="md:col-span-2">
            <Frame name="Editorial content spread" dimensions="2 × 1" aspect="aspect-[2/1]">
              <GroundSection ground="bone" className="w-full h-full grid grid-cols-2 gap-12 p-10 md:p-16">
                <DropCap className="text-tx">
                  Structural permanence is a discipline, not a texture. The house does not
                  chase noise — it builds brands that last.
                </DropCap>
                <PullQuote>&ldquo;The recognized get covered. The recognizer gets cited.&rdquo;</PullQuote>
              </GroundSection>
            </Frame>
          </Reveal>

          {/* Client-property microsite hero */}
          <Reveal delayMs={200} className="md:col-span-2">
            <Frame name="Client-property microsite hero" dimensions="16 × 7" aspect="aspect-[16/7]">
              <GroundSection ground="ink" className="w-full h-full flex flex-col justify-between p-10 md:p-16">
                <EndorsementLockup ground="ink" />
                <p className="font-display text-display-1 text-tx leading-none">[Property Name]</p>
              </GroundSection>
            </Frame>
          </Reveal>

          {/* Social template set */}
          <Reveal delayMs={250} className="md:col-span-2">
            <div className="font-label text-label uppercase text-tx2 mb-4">
              Social template set — 1080 × 1350 (portrait editorial crops)
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-line">
              <div className="aspect-[4/5] bg-bone">
                <GroundSection ground="bone" className="w-full h-full flex items-center justify-center p-8">
                  <PullQuote className="text-center">&ldquo;Structural permanence.&rdquo;</PullQuote>
                </GroundSection>
              </div>
              <div className="aspect-[4/5] bg-bone">
                <GroundSection ground="green" className="w-full h-full flex items-center justify-center p-8">
                  <StatisticBlock value="IV" caption="PR 4.0" />
                </GroundSection>
              </div>
              <div className="aspect-[4/5] bg-bone">
                <GroundSection ground="ink" className="w-full h-full flex items-center justify-center p-8">
                  <MonogramStage ground="ink" size={96} />
                </GroundSection>
              </div>
            </div>
          </Reveal>

          {/* Web hero */}
          <Reveal delayMs={300} className="md:col-span-2">
            <Frame name="Web hero" dimensions="16 × 6" aspect="aspect-[16/6]">
              <GroundSection ground="bone" className="w-full h-full flex flex-col items-center justify-center text-center px-8">
                <WordmarkLockup ground="bone" className="text-center" />
                <p className="font-text text-text text-tx2 mt-6 max-w-lg">
                  We don&rsquo;t chase noise, we build brands that last.
                </p>
              </GroundSection>
            </Frame>
          </Reveal>

          {/* Email signature */}
          <Reveal delayMs={350}>
            <Frame name="Email signature" dimensions="600 × 160" aspect="aspect-[600/160]">
              <GroundSection ground="bone" className="w-full h-full flex items-center px-8">
                <div className="w-full border-l border-line pl-6">
                  <p className="font-display italic text-text text-tx">[Full Name]</p>
                  <p className="font-label text-label uppercase text-tx3 mt-1">[Title]</p>
                  <p className="font-label text-label uppercase text-tx3 mt-4">
                    Offered by The Concrete Group
                  </p>
                </div>
              </GroundSection>
            </Frame>
          </Reveal>
        </div>
      </main>
    </GroundSection>
  );
}
