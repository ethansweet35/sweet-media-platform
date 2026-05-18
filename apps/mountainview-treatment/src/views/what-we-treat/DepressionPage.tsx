import MentalHealthPage from "./MentalHealthPage";
const IMG = "https://gueqxorkktfcwiakepcp.supabase.co/storage/v1/object/public/site-assets/images/wp-inline/2026/05/mvt_mh_depression.jpg";
export default function DepressionPage() {
  return (
    <MentalHealthPage
      heroImage={IMG}
      heroAlt="Depression treatment in Seattle, WA — Mountain View Treatment"
      eyebrow="What We Treat / Mental Health"
      headline="Depression"
      headlineItalic="Treatment in Seattle"
      heroBody="Major depressive disorder is a serious, highly treatable medical condition. Mountain View Treatment provides structured outpatient care for depression in Seattle — combining evidence-based therapy, individualized support, and integrated psychiatric coordination."
      whatHeadline="What Is Major Depressive Disorder?"
      whatBody={[
        "Major depressive disorder (MDD) is a chronic medical condition characterized by persistent low mood, loss of interest or pleasure, and a range of cognitive, physical, and behavioral symptoms that significantly impair daily functioning. It is not sadness, weakness, or a character flaw — it is a disorder involving measurable changes in brain chemistry, neural circuitry, and stress response systems.",
        "Depression is among the leading causes of disability worldwide. In the United States, approximately 21 million adults — over 8% of the population — experience at least one major depressive episode per year. Despite being highly treatable, fewer than half of those affected receive adequate care.",
        "Evidence-based treatment for MDD combines psychotherapy — particularly cognitive behavioral therapy and behavioral activation — with antidepressant medication when clinically indicated. The combination of therapy and medication produces superior outcomes to either treatment alone for moderate-to-severe depression.",
      ]}
      symptomsHeadline="Symptoms of Major Depression"
      symptomsIntro="The DSM-5 requires five or more of the following symptoms present during the same two-week period — including at least one of the first two — to meet diagnostic criteria for MDD:"
      symptoms={[
        { label: "Depressed Mood", desc: "Persistent sadness, emptiness, or hopelessness present most of the day, nearly every day — often described as emotional flatness or numbness rather than 'sadness' in the conventional sense." },
        { label: "Loss of Interest or Pleasure", desc: "Markedly diminished interest or enjoyment in activities that previously brought pleasure — including hobbies, relationships, work, and sex. Anhedonia is often the most impairing symptom." },
        { label: "Sleep Disturbance", desc: "Insomnia (difficulty falling or staying asleep, early morning awakening) or hypersomnia (sleeping excessively). Sleep disruption both causes and worsens depression." },
        { label: "Fatigue & Low Energy", desc: "Profound fatigue that is disproportionate to activity level — making simple tasks feel effortful and contributing to functional impairment across all domains." },
        { label: "Cognitive Impairment", desc: "Difficulty concentrating, remembering information, or making decisions. The cognitive symptoms of depression are often underrecognized and can mimic ADHD or dementia." },
        { label: "Thoughts of Death or Suicide", desc: "Recurrent thoughts of death, passive suicidal ideation (wishing to be dead), or active suicidal ideation with or without a plan. Requires immediate clinical attention." },
      ]}
      typesHeadline="Types of Depression We Treat"
      typesIntro="Depression exists across a spectrum of presentations. Mountain View Treatment has clinical expertise in each:"
      types={[
        { title: "Major Depressive Disorder (MDD)", body: "Distinct episodes of severe depressive symptoms lasting at least two weeks, with full or partial remission between episodes. Ranges from mild to severe." },
        { title: "Persistent Depressive Disorder (PDD / Dysthymia)", body: "Chronically depressed mood present for most of the day, on most days, for at least two years — often less intense than MDD but more enduring and equally impairing." },
        { title: "Postpartum Depression", body: "Major depression with peripartum onset — occurring during pregnancy or within the first year after childbirth. More severe and persistent than the 'baby blues.'" },
        { title: "Seasonal Affective Disorder (SAD)", body: "A pattern of major depressive episodes with seasonal onset — typically fall/winter — related to reduced light exposure and disrupted circadian rhythm. Particularly relevant in the Pacific Northwest." },
        { title: "Atypical Depression", body: "Depression characterized by mood reactivity (brightening in response to positive events), hypersomnia, increased appetite, leaden paralysis, and rejection sensitivity." },
        { title: "Treatment-Resistant Depression", body: "Depression that has not responded adequately to two or more antidepressant trials. Requires specialized assessment and may benefit from augmentation strategies or alternative interventions." },
      ]}
      approachHeadline="How We Treat Depression"
      approachBody="Our approach to depression integrates the highest-evidence behavioral therapies with individualized support, psychiatric coordination, and the somatic and holistic modalities that address the full-body nature of depressive illness."
      approaches={[
        { icon: "ri-mind-map", title: "Cognitive Behavioral Therapy (CBT)", body: "CBT for depression targets the negative thought patterns and behavioral withdrawal that maintain and deepen depression — replacing them with more accurate thinking and activity engagement that rebuilds reward." },
        { icon: "ri-run-line", title: "Behavioral Activation", body: "One of the most evidence-supported components of depression treatment. Systematic re-engagement with meaningful activities — particularly social and pleasurable ones — directly counters anhedonia and behavioral withdrawal." },
        { icon: "ri-focus-3-line", title: "Acceptance & Commitment Therapy (ACT)", body: "ACT helps clients clarify their values, defuse from depressive thoughts, and commit to valued action despite low mood — building a life with meaning rather than waiting for depression to lift first." },
        { icon: "ri-heart-pulse-line", title: "Somatic & Holistic Therapies", body: "Exercise, nutrition, sleep hygiene, somatic experiencing, and mindfulness-based practices all have meaningful clinical evidence for depression and are integrated into individualized treatment plans." },
        { icon: "ri-capsule-line", title: "Psychiatric Medication Coordination", body: "Antidepressants — particularly SSRIs and SNRIs — are effective for moderate-to-severe depression. Our clinical team coordinates with prescribers or provides psychiatric referrals when medication is indicated." },
      ]}
      comorbidities={{
        headline: "Conditions That Commonly Co-Occur With Depression",
        intro: "Depression rarely presents in a vacuum. Co-occurring conditions both contribute to and complicate depression — and must be addressed concurrently for treatment to be fully effective.",
        closingNote: "Mountain View's integrated clinical team assesses and treats co-occurring conditions alongside depression from the first day of treatment — not after depression has 'resolved.'",
        items: [
          { icon: "ri-mind-map", title: "Anxiety Disorders", body: "Depression and anxiety co-occur in up to 60% of cases. The overlap is so common that the term 'anxious depression' describes a distinct presentation with specific treatment implications." },
          { icon: "ri-ghost-2-line", title: "PTSD & Trauma", body: "Depression is one of the most common consequences of unprocessed trauma. Trauma-focused therapy is often necessary to achieve full remission of depressive symptoms." },
          { icon: "ri-drop-line", title: "Alcohol & Substance Use", body: "Alcohol is both a depressant and a common self-medication for depression. The relationship is bidirectional: depression drives use, and use deepens depression." },
          { icon: "ri-focus-3-line", title: "ADHD", body: "Adult ADHD is frequently misdiagnosed as depression — and vice versa. They also commonly co-occur. The chronic underachievement and dysregulation of ADHD generate genuine depression that requires addressing the underlying ADHD." },
          { icon: "ri-heart-pulse-line", title: "Chronic Pain & Medical Conditions", body: "Chronic pain and medical illness dramatically increase depression risk. The relationship is bidirectional — depression amplifies pain perception and inhibits recovery from physical illness." },
          { icon: "ri-toggle-line", title: "Bipolar Disorder", body: "Depressive episodes of bipolar disorder are often clinically indistinguishable from MDD — but require different treatment. Careful assessment for a history of hypomania or mania is essential before beginning antidepressant treatment." },
        ],
      }}
      locBody="Depression treatment is covered by most major insurance plans under the Mental Health Parity Act."
      whyPoints={[
        { icon: "ri-award-line", title: "Evidence-Based Care", body: "CBT, behavioral activation, ACT, and somatic integration — the highest-evidence depression treatments." },
        { icon: "ri-shield-check-line", title: "Insurance Accepted", body: "Aetna, Anthem, Cigna, TRICARE, UnitedHealthcare, and most major PPO plans accepted." },
        { icon: "ri-stethoscope-line", title: "Psychiatric Coordination", body: "Medication management and psychiatric referrals coordinated as part of integrated care when indicated." },
        { icon: "ri-lock-2-line", title: "Complete Privacy", body: "HIPAA-protected care in a private, discreet environment in Seattle, WA." },
      ]}
      faqs={[
        { q: "Is depression a real medical condition?", a: "Yes. Major depressive disorder involves measurable changes in brain structure, neurochemistry, immune function, and stress response systems. It is classified as a medical illness by every major psychiatric and medical organization worldwide." },
        { q: "What is the difference between sadness and clinical depression?", a: "Sadness is a normal emotional response to difficult circumstances that typically resolves as circumstances change. Clinical depression is a distinct medical condition involving persistent low mood and loss of interest that lasts at least two weeks, is present regardless of circumstances, and significantly impairs functioning." },
        { q: "Do I need antidepressants?", a: "Not necessarily. For mild-to-moderate depression, psychotherapy — particularly CBT and behavioral activation — produces outcomes comparable to medication. For moderate-to-severe depression, the combination of therapy and medication produces superior outcomes to either alone. Our team will discuss your specific situation and preferences." },
        { q: "How long does depression treatment take?", a: "A course of CBT for depression typically runs 12–20 sessions for an acute episode. Many individuals benefit from continued therapy beyond initial symptom remission to address underlying patterns and prevent recurrence. Depression recurrence is common — ongoing support significantly reduces relapse risk." },
        { q: "What if I've tried antidepressants and they didn't work?", a: "Treatment-resistant depression is a recognized clinical presentation requiring specialized assessment. Options include medication augmentation, alternative medications, and evidence-based psychotherapies that specifically address treatment-resistant presentations. Our team has experience working with clients who have not responded to previous treatment." },
      ]}
    />
  );
}
