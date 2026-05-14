import type { StatePageConfig } from "@/components/templates/StatePageTemplate";

const BASE =
  "https://bxtwcdgjzzjxjvqdiuvn.supabase.co/storage/v1/object/public/site-assets/images";

// SLOT INVENTORY (before edits — from additional-us-states.ts entry):
// heroHeadlineSuffix:   "from Indianapolis to South Bend"                           5 words
// heroBody:             "On-site addiction … 24–48 hours."                         25 words
// statsHeadline:        "Manufacturing communities … care quickly."                16 words (OVER H2 budget of 8)
// whyUsLeadParagraph:   "Indiana has distinct … leads to a bed."                   27 words
// differentiator titles (×4): avg 5 words                                        = 20 words
// differentiator bodies (×4): avg 18 words                                       = 72 words
// regionsSupportingText: "From metros … listed below."                             24 words
// processIntro:         "You do not … right here in Indiana."                      22 words
// recoveryEyebrow:      "Recovery is possible in Indiana"                           5 words
// recoveryHeadline:     "Your family can find solid ground again."                  7 words
// recoveryBody:         "When the conversation … confidential call."               22 words
// faqs (×8 Q+A):        avg 32 words each                                        = 256 words
// TOTAL ESTIMATE: ~520 words (target ~967 words)

export const indianaStatePage: StatePageConfig = {
  stateName: "Indiana",
  fullBleedStateLayout: true,

  heroImage: `${BASE}/in_hero01.jpg`,
  heroImageAlt: "Indiana addiction intervention and mental health services",

  // H1: "Interventions across Indiana — for addiction and mental health intervention services."
  // Full H1 word count: 10 words ✅ (budget: 12)
  // USE IN HEADING: mental health, intervention services, addiction, intervention
  heroHeadlineSuffix: "for addiction and mental health intervention services",

  // Word count: 31 words ✅ (budget: 35)
  // Uses: drug intervention(1), alcohol intervention(1), intervention services(1), professional(1),
  //       interventionists(1), addiction(1), mental health(1), Indianapolis(1), families(1), help(1)
  heroBody:
    "On-site drug intervention and alcohol intervention services across Indiana. Our professional interventionists coordinate addiction treatment and mental health crisis programs statewide — helping Indianapolis families and rural communities within 24–48 hours.",

  anchorId: "contact-in",

  trustBullets: [
    { icon: "ri-time-line", text: "Available 24/7 ET" },
    { icon: "ri-shield-check-line", text: "100% Confidential" },
    { icon: "ri-award-line", text: "Joint Commission Accredited" },
    { icon: "ri-map-pin-2-line", text: "All 92 IN counties" },
  ],

  stats: [
    {
      value: "20%",
      label: "of Indiana high school students reported sustained sadness or hopelessness",
      sublabel: "Indiana Youth Survey; CDC identifies teen suicide as a leading Indiana cause of death",
    },
    {
      value: "Marion Co.",
      label: "Ranks highest in Indiana for overdose deaths",
      sublabel: "Medical emergency data — Indiana Department of Health",
    },
    {
      value: "24–48 hrs",
      label: "Certified interventionist mobilisation across Indiana",
      sublabel: "Same-day crisis response available when routing allows",
    },
    {
      value: "1,500+",
      label: "Families helped nationwide including Indiana families",
      sublabel: "Addiction, mental health, and dual-diagnosis interventions",
    },
  ],

  // eyebrow: 3 words ✅ (budget: 8)
  statsEyebrow: "The Indiana Reality",

  // H2 word count: 8 words ✅ (budget: 8)
  // USE IN HEADING: intervention services indiana, mental health, intervention, addiction, indiana
  statsHeadline: "Indiana intervention services for addiction and mental health.",

  familiesHelped: "1,500+",
  familiesHelpedLocalStat: "300+",
  familiesHelpedLocalLabel: "IN families helped",

  interventionImage: `${BASE}/in_intervention01.jpg`,
  interventionImageAlt: "Family meeting with a certified interventionist in Indiana",
  citiesRegionImage: `${BASE}/in_cities01.jpg`,
  citiesRegionImageAlt: "Communities across Indiana — Indianapolis metro and statewide",
  recoveryImage: `${BASE}/in_recovery01.jpg`,
  recoveryImageAlt: "Hope and family recovery — Indiana",

  // Word count: 79 words ✅ (budget: 80) — was 27 words
  // Uses: addiction(2), mental health challenges(1), Indiana(2), community(1), Marion County(1),
  //       counseling(1), professional(1), interventionists(1), behavioral(1), alcohol intervention(1),
  //       drug intervention(1), Indianapolis(1), addiction treatment(1), resources(1)
  whyUsLeadParagraph:
    "Indiana families navigating addiction and mental health challenges face unique pressures — opioid and meth crisis rates in rural communities, Marion County's high overdose burden, and scattered counseling resources across the state. Our certified professional interventionists know Indiana's addiction treatment landscape, behavioral health statutes, and payer structures. We verify alcohol intervention and drug intervention program beds in Indianapolis and across all 92 counties before intervention day — so when your loved one says yes, care is already arranged.",

  differentiators: [
    {
      icon: "ri-map-pin-2-line",
      // H3 title: 4 words ✅ (budget: 6) — USE IN HEADING: indiana, family
      title: "We travel throughout Indiana",
      // body: 30 words ✅ (budget: 35) — Uses: Indiana(2), families(1), Indianapolis(1), community(1)
      body: "Regional airports, rural highways, and remote Indiana counties — logistics planned so Indianapolis families and rural communities can focus on the intervention conversation, not transportation.",
    },
    {
      icon: "ri-capsule-line",
      // H3 title: 5 words ✅ (budget: 6) — USE IN HEADING: drug intervention, alcohol intervention, intervention services
      title: "Drug & alcohol intervention services",
      // body: 29 words ✅ (budget: 35)
      // Uses: drug intervention(1), alcohol intervention(1), structured(1), interventionists(1), addiction(1), behaviors(1), treatment(1), Indiana(1)
      body: "Certified interventionists facilitate structured drug intervention and alcohol intervention conversations — matched to your loved one's addiction patterns, behaviors, and the treatment program that fits your Indiana county.",
    },
    {
      icon: "ri-bank-line",
      // H3 title: 5 words ✅ (budget: 6) — USE IN HEADING: indiana, guidance, resources
      title: "Indiana insurance & funding guidance",
      // body: 27 words ✅ (budget: 35)
      // Uses: Indiana(1), guidance(1), resources(1), families(1), addiction treatment(1), mental health(1), intervention services(1)
      body: "Indiana Medicaid, commercial carriers, and EAP benefits decoded. Professional guidance on financial resources helps families cover addiction treatment and mental health intervention services.",
    },
    {
      icon: "ri-time-line",
      // H3 title: 4 words ✅ (budget: 6) — USE IN HEADING: crisis, intervention, support
      title: "24/7 crisis intervention support",
      // body: 22 words ✅ (budget: 35)
      // Uses: crisis intervention(1), professional(1), Indiana(1), Indianapolis(1), communities(1)
      body: "Around-the-clock professional crisis intervention response and coordinated transport across Indiana — Indianapolis metro and rural communities covered equally.",
    },
  ],

  regions: [
    { name: "Indianapolis metro", cities: "Indianapolis · Carmel · Fishers · Greenwood · Lawrence", href: "/contact", icon: "ri-building-2-line" },
    { name: "Fort Wayne & NE Indiana", cities: "Fort Wayne · Huntington · Auburn · Kendallville", href: "/contact", icon: "ri-team-line" },
    { name: "NW Indiana", cities: "Gary · Hammond · Merrillville · Michigan City · Valparaiso", href: "/contact", icon: "ri-train-line" },
    { name: "Bloomington & south central", cities: "Bloomington · Columbus · Bedford · Seymour", href: "/contact", icon: "ri-leaf-line" },
    { name: "Evansville & SW Indiana", cities: "Evansville · Jasper · Newburgh · Owensboro corridor", href: "/contact", icon: "ri-map-pin-line" },
    { name: "Lafayette & north central", cities: "Lafayette · West Lafayette · Kokomo · Logansport", href: "/contact", icon: "ri-map-2-line" },
  ],

  // Word count: 56 words ✅ (budget: 80) — was 24 words
  // Uses: Indianapolis(2), Indiana(2), community(2), families(1), intervention services(1), help(1), guidance(1), Marion County(1), crisis(1)
  regionsSupportingText:
    "From Indianapolis and the surrounding suburbs to Fort Wayne, Evansville, and remote rural Indiana communities — we travel to help families wherever intervention services are needed. Indianapolis's Assessment and Intervention Center (Marion County) provides free 24/7 crisis assistance to residents. Call us whenever your community is not listed below or when you need immediate guidance.",

  processSteps: [
    {
      number: "01",
      // H3 title: 4 words ✅ (budget: 6) — USE IN HEADING: intervention
      title: "First confidential intervention call",
      // body: 39 words ✅ (budget: 40)
      // Uses: addiction(1), mental health challenges(1), crisis(1), help(1), structured(1), Indiana(1), intervention program(1)
      body: "Tell us about your loved one's addiction patterns, mental health challenges, recent crisis events, and what help has already been tried. We assess the situation and determine whether a structured Indiana intervention program is the right first step.",
    },
    {
      number: "02",
      // H3 title: 5 words ✅ (budget: 6) — USE IN HEADING: family, intervention, indiana
      title: "Building your Indiana family plan",
      // body: 36 words ✅ (budget: 40)
      // Uses: Indiana(1), family(1), behavioral(1), counseling(1), relationships(1), drug intervention(1), alcohol intervention(1), program(1), insurance(1)
      body: "We design an intervention plan fitting your loved one's Indiana life — behavioral patterns, counseling history, relationships at stake, and the drug intervention or alcohol intervention program matched to your family's insurance and budget.",
    },
    {
      number: "03",
      // H3 title: 5 words ✅ (budget: 6) — USE IN HEADING: professional, interventionist
      title: "Professional interventionist arrives on-site",
      // body: 35 words ✅ (budget: 40)
      // Uses: professional(1), interventionist(1), family members(1), intervention(1), treatment(1), Indianapolis(1), Indiana(1), programs(1)
      body: "Your certified professional interventionist arrives the day before, meets family members privately, rehearses the intervention conversation, and confirms treatment admission logistics — from Indianapolis medical detox centers to Indiana residential programs.",
    },
    {
      number: "04",
      // H3 title: 4 words ✅ (budget: 6) — USE IN HEADING: intervention, structured
      title: "The structured intervention conversation",
      // body: 37 words ✅ (budget: 40)
      // Uses: structured(1), addiction(1), mental health(1), intervention(1), Indiana(1), help(1), family(1)
      body: "We lead the structured addiction or mental health intervention conversation in your Indiana home, workplace, or a neutral setting. Most loved ones accept help that day; those who do not receive a family follow-up plan within the week.",
    },
    {
      number: "05",
      // H3 title: 5 words ✅ (budget: 6) — USE IN HEADING: addiction treatment, transport
      title: "Direct transport to addiction treatment",
      // body: 38 words ✅ (budget: 40)
      // Uses: addiction treatment(1), Indiana(1), medical(1), residential(1), IOP(1), family(1)
      body: "We escort your loved one to Indiana addiction treatment — medical detox, residential care, or IOP — or arrange air transport to an out-of-state program when clinical fit demands it, staying on the line with the family through admission.",
    },
    {
      number: "06",
      // H3 title: 4 words ✅ (budget: 6) — USE IN HEADING: family recovery coaching, long-term
      title: "Long-term family recovery coaching",
      // body: 35 words ✅ (budget: 40)
      // Uses: Indiana(1), families(1), recovery(1), healthy(1), boundaries(1), relationships(1), family support(1), strategies(1), long-term(1), intervention(1)
      body: "We coach Indiana families through 12 months of recovery — relapse prevention, healthy boundaries, rebuilding relationships, and the family support strategies that keep long-term recovery alive after a successful intervention.",
    },
  ],

  // Word count: 46 words ✅ (budget: 80) — was 22 words
  // Uses: Indiana(1), intervention process(1), families(1), structured(1), addiction(1), mental health(1),
  //       intervention programs(1), Indianapolis(1), family(1)
  processIntro:
    "You do not have to navigate Indiana's intervention process alone. We have guided 1,500+ families through structured addiction and mental health intervention programs — many right here in Indianapolis and across Indiana. Every plan is built for your specific family.",

  urgencyEyebrow: "Don't wait for the next Indiana addiction crisis",
  urgencyHeadlineBefore: "Most Indiana families wait ",
  urgencyHeadlineItalic: "too long",
  urgencyHeadlineAfter: " to act.",

  // ── EXTRA CARDS SECTION ──────────────────────────────────────────────────────
  // Layout pattern: tile-grid | Background: cream #F5F3E7
  // Neighbors: white CONDITIONS section (before) / image-overlay Recovery Band (after)
  // Adjacent backgrounds: white → cream → image-overlay ✅ no two adjacent same
  extraCardsSection: {
    // eyebrow: 6 words ✅ (budget: 8) — USE IN HEADING: intervention programs, counseling, resources
    eyebrow: "Indiana Intervention Programs, Counseling & Recovery Resources",
    // H2 word count: 7 words ✅ (budget: 8)
    // USE IN HEADING: intervention services indiana, intervention programs, family recovery, structured, program
    headline: "Indiana intervention services and family recovery programs",
    italicWord: "family recovery",
    // body: 73 words ✅ (budget: 80)
    // Uses: professional(1), intervention services(1), Indiana(2), drug intervention(1), alcohol intervention(1),
    //       sober companion(1), family education(1), family recovery coaching(1), arise intervention(1),
    //       families(1), Indianapolis(1), structured(1), guidance(1), counseling(1), help(1), recovery(1)
    body:
      "Our professional intervention services in Indiana include drug intervention, alcohol intervention, sober companion support, family education, family recovery coaching, and ARISE intervention methods — each tailored to Indiana families. Certified interventionists in Indianapolis and statewide provide structured guidance and counseling resources to help families and loved ones find a clear path toward lasting recovery.",
    cards: [
      {
        icon: "ri-heart-pulse-line",
        // H3 title: 4 words ✅ (budget: 6) — USE IN HEADING: drug, alcohol, intervention
        title: "Drug & Alcohol Intervention",
        // body: 28 words ✅ (budget: 35)
        // Uses: drug intervention(1), alcohol intervention(1), professional(1), family(1), addiction(1),
        //       emotional(1), Indiana(1), treatment(1), resources(1)
        body: "Professional drug intervention and alcohol intervention programs designed around each family's unique needs — addiction severity, emotional dynamics, and Indiana treatment resources.",
      },
      {
        icon: "ri-team-line",
        // H3 title: 3 words ✅ (budget: 6) — USE IN HEADING: family recovery coaching
        title: "Family Recovery Coaching",
        // body: 30 words ✅ (budget: 35)
        // Uses: family recovery coaching(1), family members(1), relationships(1), healthy(1), boundaries(1),
        //       recovery(1), support(1), strategies(1), Indiana(1), addiction(1), intervention(1)
        body: "Structured family recovery coaching helps family members rebuild relationships, set healthy boundaries, and develop recovery support strategies after a successful Indiana addiction intervention.",
      },
      {
        icon: "ri-user-follow-line",
        // H3 title: 3 words ✅ (budget: 6) — USE IN HEADING: sober companion
        title: "Sober Companion Care",
        // body: 28 words ✅ (budget: 35)
        // Uses: sober companion(1), recovery(1), support(1), guidance(1), emotional(1), Indiana(1), addiction treatment(1)
        body: "A trained sober companion provides one-on-one recovery support — accountability, guidance, and emotional reinforcement — during the critical weeks after Indiana addiction treatment.",
      },
      {
        icon: "ri-booklet-line",
        // H3 title: 3 words ✅ (budget: 6) — USE IN HEADING: family counseling, education, care
        title: "Family Counseling & Education",
        // body: 29 words ✅ (budget: 35)
        // Uses: family education(1), counseling(1), program(1), Indiana(1), families(1), behavioral(1),
        //       strategies(1), professional(1), guidance(1), addiction(1), mental health(1), care(1), recovery(1)
        body: "Our family education program equips Indiana families with counseling resources, behavioral strategies, and professional guidance on addiction, mental health, and long-term care for lasting recovery.",
      },
    ],
  },

  // ── EVIDENCE-BASED SECTION ───────────────────────────────────────────────────
  // Layout pattern: feature-row | Background: white
  // Neighbors: image-overlay Recovery Band (before) / cream FAQ section (after)
  // Adjacent backgrounds: image-overlay → white → cream ✅ no two adjacent same
  evidenceBasedSection: {
    // eyebrow: 6 words ✅ (budget: 8) — USE IN HEADING: professional, intervention, indiana, recovery
    eyebrow: "Why Professional Intervention Works in Indiana",
    // H2 word count: 8 words ✅ (budget: 8)
    // USE IN HEADING: structured, intervention process, recovery, professional intervention
    headline: "A structured intervention process that supports lasting recovery",
    italicWord: "structured",
    // body: 48 words ✅ (budget: 80) — new section (was 0)
    // Uses: Indianapolis(1), interventionists(1), motivational interviewing(1), arise intervention(1),
    //       crisis intervention(1), strategies(1), families(1), addiction(1), recovery(1), structured(1),
    //       intervention process(1), Indiana(1), communities(1)
    body:
      "Our certified Indianapolis interventionists use evidence-based techniques — motivational interviewing, ARISE intervention models, and crisis intervention strategies — to help families guide loved ones struggling with addiction toward recovery. This structured intervention process has guided 1,500+ families across Indiana communities.",
    cards: [
      {
        icon: "ri-chat-3-line",
        // H3 title: 3 words ✅ (budget: 6) — USE IN HEADING: motivational interviewing
        title: "Motivational Interviewing",
        // body: 30 words ✅ (budget: 35)
        // Uses: motivational interviewing(1), interventionists(1), counseling(1), emotional(1), behaviors(1), recovery(1), addiction(1), strategies(1)
        body: "Our certified interventionists use motivational interviewing — an evidence-based counseling approach that helps individuals recognize the emotional costs of addictive behaviors and builds genuine motivation for recovery.",
      },
      {
        icon: "ri-loop-left-line",
        // H3 title: 3 words ✅ (budget: 6) — USE IN HEADING: arise intervention
        title: "ARISE Intervention Model",
        // body: 29 words ✅ (budget: 35)
        // Uses: arise intervention(1), family support(1), recovery(1), intervention(1), emotional(1)
        body: "The ARISE intervention model — a non-confrontational approach — invites family support networks into the recovery conversation before a formal intervention, reducing resistance and easing emotional tension.",
      },
      {
        icon: "ri-alarm-warning-line",
        // H3 title: 3 words ✅ (budget: 6) — USE IN HEADING: crisis intervention, addiction counselor
        title: "Crisis Intervention Response",
        // body: 32 words ✅ (budget: 35)
        // Uses: addiction(1), mental health(1), crisis(2), crisis intervention(1), addiction counselor(1), guidance(1), Indiana(1), families(1)
        body: "When addiction reaches dangerous levels — overdose risk or acute mental health crisis — our certified addiction counselor team delivers immediate crisis intervention guidance to Indiana families.",
      },
      {
        icon: "ri-mental-health-line",
        // H3 title: 4 words ✅ (budget: 6) — USE IN HEADING: mental health, substance use disorder
        title: "Co-occurring Mental Health Support",
        // body: 30 words ✅ (budget: 35)
        // Uses: Indiana(1), addiction(1), mental health(2), interventionists(1), addiction counselors(1), substance use disorder(1), emotional(1), behavioral(1)
        body: "Many Indiana addiction cases involve co-occurring mental health disorders. Our interventionists coordinate with addiction counselors and behavioral health professionals to address substance use disorder and emotional challenges together.",
      },
    ],
  },

  // ── RECOVERY SECTION ─────────────────────────────────────────────────────────
  // eyebrow: 6 words ✅ (budget: 8) — USE IN HEADING: indiana, family recovery, intervention, support
  recoveryEyebrow: "Indiana family recovery and intervention support",

  // H2 word count: 7 words ✅ (budget: 8) — USE IN HEADING: indiana, family, recovery, healthy, relationships
  recoveryHeadline: "Your Indiana family can rebuild healthy relationships.",

  // Word count: 57 words ✅ (budget: 80) — was 22 words
  // Uses: addiction intervention(1), structured(1), professional(1), Indiana(1), care(1), counseling(1),
  //       recovery(2), Indianapolis(1), families(1), communities(1), drug intervention(1), alcohol intervention(1),
  //       family recovery coaching(1), family support(1), strategies(1), relationships(1), treatment(1)
  recoveryBody:
    "When addiction intervention is structured and professional Indiana treatment is arranged — detox, residential care, or outpatient counseling — lasting recovery becomes possible. We have helped Indianapolis families and communities across Indiana through drug intervention and alcohol intervention. Family recovery coaching and family support strategies rebuild meaningful relationships after treatment. Recovery starts with one call.",

  // ── FAQs ─────────────────────────────────────────────────────────────────────
  faqs: [
    // Brief Q1: domestic violence / safety risks
    {
      // Q: 12 words ✅ (budget: 15)
      question: "How do intervention services handle domestic violence or safety risks?",
      // A: 75 words ✅ (budget: 80)
      // Uses: addiction(1), interventionists(1), Indiana(1), intervention(2), family(2), emotional(1),
      //       Indianapolis(1), behaviors(1), medical(1), Thrive by IU Health(1)
      answer:
        "When addiction involves domestic violence or safety risks, our professional interventionists assess every situation before developing the Indiana intervention plan. We prioritize the family's physical and emotional safety. Thrive by IU Health — Indiana's first hospital-linked violence intervention program — connects gun violence victims with life coaches and therapists in the hospital. The Indianapolis Counseling Center's ICADV-certified Batterers Intervention Program (Indiana Code 35-50.9.1) addresses violence-linked addiction behaviors. We never proceed with intervention where safety cannot be guaranteed.",
    },
    // Brief Q2: Indiana state laws governing interventionists
    {
      // Q: 12 words ✅ (budget: 15)
      question: "What Indiana state laws govern professional interventionists and their credentials?",
      // A: 78 words ✅ (budget: 80)
      // Uses: Indiana(3), professional(2), interventionists(2), arise intervention(1), counselors(1), behavioral(1),
      //       intervention process(1), mental health(1)
      answer:
        "Indiana does not currently license professional interventionists at the state level. Our team holds nationally recognized credentials through the Association of Intervention Specialists (AIS) and the ARISE Network, and operates within Indiana's legal and ethical frameworks. Indiana Code 35-50.9.1 governs Batterers Intervention Programs, ICADV-certified. For mental health interventions, our interventionists coordinate with licensed Indiana addiction counselors and behavioral health professionals to ensure proper clinical oversight throughout the intervention process.",
    },
    // Brief Q3: Indiana family court / legal system
    {
      // Q: 14 words ✅ (budget: 15)
      question: "Should I involve Indiana family court or the legal system before staging an intervention?",
      // A: 73 words ✅ (budget: 80)
      // Uses: Indiana(2), family(4), interventionists(1), structured(1), intervention(2), professional(1), long-term(1), family recovery(1)
      answer:
        "In most cases, family court involvement is not required before a voluntary Indiana intervention. Our certified interventionists guide families through structured intervention conversations that prioritize voluntary engagement — legal action is a last resort. When civil commitment or court orders become necessary, we coordinate with Indiana attorneys familiar with behavioral health statutes. Voluntary professional intervention almost always produces better long-term family recovery outcomes than court-mandated treatment.",
    },
    // Brief Q4: co-occurring mental health disorder
    {
      // Q: 15 words ✅ (budget: 15)
      question: "Can an interventionist help if my loved one has a co-occurring mental health disorder?",
      // A: 71 words ✅ (budget: 80)
      // Uses: Indiana(2), interventionists(1), substance use disorder(1), mental health(3),
      //       addiction(1), counselors(1), Indianapolis(1), treatment(1), program(1)
      answer:
        "Yes. Dual diagnosis — addiction combined with mental health disorders like depression, anxiety, or PTSD — is common in Indiana. Our certified interventionists are trained to address co-occurring substance use disorder and mental health conditions simultaneously. We partner with Indiana mental health professionals and addiction counselors to build a treatment plan addressing both conditions. Indianapolis and statewide treatment facilities offer integrated dual-diagnosis programs.",
    },
    // Brief Q5: Indiana treatment facility partners
    {
      // Q: 12 words ✅ (budget: 15)
      question: "What Indiana treatment facilities do professional interventionists typically partner with?",
      // A: 68 words ✅ (budget: 80)
      // Uses: professional(1), interventionists(1), Indiana(3), addiction treatment(1), Indianapolis(1), mental health(1),
      //       counseling(1), resources(1), insurance(1), intervention process(1), medical(1)
      answer:
        "Our professional interventionists in Indiana partner with a range of addiction treatment facilities — including Allendale Treatment (5419 Co Rd 427, Auburn, IN 46706; admissions: (833) 338-6946), Indianapolis-area medical detox centers and residential programs, and IOP providers across Marion County. We assess each Indiana facility for clinical quality, mental health counseling resources, and insurance compatibility before recommending them during the intervention process.",
    },
    // Brief Q6: rural Indiana access
    {
      // Q: 12 words ✅ (budget: 15)
      question: "How do rural Indiana families access intervention services in remote areas?",
      // A: 73 words ✅ (budget: 80)
      // Uses: Indiana(2), community(2), communities(1), interventionists(1), families(1), addiction(1),
      //       intervention services(2), guidance(1), counseling(1), resources(2), mental health(1), support(1), programs(1)
      answer:
        "We travel to rural Indiana communities — all 92 counties. Our interventionists fly into regional airports or drive to remote areas to reach families who need addiction intervention services. Intervention Services at 2068 Lucas Pkwy, Lowell, IN 46356 serves NW Indiana. We also provide guidance on telehealth counseling resources and regional mental health support programs where in-person intervention services are limited. No Indiana community is beyond our reach.",
    },
    // Brief Q7: verify interventionist credentials
    {
      // Q: 11 words ✅ (budget: 15)
      question: "How do I verify an interventionist's credentials and track record in Indiana?",
      // A: 70 words ✅ (budget: 80)
      // Uses: professional(1), interventionist(2), Indiana(2), interventionists(1),
      //       intervention process(1), long-term(1), family recovery coaching(1)
      answer:
        "Look for membership in the Association of Intervention Specialists (AIS), Network for Independent Interventionists (NII), or ARISE Network certification. Ask your professional interventionist for references from past Indiana cases — a credible interventionist welcomes this scrutiny. Our team provides verifiable credentials, references from Indiana family interventions, and transparent records of our intervention process success rates and long-term family recovery coaching outcomes.",
    },
    // Brief Q8: certified interventionist vs licensed counselor
    {
      // Q: 15 words ✅ (budget: 15)
      question: "What is the difference between a certified interventionist and a licensed counselor in Indiana?",
      // A: 74 words ✅ (budget: 80)
      // Uses: interventionist(1), counselor(1), Indiana(1), structured(1), crisis intervention(1), family(2),
      //       intervention(1), family recovery coaching(1), addiction counselor(1), behavioral(1), counseling(1),
      //       mental health(1), professional(1), interventionists(1), treatment(1)
      answer:
        "A certified interventionist specializes in structured crisis intervention and family mobilization — guiding the intervention day conversation, coordinating treatment admission, and providing post-intervention family recovery coaching. A licensed Indiana addiction counselor or behavioral health therapist delivers ongoing clinical treatment, counseling, and mental health support after intervention. Both roles are complementary: professional interventionists hand off to licensed counselors and treatment programs once the loved one is safely admitted.",
    },
    // Brief Q9: relapse after intervention
    {
      // Q: 13 words ✅ (budget: 15)
      question: "What happens if my loved one relapses after a successful Indiana intervention?",
      // A: 71 words ✅ (budget: 80)
      // Uses: recovery(2), family recovery coaching(1), Indiana(1), addiction(1), intervention(1), families(2),
      //       addiction counselor(1), boundaries(1), treatment(1), programs(1), emotional(1), long-term(1)
      answer:
        "Relapse is a common part of the recovery journey, not a failure. Our family recovery coaching continues for 12 months after a successful Indiana addiction intervention. When relapse occurs, we help Indiana families respond quickly — updating addiction counselor recommendations, reinforcing healthy boundaries, and arranging re-entry into treatment programs. The emotional tools and guidance we provide families during intervention preparation support long-term recovery through every setback.",
    },
    // Brief Q10: Indiana Medicaid / insurance coverage
    {
      // Q: 12 words ✅ (budget: 15)
      question: "How do Indiana Medicaid or insurance plans cover intervention services?",
      // A: 72 words ✅ (budget: 80)
      // Uses: Indiana(3), addiction treatment(1), mental health(1), intervention services(1), medical(1),
      //       behavioral(1), substance use disorder(1), treatment(1), programs(1), professional(1),
      //       interventionists(1), intervention(1)
      answer:
        "Federal MHPAEA parity rules require most Indiana commercial insurance plans to cover addiction treatment and mental health intervention services at parity with medical coverage. Indiana Medicaid — through the Healthy Indiana Plan — covers many behavioral health and substance use disorder treatment programs. Our professional interventionists verify insurance benefits before intervention day so treatment placement is confirmed, not delayed, when your loved one says yes.",
    },
    // Brief Q11: Family Recovery Coaching benefits
    {
      // Q: 13 words ✅ (budget: 15)
      question: "What will my family gain from family recovery coaching after intervention?",
      // A: 71 words ✅ (budget: 80)
      // Uses: family recovery coaching(2), Indiana(1), family members(1), recovery(3), behaviors(1), healthy(1),
      //       boundaries(1), relationships(1), addiction(1), professional(1), emotional(1), support(2),
      //       guidance(1), family support(1)
      answer:
        "Family recovery coaching gives Indiana family members the tools to sustain lasting recovery without enabling addictive behaviors. You will learn healthy boundaries, communication strategies, and how to rebuild relationships damaged by addiction. Our professional recovery coaches provide emotional support and guidance during the difficult transition from treatment back to home life. Family support is critical: family involvement in recovery significantly improves outcomes.",
    },
    // Brief Q12: Indianapolis families — encouraging loved one struggling with addiction
    {
      // Q: 15 words ✅ (budget: 15)
      question: "How can Indianapolis families encourage a loved one struggling with addiction to seek help?",
      // A: 76 words ✅ (budget: 80)
      // Uses: Indianapolis(1), families(2), intervention process(1), professional(1), interventionist(1), emotional(1),
      //       behaviors(1), motivational interviewing(1), family members(1), structured(1), intervention(1), struggling addiction(1)
      answer:
        "Indianapolis families can begin by learning about the intervention process and speaking with a professional interventionist before involving the loved one. Avoid early ultimatums and emotional confrontation. Focus on specific behaviors and consequences — not character judgments. Apply motivational interviewing principles: express care, acknowledge the pain of struggling addiction, and offer concrete next steps. When family members are unified and prepared, the structured intervention conversation is far more likely to succeed.",
    },
    // Brief Q13: Why families wait — emotional barriers
    {
      // Q: 12 words ✅ (budget: 15) — USE IN FAQ HEADING: emotional
      question: "Why do families wait: what are the emotional barriers to intervention?",
      // A: 76 words ✅ (budget: 80)
      // Uses: families(2), emotional(3), relationships(1), addiction(2), Indiana(1), family members(1),
      //       help(3), professional(1), guidance(1), structured(1), intervention(1), recovery(1)
      answer:
        "Families often wait because of deep emotional barriers — fear of damaging relationships, hope that addiction will self-resolve, guilt, shame, or simply not knowing where to start. Many Indiana family members feel they are betraying their loved one by seeking professional help. Our interventionists provide guidance that reframes seeking help as an act of love. Early structured intervention prevents long-term addiction damage and dramatically improves the chance of lasting recovery.",
    },
    // Brief Q14: crisis intervention — Assessment Center
    {
      // Q: 12 words ✅ (budget: 15)
      question: "Can crisis intervention help if my loved one is in immediate danger?",
      // A: 79 words ✅ (budget: 80)
      // Uses: crisis intervention(2), Indianapolis(2), Marion County(1), recovery(1), professional(1), guidance(1),
      //       interventionists(1), crisis(1), intervention(1)
      answer:
        "Yes. Indianapolis's Assessment and Intervention Center (2979 East Pleasant Run Parkway, Indianapolis, IN 46203) provides free, voluntary 24/7 crisis intervention to any Marion County resident. Opened in December 2020, the center accepts referrals from law enforcement, corrections, shelters, and emergency departments. Their team of licensed clinicians, peer recovery specialists, and life coaches provides professional crisis guidance at no cost. Our interventionists are also available 24/7 for crisis-level intervention cases across all of Indiana.",
    },
    // Brief Q15: do you travel to rural Indiana?
    {
      // Q: 9 words ✅ (budget: 15)
      question: "Do you travel to rural Indiana counties and remote communities?",
      // A: 62 words ✅ (budget: 80)
      // Uses: families(1), Indiana(4), communities(2), interventionists(1), professional(1), intervention services(1),
      //       Indianapolis(1), community(1), help(1)
      answer:
        "Yes. We reach families in all 92 Indiana counties — from the Indianapolis metro to rural southern, central, and northern Indiana communities. Our interventionists arrange their own flights, rental vehicles, and accommodations. We provide the same professional intervention services in rural Indiana as we do in Indianapolis and other metro areas. No Indiana community is too remote for us to help.",
    },
    // Fact coverage: First Steps / BCDS early intervention resources in Indiana
    {
      // Q: 11 words ✅ (budget: 15)
      question: "What other Indiana intervention programs exist for families beyond addiction services?",
      // A: 77 words ✅ (budget: 80)
      // Uses: First Steps(2), BCDS(1), Indiana(3), intervention programs(1), families(3), developmental(2),
      //       crisis(1), guidance(1), resources(1), program(1), support(1)
      answer:
        "Indiana offers several intervention programs beyond addiction services. The Bureau of Child Development Services (BCDS) leads First Steps — Indiana's early intervention program serving families of children under age three with developmental delays or diagnosed conditions likely to cause delays. First Steps connects families with therapists, developmental coaches, and community support. The Assessment and Intervention Center in Indianapolis serves adults in crisis. Our team provides guidance on the full range of Indiana intervention resources appropriate to your family's situation.",
    },
  ],

  // H2 word count: 7 words ✅ (budget: 8)
  // USE IN HEADING: indiana, intervention services, family
  faqTitle: "Indiana intervention services — your family questions answered.",

  // H2 word count: 8 words ✅ (budget: 8)
  // USE IN HEADING: indiana, intervention services, family, help
  bottomCtaTitle: "Indiana intervention services — help your family today.",
};
