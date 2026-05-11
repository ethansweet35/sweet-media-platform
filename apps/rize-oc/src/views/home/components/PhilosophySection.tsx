import SectionWrapper from "@/components/ui/SectionWrapper";
import Eyebrow from "@/components/ui/Eyebrow";
import IconCircle from "@/components/ui/IconCircle";

const cards = [
  { icon: "ri-group-line",      title: "Dual-\nDiagnosis",   desc: "Expert treatment for co-occurring disorders" },
  { icon: "ri-briefcase-2-line",title: "Executive\nPrivacy", desc: "Discreet, premium care for professionals" },
  { icon: "ri-sun-line",        title: "Holistic\nCare",     desc: "Mind, body, and spirit integration" },
];

export default function PhilosophySection() {
  return (
    <section className="bg-white">
      <SectionWrapper className="grid lg:grid-cols-[1fr_1fr] gap-14 items-start">
        {/* Left — heading + text + blockquote */}
        <div>
          <Eyebrow className="mb-5">Philosophy</Eyebrow>

          <h2
            className="font-[family-name:var(--font-display)] font-normal text-ink"
            style={{ fontSize: "clamp(36px, 4vw, 56px)", lineHeight: 1.1 }}
          >
            Healing Is A <em className="italic text-ink/70">Return To Yourself</em>
          </h2>

          <p className="mt-6 text-[15px] font-light leading-relaxed text-ink/65">
            At Rize, we understand that seeking mental health &amp; addiction treatment can be a significant step. That&apos;s why we&apos;ve created a welcoming and supportive environment where you can feel comfortable on your journey to healing and self-discovery. We are proud to be an established part of the Orange County community, offering both outpatient and virtual services designed to fit your lifestyle and preferences.
          </p>

          <blockquote className="mt-7 border-l-2 border-accent pl-5">
            <p className="text-sm font-light leading-relaxed text-ink/55 italic">
              We&apos;ve created a sanctuary where evidence-based treatment meets the timeless healing power of the coast—a place where transformation isn&apos;t rushed, but gently nurtured.
            </p>
          </blockquote>
        </div>

        {/* Right — 3 horizontal cards */}
        <div className="grid grid-cols-3 gap-3">
          {cards.map(({ icon, title, desc }) => (
            <div key={title} className="border border-warm p-8 flex flex-col items-center text-center gap-5">
              <IconCircle icon={icon} variant="accent" size="xl" iconSize="text-3xl" />
              <div>
                <h3 className="font-[family-name:var(--font-display)] text-xl font-normal text-ink whitespace-pre-line leading-snug">
                  {title}
                </h3>
                <p className="mt-2 text-sm font-light leading-relaxed text-ink/60">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </SectionWrapper>
    </section>
  );
}
