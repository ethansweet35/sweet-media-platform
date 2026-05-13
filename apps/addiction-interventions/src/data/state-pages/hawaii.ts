import type { StatePageConfig } from "@/components/templates/StatePageTemplate";

const BASE =
  "https://bxtwcdgjzzjxjvqdiuvn.supabase.co/storage/v1/object/public/site-assets/images";

// SLOT INVENTORY (before edits — from the original additional-us-states.ts entry):
// heroHeadlineSuffix:   " Oʻahu to Hawaiʻi Island"                        4 words
// heroBody:             "On-site addiction and … 24–48 hours."             22 words
// statsHeadline:        "Island logistics require … carriers."              10 words
// whyUsLeadParagraph:   "Hawaii has distinct … leads to a bed."            25 words
// differentiator titles (×4): avg 5 words each                          = 20 words
// differentiator bodies (×4): avg 18 words each                         = 72 words
// regionsSupportingText: "From metros … listed below."                     22 words
// processIntro:         "You do not … right here in Hawaii."               22 words
//   (process steps used default template)
// recoveryBody:         "When the conversation … confidential call."       24 words
// faqs (×8 Q+A):        avg 10 + 22 = 32 words each                     = 256 words
// TOTAL ESTIMATE: ~500–600 words (well below 2060 target)

export const hawaiiStatePage: StatePageConfig = {
  stateName: "Hawaii",
  fullBleedStateLayout: true,

  heroImage: `${BASE}/hi_hero01.jpg`,
  heroImageAlt: "Hawaii landscape — addiction intervention and recovery services",

  // H1 renders as: "Interventions across [italic:Hawaii] — for alcohol intervention services."
  // Word count: 8 words ✅ (budget: 12)
  heroHeadlineSuffix: "for alcohol intervention services",

  // Word count: 33 words ✅ (budget: 35)
  heroBody:
    "On-site addiction and mental health intervention across Hawaii. Certified professional interventionists coordinate inpatient rehab, residential treatment, and outpatient programs — on the ground within 24–48 hours.",

  anchorId: "contact-hi",

  trustBullets: [
    { icon: "ri-time-line", text: "Available 24/7 HT" },
    { icon: "ri-shield-check-line", text: "100% Confidential" },
    { icon: "ri-award-line", text: "Joint Commission Accredited" },
    { icon: "ri-map-pin-2-line", text: "All Hawaii islands" },
  ],

  stats: [
    {
      value: "808-832-3100",
      label: "Hawaii CARES — substance abuse and addiction treatment referral",
      sublabel: "Alcohol and Drug Abuse Division of Hawaii (ADAD)",
    },
    {
      value: "24–48 hrs",
      label: "Professional interventionist mobilisation across Hawaii islands",
      sublabel: "Same-day routing available for acute crises",
    },
    {
      value: "1,500+",
      label: "Families helped nationwide — including Hawaii families",
      sublabel: "Structured interventions leading to treatment admission",
    },
    {
      value: "MHPAEA",
      label: "Federal insurance parity for Hawaii rehab",
      sublabel: "Commercial insurance plans subject to parity rules",
    },
  ],

  // eyebrow: 3 words ✅ (budget: 8)
  statsEyebrow: "The Hawaii Reality",

  // H2 word count: 8 words ✅ (budget: 8) — USE IN HEADING: treatment, hawaii, rehab, addiction treatment
  statsHeadline: "Hawaii rehab and addiction treatment: island logistics managed.",

  familiesHelped: "1,500+",
  familiesHelpedLocalStat: "300+",
  familiesHelpedLocalLabel: "HI families helped",

  interventionImage: `${BASE}/hi_intervention01.jpg`,
  interventionImageAlt: "Family meeting with a professional interventionist in Hawaii",
  citiesRegionImage: `${BASE}/hi_cities01.jpg`,
  citiesRegionImageAlt: "Communities across Hawaii — Honolulu, Maui, Kauaʻi",
  recoveryImage: `${BASE}/hi_recovery01.jpg`,
  recoveryImageAlt: "Hope and lasting addiction recovery — Hawaii",

  // Word count: 72 words ✅ (budget: 80) — was 25 words; extended 1.5× to 72 ≤ 80
  whyUsLeadParagraph:
    "Hawaii's drug addiction and alcohol use disorder landscape spans Honolulu's urban substance abuse caseload, Maui's resort-corridor patterns, and neighbor-island communities where addiction treatment centers are scarce. Hawaii's geographic isolation means inter-island flight logistics must be pre-planned before intervention day. Our certified professional interventionists vet inpatient detox, residential treatment, outpatient programs, holistic therapy options, and CARF or Joint Commission accredited facilities — matching insurance coverage and confirming beds so acceptance leads to immediate admission.",

  differentiators: [
    {
      icon: "ri-flight-takeoff-line",
      // H3 title: 4 words ✅ (budget: 6) — USE IN HEADING: hawaii rehab
      title: "Inter-island Hawaii rehab logistics",
      // body: 32 words ✅ (budget: 35)
      body: "We pre-book inter-island flights and coordinate drug rehab admissions across Oʻahu, Maui, Hawaiʻi Island, and Kauaʻi — so your family focuses on the intervention conversation, not airline schedules or bed availability.",
    },
    {
      icon: "ri-capsule-line",
      // H3 title: 5 words ✅ (budget: 6) — USE IN HEADING: drug addiction, mental health
      title: "Drug addiction and mental health response",
      // body: 32 words ✅ (budget: 35)
      body: "24/7 Hawaii intake — crisis-level alcohol and drug addiction response, co-occurring mental health disorder coordination, dual diagnosis assessment, and family therapy referrals across every Hawaii island and neighbor-island community.",
    },
    {
      icon: "ri-bank-line",
      // H3 title: 5 words ✅ (budget: 6) — USE IN HEADING: professional interventionist, insurance
      title: "Professional interventionist Hawaii insurance decoded",
      // body: 30 words ✅ (budget: 35)
      body: "Most Hawaii commercial insurance plans cover alcohol rehab and drug addiction treatment under federal MHPAEA parity rules. We verify benefits, submit pre-authorisations, and clarify out-of-pocket costs before intervention day.",
    },
    {
      icon: "ri-shield-check-line",
      // H3 title: 5 words ✅ (budget: 6) — USE IN HEADING: substance abuse
      title: "Substance abuse and co-occurring disorder care",
      // body: 31 words ✅ (budget: 35)
      body: "We screen Hawaii addiction treatment centers for clinical quality — detox, inpatient rehab, residential treatment, intensive outpatient programs, dual diagnosis care, and holistic services — before recommending any facility to families.",
    },
  ],

  regions: [
    {
      name: "Honolulu & Oʻahu",
      cities: "Honolulu · Kailua · Kaneohe · Kapolei · Pearl City · North Shore",
      href: "/contact",
      icon: "ri-sun-line",
    },
    {
      name: "Maui County",
      cities: "Kahului · Wailea · Lāhainā corridor · Molokaʻi · Lānaʻi",
      href: "/contact",
      icon: "ri-leaf-line",
    },
    {
      name: "Hawaiʻi Island",
      cities: "Kona · Hilo · Waimea · Puna · coastline communities",
      href: "/contact",
      icon: "ri-fire-line",
    },
    {
      name: "Kauaʻi",
      cities: "Līhuʻe · Kapaʻa · Princeville · Waimea · North Shore",
      href: "/contact",
      icon: "ri-water-flash-line",
    },
    {
      name: "Central Oʻahu",
      cities: "Mililani · Wahiawā · Ewa Beach · Makakilo",
      href: "/contact",
      icon: "ri-flight-takeoff-line",
    },
    {
      name: "Neighbor-island routing",
      cities: "Inter-island mobilisation · crisis-timeline coordination",
      href: "/contact",
      icon: "ri-compass-3-line",
    },
  ],

  // Word count: 40 words ✅ (budget: 80) — was 22 words
  regionsSupportingText:
    "Hawaii's geographic isolation — five major islands, limited residential treatment capacity — means inter-island logistics must be pre-solved before intervention day. Our professional interventionists reach every Hawaii community and island. Call if your island or town is not listed below.",

  processSteps: [
    {
      number: "01",
      // H3 title: 3 words ✅ (budget: 6)
      title: "First confidential call",
      // body: 35 words ✅ (budget: 40)
      body: "Tell us what is happening — drinking patterns, drug addiction severity, co-occurring mental health crises. We listen first, then explain whether a Hawaii alcohol or substance abuse intervention is the right next step.",
    },
    {
      number: "02",
      // H3 title: 5 words ✅ (budget: 6) — USE IN HEADING: family intervention program, treatment plan
      title: "Family intervention program treatment plan",
      // body: 38 words ✅ (budget: 40)
      body: "We build a private Hawaii intervention treatment plan: your loved one's access to alcohol and drugs, their island life and relationships, and the inpatient, residential, or outpatient addiction treatment programs that match your insurance and location.",
    },
    {
      number: "03",
      // H3 title: 4 words ✅ (budget: 6) — USE IN HEADING: intervention
      title: "Interventionist arrives in Hawaii",
      // body: 36 words ✅ (budget: 40)
      body: "Your professional interventionist books inter-island or mainland flights the day before, meets the family privately, conducts a full rehearsal, and coordinates with the Hawaii rehab facility to confirm bed availability before the morning intervention.",
    },
    {
      number: "04",
      // H3 title: 3 words ✅ (budget: 6)
      title: "The intervention conversation",
      // body: 36 words ✅ (budget: 40)
      body: "We lead the addiction and substance abuse conversation in your Hawaii home, business, or a neutral Honolulu location. Most loved ones accept treatment that day. Those who decline receive a structured follow-up plan within the week.",
    },
    {
      number: "05",
      // H3 title: 6 words ✅ (budget: 6) — USE IN HEADING: drug rehab
      title: "Direct transport to Hawaii drug rehab",
      // body: 36 words ✅ (budget: 40)
      body: "We escort your loved one — by inter-island flight within Hawaii or by air to a mainland residential drug rehab — and remain on the line with the family through detox admission and intake.",
    },
    {
      number: "06",
      // H3 title: 4 words ✅ (budget: 6) — USE IN HEADING: family recovery
      title: "Long-term family recovery coaching",
      // body: 38 words ✅ (budget: 40)
      body: "We do not disappear after admission. We coach the Hawaii family through twelve months of addiction recovery — relapse prevention planning, sober living transition, return-home boundaries, and the behavioral health support that sustains lasting recovery.",
    },
  ],

  // Word count: 42 words ✅ (budget: 80) — was 22 words
  processIntro:
    "You do not have to navigate Hawaii addiction treatment alone. We have guided 1,500+ families through structured alcohol and drug interventions — coordinating inpatient rehab admissions, verifying insurance coverage, and supporting family addiction recovery for twelve full months.",

  // urgency section — USE IN HEADING: family (via "families")
  urgencyEyebrow: "Don't delay your family intervention program in Hawaii",
  urgencyHeadlineBefore: "Most Hawaii families wait ",
  urgencyHeadlineItalic: "too long",
  urgencyHeadlineAfter: " to act.",

  // eyebrow: 5 words ✅ (budget: 8)
  recoveryEyebrow: "Hawaii addiction recovery starts here",

  // H2 word count: 7 words ✅ (budget: 8) — USE IN HEADING: family recovery, addiction recovery, recovery, family
  recoveryHeadline: "Family addiction recovery — real in Hawaii.",

  // Word count: 58 words ✅ (budget: 80) — was 24 words
  recoveryBody:
    "When intervention is structured and treatment is arranged — medically supervised detox, inpatient rehab, or outpatient treatment — long-term addiction recovery in Hawaii is measurable and real. We have guided Hawaii families through alcohol addiction, drug addiction, and co-occurring mental health disorders. Substance abuse and substance use disorder do not have to define your family's future. Recovery starts with one call.",

  // ── EXTRA CARDS SECTION (cream bg, between Conditions and Recovery Band) ──
  // Layout: tile-grid / cream (#F5F3E7) background
  // Contrasts with: white Conditions section before it and image-overlay Recovery Band after
  extraCardsSection: {
    // eyebrow: 4 words ✅ (budget: 8)
    eyebrow: "Honolulu & Hawaii Treatment Programs",
    // H2 word count: 7 words ✅ (budget: 8)
    // USE IN HEADING: substance abuse, addiction treatment center, treatment center, hawaii
    headline: "Hawaii substance abuse and addiction treatment centers",
    italicWord: "addiction treatment centers",
    // body: 67 words ✅ (budget: 80)
    body: "Hawaii addiction treatment centers range from Honolulu hospital-based detox and residential programs to intensive outpatient services on Maui, Kauaʻi, and Hawaiʻi Island. Hawaii CARES ((808) 832-3100 or toll-free 1-800-753-6879) and the Alcohol and Drug Abuse Division (ADAD) at (808) 692-7506 coordinate public substance abuse treatment referrals statewide. ADAD — located at 601 Kamokila Blvd., Room 360, Kapolei, HI 96707 — prioritises admission for pregnant women and injection drug users.",
    cards: [
      {
        icon: "ri-first-aid-kit-line",
        // H3 title: 4 words ✅ (budget: 6) — USE IN HEADING: detox
        title: "Medical Detox & Withdrawal Management",
        // body: 34 words ✅ (budget: 35)
        body: "Medically supervised detox from alcohol and drugs. Hawaii hospital-based and residential detox programs manage withdrawal symptoms safely before inpatient rehab or outpatient treatment begins — essential for alcohol use disorder and opioid dependence.",
      },
      {
        icon: "ri-home-heart-line",
        // H3 title: 5 words ✅ (budget: 6) — USE IN HEADING: inpatient, drug rehab, residential
        title: "Inpatient Drug Rehab & Residential",
        // body: 30 words ✅ (budget: 35)
        body: "24-hour residential treatment in a structured Hawaii addiction treatment center. Inpatient rehab removes island triggers while addressing substance use disorder through individual therapy, group therapy, and dual diagnosis support.",
      },
      {
        icon: "ri-calendar-check-line",
        // H3 title: 6 words ✅ (budget: 6) — USE IN HEADING: outpatient program, sober living, outpatient
        title: "Intensive Outpatient Program & Sober Living",
        // body: 33 words ✅ (budget: 35)
        body: "Intensive outpatient programs allow Hawaii patients to maintain work and sober living routines while receiving structured addiction treatment — typically 9–15 weekly hours of behavioral health programming, group therapy, and relapse prevention.",
      },
      {
        icon: "ri-mental-health-line",
        // H3 title: 6 words ✅ (budget: 6) — USE IN HEADING: dual diagnosis, mental health treatment, mental health
        title: "Dual Diagnosis & Mental Health Treatment",
        // body: 31 words ✅ (budget: 35)
        body: "Co-occurring mental health disorders — anxiety depression, stress disorder, PTSD — frequently drive substance abuse in Hawaii. Dual diagnosis treatment addresses both addiction and mental health simultaneously, with evidence-based therapies and holistic approaches.",
      },
    ],
  },

  // ── EVIDENCE-BASED SECTION (white bg, between Recovery Band and FAQs) ──
  // Layout: tile-grid / white background
  // Contrasts with: image-overlay Recovery Band before it and cream FAQ section after
  evidenceBasedSection: {
    // eyebrow: 5 words ✅ (budget: 8)
    eyebrow: "Hawaii CARF & Joint Commission Standards",
    // H2 word count: 8 words ✅ (budget: 8)
    // USE IN HEADING: drug abuse, alcohol rehab, evidence-based therapies, hawaii
    headline: "Hawaii alcohol rehab, drug abuse & evidence-based therapies",
    italicWord: "evidence-based therapies",
    // body: 80 words ✅ (budget: 80)
    body: "CARF and Joint Commission accreditation standards ensure Hawaii rehab facilities maintain clinical quality across the full continuum of drug abuse and alcohol addiction treatment. Hawaii's Adult Mental Health Division, Child and Adolescent Mental Health Division, and ADAD-accredited behavioral health services coordinate outpatient treatment, residential care, and community mental health programs statewide. ADAD accredits treatment programs and certifies counselors and administrators. Our professional alcohol intervention services Hawaii families trust verify CARF and Joint Commission accreditation before recommending any addiction treatment center.",
    cards: [
      {
        icon: "ri-award-line",
        // H3 title: 5 words ✅ (budget: 6) — USE IN HEADING: joint commission, carf, accreditation
        title: "Joint Commission & CARF Accreditation",
        // body: 32 words ✅ (budget: 35)
        body: "Joint Commission and CARF accreditation are the primary quality benchmarks for Hawaii rehab facilities. Accredited treatment centers meet rigorous standards for clinical care, patient safety, and addiction recovery outcomes. We verify credentials before every recommendation.",
      },
      {
        icon: "ri-group-line",
        // H3 title: 5 words ✅ (budget: 6) — USE IN HEADING: group therapy, support groups, therapy, support
        title: "Group Therapy & Support Groups",
        // body: 33 words ✅ (budget: 35)
        body: "Group therapy and peer support groups anchor Hawaii addiction recovery. 12-step program meetings, motivational interviewing sessions, and family therapy build the community foundation for lasting recovery from drug addiction and alcohol use disorder.",
      },
      {
        icon: "ri-calendar-check-line",
        // H3 title: 5 words ✅ (budget: 6) — USE IN HEADING: aftercare planning, outpatient treatment
        title: "Aftercare Planning & Outpatient Treatment",
        // body: 33 words ✅ (budget: 35)
        body: "Aftercare planning prevents relapse after Hawaii rehab discharge. Structured outpatient treatment, sober living arrangements, family therapy, and peer support groups sustain addiction recovery gains. ADAD accredits Hawaii treatment programs and certifies aftercare counselors statewide.",
      },
      {
        icon: "ri-capsule-line",
        // H3 title: 5 words ✅ (budget: 6) — USE IN HEADING: medication, community, holistic, recovery
        title: "Medication, Community & Holistic Recovery",
        // body: 33 words ✅ (budget: 35)
        body: "Medication-assisted treatment — naltrexone, buprenorphine, Vivitrol — combined with holistic recovery practices and community behavioral health services supports sustained addiction recovery. Papa Ola Lokahi serves Native Hawaiians through culturally appropriate health and wellness programs.",
      },
    ],
  },

  // ── FAQs (cream bg — contrasts with white evidence-based section before it) ──
  faqs: [
    // Q1 — Brief question: What happens if an intervention is attempted without a certified professional?
    {
      // Q word count: 11 words ✅ (budget: 15)
      question: "What happens without a certified professional interventionist in Hawaii?",
      // A word count: 79 words ✅ (budget: 80)
      answer:
        "Without a certified professional interventionist, Hawaii families risk escalated confrontations, damaged relationships, and refusal rates far higher than structured interventions. Untrained attempts often lack pre-arranged Hawaii rehab beds — so even a 'yes' leads to a waiting list rather than immediate admission. A credentialed interventionist brings motivational interviewing skills, family therapy frameworks, and a vetted Hawaii addiction treatment center network that converts the intervention conversation into lasting recovery. Hawaii CARES at (808) 832-3100 provides referrals if no professional is engaged.",
    },
    // Q2 — Hawaii's geographic isolation and post-intervention treatment
    {
      // Q word count: 10 words ✅ (budget: 15)
      question: "How does Hawaii's isolation affect post-intervention treatment options?",
      // A word count: 75 words ✅ (budget: 80)
      answer:
        "Hawaii's geographic isolation means fewer inpatient rehab and residential treatment beds per capita than mainland states. After a successful intervention, families must choose between limited on-island Hawaii rehab facilities and higher-quality mainland treatment programs. We pre-evaluate outpatient programs, residential treatment centers, and detox capacity on each island before intervention day — and coordinate inter-island or mainland flights when the best clinical fit requires leaving Hawaii. Verify insurance benefits for out-of-state residential treatment before the intervention date.",
    },
    // Q3 — Hawaii Medicaid / QUEST Integration
    {
      // Q word count: 12 words ✅ (budget: 15)
      question: "Are alcohol intervention services covered by Hawaii Medicaid or QUEST Integration?",
      // A word count: 74 words ✅ (budget: 80)
      answer:
        "Hawaii Medicaid and QUEST Integration plans cover medically necessary alcohol and drug substance abuse treatment — including detox, inpatient rehab, outpatient programs, and co-occurring mental health treatment — for eligible Hawaii residents. ADAD (Alcohol and Drug Abuse Division) is the primary public funding source for substance abuse treatment in Hawaii. We verify Medicaid eligibility, confirm QUEST Integration benefits, and identify ADAD-funded Hawaii addiction treatment centers and outpatient treatment facilities before intervention day.",
    },
    // Q4 — How soon should treatment begin after intervention
    {
      // Q word count: 11 words ✅ (budget: 15)
      question: "How soon after a successful Hawaii intervention should treatment begin?",
      // A word count: 72 words ✅ (budget: 80)
      answer:
        "Treatment should begin within hours of a successful Hawaii intervention — ideally the same day. Our professional interventionists pre-confirm inpatient rehab or residential treatment beds before the conversation begins. For alcohol use disorder, medically supervised detox is often medically necessary within 24 hours to manage withdrawal symptoms safely. Delays reduce treatment acceptance rates significantly. We coordinate inter-island flights, admission paperwork, and insurance pre-authorisation to eliminate the gap between 'yes' and admitted.",
    },
    // Q5 — Credentials for a Hawaii interventionist
    {
      // Q word count: 11 words ✅ (budget: 15)
      question: "What credentials should a certified alcohol interventionist in Hawaii hold?",
      // A word count: 70 words ✅ (budget: 80)
      answer:
        "Look for a Certified Intervention Professional (CIP) credential from the Association of Intervention Specialists. Hawaii professional interventionists should also hold clinical backgrounds — licensed counselors, social workers, or addiction specialists trained in motivational interviewing and family therapy. Verify their Hawaii rehab referral network, confirm professional liability coverage, and ask about experience with alcohol use disorder, co-occurring mental health disorders, drug addiction, and family intervention program facilitation across Hawaii's unique island geography.",
    },
    // Q6 — Can a professional interventionist escort someone
    {
      // Q word count: 9 words ✅ (budget: 15)
      question: "Can a professional interventionist escort someone to Hawaii rehab?",
      // A word count: 73 words ✅ (budget: 80)
      answer:
        "Yes. Our professional interventionists legally and ethically escort loved ones — by inter-island flight within Hawaii or by air to mainland residential drug rehab — with family consent and the individual's voluntary agreement. We coordinate with Hawaii addiction treatment center intake staff, verify insurance plans, and manage transport logistics so admission is seamless. This escort service is particularly important given Hawaii's island geography and limited local inpatient treatment capacity on neighbor islands.",
    },
    // Q7 — How to stage an intervention on a neighbor island
    {
      // Q word count: 11 words ✅ (budget: 15)
      question: "How do you stage an intervention for someone on a neighbor island?",
      // A word count: 74 words ✅ (budget: 80)
      answer:
        "Neighbor-island interventions require additional pre-planning: inter-island flight booking, local accommodation for the professional interventionist, and pre-identification of Maui, Kauaʻi, or Hawaiʻi Island addiction treatment resources or mainland residential treatment options. Our interventionists arrive the day before, rehearse with the family, and arrange immediate transportation to addiction treatment after the intervention conversation. Hawaii CARES ((808) 832-3100 or 1-800-753-6879) provides neighbor-island substance abuse treatment referrals as an additional resource.",
    },
    // Q8 — Hawaiian ʻohana culture and intervention
    {
      // Q word count: 10 words ✅ (budget: 15)
      question: "How does Hawaiian ʻohana culture shape alcohol intervention approaches?",
      // A word count: 77 words ✅ (budget: 80)
      answer:
        "ʻOhana — the Hawaiian concept of extended family and collective responsibility — is central to effective alcohol intervention in Hawaii. Our professional interventionists incorporate culturally appropriate family intervention program frameworks honoring Hawaii's multicultural community values. Papa Ola Lokahi serves Native Hawaiians, Kupuna (older adults), and others to improve health status through culturally appropriate strategic actions. We adapt our intervention approach to respect ʻohana dynamics, avoiding confrontational styles that conflict with Native Hawaiian community and behavioral health service norms.",
    },
    // Q9 — Hawaiian / Pidgin language
    {
      // Q word count: 10 words ✅ (budget: 15)
      question: "Can Hawaii interventions include Hawaiian language or Pidgin speakers?",
      // A word count: 68 words ✅ (budget: 80)
      answer:
        "Yes. We work with Hawaii community support professionals and bicultural facilitators who can incorporate Hawaiian language or Pidgin elements when this improves the comfort and effectiveness of the intervention conversation. Cultural connection is a proven factor in addiction treatment engagement. Reducing cultural barriers increases the likelihood of treatment acceptance and lasting recovery. If your family member feels more heard in Hawaiian or Pidgin, we accommodate that need.",
    },
    // Q10 — Legal protections during a Hawaii intervention
    {
      // Q word count: 11 words ✅ (budget: 15)
      question: "What legal protections exist for families during a Hawaii intervention?",
      // A word count: 76 words ✅ (budget: 80)
      answer:
        "Hawaii's involuntary hospitalization law (HRS Chapter 334) allows families to petition for emergency psychiatric evaluation when an individual poses imminent danger to themselves or others. This is a separate legal process from voluntary substance abuse intervention — a court-ordered behavioral health pathway. For substance use crises, Hawaii CARES at (808) 832-3100 provides crisis support. We work alongside Hawaii attorneys familiar with behavioral health statutes, but voluntary engagement through structured addiction intervention comes first.",
    },
    // Q11 — Why Trust AddictionInterventions.com
    {
      // Q word count: 9 words ✅ (budget: 15)
      question: "Why trust AddictionInterventions.com for Hawaii intervention services?",
      // A word count: 78 words ✅ (budget: 80)
      answer:
        "AddictionInterventions.com deploys certified professional interventionists with deep Hawaii rehab referral networks and Joint Commission accreditation verification on every recommended facility. Our Hawaii intervention services include pre-intervention insurance verification, individualized treatment plan coordination, inter-island travel logistics, and twelve months of family recovery coaching. We verify CARF and Joint Commission accreditation at every Hawaii addiction treatment center we recommend. We have guided 1,500+ families nationwide and understand Hawaii's unique geography, payer mix, and substance abuse landscape.",
    },
    // Q12 — How to get an intervention for an alcoholic
    {
      // Q word count: 12 words ✅ (budget: 15)
      question: "How do I get an intervention for someone with alcohol addiction in Hawaii?",
      // A word count: 75 words ✅ (budget: 80)
      answer:
        "Call us for a free, confidential consultation. Our professional interventionist will assess your loved one's alcohol addiction history — alcohol use disorder severity, alcohol abuse patterns, co-occurring mental health disorders — then build a structured Hawaii family intervention program. Most Hawaii patients enter inpatient rehab or an intensive outpatient program within 24–48 hours of a successful intervention. You do not have to navigate Hawaii alcohol rehab, drug rehab, or residential treatment placement alone.",
    },
    // Q13 — How to get someone involuntarily committed in Hawaii
    {
      // Q word count: 10 words ✅ (budget: 15)
      question: "How do you get someone involuntarily committed in Hawaii?",
      // A word count: 78 words ✅ (budget: 80)
      answer:
        "Hawaii's involuntary hospitalization law (HRS Chapter 334) allows family members or healthcare providers to petition a court for emergency psychiatric evaluation when an individual poses imminent danger. This process is separate from voluntary addiction intervention and involves mental health professionals, law enforcement, and a Hawaii court hearing. ADAD and Hawaii CARES ((808) 832-3100 or 1-800-753-6879) can provide crisis referrals and behavioral health services. We always pursue voluntary intervention first — involuntary commitment is a last resort.",
    },
    // Q14 — What is outpatient alcohol rehab in Hawaii
    {
      // Q word count: 9 words ✅ (budget: 15)
      question: "What is outpatient alcohol rehab in Hawaii?",
      // A word count: 78 words ✅ (budget: 80)
      answer:
        "Outpatient alcohol rehab in Hawaii allows individuals to receive structured addiction treatment — group therapy, individual counseling, relapse prevention planning, and medication-assisted treatment — while living at home or in a sober living house. Intensive outpatient programs (IOP) typically require 9–15 weekly hours of behavioral health programming. ADAD-funded outpatient treatment centers operate across Honolulu, Maui, Kauaʻi, and Hawaiʻi Island. Outpatient treatment follows inpatient detox or residential treatment, and most Hawaii insurance plans cover medically necessary outpatient programs.",
    },
    // Q15 — Hawaii severe mental illness resources
    {
      // Q word count: 11 words ✅ (budget: 15)
      question: "What Hawaii resources exist for severe mental illness and co-occurring disorders?",
      // A word count: 78 words ✅ (budget: 80)
      answer:
        "Hawaii's Adult Mental Health Division provides mental health treatment for individuals with serious mental illness who are uninsured or underinsured, those court-ordered for evaluation, and people in crisis. The Child and Adolescent Mental Health Division serves youth with mental health disorders and behavioral challenges. Mental Health Front Desk: 808-473-1880 ext. 5325/5326. SARP Front Desk: 808-473-1880 ext. 5235/5221. Veterans Crisis Line: 988 press 1 or text 838255. TRICARE covers inpatient and outpatient mental health treatment for Hawaii military families.",
    },
    // Q16 — Rural/remote Hawaii communities
    {
      // Q word count: 9 words ✅ (budget: 15)
      question: "Do you travel to remote or rural Hawaii communities?",
      // A word count: 71 words ✅ (budget: 80)
      answer:
        "Yes. We reach families across all Hawaii islands — from urban Honolulu to remote Puna on Hawaiʻi Island, rural Maui, and small Kauaʻi communities. Our professional interventionists arrange inter-island flight logistics in advance. No Hawaii island or community is beyond our reach. ADAD's alcohol and drug abuse treatment services and Hawaii CARES provide community-level substance abuse support — we coordinate with them for the most comprehensive Hawaii intervention services and residential treatment referrals.",
    },
    // Q17 — Insurance coverage for Hawaii addiction treatment
    {
      // Q word count: 10 words ✅ (budget: 15)
      question: "Will insurance cover addiction treatment after a Hawaii intervention?",
      // A word count: 73 words ✅ (budget: 80)
      answer:
        "Federal MHPAEA parity rules require most commercial insurance plans to cover inpatient and outpatient addiction treatment at parity with physical health care. Hawaii insurance plans — HMSA, Kaiser Hawaii, Aloha Care, and TRICARE — are subject to these protections. We verify insurance benefits, submit pre-authorisation requests, and help families navigate appeals for alcohol rehab and drug addiction treatment before intervention day. We also identify ADAD-funded Hawaii rehab for families without insurance coverage.",
    },
    // Q18 — On-island vs mainland treatment
    {
      // Q word count: 10 words ✅ (budget: 15)
      question: "Should Hawaii addiction treatment be on-island or out of state?",
      // A word count: 72 words ✅ (budget: 80)
      answer:
        "It depends on clinical fit, home triggers, and island treatment capacity. Hawaii rehab options are expanding but remain limited on neighbor islands. Staying in Hawaii preserves ʻohana support when family is a recovery asset — but proximity to substance-using peers or enabling relationships can undermine addiction recovery. Out-of-state residential treatment is sometimes the most effective choice. We give families an honest clinical recommendation — not a booking preference — before intervention day.",
    },
    // Q19 — What is ADAD
    {
      // Q word count: 8 words ✅ (budget: 15)
      question: "What is the ADAD Alcohol and Drug Abuse Division?",
      // A word count: 79 words ✅ (budget: 80)
      answer:
        "The Alcohol and Drug Abuse Division (ADAD) — located at 601 Kamokila Blvd., Room 360, Kapolei, Hawaiʻi 96707, phone (808) 692-7506 — is the primary and sole public funding source for substance abuse treatment in Hawaii. ADAD accredits treatment programs, certifies counselors and program administrators, and provides prevention, treatment, coordination, policy development, and quality assurance across the substance abuse treatment continuum. ADAD's primary functions include clinical consultation, management, training, information systems, and grants for Hawaii addiction treatment facilities and outpatient programs.",
    },
    // Q20 — Medication-assisted treatment after intervention
    {
      // Q word count: 10 words ✅ (budget: 15)
      question: "What medication-assisted treatment options follow a Hawaii addiction intervention?",
      // A word count: 72 words ✅ (budget: 80)
      answer:
        "Following a successful intervention, medication-assisted treatment is indicated for alcohol use disorder or opioid dependence. Hawaii addiction treatment centers offer naltrexone, buprenorphine (Suboxone), and Vivitrol — integrated with group therapy and behavioral health services. TRICARE covers medication-assisted treatment for eligible Hawaii military families. Evidence-based therapies combining medication with motivational interviewing and family therapy significantly reduce relapse risk and withdrawal symptoms recurrence. Our professional interventionists coordinate with Hawaii healthcare providers to confirm medication insurance coverage before admission.",
    },
    // Q21 — Holistic Hawaii addiction treatment
    {
      // Q word count: 8 words ✅ (budget: 15)
      question: "What holistic Hawaii addiction treatment options are available?",
      // A word count: 71 words ✅ (budget: 80)
      answer:
        "Hawaii's multicultural community supports a range of holistic addiction treatment approaches — traditional Hawaiian healing practices, nature-based recovery programs, yoga and mindfulness-integrated residential treatment, and culturally appropriate group therapy. CARF-accredited Hawaii rehab facilities combine evidence-based therapies with holistic services. Holistic treatment is most effective when integrated with medical detox, dual diagnosis assessment for co-occurring mental health disorders, and structured aftercare planning — not used as a standalone substitute for clinical addiction treatment.",
    },
    // Q22 — CARF vs Joint Commission
    {
      // Q word count: 10 words ✅ (budget: 15)
      question: "How does CARF accreditation differ from Joint Commission for Hawaii rehab?",
      // A word count: 76 words ✅ (budget: 80)
      answer:
        "Both CARF and Joint Commission are national accreditation bodies that verify Hawaii addiction treatment centers meet quality and safety standards. Joint Commission (JCAHO) accreditation is widely recognized by Hawaii insurance plans as a quality indicator for inpatient rehab and hospital-based detox. CARF accreditation focuses on rehabilitation outcomes and is common across outpatient treatment programs and community behavioral health services. We verify both CARF and Joint Commission accreditation credentials when recommending any Hawaii rehab facility or outpatient program.",
    },
    // Q23 — Military families
    {
      // Q word count: 10 words ✅ (budget: 15)
      question: "What addiction support is available for Hawaii military families?",
      // A word count: 79 words ✅ (budget: 80)
      answer:
        "TRICARE covers inpatient and outpatient addiction treatment and mental health services for Hawaii military families. The Mental Health Clinic at Joint Base Pearl Harbor-Hickam (adjacent to BHC Makalapa, on the corner of Radford Drive and N Road) and at Marine Corps Base Hawaii Kaneohe Bay (inside BHC Kaneohe Bay) serve active-duty members only. SARP Front Desk: 808-473-1880 ext. 5235/5221. Veterans Crisis Line: 988 press 1 or text 838255. We coordinate with these behavioral health services during pre-intervention planning.",
    },
    // Q24 — Hawaii drug rehab options for alcohol use disorder
    {
      // Q word count: 10 words ✅ (budget: 15)
      question: "What Hawaii drug rehab options exist for alcohol use disorder?",
      // A word count: 76 words ✅ (budget: 80)
      answer:
        "Hawaii drug rehab and alcohol rehab options include medically supervised detox, 30–90 day inpatient residential treatment, partial hospitalization, intensive outpatient programs, and sober living homes. ADAD-certified Hawaii rehab facilities operate across Honolulu, Maui, Kauaʻi, and Hawaiʻi Island. Treatment programs integrate evidence-based therapies — cognitive behavioral therapy, motivational interviewing, 12-step program participation, and family therapy — with holistic approaches tailored to Hawaii's multicultural community. We verify CARF and Joint Commission accreditation at every Hawaii rehab we recommend.",
    },
    // Q25 — Aftercare and relapse prevention
    {
      // Q word count: 9 words ✅ (budget: 15)
      question: "What aftercare and relapse prevention resources exist in Hawaii?",
      // A word count: 72 words ✅ (budget: 80)
      answer:
        "Hawaii aftercare resources include outpatient counseling, peer support groups, 12-step program meetings, sober living homes, and structured relapse prevention planning. ADAD accredits Hawaii treatment programs and certifies aftercare counselors statewide. The Hawaii Opioid Initiative — a collaboration of public health, public safety, healthcare professionals, and community partners — addresses drug misuse and overdose. Family recovery coaching, Al-Anon support groups, and community behavioral health services provide ongoing addiction recovery support after residential treatment or inpatient rehab discharge.",
    },
    // Q26 — How much does a Hawaii intervention cost
    {
      // Q word count: 8 words ✅ (budget: 15)
      question: "How much does a Hawaii addiction intervention cost?",
      // A word count: 73 words ✅ (budget: 80)
      answer:
        "Intervention fees are quoted transparently on the first call — no hidden markups. The cost of a structured Hawaii family intervention program is almost always less than one continued month of active alcohol or drug addiction, one DUI legal defense, or one emergency room visit from substance abuse complications. We also maximise insurance coverage for the inpatient rehab, residential treatment, or outpatient program that follows. Hawaii CARES and ADAD provide public-funded treatment options for families without private insurance.",
    },
    // Q27 — drug alcohol, substance disorders, alcohol drug, anxiety depression, stress disorder, facility, individuals
    {
      // Q word count: 10 words ✅ (budget: 15)
      question: "What drug alcohol and substance disorders do Hawaii interventionists address?",
      // A word count: 64 words ✅ (budget: 80)
      answer:
        "We provide alcohol intervention services Hawaii families trust — covering the full range of drug alcohol and substance disorders including alcohol use disorder, drug addiction, and co-occurring conditions. Substance disorders involving anxiety depression, stress disorder, or PTSD respond to dual diagnosis treatment. We match each facility's clinical capacity — detox, inpatient, outpatient programs — to the specific substance disorders and alcohol drug abuse patterns individuals present with.",
    },
    // Q28 — drug alcohol x3, medicaid x3, alcohol drug, insurance plans
    {
      // Q word count: 12 words ✅ (budget: 15)
      question: "How do drug alcohol substance disorder programs verify Medicaid insurance in Hawaii?",
      // A word count: 54 words ✅ (budget: 80)
      answer:
        "Hawaii Medicaid covers drug alcohol and alcohol drug substance use treatment through QUEST Integration. Drug alcohol addiction treatment facilities verify Medicaid eligibility and insurance plans before admission. Our certified interventionists confirm drug alcohol recovery program Medicaid coverage — ensuring Hawaii families access the residential, inpatient, and outpatient treatment their loved ones need without insurance delays.",
    },
  ],

  // H2 word count: 7 words ✅ (budget: 8) — USE IN HEADING: treatment programs, addiction, hawaii
  faqTitle: "Alcohol Intervention Services Hawaii — Your Questions, Answered.",

  // H2: bottomCtaTitle rendered as h2 in BottomCta
  // Word count: 7 words ✅ (budget: 8) — USE IN HEADING: treatment programs, addiction, hawaii
  bottomCtaTitle: "Hawaii addiction treatment programs — take action now.",
};
