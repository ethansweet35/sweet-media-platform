import MHConditionPage, { type MHConditionData } from "./MHConditionPage";

const data: MHConditionData = {
  heroImage: "mh_insomnia_hero01.jpg",
  heroImageAlt: "Serene moonlit bedroom interior in California representing restful sleep and recovery from insomnia",
  category: "Insomnia",
  headline: "Insomnia &",
  headlineEmphasis: "Sleep Disorders",
  subhead: "Chronic insomnia is a treatable medical condition — not a character flaw or an inevitable consequence of a busy life. CBT-I, the evidence-based first-line treatment, produces lasting improvement superior to sleep medication.",
  quickFacts: [
    { value: "30%",    label: "Adults with Chronic Insomnia" },
    { value: "CBT-I",  label: "First-Line Treatment" },
    { value: "Linked", label: "to Depression & Anxiety" },
    { value: "Treatable", label: "Without Medication" },
  ],
  overviewTitle: "Understanding Insomnia and Sleep Disorders",
  overviewCol1: [
    "Insomnia disorder is characterized by persistent difficulty initiating or maintaining sleep, or early morning awakening, occurring at least 3 nights per week for at least 3 months, despite adequate opportunity for sleep — and producing significant daytime impairment. It is among the most common and most undertreated conditions in mental health.",
    "Insomnia is not simply a symptom of something else — it is a primary condition in its own right. While it frequently co-occurs with depression, anxiety, chronic pain, and substance use, insomnia often persists even after co-occurring conditions are effectively treated, because the behavioral and cognitive patterns that maintain it become self-perpetuating.",
  ],
  overviewCol2: [
    "The perpetuating factors in chronic insomnia — compensatory behaviors (sleeping in, napping), arousal conditioning (bed becomes a place of wakefulness rather than sleep), and dysfunctional beliefs about sleep — are the targets of CBT-I (Cognitive Behavioral Therapy for Insomnia), the most evidence-based treatment available.",
    "Sleep disorders interact bidirectionally with virtually every mental health condition treated at Rize OC. Insomnia worsens depression, anxiety, PTSD, and substance use recovery — and these conditions in turn worsen insomnia. Comprehensive mental health treatment must address sleep as a clinical priority.",
  ],
  signsLabel1: "Sleep & Nighttime Signs",
  signsLabel2: "Daytime Impact Signs",
  signsIcon1: "ri-moon-line",
  signsIcon2: "ri-sun-line",
  symptoms1: [
    { text: "Difficulty falling asleep despite feeling tired" },
    { text: "Waking up during the night and having trouble returning to sleep" },
    { text: "Waking earlier than desired and being unable to fall back asleep" },
    { text: "Spending excessive time in bed awake (sleep efficiency below 85%)" },
    { text: "Worrying about sleep while trying to fall asleep" },
    { text: "Clock-watching and calculating hours of sleep remaining" },
  ],
  symptoms2: [
    { text: "Persistent daytime fatigue and low energy" },
    { text: "Difficulty concentrating, remembering, or making decisions" },
    { text: "Irritability, mood disturbance, and low frustration tolerance" },
    { text: "Reduced motivation and decreased performance at work" },
    { text: "Relying on sleep aids (alcohol, OTC medications, prescription sedatives)" },
    { text: "Dreading bedtime because of anticipated difficulty sleeping" },
  ],
  consequences: [
    {
      icon: "ri-brain-line",
      title: "Mental Health Impact",
      desc: "Chronic insomnia is one of the strongest risk factors for developing depression — sleep disruption is both a symptom and a causal driver of mood disorders. Insomnia doubles the risk of depression and significantly worsens anxiety, PTSD, and bipolar disorder. Treating insomnia is often essential to effective mental health treatment.",
    },
    {
      icon: "ri-heart-pulse-line",
      title: "Physical Health Consequences",
      desc: "Chronic sleep deprivation impairs immune function, increases cardiovascular disease risk, disrupts metabolic regulation, increases pain sensitivity, and is associated with significantly increased accident and injury risk. The cumulative health burden of untreated insomnia is substantial.",
    },
    {
      icon: "ri-drop-line",
      title: "Substance Use Risk",
      desc: "Alcohol and sedative medications are commonly used to initiate sleep — providing short-term relief while dramatically worsening sleep architecture and creating dependence. In recovery from substance use disorders, insomnia is one of the most common relapse triggers. CBT-I addresses insomnia without the dependence risks of pharmacological approaches.",
    },
  ],
  treatmentSteps: [
    {
      title: "Sleep Assessment & Diary",
      desc: "Comprehensive sleep assessment including sleep history, sleep diary (2 weeks of data), and evaluation of co-occurring conditions (depression, anxiety, pain, substance use) contributing to sleep disruption. Ruling out sleep apnea and other sleep disorders requiring separate treatment.",
      detail: "The sleep diary is the most important diagnostic tool in insomnia — providing objective data on sleep patterns, compensatory behaviors, and sleep efficiency.",
    },
    {
      title: "Sleep Restriction Therapy",
      desc: "Consolidating sleep by initially restricting time in bed to match actual sleep time — strengthening the homeostatic sleep drive and rebuilding the association between bed and sleep. One of the most powerful components of CBT-I, and initially counterintuitive.",
      detail: "Sleep restriction temporarily increases daytime sleepiness before producing a dramatic improvement in sleep quality and efficiency. This temporary worsening is a normal and expected part of the process.",
    },
    {
      title: "Stimulus Control",
      desc: "Reconditioning the association between bed and wakefulness/arousal — using the bed only for sleep (and sex), getting out of bed if awake for more than 20 minutes, and establishing consistent wake times regardless of sleep quality.",
      detail: "Many insomnia sufferers inadvertently strengthen the bed-wakefulness association through compensatory behaviors. Stimulus control directly reverses this.",
    },
    {
      title: "Cognitive Restructuring",
      desc: "Addressing the dysfunctional beliefs and catastrophic thoughts about sleep that perpetuate arousal at bedtime — 'I must get 8 hours or tomorrow will be a disaster,' 'I'm never going to sleep normally again' — through evidence-based cognitive restructuring.",
      detail: "Sleep-related anxiety is one of the most powerful perpetuating factors in insomnia. Reducing this anxiety through cognitive work significantly improves sleep onset.",
    },
    {
      title: "Sleep Hygiene & Maintenance",
      desc: "Optimizing sleep environment and pre-sleep behaviors, managing caffeine and light exposure, and developing a long-term maintenance plan for sustaining sleep improvements beyond the active treatment period.",
      detail: "CBT-I produces lasting improvements that are maintained and often continue to improve after the active treatment phase ends — unlike sleep medications, whose effects end when the medication stops.",
    },
  ],
  faqs: [
    {
      q: "Why is CBT-I better than sleep medication?",
      a: "Multiple head-to-head clinical trials show that CBT-I produces outcomes at least as good as sleep medication in the short term — and substantially better in the long term. Medications provide temporary symptom relief but do not address the behavioral and cognitive patterns maintaining insomnia. When the medication stops, the insomnia returns. CBT-I produces lasting change in sleep patterns that persists after treatment ends. It also avoids the dependence, tolerance, and next-day sedation risks of pharmacological approaches.",
    },
    {
      q: "My insomnia is caused by my anxiety. Do I treat anxiety or insomnia first?",
      a: "Both, ideally — simultaneously. The relationship between insomnia and anxiety is bidirectional: anxiety drives insomnia, and sleep deprivation worsens anxiety. At Rize OC, both are addressed together. CBT for anxiety and CBT-I share overlapping techniques and can be integrated. Treating one without the other typically produces incomplete results for both.",
    },
    {
      q: "Is it safe to stop taking sleep medications?",
      a: "This depends on the medication. Over-the-counter sleep aids (antihistamines) can usually be discontinued without tapering. Prescription benzodiazepines and Z-drugs (Ambien, Lunesta) may require a physician-supervised taper, particularly after long-term use. Do not discontinue benzodiazepines abruptly — this carries seizure risk. Our medical team can supervise any necessary medication tapering while CBT-I builds the behavioral foundation for medication-free sleep.",
    },
  ],
  relatedPrograms: [
    {
      icon: "ri-sun-line",
      label: "Intensive",
      title: "Partial Hospitalization (PHP)",
      desc: "Daily CBT-I and psychiatric management for insomnia with significant co-occurring conditions.",
      href: "/partial-hospitalization-program-orange-county",
    },
    {
      icon: "ri-group-line",
      label: "Flexible",
      title: "Intensive Outpatient (IOP)",
      desc: "CBT-I alongside treatment for depression, anxiety, or addiction in an IOP format.",
      href: "/iop-program-orange-county",
    },
    {
      icon: "ri-video-line",
      label: "Remote",
      title: "Virtual Outpatient",
      desc: "Telehealth CBT-I and ongoing sleep management support throughout California.",
      href: "/virtual-outpatient-program",
    },
  ],
};

export default function Page() {
  return <MHConditionPage data={data} />;
}
