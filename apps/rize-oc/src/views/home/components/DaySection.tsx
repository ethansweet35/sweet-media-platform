import SectionWrapper from "@/components/ui/SectionWrapper";
import SectionHeader from "@/components/ui/SectionHeader";
import IconCircle from "@/components/ui/IconCircle";

const schedule = [
  { time: "7:00 AM",  title: "Mindful Morning",       desc: "Wake naturally to coastal sunrise with optional meditation or gentle yoga." },
  { time: "8:00 AM",  title: "Nourishing Breakfast",  desc: "Chef-prepared meals focused on neurotransmitter support and energy." },
  { time: "9:00 AM",  title: "Individual Therapy",    desc: "One-on-one session with your primary therapist for deep, focused work." },
  { time: "11:00 AM", title: "Group Process",         desc: "Intimate group therapy exploring shared experiences and building community." },
  { time: "12:30 PM", title: "Group Process",         desc: "Gourmet lunch with free time for rest, journaling, or reflection." },
  { time: "2:00 PM",  title: "Experiential Therapy",  desc: "Equine therapy, art, beach walks, or somatic movement." },
  { time: "4:00 PM",  title: "Psychoeducation",       desc: "Learn the science of addiction and tools for lasting recovery." },
  { time: "6:00 PM",  title: "Evening Dinner",        desc: "Communal dinner practicing mindful eating and genuine connection." },
  { time: "7:30 PM",  title: "Evening Programming",   desc: "AA/NA meetings, meditation, wellness activities, or personal time." },
];

export default function DaySection() {
  return (
    <section className="bg-white">
      <SectionWrapper>
        <SectionHeader
          eyebrow="Daily Experience"
          heading="A Day In Your Journey"
          body="Every day at Rize is thoughtfully designed to balance therapeutic intensity with restorative rest."
          mb="mb-10"
        />

        <div className="h-px bg-warm mb-8" />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
          {schedule.map(({ time, title, desc }) => (
            <div key={`${time}-${title}`} className="border border-warm p-7 flex flex-col">
              <div className="flex items-center gap-3 mb-2">
                <IconCircle icon="ri-settings-3-line" variant="accent-subtle" size="sm" />
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-ink/40">{time}</p>
              </div>
              <h4 className="font-[family-name:var(--font-display)] text-2xl font-normal text-ink mb-3">{title}</h4>
              <p className="text-[15px] font-light leading-relaxed text-ink/60">{desc}</p>
            </div>
          ))}
        </div>

        {/* Personalized callout */}
        <div className="border-l-4 border-accent bg-alt px-8 py-6 flex items-start gap-5">
          <IconCircle icon="ri-star-line" variant="accent-subtle" size="xs" className="mt-0.5" />
          <div>
            <h4 className="font-[family-name:var(--font-display)] text-xl font-normal text-ink">
              Personalized to Your Needs
            </h4>
            <p className="mt-1.5 text-sm font-light leading-relaxed text-ink/65">
              This schedule represents a typical residential treatment day. Your actual schedule will be personalized based on your clinical needs, treatment phase, and level of care. We maintain flexibility to honor your healing process while providing structure for recovery.
            </p>
          </div>
        </div>
      </SectionWrapper>
    </section>
  );
}
