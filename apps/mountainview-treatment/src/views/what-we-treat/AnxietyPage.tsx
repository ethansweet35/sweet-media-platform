import MentalHealthPage from "./MentalHealthPage";
const IMG = "https://gueqxorkktfcwiakepcp.supabase.co/storage/v1/object/public/site-assets/images/wp-inline/2026/05/mvt_mh_anxiety.jpg";
export default function AnxietyPage() {
  return (
    <MentalHealthPage
      heroImage={IMG}
      heroAlt="Anxiety disorder treatment in Seattle, WA — Mountain View Treatment"
      eyebrow="What We Treat / Mental Health"
      headline="Anxiety Disorder"
      headlineItalic="Treatment in Seattle"
      heroBody="Anxiety disorders are the most common mental health conditions in the United States — and among the most treatable. Mountain View Treatment provides evidence-based outpatient care for all forms of anxiety in Seattle, Washington."
      whatHeadline="What Are Anxiety Disorders?"
      whatBody={[
        "Anxiety disorders are a family of closely related conditions united by excessive, persistent fear or worry that is disproportionate to the situation and that significantly interferes with daily functioning. Unlike normal stress, anxiety disorders involve a chronically activated threat response that does not resolve when the danger passes — or arises in the absence of any real danger at all.",
        "The umbrella of anxiety disorders includes generalized anxiety disorder (GAD), panic disorder, social anxiety disorder, specific phobias, agoraphobia, and separation anxiety disorder. Each presents distinctly, but all share the hallmark of excessive fear or anxiety causing meaningful functional impairment.",
        "Anxiety disorders frequently co-occur with depression, substance use disorders, and trauma-related conditions. They are highly treatable: cognitive behavioral therapy, exposure-based approaches, and medication (when indicated) produce measurable, lasting improvement in the majority of patients who engage with appropriate care.",
      ]}
      symptomsHeadline="Recognizing an Anxiety Disorder"
      symptomsIntro="Anxiety disorders are distinguished from normal worry by their intensity, persistence, and functional impact. Key clinical indicators include:"
      symptoms={[
        { label: "Excessive, Uncontrollable Worry", desc: "Persistent worry that is difficult to control, disproportionate to the actual situation, and present on most days for at least six months." },
        { label: "Physical Symptoms", desc: "Muscle tension, headaches, fatigue, GI distress, racing heart, shortness of breath, and sleep disturbance — anxiety lives in the body as much as the mind." },
        { label: "Panic Attacks", desc: "Sudden surges of intense fear with physical symptoms — chest pain, derealization, shortness of breath — that peak within minutes. Can occur unexpectedly or in response to triggers." },
        { label: "Avoidance Behavior", desc: "Systematically avoiding situations, places, or activities that trigger anxiety — reinforcing the anxiety cycle and increasingly constricting daily life." },
        { label: "Social Anxiety", desc: "Intense fear of social situations involving scrutiny, judgment, or humiliation — going beyond shyness to significantly impair relationships and career." },
        { label: "Hypervigilance", desc: "A chronic state of alertness and threat-scanning that is exhausting to maintain and prevents relaxation even in genuinely safe environments." },
      ]}
      typesHeadline="Types of Anxiety Disorders We Treat"
      typesIntro="Anxiety presents differently depending on the specific disorder. Mountain View Treatment has clinical expertise across the full spectrum:"
      types={[
        { title: "Generalized Anxiety Disorder (GAD)", body: "Chronic, pervasive worry across multiple domains of life — work, health, finances, relationships — that is difficult to control and accompanied by physical symptoms and fatigue." },
        { title: "Panic Disorder", body: "Recurrent, unexpected panic attacks and persistent concern about future attacks. Often leads to agoraphobia as individuals avoid situations associated with panic." },
        { title: "Social Anxiety Disorder", body: "Intense fear of social situations involving potential scrutiny or judgment. Can range from performance anxiety to pervasive avoidance of all social interaction." },
        { title: "Agoraphobia", body: "Fear of situations where escape might be difficult or help unavailable during a panic attack — public transport, crowded spaces, being outside alone." },
        { title: "Specific Phobias", body: "Intense, irrational fear of specific objects or situations (heights, flying, medical procedures) that significantly disrupts functioning or causes marked distress." },
        { title: "Health Anxiety (Illness Anxiety)", body: "Preoccupation with having or developing a serious illness despite reassurance — driving compulsive checking behaviors and significant impairment." },
      ]}
      approachHeadline="Evidence-Based Treatment for Anxiety"
      approachBody="Anxiety disorders have among the strongest evidence bases in mental health treatment. Our clinical approach combines the highest-efficacy interventions, tailored to your specific anxiety presentation and life context."
      approaches={[
        { icon: "ri-mind-map", title: "Cognitive Behavioral Therapy (CBT)", body: "The gold-standard treatment for all anxiety disorders. CBT addresses the cognitive distortions and behavioral patterns that maintain anxiety — identifying automatic thoughts, testing catastrophic predictions, and building a more accurate relationship with uncertainty." },
        { icon: "ri-expand-diagonal-line", title: "Exposure & Response Prevention (ERP)", body: "Systematic, graduated exposure to feared situations — in imagination or in vivo — is the most powerful mechanism of anxiety reduction available. ERP teaches the nervous system that feared outcomes don't occur, and that anxiety itself is tolerable and time-limited." },
        { icon: "ri-focus-3-line", title: "Acceptance & Commitment Therapy (ACT)", body: "ACT helps clients develop a different relationship with anxious thoughts — observing them without fusion or avoidance — and commit to valued action despite discomfort. Particularly effective for GAD and health anxiety." },
        { icon: "ri-heart-pulse-line", title: "Somatic & Nervous System Regulation", body: "Anxiety is fundamentally a physiological state. Somatic approaches, breathwork, and nervous system regulation techniques address the body-level component that cognitive work alone cannot fully reach." },
        { icon: "ri-capsule-line", title: "Medication (When Indicated)", body: "SSRIs and SNRIs are first-line medications for most anxiety disorders. Short-term benzodiazepines may be considered in specific situations. Our clinical team coordinates medication management as part of integrated care." },
      ]}
      comorbidities={{
        headline: "Conditions That Commonly Co-Occur With Anxiety",
        intro: "Anxiety disorders rarely present in isolation. Understanding and treating co-occurring conditions simultaneously is essential to comprehensive recovery.",
        closingNote: "Our integrated clinical team assesses and treats co-occurring conditions alongside anxiety — because treating anxiety in isolation of its clinical context consistently produces inferior outcomes.",
        items: [
          { icon: "ri-emotion-unhappy-line", title: "Major Depression", body: "The most common co-occurring condition with anxiety disorders. Depression and anxiety share neural substrates and frequently develop together — requiring integrated treatment." },
          { icon: "ri-ghost-2-line", title: "PTSD & Trauma", body: "Trauma underlies many anxiety presentations, particularly hypervigilance, avoidance, and panic. Trauma-focused treatment addresses the root cause rather than managing symptoms alone." },
          { icon: "ri-drop-line", title: "Alcohol Use Disorder", body: "Alcohol is one of the most common self-medications for anxiety — providing immediate relief while worsening anxiety long-term through rebound effects and neurological impact." },
          { icon: "ri-focus-3-line", title: "ADHD", body: "ADHD and anxiety frequently co-occur. The functional consequences of ADHD — task avoidance, disorganization, chronic under-performance — generate genuine anxiety that may obscure the underlying ADHD." },
          { icon: "ri-heart-pulse-line", title: "Chronic Pain & Physical Health", body: "Anxiety and chronic pain share neurological mechanisms and amplify each other. Physical symptoms of anxiety are often misinterpreted as medical conditions, creating a cycle of health anxiety." },
          { icon: "ri-moon-line", title: "Sleep Disorders", body: "Anxiety profoundly disrupts sleep, and poor sleep significantly worsens anxiety. CBT for insomnia (CBT-I) is incorporated when sleep disruption is a significant component of the clinical picture." },
        ],
      }}
      locBody="Most major insurance plans cover anxiety treatment. Our team verifies your benefits before you begin."
      whyPoints={[
        { icon: "ri-award-line", title: "Evidence-Based Care", body: "CBT, ERP, and ACT — the highest-evidence anxiety treatments — are the foundation of our clinical approach." },
        { icon: "ri-shield-check-line", title: "Insurance Accepted", body: "Aetna, Anthem, Cigna, TRICARE, UnitedHealthcare, and most major PPO plans accepted." },
        { icon: "ri-user-heart-line", title: "Integrated Treatment", body: "Co-occurring depression, trauma, and substance use are treated concurrently — not deferred." },
        { icon: "ri-lock-2-line", title: "Complete Confidentiality", body: "HIPAA-protected care in a private, discreet environment in Seattle." },
      ]}
      faqs={[
        { q: "Is anxiety disorder a real medical condition?", a: "Yes. Anxiety disorders are among the most well-researched and validated psychiatric conditions in medicine. They involve measurable changes in brain activity, neurochemistry, and nervous system function — and respond to evidence-based treatment." },
        { q: "What is the difference between normal anxiety and an anxiety disorder?", a: "Normal anxiety is time-limited, proportionate to the situation, and does not significantly impair functioning. An anxiety disorder involves anxiety that is excessive, persistent (typically months rather than days), difficult to control, and meaningfully disrupts work, relationships, or daily life." },
        { q: "Do I need medication for anxiety?", a: "Not necessarily. CBT and related behavioral therapies produce outcomes equivalent to or better than medication for most anxiety disorders — without the side effects or dependency risks. Medication can be a useful adjunct, particularly for moderate-to-severe presentations. Our clinical team will discuss the options and your preferences during assessment." },
        { q: "How long does treatment for anxiety take?", a: "CBT for anxiety disorders typically produces significant improvement within 12–20 sessions for specific disorders. More complex or longstanding anxiety — especially with co-occurring conditions — benefits from a more extended course of treatment. Our team provides ongoing assessment and adjusts the plan as you progress." },
        { q: "Does insurance cover anxiety treatment?", a: "Yes. Anxiety disorders are covered under the Mental Health Parity Act by most major PPO plans. Our admissions team verifies your specific benefits before you begin — at no cost." },
      ]}
    />
  );
}
