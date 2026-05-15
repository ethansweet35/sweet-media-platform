import FinancialConcierge from "@/components/feature/FinancialConcierge";
import LocHero from "@/views/levels-of-care/LocHero";
import UnderstandingSection from "@/views/levels-of-care/UnderstandingSection";
import WhoBenefitsCards from "@/views/levels-of-care/WhoBenefitsCards";
import ComparisonTable from "@/views/levels-of-care/ComparisonTable";
import ConditionsTreated from "@/views/levels-of-care/ConditionsTreated";
import FaqAccordion from "@/views/levels-of-care/FaqAccordion";

const HERO_IMG =
  "https://gueqxorkktfcwiakepcp.supabase.co/storage/v1/object/public/site-assets/images/wp-inline/2026/03/outpatient-program-4.webp";

const WHO_BENEFITS = [
  {
    icon: "ri-arrow-go-back-line",
    title: "Step-Down Care",
    body:
      "Transitioning from PHP or IOP and need continued accountability and support while maintaining independence.",
  },
  {
    icon: "ri-heart-pulse-line",
    title: "Stable Recovery",
    body:
      "In recovery for several months but want ongoing therapy, group support, and relapse prevention strategies.",
  },
  {
    icon: "ri-briefcase-line",
    title: "Working Professionals",
    body:
      "Managing career responsibilities while prioritizing recovery through weekly therapy and support groups.",
  },
  {
    icon: "ri-mental-health-line",
    title: "Dual Diagnosis Treatment",
    body:
      "Integrated treatment for co-occurring mental health disorders such as depression, anxiety, PTSD, or bipolar disorder alongside substance use disorders.",
  },
  {
    icon: "ri-home-smile-line",
    title: "Living Independently",
    body:
      "Residing in sober living or at home with strong support systems and stable daily routines.",
  },
  {
    icon: "ri-parent-line",
    title: "Family Commitments",
    body:
      "Balancing parenting or caregiving responsibilities with maintaining sobriety and mental wellness.",
  },
];

const FAQS = [
  {
    q: "How many hours per week is the Outpatient Program?",
    a: "Our OP typically requires 3-6 hours per week, usually spread across 1-3 days. This can include group therapy, individual counseling, and family sessions. The exact schedule is tailored to your clinical needs and availability.",
  },
  {
    q: "Can I work full-time while in the Outpatient Program?",
    a: "Absolutely. The OP is designed specifically for individuals who need to maintain full-time work, school, or family responsibilities. We offer evening and weekend sessions to accommodate your schedule.",
  },
  {
    q: "What's the difference between OP and IOP?",
    a: "IOP (Intensive Outpatient Program) requires 9-12 hours weekly and is more structured, while OP requires 3-6 hours weekly with greater flexibility. OP is typically for those who have completed IOP or need less intensive ongoing support.",
  },
  {
    q: "Do I need to live in sober living to attend OP?",
    a: "No, you don't need to live in sober living for OP. Many clients live at home with family or independently. However, having a stable, supportive living environment is important for success in outpatient treatment.",
  },
  {
    q: "How long does the Outpatient Program last?",
    a: "OP duration varies based on individual needs, typically ranging from 8-12 weeks or longer. Some clients continue for several months as ongoing support. Your treatment team will regularly assess your progress and adjust the length of stay accordingly.",
  },
  {
    q: "Does insurance cover Outpatient treatment?",
    a: "Yes, most insurance plans cover outpatient addiction treatment. We accept major insurance providers including Aetna, BlueCross BlueShield, Cigna, and UnitedHealthcare. Our admissions team will verify your benefits and explain your coverage.",
  },
  {
    q: "What happens after I complete the Outpatient Program?",
    a: "After completing OP, we develop an aftercare plan that may include alumni support groups, ongoing individual therapy, 12-step meeting attendance, and sober community involvement. We remain available for continued support as needed.",
  },
  {
    q: "Can I attend OP if I'm on medication-assisted treatment (MAT)?",
    a: "Yes, we fully support medication-assisted treatment for opioid and alcohol use disorders. Our medical team can coordinate with your prescribing physician or provide MAT services through our program.",
  },
];

const EVIDENCE_BULLETS = [
  "Cognitive Behavioral Therapy (CBT)",
  "Dialectical Behavior Therapy (DBT)",
  "Motivational Interviewing (MI)",
  "Trauma-Informed Care",
  "12-Step Facilitation",
  "Relapse Prevention Training",
  "Family Therapy & Counseling",
  "Mindfulness-Based Practices",
];

export default function OpPage() {
  return (
    <>
      <LocHero
        eyebrow="Flexible Recovery"
        headline="Outpatient Program"
        body="The lightest level of structured care — weekly therapy, group support, and relapse prevention built around a full life. Ideal for stable recovery and step-down from IOP."
        metaTags={["1-3 Hours Daily", "1-3 Days/Week", "Small Groups"]}
        backgroundImage={HERO_IMG}
      />

      <UnderstandingSection
        eyebrow="Understanding Outpatient"
        headline={
          <>
            What is an <span className="italic">Outpatient Program?</span>
          </>
        }
        primary={{
          title: "Outpatient Treatment In Seattle",
          body:
            "Mountain View's Outpatient Program serves the greater Seattle area including Bellevue, Redmond, Kirkland, Tacoma, and surrounding Pacific Northwest communities. Our program offers 3-6 hours of structured clinical programming per week, typically 1-3 days, addressing ongoing recovery support, relapse prevention, and life skills development. Our flexible scheduling includes evening and weekend OP options, allowing you to fully maintain your professional career, education, and family commitments.",
        }}
        secondary={{
          title: "Evidence-Based Treatment",
          intro:
            "Our Outpatient Program integrates proven therapeutic approaches for lasting addiction recovery:",
          bullets: EVIDENCE_BULLETS,
        }}
      />

      <WhoBenefitsCards
        eyebrow="Is Outpatient Right For You?"
        headline={
          <>
            Who Benefits from <span className="italic">Outpatient Treatment?</span>
          </>
        }
        cards={WHO_BENEFITS}
      />

      <ComparisonTable
        highlight="outpatient"
        eyebrow="Treatment Levels"
        headline={
          <>
            OP vs. Other <span className="italic">Levels of Care</span>
          </>
        }
      />

      <ConditionsTreated
        headline={
          <>
            Conditions Treated in <span className="italic">Outpatient Programs</span>
          </>
        }
        intro="Our Outpatient Program provides ongoing specialized treatment for a wide range of substance use disorders and co-occurring mental health conditions."
      />

      <FaqAccordion
        headline={
          <>
            Frequently Asked <span className="italic">Questions</span>
          </>
        }
        faqs={FAQS}
      />

      <FinancialConcierge />
    </>
  );
}
