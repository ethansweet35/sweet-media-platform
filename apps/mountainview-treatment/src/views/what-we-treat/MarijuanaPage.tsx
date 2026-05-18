import AddictionPage from "./AddictionPage";

const IMG = "https://gueqxorkktfcwiakepcp.supabase.co/storage/v1/object/public/site-assets/images/wp-inline/2026/05/mvt_marijuana_hero.jpg";

export default function MarijuanaPage() {
  return (
    <AddictionPage
      heroImage={IMG}
      heroAlt="Marijuana addiction treatment in Seattle, WA — Mountain View Treatment"
      eyebrow="What We Treat / Addiction"
      headline="Marijuana Use Disorder"
      headlineItalic="Treatment in Seattle"
      heroBody="Cannabis use disorder is real, clinically recognized, and increasingly prevalent. Mountain View Treatment provides evidence-based outpatient care addressing the full complexity of cannabis dependency in a private, non-judgmental setting."
      whatHeadline="What Is Cannabis Use Disorder?"
      whatBody={[
        "Cannabis use disorder (CUD) is a clinically recognized condition in which continued cannabis use causes significant impairment or distress despite negative consequences. While once widely dismissed, CUD is now classified as a substance use disorder in the DSM-5 and affects an estimated 9% of people who use cannabis — a figure that rises to 17% among those who begin in adolescence.",
        "The widespread legalization and normalization of cannabis in Washington State has contributed to rising rates of heavy, daily use and a false perception that cannabis carries no risk of dependency. In reality, the THC potency of today's products — often 20–30% or higher in concentrates — is dramatically different from cannabis of earlier decades.",
        "Withdrawal from heavy cannabis use produces recognized symptoms including irritability, anxiety, sleep disturbance, decreased appetite, and restlessness. Treatment helps individuals manage these symptoms and develop healthier coping strategies.",
      ]}
      signsHeadline="Signs of Cannabis Use Disorder"
      signsIntro="The DSM-5 defines CUD using the same 11 criteria applied to other substance use disorders. Two or more symptoms within 12 months constitute a diagnosable disorder."
      signs={[
        { label: "Escalating Use", desc: "Using cannabis in larger amounts or for longer periods than intended." },
        { label: "Failed Attempts to Quit", desc: "A persistent desire to cut down or stop, with unsuccessful efforts to do so." },
        { label: "Time Consumption", desc: "Significant time spent obtaining, using, or recovering from cannabis use." },
        { label: "Withdrawal from Activities", desc: "Giving up previously valued social, occupational, or recreational activities due to cannabis use." },
        { label: "Use Despite Problems", desc: "Continued use despite knowledge of persistent physical or psychological problems it causes." },
        { label: "Tolerance", desc: "Needing progressively more cannabis to achieve the same effect, or diminished effect with the same amount." },
      ]}
      approachHeadline="Evidence-Based Treatment for Cannabis Use Disorder"
      approachBody="Because no FDA-approved medication exists specifically for CUD, behavioral therapies are the cornerstone of treatment. Mountain View's clinical team is experienced in the specific patterns of cannabis dependency and tailors every treatment plan accordingly."
      approaches={[
        { icon: "ri-mind-map", title: "Cognitive Behavioral Therapy (CBT)", body: "The most well-researched approach for CUD. CBT helps identify triggers, restructure cannabis-associated thinking, and build practical coping and refusal skills." },
        { icon: "ri-door-open-line", title: "Motivational Enhancement Therapy", body: "MET helps resolve ambivalence about quitting by building intrinsic motivation — particularly useful for clients who are uncertain about whether their use is a problem." },
        { icon: "ri-group-line", title: "Group Therapy", body: "Peer support in structured group settings addresses the social isolation that often accompanies heavy cannabis use and builds accountability." },
        { icon: "ri-brain-line", title: "Dual Diagnosis Treatment", body: "Anxiety, depression, and ADHD frequently co-occur with heavy cannabis use. Treating these alongside CUD significantly improves outcomes." },
        { icon: "ri-heart-pulse-line", title: "Holistic Integration", body: "Mindfulness, somatic therapies, and wellness practices support nervous system regulation during the adjustment period of early recovery." },
      ]}
      withdrawal={{
        headline: "Cannabis Withdrawal: What to Expect",
        intro: "While cannabis withdrawal is not medically dangerous, it is real and clinically recognized in the DSM-5. Symptoms emerge 24–72 hours after stopping regular use and peak around days 2–4. The severity correlates with frequency of use, potency of cannabis used, and duration of the use history.",
        isMedical: false,
        timeline: [
          {
            phase: "Onset",
            duration: "Days 1–2",
            symptoms: [
              "Irritability and mood swings",
              "Anxiety and restlessness",
              "Insomnia and vivid dreams",
              "Decreased appetite",
              "Headaches",
              "Mild nausea",
            ],
          },
          {
            phase: "Peak Symptoms",
            duration: "Days 2–6",
            symptoms: [
              "Peak irritability and anger",
              "Significant sleep disruption",
              "Depressed mood and anhedonia",
              "Physical discomfort (sweating, chills)",
              "Intense cravings",
              "Difficulty concentrating",
            ],
          },
          {
            phase: "Resolution",
            duration: "Week 2–4",
            symptoms: [
              "Gradual improvement in mood",
              "Sleep slowly normalizing",
              "Return of appetite",
              "Cognitive clarity improving",
              "Intermittent cravings persist",
              "Extended emotional adjustment period",
            ],
          },
        ],
        note: "Modern high-potency cannabis products — concentrates, dabs, and high-THC flower — produce more pronounced withdrawal symptoms than traditional cannabis. Daily users of concentrates may experience symptoms more similar in intensity to other substance withdrawals. Our clinical team tailors support to your specific use pattern.",
      }}
      comorbidities={{
        headline: "Mental Health Conditions Linked to Heavy Cannabis Use",
        intro: "Cannabis and mental health have a complex, bidirectional relationship. Many individuals with mental health conditions use cannabis to self-medicate, while heavy cannabis use — especially early onset — is associated with worsening or even triggering psychiatric symptoms.",
        closingNote: "Our integrated clinical approach assesses and treats both cannabis use disorder and co-occurring mental health conditions simultaneously — because treating only one rarely resolves either.",
        items: [
          { icon: "ri-mental-health-line", title: "Anxiety Disorders", body: "Cannabis is widely used to manage anxiety, but heavy use worsens anxiety over time. THC activates the amygdala's threat response, and high-dose use can induce acute anxiety and panic attacks." },
          { icon: "ri-brain-line", title: "Psychosis & Schizophrenia Risk", body: "Heavy cannabis use — particularly high-potency THC products — is associated with earlier onset of psychotic symptoms in genetically vulnerable individuals. This risk is dose-dependent." },
          { icon: "ri-emotion-unhappy-line", title: "Major Depression", body: "Heavy cannabis use disrupts dopamine signaling, leading to a blunted reward system and depression — particularly notable as the \"amotivational syndrome\" associated with chronic use." },
          { icon: "ri-focus-3-line", title: "ADHD", body: "Individuals with ADHD are significantly more likely to develop CUD. Cannabis is frequently used to manage inattention and hyperactivity, masking the underlying condition." },
          { icon: "ri-ghost-2-line", title: "PTSD", body: "Cannabis is commonly used to suppress nightmares and hyperarousal in PTSD. While providing short-term relief, it disrupts REM sleep and inhibits trauma processing, worsening outcomes." },
          { icon: "ri-haze-line", title: "Cannabis-Induced Disorders", body: "Heavy use can produce cannabis-induced anxiety disorder, cannabis-induced depressive disorder, and cannabis-induced psychotic disorder — all of which resolve with abstinence and appropriate treatment." },
        ],
      }}
      locBody="Most major insurance plans cover medically necessary CUD treatment. We verify your benefits before you begin."
      whyPoints={[
        { icon: "ri-map-pin-2-line", title: "Seattle, WA", body: "Outpatient care in Seattle that fits around your work and home life — no residential disruption required." },
        { icon: "ri-shield-check-line", title: "Non-Judgmental Care", body: "We treat cannabis use disorder with the same clinical seriousness and compassion we bring to every condition." },
        { icon: "ri-user-line", title: "Individualized Plans", body: "Your treatment is built around your specific patterns, triggers, co-occurring conditions, and recovery goals." },
        { icon: "ri-lock-2-line", title: "Complete Privacy", body: "HIPAA-protected care in a discreet environment. Your employer, family, and community do not need to know." },
      ]}
      faqs={[
        { q: "Is cannabis really addictive?", a: "Yes. Cannabis use disorder is a clinically recognized condition in the DSM-5. Approximately 9% of people who use cannabis develop a dependence, and that figure is higher for daily users and those who started young. The higher THC concentration in modern products has increased the dependency risk." },
        { q: "Do I need detox before starting outpatient treatment?", a: "Cannabis withdrawal, while uncomfortable, is not medically dangerous and generally does not require medically supervised detox. Our clinical team can help manage withdrawal symptoms as you begin outpatient treatment." },
        { q: "Can I get treatment for marijuana use disorder in Washington State?", a: "Yes. Despite legalization, cannabis use disorder is a diagnosable and insurable condition. Most major PPO plans cover treatment, and our admissions team can verify your specific benefits." },
        { q: "How long does treatment take?", a: "Duration depends on severity and individual progress. IOP typically runs 8–12 weeks. Many clients benefit from a period of standard outpatient care following IOP for continued support." },
        { q: "What if anxiety or depression is driving my cannabis use?", a: "Co-occurring mental health conditions are extremely common in individuals with CUD. We treat both simultaneously with an integrated clinical team." },
      ]}
    />
  );
}
