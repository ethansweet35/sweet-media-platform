import SubstancePageTemplate, { type SubstancePageData } from "@/views/shared/SubstancePageTemplate";

const BASE = "https://ahufsygjwpbymomfdazb.supabase.co/storage/v1/object/public/site-assets/images";

const data: SubstancePageData = {
  heroImage: `${BASE}/nbt_trauma_hero01.jpg`,
  heroImageAlt: "Veteran sitting alone on a park bench, watchful and guarded — the hypervigilance of living with trauma",
  substanceName: "Trauma & PTSD",
  substanceNameShort: "Trauma",
  heroHeadline: "Trauma & PTSD Addiction Treatment",
  heroItalicWord: "Trauma",
  heroBody:
    "Trauma is at the root of almost every addiction. Whether it stems from combat, childhood abuse, sexual assault, or sudden loss, unresolved trauma drives substance use in ways that pure addiction treatment cannot address alone. At Northbound, trauma and addiction are treated as one.",

  whatItIsHeadline: "Understanding Trauma, PTSD, and the Path to Addiction",
  whatItIsBody: [
    "Trauma is the psychological distress that follows experiencing or witnessing a harrowing event — violence, sexual abuse, childhood neglect, combat exposure, accidents, or sudden loss. Not everyone who experiences trauma develops lasting symptoms, but many do — and for those who do, the impact can be severe, pervasive, and chronic.",
    "When trauma goes untreated, the brain remains in a state of threat response — hypervigilant, reactive, unable to feel safe even in objectively safe environments. This persistent dysregulation drives many people toward substance use as the only available relief. Alcohol numbs intrusive memories. Opioids quiet the nervous system. Stimulants provide a sense of control. Over time, these coping mechanisms become dependencies that compound the trauma rather than heal it.",
    "Post-Traumatic Stress Disorder (PTSD) is the clinical diagnosis when trauma symptoms persist beyond the acute aftermath of an event. PTSD is characterized by flashbacks, nightmares, hypervigilance, emotional numbness, avoidance behaviors, and intense distress triggered by ordinary reminders. Northbound specializes in treating PTSD, childhood trauma, and sexual trauma alongside co-occurring addiction through a trauma-informed dual diagnosis model.",
  ],
  whatItIsImage: `${BASE}/nbt_trauma_therapy01.jpg`,
  whatItIsImageAlt: "EMDR therapy session for trauma treatment at Northbound Treatment Services Orange County",
  quickStats: [
    { value: "70%", label: "Of adults in the U.S. have experienced at least one traumatic event" },
    { value: "3x", label: "People with PTSD are three times more likely to develop a substance use disorder" },
    { value: ">97%", label: "Drug abstinence rate in Northbound's USC outcomes study" },
  ],

  warningBody:
    "Trauma and PTSD often go unrecognized when substance use is present — the substances suppress the symptoms until they don't. These warning signs indicate a trauma and addiction dual diagnosis requiring professional treatment.",
  warningSigns: [
    "Intrusive memories, flashbacks, or nightmares related to a past traumatic event",
    "Hypervigilance — constant scanning for threat even in safe environments",
    "Using alcohol or drugs to numb emotional pain, intrusive memories, or anxiety",
    "Emotional numbness — feeling cut off from others, detached from your own life",
    "Avoidance of people, places, or situations that remind you of the trauma",
    "Intense, distressing reactions to ordinary triggers that remind you of the event",
    "Sleep disruptions: insomnia, nightmares, difficulty staying asleep",
    "Explosive anger, irritability, or aggressive outbursts that feel out of proportion",
    "Concentration and memory problems that affect work or daily function",
    "Withdrawal from relationships, activities, and life roles you previously valued",
  ],

  recoveryHeadline: "What Trauma & Addiction Recovery Looks Like at Northbound",
  recoveryIntro:
    "Healing trauma alongside addiction requires a trauma-informed clinical environment, specialized therapeutic modalities, and a safe, regulated pathway through difficult material. Northbound provides the full continuum of care built around this principle.",
  careSteps: [
    {
      phase: "Week 1–2",
      title: "Trauma & Addiction Assessment",
      icon: "ri-mental-health-line",
      body: "Our clinical team conducts a comprehensive trauma history, PTSD severity assessment, and substance use evaluation. Exposure-pacing and trauma readiness are assessed before any trauma-focused therapy begins.",
    },
    {
      phase: "Week 1–3",
      title: "Stabilization & Medically Supervised Detox",
      icon: "ri-heart-pulse-line",
      body: "Safe detox from substances is managed 24/7 by our clinical staff. Concurrently, our psychiatric team addresses acute trauma symptoms — including hyperarousal, insomnia, and dissociation — through medication-assisted stabilization when appropriate.",
    },
    {
      phase: "Weeks 3–12+",
      title: "Trauma-Focused Residential Treatment",
      icon: "ri-home-heart-line",
      body: "Residential programming integrates EMDR, CBT, exposure therapy, trauma-focused group therapy, psychoeducation, and holistic modalities including yoga, art therapy, and music therapy — all within a trauma-informed framework that prioritizes safety and avoids retraumatization.",
    },
    {
      phase: "Months 2–4",
      title: "Partial Hospitalization & Intensive Outpatient",
      icon: "ri-calendar-check-line",
      body: "Step-down programming continues trauma processing in a less intensive format, supporting clients as they reintegrate — returning to school, work, and relationships with new coping skills and growing resilience.",
    },
    {
      phase: "Ongoing",
      title: "Aftercare & Alumni Support",
      icon: "ri-community-line",
      body: "Trauma recovery is not linear. Northbound's alumni program provides continued connection, relapse prevention resources, and access to clinical support throughout long-term recovery.",
    },
  ],

  differentiators: [
    {
      icon: "ri-brain-line",
      title: "EMDR — A Gold Standard for Trauma",
      body: "Eye Movement Desensitization and Reprocessing (EMDR) is among the most evidence-supported therapies for PTSD. Northbound's therapists are trained in EMDR and integrate it into individualized trauma treatment plans.",
    },
    {
      icon: "ri-shield-check-line",
      title: "Trauma-Informed Care Principles",
      body: "Everything at Northbound — from clinical interactions to residential environment design — is built on trauma-informed care. Safety, trust, transparency, peer support, collaboration, and empowerment are the foundation.",
    },
    {
      icon: "ri-microscope-line",
      title: "Diverse Trauma Modalities",
      body: "Beyond EMDR, we integrate exposure therapy, CBT, somatic approaches, art therapy, music therapy, and yoga — recognizing that trauma lives in the body and requires more than talk therapy to heal.",
    },
    {
      icon: "ri-sun-line",
      title: "Outdoor Programming & Nature Therapy",
      body: "Research supports the healing power of outdoor activity, sunlight, and physical movement for trauma recovery. Northbound's Southern California environment — with surfing, hiking, and coastal access — makes this a daily therapeutic resource.",
    },
    {
      icon: "ri-heart-pulse-line",
      title: "Psychiatric Integration",
      body: "Our dual board-certified Medical Director provides psychiatric oversight for trauma clients — including medication management for PTSD symptoms such as hyperarousal, nightmares, and dissociation.",
    },
    {
      icon: "ri-team-line",
      title: "1/3 of Staff Are Program Alumni",
      body: "One-third of Northbound's team have personal experience with addiction and recovery — many with their own trauma histories — bringing lived understanding and genuine empathy to every clinical interaction.",
    },
  ],

  closingImage: `${BASE}/nbt_trauma_recovery01.jpg`,
  closingImageAlt: "Person meditating in sunlit garden — the hard-won safety and peace of trauma recovery",
  closingHeadline: "You Don't Have to Be Defined by What Happened to You",
  closingQuote:
    "Trauma treatment at Northbound isn't about reliving the past — it's about reclaiming a future. Safety first, healing second, freedom always.",
  closingBody: [
    "At Northbound, we understand that trauma is at the root of almost every addiction — and that genuine healing requires addressing both. Our integrated, trauma-informed dual diagnosis model has helped thousands of people break the cycle of self-medication and build lives defined by resilience, connection, and sobriety. Your recovery is not only possible — it's what we do every day.",
  ],
  faqs: [
    {
      question: "Can trauma and addiction be treated at the same time?",
      answer:
        "Yes — integrated treatment is not only possible but clinically necessary for lasting recovery. Treating addiction without addressing underlying trauma consistently results in relapse. Northbound's dual diagnosis model treats both from the first day of assessment.",
    },
    {
      question: "What is EMDR and is it safe?",
      answer:
        "EMDR (Eye Movement Desensitization and Reprocessing) is a highly researched, evidence-based therapy that helps the brain reprocess traumatic memories so they no longer trigger distress. It is safe, widely used, and particularly effective for PTSD. Our therapists are trained in proper EMDR protocols.",
    },
    {
      question: "What types of trauma does Northbound treat?",
      answer:
        "We treat PTSD, childhood trauma, sexual trauma, combat/military trauma, grief and loss, and complex trauma. Each client's history is assessed individually, and treatment is customized accordingly.",
    },
    {
      question: "Do I have to talk about my trauma in group sessions?",
      answer:
        "No. Trauma processing happens at the client's own pace and primarily in individual sessions. Group programming focuses on coping skills, peer support, and psychoeducation — never on forced disclosure of personal trauma history.",
    },
    {
      question: "What if I've tried trauma therapy before and it didn't work?",
      answer:
        "Prior trauma therapy that didn't work often reflects incomplete treatment — particularly when addiction was active during the attempt. Northbound's integrated model provides the clinical structure and stability needed for trauma processing to genuinely take hold.",
    },
    {
      question: "Does Northbound accept insurance for trauma and addiction treatment?",
      answer:
        "Yes. We are in-network with more than 15 major insurance plans. Our admissions team verifies benefits within 24 hours and manages the process so you can focus on beginning treatment.",
    },
  ],

  relatedSubstances: [
    { label: "Anxiety Disorders", href: "/treatment/dual-diagnosis/treatment-for-anxiety-disorders/", icon: "ri-heart-pulse-line" },
    { label: "Depression", href: "/treatment/mental-health-disorders/depression/", icon: "ri-emotion-sad-line" },
    { label: "OCD", href: "/treatment/dual-diagnosis/ocd-treatment-and-counseling/", icon: "ri-repeat-line" },
    { label: "Borderline Personality Disorder", href: "/treatment/mental-health-disorders/borderline-personality-disorder/", icon: "ri-user-heart-line" },
  ],
};

export default function TraumaPage() {
  return <SubstancePageTemplate data={data} />;
}
