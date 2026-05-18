import AddictionPage from "./AddictionPage";

const IMG = "https://gueqxorkktfcwiakepcp.supabase.co/storage/v1/object/public/site-assets/images/wp-inline/2026/05/mvt_stimulants_hero.jpg";

export default function StimulantsPage() {
  return (
    <AddictionPage
      heroImage={IMG}
      heroAlt="Stimulant addiction treatment in Seattle, WA — Mountain View Treatment"
      eyebrow="What We Treat / Addiction"
      headline="Stimulant Addiction"
      headlineItalic="Treatment in Seattle"
      heroBody="Stimulant use disorder — whether involving methamphetamine, cocaine, or prescription stimulants — is a serious condition that responds to structured behavioral treatment. Mountain View Treatment provides expert outpatient care in Seattle."
      whatHeadline="What Is Stimulant Use Disorder?"
      whatBody={[
        "Stimulant use disorder refers to problematic use of stimulant drugs — including methamphetamine, cocaine, crack cocaine, and prescription stimulants such as Adderall and Ritalin — resulting in significant impairment or distress. The defining pharmacological effect of stimulants is a powerful, rapid increase in dopamine release in the brain's reward circuits, creating intense euphoria followed by a prolonged crash.",
        "Washington State has seen a significant rise in methamphetamine-related deaths in recent years, with meth now accounting for more overdose deaths in the state than any other drug. Unlike opioids, methamphetamine overdose deaths are not driven by accidental dosing — they reflect the cumulative cardiovascular and neurological damage of chronic use.",
        "Unlike opioid use disorder, no FDA-approved pharmacotherapy for stimulant use disorder currently exists. Behavioral therapies — particularly contingency management and cognitive behavioral therapy — are the evidence-based cornerstones of treatment.",
      ]}
      signsHeadline="Recognizing Stimulant Use Disorder"
      signsIntro="Stimulant use disorder presents differently depending on the specific substance, but common clinical indicators include:"
      signs={[
        { label: "Binge-Crash Pattern", desc: "Using stimulants in runs or binges followed by prolonged sleep, depression, and fatigue." },
        { label: "Paranoia & Psychosis", desc: "Experiencing paranoid ideation, hallucinations, or psychotic symptoms during or after use — common with methamphetamine." },
        { label: "Cardiovascular Symptoms", desc: "Rapid heart rate, elevated blood pressure, chest pain, or irregular heartbeat associated with stimulant use." },
        { label: "Severe Mood Disturbance", desc: "Pronounced depression, irritability, anxiety, or emotional volatility between uses or during withdrawal." },
        { label: "Compulsive Use", desc: "Inability to stop using despite serious consequences including health deterioration, job loss, or relationship breakdown." },
        { label: "Social Isolation", desc: "Withdrawal from previously valued relationships and activities; keeping use secret or associating exclusively with other users." },
      ]}
      approachHeadline="Treating Stimulant Use Disorder"
      approachBody="Because no medication has been approved for stimulant use disorder, behavioral therapies and structured programming carry even greater clinical weight. Mountain View's approach combines the highest-evidence behavioral treatments with holistic support."
      approaches={[
        { icon: "ri-trophy-line", title: "Contingency Management", body: "The most evidence-supported behavioral approach for stimulant use disorder. Positive reinforcement for drug-free urine screens and treatment attendance produces measurably better outcomes." },
        { icon: "ri-mind-map", title: "Cognitive Behavioral Therapy", body: "CBT addresses the high-risk situations, thinking patterns, and behavioral triggers that sustain stimulant use and builds comprehensive relapse prevention skills." },
        { icon: "ri-group-line", title: "Intensive Group Therapy", body: "Daily structured groups provide peer accountability, process the shame associated with stimulant use, and build community support critical to early recovery." },
        { icon: "ri-heart-pulse-line", title: "Dual Diagnosis Treatment", body: "Depression, ADHD, and trauma are highly prevalent in stimulant use disorder. Treating these concurrently dramatically improves recovery outcomes." },
        { icon: "ri-mental-health-line", title: "Psychosis & Psychiatric Support", body: "Methamphetamine-associated psychosis requires clinical management. Our team coordinates psychiatric evaluation and medication management when indicated." },
      ]}
      withdrawal={{
        headline: "Stimulant Withdrawal: The Crash and Beyond",
        intro: "Stimulant withdrawal — sometimes called \"the crash\" — is not medically dangerous but is psychologically severe. The profound dopamine depletion following heavy stimulant use produces an extended period of depression, fatigue, and anhedonia that is a primary driver of relapse. Understanding this phase is critical to recovery.",
        isMedical: false,
        timeline: [
          {
            phase: "The Crash",
            duration: "Days 1–3",
            symptoms: [
              "Intense fatigue and hypersomnia (sleeping 12–20 hours)",
              "Increased appetite after period of suppression",
              "Profound depression and emotional flatness",
              "Irritability and agitation",
              "Powerful cravings to use again",
              "Cognitive slowing and memory difficulty",
            ],
          },
          {
            phase: "Withdrawal",
            duration: "Days 4–14",
            symptoms: [
              "Persistent depression and dysphoria",
              "Anhedonia — inability to feel pleasure",
              "Anxiety and paranoia (especially meth)",
              "Sleep disruption and fatigue",
              "Strong situational cravings",
              "Poor concentration and motivation",
            ],
          },
          {
            phase: "Extended Recovery",
            duration: "Weeks to Months",
            symptoms: [
              "Gradual return of pleasure and motivation",
              "Cognitive clarity slowly improving",
              "Intermittent low mood and cravings",
              "Sleep normalizing",
              "Emotional volatility stabilizing",
              "Long-term dopamine system repair",
            ],
          },
        ],
        note: "Methamphetamine use causes measurable structural damage to dopamine-producing neurons that can take 12–18 months of abstinence to partially recover. This is why the anhedonia of early meth recovery can be so profound and prolonged — it is a genuine neurological deficit, not a character failing. Our clinical team provides evidence-based support through this extended adjustment period.",
      }}
      comorbidities={{
        headline: "Mental Health Conditions in Stimulant Use Disorder",
        intro: "Stimulant use disorder has an exceptionally high rate of co-occurring psychiatric conditions — both as drivers of initial use and as consequences of prolonged stimulant exposure. These conditions require concurrent treatment for lasting recovery.",
        closingNote: "At Mountain View Treatment, psychiatric evaluation is integrated into the intake process. Co-occurring conditions are treated alongside stimulant use disorder — not sequentially — with an integrated team that includes addiction medicine, individual therapy, and psychiatric support when needed.",
        items: [
          { icon: "ri-emotion-unhappy-line", title: "Stimulant-Induced Depression", body: "The dopamine depletion of stimulant withdrawal produces severe, prolonged depression. Distinguishing stimulant-induced depression from primary major depressive disorder requires careful clinical assessment — the treatment implications differ significantly." },
          { icon: "ri-mental-health-line", title: "Stimulant-Induced Psychosis", body: "Methamphetamine can induce psychotic symptoms — paranoid delusions, auditory and visual hallucinations — that are clinically indistinguishable from primary psychosis during the acute phase. These typically resolve with extended abstinence." },
          { icon: "ri-focus-3-line", title: "ADHD", body: "ADHD is overrepresented in stimulant use disorder. Stimulants produce paradoxical calming in ADHD, and many individuals discover this effect accidentally or deliberately self-medicate. Proper ADHD treatment is essential." },
          { icon: "ri-ghost-2-line", title: "PTSD & Trauma", body: "Stimulants are frequently used to suppress hypervigilance and emotional numbing in PTSD, or conversely to avoid dissociative states. Trauma-focused therapy addresses these dynamics directly." },
          { icon: "ri-heart-line", title: "Bipolar Disorder", body: "The manic-like states induced by stimulants can obscure underlying bipolar disorder, or stimulant use can destabilize existing bipolar cycling. Careful psychiatric assessment is required before mood stabilizer decisions are made." },
          { icon: "ri-mind-map", title: "Anxiety Disorders", body: "Stimulant withdrawal produces intense anxiety and paranoia that frequently warrants clinical management. Underlying anxiety disorders may have pre-dated stimulant use and contributed to it." },
        ],
      }}
      locBody="Stimulant use disorder treatment is covered under the Mental Health Parity Act by most major PPO plans. We verify your benefits before you begin."
      whyPoints={[
        { icon: "ri-trophy-line", title: "Contingency Management", body: "We offer contingency management — the most evidence-based behavioral treatment for stimulant use disorder." },
        { icon: "ri-shield-check-line", title: "Insurance Accepted", body: "Most major PPO plans cover stimulant use disorder treatment. We verify benefits before you begin." },
        { icon: "ri-user-heart-line", title: "Dual Diagnosis Capable", body: "Depression, ADHD, trauma, and psychiatric comorbidities are treated alongside stimulant use disorder." },
        { icon: "ri-lock-2-line", title: "Confidential Care", body: "HIPAA and 42 CFR Part 2 protections apply. Your treatment information remains entirely private." },
      ]}
      faqs={[
        { q: "Is there medication for methamphetamine or cocaine addiction?", a: "No FDA-approved medication currently exists specifically for stimulant use disorder. Some medications (bupropion, modafinil) show modest evidence in research settings but are not standard of care. Behavioral therapies — especially contingency management — are the evidence-based first-line treatment." },
        { q: "What is contingency management and does Mountain View offer it?", a: "Contingency management is a behavioral treatment that provides positive reinforcement (rewards) for drug-free urine screens and treatment engagement. It has the strongest evidence base of any behavioral intervention for stimulant use disorder. Yes, we incorporate contingency management in our programming." },
        { q: "Do I need detox before starting outpatient treatment?", a: "Stimulant withdrawal, while psychologically difficult (depression, fatigue, dysphoria), is not medically dangerous and generally does not require supervised medical detox. Most clients can begin outpatient programming directly." },
        { q: "I think I'm experiencing meth psychosis. What should I do?", a: "Methamphetamine-induced psychosis is a psychiatric emergency. If you or someone you know is experiencing paranoia, delusions, or hallucinations, seek emergency medical care. Once stabilized, our clinical team can coordinate a safe transition into outpatient treatment." },
        { q: "How long does treatment take?", a: "Stimulant use disorder often requires extended engagement — 12 weeks or more in IOP, followed by ongoing outpatient support. Early recovery from stimulants involves prolonged anhedonia (inability to feel pleasure) that resolves over months with appropriate support." },
      ]}
    />
  );
}
