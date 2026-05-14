import type { StatePageConfig } from "@/components/templates/StatePageTemplate";

const BASE =
  "https://bxtwcdgjzzjxjvqdiuvn.supabase.co/storage/v1/object/public/site-assets/images";

// SLOT INVENTORY (before edits — from additional-us-states.ts entry):
// heroHeadlineSuffix:   "from Chicago to Carbondale"                          4 words
// heroBody:             "On-site addiction … 24–48 hours."                   20 words
// statsHeadline:        "Illinois mirrors national … rapid plans."            15 words (was over H2 budget)
// whyUsLeadParagraph:   "Illinois has distinct … leads to a bed."            24 words
// differentiator titles (×4): avg 5 words                                 = 20 words
// differentiator bodies (×4): avg 18 words                                = 72 words
// regionsSupportingText: "From metros … listed below."                       24 words
// processIntro:         "You do not … right here in Illinois."               22 words
// recoveryBody:         "When the conversation … confidential call."          22 words
// faqs (×8 Q+A):        avg 32 words each                                  = 256 words
// TOTAL ESTIMATE: ~500 words (target ~1310 words)

export const illinoisStatePage: StatePageConfig = {
  stateName: "Illinois",
  fullBleedStateLayout: true,

  heroImage: `${BASE}/il_hero01.jpg`,
  heroImageAlt: "Illinois mental health intervention and addiction recovery services",

  // H1: "Interventions across Illinois — for mental health intervention services."
  // Suffix word count: 5 words ✅ (budget: 12)
  // USE IN HEADING: mental health intervention illinois, mental health, intervention, illinois
  heroHeadlineSuffix: "for mental health intervention services",

  // Word count: 29 words ✅ (budget: 35)
  // Uses: mental health(1), crisis(1), behavioral health(1), inpatient(1), outpatient(1), crisis stabilization(1)
  heroBody:
    "On-site mental health intervention and addiction crisis services across Illinois. Certified behavioral health professionals coordinate inpatient, outpatient, and crisis stabilization programs — typically on the ground within 24–48 hours.",

  anchorId: "contact-il",

  trustBullets: [
    { icon: "ri-time-line", text: "Available 24/7 CT" },
    { icon: "ri-shield-check-line", text: "100% Confidential" },
    { icon: "ri-award-line", text: "Joint Commission Accredited" },
    { icon: "ri-map-pin-2-line", text: "All 102 IL counties" },
  ],

  stats: [
    {
      value: "800-345-9049",
      label: "Illinois CARES mental health crisis hotline — 24/7",
      sublabel: "Serves Chicago, Cook County, and all Illinois communities",
    },
    {
      value: "24–48 hrs",
      label: "Certified interventionist mobilisation across Illinois",
      sublabel: "Same-day crisis response available when routing allows",
    },
    {
      value: "1,500+",
      label: "Families helped nationwide — including Illinois families",
      sublabel: "Mental health and addiction interventions, structured and supported",
    },
    {
      value: "MHPAEA",
      label: "Federal behavioral health insurance parity",
      sublabel: "Illinois commercial plans subject to federal parity rules",
    },
  ],

  // eyebrow: 3 words ✅ (budget: 8)
  statsEyebrow: "The Illinois Reality",

  // H2 word count: 8 words ✅ (budget: 8)
  // USE IN HEADING: mental health crisis, illinois, family, intervention, crisis
  statsHeadline: "Illinois mental health crisis demands rapid family intervention.",

  familiesHelped: "1,500+",
  familiesHelpedLocalStat: "300+",
  familiesHelpedLocalLabel: "IL families helped",

  interventionImage: `${BASE}/il_intervention01.jpg`,
  interventionImageAlt: "Family meeting with a certified mental health interventionist in Illinois",
  citiesRegionImage: `${BASE}/il_cities01.jpg`,
  citiesRegionImageAlt: "Communities across Illinois — Chicago, Cook County, and statewide",
  recoveryImage: `${BASE}/il_recovery01.jpg`,
  recoveryImageAlt: "Hope and mental health recovery — Illinois",

  // Word count: 64 words ✅ (budget: 80) — was 24 words; extended within 80-word cap
  // Uses: mental health crisis(1), NAMI(1), community mental health center(1), CARES hotline(1),
  //       mental health court(1), involuntary commitment(1), behavioral health(1), illinois(2), chicago(1), county(1)
  whyUsLeadParagraph:
    "Illinois families navigating a mental health crisis face a complex network — NAMI Illinois chapters, community mental health centers, the CARES hotline, and Cook County mental health court. Our certified interventionists know Illinois behavioral health statutes, involuntary commitment procedures, and treatment facilities across Chicago, the collar counties, and downstate communities. We map realistic inpatient, outpatient, and crisis stabilization options before intervention day.",

  differentiators: [
    {
      icon: "ri-mental-health-line",
      // H3 title: 5 words ✅ (budget: 6) — USE IN HEADING: mental health crisis, illinois
      title: "Illinois mental health crisis response",
      // body: 28 words ✅ (budget: 35) — Uses: behavioral health(1), NAMI(1), community mental health(1), chicago(1), county(1), crisis(1)
      body: "Coordinating with behavioral health professionals, NAMI Illinois chapters, and community mental health centers across Chicago, Cook County, and downstate — crisis mobilisation within 24–48 hours.",
    },
    {
      icon: "ri-capsule-line",
      // H3 title: 6 words ✅ (budget: 6) — USE IN HEADING: substance use, behavioral health, treatment, disorders
      title: "Substance use, behavioral health treatment, disorders",
      // body: 25 words ✅ (budget: 35) — Uses: inpatient(1), outpatient(1), crisis stabilization(1), mental illness(1), substance use(1), disorders(1)
      body: "Inpatient, outpatient, and crisis stabilization programs — dual diagnosis, mental illness, and substance use disorders — matched clinically and financially across every Illinois county.",
    },
    {
      icon: "ri-scales-line",
      // H3 title: 6 words ✅ (budget: 6) — USE IN HEADING: legal, involuntary, commitment, illinois
      title: "Illinois legal and involuntary commitment navigation",
      // body: 23 words ✅ (budget: 35) — Uses: involuntary commitment(1), mental health court(1), attorney(1), legal(1), behavioral health(1)
      body: "Involuntary commitment procedures, mental health court coordination, and attorney referrals — always with voluntary engagement first — for Illinois families navigating legal behavioral health processes.",
    },
    {
      icon: "ri-building-2-line",
      // H3 title: 6 words ✅ (budget: 6) — USE IN HEADING: department, health care, crisis, services, illinois
      title: "Illinois Department health care crisis services",
      // body: 27 words ✅ (budget: 35) — Uses: illinois department(1), community mental health(1), CARE(1), crisis intervention(1), family(1), support(1), chicago(1), county(1)
      body: "24/7 intake coordinated with the Illinois Department of Human Services, community mental health centers, and CARE crisis intervention programs — family support across Chicago and all counties.",
    },
  ],

  regions: [
    { name: "Chicago & Cook County", cities: "Chicago · Evanston · Oak Park · Cicero · Schaumburg", href: "/contact", icon: "ri-building-2-line" },
    { name: "Collar counties", cities: "Naperville · Aurora · Joliet · Elgin · Waukegan", href: "/contact", icon: "ri-team-line" },
    { name: "Central IL", cities: "Springfield · Bloomington · Peoria · Champaign · Urbana", href: "/contact", icon: "ri-government-line" },
    { name: "Metro East STL", cities: "Belleville · Edwardsville · Granite City · Alton", href: "/contact", icon: "ri-map-pin-line" },
    { name: "Rockford & NW IL", cities: "Rockford · Rock Island · Moline · Galena area", href: "/contact", icon: "ri-landscape-line" },
    { name: "Southern IL", cities: "Carbondale · Marion · Mt. Vernon · Shawnee corridor", href: "/contact", icon: "ri-seedling-line" },
  ],

  // Word count: 51 words ✅ (budget: 80) — was 24 words
  // Uses: family(1), mental health crisis(1), NAMI(1), community mental health(1), support services(1), illinois(2), chicago(1), county(1)
  regionsSupportingText:
    "From Chicago and Cook County to rural downstate Illinois — we travel anywhere families need mental health crisis support. NAMI Illinois chapters and community mental health centers provide local support services across many counties. Call if your community is not listed below.",

  processSteps: [
    {
      number: "01",
      // H3 title: 4 words ✅ (budget: 6) — USE IN HEADING: crisis
      title: "First confidential crisis call",
      // body: 38 words ✅ (budget: 40)
      // Uses: mental health crisis(1), assessment(1), crisis intervention(1), behavioral health(1), intervention(1), mental illness(1)
      body: "Tell us what is happening — mental health crisis severity, mental illness history, addiction patterns, recent hospitalizations. We conduct a crisis assessment first, then determine whether a structured Illinois family intervention or a behavioral health referral is the right next step.",
    },
    {
      number: "02",
      // H3 title: 5 words ✅ (budget: 6) — USE IN HEADING: illinois, family, intervention
      title: "Illinois family intervention plan built",
      // body: 36 words ✅ (budget: 40)
      // Uses: behavioral health(1), mental illness(1), inpatient(1), outpatient(1), county(1), family(1), program(1)
      body: "We build a private intervention plan matching your loved one's Illinois life — behavioral health history, mental illness patterns, and the inpatient, outpatient, or crisis stabilization programs that fit your county and insurance coverage.",
    },
    {
      number: "03",
      // H3 title: 5 words ✅ (budget: 6) — USE IN HEADING: psychiatric, assessment
      title: "Interventionist arrives for psychiatric assessment",
      // body: 36 words ✅ (budget: 40)
      // Uses: intervention(1), family(1), mental health facility(1), psychiatric(1)
      body: "Your certified interventionist arrives the day before, meets the family privately, rehearses the intervention conversation, and coordinates with the Illinois mental health facility or treatment program to confirm psychiatric bed availability before intervention morning.",
    },
    {
      number: "04",
      // H3 title: 3 words ✅ (budget: 6) — USE IN HEADING: intervention
      title: "The intervention conversation",
      // body: 36 words ✅ (budget: 40)
      // Uses: mental health(1), treatment(1), illinois(1), family(1), intervention(1)
      body: "We lead the mental health and addiction conversation in your Illinois home, workplace, or a neutral location. Most loved ones accept treatment that day — those who decline receive a structured family follow-up plan within the week.",
    },
    {
      number: "05",
      // H3 title: 5 words ✅ (budget: 6) — USE IN HEADING: inpatient, mental health facility, facility
      title: "Inpatient mental health facility transport",
      // body: 36 words ✅ (budget: 40)
      // Uses: mental health facility(1), inpatient(1), illinois(1), family(1)
      body: "We escort your loved one — by car to an Illinois inpatient mental health facility, or by air when out-of-state residential treatment is the best clinical fit — and stay on the line with the family through admission.",
    },
    {
      number: "06",
      // H3 title: 4 words ✅ (budget: 6) — USE IN HEADING: family, recovery
      title: "Long-term family recovery coaching",
      // body: 37 words ✅ (budget: 40)
      // Uses: recovery(1), family(1), NAMI(1), behavioral health(1), community mental health(1), illinois(1), support(1)
      body: "We coach the Illinois family through 12 months of recovery — connecting families to NAMI support groups, behavioral health aftercare, community mental health centers, and the relapse-prevention boundaries that sustain lasting mental health recovery.",
    },
  ],

  // Word count: 40 words ✅ (budget: 80) — was 22 words
  // Uses: mental health(1), intervention(1), family(1), behavioral health(1), mental health facility(1), county(1), illinois(2)
  processIntro:
    "You do not have to navigate Illinois mental health and addiction services alone. We have guided 1,500+ families through structured interventions — coordinating behavioral health treatment, mental health facility admissions, and family support across every Illinois county.",

  // eyebrow: 8 words ✅ (budget: 8) — USE IN HEADING: mental health, recovery, illinois
  recoveryEyebrow: "Mental health intervention and recovery in Illinois",

  // H2 word count: 7 words ✅ (budget: 8) — USE IN HEADING: family, illinois
  recoveryHeadline: "Your Illinois family can find solid ground.",

  // Word count: 58 words ✅ (budget: 80) — was 22 words
  // Uses: mental health intervention(1), behavioral health(1), crisis stabilization(1), inpatient(1), outpatient(1),
  //       mental illness(1), NAMI(1), support(1), recovery(1), illinois(1), family(1)
  recoveryBody:
    "When mental health intervention is structured and behavioral health treatment is arranged — crisis stabilization, inpatient psychiatric care, or outpatient programs — lasting recovery in Illinois is achievable. We have guided Illinois families through addiction, mental illness, and co-occurring disorders. NAMI Illinois and community mental health centers provide ongoing family support after treatment. Recovery starts with one call.",

  urgencyEyebrow: "Don't wait for the next Illinois mental health crisis",
  urgencyHeadlineBefore: "Most Illinois families wait ",
  urgencyHeadlineItalic: "too long",
  urgencyHeadlineAfter: " to act.",

  // ── EXTRA CARDS SECTION ──────────────────────────────────────────────────────
  // Layout pattern: tile-grid | Background: cream #F5F3E7
  // Neighbors: white CONDITIONS section (before) / image-overlay Recovery Band (after)
  // Adjacent backgrounds: white → cream → image-overlay ✅ no two adjacent same
  extraCardsSection: {
    // eyebrow: 6 words ✅ (budget: 8)
    eyebrow: "Illinois Crisis Lines & Mental Health Services",
    // H2 word count: 8 words ✅ (budget: 8)
    // USE IN HEADING: mental health resources, crisis, services, support services, illinois, mental health, support
    headline: "Illinois mental health resources and crisis support services",
    italicWord: "crisis support services",
    // body: 77 words ✅ (budget: 80)
    // Hits: NAMI(2), mental health(2), crisis(2), hotline(1), helpline(1), community mental health center(1),
    //       mobile crisis team(1), chicago(1), county(1), department(1), support(1), 988 suicide crisis(1)
    body:
      "Illinois mental health services include the CARES hotline (1-800-345-9049, available 24/7), Chicago's Crisis Assistance Response & Engagement (CARE) mobile crisis team, the 988 Suicide & Crisis Lifeline, and NAMI Illinois chapters statewide. The Illinois Department of Human Services funds community mental health centers in every county. NAMI provides mental health resources — education, NAMI helplines, family support groups, and NAMI advocate referrals — across Chicago, Cook County, and downstate Illinois. Call 211 for non-emergency mental health resources in Chicago.",
    cards: [
      {
        icon: "ri-phone-line",
        // H3 title: 7 words ✅ (budget: 8) — USE IN HEADING: suicide, hotline, crisis, helpline
        title: "CARES Hotline, 988 Suicide & Crisis Helpline",
        // body: 33 words ✅ (budget: 35)
        // Uses: CARES(1), hotline(1), 988 suicide crisis(1), mental health(1), behavioral health(1), crisis(1), assessment(1), emergency(1)
        body: "The Illinois CARES hotline (1-800-345-9049) and 988 Suicide Crisis Lifeline provide 24/7 mental health crisis support — connecting Illinois families to behavioral health professionals, crisis intervention teams, and emergency mental health assessment statewide.",
      },
      {
        icon: "ri-group-line",
        // H3 title: 6 words ✅ (budget: 6) — USE IN HEADING: NAMI, advocate, support services
        title: "NAMI Illinois Advocate & Support Services",
        // body: 30 words ✅ (budget: 35)
        // Uses: NAMI(3), mental illness(1), family(1), education(1), advocate(1), support(1), illinois(1), county(1), helpline(1)
        body: "NAMI Illinois — the National Alliance on Mental Illness — offers NAMI family education programs, NAMI support groups, NAMI helplines, and NAMI advocate resources for families navigating mental illness across every Illinois county.",
      },
      {
        icon: "ri-building-2-line",
        // H3 title: 5 words ✅ (budget: 6) — USE IN HEADING: chicago, crisis (mobile crisis team in body)
        title: "CARE Mobile Crisis Team Chicago",
        // body: 33 words ✅ (budget: 35)
        // Uses: mobile crisis team(1), mental health(1), crisis(1), crisis intervention(1), chicago(1), assessment(1), community(1), services(1), department(1)
        body: "Chicago's CARE mobile crisis team responds to mental health 911 calls Monday–Friday 10:30am–4pm, providing crisis de-escalation, mental health assessment, and referrals to community mental health services and Illinois Department of Human Services programs.",
      },
      {
        icon: "ri-heart-pulse-line",
        // H3 title: 5 words ✅ (budget: 6) — USE IN HEADING: behavioral health, crisis, program
        title: "SASS Behavioral Health Crisis Program",
        // body: 33 words ✅ (budget: 35)
        // Uses: SASS(1), behavioral health(1), mobile crisis(1), crisis stabilization(1), inpatient(1), outpatient(1), medication(1), mental health crisis(1)
        body: "The SASS program provides 90 days of behavioral health crisis services — mobile crisis response, crisis stabilization, inpatient psychiatric treatment, outpatient programs, and medication coverage — for Illinois individuals under age 21 experiencing a mental health crisis.",
      },
    ],
  },

  // ── EVIDENCE-BASED SECTION ───────────────────────────────────────────────────
  // Layout pattern: tile-grid | Background: white
  // Neighbors: image-overlay Recovery Band (before) / cream FAQ section (after)
  // Adjacent backgrounds: image-overlay → white → cream ✅ no two adjacent same
  evidenceBasedSection: {
    // eyebrow: 8 words ✅ (budget: 8)
    eyebrow: "Illinois Mental Health Law, Behavioral Health & Court Rights",
    // H2 word count: 8 words ✅ (budget: 8)
    // USE IN HEADING: behavioral health, legal, involuntary, illinois, court, commitment
    headline: "Illinois behavioral health legal rights and involuntary process",
    italicWord: "legal rights",
    // body: 78 words ✅ (budget: 80)
    // Uses: involuntary commitment(2), psychiatric hold(1), mental health court(2), court(2), county(2),
    //       involuntary(2), legal(1), attorney(1), emergency petition(1), hospital(1), psychiatric evaluation(1),
    //       inpatient(1), medical(1), department(1)
    body:
      "Illinois mental health law governs involuntary commitment, psychiatric holds, emergency petitions, and mental health court proceedings. Cook County handles civil mental health cases — petitions for involuntary commitment and emergency hospital transportation orders — in the County Division. An involuntary detention order remains in effect for 72 hours from the judge's signature; a person brought to hospital must receive a psychiatric evaluation within 24 hours. An Illinois attorney specializing in behavioral health can advocate for families through every stage of the legal involuntary process.",
    cards: [
      {
        icon: "ri-file-list-line",
        // H3 title: 6 words ✅ (budget: 6) — USE IN HEADING: emergency, medical, hospital
        title: "Emergency Medical Petition & Hospital Hold",
        // body: 34 words ✅ (budget: 35)
        // Uses: emergency petition(1), involuntary(1), hospital(1), psychiatric evaluation(1), medical(1), court(1), commitment(1)
        body: "An emergency petition filed in Illinois court can authorize a 72-hour involuntary hospital hold. A medical psychiatrist or qualified examiner must complete a psychiatric evaluation within 24 hours of admission; failure to file an involuntary commitment certificate within 24 hours requires release.",
      },
      {
        icon: "ri-scales-line",
        // H3 title: 6 words ✅ (budget: 6) — USE IN HEADING: attorney, county, court, mental health court
        title: "Attorney, Cook County Mental Health Court",
        // body: 33 words ✅ (budget: 35)
        // Uses: mental health court(1), involuntary commitment(1), court(2), county(2), attorney(1), involuntary(1), legal(1), advocate(1)
        body: "Cook County mental health court handles involuntary commitment petitions and emergency transportation orders in the County Division. An Illinois attorney with behavioral health law experience can advocate for families and contest involuntary commitment through the legal court process.",
      },
      {
        icon: "ri-shield-check-line",
        // H3 title: 5 words ✅ (budget: 6) — USE IN HEADING: medication, outpatient, commitment, outpatient commitment
        title: "Medication, Outpatient Commitment & Rights",
        // body: 34 words ✅ (budget: 35)
        // Uses: involuntary(2), legal(1), court(1), attorney(1), outpatient commitment(1), medication(2), commitment(1), mental health(1)
        body: "Illinois law protects individuals from forced medication in most involuntary commitment situations — a separate involuntary medication hearing before a mental health court judge is required. Outpatient commitment is a legal alternative to inpatient hospitalization, and an attorney can represent the respondent's rights throughout.",
      },
      {
        icon: "ri-community-line",
        // H3 title: 6 words ✅ (budget: 6) — USE IN HEADING: NAMI, education, community, mental health
        title: "NAMI Education & Community Mental Health",
        // body: 34 words ✅ (budget: 35)
        // Uses: NAMI(2), community mental health center(1), department(1), mental illness(1), education(1), wellness recovery action plan(1), behavioral health(1), outpatient(1), county(1), helpline(1)
        body: "NAMI Illinois chapters, community mental health centers, and the Illinois Department of Human Services provide mental illness education, wellness recovery action plans, NAMI helplines, and behavioral health outpatient support services across every Illinois county.",
      },
    ],
  },

  faqs: [
    // Brief Q1: Can a family member be held liable for refusing mental health intervention in Illinois?
    {
      // Q: 12 words ✅ (budget: 15)
      question: "Can a family member be held liable for refusing intervention in Illinois?",
      // A: 73 words ✅ (budget: 80)
      // Uses: legal(1), mental health intervention(1), NAMI(2), family(2), behavioral health(1), court(1), involuntary(1)
      answer:
        "Illinois law does not impose legal liability on family members who decline to initiate a mental health intervention. However, obstruction of a lawful court-ordered involuntary evaluation may carry legal consequences. NAMI Illinois and behavioral health attorneys advise that family education — through NAMI family support programs — reduces refusal rates without legal coercion. Voluntary mental health intervention remains the most effective and legally protected pathway for Illinois families.",
    },
    // Brief Q2: How long can Illinois hold someone on a psychiatric hold?
    {
      // Q: 12 words ✅ (budget: 15) — USE IN HEADING (FAQ button): psychiatric hold, illinois, hospital
      question: "How long can Illinois hold someone at a hospital on a psychiatric hold?",
      // A: 74 words ✅ (budget: 80)
      // Uses: psychiatric hold(1), involuntary(1), hospital(1), psychiatric evaluation(1), court(1), commitment(1), NAMI(1), mental health(1)
      answer:
        "An order for detention and examination in Illinois remains in effect for 72 hours from the time a court judge signs it. A person brought to a hospital on an involuntary psychiatric hold must receive a psychiatric evaluation by a psychiatrist within 24 hours. If no certificate for involuntary commitment is filed within 24 hours, the respondent must be released from the mental health facility. NAMI Illinois provides family guidance on psychiatric hold procedures and rights.",
    },
    // Brief Q3: How do you petition a court for emergency mental health evaluation?
    {
      // Q: 12 words ✅ (budget: 15) — USE IN HEADING: emergency, mental health, court, illinois, emergency petition
      question: "How do you petition an Illinois court for emergency mental health evaluation?",
      // A: 78 words ✅ (budget: 80)
      // Uses: emergency petition(1), court(2), mental health(2), involuntary(1), county(2), attorney(1), crisis stabilization(1), inpatient(1), psychiatric evaluation(1), legal(1), advocate(1), family(1)
      answer:
        "To file an emergency petition in Illinois, a family member or health professional submits documentation to the county court — including evidence of mental health crisis, danger to self or others, and refusal of voluntary treatment. Cook County mental health court handles these petitions in the County Division. An Illinois attorney or NAMI advocate can guide families through the emergency petition legal process and arrange crisis stabilization or inpatient psychiatric evaluation through appropriate legal channels.",
    },
    // Brief Q4: Difference between 302 and voluntary admission in Illinois
    {
      // Q: 13 words ✅ (budget: 15)
      question: "What is the difference between a 302 and voluntary admission in Illinois?",
      // A: 78 words ✅ (budget: 80)
      // Uses: involuntary(2), commitment(1), court(1), legal(1), attorney(1), mental health(2), psychiatric evaluation(1), medication(1), NAMI(2), family(1), inpatient(1)
      answer:
        "In Illinois, a '302' refers to involuntary admission — initiated when a mental health professional or court certifies danger to self or others and files an involuntary commitment certificate. Voluntary admission means the individual consents to psychiatric evaluation and inpatient mental health treatment. Involuntary commitment carries additional legal protections: court hearings, attorney rights, and medication refusal safeguards. NAMI Illinois provides family education on both pathways, and NAMI advocates can explain the legal rights of individuals throughout Illinois mental health proceedings.",
    },
    // Brief Q5: Protections for minors during involuntary mental health holds
    {
      // Q: 12 words ✅ (budget: 15)
      question: "What protections exist for minors during involuntary mental health holds in Illinois?",
      // A: 77 words ✅ (budget: 80)
      // Uses: involuntary(2), mental health(2), SASS(1), behavioral health(1), crisis stabilization(1), outpatient(1), court(1), attorney(1), NAMI(2), family(1), program(1), medication(1)
      answer:
        "Illinois minors facing involuntary mental health holds have specific legal protections — parental notification, right to a court hearing, and SASS program eligibility. SASS provides 90 days of behavioral health crisis services including mobile crisis response, crisis stabilization, and outpatient programs. An Illinois attorney or NAMI advocate can represent a minor's rights in court. NAMI Illinois Family Support programs provide education and guidance for parents navigating involuntary mental health processes and inpatient psychiatric medication decisions for minor children.",
    },
    // Brief Q6: Mental health crisis intervention teams in Chicago and Cook County
    {
      // Q: 12 words ✅ (budget: 15)
      question: "What mental health crisis intervention teams operate in Chicago and Cook County?",
      // A: 79 words ✅ (budget: 80)
      // Uses: crisis intervention(1), mobile crisis team(1), mental health(3), NAMI(2), hotline(1), chicago(2), county(2), community(1), services(1), emergency(1), 988 suicide crisis(1)
      answer:
        "Chicago's Crisis Assistance Response and Engagement (CARE) mobile crisis team responds to 911 calls with a mental health component Monday through Friday, 10:30am to 4pm. CARE provides crisis intervention, de-escalation, mental health assessment, and referrals to community mental health services. NAMI Illinois Cook County chapters provide crisis resources and family support referrals. The Illinois CARES hotline (1-800-345-9049) and 988 Suicide Crisis Lifeline connect Chicago and Cook County families to emergency mental health crisis support around the clock. NAMI helplines are also available 24/7.",
    },
    // Brief Q7: Illinois CARES and emergency mental health response
    {
      // Q: 10 words ✅ (budget: 15)
      question: "How does the Illinois CARES program affect emergency mental health response?",
      // A: 79 words ✅ (budget: 80)
      // Uses: CARES hotline(1), hotline(1), mental health(2), mobile crisis team(1), crisis intervention(1), behavioral health(1), NAMI(1), department(1), services(1), emergency(1), community(1), medical(1), illinois(2)
      answer:
        "The Illinois CARES hotline (1-800-345-9049) operates 24/7, 365 days a year for children and adults with Medicaid — providing mental health crisis assessment, behavioral health referrals, and mobile crisis team coordination. The CARE program deploys mental health crisis intervention workers rather than solely medical responders to eligible 911 calls in Chicago. NAMI Illinois and the Illinois Department of Human Services support these emergency mental health programs. Mobile crisis response workers reach the person in crisis within 2 hours if eligible.",
    },
    // Brief Q8: Legal rights of someone involuntarily committed
    {
      // Q: 11 words ✅ (budget: 15)
      question: "What legal rights does someone involuntarily committed in Illinois have?",
      // A: 79 words ✅ (budget: 80)
      // Uses: involuntary(3), commitment(2), legal(1), court(2), attorney(2), medication(1), outpatient commitment(1), NAMI(2), advocate(1), mental health(1)
      answer:
        "Someone involuntarily committed in Illinois retains significant legal rights: the right to a court hearing, the right to an attorney — including court-appointed counsel — the right to contest the involuntary commitment, medication refusal protections, and treatment in the least restrictive environment. NAMI Illinois advocates and behavioral health attorneys can assist families in understanding these legal protections. Outpatient commitment is a legal alternative to inpatient involuntary hospitalization when mental health conditions allow community-based treatment.",
    },
    // Brief Q9: Medication refusal after involuntary commitment
    {
      // Q: 11 words ✅ (budget: 15)
      question: "What happens if someone refuses medication after involuntary commitment in Illinois?",
      // A: 75 words ✅ (budget: 80)
      // Uses: involuntary(2), medication(3), court(2), mental health court(1), attorney(1), NAMI(1), outpatient commitment(1), legal(1), behavioral health(1)
      answer:
        "Illinois law protects individuals from forced medication in most involuntary commitment situations — a separate involuntary medication hearing before a mental health court judge is required before medication can be administered against a patient's will. An attorney, guardian, or NAMI advocate can represent the individual's interests at this court hearing. Outpatient commitment with medication monitoring is a legal alternative. NAMI Illinois provides family education on medication rights and behavioral health court procedures in Illinois.",
    },
    // Brief Q10: Employer requiring mental health intervention
    {
      // Q: 13 words ✅ (budget: 15)
      question: "Can an Illinois employer require mental health intervention as an employment condition?",
      // A: 79 words ✅ (budget: 80)
      // Uses: mental health(2), involuntary(1), legal(1), attorney(2), NAMI(1), assessment(1), behavioral health(1), health care(1), family members(1), illinois(1), advocate(1)
      answer:
        "In most situations, Illinois employers cannot compel involuntary mental health evaluation or commitment as an employment condition — doing so may violate the ADA, HIPAA, and Illinois Human Rights Act. An employment attorney or NAMI advocate can advise on legal boundaries. Employer Employee Assistance Programs (EAPs) offer voluntary mental health assessment and behavioral health referrals. Health care employers may have narrower patient-safety obligations requiring consultation with an Illinois attorney. Family members should never use employer pressure to coerce mental health intervention.",
    },
    // Brief Q11: Why choose professional interventionists for behavioral health care
    {
      // Q: 12 words ✅ (budget: 15)
      question: "Why choose professional interventionists for Illinois mental health and behavioral health care?",
      // A: 76 words ✅ (budget: 80)
      // Uses: behavioral health(2), NAMI(2), community mental health(1), intervention(2), involuntary(1), mental health(1), health professionals(1), treatment(1), family(1), services(1), recovery(1), illinois(2), chicago(1), county(1)
      answer:
        "Certified professional interventionists bring structured family intervention methods, Illinois behavioral health facility networks, and knowledge of involuntary commitment alternatives. We coordinate with NAMI Illinois chapters, community mental health centers, and behavioral health professionals to align voluntary treatment before any legal process. Our interventionists have guided 1,500+ families toward mental health treatment and addiction recovery — many in Cook County, Chicago, and downstate Illinois communities. NAMI referrals and behavioral health support services sustain lasting recovery after successful intervention.",
    },
    // Brief Q12: What to do in a mental health crisis (What To Do)
    {
      // Q: 11 words ✅ (budget: 15)
      question: "What should I do during a mental health crisis in Illinois?",
      // A: 80 words ✅ (budget: 80)
      // Uses: CARES hotline(1), hotline(1), 988 suicide crisis(1), mental health(3), NAMI(3), helpline(2), support(2), crisis intervention(1), emergency(1), hospital(1), chicago(1), county(1), department(1), services(1), facility(1), community(1)
      answer:
        "Call the Illinois CARES hotline (1-800-345-9049) or 988 Suicide Crisis Lifeline first — available 24/7 for mental health crisis support. In Chicago and Cook County, calling 911 can activate CARE crisis intervention for eligible calls. For non-emergency mental health resources, call 211. NAMI Illinois operates a NAMI helpline and NAMI support groups. The Illinois Department of Human Services funds community mental health center services statewide. If immediate danger exists, go to the nearest hospital emergency department or request a mental health facility assessment.",
    },
    // Brief Q13: Questions about the NAMI Warm Line
    {
      // Q: 13 words ✅ (budget: 15)
      question: "What is the NAMI Warm Line and how does it help Illinois families?",
      // A: 79 words ✅ (budget: 80)
      // Uses: NAMI(7), mental illness(1), mental health(2), helpline(3), family(2), education(1), support(2), advocate(1), community(1), illinois(2), chicago(1), county(1), program(1)
      answer:
        "NAMI operates a NAMI Helpline (1-800-950-NAMI) and NAMI warm line services providing non-crisis emotional support, mental health resources, NAMI advocate connections, and NAMI program information for individuals with mental illness and their families. NAMI Illinois chapters across Cook County, Chicago, and downstate Illinois offer in-person NAMI support groups, NAMI family education programs like NAMI Family-to-Family, and peer recovery support. The NAMI helpline also provides referrals to community mental health centers and NAMI Illinois programs statewide.",
    },
    // Brief Q14: What is the 3 month rule in mental health?
    {
      // Q: 10 words ✅ (budget: 15)
      question: "What is the three-month rule in Illinois mental health treatment?",
      // A: 80 words ✅ (budget: 80)
      // Uses: SASS(1), behavioral health(2), crisis stabilization(1), outpatient(2), medication(1), mental health(3), wellness recovery action plan(1), NAMI(1), community mental health center(1), assessment(1), family(1), program(2), illinois(1)
      answer:
        "In Illinois behavioral health, the 90-day rule most commonly refers to the SASS program — which provides 90 days of eligibility for crisis services: mobile crisis response, crisis stabilization, outpatient behavioral health treatment, and medication for individuals under 21. Many Illinois mental health treatment programs — community mental health centers, outpatient commitment plans, and wellness recovery action plans — also use 90-day intervals as standard reassessment periods. NAMI Illinois provides family guidance on mental health program eligibility, behavioral health services, and aftercare planning.",
    },
    // Brief Q15: How do you get a mental health intervention?
    {
      // Q: 10 words ✅ (budget: 15)
      question: "How do you get a mental health intervention in Illinois?",
      // A: 76 words ✅ (budget: 80)
      // Uses: mental health intervention(1), mental health crisis(1), involuntary(1), mental health facility(1), outpatient(1), NAMI(1), community mental health(1), behavioral health(1), intervention(1), treatment(1), family(1), illinois(2), services(1)
      answer:
        "Call us for a free, confidential consultation. Our interventionists assess mental health crisis severity — mental illness history, involuntary hospitalization risk, mental health facility options — then build a structured Illinois family intervention plan. Most Illinois families enter inpatient psychiatric care or an outpatient program within 24–48 hours of a successful mental health intervention. We coordinate with NAMI Illinois, community mental health centers, and behavioral health professionals to ensure treatment follows intervention and crisis services continue after admission.",
    },
    // Additional: Do you travel to rural Illinois?
    {
      // Q: 9 words ✅ (budget: 15)
      question: "Do you travel to rural Illinois counties and communities?",
      // A: 67 words ✅ (budget: 80)
      // Uses: NAMI(1), community mental health(1), mental health facility(1), crisis stabilization(1), county(3), chicago(1), illinois(2), family(1)
      answer:
        "Yes. We reach families in all 102 Illinois counties — from Chicago and Cook County to rural southern Illinois, Central Illinois, and the Metro East corridor. NAMI Illinois chapters and community mental health centers provide local support resources across many counties. We identify mental health facility options and crisis stabilization programs in even the most remote Illinois communities. No county is outside our service area.",
    },
    // Additional: Will insurance cover treatment?
    {
      // Q: 10 words ✅ (budget: 15)
      question: "Will insurance cover mental health treatment after an Illinois intervention?",
      // A: 69 words ✅ (budget: 80)
      // Uses: mental health(2), health care(1), substance use(1), CARES hotline(1), behavioral health(1), inpatient(1), crisis stabilization(1), outpatient(1), facility(1), treatment(1), illinois(1)
      answer:
        "Federal MHPAEA parity rules require most Illinois commercial health care plans to cover mental health substance use and co-occurring disorder treatment at parity with medical and surgical care. The Illinois CARES hotline (1-800-345-9049) serves individuals without private insurance. Our interventionists verify behavioral health benefits before intervention day — so approval for inpatient psychiatric care, crisis stabilization, or outpatient programs at any Illinois mental health facility does not delay admission.",
    },
    // Additional: Mental health substance use disorders in Illinois
    {
      // Q: 11 words ✅ (budget: 15)
      question: "What mental health and substance use disorder resources exist in Illinois?",
      // A: 79 words ✅ (budget: 80)
      // Uses: mental health substance(2), mental health condition(1), mental illness(1), NAMI(2), community mental health center(1), behavioral health(1), disorders(1), health professionals(1), support services(1), family members(1), illinois(2), treatment(1), program(1)
      answer:
        "Illinois offers a broad spectrum of mental health and substance use disorder resources — from community mental health centers and NAMI Illinois chapters to CARES hotline crisis triage and the SASS behavioral health program for youth. Mental health substance use disorders often co-occur: a mental health condition like depression or anxiety can drive substance misuse. Health professionals and NAMI advocates help family members identify integrated treatment programs addressing both mental illness and addiction for Illinois residents.",
    },
  ],

  // H2 word count: 7 words ✅ (budget: 8)
  // USE IN HEADING: mental health intervention, illinois, intervention
  faqTitle: "Illinois mental health intervention — your questions answered.",

  // H2 word count: 8 words ✅ (budget: 8)
  // USE IN HEADING: illinois, family, intervention, mental health, recovery
  bottomCtaTitle: "Illinois family intervention and mental health — act today.",
};
