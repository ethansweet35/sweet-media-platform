import GuideArticlePage from "./GuideArticlePage";

const BASE = "https://gueqxorkktfcwiakepcp.supabase.co/storage/v1/object/public/site-assets/images";

export default function FamiliesGuidePage() {
  return (
    <GuideArticlePage
      title="Resources for Families of Addicts in King County"
      intro="Addiction affects the entire family — not just the person using. This guide compiles the support groups, treatment resources, family programs, and practical guidance available to families navigating addiction in King County and greater Seattle."
      readTime="10 min read"
      topics={["Family", "King County", "Support", "Resources"]}
      heroImage={`${BASE}/mvt_guide_intervention.jpg`}
      heroAlt="A warm living room with chairs arranged in a circle, suggesting a family support meeting"
      keyFacts={[
        { label: "Family Members Affected", value: "4–6 per person" },
        { label: "Al-Anon Groups in WA", value: "300+" },
        { label: "Family Therapy", value: "Included in Care" },
        { label: "NAMI Helpline", value: "1-800-950-6264" },
      ]}
      sections={[
        {
          heading: "Understanding Your Loved One's Addiction",
          body: [
            "One of the most painful aspects of loving someone with an addiction is the persistent question: Why won't they just stop? Understanding that addiction is a chronic brain disorder — not a moral failing, a choice, or a lack of love for the people in their lives — is the first step toward reframing your relationship with the situation.",
            "Addiction changes the brain's reward circuitry, impulse control, and decision-making capacity. The person you love is not choosing drugs or alcohol over you; they are compelled by a neurological process that has altered their ability to evaluate consequences and regulate behavior. This does not mean you are powerless — it means that your response matters, and that professional help is often the most loving thing you can offer.",
          ],
          callout:
            "The American Society of Addiction Medicine defines addiction as \"a treatable, chronic medical disease involving complex interactions among brain circuits, genetics, the environment, and an individual's life experiences.\"",
        },
        {
          heading: "Setting Healthy Boundaries Without Enabling",
          body: [
            "There is a difficult line between supporting a loved one and enabling their addiction. Enabling refers to behaviors that — often from a place of love and desperation — remove the natural consequences of substance use: covering financial debts from drug spending, calling in sick for them, providing housing with no conditions, lying to family or employers on their behalf.",
            "Enabling is not the same as supporting. Support includes attending family therapy, learning about addiction, helping research treatment options, and maintaining a loving relationship while refusing to participate in behaviors that sustain active addiction.",
            "Setting healthy limits is not rejection. It is a form of respect for both yourself and your loved one. Common healthy limits include: refusing to provide money when you know it will be used for substances, making your home substance-free, and communicating clearly that you will support treatment but not active use.",
          ],
          list: [
            "Stop covering financial consequences of substance use",
            "Decline to lie to employers, family, or others on their behalf",
            "Do not allow substances in your home",
            "Communicate love alongside clear, calm limits",
            "Encourage treatment without issuing ultimatums in anger",
            "Seek your own support — you cannot pour from an empty cup",
          ],
        },
        {
          heading: "Treatment Resources in King County and Seattle",
          body: [
            "King County has a broad range of addiction treatment resources, from publicly funded programs through King County Behavioral Health to private residential centers like Mountain View Treatment. Understanding the landscape helps families guide loved ones toward the appropriate level of care.",
            "For individuals with Apple Health (Medicaid), King County Behavioral Health and Recovery Division (BHRD) funds numerous treatment services. SAMHSA's treatment locator (findtreatment.gov) allows filtering by location, insurance type, and specialty (including dual diagnosis and specific substance types).",
          ],
          list: [
            "Mountain View Treatment: private residential, PHP, and IOP in Seattle",
            "King County BHRD: publicly funded behavioral health services",
            "Crisis Connections: King County crisis line 866-427-4747",
            "SAMHSA National Helpline: 1-800-662-4357 (free, 24/7)",
            "WA Warm Line: peer support, non-crisis 1-877-500-9276",
            "DESC (Downtown Emergency Service Center): services for chronically unhoused individuals",
          ],
          callout:
            "Mountain View's admissions team can help families understand treatment options and insurance coverage at no cost. Call 24/7 at (253)-252-5564.",
        },
        {
          heading: "Support Groups for Families: Al-Anon and Beyond",
          body: [
            "You do not have to navigate this alone. Support groups for families of people with addiction provide community, shared experience, practical guidance, and — perhaps most importantly — the permission to stop feeling entirely responsible for someone else's recovery.",
            "Al-Anon Family Groups are available throughout King County with meetings in Bellevue, Redmond, Kirkland, Renton, and dozens of Seattle neighborhoods. Nar-Anon follows the same model for families of people with drug addiction (vs. alcohol specifically). SMART Recovery Family & Friends offers a secular, CBT-based alternative. NAMI Family Support Groups focus on mental health with many participants dealing with dual diagnosis.",
          ],
          list: [
            "Al-Anon Seattle: al-anon.org/find-a-meeting — 200+ WA groups",
            "Nar-Anon Northwest: naranonpnw.org",
            "SMART Recovery Family & Friends: smartrecovery.org/family",
            "NAMI Washington Family Support Group: nami.org",
            "Families for Addiction Recovery (FAR): farcanada.org (online)",
          ],
        },
        {
          heading: "How to Talk to Children About a Parent's Addiction",
          body: [
            "Children who grow up in households affected by addiction are at significantly higher risk for developing substance use disorders and mental health conditions themselves. Age-appropriate honest communication, combined with professional support, can dramatically reduce this risk.",
            "Children often feel confused, scared, and — most harmfully — secretly responsible for a parent's drinking or drug use. Correcting this misunderstanding directly (\"This is not your fault, and nothing you do can cause it or fix it\") is one of the most protective things you can do.",
            "Seattle offers several resources specifically for children in affected families, including Alateen (the youth branch of Al-Anon), the Coping Kids program through King County Mental Health, and school-based counseling through OSPI-funded programs.",
          ],
          callout:
            "Alateen is a part of the Al-Anon Family Groups and provides support specifically for teenagers whose family members have alcohol use disorder. Meetings are available in-person and online.",
        },
        {
          heading: "Taking Care of Yourself Through the Process",
          body: [
            "Families of people with addiction frequently sacrifice their own mental and physical health in the pursuit of fixing someone else. Secondary trauma — the emotional impact of witnessing someone you love suffer — is real and requires real attention.",
            "Therapy for yourself (not couples or family therapy — individual therapy for you) is one of the highest-value investments you can make during this period. Cognitive behavioral therapy, EMDR, and attachment-based approaches can address the specific patterns that living with addiction creates in partners, parents, and siblings.",
            "Physical health — sleep, nutrition, movement — is the foundation. Addiction in the family frequently disrupts all three. Treating your own body's needs as non-negotiable is not selfish; it is necessary. You cannot make the right decisions, maintain healthy limits, or be present for your children or your recovering loved one from a state of exhaustion and depletion.",
          ],
          list: [
            "Schedule individual therapy for yourself — not just family or couples sessions",
            "Attend a family support group consistently (Al-Anon, Nar-Anon, NAMI)",
            "Set and honor your own sleep schedule regardless of the crisis at home",
            "Maintain at least one friendship or social connection outside the situation",
            "Consult a financial advisor if addiction has created economic strain",
          ],
        },
      ]}
      relatedGuides={[
        {
          title: "How to Stage an Intervention in Seattle",
          href: "/guide/how-to-stage-an-intervention-in-seattle/",
          excerpt: "A step-by-step guide to organizing a compassionate, effective intervention for a loved one.",
        },
        {
          title: "Understanding Dual Diagnosis: Addiction & Mental Health",
          href: "/guide/understanding-dual-diagnosis-addiction-mental-health/",
          excerpt: "Why most people with addiction also have a co-occurring mental health condition — and what that means for treatment.",
        },
        {
          title: "How to Pay for Drug Rehab in Washington State",
          href: "/guide/how-to-pay-for-drug-rehab-in-washington-state/",
          excerpt: "Insurance, Medicaid, EAPs, and financing options for getting a loved one into treatment.",
        },
      ]}
    />
  );
}
