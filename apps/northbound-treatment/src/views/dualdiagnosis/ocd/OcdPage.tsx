import SubstancePageTemplate, { type SubstancePageData } from "@/views/shared/SubstancePageTemplate";

const BASE = "https://ahufsygjwpbymomfdazb.supabase.co/storage/v1/object/public/site-assets/images";

const data: SubstancePageData = {
  heroImage: `${BASE}/nbt_ocd_hero01.jpg`,
  heroImageAlt: "Woman checking and rechecking her door lock — the exhausting compulsion loop of OCD",
  substanceName: "OCD",
  substanceNameShort: "OCD",
  heroHeadline: "OCD Treatment & Addiction Counseling",
  heroItalicWord: "OCD",
  heroBody:
    "Approximately 3 million Americans live with OCD — and many self-medicate the relentless cycle of obsessions and compulsions with alcohol or drugs. Northbound specializes in treating OCD and co-occurring addiction together, through evidence-based therapy and a comprehensive dual diagnosis model.",

  whatItIsHeadline: "What Is OCD — and How Does It Lead to Addiction?",
  whatItIsBody: [
    "Obsessive-Compulsive Disorder (OCD) is a mental health condition characterized by recurring, intrusive, unwanted thoughts (obsessions) and repetitive behaviors or mental acts performed to reduce the anxiety they create (compulsions). The compulsions provide only temporary relief — the obsessions return, often intensified, triggering another cycle that can consume hours of every day.",
    "OCD manifests differently in each person. Some individuals fear contamination or harm to loved ones. Others obsess over order, symmetry, or religious purity. Some experience intrusive violent or sexual thoughts that horrify them. What all forms share is the same exhausting loop: obsession → anxiety → compulsion → temporary relief → obsession again.",
    "Because this cycle is so distressing and so persistent, many people with OCD turn to substances — alcohol, cannabis, or benzodiazepines — to quiet the mental noise. Over time, substance use becomes its own compulsion, layering addiction on top of OCD in a dual diagnosis that requires integrated clinical treatment to address both.",
  ],
  whatItIsImage: `${BASE}/nbt_ocd_therapy01.jpg`,
  whatItIsImageAlt: "Client and therapist working through OCD exposure hierarchy in CBT session at Northbound",
  quickStats: [
    { value: "3M+", label: "Americans currently living with OCD" },
    { value: "25%", label: "Of people with OCD develop a co-occurring substance use disorder" },
    { value: ">97%", label: "Drug abstinence rate in Northbound's USC outcomes study" },
  ],

  warningBody:
    "OCD is frequently misunderstood — mistaken for perfectionism, superstition, or controlling behavior. These warning signs indicate a clinical condition that requires professional evaluation and treatment.",
  warningSigns: [
    "Recurring intrusive thoughts, images, or urges that are unwanted and distressing",
    "Compulsive rituals: handwashing, checking, counting, ordering, mental reviewing",
    "Spending more than an hour each day consumed by obsessions or compulsions",
    "Significant distress when unable to perform rituals or when rituals are interrupted",
    "Using alcohol or substances to 'quiet' obsessive thoughts or reduce anxiety",
    "Avoidance of situations, people, or objects that trigger obsessional fears",
    "Relationship difficulties caused by rituals, reassurance-seeking, or avoidance",
    "Difficulty functioning at work or school due to time consumed by OCD symptoms",
    "Hording behaviors — difficulty discarding items regardless of their value",
    "Intrusive, ego-dystonic thoughts about harm, religion, or sexuality that are frightening and unwanted",
  ],

  recoveryHeadline: "What OCD & Addiction Recovery Looks Like at Northbound",
  recoveryIntro:
    "OCD treatment requires specialized therapeutic approaches — particularly Exposure and Response Prevention (ERP) — alongside integrated addiction treatment. Northbound provides the expertise, structure, and safety needed for both conditions to heal.",
  careSteps: [
    {
      phase: "Week 1–2",
      title: "OCD & Addiction Dual Diagnosis Assessment",
      icon: "ri-mental-health-line",
      body: "Our clinical team conducts a comprehensive evaluation of OCD presentation type, severity, and history alongside substance use patterns. This determines the sequencing and priorities of the individualized treatment plan.",
    },
    {
      phase: "Week 1–3",
      title: "Stabilization & Medically Supervised Detox",
      icon: "ri-heart-pulse-line",
      body: "When substances are involved, safe medical detox is the first clinical priority. Our 24/7 team monitors withdrawal and begins psychiatric stabilization — often including short-term medication support for OCD symptoms — in parallel.",
    },
    {
      phase: "Weeks 3–12+",
      title: "ERP-Centered Residential Treatment",
      icon: "ri-home-heart-line",
      body: "Exposure and Response Prevention (ERP) — the gold-standard treatment for OCD — is integrated into individual therapy and structured exercises throughout residential programming, alongside CBT, group therapy, and holistic modalities.",
    },
    {
      phase: "Months 2–4",
      title: "Intensive Outpatient with Continued ERP",
      icon: "ri-calendar-check-line",
      body: "IOP programming continues ERP work in real-world settings — exactly where OCD tends to reassert itself — while maintaining therapeutic structure and peer support through the step-down transition.",
    },
    {
      phase: "Ongoing",
      title: "Aftercare & Alumni Support",
      icon: "ri-community-line",
      body: "OCD is a chronic condition that benefits from long-term monitoring and support. Northbound's alumni program provides continued clinical connection and relapse prevention resources for both OCD symptoms and substance use.",
    },
  ],

  differentiators: [
    {
      icon: "ri-brain-line",
      title: "ERP — The Gold Standard for OCD",
      body: "Exposure and Response Prevention is the most evidence-supported treatment for OCD, with decades of clinical research confirming its effectiveness. Northbound's therapists are trained in proper ERP protocols.",
    },
    {
      icon: "ri-microscope-line",
      title: "CBT as the Foundation",
      body: "Cognitive Behavioral Therapy addresses the distorted thinking patterns that fuel obsessional beliefs — building the metacognitive awareness needed to observe OCD thoughts without acting on them.",
    },
    {
      icon: "ri-heart-pulse-line",
      title: "Psychiatric Expertise for OCD Medication",
      body: "SRIs and other OCD-indicated medications require careful dosing and monitoring. Our dual board-certified Medical Director oversees all psychiatric medication management with precision and regular re-evaluation.",
    },
    {
      icon: "ri-shield-check-line",
      title: "Non-Judgmental Understanding of OCD",
      body: "Many clients with OCD carry intense shame about their intrusive thoughts. Northbound's clinical team is trained to normalize the ego-dystonic nature of OCD — creating the safety needed for genuine engagement with treatment.",
    },
    {
      icon: "ri-sun-line",
      title: "Holistic Support — Beyond Compulsion Management",
      body: "Recovery from OCD and addiction requires more than symptom suppression. Northbound's outdoor programming, experiential therapies, and community structure support the full person — building a life that OCD cannot dominate.",
    },
    {
      icon: "ri-team-line",
      title: "2:1 Staff-to-Client Ratio",
      body: "OCD treatment requires a high level of individual attention and therapeutic precision. Northbound's 2:1 staffing ratio ensures that every client receives the personalized clinical care their recovery demands.",
    },
  ],

  closingImage: `${BASE}/nbt_ocd_recovery01.jpg`,
  closingImageAlt: "Person locking their door once and walking away — the freedom from OCD's compulsion loop in recovery",
  closingHeadline: "The Loop Can Be Broken",
  closingQuote:
    "OCD tells you that if you just do the ritual one more time, you'll finally feel safe. The truth is that safety was always possible — without the ritual.",
  closingBody: [
    "OCD is one of the most treatable mental health conditions in existence when properly diagnosed and addressed with evidence-based care. At Northbound, our specialized dual diagnosis treatment has helped hundreds of people break free from the obsession-compulsion cycle and the substance use that accompanied it — building lives of genuine freedom, not just managed symptoms.",
  ],
  faqs: [
    {
      question: "What is Exposure and Response Prevention (ERP) and how does it work?",
      answer:
        "ERP is the gold-standard treatment for OCD. It involves gradually and deliberately exposing the client to situations that trigger obsessional fear — while helping them refrain from performing compulsions. Over time, the brain learns that the feared outcome doesn't occur and that anxiety subsides on its own, breaking the obsession-compulsion cycle.",
    },
    {
      question: "Can OCD and addiction be treated at the same time?",
      answer:
        "Yes. Integrated dual diagnosis treatment produces significantly better outcomes than treating each condition separately. Northbound addresses OCD symptoms and substance use from the beginning of treatment — building stability in both areas simultaneously.",
    },
    {
      question: "Does medication help OCD?",
      answer:
        "Yes, for many clients. SRIs (serotonin reuptake inhibitors) are the most evidence-supported medications for OCD, often at higher doses than used for depression. Medication decisions are made collaboratively with our psychiatric team and reviewed regularly.",
    },
    {
      question: "What if I'm embarrassed about my OCD thoughts?",
      answer:
        "The intrusive thoughts that characterize OCD are ego-dystonic — meaning they feel foreign and deeply upsetting to the person experiencing them. Our clinical team understands this and creates a non-judgmental environment where clients can disclose their OCD honestly without fear of being misunderstood.",
    },
    {
      question: "How long does OCD treatment take?",
      answer:
        "OCD is a chronic condition, but symptoms can be dramatically reduced with appropriate treatment. Most clients benefit from 45–90 days of structured programming, with continued IOP and aftercare support. Many achieve significant and lasting symptom reduction within this timeframe.",
    },
    {
      question: "Does Northbound accept insurance for OCD and addiction treatment?",
      answer:
        "Yes. We are in-network with more than 15 major insurance plans. Our admissions team verifies your benefits within 24 hours and manages insurance navigation on your behalf.",
    },
  ],

  relatedSubstances: [
    { label: "Anxiety Disorders", href: "/treatment/dual-diagnosis/treatment-for-anxiety-disorders/", icon: "ri-heart-pulse-line" },
    { label: "Depression", href: "/treatment/mental-health-disorders/depression/", icon: "ri-emotion-sad-line" },
    { label: "Trauma & PTSD", href: "/treatment/mental-health-disorders/trauma-therapy/", icon: "ri-mental-health-line" },
    { label: "Bipolar Disorder", href: "/treatment/mental-health-disorders/bipolar-disorder/", icon: "ri-exchange-line" },
  ],
};

export default function OcdPage() {
  return <SubstancePageTemplate data={data} />;
}
