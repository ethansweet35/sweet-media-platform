import GuideArticlePage from "./GuideArticlePage";

const BASE = "https://gueqxorkktfcwiakepcp.supabase.co/storage/v1/object/public/site-assets/images";

export default function InterventionGuidePage() {
  return (
    <GuideArticlePage
      title="How to Stage an Intervention in Seattle"
      intro="A well-organized intervention can be the moment that changes everything. This guide walks you through evidence-based approaches, what to say, how to prepare, and the professional resources available in Seattle."
      readTime="9 min read"
      topics={["Intervention", "Family", "Seattle", "Action"]}
      heroImage={`${BASE}/mvt_guide_intervention.jpg`}
      heroAlt="A warm living room with chairs arranged in a circle — the setting for a compassionate family intervention"
      keyFacts={[
        { label: "Intervention Success Rate", value: "80–90%" },
        { label: "Best Approach", value: "Compassion-Based" },
        { label: "Professional Interventionists", value: "Available" },
        { label: "Admissions: Available", value: "24/7" },
      ]}
      sections={[
        {
          heading: "What Is a Formal Intervention?",
          body: [
            "An intervention is a structured, planned conversation between a person struggling with addiction and the people who care about them most — family members, close friends, sometimes employers — with the explicit goal of encouraging that person to accept professional treatment.",
            "The popular image of interventions as confrontational ambushes comes largely from reality television and does not reflect best clinical practice. Modern evidence-based interventions are compassionate, rehearsed, and focused on love and concern — not ultimatums and shame.",
          ],
          callout:
            "Research shows that professionally facilitated interventions result in treatment acceptance rates of 80–90%, significantly higher than informal conversations.",
        },
        {
          heading: "The CRAFT Approach vs. The Classic Model",
          body: [
            "Two main evidence-based frameworks exist for family intervention. Understanding their differences helps you choose the right approach for your situation.",
            "The CRAFT (Community Reinforcement and Family Training) model is widely considered the gold standard. CRAFT works with family members over weeks or months, teaching them specific communication strategies, how to reinforce sober behavior, and how to allow natural consequences of substance use — without a confrontational group intervention event. CRAFT shows the highest rates of treatment entry of any family approach.",
            "The classical Johnson Model (popularized as the confrontational group intervention) involves gathering loved ones to deliver prepared statements about how the addiction has affected them, usually culminating in a request to enter treatment that day with arrangements already made. When facilitated by a professional interventionist, this approach can be effective — but requires careful preparation to avoid triggering defensiveness or harm.",
          ],
          list: [
            "CRAFT: gradual, family-training model; highest treatment entry rates",
            "Johnson Model: group intervention event; effective when professionally facilitated",
            "ARISE (Invitational Intervention): graduated approach inviting participation",
            "Systemic Family Therapy approach: works with the whole family system",
          ],
        },
        {
          heading: "How to Prepare for an Intervention: Step by Step",
          body: [
            "Whether you use a professional interventionist or organize a family-led conversation, preparation is what separates a productive intervention from one that backfires. The following steps apply to both models.",
          ],
          list: [
            "Choose participants carefully: close family and friends who are committed and emotionally regulated",
            "Research treatment options and have a specific program ready — ideally with a bed available",
            "Contact Mountain View Treatment to verify admission availability and insurance before the intervention",
            "Prepare written impact statements: specific behaviors, how they affected you, expressions of love — not shame",
            "Anticipate resistance: prepare calm, rehearsed responses to common deflections",
            "Agree on limits: each participant should decide privately what they are willing to do if the person declines",
            "Rehearse the conversation — with a professional interventionist if possible",
            "Choose timing: when the person is sober, not in withdrawal, and not after a recent conflict",
          ],
          callout:
            "Having a treatment intake date arranged before the intervention — and offering to drive the person directly — dramatically increases the rate of same-day admission.",
        },
        {
          heading: "What to Say (and What Not to Say)",
          body: [
            "The words you choose in an intervention matter enormously. Prepared, specific, emotionally honest statements are far more effective than general accusations or angry confrontation.",
            "Use 'I' statements focused on specific events and your own feelings: \"When you didn't come home last Christmas, I felt devastated and scared for you\" is more effective than \"You always ruin every holiday.\" The goal is to create empathic resonance — to help the person you love see the impact of their addiction through your genuine experience.",
            "Avoid words like \"junkie,\" \"drunk,\" \"selfish,\" or any framing that treats addiction as a moral failing. This is counterproductive and clinically known to trigger shame-based defensiveness.",
          ],
          list: [
            "DO: Share specific memories and their emotional impact",
            "DO: Express love and hope explicitly",
            "DO: Present treatment as an act of self-care and a gift to themselves",
            "DON'T: Threaten consequences you are not prepared to follow through on",
            "DON'T: Use shaming or moral language about the addiction",
            "DON'T: Bring up past hurts that aren't directly relevant",
            "DON'T: Allow the conversation to become an argument",
          ],
        },
        {
          heading: "When Your Loved One Says No",
          body: [
            "Not every intervention results in immediate acceptance. This is painful, but it does not mean the intervention failed. Sometimes the seed planted in an intervention grows over days or weeks into a decision to seek help.",
            "If your loved one declines, follow through calmly and without anger on any limits you stated. Do not make threats you do not intend to keep, and do not return to business as usual without any acknowledgment of the conversation.",
            "CRAFT-trained family members, in particular, continue working after a \"no\" — using the skills they've learned to reduce enabling, reinforce sober moments, and keep the door to treatment open. The average person attempts to get a loved one into treatment multiple times before success.",
          ],
          callout:
            "Mountain View Treatment's admissions team will remain available after a declined intervention. We can advise on next steps and keep a bed reserved while your loved one considers the decision.",
        },
        {
          heading: "Professional Intervention Services in Seattle",
          body: [
            "Professional interventionists are trained facilitators — often certified by the Association of Intervention Specialists (AIS) or the ARISE Network — who guide families through the preparation and facilitation of the intervention process. They significantly improve outcomes and reduce the risk of the intervention going off-course.",
            "When selecting an interventionist in Seattle, look for certification from AIS or ARISE, experience with dual diagnosis (if applicable), familiarity with the treatment options you are considering, and a fee structure that is clear and upfront.",
            "Mountain View Treatment can provide referrals to trusted, certified interventionists in the Seattle area. Our admissions team is also available before, during, and after the intervention to answer questions about our program and confirm readiness for admission.",
          ],
          list: [
            "Association of Intervention Specialists (AIS) directory: associationofinterventionspecialists.org",
            "ARISE Network: ariseintervention.com — graduated invitational approach",
            "Certified Intervention Professional (CIP) credential — gold standard",
            "Ask for a free initial consultation before committing",
            "Confirm experience with your loved one's specific substance and history",
          ],
        },
      ]}
      relatedGuides={[
        {
          title: "Resources for Families of Addicts in King County",
          href: "/guide/resources-for-families-of-addicts-in-king-county/",
          excerpt: "Support groups, treatment resources, and family guidance throughout King County and Seattle.",
        },
        {
          title: "Understanding Dual Diagnosis: Addiction & Mental Health",
          href: "/guide/understanding-dual-diagnosis-addiction-mental-health/",
          excerpt: "Why most people with addiction have a co-occurring mental health condition — and what that means for care.",
        },
        {
          title: "The Complete Guide to Drug and Alcohol Detox",
          href: "/guide/the-complete-guide-to-drug-and-alcohol-detox/",
          excerpt: "What to expect from medically supervised detox — the first step after a loved one accepts help.",
        },
      ]}
    />
  );
}
