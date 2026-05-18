import AddictionPage from "./AddictionPage";

const IMG = "https://gueqxorkktfcwiakepcp.supabase.co/storage/v1/object/public/site-assets/images/wp-inline/2026/05/mvt_prescription_hero.jpg";

export default function PrescriptionPage() {
  return (
    <AddictionPage
      heroImage={IMG}
      heroAlt="Prescription drug addiction treatment in Seattle, WA — Mountain View Treatment"
      eyebrow="What We Treat / Addiction"
      headline="Prescription Drug"
      headlineItalic="Addiction Treatment"
      heroBody="Prescription drug misuse is one of the most misunderstood forms of addiction — often beginning with a legitimate prescription. Mountain View Treatment provides expert, compassionate care for those struggling with prescription dependency in Seattle."
      whatHeadline="What Is Prescription Drug Use Disorder?"
      whatBody={[
        "Prescription drug use disorder refers to the problematic use of legally prescribed medications — most commonly opioid pain relievers, benzodiazepines, stimulants, and sleep medications — in ways other than prescribed, or continued use despite significant negative consequences.",
        "Prescription drug misuse is uniquely complex because it often begins with legitimate medical treatment. Physical dependence can develop even with therapeutic use over time, and the transition from dependence to disorder is not always obvious to the individual or their family.",
        "Washington State is among the states where prescription opioid misuse has been closely tracked, and benzodiazepine co-prescribing with opioids remains a significant risk factor for overdose. Effective treatment addresses both the substance use and the underlying conditions — pain, anxiety, sleep disorders, ADHD — that the medications were originally treating.",
      ]}
      signsHeadline="Signs of Prescription Drug Misuse"
      signsIntro="Signs of prescription drug use disorder vary by drug class, but common indicators include:"
      signs={[
        { label: "Taking More Than Prescribed", desc: "Using higher doses or more frequent doses than directed, or running out of prescriptions early." },
        { label: "Doctor Shopping", desc: "Seeking multiple prescribers or visiting urgent care facilities to obtain additional prescriptions." },
        { label: "Using for Reasons Other Than Prescribed", desc: "Taking pain medications for anxiety, sleeping pills for recreation, or stimulants for weight loss." },
        { label: "Concealing Use", desc: "Hiding medication use from family, friends, or healthcare providers; becoming defensive when use is questioned." },
        { label: "Withdrawal Symptoms", desc: "Experiencing physical symptoms — anxiety, pain, insomnia, sweating, tremors — when the medication is missed or reduced." },
        { label: "Functional Decline", desc: "Declining performance at work, withdrawal from social activities, or deteriorating relationships due to medication use." },
      ]}
      approachHeadline="Treating Prescription Drug Dependency"
      approachBody="Treatment for prescription drug use disorder must address both the substance dependency and the original conditions the medication was managing. Mountain View's integrated clinical team is experienced in this nuanced balance."
      approaches={[
        { icon: "ri-stethoscope-line", title: "Medical Evaluation", body: "A thorough clinical assessment identifies the class of drug, duration of use, physical dependence level, and co-occurring conditions to inform a safe and effective treatment plan." },
        { icon: "ri-capsule-line", title: "Medication Management", body: "For opioid prescriptions, MAT with buprenorphine or naltrexone is available. For benzodiazepines, a structured taper and alternative management plan is developed with our medical team." },
        { icon: "ri-mind-map", title: "Cognitive Behavioral Therapy", body: "CBT addresses the beliefs, habits, and emotional patterns that sustain prescription drug misuse and builds alternative coping strategies." },
        { icon: "ri-heart-pulse-line", title: "Treating Underlying Conditions", body: "Pain management, anxiety, ADHD, and sleep disorders can be addressed through evidence-based non-pharmaceutical approaches as part of integrated treatment." },
        { icon: "ri-group-line", title: "Peer Support Groups", body: "Group therapy normalizes the experience of prescription drug dependency and provides community accountability during recovery." },
      ]}
      withdrawal={{
        headline: "Withdrawal from Prescription Medications",
        intro: "Withdrawal from prescription drugs varies dramatically depending on the drug class. Opioid prescriptions follow a similar pattern to illicit opioids. Benzodiazepine withdrawal can be among the most medically serious of all substance withdrawals. Prescription stimulant withdrawal is uncomfortable but generally not medically dangerous. The duration of your prescription, dose, and how abruptly you stop all determine severity.",
        isMedical: true,
        timeline: [
          {
            phase: "Opioid Prescriptions",
            duration: "Onset 8–24 Hrs",
            symptoms: [
              "Muscle aches and cramping",
              "Restlessness and anxiety",
              "Nausea and vomiting",
              "Sweating and chills",
              "Severe drug cravings",
              "Dysphoria and depression",
            ],
          },
          {
            phase: "Benzodiazepines",
            duration: "Onset 1–4 Days",
            symptoms: [
              "Rebound anxiety (often severe)",
              "Insomnia and vivid dreams",
              "Tremors and sweating",
              "Elevated heart rate and blood pressure",
              "Seizure risk — potentially life-threatening",
              "Delirium in severe or rapid withdrawal",
            ],
          },
          {
            phase: "Prescription Stimulants",
            duration: "Onset 1–3 Days",
            symptoms: [
              "Profound fatigue and hypersomnia",
              "Increased appetite",
              "Depression and anhedonia",
              "Cognitive slowing and brain fog",
              "Irritability and low motivation",
              "Prolonged ADHD symptom rebound",
            ],
          },
        ],
        note: "Benzodiazepine withdrawal carries a seizure risk that makes abrupt cessation potentially fatal — even at therapeutic doses after prolonged use. Never stop a benzodiazepine prescription abruptly. Our clinical team designs individualized, medically supervised tapering schedules and can coordinate medical management of the withdrawal period before transitioning to outpatient programming.",
      }}
      comorbidities={{
        headline: "Why Prescription Drug Dependency Is Often More Complex",
        intro: "Prescription drug use disorder is uniquely challenging because the original medical condition — pain, anxiety, ADHD, insomnia — doesn't disappear when the medication does. Effective treatment addresses both the dependency and the underlying condition through evidence-based alternatives.",
        closingNote: "Our integrated clinical approach identifies underlying conditions during intake and develops a treatment plan that addresses both the substance dependency and the conditions that drove it — without simply replacing one medication with another.",
        items: [
          { icon: "ri-heart-pulse-line", title: "Chronic Pain", body: "Long-term opioid therapy often worsens pain sensitivity (opioid-induced hyperalgesia). Our team coordinates physical therapy, somatic approaches, and non-opioid pain management as alternatives." },
          { icon: "ri-mind-map", title: "Anxiety & Panic Disorder", body: "Benzodiazepines are highly effective short-term but lose efficacy over months. Evidence-based alternatives — CBT, SSRIs, buspirone, somatic therapy — address anxiety without dependency risk." },
          { icon: "ri-focus-3-line", title: "ADHD", body: "Prescription stimulant misuse often reflects undertreated ADHD. Our team provides ADHD assessment and works with prescribers on appropriate medication management alongside behavioral strategies." },
          { icon: "ri-moon-line", title: "Insomnia", body: "Sleep medications (z-drugs, benzodiazepines) are among the most commonly misused prescriptions. CBT for insomnia (CBT-I) is more effective long-term than any sleep medication and is a core part of our treatment." },
          { icon: "ri-ghost-2-line", title: "Trauma & PTSD", body: "Many prescriptions — particularly opioids and benzodiazepines — are used to suppress PTSD symptoms. Trauma-focused therapies address the root cause directly." },
          { icon: "ri-mental-health-line", title: "Depression", body: "Depression commonly co-occurs with prescription drug misuse, both as a driver of use and as a consequence of dependency. Integrated psychiatric care is available for clients who need it." },
        ],
      }}
      locBody="Prescription drug use disorder treatment is covered by most major PPO plans. Our admissions team verifies benefits at no cost."
      whyPoints={[
        { icon: "ri-stethoscope-line", title: "Medical Expertise", body: "Our clinical team is experienced in the specific complexities of prescription drug dependency — including co-occurring pain and psychiatric conditions." },
        { icon: "ri-shield-check-line", title: "Insurance Accepted", body: "Most major PPO plans cover prescription drug use disorder treatment under the Mental Health Parity Act." },
        { icon: "ri-user-line", title: "Non-Judgmental Care", body: "We understand that prescription dependency often begins through legitimate medical care. Our approach is clinical, compassionate, and free of stigma." },
        { icon: "ri-lock-2-line", title: "Complete Privacy", body: "Your treatment is fully protected under HIPAA and 42 CFR Part 2. Employers and family members receive no information without your explicit consent." },
      ]}
      faqs={[
        { q: "I was prescribed this medication by my doctor. Is it really addiction?", a: "Physical dependence can develop from therapeutic use. Whether it has crossed into use disorder depends on whether your use is causing significant impairment or distress and whether you feel unable to stop despite wanting to. Our clinical team can help you assess your situation without judgment." },
        { q: "Do I need to stop the medication immediately?", a: "Stopping benzodiazepines or opioids abruptly can be medically dangerous. Our clinical team will develop a safe taper schedule or coordinate with a detox facility as appropriate. Abrupt cessation is never recommended." },
        { q: "Can my underlying pain or anxiety still be treated?", a: "Yes. Our integrated treatment approach addresses co-occurring pain, anxiety, ADHD, and other conditions through non-pharmaceutical and pharmaceutical alternatives as appropriate." },
        { q: "What about benzodiazepine withdrawal?", a: "Benzodiazepine withdrawal can be medically serious and must be managed carefully. We coordinate safe tapering schedules and may recommend medical supervision during the reduction phase before outpatient programming begins." },
        { q: "How long does treatment take?", a: "Duration depends on the drug class, duration of use, and individual circumstances. Most clients complete PHP in 4–6 weeks followed by IOP for 8–12 weeks, with ongoing outpatient support." },
      ]}
    />
  );
}
