import type { StatePageConfig } from "@/components/templates/StatePageTemplate";

const BASE =
  "https://bxtwcdgjzzjxjvqdiuvn.supabase.co/storage/v1/object/public/site-assets/images";

// SLOT INVENTORY (before edits — built-in.ts colorado entry):
// heroHeadlineSuffix:   "from Denver to Durango"                              4 words
// heroBody:             "On-site addiction and … 24–48 hours of your call."  37 words
// statsHeadline:        "Colorado's outdoor culture … keep climbing."         18 words
// whyUsLeadParagraph:   (default template — not set)                          ~25 words equiv
// differentiator titles (×4): avg 5 words                                       20 words
// differentiator bodies (×4): avg 28 words                                      112 words
// regionsSupportingText: (default template)                                    ~30 words
// processIntro:         (default template)                                      ~22 words
// recoveryEyebrow/headline/body: 4 + 10 + 40 words
// faqs (×8 Q+A): avg 12 + 55 words                                            ~536 words

export const coloradoStatePage: StatePageConfig = {
  stateName: "Colorado",
  heroImage: `${BASE}/co_hero01.jpg`,
  heroImageAlt: "Colorado Rocky Mountain peaks at sunrise with Denver skyline visible in the valley",
  // H1: "Interventions across Colorado — statewide addiction intervention." = 8 words ✅
  heroHeadlineSuffix: "statewide addiction intervention",
  // 20 words ✅ (budget: 35)
  heroBody:
    "Colorado intervention services on-site statewide. Certified professional interventionists help families start addiction intervention and mental health recovery within 24–48 hours.",
  anchorId: "contact-co",
  heroSecondaryCtaLabel: "Talk to a Colorado specialist",
  trustBullets: [
    { icon: "ri-time-line", text: "Available 24/7 MT" },
    { icon: "ri-shield-check-line", text: "100% Confidential" },
    { icon: "ri-award-line", text: "Joint Commission Accredited" },
    { icon: "ri-map-pin-2-line", text: "All 64 CO counties" },
  ],
  stats: [
    { value: "1,978", label: "Coloradans lost to overdose in 2023", sublabel: "CDPHE Vital Statistics" },
    { value: "Since 2020", label: "Rising meth, fentanyl, and mental health cases", sublabel: "Colorado BH data" },
    { value: "1 in 5", label: "Coloradans report behavioral health concerns", sublabel: "Colorado BH" },
    { value: "24–48 hrs", label: "On-site mobilisation statewide", sublabel: "Same-day crisis response" },
  ],
  statsEyebrow: "The Colorado Reality",
  // H2: 7 words ✅ (budget: 8)
  statsHeadline: "Mental health and substance use keep climbing statewide.",
  familiesHelped: "1,500+",
  // 56 words ✅ (budget: 80)
  whyUsLeadParagraph:
    "Family First provides private colorado intervention services built for Colorado family dynamics — not a generic national playbook. Our professional interventionists coordinate addiction intervention, mental health crisis planning, and addiction treatment admissions from Denver to Durango. We help families navigate Health First Colorado and commercial insurance while connecting intervention family coaching through our S.A.F.E.® program statewide.",
  differentiators: [
    {
      icon: "ri-user-voice-line",
      title: "Professional interventionist response",
      body: "Certified professional interventionist teams deploy across interventions Colorado wide — metro Denver, mountain resorts, and Eastern Plains. Colorado intervention mobilisation typically lands within 24–48 hours; acute crises receive same-day team help routing.",
    },
    {
      icon: "ri-mental-health-line",
      title: "Mental health & substance abuse",
      body: "We address substance abuse, substance use disorder, and co-occurring mental health concerns — including drug-induced psychosis linked to high-potency cannabis. Our intervention services connect families to vetted behavioral health and addiction treatment programs.",
    },
    {
      icon: "ri-parent-line",
      title: "Intervention family coaching",
      body: "Our S.A.F.E.® Self Awareness Family Education intervention program includes intervention family recovery coaching after admission. Coaching helps families repair family dynamics, set boundaries, and sustain recovery when a loved one returns home.",
    },
    {
      icon: "ri-heart-pulse-line",
      title: "Behavioral health pathways",
      body: "From Health First Colorado to private carriers, we map behavioral health and addiction treatment beds before intervention day. We help families understand how Colorado intervention differs for adolescents versus adults.",
    },
  ],
  regions: [
    { name: "Denver / Boulder", cities: "Denver · Boulder · Aurora · Lakewood · Westminster · Arvada · Broomfield", href: "/contact", icon: "ri-building-2-line" },
    { name: "Colorado Springs", cities: "Colorado Springs · Monument · Pueblo · Fountain · Woodland Park · Canon City", href: "/contact", icon: "ri-shield-line" },
    { name: "Fort Collins & Northern CO", cities: "Fort Collins · Loveland · Greeley · Longmont · Windsor · Evans", href: "/contact", icon: "ri-flag-line" },
    { name: "Aspen / Vail Corridor", cities: "Aspen · Vail · Breckenridge · Glenwood Springs · Steamboat · Telluride", href: "/contact", icon: "ri-snow-line" },
    { name: "Pueblo & Southern CO", cities: "Pueblo · Trinidad · La Junta · Walsenburg · Alamosa · Monte Vista", href: "/contact", icon: "ri-landscape-line" },
    { name: "Western Slope & Grand Junction", cities: "Grand Junction · Montrose · Delta · Durango · Cortez · Rifle", href: "/contact", icon: "ri-mountain-line" },
  ],
  // 48 words ✅ (budget: 80)
  regionsSupportingText:
    "Colorado intervention services reach every county — urban, mountain, and rural. Whether your loved one needs Denver metro addiction treatment or Western Slope support services, our intervention services team travels statewide. Rural families receive the same professional interventionist quality as Front Range communities.",
  processSteps: [
    {
      number: "01",
      title: "Confidential intake call",
      body: "Share substance use, mental health, and recent crises. We explain whether a Colorado intervention is appropriate and how intervention services coordinate with local behavioral health resources.",
    },
    {
      number: "02",
      title: "Family preparation",
      body: "We build a private plan matching your loved one's Colorado life — work, friend groups, substance access, and addiction treatment options. Early intervention planning reduces crisis escalation when health concerns intensify.",
    },
    {
      number: "03",
      title: "Interventionist on-site",
      body: "Your professional interventionist arrives the day before, rehearses with the intervention family, and stays available overnight. Rural and resort logistics are confirmed in advance.",
    },
    {
      number: "04",
      title: "Intervention conversation",
      body: "We lead the addiction intervention at home, work, or a neutral site. Most loved ones accept addiction treatment that day; others receive a structured follow-up within the week.",
    },
    {
      number: "05",
      title: "Transport to treatment",
      body: "We escort your loved one to Colorado or out-of-state programs and stay on the line during admission. Court-ordered cases may align with community corrections timelines when appropriate.",
    },
    {
      number: "06",
      title: "Recovery coaching year",
      body: "Intervention family recovery coaching continues twelve months — visit weekends, relapse risk, and boundaries. Our coaching team help line and community partners support long-term recovery.",
    },
  ],
  // 38 words ✅ (budget: 80)
  processIntro:
    "You do not have to navigate Colorado intervention alone. We have guided 1,500+ families through structured intervention services — coordinating addiction intervention, mental health admissions, and intervention family coaching across the united states model we bring to Colorado.",
  urgencyEyebrow: "Don't wait for the next Colorado crisis",
  urgencyHeadlineBefore: "Most Colorado families wait ",
  urgencyHeadlineItalic: "too long",
  urgencyHeadlineAfter: " to act.",
  recoveryEyebrow: "Recovery is real in Colorado",
  // H2: 7 words ✅ (budget: 8)
  recoveryHeadline: "Colorado families rebuild through lasting recovery.",
  // 52 words ✅ (budget: 80)
  recoveryBody:
    "Structured addiction intervention and mental health treatment make recovery measurable. We have watched Boulder families heal after cannabis denial, Denver executives rebuild careers, and Aspen workers return to sport sober. Health addiction and intervention addiction patterns can change — recovery starts with one call to our team.",
  faqs: [
    {
      question: "How quickly can Colorado intervention services respond to a crisis?",
      answer:
        "Most families see a professional interventionist on-site within 24–48 hours across Colorado intervention services coverage. Acute overdoses or psychosis require 911 first; once stable, call us for same-day team help. Our intervention services division coordinates flights to ASE, EGE, and DEN for mountain communities. Colorado intervention mobilisation prioritizes safety before the structured conversation.",
    },
    {
      question: "Do Colorado intervention services offer virtual or telehealth options?",
      answer:
        "Family preparation and follow-up coaching use secure telehealth when travel is impossible. On-site addiction intervention remains our standard — impact substance use patterns are assessed in person. Virtual family sessions may incur standard data rates on mobile networks; we confirm technology before scheduling. Colorado intervention services supplement — not replace — in-person professional interventionist work.",
    },
    {
      question: "Are Colorado intervention services available in rural areas?",
      answer:
        "Yes. Colorado intervention services travel from Lamar to Cortez and Fort Morgan to Durango. Rural interventions Colorado families request receive identical intervention services quality — we pre-plan transport and local addiction treatment referrals. Telehealth supports remote intervention family coaching between on-site visits when appropriate.",
    },
    {
      question: "How does Colorado intervention differ for adolescents versus adults?",
      answer:
        "Adolescent addiction intervention emphasizes family systems, school impact, and developmentally appropriate addiction treatment — often intensive outpatient or residential teen programs. Adult Colorado intervention may involve employment, criminal justice, or spouse dynamics. Both tracks use certified professional interventionist standards; early intervention for minors may also involve Colorado Early Intervention (EI) when disabilities are present.",
    },
    {
      question: "What follow-up support do Colorado intervention services provide after treatment?",
      answer:
        "Our S.A.F.E.® intervention program includes intervention family recovery coaching for twelve months — boundaries, visit planning, and relapse response. Community partners such as Al-Anon and Colorado behavioral health aftercare extend support services. We coordinate with treatment centers so the intervention family receives clear recovery milestones after admission.",
    },
    {
      question: "What's the difference between intervention and crisis counseling in Colorado?",
      answer:
        "Crisis counseling stabilizes immediate mental health emergencies — often through 988 or hospital ERs. Colorado intervention services structure a family meeting toward voluntary addiction treatment admission. Crisis counselors rarely transport to rehab; our professional interventionist team prepares impact substance statements and treatment contracts. Both support behavioral health, but goals differ.",
    },
    {
      question: "Can intervention services in Colorado work with court-ordered cases?",
      answer:
        "Yes. We coordinate with attorneys and probation when community corrections or specialty courts are involved. Intervention Inc — a separate Colorado nonprofit — operates community corrections in Jefferson, Pueblo, Weld, and Adams Counties; Family First handles private family addiction intervention. We clarify roles so your intervention family understands each services division.",
    },
    {
      question: "How do Colorado intervention services handle insurance and payment plans?",
      answer:
        "We verify Health First Colorado, Anthem, Cigna, United, and Rocky Mountain Health Plans before intervention day. Federal parity often covers mental health and substance abuse treatment. Fees for private colorado intervention services are quoted transparently on the first call — payment plans may be available. Addiction treatment authorization is pursued alongside intervention planning.",
    },
    {
      question: "What credentials should a Colorado interventionist have?",
      answer:
        "Seek a Certified Intervention Professional (CIP) through the Association of Intervention Specialists. A professional interventionist should carry liability coverage, Colorado treatment relationships, and experience with addiction intervention and mental health dual diagnosis. Ask how many interventions Colorado cases they have led and whether intervention family coaching follows admission.",
    },
    {
      question: "What are Colorado's specific laws regarding intervention and confidentiality?",
      answer:
        "Colorado protects HIPAA and 42 CFR Part 2 for substance use records — families cannot access treatment notes without consent. M-1 holds (27-65-105 C.R.S.) allow 72-hour psychiatric evaluation when danger is imminent. Confidentiality in private addiction intervention planning remains between you and our team; court filings follow separate rules.",
    },
    {
      question: "What is a professional addiction intervention?",
      answer:
        "A professional addiction intervention is a structured, clinically guided family meeting led by a certified professional interventionist — not an ambush. It combines mental health assessment, impact substance use letters, and pre-arranged addiction treatment admission. Colorado intervention services through Family First align intervention family education with S.A.F.E.® coaching for sustained recovery.",
    },
    {
      question: "Who qualifies for early intervention in Colorado?",
      answer:
        "Early intervention in Colorado serves infants and toddlers with developmental delays or children disabilities from birth through age two — via Early Intervention Colorado (EI Colorado). Qualification requires evaluation through EI Families coordinators. This state early intervention system differs from private addiction intervention for substance abuse; we help families distinguish both pathways.",
    },
    {
      question: "When is an addiction intervention needed?",
      answer:
        "Addiction intervention is needed when substance use escalates despite promises — overdoses, job loss, legal trouble, or deteriorating mental health. Health addiction patterns affecting family safety warrant immediate Colorado intervention services contact. Waiting for rock bottom increases harm; early intervention in the addiction sense means acting before hospitalization or incarceration.",
    },
    {
      question: "Early Intervention Colorado | EI Families | About the evaluation",
      answer:
        "Early Intervention Colorado (EI Colorado) connects EI Families to developmental evaluations for children birth to age three with children disabilities or delays. An individualized family service plan may follow, outlining support services and child development goals. This evaluation is not addiction treatment — contact us separately for adolescent substance abuse or adult intervention addiction needs.",
    },
    {
      question: "What are the four types of interventions?",
      answer:
        "Common models include Johnson (structured surprise), ARISE (invitational), CRAFT (family training), and Systemic Family — each addresses family dynamics differently. Our Colorado intervention team selects the model based on denial level, mental health history, and impact substance use severity. All aim toward addiction treatment engagement.",
    },
    {
      question: "Is cannabis really addictive in Colorado?",
      answer:
        "Cannabis use disorder is diagnosable — high-potency products increase health concerns including drug-induced psychosis since legalization. Legal status does not prevent intervention addiction escalation. We help intervention families address denial rooted in Colorado culture while coordinating mental health and addiction treatment referrals.",
    },
    {
      question: "What is Health First Colorado and does it cover treatment?",
      answer:
        "Health First Colorado is Colorado Medicaid, covering medically necessary substance abuse and mental health treatment — detox, residential, and outpatient. Our intervention services help families verify eligibility and locate contracted providers before the addiction intervention conversation.",
    },
    {
      question: "Can you reach ski resort communities — Aspen, Vail, Breckenridge?",
      answer:
        "Yes. Resort communities show high substance use among seasonal workers and second-home owners. We fly ASE, EGE, or DEN and drive I-70 corridors. Colorado intervention services include discreet logistics for high-profile intervention family situations.",
    },
    {
      question: "Does Colorado have M-1 Hold provisions for mental health crises?",
      answer:
        "Colorado M-1 holds allow 72-hour evaluation when someone is an imminent danger. This behavioral health pathway differs from voluntary addiction intervention. We help families understand when holds complement — rather than replace — structured intervention services planning.",
    },
    {
      question: "What about Denver tech culture and high-functioning addiction?",
      answer:
        "Denver and Boulder tech sectors see high-functioning alcohol drug and stimulant patterns. Our professional interventionist team works with engineers and executives discreetly — coordinating mental health and addiction treatment without employer disclosure unless authorized.",
    },
    {
      question: "Is it better to keep our loved one in Colorado for treatment?",
      answer:
        "Colorado offers strong addiction treatment programs; leaving the state sometimes breaks enabling networks for the first 30–90 days. We compare in-state and out-of-state options honestly during intervention family preparation — recovery planning follows clinical need, not convenience.",
    },
    {
      question: "How much does a Colorado intervention cost?",
      answer:
        "Private colorado intervention services fees are quoted on the first call. Cost is typically less than one month of active substance abuse or a DUI. We maximize insurance for subsequent addiction treatment and mental health care.",
    },
    {
      question: "What is Intervention Inc and how does it relate to Family First?",
      answer:
        "Intervention Inc is a Colorado-based 501(c)(3) nonprofit serving communities since 1986 — separate from Family First. Intervention inc provides private probation, electronic monitoring, alcohol drug testing, SCRAM CAM and GPS monitoring, and community corrections across Jefferson, Pueblo, Fremont, Chaffee, Park, Adams, Broomfield, Weld, and Boulder Counties. Their victim services division supports crime victims; Behavioral Treatment Services offers justice-involved mental health and substance use care. Family First provides private intervention family services — call 1-877-728-1122 or our main line.",
    },
    {
      question: "Does Intervention Inc offer electronic monitoring and community corrections?",
      answer:
        "Yes. Intervention Inc operates electronic home monitoring, drug detection technology, and community corrections programs — first nonprofit private probation in Colorado since 1990, with 27 offices statewide. Community corrections run in Jefferson, Pueblo, Weld, and Adams Counties; Jefferson County opened its first program in 2002. Community Connections Center (C3) launched in 2020. Corporate office: 1333 W. 120th Avenue Suite 101, Westminster, Colorado 80234.",
    },
    {
      question: "How does Family First intervention family coaching work?",
      answer:
        "Our S.A.F.E.® intervention program delivers intervention family recovery coaching — weekly calls, boundary scripts, and relapse planning. Coaching reinforces development of healthy family dynamics after addiction treatment admission. Intervention family participants learn communication skills distinct from crisis counseling.",
    },
  ],
  faqTitle: "Colorado intervention questions, answered.",
  bottomCtaTitle: "Ready to act for your family in Colorado?",

  extraCardsSection: {
    eyebrow: "Colorado Intervention Services",
    headline: "Early intervention and addiction treatment statewide",
    italicWord: "Early intervention",
    body:
      "Colorado intervention services coordinate addiction intervention, mental health crisis planning, and addiction treatment admissions before your family meeting. Our intervention services team vets programs statewide so acceptance leads to a confirmed bed — not a waitlist.",
    cards: [
      {
        icon: "ri-first-aid-kit-line",
        title: "Medical detox & withdrawal",
        body: "Alcohol drug detox and mental health stabilization for severe substance abuse. Colorado hospitals and residential programs manage withdrawal before inpatient addiction treatment begins.",
      },
      {
        icon: "ri-home-heart-line",
        title: "Residential intervention program",
        body: "Structured intervention program pathways into 24-hour care. Removes triggers while addressing substance use through therapy and dual diagnosis support services.",
      },
      {
        icon: "ri-calendar-check-line",
        title: "Outpatient & IOP options",
        body: "Intensive outpatient supports recovery while living at home. Ideal when early intervention at the addiction stage catches use before residential need.",
      },
      {
        icon: "ri-mental-health-line",
        title: "Dual diagnosis mental health",
        body: "Behavioral health programs treat mental health and substance use together — addressing health addiction patterns and intervention addiction escalation with integrated clinical teams.",
      },
    ],
  },

  evidenceBasedSection: {
    eyebrow: "Family Dynamics & Colorado Resources",
    headline: "Colorado intervention and family dynamics support",
    italicWord: "family dynamics",
    body:
      "Strong intervention services account for family dynamics, enabling patterns, and Colorado-specific health concerns — from fentanyl to cannabis potency. We connect intervention families to support services, EI Colorado resources when children disabilities apply, and community partners for sustained recovery across interventions Colorado wide.",
    cards: [
      {
        icon: "ri-group-line",
        title: "Intervention family education",
        body: "S.A.F.E.® coaching trains the intervention family before and after the meeting. Family support groups and development of healthy boundaries reduce relapse risk when loved ones return from addiction treatment.",
      },
      {
        icon: "ri-government-line",
        title: "Justice & victim services",
        body: "Intervention Inc victim services division and community corrections programs serve justice-involved individuals — distinct from private colorado intervention services. We clarify each services division role for your intervention family.",
      },
      {
        icon: "ri-parent-line",
        title: "EI Colorado & children birth",
        body: "Early Intervention Colorado supports children birth to three with developmental needs — evaluations through EI Families may produce an individualized family service plan. Separate from adult substance abuse intervention services.",
      },
      {
        icon: "ri-phone-line",
        title: "Nationwide team help line",
        body: "Family First serves families across the united states with Colorado specialists on staff. Call 1-877-728-1122 or our main line — standard data rates may apply to text updates. Professional interventionist intake is confidential 24/7.",
      },
    ],
  },
};
