import GuideArticlePage from "./GuideArticlePage";

const BASE = "https://gueqxorkktfcwiakepcp.supabase.co/storage/v1/object/public/site-assets/images";

export default function DualDiagnosisGuidePage() {
  return (
    <GuideArticlePage
      title="Understanding Dual Diagnosis: Addiction and Mental Health"
      intro="More than half of people with a substance use disorder also live with a co-occurring mental health condition. Understanding how these two conditions interact — and why they must be treated together — is foundational to lasting recovery."
      readTime="11 min read"
      topics={["Dual Diagnosis", "Mental Health", "Co-occurring", "Clinical"]}
      heroImage={`${BASE}/mvt_guide_dual_diagnosis.jpg`}
      heroAlt="Serene Pacific Northwest therapy room suggesting the dual nature of mind and body healing"
      keyFacts={[
        { label: "Have Co-occurring Disorders", value: "50%+" },
        { label: "Better Outcomes w/ Integrated Tx", value: "Yes" },
        { label: "Common Conditions", value: "8–10" },
        { label: "Treatment Approach", value: "Integrated" },
      ]}
      sections={[
        {
          heading: "What Is Dual Diagnosis?",
          body: [
            "Dual diagnosis — also called co-occurring disorders — refers to the simultaneous presence of a substance use disorder and one or more mental health conditions in the same individual. It is not a rare edge case: SAMHSA data consistently shows that more than half of people with a substance use disorder also meet criteria for a mental health disorder, and vice versa.",
            "Common combinations include alcohol use disorder with major depression, opioid use disorder with PTSD, cannabis use disorder with anxiety disorder, and stimulant use disorder with bipolar disorder. The relationship between these conditions is rarely simple cause-and-effect; more often, they are bidirectionally entangled — each worsening the other.",
          ],
          callout:
            "SAMHSA's 2023 National Survey on Drug Use and Health found that 21.5 million adults in the U.S. had co-occurring substance use and mental health disorders.",
        },
        {
          heading: "Why Treating Both Conditions Simultaneously Matters",
          body: [
            "For decades, addiction treatment and mental health treatment were siloed. People would complete a 30-day rehab program — none of which addressed their underlying trauma, depression, or anxiety — and return to exactly the same psychological circumstances that drove their substance use in the first place.",
            "Research now makes clear that treating one condition while ignoring the other produces poor outcomes for both. Integrated treatment — where addiction and mental health are addressed concurrently by a coordinated clinical team — significantly improves retention in treatment, reduces relapse rates, and produces better long-term functioning.",
            "At Mountain View Treatment, every client receives a comprehensive psychiatric evaluation and concurrent mental health treatment as part of their core program — not as an add-on.",
          ],
          callout:
            "Sequential treatment (treating addiction first, then mental health — or vice versa) is considered outdated and clinically inferior to integrated care.",
        },
        {
          heading: "Common Co-occurring Disorders",
          body: [
            "While any combination of substance use and mental health conditions can co-occur, certain pairings are particularly common and have well-established clinical literature.",
          ],
          list: [
            "Depression + Alcohol Use Disorder (AUD): alcohol initially blunts depressive symptoms; chronic use deepens depression",
            "PTSD + Opioid Use Disorder: opioids provide numbing relief from trauma hyperarousal; dependency develops rapidly",
            "Anxiety + Benzodiazepine or Cannabis Use Disorder: self-medication that creates dependency",
            "Bipolar Disorder + Stimulant Use: stimulants can trigger manic episodes; mania increases impulsivity and drug use",
            "ADHD + Substance Use: self-medication of inattention/impulsivity with stimulants, cannabis, or alcohol",
            "Borderline Personality Disorder + Polydrug Use: emotional dysregulation drives impulsive substance use",
          ],
        },
        {
          heading: "What Integrated Dual Diagnosis Treatment Looks Like",
          body: [
            "Integrated treatment means that the same clinical team — including a psychiatrist, licensed therapists, addiction medicine specialists, and case managers — addresses both conditions in a coordinated treatment plan. There is no handoff between separate programs.",
            "In practice, this means psychiatric evaluation and medication management alongside addiction counseling and group therapy. Trauma-focused modalities like EMDR or somatic experiencing may address the underlying events that drive both the mental health condition and the substance use. Cognitive behavioral therapy (CBT) and dialectical behavior therapy (DBT) are used to address the shared cognitive distortions and emotional regulation deficits that characterize many dual diagnosis presentations.",
            "Family involvement is another key component. Mental health conditions and addiction both affect family systems, and family therapy helps rebuild communication, establish healthy boundaries, and prepare loved ones to be a supportive part of the recovery environment.",
          ],
          callout:
            "The presence of a co-occurring mental health disorder is not a barrier to treatment — it is a reason for more comprehensive, clinically sophisticated care.",
        },
        {
          heading: "How to Find Dual Diagnosis Treatment in Washington",
          body: [
            "Not all treatment programs are equipped to manage co-occurring disorders. When evaluating a treatment program, ask specifically about their dual diagnosis capabilities — including whether they have psychiatrists on staff, whether medication management is available, and whether mental health treatment is integrated into the core program.",
            "In Washington State, the Behavioral Health Administration (BHA) maintains a directory of licensed behavioral health providers. SAMHSA's treatment locator (findtreatment.gov) also allows filtering by dual diagnosis specialty.",
            "Mountain View Treatment is fully equipped for complex dual diagnosis presentations. Our clinical team includes addiction psychiatrists, licensed mental health counselors, and trauma specialists — all working together within a unified treatment plan.",
          ],
          list: [
            "Ask if psychiatrists are on staff (not just consulting)",
            "Confirm psychiatric medications can be managed on-site",
            "Ask whether mental health therapy is concurrent with addiction treatment",
            "Inquire about trauma-specific modalities (EMDR, somatic therapy)",
            "Verify the program is licensed for both behavioral health and substance use",
          ],
        },
        {
          heading: "Supporting a Loved One with Dual Diagnosis",
          body: [
            "Loving someone with a dual diagnosis can be exhausting and confusing. The interplay between mental illness and addiction can make it difficult to know which condition is driving a particular behavior — or whether what you're witnessing is a mental health crisis, a relapse, or both at once.",
            "The most important thing family members can do is resist the urge to diagnose or separate the conditions yourself. Both need professional attention simultaneously. Support them in seeking an integrated assessment — not sequential treatment at separate facilities.",
            "Al-Anon, NAMI Family Support Groups, and SMART Recovery Family & Friends all offer specific support for families navigating loved ones with co-occurring conditions. Mountain View's clinical team also offers family education sessions to help you understand what integrated treatment looks like and how you can support recovery without enabling.",
          ],
          list: [
            "NAMI Family Support Group: free peer-led support for family members",
            "Al-Anon: support for family members of people with alcohol use disorder",
            "SMART Recovery Family & Friends: evidence-based alternatives to Al-Anon",
            "NAMI Helpline: 1-800-950-NAMI (6264) — information and referrals",
            "SAMHSA National Helpline: 1-800-662-4357 — treatment referral and information",
          ],
        },
      ]}
      relatedGuides={[
        {
          title: "The Complete Guide to Drug and Alcohol Detox",
          href: "/guide/the-complete-guide-to-drug-and-alcohol-detox/",
          excerpt: "Everything you need to know about medically supervised detox — the first step in integrated care.",
        },
        {
          title: "Resources for Families of Addicts in King County",
          href: "/guide/resources-for-families-of-addicts-in-king-county/",
          excerpt: "Family support groups, intervention guidance, and community resources across King County.",
        },
        {
          title: "How to Stage an Intervention in Seattle",
          href: "/guide/how-to-stage-an-intervention-in-seattle/",
          excerpt: "A compassionate, step-by-step guide to organizing a family intervention for a loved one with addiction.",
        },
      ]}
    />
  );
}
