type Block = {
  time: string;
  title: string;
  icon: string;
  body: string;
  tags: string[];
};

const SCHEDULE: Block[] = [
  {
    time: "8:30am",
    title: "Morning Check-In & Vitals",
    icon: "ri-cup-line",
    body:
      "Begin your day with arrival wellness checks, vital sign monitoring, medication distribution, and a brief morning meditation or intention-setting session with clinical staff.",
    tags: ["Vital Signs Assessment", "Medication Management", "Mindful Morning Practice"],
  },
  {
    time: "9:00am",
    title: "Process Group Therapy",
    icon: "ri-group-line",
    body:
      "Engage in therapeutic group sessions focusing on addiction recovery, emotional regulation, interpersonal relationships, and community building with peers in recovery.",
    tags: ["Process-Oriented Groups", "Peer Support", "Skill Practice"],
  },
  {
    time: "11:30am",
    title: "Medical & Psychiatric Services",
    icon: "ri-stethoscope-line",
    body:
      "Regular consultations with physicians and psychiatrists for medication evaluation, symptom management, and co-occurring disorder treatment.",
    tags: ["Psychiatric Evaluation", "MAT Services", "Medical Monitoring"],
  },
  {
    time: "12:30pm",
    title: "Therapeutic Lunch",
    icon: "ri-restaurant-2-line",
    body:
      "Enjoy nutritious meals focusing on nutrition education, mindful eating practices, and community connection in our dining facility.",
    tags: ["Gourmet Nutrition", "Mindful Eating", "Community Time"],
  },
  {
    time: "1:30pm",
    title: "Psychoeducation Workshop",
    icon: "ri-lightbulb-flash-line",
    body:
      "Educational sessions on the neuroscience of addiction, relapse prevention strategies, coping mechanisms, stress management, and life skills development.",
    tags: ["Addiction Education", "Relapse Prevention", "Life Skills Training"],
  },
  {
    time: "2:45pm",
    title: "Holistic & Experiential Therapy",
    icon: "ri-plant-line",
    body:
      "Participate in nature-based therapy, yoga, art therapy, music therapy, equine therapy, or other evidence-based holistic modalities integrated into your treatment plan.",
    tags: ["Nature Therapy", "Yoga / Mindfulness", "Creative Arts Therapy"],
  },
  {
    time: "3:45pm",
    title: "Wrap-Up & Recovery Planning",
    icon: "ri-heart-line",
    body:
      "Daily reflection, goal review, homework assignments, aftercare planning discussions, and preparation for evening recovery activities with your treatment team.",
    tags: ["Daily Reflection", "Homework Review", "Discharge Planning"],
  },
];

export default function TypicalDaySection() {
  return (
    <section className="bg-[var(--mvt-cream)] text-[var(--mvt-ink)]">
      <div className="mx-auto max-w-[1280px] px-6 py-20 lg:px-12 lg:py-24">
        <div className="flex flex-col items-center text-center">
          <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-[var(--mvt-ink)]">
            <span aria-hidden="true" className="inline-block h-px w-7 bg-[var(--mvt-ink)]" />
            Daily Programming
          </p>
          <h2 className="mt-6 font-heading text-[40px] leading-tight tracking-tight text-[var(--mvt-ink)] sm:text-5xl lg:text-[56px]">
            A Typical Day in <span className="italic">Our PHP</span>
          </h2>
          <p className="mt-6 max-w-3xl text-base leading-7 text-[var(--mvt-text)]">
            Each day is carefully structured to provide comprehensive addiction
            treatment, therapeutic activities, medical support, and holistic
            wellness&mdash;all within our serene Seattle facility overlooking
            the Cascade Mountains.
          </p>
        </div>

        <ol className="mx-auto mt-14 max-w-4xl space-y-5">
          {SCHEDULE.map((item) => (
            <li
              key={item.time}
              className="rounded-md bg-white px-6 py-6 shadow-sm ring-1 ring-black/5 sm:px-8 sm:py-7"
            >
              <div className="flex items-start gap-5">
                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[var(--mvt-ink)] text-white">
                  <i className={`${item.icon} text-lg`} aria-hidden="true" />
                </span>

                <div className="flex-1">
                  <h3 className="text-[13px] font-semibold uppercase tracking-[0.18em] text-[var(--mvt-ink)] sm:text-[14px]">
                    <span>{item.time.toUpperCase()}</span>
                    <span className="mx-2 text-[var(--mvt-muted)]">-</span>
                    <span>{item.title.toUpperCase()}</span>
                  </h3>
                  <p className="mt-3 text-[14px] leading-7 text-[var(--mvt-text)] sm:text-[15px]">
                    {item.body}
                  </p>

                  <ul className="mt-5 flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <li
                        key={tag}
                        className="inline-flex items-center bg-[var(--mvt-ink)] px-4 py-2.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-white sm:text-[11px]"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
