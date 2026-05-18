import MentalHealthPage from "./MentalHealthPage";
const IMG = "https://gueqxorkktfcwiakepcp.supabase.co/storage/v1/object/public/site-assets/images/wp-inline/2026/05/mvt_mh_bipolar.jpg";
export default function BipolarPage() {
  return (
    <MentalHealthPage
      heroImage={IMG}
      heroAlt="Bipolar disorder treatment in Seattle, WA — Mountain View Treatment"
      eyebrow="What We Treat / Mental Health"
      headline="Bipolar Disorder"
      headlineItalic="Treatment in Seattle"
      heroBody="Bipolar disorder is a complex, lifelong condition that is manageable with the right clinical support. Mountain View Treatment provides integrated outpatient care for bipolar disorder in Seattle — combining mood stabilization, therapy, and individualized support."
      whatHeadline="What Is Bipolar Disorder?"
      whatBody={[
        "Bipolar disorder is a chronic psychiatric condition characterized by episodes of mania or hypomania alternating with periods of depression — often separated by intervals of relative stability. It is a brain-based illness involving dysregulation of mood, energy, activity levels, and the ability to think clearly.",
        "Approximately 4.4% of Americans will experience bipolar disorder at some point in their lifetime. It affects men and women equally, tends to emerge in late adolescence or early adulthood, and carries a significant burden of disability — largely due to the depressive phases, which account for most of the functional impairment and time ill.",
        "Bipolar disorder is highly treatable but frequently undertreated or misdiagnosed. The average delay between symptom onset and correct diagnosis is over six years — during which individuals often receive antidepressants alone, which can precipitate manic episodes in bipolar disorder. Accurate diagnosis is the foundation of effective treatment.",
      ]}
      symptomsHeadline="Recognizing Bipolar Disorder"
      symptomsIntro="Bipolar disorder is defined by the presence of manic or hypomanic episodes — often in contrast to depressive episodes. Recognizing both poles is essential to accurate diagnosis."
      symptoms={[
        { label: "Elevated or Expansive Mood", desc: "An unusually euphoric, irritable, or expansive mood that is distinctly different from baseline and not explained by circumstances. May feel positive initially but escalates beyond normal pleasure." },
        { label: "Decreased Need for Sleep", desc: "Feeling rested after only 3–4 hours of sleep, or going days with minimal sleep without feeling tired. One of the most reliable indicators of a manic or hypomanic episode." },
        { label: "Grandiosity", desc: "Inflated self-esteem or an unrealistic sense of special abilities, identity, or mission. Can range from unusual confidence to frank delusions of grandeur in full mania." },
        { label: "Racing Thoughts & Pressured Speech", desc: "Thoughts moving extremely rapidly, jumping between topics; speech that is difficult to interrupt, faster than usual, and pressured in quality." },
        { label: "Impulsive & Risky Behavior", desc: "Uncharacteristic engagement in high-risk activities — excessive spending, sexual indiscretion, reckless driving, substance use, unwise business decisions — often with poor insight into the risks." },
        { label: "Depressive Episodes", desc: "Alternating with elevated states: persistent low mood, loss of interest, fatigue, cognitive impairment, hopelessness, and suicidal ideation. The depressive pole causes most long-term impairment." },
      ]}
      typesHeadline="Types of Bipolar Disorder"
      typesIntro="Bipolar disorder exists on a spectrum. The type determines prognosis, treatment approach, and medication choices:"
      types={[
        { title: "Bipolar I Disorder", body: "Defined by at least one manic episode lasting 7 days or requiring hospitalization. Depressive episodes are common. The most severe form, with the highest risk of psychosis and hospitalization." },
        { title: "Bipolar II Disorder", body: "Defined by hypomanic episodes (less intense than full mania, not requiring hospitalization) and major depressive episodes. Often misdiagnosed as MDD — with significant treatment implications." },
        { title: "Cyclothymic Disorder", body: "A chronic pattern of hypomania and mild depressive symptoms that does not meet full criteria for hypomanic or major depressive episodes — present for at least two years." },
        { title: "Bipolar Disorder with Mixed Features", body: "Simultaneous presence of both manic and depressive symptoms — a high-risk presentation associated with elevated suicidal ideation and more complex treatment." },
        { title: "Bipolar Disorder with Rapid Cycling", body: "Four or more distinct mood episodes within a 12-month period. Associated with more time ill, more disability, and greater treatment complexity." },
        { title: "Bipolar Disorder with Psychotic Features", body: "Presence of delusions or hallucinations during manic or depressive episodes. Requires antipsychotic medication management in addition to mood stabilization." },
      ]}
      approachHeadline="Integrated Treatment for Bipolar Disorder"
      approachBody="Bipolar disorder requires a carefully coordinated approach combining mood stabilization, psychoeducation, and evidence-based therapy. Our clinical team has deep experience in the complexity of bipolar treatment — including the risks of antidepressant monotherapy."
      approaches={[
        { icon: "ri-stethoscope-line", title: "Medication Management & Coordination", body: "Mood stabilizers (lithium, valproate, lamotrigine) and atypical antipsychotics are the foundation of bipolar pharmacotherapy. Our team coordinates with prescribers and monitors for effectiveness and side effects." },
        { icon: "ri-book-open-line", title: "Psychoeducation", body: "Understanding your condition — the episode types, triggers, early warning signs, and the critical importance of medication adherence — is one of the most powerful tools in bipolar management. Psychoeducation is embedded throughout treatment." },
        { icon: "ri-mind-map", title: "Cognitive Behavioral Therapy for Bipolar", body: "CBT adapted for bipolar disorder addresses the thought patterns that fuel episodes, develops relapse prevention skills, and helps clients manage the functional consequences of the illness." },
        { icon: "ri-calendar-check-line", title: "Interpersonal & Social Rhythm Therapy (IPSRT)", body: "IPSRT is specifically developed for bipolar disorder — stabilizing daily routines, sleep-wake cycles, and interpersonal patterns that directly influence mood episode frequency." },
        { icon: "ri-group-line", title: "Family & Support System Involvement", body: "Bipolar disorder significantly affects family members and close relationships. Involving support systems in psychoeducation and communication skills improves outcomes for everyone." },
      ]}
      comorbidities={{
        headline: "Conditions That Commonly Co-Occur With Bipolar Disorder",
        intro: "Bipolar disorder has among the highest rates of comorbidity of any psychiatric diagnosis. Co-occurring conditions complicate treatment and are associated with worse outcomes when unaddressed.",
        closingNote: "Our clinical team is experienced in the diagnostic complexity of bipolar disorder and the careful balance required to treat co-occurring conditions without destabilizing mood — particularly regarding antidepressant use.",
        items: [
          { icon: "ri-drop-line", title: "Substance Use Disorders", body: "Bipolar disorder has the highest rate of co-occurring substance use disorder of any psychiatric diagnosis. Substances temporarily regulate mood dysregulation — at the cost of destabilizing the underlying illness." },
          { icon: "ri-mind-map", title: "Anxiety Disorders", body: "Anxiety disorders co-occur in over 50% of bipolar disorder cases. The combination is associated with more depressive episodes, more time ill, and higher suicidal ideation." },
          { icon: "ri-focus-3-line", title: "ADHD", body: "ADHD and bipolar disorder have significant symptom overlap — both involving impulsivity, distractibility, and emotional dysregulation. Careful differential diagnosis is essential; stimulant medications for ADHD can destabilize bipolar mood." },
          { icon: "ri-ghost-2-line", title: "PTSD & Trauma", body: "Trauma history is overrepresented in bipolar disorder. Trauma-focused treatment must be carefully timed and paced to avoid triggering mood episodes." },
          { icon: "ri-heart-pulse-line", title: "Thyroid & Medical Conditions", body: "Thyroid dysfunction — both hypo and hyperthyroidism — can mimic or trigger bipolar episodes. Medical evaluation is an essential component of comprehensive bipolar assessment." },
          { icon: "ri-emotion-unhappy-line", title: "Eating Disorders", body: "Eating disorders are more prevalent in bipolar disorder than the general population — particularly binge eating disorder. The impulsivity of manic states and the emotional dysregulation of mixed episodes contribute to this overlap." },
        ],
      }}
      locBody="Bipolar disorder treatment is covered under the Mental Health Parity Act by most major insurance plans."
      whyPoints={[
        { icon: "ri-stethoscope-line", title: "Medication Coordination", body: "Expert coordination of mood stabilizers and psychiatric medication as part of integrated outpatient care." },
        { icon: "ri-shield-check-line", title: "Insurance Accepted", body: "Most major PPO plans including Aetna, Anthem, Cigna, TRICARE, and UnitedHealthcare." },
        { icon: "ri-calendar-check-line", title: "Routine Stabilization", body: "IPSRT and structured daily rhythm support — a clinical cornerstone of bipolar management." },
        { icon: "ri-lock-2-line", title: "Complete Privacy", body: "HIPAA-protected care in a private, discreet environment in Seattle, WA." },
      ]}
      faqs={[
        { q: "How is bipolar disorder diagnosed?", a: "Bipolar disorder is diagnosed through a comprehensive clinical interview assessing the history of mood episodes — including hypomania and mania, which patients often do not identify as problematic. Medical conditions and substance use that can mimic bipolar symptoms are ruled out. The average time to correct diagnosis is over six years due to frequent initial misdiagnosis as MDD." },
        { q: "Can bipolar disorder be treated without medication?", a: "Mood stabilizing medication is the standard of care for Bipolar I disorder, and strongly recommended for Bipolar II. Psychotherapy alone is generally not sufficient to prevent manic episodes. However, medication adherence combined with evidence-based therapy produces significantly better outcomes than medication alone." },
        { q: "I was diagnosed with depression and put on antidepressants — could it be bipolar?", a: "Possibly. Antidepressant monotherapy in bipolar disorder can precipitate manic or hypomanic episodes and increase rapid cycling. If you have experienced episodes of elevated mood, decreased sleep need, impulsivity, or grandiosity — even if they felt positive — a bipolar evaluation is warranted." },
        { q: "Does bipolar disorder get worse over time?", a: "Untreated bipolar disorder often does worsen — episodes can become more frequent and the recovery between them less complete. With consistent treatment, mood stabilization, and lifestyle management, many people with bipolar disorder achieve long periods of stability." },
        { q: "Does insurance cover bipolar disorder treatment?", a: "Yes. Bipolar disorder treatment is covered under the Mental Health Parity Act by most major insurance plans. Our admissions team verifies your specific benefits at no cost before you begin." },
      ]}
    />
  );
}
