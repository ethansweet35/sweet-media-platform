import LpShell from "@/components/lp/LpShell";
import LpHero from "@/components/lp/LpHero";
import AccreditationsBar from "@/views/home/components/AccreditationsBar";
import LpMhLevels from "@/components/lp/LpMhLevels";
import LpConditionOverview from "@/components/lp/LpConditionOverview";
import LpMhConditions from "@/components/lp/LpMhConditions";
import LpGalpAdmissions from "@/components/lp/LpGalpAdmissions";
import InsuranceSection from "@/views/home/components/InsuranceSection";
import LpFaq from "@/components/lp/LpFaq";

const whyRize = [
  {
    icon: "ri-flask-line",
    title: "Innovative Clinical Excellence",
    body: "Our PHP utilizes evidence-based modalities like CBT, DBT, and EMDR tailored to the unique complexities of modern mental health and dual-diagnosis recovery.",
  },
  {
    icon: "ri-map-pin-2-line",
    title: 'The "OC" Advantage',
    body: "Located in the heart of Orange County, our facility offers a serene, upscale environment that fosters peace of mind and long-term breakthroughs.",
  },
  {
    icon: "ri-user-heart-line",
    title: "Individualized Support Ratios",
    body: "You aren't just a number. Our smaller group sizes ensure you receive more one-on-one time with therapists and practitioners who truly know your story.",
  },
  {
    icon: "ri-bridge-line",
    title: 'A "Bridge" To Real Life',
    body: "Our program provides 5–6 hours of daily structure while allowing you to return home in the evenings, ensuring you can practice new coping skills in real-world settings.",
  },
  {
    icon: "ri-road-map-line",
    title: "Comprehensive Aftercare",
    body: "Recovery doesn't end when the program does. We provide a robust transition plan to outpatient care to ensure your recovery is permanent.",
  },
];

export default function PhpPage() {
  return (
    <LpShell>
      <LpHero
        headline="The Bridge to Lasting Wellness: Evidence-Based PHP at Rize OC"
        subheadline="Navigate your path to wellness with a structured, expert-led program that bridges the gap between inpatient care and everyday life. We combine clinical excellence with a compassionate, community-focused approach."
        eyebrow="5-Star Rated Facility · 1,000+ Treated"
        stat="6hrs"
        statLabel="Daily, 5–7 Days/Week"
      />
      <AccreditationsBar />

      {/* Why Choose Rize */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-[1300px] px-6">
          <div className="mb-12 text-center">
            <p className="text-[10px] font-medium uppercase tracking-[0.35em] text-accent mb-3">Why Choose Rize OC</p>
            <h2
              className="font-[family-name:var(--font-display)] font-normal text-ink"
              style={{ fontSize: "clamp(30px, 3.5vw, 48px)", lineHeight: 1.1 }}
            >
              A Higher Standard Of Healing
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-sm font-light leading-relaxed text-ink/60">
              We believe that intensive treatment shouldn&apos;t feel like a clinical detour — it should feel like the beginning of your next chapter.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {whyRize.map((item) => (
              <div key={item.title} className="border border-warm/40 bg-[#F8F6F3] p-7">
                <div className="w-10 h-10 flex items-center justify-center border border-ink/15 mb-5">
                  <i className={`${item.icon} text-accent text-lg`} />
                </div>
                <h3 className="font-[family-name:var(--font-display)] text-xl font-normal text-ink mb-3">{item.title}</h3>
                <p className="text-sm font-light leading-relaxed text-ink/70">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <LpMhLevels />
      <LpConditionOverview
        eyebrow="What Is a Partial Hospitalization Program?"
        headline="How PHP Works — and When It's the Right Level of Care"
        paragraphs={[
          "A Partial Hospitalization Program (PHP) provides the highest level of outpatient care — offering a structured, full-day treatment environment (typically 5–6 hours per day, 5–7 days per week) while allowing you to return home in the evenings. PHP is designed as a clinically intensive bridge between inpatient care and standard outpatient therapy.",
          "PHP at Rize OC combines individual therapy, group therapy, medication management, and psychoeducation within a highly supportive clinical environment. It's ideal for individuals stepping down from inpatient or residential care, those who need more intensive support than weekly therapy can provide, or those managing an acute mental health episode that doesn't require 24/7 hospitalization.",
        ]}
        listHeading="PHP Program Details"
        listItems={[
          "5–6 hours of structured programming per day, 5–7 days per week",
          "Individual therapy — multiple sessions per week with a dedicated therapist",
          "Group therapy covering skills, process, and psychoeducation",
          "Medication management and psychiatric oversight",
          "Family therapy and family involvement programming",
          "In-person in Orange County or fully virtual",
          "Discharge planning and aftercare coordination from day one",
          "Most major PPO insurance plans accepted and verified",
        ]}
        callout="PHP is clinically indicated when standard outpatient therapy is insufficient but 24/7 inpatient care is not required. It provides the structure and intensity needed for meaningful progress — while preserving your connection to home, family, and community life."
      />
      <LpMhConditions />
      <LpGalpAdmissions />
      <InsuranceSection />
      <LpFaq />
    </LpShell>
  );
}
