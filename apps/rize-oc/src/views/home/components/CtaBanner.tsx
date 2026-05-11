import SectionWrapper from "@/components/ui/SectionWrapper";
import Button from "@/components/ui/Button";

export default function CtaBanner() {
  return (
    <section className="bg-ink">
      <SectionWrapper className="text-center">
        <h2 className="font-[family-name:var(--font-display)] text-5xl font-normal text-white leading-[1.1]">
          Ready To Take The First Step?
        </h2>
        <p className="mt-5 text-[15px] font-light leading-relaxed text-white/60">
          Our admissions team is standing by to answer your questions, discuss treatment options, and guide you through the process. All conversations are completely confidential.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Button href="tel:9494612620" variant="accent" size="lg">
            (949)-461-2620
          </Button>
          <Button href="#verify" variant="outline-white" size="lg">
            Start Online Form
          </Button>
        </div>
      </SectionWrapper>
    </section>
  );
}
