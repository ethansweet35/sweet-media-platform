import FinancialConcierge from "@/components/feature/FinancialConcierge";
import LocHero from "@/views/levels-of-care/LocHero";
import UnderstandingSection from "@/views/levels-of-care/UnderstandingSection";
import WhoBenefitsCards from "@/views/levels-of-care/WhoBenefitsCards";
import IopScheduleSection from "./IopScheduleSection";
import ComparisonTable from "@/views/levels-of-care/ComparisonTable";
import ConditionsTreated from "@/views/levels-of-care/ConditionsTreated";
import FaqAccordion from "@/views/levels-of-care/FaqAccordion";

const HERO_IMG =
  "https://gueqxorkktfcwiakepcp.supabase.co/storage/v1/object/public/site-assets/images/wp-inline/2026/03/intensive-outpatient-program-seattle.webp";

const WHO_BENEFITS = [
  {
    icon: "ri-arrow-go-back-line",
    title: "Step-Down from PHP",
    body:
      "Ideal for individuals completing Partial Hospitalization or inpatient treatment who are ready for less intensive care but still need structured support as they reintegrate into work and life in the Seattle area.",
  },
  {
    icon: "ri-briefcase-line",
    title: "Working Professionals",
    body:
      "Perfect for executives, professionals, and working adults who need addiction treatment but cannot take extended time off work. Our evening IOP programs accommodate full-time employment.",
  },
  {
    icon: "ri-graduation-cap-line",
    title: "Students & Young Adults",
    body:
      "Comprehensive support for college students and young adults managing substance abuse while continuing their education. Flexible scheduling around class and academic commitments.",
  },
  {
    icon: "ri-mental-health-line",
    title: "Dual Diagnosis Treatment",
    body:
      "Integrated treatment for co-occurring mental health disorders such as depression, anxiety, PTSD, or bipolar disorder alongside substance use disorders.",
  },
  {
    icon: "ri-home-heart-line",
    title: "Family Responsibilities",
    body:
      "For parents and caregivers who need intensive treatment while maintaining their role at home. Attend treatment during school hours or evening sessions after children are asleep.",
  },
  {
    icon: "ri-seedling-line",
    title: "Moderate Substance Use",
    body:
      "Treatment for individuals with moderate addiction severity who have stable living situations and can be safely treated in an outpatient setting with clinical oversight.",
  },
];

const FAQS = [
  {
    q: "How long does the Intensive Outpatient Program last?",
    a: "The typical duration of our IOP is 6-12 weeks, though this varies based on individual progress and clinical needs. Some clients may need only 4-6 weeks, while others benefit from 3-4 months of IOP before transitioning to standard outpatient therapy. Your treatment team continuously monitors progress and adjusts the timeline accordingly.",
  },
  {
    q: "Can I work full-time while attending IOP in Seattle?",
    a: "Yes! This is one of the primary benefits of IOP. Most of our clients maintain full-time employment or full-time school enrollment while attending treatment. Our evening IOP track (6-9 PM) is specifically designed for working professionals. Simply attend sessions after work and continue your career responsibilities during the day.",
  },
  {
    q: "What's the difference between IOP and PHP?",
    a: "IOP requires 9-12 hours per week (typically 3 hours per day, 3-5 days), while PHP requires 25-30 hours per week (5-6 hours daily, 5-6 days). IOP is less intensive and allows for full-time work or school, making it ideal for those with moderate addiction severity or as a step-down from PHP or residential treatment.",
  },
  {
    q: "Does IOP include individual therapy sessions?",
    a: "Yes, our IOP includes 1-2 individual therapy sessions per week in addition to group therapy. You'll work one-on-one with a licensed therapist to address personal issues, process trauma, develop coping strategies, and create an individualized recovery plan tailored to your specific needs and goals.",
  },
  {
    q: "What if my work schedule changes during IOP?",
    a: "We understand that life circumstances change. If your work schedule shifts, we can often transfer you to a different IOP track (morning, afternoon, or evening) to accommodate your needs. Our flexible programming is designed to adapt to your schedule while maintaining treatment continuity.",
  },
  {
    q: "Is medication-assisted treatment (MAT) available in IOP?",
    a: "Absolutely. Our IOP provides comprehensive medication management including MAT for opioid and alcohol use disorders. Our psychiatric team can prescribe and monitor Suboxone, Vivitrol, Naltrexone, and other medications as part of your treatment plan, with regular check-ins during IOP sessions.",
  },
  {
    q: "Do you offer virtual IOP or telehealth options?",
    a: "Yes, we offer hybrid IOP that combines in-person and virtual sessions based on clinical appropriateness and client preference. Some clients attend certain sessions via secure telehealth platform, while others prefer all in-person treatment. We'll work with you to determine the best format for your situation.",
  },
  {
    q: "What happens after completing IOP?",
    a: "After IOP, most clients transition to standard outpatient therapy (1-2 sessions per week), ongoing medication management if needed, and continued participation in 12-Step or other recovery support groups. We create a comprehensive aftercare plan and offer alumni programming to support long-term recovery success.",
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

export default function IopPage() {
  return (
    <>
      <LocHero
        eyebrow="Flexible Recovery"
        headline="Intensive Outpatient Program"
        body="A flexible, evidence-based clinical program that delivers structured recovery support 3-5 days a week — so you can keep working, parenting, or attending school while you heal."
        metaTags={["3-5 Hours Daily", "3-6 Days/Week", "Small Groups"]}
        backgroundImage={HERO_IMG}
      />

      <UnderstandingSection
        eyebrow="Understanding IOP"
        headline={
          <>
            What is an <span className="italic">Intensive Outpatient Program?</span>
          </>
        }
        primary={{
          title: "IOP Treatment In Seattle",
          body:
            "Mountain View's IOP serves the greater Seattle area including Bellevue, Redmond, Kirkland, Tacoma, and surrounding Pacific Northwest communities. Our program offers 9-12 hours of structured clinical programming per week, typically 3-5 days, addressing substance use disorders including alcohol addiction, drug dependence, and co-occurring mental health conditions. Our flexible scheduling includes morning, afternoon, and evening IOP options, allowing you to continue working full-time or attending school while receiving intensive addiction treatment.",
        }}
        secondary={{
          title: "Evidence-Based Treatment",
          intro:
            "Our Intensive Outpatient Program integrates proven therapeutic approaches for lasting addiction recovery:",
          bullets: EVIDENCE_BULLETS,
        }}
      />

      <WhoBenefitsCards
        eyebrow="Is IOP Right For You?"
        headline={
          <>
            Who Benefits from <span className="italic">Intensive Outpatient Treatment?</span>
          </>
        }
        cards={WHO_BENEFITS}
      />

      <IopScheduleSection />

      <ComparisonTable
        highlight="iop"
        eyebrow="Treatment Levels"
        headline={
          <>
            IOP vs. Other <span className="italic">Levels of Care</span>
          </>
        }
      />

      <ConditionsTreated
        headline={
          <>
            Conditions Treated <span className="italic">in IOP</span>
          </>
        }
        intro="Our Intensive Outpatient Program provides specialized treatment for a wide range of substance use disorders and co-occurring mental health conditions."
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
