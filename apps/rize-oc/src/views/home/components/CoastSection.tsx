import SectionWrapper from "@/components/ui/SectionWrapper";
import Eyebrow from "@/components/ui/Eyebrow";
import Button from "@/components/ui/Button";
import { AutoLinkedText } from "@sweetmedia/blog-core";

const nature = [
  "Zuma Beach Access (2 miles)",
  "Santa Monica Mountains Hiking",
  "Local Surfing & Paddleboarding",
];

const community = [
  "Malibu Recovery Fellowships",
  "Rize Active Alumni Network",
  "Local Volunteer Opportunities",
];

export default function CoastSection() {
  return (
    <section className="bg-cream">
      <SectionWrapper className="grid lg:grid-cols-[400px_1fr] gap-20 items-start">
        {/* Left */}
        <div>
          <Eyebrow colorClass="text-ink/50" className="mb-5">The Environment</Eyebrow>
          <h2 className="font-[family-name:var(--font-display)] font-normal text-ink leading-[1.05]" style={{ fontSize: "clamp(42px, 4vw, 56px)" }}>
            Connected To{" "}
            <br />
            <em className="italic text-ink/55">The Coast</em>
          </h2>
          <p className="mt-6 text-[15px] font-light leading-relaxed text-ink/60 max-w-sm">
            <AutoLinkedText>{"Recovery does not happen in a vacuum. We utilize the rich, recovery-focused culture of Southern California to build a vibrant foundation for your life after treatment."}</AutoLinkedText>
          </p>
          <div className="mt-8">
            <Button href="/location" variant="ink">
              Get Directions <i className="ri-arrow-right-line ml-2" />
            </Button>
          </div>
        </div>

        {/* Right — 2 columns + Travel */}
        <div className="flex flex-col gap-10">
          <div className="grid grid-cols-2 gap-12">
            <div>
              <div className="flex items-center gap-2.5 mb-5">
                <span className="w-2.5 h-2.5 rounded-full bg-accent" />
                <Eyebrow colorClass="text-ink/50" tracking="wide">Nature</Eyebrow>
              </div>
              <ul className="flex flex-col gap-3">
                {nature.map((item) => (
                  <li key={item} className="text-[15px] font-light text-ink/70">{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <div className="flex items-center gap-2.5 mb-5">
                <span className="w-2.5 h-2.5 rounded-full bg-accent" />
                <Eyebrow colorClass="text-ink/50" tracking="wide">Community</Eyebrow>
              </div>
              <ul className="flex flex-col gap-3">
                {community.map((item) => (
                  <li key={item} className="text-[15px] font-light text-ink/70">{item}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Travel & Logistics */}
          <div className="border-t border-ink/15 pt-8">
            <div className="flex items-center gap-2.5 mb-4">
              <span className="w-2.5 h-2.5 rounded-full bg-accent" />
              <Eyebrow colorClass="text-ink/50" tracking="wide">Travel &amp; Logistics</Eyebrow>
            </div>
            <p className="text-[15px] font-light text-ink/65 max-w-lg">
              <AutoLinkedText>{"Conveniently located 45 minutes from LAX and 60 minutes from Burbank (BUR). We provide private, discreet car service for all incoming admissions."}</AutoLinkedText>
            </p>
          </div>
        </div>
      </SectionWrapper>
    </section>
  );
}
