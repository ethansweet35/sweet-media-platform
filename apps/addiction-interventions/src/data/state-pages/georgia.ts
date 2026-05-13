import type { StatePageConfig } from "@/components/templates/StatePageTemplate";

const BASE =
  "https://bxtwcdgjzzjxjvqdiuvn.supabase.co/storage/v1/object/public/site-assets/images";

export const georgiaStatePage: StatePageConfig = {
  stateName: "Georgia",
  fullBleedStateLayout: true,
  heroImage: `${BASE}/ga_hero01.jpg`,
  heroImageAlt: "Family meeting with a certified interventionist in Georgia",
  // H1 renders as: "Interventions across Georgia — for alcohol and drug intervention."
  // Word count: 9 words ✅ (budget: 12)
  heroHeadlineSuffix: "for alcohol and drug intervention",
  // Word count: 31 words ✅ (budget: 35)
  heroBody:
    "On-site alcohol and drug addiction intervention and mental health services across Georgia. Our certified professional interventionists vet inpatient rehab, outpatient, and residential treatment beds statewide — on the ground within 24–48 hours.",
  anchorId: "contact-ga",
  trustBullets: [
    { icon: "ri-time-line", text: "Available 24/7 ET" },
    { icon: "ri-shield-check-line", text: "100% Confidential" },
    { icon: "ri-award-line", text: "Credentialed Interventionists" },
    { icon: "ri-map-pin-2-line", text: "All 159 GA counties" },
  ],
  stats: [
    {
      value: "High need",
      label: "Substance use & behavioral health burden across Georgia counties",
      sublabel: "SAMHSA statewide estimates / GA DBHDD",
    },
    {
      value: "24–48 hrs",
      label: "Typical on-site mobilisation for Georgia intervention",
      sublabel: "Faster for acute alcohol or drug crises",
    },
    {
      value: "1,500+",
      label: "Families helped nationwide",
      sublabel: "Including families across Georgia",
    },
    {
      value: "MHPAEA",
      label: "Federal insurance parity protections",
      sublabel: "Commercial plans subject to parity rules",
    },
  ],
  statsEyebrow: "The Georgia Reality",
  // H2 word count: 7 words ✅ (budget: 8)
  statsHeadline: "Georgia addiction crisis demands rapid expert response.",
  familiesHelped: "1,500+",
  familiesHelpedLocalStat: "300+",
  familiesHelpedLocalLabel: "Georgia families helped",
  interventionImage: `${BASE}/ga_intervention01.jpg`,
  interventionImageAlt: "Family meeting with a certified interventionist in Georgia",
  citiesRegionImage: `${BASE}/ga_cities01.jpg`,
  citiesRegionImageAlt: "Communities across Georgia",
  recoveryImage: `${BASE}/ga_recovery01.jpg`,
  recoveryImageAlt: "Hope and long-term recovery — Georgia",
  // Word count: 54 words ✅ (budget: 80)
  whyUsLeadParagraph:
    "Georgia's drug and alcohol addiction landscape spans Atlanta's urban substance use disorder caseload, Savannah's coastal recovery communities, and rural counties where addiction treatment centers are scarce. Our certified professional interventionists map Georgia's inpatient rehab, outpatient programs, and sober living options — matching insurance coverage before intervention day so acceptance leads directly to a confirmed bed.",
  differentiators: [
    {
      icon: "ri-map-pin-2-line",
      // title word count: 4 words ✅ (budget: 6)
      title: "We travel throughout Georgia",
      // body word count: 29 words ✅ (budget: 35)
      body: "Regional airports and rural corridors cover all 159 Georgia counties. We arrange transport and on-site logistics for alcohol and drug addiction intervention — families focus on the conversation, we manage the rest.",
    },
    {
      icon: "ri-shield-check-line",
      // title word count: 5 words ✅ (budget: 6)
      title: "Georgia addiction treatment, clinically vetted",
      // body word count: 31 words ✅ (budget: 35)
      body: "Inpatient detox, residential treatment, outpatient and IOP programs, dual diagnosis care, and sober living — we screen Georgia addiction treatment centers for clinical quality and insurance compatibility before intervention day.",
    },
    {
      icon: "ri-bank-line",
      // title word count: 5 words ✅ (budget: 6)
      title: "We decode Georgia insurance coverage",
      // body word count: 31 words ✅ (budget: 35)
      body: "Most Georgia commercial plans cover inpatient and outpatient addiction treatment under federal MHPAEA parity rules. We verify benefits, submit pre-authorisations, and clarify out-of-pocket costs before your loved one says yes.",
    },
    {
      icon: "ri-time-line",
      // title word count: 5 words ✅ (budget: 6)
      title: "Georgia behavioral health crisis response",
      // body word count: 28 words ✅ (budget: 35)
      body: "24/7 ET intake — coordinated alcohol and drug crisis intervention, detox admissions, relapse prevention planning, and Georgia-wide transport when same-day mobilisation is needed.",
    },
  ],
  regions: [
    {
      name: "Metro Atlanta",
      cities: "Atlanta · Sandy Springs · Alpharetta · Decatur · Buckhead",
      href: "/contact",
      icon: "ri-building-2-line",
    },
    {
      name: "Augusta & CSRA",
      cities: "Augusta · Evans · Martinez · Aiken corridor",
      href: "/contact",
      icon: "ri-hospital-line",
    },
    {
      name: "Savannah & Coastal",
      cities: "Savannah · Pooler · Brunswick · Statesboro",
      href: "/contact",
      icon: "ri-anchor-line",
    },
    {
      name: "Columbus & West GA",
      cities: "Columbus · LaGrange · Newnan · Carrollton",
      href: "/contact",
      icon: "ri-map-pin-line",
    },
    {
      name: "Macon & Middle GA",
      cities: "Macon · Warner Robins · Dublin · Milledgeville",
      href: "/contact",
      icon: "ri-map-2-line",
    },
    {
      name: "North Georgia",
      cities: "Gainesville · Dalton · Blue Ridge · Clayton",
      href: "/contact",
      icon: "ri-landscape-line",
    },
  ],
  // Word count: 47 words ✅ (budget: 80)
  regionsSupportingText:
    "Georgia's behavioral health infrastructure concentrates in metro Atlanta, Augusta, Savannah, and Columbus — but our interventionists reach every rural county. Whether your loved one needs inpatient drug rehab, outpatient addiction treatment, or residential treatment, we map Georgia addiction treatment centers and travel to your family.",
  processSteps: [
    {
      number: "01",
      // title word count: 3 words ✅ (budget: 6)
      title: "First confidential call",
      // body word count: 31 words ✅ (budget: 40)
      body: "Tell us what is happening — drinking patterns, drug use, mental health crises. We listen first, then explain whether a Georgia alcohol and drug addiction intervention is the right next step.",
    },
    {
      number: "02",
      // title word count: 2 words ✅ (budget: 6)
      title: "Family preparation",
      // body word count: 34 words ✅ (budget: 40)
      body: "We build a private Georgia intervention plan: your loved one's access to alcohol and drugs, their job and relationships, and the inpatient or outpatient addiction treatment programs that fit your region and insurance.",
    },
    {
      number: "03",
      // title word count: 3 words ✅ (budget: 6)
      title: "Interventionist arrives on-site",
      // body word count: 29 words ✅ (budget: 40)
      body: "Your interventionist flies into Georgia the day before, meets the family privately, conducts a full rehearsal, and stays nearby to answer late-night calls before the morning intervention.",
    },
    {
      number: "04",
      // title word count: 3 words ✅ (budget: 6)
      title: "The intervention conversation",
      // body word count: 35 words ✅ (budget: 40)
      body: "We lead the addiction conversation in your Georgia home, business, or a neutral location. Most loved ones accept treatment that day. Those who do not receive a structured second-attempt plan within the week.",
    },
    {
      number: "05",
      // title word count: 4 words ✅ (budget: 6)
      title: "Direct transport to rehab",
      // body word count: 32 words ✅ (budget: 40)
      body: "We escort your loved one — by car within Georgia or by air to an out-of-state drug rehab program — and remain on the line with the family during detox admission.",
    },
    {
      number: "06",
      // title word count: 4 words ✅ (budget: 6)
      title: "Long-term recovery coaching",
      // body word count: 36 words ✅ (budget: 40)
      body: "We do not disappear after admission. We coach the Georgia family through twelve months of addiction recovery — rehab visits, relapse prevention, the return home, and the behavioral health boundaries that sustain long-term recovery.",
    },
  ],
  // Word count: 38 words ✅ (budget: 80)
  processIntro:
    "You do not have to figure out Georgia addiction treatment alone. We have guided 1,500+ families through structured alcohol and drug interventions — coordinating inpatient rehab admissions, navigating insurance, and supporting addiction recovery for twelve full months.",
  urgencyEyebrow: "Don't wait for the next Georgia crisis",
  urgencyHeadlineBefore: "Most Georgia families wait ",
  urgencyHeadlineItalic: "too long",
  urgencyHeadlineAfter: " to act.",
  recoveryEyebrow: "Georgia addiction recovery starts here",
  // H2 word count: 7 words ✅ (budget: 8)
  recoveryHeadline: "Alcohol addiction recovery is real in Georgia.",
  // Word count: 55 words ✅ (budget: 80)
  recoveryBody:
    "When intervention is structured and treatment is arranged — detox, inpatient rehab, or outpatient — long-term addiction recovery in Georgia is measurable and real. We have watched Georgia families rebuild after alcohol addiction, drug addiction, and dual diagnosis crises. Substance abuse and substance disorder do not have to define your family's future. Long-term recovery starts with one call.",
  faqs: [
    {
      // Q word count: 8 words ✅ (budget: 15)
      question: "Do you travel to rural parts of Georgia?",
      // A word count: 63 words ✅ (budget: 80)
      answer:
        "Yes. We reach families across all 159 Georgia counties — from metro Atlanta and Savannah to small towns, rural communities, and underserved counties with limited behavioral health resources. Our certified professional interventionists arrange transport logistics in advance so families focus on the addiction intervention conversation. No Georgia county is beyond our reach. Call us for any community not listed on this page.",
    },
    {
      // Q word count: 7 words ✅ (budget: 15)
      question: "How fast can you mobilise in Georgia?",
      // A word count: 67 words ✅ (budget: 80)
      answer:
        "Most families see a professional interventionist on the ground within 24–48 hours. For acute crises — if symptoms of alcohol poisoning appear (unresponsiveness, vomiting while unconscious, slowed breathing of ten or fewer breaths per minute, or bluish skin) call 911 immediately. Once the immediate emergency is stabilised, call us. Same-day alcohol and drug intervention mobilisation is available across Georgia when waiting is not an option.",
    },
    {
      // Q word count: 9 words ✅ (budget: 15)
      question: "Will insurance cover addiction treatment after a Georgia intervention?",
      // A word count: 60 words ✅ (budget: 80)
      answer:
        "Federal MHPAEA parity rules require most commercial plans to cover inpatient and outpatient addiction treatment at parity with physical health care. Georgia Blue Cross Blue Shield, Aetna, Cigna, and UnitedHealthcare plans are all subject to these protections. We verify benefits, submit pre-authorisation requests, and help families navigate appeals for alcohol and drug rehab before intervention day.",
    },
    {
      // Q word count: 10 words ✅ (budget: 15)
      question: "Should addiction treatment stay in Georgia or go out of state?",
      // A word count: 63 words ✅ (budget: 80)
      answer:
        "Georgia has qualified addiction treatment centers in Atlanta, Savannah, Augusta, and suburban markets. Staying local works when family support is a recovery asset and home relationships are healthy. Out-of-state inpatient or residential treatment is often more effective when local social connections are part of the enabling pattern. We give you an honest clinical recommendation — not a booking preference — before intervention day.",
    },
    {
      // Q word count: 9 words ✅ (budget: 15)
      question: "Can you coordinate Georgia court or civil commitment processes?",
      // A word count: 65 words ✅ (budget: 80)
      answer:
        "Yes. Georgia's involuntary commitment statute allows families to petition for emergency psychiatric evaluation when a person poses an imminent danger to themselves or others. This legal process differs from a voluntary intervention — it is a court-ordered behavioral health pathway, not a conversation. We work alongside Georgia attorneys who practise behavioral health law, but we always pursue voluntary engagement through structured addiction intervention first.",
    },
    {
      // Q word count: 10 words ✅ (budget: 15)
      question: "What about privacy for executives or public figures in Georgia?",
      // A word count: 72 words ✅ (budget: 80)
      answer:
        "We plan discreet logistics for executives, elected officials, physicians, and Georgia nurses across the state. Intervention sites include private hotel suites or secured business offices. We never share family information with employers, licensing boards, or media without written consent. Georgia nurses with substance use issues have specific Board of Nursing obligations — active substance use should be reported, aftercare groups must meet weekly with random drug screenings. We help families navigate these obligations carefully.",
    },
    {
      // Q word count: 8 words ✅ (budget: 15)
      question: "Do you work with Medicaid plans in Georgia?",
      // A word count: 60 words ✅ (budget: 80)
      answer:
        "Yes. Georgia Medicaid covers substance use disorder treatment through the state's behavioral health program. When Medicaid or managed care plans cover alcohol and drug addiction treatment, we help families verify eligibility, locate in-network detox and outpatient providers, and navigate prior-authorisation requirements. Self-pay and sliding-scale options at Georgia addiction treatment centers are also available for families without insurance coverage.",
    },
    {
      // Q word count: 8 words ✅ (budget: 15)
      question: "How much does a Georgia intervention cost?",
      // A word count: 60 words ✅ (budget: 80)
      answer:
        "Fees are quoted transparently on the first call — no hidden markups. The cost of a structured Georgia addiction intervention is almost always less than one continued month of active drug or alcohol addiction, one DUI legal defense, or one emergency room visit from substance abuse complications. We also help maximise insurance coverage for the inpatient or outpatient rehab that follows.",
    },
    {
      // Q word count: 8 words ✅ (budget: 15)
      question: "What credentials should a Georgia professional interventionist have?",
      // A word count: 65 words ✅ (budget: 80)
      answer:
        "Look for a Certified Intervention Professional (CIP) credential from the Association of Intervention Specialists. In Georgia, experienced interventionists also hold clinical backgrounds — licensed counselors, social workers, or addiction specialists trained in motivational interviewing and family therapy. Ask about their professional liability coverage, their specific Georgia treatment referral network, and how many alcohol and drug addiction interventions they have successfully conducted.",
    },
    {
      // Q word count: 10 words ✅ (budget: 15)
      question: "How do you stage an intervention for multiple substance use?",
      // A word count: 65 words ✅ (budget: 80)
      answer:
        "Polydrug use — mixing alcohol with prescription drugs, cocaine, or opioids — requires additional pre-intervention medical planning. We coordinate with medical detox programs that safely manage withdrawal from multiple substances simultaneously, since alcohol and benzodiazepine withdrawal can be medically dangerous without clinical supervision. Our individualized treatment plan also addresses the behavioral health dimensions of substance use disorder involving multiple drugs or prescription drug dependence.",
    },
    {
      // Q word count: 10 words ✅ (budget: 15)
      question: "What is the difference between ARISE and Johnson Model intervention?",
      // A word count: 68 words ✅ (budget: 80)
      answer:
        "The Johnson Model uses a structured family meeting where written impact statements are delivered to the person with alcohol or drug addiction — often a surprise-style confrontation. ARISE (A Relational Intervention Sequence for Engagement) is an invitational approach where the loved one participates from the first meeting. Our Georgia team uses both methods, selecting the approach based on family dynamics and the individual's history with addiction treatment.",
    },
    {
      // Q word count: 9 words ✅ (budget: 15)
      question: "What happens if a Georgia intervention does not succeed?",
      // A word count: 70 words ✅ (budget: 80)
      answer:
        "When someone declines addiction treatment during an intervention, we debrief the Georgia family within 24 hours, establish healthy detachment boundaries, and schedule a structured follow-up attempt within days or weeks. We connect families with Al-Anon meetings, 12-step program resources, and family therapy referrals so they build their own long-term recovery support network while the engagement process continues. Most loved ones enter treatment within weeks of an initial refusal.",
    },
    {
      // Q word count: 9 words ✅ (budget: 15)
      question: "What Georgia substance abuse prevention resources exist for families?",
      // A word count: 78 words ✅ (budget: 80)
      answer:
        "Georgia's DBHDD funds community behavioral health centers statewide. The Georgia Crisis and Access Line (GCAL) provides 24/7 substance abuse crisis support. The Fontaine Center — part of UGA's University Health Center — offers BASICS counseling for students concerned about personal substance use and hosts a weekly 'Got Recovery' meeting in the Tate Center for substance use prevention and recovery connection. The Collegiate Recovery Program supports students in long-term recovery from substance use disorders. Reach the Fontaine Center Director at 706-542-8690.",
    },
    {
      // Q word count: 9 words ✅ (budget: 15)
      question: "Are Georgia interventions effective for alcohol and drug rehab?",
      // A word count: 68 words ✅ (budget: 80)
      answer:
        "Research supports structured family interventions as a meaningful pathway into addiction treatment. Studies on motivational interviewing and family-based approaches show that well-prepared interventions significantly increase the likelihood that someone accepts alcohol and drug rehab. Our Georgia cases show a high rate of same-day treatment acceptance. Even when a first attempt is unsuccessful, the structured process typically leads to inpatient or outpatient rehab within weeks of the initial conversation.",
    },
    {
      // Q word count: 10 words ✅ (budget: 15)
      question: "Can you help with prescription drug addiction intervention in Georgia?",
      // A word count: 70 words ✅ (budget: 80)
      answer:
        "Yes. Prescription drug misuse — opioids, benzodiazepines, stimulants — is a significant substance abuse issue across Georgia. Since July 2018, all Georgia prescribers with a DEA number are required to check the Georgia Prescription Drug Monitoring Program before prescribing opiates, cocaine derivatives, or benzodiazepines. When prescription drug addiction is involved, we coordinate with medical detox programs that manage medically supervised withdrawal safely before the transition to inpatient rehab or outpatient treatment.",
    },
  ],
  faqTitle: "Georgia intervention questions, answered.",
  bottomCtaTitle: "Ready to act for your family in Georgia?",

  // Extra section: Georgia treatment pathways rendered between Conditions and Recovery
  extraCardsSection: {
    // eyebrow word count: 4 words ✅ (budget: 8)
    eyebrow: "Georgia Addiction Treatment Centers",
    // headline word count: 7 words ✅ (budget: 8)
    headline: "Georgia addiction and mental health treatment",
    italicWord: "mental health",
    // body word count: 51 words ✅ (budget: 80)
    body: "Georgia's addiction treatment centers range from Atlanta hospital-based detox to coastal residential programs in Savannah and community outpatient centers statewide. Our intervention team matches your loved one to the right level of care before the conversation begins — so acceptance leads directly to a confirmed bed, not a waiting list.",
    cards: [
      {
        icon: "ri-first-aid-kit-line",
        // title word count: 3 words ✅ (budget: 6)
        title: "Detox & withdrawal",
        // body word count: 30 words ✅ (budget: 35)
        body: "Medically supervised detox from alcohol and drugs. Georgia hospital-based and residential detox programs manage physical dependence safely before inpatient rehab or outpatient treatment begins. Medically necessary for alcohol addiction withdrawal.",
      },
      {
        icon: "ri-home-heart-line",
        // title word count: 4 words ✅ (budget: 6)
        title: "Inpatient & residential rehab",
        // body word count: 32 words ✅ (budget: 35)
        body: "24-hour residential treatment in a structured Georgia addiction treatment center. Inpatient rehab removes triggers while addressing substance use disorder through individual therapy, group counseling, and dual diagnosis support.",
      },
      {
        icon: "ri-calendar-check-line",
        // title word count: 5 words ✅ (budget: 6)
        title: "Outpatient, IOP & sober living",
        // body word count: 30 words ✅ (budget: 35)
        body: "Intensive outpatient programs allow Georgia patients to maintain work and sober living routines while receiving addiction treatment — typically 9–15 weekly hours of structured behavioral health programming.",
      },
      {
        icon: "ri-mental-health-line",
        // title word count: 5 words ✅ (budget: 6)
        title: "Dual diagnosis & mental health treatment",
        // body word count: 31 words ✅ (budget: 35)
        body: "Substance use disorder often co-occurs with anxiety, depression, or trauma. Georgia dual diagnosis programs treat addiction and mental health simultaneously, including medication-assisted treatment and holistic treatment approaches.",
      },
    ],
  },
};
