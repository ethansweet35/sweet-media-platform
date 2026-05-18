import MentalHealthPage from "./MentalHealthPage";
const IMG = "https://gueqxorkktfcwiakepcp.supabase.co/storage/v1/object/public/site-assets/images/wp-inline/2026/05/mvt_mh_trauma.jpg";
export default function TraumaPage() {
  return (
    <MentalHealthPage
      heroImage={IMG}
      heroAlt="Trauma and PTSD treatment in Seattle, WA — Mountain View Treatment"
      eyebrow="What We Treat / Mental Health"
      headline="Trauma & PTSD"
      headlineItalic="Treatment in Seattle"
      heroBody="Trauma and PTSD are among the most treatable conditions in mental health — with evidence-based therapies that produce lasting change. Mountain View Treatment specializes in trauma-informed outpatient care in Seattle, Washington."
      whatHeadline="What Are Trauma and PTSD?"
      whatBody={[
        "Post-traumatic stress disorder (PTSD) is a psychiatric condition that can develop after exposure to actual or threatened death, serious injury, or sexual violence — either directly, as a witness, or through learning of a traumatic event affecting a close person. It involves a disruption in how traumatic memories are stored and processed that causes them to remain emotionally raw and intrusive rather than becoming integrated into the normal past.",
        "Trauma exists on a spectrum. Acute stress disorder follows the same events as PTSD but resolves within a month. Complex PTSD (C-PTSD) develops from prolonged, repeated trauma — particularly in childhood or in contexts of captivity — and involves additional symptoms of self-organization disruption beyond those in standard PTSD. Many trauma survivors do not meet full PTSD criteria but carry significant trauma-related symptoms that warrant treatment.",
        "Effective trauma treatment does not require clients to repeatedly recount their experiences at length. Evidence-based approaches such as EMDR and trauma-focused CBT work with traumatic memory at the neurological level — reducing its intrusive power without demanding exhaustive verbal processing. Recovery from trauma is genuinely possible, and Mountain View Treatment is specialized in this work.",
      ]}
      symptomsHeadline="Symptoms of PTSD and Trauma"
      symptomsIntro="PTSD is organized into four symptom clusters in the DSM-5. Significant impairment across multiple clusters is typically present:"
      symptoms={[
        { label: "Intrusion Symptoms", desc: "Unwanted, distressing memories of the traumatic event; flashbacks (feeling as if the event is happening again); nightmares; intense psychological or physiological distress when exposed to trauma-related cues." },
        { label: "Avoidance", desc: "Effortful avoidance of trauma-related thoughts, feelings, people, places, activities, or situations. Avoidance temporarily reduces distress but prevents natural processing and recovery." },
        { label: "Negative Cognitions & Mood", desc: "Distorted beliefs about self or world ('I am damaged'; 'nowhere is safe'); persistent negative emotions; diminished interest in activities; feeling detached from others; inability to experience positive emotions." },
        { label: "Hyperarousal & Reactivity", desc: "Irritable or aggressive behavior; reckless or self-destructive behavior; hypervigilance; exaggerated startle response; difficulty concentrating; sleep disturbance — the nervous system chronically on alert." },
        { label: "Dissociation", desc: "Depersonalization (feeling detached from one's mental processes or body) or derealization (feeling that the world is unreal). More prominent in complex trauma and childhood abuse histories." },
        { label: "Somatic Symptoms", desc: "Physical manifestations of unprocessed trauma — chronic pain, GI distress, tension, fatigue, and physical symptoms without clear medical cause. Trauma is stored in the body as much as the mind." },
      ]}
      approachHeadline="Evidence-Based Trauma Treatment"
      approachBody="Mountain View Treatment is specialized in evidence-based trauma therapies that address traumatic memory at a neurological level — producing lasting change without requiring exhaustive verbal retelling of traumatic experiences."
      approaches={[
        { icon: "ri-eye-line", title: "EMDR (Eye Movement Desensitization and Reprocessing)", body: "EMDR is one of the most extensively researched and effective trauma treatments available. It uses bilateral stimulation to facilitate the brain's natural memory reprocessing, allowing traumatic memories to be integrated and lose their emotional intensity." },
        { icon: "ri-mind-map", title: "Trauma-Focused Cognitive Behavioral Therapy (TF-CBT)", body: "TF-CBT is a structured, evidence-based approach that addresses the distorted beliefs, avoidance patterns, and emotional dysregulation that sustain PTSD — with a specific focus on the traumatic event context." },
        { icon: "ri-heart-pulse-line", title: "Somatic Experiencing", body: "Trauma is stored physiologically. Somatic experiencing works with the body's trauma response — completing interrupted defensive responses, discharging survival energy, and restoring nervous system regulation." },
        { icon: "ri-safe-line", title: "Safety & Stabilization First", body: "For complex trauma and dissociative presentations, a phase-based approach prioritizes safety and stabilization before trauma processing begins — ensuring the nervous system has sufficient resources to tolerate the work." },
        { icon: "ri-focus-3-line", title: "Mindfulness-Based Trauma Care", body: "Mindfulness cultivates the dual awareness necessary for trauma processing — the ability to observe traumatic material without being overwhelmed by it. It is integrated throughout all our trauma treatment modalities." },
      ]}
      comorbidities={{
        headline: "Conditions That Commonly Co-Occur With Trauma & PTSD",
        intro: "Trauma rarely presents in clinical isolation. The conditions most commonly associated with trauma histories are among the most important to treat concurrently.",
        closingNote: "Treating PTSD without addressing co-occurring substance use, depression, or anxiety consistently produces inferior outcomes. Mountain View's trauma-specialized team integrates all dimensions of your clinical picture from day one.",
        items: [
          { icon: "ri-drop-line", title: "Substance Use Disorders", body: "Trauma and substance use disorder are deeply intertwined. Up to 80% of people seeking substance use treatment have trauma histories. Substances provide relief from intrusive symptoms — making trauma treatment essential to lasting recovery." },
          { icon: "ri-emotion-unhappy-line", title: "Major Depression", body: "Depression is present in over 50% of PTSD cases. The negative cognitions, withdrawal, and hopelessness of PTSD generate genuine depressive episodes that require concurrent treatment." },
          { icon: "ri-mind-map", title: "Anxiety Disorders", body: "The hyperarousal and avoidance of PTSD overlap significantly with generalized anxiety, panic disorder, and social anxiety. They often co-occur and amplify each other." },
          { icon: "ri-toggle-line", title: "Dissociative Disorders", body: "Complex childhood trauma is associated with a spectrum of dissociative presentations — from depersonalization and derealization to more complex dissociative disorders. Specialized assessment and pacing of trauma work are essential." },
          { icon: "ri-heart-pulse-line", title: "Chronic Pain & Somatic Conditions", body: "Unprocessed trauma is strongly associated with chronic pain, fibromyalgia, chronic fatigue, and medically unexplained symptoms. Trauma treatment often produces unexpected improvement in physical symptoms." },
          { icon: "ri-fork-line", title: "Eating Disorders", body: "Trauma — particularly sexual and interpersonal violence — is strongly associated with eating disorders. Body-based trauma treatment that addresses the relationship with the body is central to this overlap." },
        ],
      }}
      locBody="PTSD and trauma treatment are covered by most major insurance plans, including TRICARE for military-connected individuals."
      whyPoints={[
        { icon: "ri-eye-line", title: "EMDR Specialists", body: "Our therapists are trained in EMDR — one of the most effective trauma treatments in the evidence base." },
        { icon: "ri-shield-check-line", title: "Insurance Accepted", body: "TRICARE, Aetna, Anthem, Cigna, UnitedHealthcare, and most major PPO plans." },
        { icon: "ri-heart-pulse-line", title: "Somatic Integration", body: "Trauma lives in the body — our treatment addresses both neurological and somatic dimensions of trauma." },
        { icon: "ri-lock-2-line", title: "Complete Safety & Confidentiality", body: "A private, non-judgmental environment where your experience is heard and treated with clinical care." },
      ]}
      faqs={[
        { q: "Do I have to talk about what happened in detail?", a: "Not necessarily. Evidence-based trauma treatments like EMDR work with traumatic memory at a neurological level without requiring exhaustive verbal retelling. Many clients find EMDR preferable precisely because it does not require repeatedly narrating the trauma in detail." },
        { q: "How long does PTSD treatment take?", a: "EMDR for single-incident trauma can produce significant symptom reduction in 8–12 sessions. Complex PTSD — arising from prolonged, repeated trauma — typically requires a longer, phase-based treatment course. Our team provides ongoing assessment and adjusts the plan based on your progress and comfort." },
        { q: "I don't think I have PTSD — just a lot of stress. Should I still get assessed?", a: "Yes. Trauma-related symptoms can present below the threshold of a full PTSD diagnosis while still significantly affecting quality of life. Subsyndromal PTSD, adjustment disorder, and trauma-related anxiety and depression all respond well to trauma-informed care." },
        { q: "What is complex PTSD?", a: "Complex PTSD (C-PTSD) develops from prolonged, repeated trauma — particularly in childhood, captivity, or abusive relationships. In addition to standard PTSD symptoms, C-PTSD involves difficulties with self-regulation, distorted self-perception, and problems in relationships. It requires a more extended, phase-based treatment approach." },
        { q: "Does insurance cover trauma treatment?", a: "Yes. PTSD is a recognized DSM-5 diagnosis covered under the Mental Health Parity Act by most major insurance plans. TRICARE covers trauma treatment for military-connected individuals. Our admissions team verifies your specific benefits at no cost." },
      ]}
    />
  );
}
