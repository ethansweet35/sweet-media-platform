import GuideArticlePage from "./GuideArticlePage";

const BASE = "https://gueqxorkktfcwiakepcp.supabase.co/storage/v1/object/public/site-assets/images";

export default function DetoxGuidePage() {
  return (
    <GuideArticlePage
      title="The Complete Guide to Drug and Alcohol Detox"
      intro="Medical detox is the first — and often most critical — step in addiction recovery. This guide explains what to expect, why medical supervision is essential, and how to access safe detox in Seattle."
      readTime="12 min read"
      topics={["Detox", "Medical Care", "Seattle"]}
      heroImage={`${BASE}/mvt_guide_detox.jpg`}
      heroAlt="Medical wellness room with Pacific Northwest forest view at Mountain View Treatment"
      keyFacts={[
        { label: "Detox Duration", value: "3–14 days" },
        { label: "Withdrawal Risk", value: "High w/o MD" },
        { label: "Success Rate Boost", value: "2–3×" },
        { label: "Available 24/7", value: "Yes" },
      ]}
      sections={[
        {
          heading: "What Is Medical Detox?",
          body: [
            "Medical detox is a supervised process that safely clears alcohol, opioids, benzodiazepines, or other substances from the body while managing the physical and psychological symptoms of withdrawal. Unlike detoxing alone at home, medical detox takes place in a clinical setting where physicians, nurses, and addiction specialists monitor your vitals around the clock.",
            "The goal of detox is not recovery in itself — it is safe stabilization. Once your body is no longer in acute withdrawal, you are ready to begin the therapeutic work of addiction treatment. Think of detox as preparing the foundation upon which real healing is built.",
          ],
          callout:
            "Medical detox is covered by most PPO insurance plans. Our admissions team can verify your benefits before you arrive.",
        },
        {
          heading: "Why Detox Must Be Medically Supervised",
          body: [
            "Many people underestimate how dangerous withdrawal can be. Alcohol and benzodiazepine withdrawal in particular can cause life-threatening seizures, cardiac events, or a condition called delirium tremens (DTs) — a severe form of alcohol withdrawal that can be fatal without immediate medical intervention.",
            "Opioid withdrawal, while rarely fatal on its own, causes extreme physical distress — vomiting, uncontrolled shaking, severe muscle cramps — that dramatically increases relapse risk. Studies consistently show that people who attempt to quit opioids without medical support relapse at much higher rates, often returning to use at lower tolerance and facing a greater overdose risk.",
          ],
          list: [
            "Alcohol / benzo withdrawal: risk of seizures and death without medical monitoring",
            "Opioid withdrawal: severe physical distress increases relapse risk 3–5×",
            "Stimulant withdrawal: significant depression, cardiac symptoms possible",
            "Polydrug use: unpredictable withdrawal timelines require continuous monitoring",
          ],
        },
        {
          heading: "What Happens During Detox at Mountain View",
          body: [
            "On arrival, our medical team conducts a comprehensive intake assessment — reviewing your substance use history, current health status, prior withdrawal history, and any co-occurring medical or psychiatric conditions. This assessment shapes your individualized detox protocol.",
            "During detox, you are monitored continuously. Depending on your substance of use, FDA-approved medications (such as buprenorphine, clonidine, or benzodiazepines administered under physician supervision) may be used to reduce withdrawal severity, manage cravings, and keep you comfortable. Our nursing staff checks vital signs at regular intervals, and a physician is on call at all times.",
          ],
          callout:
            "Mountain View's clinical team uses evidence-based protocols aligned with ASAM guidelines for medically managed withdrawal.",
        },
        {
          heading: "How Long Does Detox Take?",
          body: [
            "The duration of detox depends on the substance used, duration of use, amount used, and individual health factors. Below are general timelines, though individual experiences vary widely.",
            "Alcohol detox: Symptoms typically begin 6–24 hours after the last drink, peak between 24–72 hours, and resolve within 5–10 days. Severe symptoms can extend beyond this window.",
            "Opioid detox: Short-acting opioids (heroin, oxycodone) cause symptoms beginning 8–24 hours after last use, peaking at 36–72 hours. Longer-acting opioids like methadone may not cause visible withdrawal for 24–48 hours and can last 2–3 weeks.",
            "Benzodiazepine detox: Among the most complex. Withdrawal can begin days after the last dose and may persist for weeks depending on the specific benzo and duration of use.",
          ],
          list: [
            "Alcohol: 3–10 days in most cases",
            "Short-acting opioids (heroin, oxycodone): 5–10 days",
            "Long-acting opioids (methadone): 10–20+ days",
            "Benzodiazepines: 2–8 weeks (gradual taper protocol)",
            "Stimulants (meth, cocaine): 5–10 days (crash + fatigue phase)",
          ],
        },
        {
          heading: "What Comes After Detox?",
          body: [
            "Detox alone is not treatment. The National Institute on Drug Abuse is unambiguous on this point: detox without follow-up care fails to address the underlying psychological and behavioral aspects of addiction and leads to relapse in the vast majority of cases.",
            "Completing detox is a tremendous accomplishment — your body is clear of substances and you are physiologically stable. Now is the moment to step into structured treatment: partial hospitalization (PHP), intensive outpatient (IOP), or residential care, depending on the severity of your addiction and your clinical needs.",
            "Mountain View provides a seamless continuum of care from medically managed detox directly into PHP or IOP treatment. Our care coordinators will work with you to plan your next step before you complete detox, ensuring there is no gap in your support.",
          ],
          callout:
            "The most effective treatment plans begin detox and flow directly into a level of clinical care — never returning home to an unsupported environment immediately after withdrawal.",
        },
        {
          heading: "Finding Medically Supervised Detox in Seattle",
          body: [
            "King County and the greater Seattle area have several medically supervised detox options. When evaluating a detox facility, look for board-certified addiction medicine physicians on staff, 24/7 nursing coverage, evidence-based medication protocols, and a clear pathway into residential or outpatient treatment following discharge.",
            "Mountain View Treatment offers medically supervised detox integrated into our full continuum of care. Our Seattle-area location, private accommodations, and luxury clinical environment make the process as comfortable as possible while ensuring clinical rigor.",
            "If you or a loved one is ready to start, call our admissions team at any hour. We can verify insurance benefits, explain the process, and coordinate admission — often within 24 to 48 hours.",
          ],
          list: [
            "Verify physician-led medical supervision is provided",
            "Ask about 24/7 nursing and on-call MD availability",
            "Confirm medication-assisted withdrawal protocols",
            "Ask about the treatment program that follows detox",
            "Confirm insurance coverage or payment plan options",
          ],
        },
      ]}
      relatedGuides={[
        {
          title: "What to Expect and Pack for Treatment",
          href: "/guide/what-to-expect-and-pack-for-treatment/",
          excerpt: "A practical guide to preparing for your first day of treatment — physically, emotionally, and logistically.",
        },
        {
          title: "How to Pay for Drug Rehab in Washington State",
          href: "/guide/how-to-pay-for-drug-rehab-in-washington-state/",
          excerpt: "Understanding insurance, Medicaid, EAPs, and financing options for addiction treatment in Washington.",
        },
        {
          title: "Understanding Dual Diagnosis: Addiction & Mental Health",
          href: "/guide/understanding-dual-diagnosis-addiction-mental-health/",
          excerpt: "Why treating addiction alongside co-occurring mental health conditions is essential for lasting recovery.",
        },
      ]}
    />
  );
}
