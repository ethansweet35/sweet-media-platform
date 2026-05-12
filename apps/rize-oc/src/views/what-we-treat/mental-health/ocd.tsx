import MHConditionPage, { type MHConditionData } from "./MHConditionPage";

const data: MHConditionData = {
  heroImage: "mh_ocd_hero01.jpg",
  heroImageAlt: "Beautifully ordered minimal zen interior space representing the peace that comes through OCD treatment at Rize OC",
  category: "OCD",
  headline: "Obsessive Compulsive",
  headlineEmphasis: "Disorder",
  subhead: "OCD is a serious, often debilitating condition — but also a highly treatable one. Exposure and Response Prevention (ERP), the gold-standard treatment, produces lasting recovery that medication alone cannot achieve.",
  quickFacts: [
    { value: "ERP",    label: "Gold-Standard Treatment" },
    { value: "2–3%",   label: "Adult Prevalence" },
    { value: "Often",  label: "Misunderstood Condition" },
    { value: "Highly", label: "Treatable" },
  ],
  overviewTitle: "Understanding Obsessive-Compulsive Disorder",
  overviewCol1: [
    "OCD is characterized by obsessions — intrusive, unwanted thoughts, images, or urges that cause significant distress — and compulsions — repetitive behaviors or mental acts performed to reduce the anxiety caused by obsessions. The temporary relief provided by compulsions maintains and strengthens the OCD cycle.",
    "OCD is often misunderstood as a personality quirk ('I'm so OCD about my desk') or characterized primarily by cleanliness and order — stereotypes that leave the majority of people with OCD unrecognized. The condition actually encompasses a wide range of obsessional content: harm, contamination, religion/morality (scrupulosity), sexuality, relationships, and existential themes, among many others.",
  ],
  overviewCol2: [
    "The neuroscience of OCD involves hyperactivity in cortico-striato-thalamo-cortical (CSTC) circuits — particularly the orbitofrontal cortex and caudate nucleus. This circuit appears to produce a false 'danger signal' that is not appropriately habituated, driving the repetitive checking and ritual behaviors that characterize OCD.",
    "ERP (Exposure and Response Prevention), the evidence-based treatment of choice, works by systematically exposing clients to obsessional triggers while preventing the compulsive response — allowing the anxiety to naturally subside and retraining the brain's threat-detection system. Combined with medication (SSRIs at therapeutic doses), ERP produces strong and durable outcomes.",
  ],
  signsLabel1: "Obsessions (Intrusive Thoughts)",
  signsLabel2: "Compulsions (Rituals & Avoidance)",
  signsIcon1: "ri-brain-line",
  signsIcon2: "ri-repeat-line",
  symptoms1: [
    { text: "Fear of contamination — germs, dirt, chemicals, illness" },
    { text: "Unwanted violent or aggressive thoughts or images" },
    { text: "Intrusive sexual or taboo thoughts that feel ego-dystonic" },
    { text: "Religious or moral obsessions (scrupulosity)" },
    { text: "Symmetry, exactness, or 'just right' feelings that must be satisfied" },
    { text: "Fear of accidentally harming self or others" },
  ],
  symptoms2: [
    { text: "Excessive washing, cleaning, or sanitizing rituals" },
    { text: "Checking — locks, appliances, sending emails, physical health symptoms" },
    { text: "Ordering and arranging objects until they feel 'right'" },
    { text: "Counting, repeating, or touching rituals" },
    { text: "Mental compulsions — reviewing, analyzing, neutralizing thoughts" },
    { text: "Reassurance seeking from others about feared situations" },
  ],
  consequences: [
    {
      icon: "ri-time-line",
      title: "Time & Functional Impairment",
      desc: "Moderate to severe OCD can consume hours of each day in compulsive rituals, avoidance behaviors, and mental review. Work, relationships, self-care, and leisure are progressively sacrificed. The OCD cycle expands — what begins with one trigger generalizes to many — without effective treatment.",
    },
    {
      icon: "ri-mental-health-line",
      title: "Psychological Suffering",
      desc: "The experience of OCD — having horrifying, intrusive thoughts that feel like evidence of one's own character; being compelled to perform exhausting rituals while knowing they are irrational; being unable to stop — involves a level of internal suffering that is rarely visible to others. Depression, shame, and isolation are extremely common consequences.",
    },
    {
      icon: "ri-group-line",
      title: "Relational Impact",
      desc: "OCD impacts relationships profoundly — through time consumed by rituals, reassurance-seeking from partners and family (which maintains the cycle), avoidance of shared activities, and the shame that prevents disclosure. Partners and family members need psychoeducation and may need guidance on how to avoid inadvertently accommodating OCD.",
    },
  ],
  treatmentSteps: [
    {
      title: "OCD Assessment & Hierarchy",
      desc: "Comprehensive OCD assessment establishing the full range of obsessions, compulsions, and avoidance behaviors — and their relative distress and impairment levels. Construction of an individualized ERP hierarchy from lowest to highest anxiety-provoking triggers.",
      detail: "The ERP hierarchy is developed collaboratively and paced carefully. ERP works best when the therapist and client have a strong alliance and a shared understanding of the treatment rationale.",
    },
    {
      title: "Psychoeducation on the OCD Cycle",
      desc: "Understanding why compulsions maintain OCD rather than resolving it — the crucial counterintuitive insight that drives ERP compliance. Normalizing the occurrence of intrusive thoughts (which are universal) and distinguishing thoughts from actions or character.",
      detail: "Most people with OCD feel intensely ashamed of their obsessional content — particularly violent, sexual, or blasphemous thoughts. Psychoeducation on thought-action fusion and the universality of intrusive thoughts is powerfully normalizing.",
    },
    {
      title: "Exposure and Response Prevention (ERP)",
      desc: "Systematic, graduated exposure to obsessional triggers while refraining from compulsive responses — allowing anxiety to naturally subside through habituation and inhibitory learning. Progressing from lower to higher items on the anxiety hierarchy.",
      detail: "ERP is challenging. Temporarily increasing anxiety is part of how it works. The therapeutic relationship, clear rationale, and careful pacing make it achievable and transformative.",
    },
    {
      title: "SSRI Medication Management",
      desc: "SSRIs at therapeutic doses (often higher than used for depression or anxiety) significantly improve OCD symptoms and enhance ERP outcomes. Clomipramine is used in treatment-resistant cases. Our psychiatrists manage medication alongside ERP therapy.",
      detail: "SSRIs and ERP together produce substantially better outcomes than either alone for moderate-severe OCD. The combination is the clinical standard.",
    },
    {
      title: "Relapse Prevention & Generalization",
      desc: "Extending ERP gains to new situations, preventing relapse by continuing to confront rather than avoid triggers, and developing a personalized plan for maintaining recovery — including when and how to seek support if OCD begins to re-escalate.",
      detail: "OCD can re-escalate during stress. Having an explicit plan for early intervention prevents what could be a brief spike from becoming a full relapse.",
    },
  ],
  faqs: [
    {
      q: "Is OCD just about being clean and organized?",
      a: "The popular depiction of OCD as a neat-freak quirk is a significant distortion that leaves the majority of people with OCD unrecognized and undertreated. OCD obsessions span an enormous range of content — contamination is one type, but harm obsessions, sexual and taboo obsessions, religious/moral scrupulosity, 'just right' and symmetry obsessions, and existential themes are equally common. What defines OCD is not the content of the obsessions but the structure: intrusive, unwanted thoughts that cause significant distress, followed by compulsive behaviors that provide temporary relief and maintain the cycle.",
    },
    {
      q: "What is ERP and why is it uncomfortable?",
      a: "ERP (Exposure and Response Prevention) involves deliberately triggering OCD anxiety — by touching something feared, thinking a feared thought, or encountering a feared situation — and then refraining from the compulsive response. This is uncomfortable because it means sitting with the anxiety that compulsions normally relieve. But this discomfort is therapeutic: it demonstrates that the feared outcome doesn't occur, that anxiety naturally subsides without compulsions, and gradually retrains the brain's threat-detection system. ERP is not sadistic — it is the only approach with strong evidence for lasting OCD recovery.",
    },
    {
      q: "What if my intrusive thoughts are disturbing — does that mean I'm a dangerous person?",
      a: "No. This is one of the most important clinical messages for people with OCD. Intrusive, disturbing thoughts — including violent, sexual, and taboo content — are a universal human experience. Research shows that more than 90% of people have occasional intrusive thoughts that they find disturbing. In OCD, these normal intrusive thoughts are tagged as highly meaningful and threatening, producing the intense distress that drives compulsive attempts to neutralize them. The distress that OCD thoughts produce is actually evidence that they are inconsistent with the person's values — not evidence of their truth or character.",
    },
  ],
  relatedPrograms: [
    {
      icon: "ri-sun-line",
      label: "Intensive",
      title: "Partial Hospitalization (PHP)",
      desc: "Daily ERP sessions and psychiatric medication management for significant OCD presentations.",
      href: "/partial-hospitalization-program-orange-county",
    },
    {
      icon: "ri-group-line",
      label: "Flexible",
      title: "Intensive Outpatient (IOP)",
      desc: "Continued ERP and group OCD therapy alongside daily functioning.",
      href: "/iop-program-orange-county",
    },
    {
      icon: "ri-video-line",
      label: "Remote",
      title: "Virtual Outpatient",
      desc: "Telehealth ERP — effective in this format and reduces OCD-related avoidance barriers to seeking care.",
      href: "/virtual-outpatient-program",
    },
  ],
};

export default function Page() {
  return <MHConditionPage data={data} />;
}
