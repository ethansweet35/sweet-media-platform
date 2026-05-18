import SectionWrapper from "@/components/ui/SectionWrapper";
import SectionHeader from "@/components/ui/SectionHeader";
import { AutoLinkedText } from "@sweetmedia/blog-core";

const schedule = [
  { time: "7:00 AM",  title: "Mindful Morning",      desc: "Wake naturally to coastal sunrise with optional meditation or gentle yoga.",               period: "morning" },
  { time: "8:00 AM",  title: "Nourishing Breakfast",  desc: "Chef-prepared meals focused on neurotransmitter support and energy.",                      period: "morning" },
  { time: "9:00 AM",  title: "Individual Therapy",    desc: "One-on-one session with your primary therapist for deep, focused work.",                   period: "morning" },
  { time: "11:00 AM", title: "Group Process",         desc: "Intimate group therapy exploring shared experiences and building community.",               period: "midday"  },
  { time: "12:30 PM", title: "Lunch & Rest",          desc: "Gourmet lunch with free time for rest, journaling, or reflection.",                        period: "midday"  },
  { time: "2:00 PM",  title: "Experiential Therapy",  desc: "Equine therapy, art, beach walks, or somatic movement.",                                   period: "midday"  },
  { time: "4:00 PM",  title: "Psychoeducation",       desc: "Learn the science of addiction and tools for lasting recovery.",                            period: "afternoon"},
  { time: "6:00 PM",  title: "Evening Dinner",        desc: "Communal dinner practicing mindful eating and genuine connection.",                         period: "evening" },
  { time: "7:30 PM",  title: "Evening Programming",   desc: "AA/NA meetings, meditation, wellness activities, or personal time.",                        period: "evening" },
];

const periodColors: Record<string, { border: string; label: string; bg: string }> = {
  morning:   { border: "border-accent",       label: "text-accent",       bg: "bg-accent/5"  },
  midday:    { border: "border-accent/60",    label: "text-accent/80",    bg: "bg-accent/3"  },
  afternoon: { border: "border-muted",        label: "text-muted",        bg: "bg-muted/5"   },
  evening:   { border: "border-ink/30",       label: "text-ink/60",       bg: "bg-ink/3"     },
};

export default function DaySection() {
  return (
    <section className="bg-cream">
      <SectionWrapper>
        <SectionHeader
          eyebrow="Daily Experience"
          heading="A Day In Your Journey"
          body="Every day at Rize is thoughtfully designed to balance therapeutic intensity with restorative rest."
          mb="mb-14"
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {schedule.map(({ time, title, desc, period }) => {
            const c = periodColors[period];
            return (
              <div
                key={`${time}-${title}`}
                className={`${c.bg} border-l-4 ${c.border} bg-white pl-7 pr-7 pt-7 pb-7 flex flex-col gap-3`}
              >
                <span className={`text-[10px] font-semibold uppercase tracking-[0.25em] ${c.label}`}>
                  {time}
                </span>
                <h4 className="font-[family-name:var(--font-display)] text-2xl font-normal text-ink leading-snug">
                  {title}
                </h4>
                <p className="text-[15px] font-light leading-relaxed text-ink/60">
                  <AutoLinkedText>{desc}</AutoLinkedText>
                </p>
              </div>
            );
          })}
        </div>

        {/* Personalized callout */}
        <div className="mt-6 bg-ink px-10 py-8 flex flex-col sm:flex-row sm:items-center gap-6">
          <i className="ri-star-line text-accent text-2xl shrink-0" />
          <div>
            <h4 className="font-[family-name:var(--font-display)] text-xl text-white mb-1.5">
              Personalized to Your Needs
            </h4>
            <p className="text-sm font-light leading-relaxed text-white/60">
              <AutoLinkedText>{"This represents a typical residential day. Your schedule will be tailored to your clinical needs, treatment phase, and level of care — we maintain flexibility to honor your healing process."}</AutoLinkedText>
            </p>
          </div>
        </div>

      </SectionWrapper>
    </section>
  );
}
