import SubstancePageTemplate, { type SubstancePageData } from "@/views/shared/SubstancePageTemplate";

const BASE = "https://ahufsygjwpbymomfdazb.supabase.co/storage/v1/object/public/site-assets/images";

const data: SubstancePageData = {
  /* ── Hero ─────────────────────────────────────────────────────────── */
  heroImage: `${BASE}/nbt_prescription_hero01.jpg`,
  heroImageAlt: "Prescription bottle being emptied into a waiting hand — the quiet, invisible reality of prescription drug addiction",
  substanceName: "Prescription Drugs",
  heroHeadline: "Prescription Drug Addiction Treatment",
  heroItalicWord: "Addiction",
  heroBody:
    "Prescription drug addiction often starts with a legitimate prescription — and escalates invisibly, long before anyone recognizes the problem. At Northbound, we understand that you didn't choose this. And we know how to help you get out.",

  /* ── Understanding ────────────────────────────────────────────────── */
  whatItIsHeadline: "Understanding Prescription Drug Addiction",
  whatItIsBody: [
    "Prescription drug abuse is the third most common form of substance abuse in the United States — behind only alcohol and marijuana. The most commonly misused prescription drugs include opioid painkillers (OxyContin, Vicodin, Dilaudid), benzodiazepines (Xanax, Valium, Klonopin), and prescription stimulants (Ritalin, Adderall). Each class carries distinct physiological dependency risks and requires a specific clinical approach to safely detox and treat.",
    "Addiction to prescription drugs develops through several pathways: escalating doses beyond what's prescribed, using pills for reasons beyond their medical purpose (euphoria, escape, stress relief), and eventually sourcing drugs through illegitimate channels when legitimate prescriptions run out. The progression from appropriate medical use to addiction can be gradual and nearly invisible — even to the person experiencing it.",
    "Addiction rates are highest in people ages 18–25 — often before they've fully established their adult lives. Prescription drug dependency disrupts education, career trajectories, relationships, and identity formation during the most formative years. Northbound specializes in helping young adults heal, develop their identity, and establish a healthy and balanced lifestyle beyond pills.",
  ],
  whatItIsImage: `${BASE}/nbt_prescription_therapy01.jpg`,
  whatItIsImageAlt: "Patient consulting with a doctor about prescription drug dependency — beginning the path to treatment at Northbound",
  quickStats: [
    { value: "20%", label: "Of Americans 12+ have misused a prescription drug at least once" },
    { value: "#3", label: "Prescription drugs rank as the third most abused substance in the US" },
    { value: ">97%", label: "Drug abstinence rate in Northbound's USC outcomes study" },
  ],

  /* ── Warning Signs ────────────────────────────────────────────────── */
  warningBody:
    "Prescription drug addiction is uniquely easy to rationalize — 'a doctor prescribed it, so it can't be that bad.' These are the clinical warning signs that use has become addictive and that professional treatment is needed.",
  warningSigns: [
    "Taking pills in higher doses or more frequently than prescribed",
    "Using prescription drugs for reasons unrelated to the medical condition they were prescribed for",
    "Forging prescriptions or visiting multiple doctors to obtain more medication",
    "Stealing pills from friends' or family members' medicine cabinets",
    "Purchasing prescription drugs illegally on the street",
    "Excessive mood swings: euphoric when using, irritable or anxious when not",
    "Increased need for sleep, or the opposite — revved up, unable to rest",
    "A voice inside telling you that the way you're using isn't quite right",
    "Continuing to use despite negative consequences at work, school, or in relationships",
    "Physical withdrawal symptoms when stopping: pain, seizures, anxiety, tremors",
  ],

  /* ── Treatment Continuum ──────────────────────────────────────────── */
  recoveryHeadline: "What Prescription Drug Recovery Looks Like at Northbound",
  recoveryIntro:
    "Prescription drug recovery requires a carefully managed detoxification — particularly for benzodiazepines, where stopping abruptly can be lethal — followed by comprehensive treatment addressing the underlying drivers of use. Northbound provides the full continuum.",
  careSteps: [
    {
      phase: "Days 1–14",
      title: "Medically Supervised Detox",
      icon: "ri-heart-pulse-line",
      body: "Prescription drug detox requires precise clinical management. Benzodiazepine withdrawal (Xanax, Klonopin, Valium) can cause fatal seizures without medical supervision. Opioid withdrawal produces severe physical symptoms requiring medication-assisted management. Northbound's one-eighty detox program provides 24/7 medical supervision with evidence-based medication protocols tailored to the specific substance.",
    },
    {
      phase: "Weeks 2–12+",
      title: "Residential Inpatient Treatment",
      icon: "ri-home-heart-line",
      body: "Residential care provides 24/7 immersive clinical treatment addressing both the prescription drug dependency and its underlying drivers. Individual therapy, group counseling, CBT, DBT, EMDR, psychiatric care, and dual-diagnosis treatment help clients understand what the pills were masking — and develop genuine alternatives for managing pain, anxiety, and stress.",
    },
    {
      phase: "Month 2–4",
      title: "Partial Hospitalization Program (PHP)",
      icon: "ri-sun-line",
      body: "PHP provides intensive 5-day-per-week clinical programming as clients begin transitioning from residential care. This phase continues the therapeutic work while building the daily structure, coping strategies, and lifestyle habits that support prescription-free living.",
    },
    {
      phase: "Month 3–6",
      title: "Virtual IOP (HomeBound)",
      icon: "ri-wifi-line",
      body: "Virtual IOP allows clients to reintegrate into work, family, or school while maintaining 10–12 hours of weekly therapeutic support. Northbound walks with clients as they rediscover life free from pills — experiencing the joys and struggles of real life, with a clinical team alongside them.",
    },
    {
      phase: "Ongoing",
      title: "Aftercare & Alumni Program",
      icon: "ri-refresh-line",
      body: "Northbound's alumni program provides the ongoing community, accountability, and resources that sustain long-term recovery from prescription drug addiction. Our goal is sobriety and genuine thriving — not just abstinence.",
    },
  ],

  /* ── Why Northbound ───────────────────────────────────────────────── */
  differentiators: [
    {
      icon: "ri-heart-pulse-line",
      title: "Specialized Detox for Every Substance Class",
      body: "Different prescription drugs require very different detox approaches. Benzodiazepine withdrawal can be lethal; opioid withdrawal requires MAT. Northbound's medical team is experienced in the specific protocols for each substance class — ensuring every detox is managed as safely and comfortably as possible.",
    },
    {
      icon: "ri-brain-line",
      title: "Dual-Diagnosis Treatment",
      body: "Prescription drug addiction most often co-occurs with anxiety, depression, chronic pain, and trauma — often the very conditions the drug was originally prescribed for. Northbound treats both simultaneously, identifying non-pharmaceutical solutions to the underlying pain and distress.",
    },
    {
      icon: "ri-user-line",
      title: "2:1 Staff-to-Client Ratio",
      body: "Every client at Northbound receives deeply individualized clinical attention. Our 2:1 ratio allows treatment plans to be dynamically adjusted — particularly critical in prescription drug detox, where the medical picture can shift rapidly.",
    },
    {
      icon: "ri-graduation-cap-line",
      title: "Young Adult Specialization",
      body: "Prescription drug addiction rates are highest among 18–25 year olds. Northbound specializes in helping young adults heal, develop their identity, and establish a healthy lifestyle — using Collegebound® and Careerbound® programs to rebuild educational and professional trajectories during treatment.",
    },
    {
      icon: "ri-shield-check-line",
      title: "38+ Years of Clinical Experience",
      body: "Northbound has been treating prescription drug addiction through every phase of America's opioid epidemic and beyond. Our clinical team brings 200+ combined years of behavioral healthcare expertise — including deep experience with opioid, benzodiazepine, and stimulant dependency.",
    },
    {
      icon: "ri-award-line",
      title: "Insurance Access & Accreditation",
      body: "DHCS licensed (#300661CP) and NAATP member, Northbound is in-network with 15+ major plans. Our admissions team verifies your specific benefits at no cost — including for prescription drug treatment that may also involve heroin as a downstream consequence of opioid dependency.",
    },
  ],

  /* ── Closing Split ────────────────────────────────────────────────── */
  closingImage: `${BASE}/nbt_prescription_recovery01.jpg`,
  closingImageAlt: "Group of people laughing and connecting in recovery — the community and joy of life after prescription drug addiction",
  closingHeadline: "Life Beyond Pills Is Not Only Possible — It's Waiting for You.",
  closingBody: [
    "You have lived with the assistance of pills for a long time. It's going to take real work to figure out life without them. But sobriety isn't enough — Northbound walks with clients as they learn to truly thrive in life and in recovery. We aim not just for freedom from pills, but for a life of genuine meaning, connection, and purpose.",
    "To find out more about the Northbound experience, call us. We have intake professionals available any time to answer your questions and support you.",
  ],
  closingQuote:
    "We help clients transition seamlessly into a new, better, sober life — moving beyond the confines of traditional treatment.",

  /* ── FAQ ──────────────────────────────────────────────────────────── */
  faqs: [
    {
      question: "Is prescription drug withdrawal dangerous?",
      answer:
        "It depends on the substance. Benzodiazepine withdrawal (Xanax, Klonopin, Valium) can be life-threatening — electrical firestorms in the brain, seizures, and hallucinations can occur without medical supervision. Opioid withdrawal is rarely fatal but produces severe physical symptoms. Stimulant withdrawal is primarily psychological but clinically significant. Northbound's medically supervised detox program handles all three safely.",
    },
    {
      question: "I have a legitimate prescription. Can I still be addicted?",
      answer:
        "Yes. Having a valid prescription does not prevent addiction from developing — particularly when doses are escalated beyond what's prescribed, or when the drug is used for reasons beyond its medical purpose. Psychological and physical dependency can develop even when medication is used 'as directed' in some cases. If use feels out of control, it's worth speaking with a clinician.",
    },
    {
      question: "What's the risk of prescription drug addiction leading to heroin use?",
      answer:
        "It is a well-documented pathway. Research shows that prescription opioid addiction frequently leads to heroin use — often when legitimate prescriptions run out or become too expensive, and a street dealer offers heroin as a cheaper alternative. Northbound treats both prescription opioid and heroin dependency, often in the same clients.",
    },
    {
      question: "How long does prescription drug treatment take?",
      answer:
        "Northbound offers 30, 60, and 90-day programs. The appropriate duration depends on the specific substance (benzodiazepines typically require longer treatment timelines than opioids), severity of dependency, and co-occurring conditions. Research consistently supports 90 days or more for the strongest long-term outcomes.",
    },
    {
      question: "Will insurance cover prescription drug rehab?",
      answer:
        "In most cases, yes. Northbound is in-network with 15+ major plans including Aetna, Anthem, Cigna, and Tricare. Our admissions team verifies your specific benefits at no cost before you commit to anything.",
    },
    {
      question: "Can Northbound treat prescription drug addiction alongside anxiety or chronic pain?",
      answer:
        "Yes — and it is essential. Anxiety disorders and chronic pain are among the most common reasons prescription drug dependency begins. Northbound's dual-diagnosis program and psychiatric team develop non-pharmaceutical approaches to managing these underlying conditions alongside evidence-based addiction treatment.",
    },
  ],

  /* ── Related ──────────────────────────────────────────────────────── */
  relatedSubstances: [
    { label: "Heroin Addiction", href: "/treatment/heroin/", icon: "ri-heart-pulse-line" },
    { label: "Adderall Addiction", href: "/treatment/adderall/", icon: "ri-capsule-line" },
    { label: "Alcohol Addiction", href: "/treatment/alcoholism/", icon: "ri-cup-line" },
    { label: "Cocaine / Crack", href: "/treatment/crack-cocaine/", icon: "ri-drop-line" },
    { label: "Meth Addiction", href: "/treatment/meth/", icon: "ri-fire-line" },
    { label: "Marijuana", href: "/treatment/marijuana/", icon: "ri-leaf-line" },
  ],

  substanceNameShort: "Prescription Drugs",
};

export default function PrescriptionPage() {
  return <SubstancePageTemplate data={data} />;
}
