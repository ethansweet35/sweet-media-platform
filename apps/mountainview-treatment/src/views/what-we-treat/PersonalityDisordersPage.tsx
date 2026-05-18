import MentalHealthPage from "./MentalHealthPage";
const IMG = "https://gueqxorkktfcwiakepcp.supabase.co/storage/v1/object/public/site-assets/images/wp-inline/2026/05/mvt_mh_personality.jpg";
export default function PersonalityDisordersPage() {
  return (
    <MentalHealthPage
      heroImage={IMG}
      heroAlt="Personality disorder treatment in Seattle, WA — Mountain View Treatment"
      eyebrow="What We Treat / Mental Health"
      headline="Personality Disorder"
      headlineItalic="Treatment in Seattle"
      heroBody="Personality disorders are more common — and more treatable — than widely understood. Mountain View Treatment provides specialized outpatient care for personality disorders in Seattle, with particular expertise in dialectical behavior therapy (DBT) and related approaches."
      whatHeadline="What Are Personality Disorders?"
      whatBody={[
        "Personality disorders are a class of mental health conditions characterized by enduring, inflexible patterns of inner experience and behavior that deviate markedly from cultural expectations, are pervasive across situations, and cause significant distress or functional impairment. They are not simply difficult personality traits — they represent fundamental patterns of perceiving, relating, and thinking that consistently interfere with quality of life and relationships.",
        "The DSM-5 organizes personality disorders into three clusters: Cluster A (odd/eccentric: paranoid, schizoid, schizotypal), Cluster B (dramatic/emotional: antisocial, borderline, histrionic, narcissistic), and Cluster C (anxious/fearful: avoidant, dependent, obsessive-compulsive). Borderline personality disorder (BPD) is the most commonly treated in clinical settings and has the most robust evidence base for psychotherapy.",
        "The perception that personality disorders are untreatable is outdated. Dialectical behavior therapy (DBT), mentalization-based treatment (MBT), and schema therapy have produced significant, lasting improvements across personality disorder presentations — with BPD showing particularly strong treatment response. Early, sustained engagement with evidence-based treatment produces meaningful change in both symptoms and quality of life.",
      ]}
      symptomsHeadline="Common Presentations Across Personality Disorders"
      symptomsIntro="While specific symptoms vary by disorder, certain patterns are broadly characteristic of personality disorder presentations:"
      symptoms={[
        { label: "Emotional Dysregulation", desc: "Intense, rapidly shifting emotional states that are difficult to modulate — particularly prominent in borderline and histrionic presentations. Emotions feel overwhelming and disproportionate." },
        { label: "Interpersonal Difficulties", desc: "Chronic difficulties in close relationships — patterns of idealization and devaluation, fear of abandonment, difficulty trusting others, or a tendency to manipulate or exploit." },
        { label: "Distorted Self-Image", desc: "Unstable, fragmented, or markedly distorted sense of self — ranging from chronic emptiness to grandiosity, from shame to entitlement, depending on the specific presentation." },
        { label: "Impulsivity", desc: "Acting without consideration of consequences — particularly in areas of spending, sex, substance use, eating, or self-harm. Impulsive behaviors provide short-term relief from intolerable emotional states." },
        { label: "Rigid, Maladaptive Patterns", desc: "Responding to a wide range of situations with the same characteristic patterns regardless of whether they are helpful — inflexibility is a defining feature across all personality disorders." },
        { label: "Self-Harming Behavior", desc: "Non-suicidal self-injury (NSSI) is a common presentation in borderline personality disorder — functioning as an emotion regulation strategy when other coping mechanisms fail." },
      ]}
      typesHeadline="Personality Disorders We Treat"
      typesIntro="Mountain View Treatment has clinical expertise across the personality disorder spectrum, with particular depth in Cluster B presentations:"
      types={[
        { title: "Borderline Personality Disorder (BPD)", body: "Characterized by emotional instability, fear of abandonment, unstable relationships, impulsivity, chronic emptiness, and self-harm. The most studied personality disorder — with the strongest psychotherapy evidence base." },
        { title: "Narcissistic Personality Disorder (NPD)", body: "Grandiosity, need for admiration, lack of empathy, and difficulty tolerating criticism — often coexisting with a fragile underlying self-esteem that drives defensive self-enhancement." },
        { title: "Avoidant Personality Disorder (AvPD)", body: "Pervasive social inhibition, feelings of inadequacy, and extreme sensitivity to criticism — resulting in significant avoidance of social situations despite a strong desire for connection." },
        { title: "Obsessive-Compulsive Personality Disorder (OCPD)", body: "A pervasive preoccupation with orderliness, perfectionism, and control at the expense of flexibility, openness, and efficiency. Distinct from OCD." },
        { title: "Dependent Personality Disorder", body: "An excessive need to be taken care of that leads to submissive, clinging behavior and fears of separation — difficulty making independent decisions and tolerating being alone." },
        { title: "Schizotypal Personality Disorder", body: "Acute discomfort in close relationships, cognitive or perceptual distortions, and eccentric behavior — significant social and interpersonal deficits without meeting criteria for a psychotic disorder." },
      ]}
      approachHeadline="Evidence-Based Treatment for Personality Disorders"
      approachBody="The most effective treatments for personality disorders are structured, relationally-focused psychotherapies that directly address the core emotional dysregulation and interpersonal patterns at the center of the disorder."
      approaches={[
        { icon: "ri-scales-line", title: "Dialectical Behavior Therapy (DBT)", body: "DBT is the gold-standard treatment for borderline personality disorder and the gold-standard for emotional dysregulation across personality disorder presentations. It teaches concrete skills in distress tolerance, emotion regulation, mindfulness, and interpersonal effectiveness." },
        { icon: "ri-user-search-line", title: "Mentalization-Based Treatment (MBT)", body: "MBT builds the capacity to understand mental states — in oneself and others — that underlies healthy relationships. Particularly effective for BPD and dependent personality presentations." },
        { icon: "ri-mind-map", title: "Schema Therapy", body: "Schema therapy addresses the early maladaptive schemas — deep, longstanding patterns rooted in unmet childhood needs — that drive adult personality disorder presentations." },
        { icon: "ri-group-line", title: "Group Therapy", body: "Group formats are particularly powerful for personality disorders — providing real-time interpersonal laboratory experiences and peer feedback that individual therapy alone cannot replicate." },
        { icon: "ri-heart-pulse-line", title: "Trauma-Informed Integration", body: "Many personality disorders — particularly BPD — have strong roots in developmental trauma. Trauma-informed approaches are integrated throughout personality disorder treatment at Mountain View." },
      ]}
      comorbidities={{
        headline: "Conditions That Commonly Co-Occur With Personality Disorders",
        intro: "Personality disorders have exceptionally high rates of psychiatric comorbidity. Co-occurring conditions typically require concurrent treatment.",
        closingNote: "Treating co-occurring depression, anxiety, or substance use without addressing the underlying personality disorder commonly leads to incomplete recovery. Mountain View's integrated team addresses the full clinical picture simultaneously.",
        items: [
          { icon: "ri-emotion-unhappy-line", title: "Major Depression", body: "Depression is one of the most common co-occurring conditions across personality disorders — particularly in BPD, avoidant, and dependent presentations. The interpersonal losses driven by personality disorder behavior generate genuine depressive episodes." },
          { icon: "ri-ghost-2-line", title: "PTSD & Developmental Trauma", body: "BPD and complex PTSD have significant diagnostic overlap. Many individuals with personality disorders have extensive trauma histories that require concurrent trauma-focused treatment." },
          { icon: "ri-drop-line", title: "Substance Use Disorders", body: "Substance use is common in personality disorders — particularly BPD — as a method of regulating the intense emotional states that define the disorder. DBT skills directly address the emotional drivers of substance use." },
          { icon: "ri-mind-map", title: "Anxiety Disorders", body: "Anxiety co-occurs with personality disorders across the spectrum — particularly avoidant, dependent, and OCPD presentations. Social anxiety and GAD are especially common." },
          { icon: "ri-fork-line", title: "Eating Disorders", body: "Eating disorders are substantially overrepresented in BPD — impulsive eating, restriction, and purging as emotion regulation strategies. DBT addresses both the emotional dysregulation and disordered eating behaviors." },
          { icon: "ri-toggle-line", title: "Bipolar Disorder", body: "Emotional lability in BPD can closely resemble bipolar cycling — careful differential diagnosis is essential because treatment approaches differ significantly. Both conditions can also co-occur." },
        ],
      }}
      locBody="Personality disorder treatment is covered under the Mental Health Parity Act by most major insurance plans."
      whyPoints={[
        { icon: "ri-scales-line", title: "DBT Trained Clinicians", body: "Our therapists are trained in dialectical behavior therapy — the gold-standard treatment for emotional dysregulation and BPD." },
        { icon: "ri-shield-check-line", title: "Insurance Accepted", body: "Aetna, Anthem, Cigna, TRICARE, UnitedHealthcare, and most major PPO plans." },
        { icon: "ri-group-line", title: "Group & Individual Therapy", body: "The interpersonal work essential to personality disorder treatment, structured across both group and individual formats." },
        { icon: "ri-lock-2-line", title: "Non-Judgmental Care", body: "We treat personality disorders with clinical expertise and complete respect — free from stigma." },
      ]}
      faqs={[
        { q: "Are personality disorders treatable?", a: "Yes. The perception that personality disorders are untreatable is outdated and inaccurate. DBT has produced significant, lasting improvements in BPD across dozens of randomized controlled trials. Schema therapy and MBT show strong evidence across the personality disorder spectrum. Recovery takes time, but meaningful change is achievable." },
        { q: "What is DBT and is it available at Mountain View?", a: "Dialectical behavior therapy (DBT) is a structured, skills-based therapy developed specifically for borderline personality disorder that has since shown efficacy across emotional dysregulation presentations. It teaches four skill modules: mindfulness, distress tolerance, emotion regulation, and interpersonal effectiveness. Yes, our clinicians are trained in DBT." },
        { q: "I was told my loved one has BPD — what does that mean for treatment?", a: "BPD is a well-defined clinical condition with a robust treatment evidence base. DBT produces significant reduction in self-harm, suicidal behavior, hospitalizations, and emotional instability over time. Family involvement in psychoeducation — understanding the condition and communication strategies — also improves outcomes." },
        { q: "How long does personality disorder treatment take?", a: "Meaningful change in personality disorder presentations requires sustained engagement over months to years. DBT skills training is typically structured over a 6-12 month period. Significant progress is often visible within this timeframe, with continued consolidation over subsequent years." },
        { q: "Does insurance cover personality disorder treatment?", a: "Yes. Personality disorders are DSM-5 diagnoses covered under the Mental Health Parity Act. Our admissions team verifies your specific benefits at no cost." },
      ]}
    />
  );
}
