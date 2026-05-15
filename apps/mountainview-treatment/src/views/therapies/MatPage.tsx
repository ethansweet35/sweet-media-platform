import FinancialConcierge from "@/components/feature/FinancialConcierge";
import FaqAccordion from "@/views/levels-of-care/FaqAccordion";
import TherapyApproach from "./TherapyApproach";
import TherapyConditions from "./TherapyConditions";
import TherapyHero from "./TherapyHero";
import TherapyUnderstanding from "./TherapyUnderstanding";
import TherapyWhoBenefits from "./TherapyWhoBenefits";

const IMG = "https://gueqxorkktfcwiakepcp.supabase.co/storage/v1/object/public/site-assets/images/wp-inline/2026/05/Mountain-View-3.png";

const FAQS = [
  { q: "Isn't MAT just trading one drug for another?", a: "This is the most common misconception about medication-assisted treatment, and the science is clear: it is not. MAT medications stabilize the brain\u2019s reward and stress systems \u2014 they do not produce the euphoric high that drives addictive behavior. When properly dosed, they reduce cravings, prevent relapse, and restore normal functioning without impairment." },
  { q: "What medications do you prescribe through MAT?", a: "We offer all major FDA-approved medications for opioid and alcohol use disorder, including buprenorphine (Suboxone, Subutex), methadone, naltrexone (oral or Vivitrol injection), acamprosate, and disulfiram. The right medication depends on your substance use history, medical profile, and recovery goals." },
  { q: "How long will I need to be on medication?", a: "There is no required timeline. Some clients use MAT for several months as a bridge to abstinence; others remain on medication for years or indefinitely. Research consistently shows that longer duration of MAT is associated with better outcomes." },
  { q: "Will I feel impaired or \u201Chigh\u201D on MAT medications?", a: "No. When properly dosed by an experienced provider, MAT medications do not produce a euphoric high or impair functioning. Most clients report feeling more clear-headed, energized, and emotionally regulated than they did during active use." },
  { q: "Is therapy required, or is MAT just about the medication?", a: "The \u201Cassisted\u201D in medication-assisted treatment is intentional \u2014 medication is one essential component of a broader recovery framework, not a standalone solution. Every client in our program receives individual counseling, group therapy, and recovery support alongside medication management." },
  { q: "Does insurance cover MAT?", a: "In most cases, yes. MAT is covered by Medicaid, Medicare, and most major commercial insurance plans, often as an essential health benefit. Our admissions team will verify your benefits and walk you through coverage before treatment begins." },
  { q: "Is MAT safe during pregnancy?", a: "Yes \u2014 in fact, MAT is the medically recommended standard of care for pregnant individuals with opioid use disorder. Untreated opioid addiction during pregnancy carries significant risks for both parent and baby. Our team provides specialized care coordinated with obstetric providers." },
  { q: "What happens if I relapse while in MAT?", a: "Relapse is part of many recovery journeys, and our program is designed to support you through it \u2014 not punish you for it. If you experience a return to use, your medical and clinical team will work with you to understand what happened and adjust your treatment plan accordingly." },
];

export default function MatPage() {
  return (
    <>
      <TherapyHero
        image={IMG}
        eyebrow="Medication-Assisted Treatment"
        headline="Medication-Assisted"
        headlineItalic="Treatment in Seattle"
        body="Combining FDA-approved medication with compassionate clinical care. Expert MAT in Seattle for opioid use disorder, alcohol use disorder, and co-occurring mental health conditions \u2014 delivered by licensed addiction specialists."
        credentials={[
          { icon: "ri-capsule-line", label: "FDA-Approved Medications" },
          { icon: "ri-award-line", label: "Licensed Addiction Specialists" },
          { icon: "ri-shield-check-line", label: "Insurance Accepted" },
        ]}
      />

      <TherapyUnderstanding
        eyebrow="Understanding Medication-Assisted Treatment"
        headline={<>What is <span className="italic">Medication-Assisted Treatment?</span></>}
        intro="Medication-Assisted Treatment (MAT) combines FDA-approved medications with counseling and behavioral therapies to provide a whole-patient approach to treating substance use disorders. Recognized by SAMHSA and the American Society of Addiction Medicine, MAT is the evidence-based standard of care for opioid and alcohol use disorder."
        leftCard={{
          title: "How MAT Works",
          body: "MAT works by targeting the neurobiological underpinnings of addiction \u2014 the cravings, withdrawal symptoms, and dysregulated reward systems that make sustained abstinence so difficult without medical support. FDA-approved medications like buprenorphine and naltrexone bind to opioid receptors in the brain, blocking the euphoric effects of opioids and reducing the physical pull toward use.\n\nThis neurobiological stabilization creates the conditions for meaningful therapeutic work. When cravings are managed and withdrawal is controlled, clients can fully engage in counseling, develop coping skills, rebuild relationships, and address the root causes of their addiction.",
        }}
        rightCard={{
          title: "A Comprehensive Recovery Model",
          intro: "MAT at Mountain View is never medication alone. Every client receives a comprehensive recovery framework built on four integrated components:",
          bullets: [
            "Medication Management \u2014 FDA-approved medications, expertly prescribed and monitored",
            "Individual Counseling \u2014 addressing the psychological roots of addiction",
            "Behavioral Therapy \u2014 evidence-based skills like CBT and motivational interviewing",
            "Recovery Support \u2014 peer community, case management, and long-term care coordination",
          ],
        }}
      />

      <TherapyApproach
        headline={<>Anchored In <span className="italic text-[var(--mvt-teal-light)]">Evidence-Based Medicine</span></>}
        body="Our clinical model is built on the recognition that opioid and alcohol use disorders are medical conditions \u2014 not moral failures \u2014 and they respond best to medical care paired with comprehensive clinical support. We combine FDA-approved medications with individual counseling, group therapy, and recovery support to address addiction at every level: the neurobiological cravings, the underlying psychological pain, and the behavioral patterns that sustain it."
        features={[
          { icon: "ri-capsule-line", title: "FDA-Approved Medications", body: "Expert prescription and monitoring of buprenorphine, naltrexone, methadone, acamprosate, and other approved medications by licensed medical providers." },
          { icon: "ri-heart-pulse-line", title: "Integrated Counseling", body: "Every medication client receives individual counseling and behavioral therapy \u2014 CBT, motivational interviewing, and recovery skills \u2014 for lasting change beyond the medication." },
          { icon: "ri-user-heart-line", title: "Personalized Recovery Plans", body: "Treatment plans are tailored to each client\u2019s substance history, medical needs, co-occurring conditions, and long-term recovery goals." },
        ]}
      />

      <TherapyConditions
        headline={<>Conditions Treated Through <span className="italic">Medication-Assisted Treatment</span></>}
        intro="MAT is the evidence-based standard of care for opioid and alcohol use disorders, with strong support for co-occurring mental health conditions that complicate recovery."
        col1={{
          title: "Substance Use Disorders Treated With MAT",
          icon: "ri-capsule-line",
          items: ["Opioid Use Disorder", "Alcohol Use Disorder", "Heroin & Fentanyl Addiction", "Prescription Opioid Dependence", "Polysubstance Use Involving Opioids or Alcohol", "Long-Term Opioid Dependence"],
        }}
        col2={{
          title: "Co-Occurring Conditions Supported in MAT",
          icon: "ri-mental-health-line",
          items: ["Anxiety Disorders", "Major Depressive Disorder", "PTSD & Complex Trauma", "Bipolar Disorder", "Chronic Pain in Opioid Recovery", "Insomnia & Sleep Disturbances"],
        }}
      />

      <TherapyWhoBenefits
        headline={<>Who Benefits From <span className="italic">MAT</span></>}
        intro="MAT is most beneficial for those whose addiction has a strong neurobiological component \u2014 where cravings, withdrawal, and relapse risk make abstinence-based approaches difficult alone."
        cards={[
          { n: "01", icon: "ri-capsule-line", title: "Opioid Use Disorder", body: "For individuals struggling with heroin, fentanyl, or prescription opioid dependence. MAT significantly reduces overdose risk, withdrawal distress, and cravings." },
          { n: "02", icon: "ri-drop-line", title: "Alcohol Use Disorder", body: "Comprehensive support for those navigating chronic or severe alcohol dependence. Medications like naltrexone and acamprosate reduce cravings and relapse risk." },
          { n: "03", icon: "ri-refresh-line", title: "Chronic Relapse", body: "For those who\u2019ve tried abstinence-based recovery and faced repeated relapse. MAT addresses the neurobiological barriers that make sustained recovery difficult without medical support." },
          { n: "04", icon: "ri-mental-health-line", title: "Co-Occurring Mental Health", body: "Integrated care for clients managing both substance use and mental health conditions. MAT stabilizes the addiction side so that psychological work can be more effective." },
          { n: "05", icon: "ri-pulse-line", title: "Chronic Pain & Opioid Dependence", body: "Targeted care for individuals who became opioid-dependent through legitimate pain management. MAT offers a medically supervised path to stability and, when appropriate, tapering." },
          { n: "06", icon: "ri-medal-line", title: "Long-Term Recovery & Maintenance", body: "Continued support for clients stable on MAT and committed to ongoing recovery. We provide long-term medical management alongside therapy and life-skills support." },
        ]}
      />

      <FaqAccordion
        eyebrow="Common Questions"
        headline={<>Frequently Asked <span className="italic">Questions</span></>}
        faqs={FAQS}
      />

      <FinancialConcierge />
    </>
  );
}
