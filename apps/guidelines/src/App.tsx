import {
  SectionHeader,
  WordmarkLockup,
  MonogramStage,
  EndorsementLockup,
  DropCap,
  PullQuote,
  TwoColumnBody,
  LaneIndexRow,
  StatisticBlock,
  HairlineDivider,
  Button,
  SwatchGrid,
  RampStrip,
  ContrastAuditTable,
  TypeSpecimenRow,
  Reveal,
} from "@tcg/ui";

export default function App() {
  return (
    <main className="bg-bone text-ink min-h-screen px-8 md:px-24 py-24 max-w-[1400px] mx-auto space-y-24">
      <Reveal>
        <WordmarkLockup ground="bone" />
      </Reveal>

      <Reveal as="section">
        <SectionHeader index={1} label="Monogram" />
        <div className="inline-flex gap-px bg-line mt-8">
          <MonogramStage ground="bone" showClearspace />
          <MonogramStage ground="ink" showClearspace />
          <MonogramStage ground="green" showClearspace />
        </div>
      </Reveal>

      <Reveal as="section">
        <SectionHeader index={2} label="Endorsement" />
        <div className="mt-8">
          <EndorsementLockup ground="bone" />
        </div>
      </Reveal>

      <Reveal as="section">
        <SectionHeader index={3} label="Editorial Devices" />
        <div className="grid md:grid-cols-2 gap-12 mt-8">
          <DropCap>
            Structural permanence is a discipline, not a texture. The house does not chase
            noise — it builds brands that last, and lets restraint carry the weight that
            decoration usually tries to.
          </DropCap>
          <PullQuote>“The recognized get covered. The recognizer gets cited.”</PullQuote>
        </div>
        <div className="mt-8">
          <TwoColumnBody>
            <p>
              Concrete is the discipline, not the texture. Permanence is expressed as luxury
              restraint — hairline rules instead of cards, negative space instead of shadow.
            </p>
            <p>
              PR 4.0 confers status rather than chasing visibility. The house appears behind
              the work, the way a couture label sits inside the garment.
            </p>
          </TwoColumnBody>
        </div>
      </Reveal>

      <Reveal as="section">
        <SectionHeader index={4} label="Lane Index" />
        <div className="mt-8">
          <LaneIndexRow label="Positioning" value="Structural permanence" />
          <LaneIndexRow label="Register" value="Editorial, not corporate" />
          <LaneIndexRow label="Palette" value="Bone, ink, green, gilt" />
        </div>
      </Reveal>

      <Reveal as="section">
        <SectionHeader index={5} label="Statistic" />
        <div className="mt-8">
          <StatisticBlock value="VII" caption="Governed sections" />
        </div>
      </Reveal>

      <Reveal as="section">
        <SectionHeader index={6} label="Buttons" />
        <div className="flex gap-4 mt-8">
          <Button variant="fill">Enter the archive</Button>
          <Button variant="line">Request the deck</Button>
        </div>
      </Reveal>

      <Reveal as="section">
        <SectionHeader index={7} label="Colour" />
        <div className="mt-8 space-y-8">
          <SwatchGrid
            swatches={[
              { name: "Ink", varName: "--ink" },
              { name: "Bone", varName: "--bone" },
              { name: "House Green", varName: "--green-500" },
              { name: "Antique Gilt", varName: "--gilt-500" },
            ]}
          />
          <RampStrip name="green" />
          <RampStrip name="gilt" />
          <RampStrip name="stone" />
        </div>
      </Reveal>

      <Reveal as="section">
        <SectionHeader index={1} label="Contrast Audit" />
        <div className="mt-8">
          <ContrastAuditTable />
        </div>
      </Reveal>

      <Reveal as="section">
        <SectionHeader index={2} label="Type Specimen" />
        <div className="mt-8">
          <TypeSpecimenRow name="Display 1" family="display" sizeClass="text-display-1" sample="TCG" />
          <TypeSpecimenRow name="Display 2" family="display" sizeClass="text-display-2" />
          <TypeSpecimenRow name="Display 3" family="display" sizeClass="text-display-3" />
          <TypeSpecimenRow name="Text" family="text" sizeClass="text-text" />
          <TypeSpecimenRow name="Label" family="label" sizeClass="text-label" />
        </div>
      </Reveal>

      <HairlineDivider strong />
    </main>
  );
}
