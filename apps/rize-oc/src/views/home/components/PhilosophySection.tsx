import SectionWrapper from "@/components/ui/SectionWrapper";
import Eyebrow from "@/components/ui/Eyebrow";
import IconCircle from "@/components/ui/IconCircle";
import { AutoLinkedText } from "@sweetmedia/blog-core";

const cards = [
  { icon: "ri-group-line",      title: "Dual-Diagnosis",   desc: "Expert, integrated treatment for co-occurring mental health and substance use disorders." },
  { icon: "ri-briefcase-2-line",title: "Executive Privacy", desc: "Discreet, premium care designed to accommodate the needs of working professionals." },
  { icon: "ri-sun-line",        title: "Holistic Care",     desc: "A comprehensive approach that integrates mind, body, and spirit into your recovery." },
];

export default function PhilosophySection() {
  return (
    <section className="bg-cream">
      <SectionWrapper>
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-16 lg:gap-24 items-center">
          
          {/* Left — heading + text + blockquote */}
          <div className="max-w-xl">
            <Eyebrow className="mb-5">Our Philosophy</Eyebrow>

            <h2
              className="font-[family-name:var(--font-display)] font-normal text-ink"
              style={{ fontSize: "clamp(40px, 5vw, 56px)", lineHeight: 1.05 }}
            >
              Healing Is A <br/>
              <em className="italic text-ink/70">Return To Yourself</em>
            </h2>

            <div className="mt-6 mb-8 w-12 h-[2px] bg-accent/40" />

            <p className="text-base font-light leading-relaxed text-ink/70">
              <AutoLinkedText>{"At Rize, we understand that seeking mental health and addiction treatment can be a significant step. That's why we've created a welcoming and supportive environment where you can feel comfortable on your journey to healing and self-discovery."}</AutoLinkedText>
            </p>
            
            <p className="mt-4 text-base font-light leading-relaxed text-ink/70">
              <AutoLinkedText>{"We are proud to be an established part of the Orange County community, offering both outpatient and virtual services designed to fit your lifestyle and preferences."}</AutoLinkedText>
            </p>

            <blockquote className="mt-8 relative">
              <i className="ri-double-quotes-l absolute -top-3 -left-2 text-4xl text-accent/20" />
              <p className="relative z-10 text-[17px] font-[family-name:var(--font-display)] leading-relaxed text-ink/80 italic pl-6 border-l-2 border-accent/40">
                <AutoLinkedText>{"We've created a sanctuary where evidence-based treatment meets the timeless healing power of the coast—a place where transformation isn't rushed, but gently nurtured."}</AutoLinkedText>
              </p>
            </blockquote>
          </div>

          {/* Right — Stacked Feature Cards */}
          <div className="flex flex-col gap-5">
            {cards.map(({ icon, title, desc }) => (
              <div 
                key={title} 
                className="group bg-white border border-warm/50 p-8 rounded-xl flex sm:flex-row flex-col items-start sm:items-center gap-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="shrink-0">
                  <IconCircle icon={icon} variant="accent" size="lg" iconSize="text-2xl" />
                </div>
                <div>
                  <h3 className="font-[family-name:var(--font-display)] text-2xl font-normal text-ink mb-2">
                    {title}
                  </h3>
                  <p className="text-[15px] font-light leading-relaxed text-ink/60">
                    <AutoLinkedText>{desc}</AutoLinkedText>
                  </p>
                </div>
              </div>
            ))}
          </div>
          
        </div>
      </SectionWrapper>
    </section>
  );
}
