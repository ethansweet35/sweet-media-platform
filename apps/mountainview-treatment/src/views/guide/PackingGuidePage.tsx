import GuideArticlePage from "./GuideArticlePage";

const BASE = "https://gueqxorkktfcwiakepcp.supabase.co/storage/v1/object/public/site-assets/images";

export default function PackingGuidePage() {
  return (
    <GuideArticlePage
      title="What to Expect and Pack for Treatment"
      intro="Starting treatment is a brave decision. Knowing exactly what to bring — and what to leave at home — removes unnecessary stress so you can focus entirely on healing from day one."
      readTime="9 min read"
      topics={["Admissions", "Preparation", "Practical"]}
      heroImage={`${BASE}/mvt_guide_packing.jpg`}
      heroAlt="Packed bag on a bed with Pacific Northwest forest view, preparing for treatment"
      keyFacts={[
        { label: "Average Stay", value: "30–90 days" },
        { label: "Admission", value: "24/7 Available" },
        { label: "Items Allowed", value: "Most Personal" },
        { label: "Phones", value: "Clinical Policy" },
      ]}
      sections={[
        {
          heading: "What to Expect on Admission Day",
          body: [
            "Admission day can feel overwhelming, but our intake process is designed to be calm, welcoming, and efficient. When you arrive at Mountain View Treatment, you'll be greeted by our admissions concierge — not a clinical form or a waiting room.",
            "Your intake assessment covers your substance use history, physical health, mental health history, any current medications, and any immediate comfort needs. This usually takes 1–2 hours. After that, you'll meet your primary counselor, tour your private accommodations, and receive your daily schedule.",
            "You do not need to have everything figured out on day one. Our team handles the logistics. Your only job is to arrive.",
          ],
          callout:
            "Bring a government-issued photo ID and your insurance card. If you have a prescription, bring the bottle — our medical team will review and continue appropriate medications.",
        },
        {
          heading: "A Typical Day in Treatment",
          body: [
            "Structure is therapeutic. Our schedule is intentionally designed to keep you engaged, supported, and progressing through treatment without idle time that can fuel cravings or anxiety.",
            "Mornings typically begin with a brief mindfulness or movement practice, followed by individual therapy or group sessions. Afternoons include evidence-based group programming — cognitive behavioral therapy (CBT), dialectical behavior therapy (DBT), psychoeducation, and peer process groups. Evenings are more open, with optional activities, 12-step meetings, and personal time.",
            "Weekends include recreational activities that build connection and reinforce the concept of sober enjoyment — hiking in the Cascades, cooking groups, or creative arts.",
          ],
          list: [
            "Morning: mindfulness / light movement / healthy breakfast",
            "Mid-morning: individual therapy or medical check-in",
            "Late morning: group therapy session (CBT / DBT / trauma-focused)",
            "Afternoon: psychoeducation, life skills, or specialty group",
            "Evening: optional meetings, recreation, personal time",
            "Nightly: brief reflection group, wind-down routine",
          ],
        },
        {
          heading: "Your Packing List for Residential Treatment",
          body: [
            "Pack for comfort, not fashion. You'll be in a safe, private environment where casual clothing is the norm. Focus on practical items that support comfort, hygiene, and emotional grounding.",
          ],
          list: [
            "7–14 days of comfortable clothing (sweaters, joggers, t-shirts, socks, underwear)",
            "Pajamas and a robe",
            "Casual closed-toe shoes and shower sandals or flip-flops",
            "Toiletries in sealed, original containers (no alcohol-based products)",
            "Non-electric razor (electric razors are fine)",
            "A journal or notebook and pens",
            "Books or light reading material",
            "Family photos or a meaningful personal item",
            "Prescription medications in original pharmacy bottles",
            "Insurance card and government-issued photo ID",
          ],
        },
        {
          heading: "What NOT to Bring",
          body: [
            "Certain items are not permitted in treatment settings — not to be punitive, but because they can disrupt the clinical environment, pose safety concerns, or undermine the recovery process.",
            "When in doubt, ask our admissions team. We'd rather you call ahead than arrive with something that needs to be stored.",
          ],
          list: [
            "Any alcohol, illicit substances, or non-prescribed medications",
            "Mouthwash or products containing alcohol",
            "Weapons of any kind",
            "Excessively expensive jewelry or electronics",
            "Pornographic material",
            "Items from another patient's list",
            "Large sums of cash (a small amount for personal items is fine)",
          ],
          callout:
            "Laptops, tablets, and cell phones are managed according to our technology policy — ask your admissions specialist for the current guidelines during your intake call.",
        },
        {
          heading: "Technology and Phone Policies",
          body: [
            "We understand that being disconnected from your phone can feel anxiety-inducing, especially if you have responsibilities at work or at home. Our technology policy is designed to protect the therapeutic process while maintaining appropriate contact with family.",
            "During the first phase of treatment, phone use is typically restricted to scheduled check-in times with pre-approved family members. This is not punishment — it is clinically informed. The early weeks of treatment require full presence; constant digital connection undermines the focus needed for real progress.",
            "As treatment progresses and clinical readiness increases, technology privileges are expanded. By the time clients move into outpatient programming, most are managing their own digital lives again.",
          ],
          callout:
            "Family members can always contact our clinical team directly if there is a genuine emergency. You will not be completely unreachable.",
        },
        {
          heading: "How to Prepare Your Family and Employer",
          body: [
            "Before you enter treatment, a few conversations can significantly reduce logistical stress while you're focused on recovery. You don't need to share your specific diagnosis — you have a legal right to medical privacy.",
            "With your employer: you may be eligible for FMLA (federal) or Washington State's PFML (paid family and medical leave) to protect your job while you are in treatment. Our guide on PFML and FMLA covers this in detail. An HR or benefits specialist can help you file without disclosing your specific condition.",
            "With your family: share as much as you're comfortable with. Let them know you are getting help, when they can expect to hear from you, and who to contact at our facility if they have questions. Family therapy sessions are available and encouraged — the more your family understands your treatment, the stronger your support system becomes.",
          ],
          list: [
            "File FMLA/PFML paperwork before admission if possible",
            "Set an out-of-office reply and delegate key responsibilities",
            "Designate an emergency contact with access to your provider",
            "Let 1–2 trusted family members know where you'll be",
            "Pre-pay any recurring bills due during your stay",
          ],
        },
      ]}
      relatedGuides={[
        {
          title: "The Complete Guide to Drug and Alcohol Detox",
          href: "/guide/the-complete-guide-to-drug-and-alcohol-detox/",
          excerpt: "What to expect from medical detox, how long it takes, and why supervised withdrawal is essential.",
        },
        {
          title: "Taking Leave for Rehab: WA PFML & FMLA Guide",
          href: "/guide/taking-leave-for-rehab-washington-state-pfml-fmla-guide/",
          excerpt: "Know your legal rights — federal FMLA and Washington PFML protect your job while you seek treatment.",
        },
        {
          title: "Seattle Sober Living and Aftercare Guide",
          href: "/guide/seattle-sober-living-and-aftercare-guide/",
          excerpt: "Planning life after residential treatment — sober living, step-down care, and Seattle recovery resources.",
        },
      ]}
    />
  );
}
