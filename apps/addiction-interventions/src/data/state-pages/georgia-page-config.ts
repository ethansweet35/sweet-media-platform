import type { StatePageConfig } from "@/components/templates/StatePageTemplate";

const BASE =
  "https://bxtwcdgjzzjxjvqdiuvn.supabase.co/storage/v1/object/public/site-assets/images";

/**
 * SEO-expanded copy for /service-areas/georgia — terms and FAQs aligned to editorial brief.
 */
export const georgiaPageConfig: StatePageConfig = {
  stateName: "Georgia",
  fullBleedStateLayout: true,
  heroImage: `${BASE}/ga_hero01.jpg`,
  heroImageAlt: "Georgia landscape — respectful healthcare imagery",
  heroHeadlineSuffix:
    "alcohol intervention, drug rehab placement, and family recovery planning statewide",
  heroBody:
    "When drug alcohol chaos shows up at home, families statewide need a structured intervention before illegal substances, controlled medication misuse, or alcohol addiction spiral further—because untreated drug addiction rarely slows on its own. Our board-certified team coordinates alongside any professional interventionist you retain, mapping detox openings, inpatient and outpatient addiction treatment at trusted centers, holistic paths that honor dual diagnosis, and sober living when home stays too triggering. We document insurance benefits for behavioral health and mental health service authorizations, practice motivational interviewing with your loved one, and stay on the line through admissions so yes leads to a real individualized treatment plan—not another broken promise. Families comparing alcohol and drug intervention Georgia providers should expect that depth before discussing clinical staging or residential treatment timing.",
  anchorId: "contact-ga",
  trustBullets: [
    { icon: "ri-time-line", text: "Available 24/7 ET" },
    { icon: "ri-shield-check-line", text: "100% Confidential" },
    { icon: "ri-award-line", text: "Joint Commission Accredited" },
    { icon: "ri-map-pin-2-line", text: "All 159 GA counties" },
  ],
  stats: [
    {
      value: "High need",
      label: "Substance abuse, alcohol, and mental health burdens vary by Georgia county",
      sublabel: "Prevention starts with honest data — we help families read the map",
    },
    {
      value: "24–48 hrs",
      label: "Typical on-site Georgia crisis intervention mobilisation",
      sublabel: "Residential treatment and detox holds coordinated when minutes matter",
    },
    {
      value: "1,500+",
      label: "Families helped nationwide — sustained recovery is possible",
      sublabel: "Many interventions landed in clinical rehab with years of follow-up coaching afterward",
    },
    {
      value: "MHPAEA",
      label: "Insurance parity for behavioral health & diagnosable SUD",
      sublabel: "Commercial plans — we verify inpatient, outpatient, and MAT benefits",
    },
  ],
  statsEyebrow: "Georgia Coverage & Addiction Treatment Reality",
  statsHeadline:
    "Alcohol and drug intervention Georgia families trust for addiction treatment handoffs, clinical rehab timing, and lasting recovery momentum.",
  familiesHelped: "1,500+",
  familiesHelpedLocalStat: "300+",
  familiesHelpedLocalLabel: "GA families helped",
  interventionImage: `${BASE}/ga_intervention01.jpg`,
  interventionImageAlt: "Family meeting with a certified interventionist in Georgia",
  citiesRegionImage: `${BASE}/ga_cities01.jpg`,
  citiesRegionImageAlt: "Communities across Georgia",
  recoveryImage: `${BASE}/ga_recovery01.jpg`,
  recoveryImageAlt: "Hope and recovery — Georgia",
  whyUsLeadParagraph:
    "The state blends fast-growing metros and rural counties with uneven detox access and patchwork drug rehab capacity. We translate what your PPO, HMO, EAP, or Medicaid managed-care plan will actually cover, then queue realistic beds before anyone walks into the room. Prevention-minded planning matters because every delay lets drug alcohol binges, opioid scripts, and untreated psychiatric symptoms deepen. We coordinate family therapy referrals, civil-commitment consults when legally appropriate, and aftercare coaching so boundaries protect everyone’s recovery path.",
  regionsSupportingText:
    "From Metro Atlanta to the coast, from Augusta to Columbus, we travel wherever Georgia families need an intervention. Rural relatives deserve the same certified standards as Buckhead executives — call us for zip codes you do not see listed below.",
  differentiators: [
    {
      icon: "ri-map-pin-2-line",
      title: "Alcohol and drug intervention Georgia travel logistics",
      body: "Airports, highway timing, and safe meeting locations are planned so the conversation stays clinical—not chaotic—whether you are in Savannah, Macon, or a two-lane county seat.",
    },
    {
      icon: "ri-shield-check-line",
      title: "Addiction treatment centers vetted for dual diagnosis",
      body: "We line up detox, inpatient care, residential programs, partial hospitalization, intensive outpatient, MAT when appropriate, and recovery residences that understand co-occurring anxiety, depression, or trauma.",
    },
    {
      icon: "ri-bank-line",
      title: "Insurance navigation for drug rehab & behavioral health",
      body: "We read certification requirements, single-case agreements, and appeals language so money does not block someone who is finally willing to admit to a campus of care.",
    },
    {
      icon: "ri-time-line",
      title: "Emergency response timelines in-state families can feel",
      body: "When alcohol poisoning signs appear—unresponsiveness, vomiting while unconscious, slowed breathing around 10 breaths per minute or fewer, bluish or clammy skin, or a clearly lowered heart rate—call 911 first, then call us for what comes after emergency care.",
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
  processSteps: [
    {
      number: "01",
      title: "Insurance-ready treatment strategy before day one",
      body: "We gather pharmacy history, prior detox attempts, mental health medications, and court paperwork, then pair Georgia rehab options with the individualized treatment plan your loved one is most likely to accept.",
    },
    {
      number: "02",
      title: "Family therapy coaching before intervention day",
      body: "Every participant rehearses boundaries, letters rooted in love, and responses if drug alcohol withdrawal or panic surfaces mid-conversation.",
    },
    {
      number: "03",
      title: "On-site intervention specialist travel & safety prep",
      body: "Your interventionist arrives early, meets relatives privately, and confirms transport to inpatient or outpatient beds—never hoping a facility will materialize at the last minute.",
    },
    {
      number: "04",
      title: "Johnson, ARISE, or hybrid intervention models",
      body: "We match structure to denial level. Johnson Model uses a surprise meeting focused on immediate treatment admission; ARISE pulls relatives into a transparent, invitation-based series of sessions—both can work statewide when facilitated by credentialed clinicians.",
    },
    {
      number: "05",
      title: "Same-day detox or residential rehab admissions",
      body: "If someone agrees, we escort them directly into detox or a residential wing. If they hesitate, we preserve dignity while re-approaching within days—not months.",
    },
    {
      number: "06",
      title: "Addiction recovery coaching for the entire household",
      body: "Sustained wellness needs relapse-prevention plans, psychiatric check-ins, and sometimes recovery housing—we stay reachable for a full year after admission.",
    },
  ],
  processIntro:
    "You are not overreacting—alcohol, pills, and polysubstance use steal peace from every household we meet. This step-by-step path keeps the focus on compassionate, firm action that points toward licensed treatment centers with verified beds.",
  urgencyEyebrow: "Georgia alcohol poisoning & substance emergencies",
  urgencyHeadlineBefore: "If drug alcohol use is accelerating in your Georgia home, ",
  urgencyHeadlineItalic: "plan before",
  urgencyHeadlineAfter:
    " another overdose scare. Interventions work best when detox, mental health support, and family alignment happen together—not when shame keeps everyone silent.",
  recoveryEyebrow: "Addiction recovery can start in Georgia today",
  recoveryHeadline: "Recovery needs community—inpatient, outpatient, rehab aftercare, and family hope together.",
  recoveryBody:
    "Whether your loved one needs Metro Atlanta treatment centers or quieter rural programs, recovery is a practice—not a single moment. Relatives build calendars with outpatient therapy, 12-step program introductions, MAT check-ins when prescribed, trauma-informed counseling, and sober living when outpatient alone wobbles. Long-term recovery demands that stack; long-term recovery also needs relatives who stop shielding chaos. This is the addiction recovery backbone alcohol and drug intervention Georgia teams should coordinate before day one. Prescription drug safeguards, residential treatment spacing, and mental health treatment referrals belong inside the same binder.",
  faqTitle: "Georgia intervention, clinical treatment & family recovery FAQ",
  faqs: [
    {
      question:
        "Substance use disorder documentation: what Georgia relatives should collect before the room fills up",
      answer:
        "Gather refill dates, prior ER visits, dangerous driving incidents, employer write-ups, custody letters, and photos of paraphernalia if safe—evidence that helps clinicians see the full substance use disorder picture without turning the day into a trial.",
    },
    {
      question:
        "Alcohol and drug intervention Georgia: what follow-up exists if the first meeting fails?",
      answer:
        "Failed interventions still move the needle. We schedule a structured debrief, tighten boundaries, adjust letters, and often add clinician-backed options your loved one finds less threatening—especially when drug alcohol binges return fast. Many Peach State households get a second yes within days once denial softens, insurance clears addiction treatment, and a professional interventionist can rehearse calmer language.",
    },
    {
      question: "What credentials belong on a specialist interventionist serving this state?",
      answer:
        "Look for board certification or training through bodies such as the Association of Intervention Specialists, documented ethics training, liability coverage, and experience coordinating reputable addiction treatment centers—not only motivational interviewing workshops. We happily share credentials on the first call.",
    },
    {
      question: "Can an employer here legally require attendance at a workplace intervention?",
      answer:
        "Employers may tie continued employment to a bona fide substance abuse policy, reasonable suspicion protocols, or EAP referrals, but they cannot force medical care the way a court might. We help HR teams, unions, and families understand consent, confidentiality, and when a workplace intervention simply opens the door to rehab.",
    },
    {
      question: "How do I stage an intervention for drug alcohol combinations at the same time?",
      answer:
        "Polysubstance cases need medical clarity first. We coordinate tox-aware detox, review drug alcohol and prescription interactions, and script the talk so your loved one hears one cohesive plan: enter inpatient care, stabilize, then layer outpatient psychiatric support—not white-knuckle abstinence alone.",
    },
    {
      question: "How do I find a certified intervention specialist in Atlanta or rural counties?",
      answer:
        "Start with an AIS directory search, verify references, and ask who actually travels on-site versus coaching remotely. We dispatch clinicians statewide, pair you with teams who know Atlanta traffic patterns and back-road counties alike, and pre-match rehab beds before anyone books flights.",
    },
    {
      question: "What Georgia state resources help families who cannot afford a private interventionist?",
      answer:
        "Regional community service boards, Department of Behavioral Health and Developmental Disabilities crisis lines, county indigent funds, and faith coalitions can offer triage—even if wait lists exist. We help stack those public routes with pro-bono consults and payment plans so clinical care is not reserved for wealthy zip codes alone.",
    },
    {
      question: "How does involuntary commitment differ from a voluntary family intervention?",
      answer:
        "Civil commitment routes rely on statute-specific dangerousness or grave disability findings decided by courts and evaluators, while voluntary meetings preserve agency and center love letters. We explain both paths honestly because sustained abstinence sticks best when someone chooses rehab—but safety may require petitioning first.",
    },
    {
      question:
        "ARISE vs Johnson Model statewide: why families study the difference before meeting day",
      answer:
        "Johnson historically uses surprise plus immediate transport to rehab, while ARISE invites transparent meetings across multiple sessions. Homes with conflict-heavy teens often prefer ARISE; severe alcohol addiction with imminent medical risk may lean Johnson—your lead clinician recommends after assessment.",
    },
    {
      question: "What happens if someone walks out before the meeting concludes?",
      answer:
        "We pause, protect emotional safety, and shift to contingency coaching: who follows, who stops enabling cash or cars, and which crisis line to call. Many relatives return once adrenaline drops and a licensed bed is still open.",
    },
    {
      question: "Can a court here order evaluations or treatment for a relative?",
      answer:
        "Judges may mandate evaluations or care through diversion, family court, or certain civil proceedings, but a compassionate family meeting is not itself a court order—it stays private. When statutes overlap medicine, we coordinate counsel familiar with local behavioral health rules.",
    },
    {
      question: "How to get care: outpatient, inpatient, detox, and insurance in Georgia",
      answer:
        "Call us with your policy card, list current substances, and any psychiatric meds. We triage whether detox, inpatient, PHP, IOP, or medication-assisted treatment fits first, verify behavioral health benefits, and reserve an admission slot before we facilitate the conversation.",
    },
    {
      question: "How to do an intervention for an alcoholic when denial is fierce",
      answer:
        "Anchor the meeting in specific alcohol incidents, use calm boundaries, avoid shame-based speeches, and present two choices—structured rehab with family support or firm consequences everyone will uphold. Pair the talk with an immediate individualized treatment plan covering detox through outpatient groups.",
    },
    {
      question: "What is the THOR program in Georgia for housing and reentry?",
      answer:
        "THOR stands for Transitional Housing for Offender Reentry, a Georgia Department of Community Supervision directory of approved residences that blend accountability with substance abuse programming. Standard residences require at least an hour of substance abuse counseling weekly; intensive residences require five or more hours—critical context when someone leaves jail or prison needing structured sober living.",
    },
    {
      question:
        "Why consider treatment for alcohol addiction at Lakeview Behavioral Health Hospital in Atlanta, GA?",
      answer:
        "Lakeview offers inpatient detox and stabilization in the Atlanta corridor—useful when alcohol addiction pairs with acute psychiatric crises and you need 24/7 nursing before outpatient rehab. We do not replace their admissions desk; we help you judge if that level matches medical needs, insurance authorization, and multi-year wellness goals.",
    },
    {
      question: "Are structured interventions effective for diagnosable SUD and anxious relatives?",
      answer:
        "Research plus our 1,500+ cases show careful planning raises the odds someone enters treatment, especially with motivational interviewing, family therapy, and immediate bed access. Interventions are architecture—not magic—that converts pain into action.",
    },
    {
      question: "Board of Nursing rules: substance abuse reporting and nurse aftercare",
      answer:
        "The Board requires assessment through participating providers when RNs face substance abuse or dependence, mandates weekly aftercare with random drug screens, quarterly facilitator reports, and immediate reporting of concerning use—including patterns that mirror escalating drug addiction. Positive pre-employment screens also belong in formal referrals—we clarify how accountability intersects with rehab for licensed clinicians.",
    },
    {
      question:
        "Collegiate recovery, Fontaine Center programs, and campus prevention for Georgia students",
      answer:
        "The Collegiate Recovery Program builds social support for students overcoming diagnosable SUD or eating disorders, while UGA’s Fontaine Center—inside the University Health Center—offers BASICS screening, brief counseling, risk-management training for organizations, and weekly Celebration of Recovery meetings (Got Recovery) in the Tate Center at 706-542-8690 for students worried about drug alcohol patterns. AlcoholEdu is required for incoming UGA students, reflecting how prevention and counseling belong on every syllabus.",
    },
    {
      question:
        "Georgia prescription drug monitoring: how PDMP rules shape opioid and benzodiazepine risk",
      answer:
        "Since July 1, 2018, prescribers holding DEA numbers must consult the PDMP before issuing opioids, certain Schedule II cocaine derivatives, or benzodiazepines—evidence the state tightened prescription drug monitoring and why families should expect documentation before new scripts refill old habits.",
    },
    {
      question:
        "Mental health treatment after detox: dual diagnosis, holistic support, and next-step rehab",
      answer:
        "SUD spans misuse through dependency—including what clinicians document as substance use disorder—so relapse plans must include therapy for trauma, anxiety, or depression—even when the substance disorder looks mild on paper. Holistic treatment might fold nutrition, sleep medicine, fitness, and spiritual care alongside drug rehab—especially when someone graduates inpatient levels to outpatient groups and needs fresh coping tools.",
    },
    {
      question:
        "Clinical campuses vs sober housing: inpatient, outpatient, and multi-year wellness planning",
      answer:
        "Addiction treatment centers deliver billable clinical hours, while sober housing extends structure without 24/7 nursing. Most plans stack detox → residential rehab → outpatient groups → structured housing so substance disorder symptoms taper and insurance authorizations stay orderly.",
    },
    {
      question: "Drug dependency, prescription misuse, and MAT pathways inside Peach State rehab",
      answer:
        "Street drugs now often mix fentanyl with diverted pills, so detox stays medical. Medication-assisted treatment—including FDA-cleared options for opioid or alcohol use—pairs with counseling and 12-step attendance when physicians agree, especially if drug addiction already damaged careers or custody orders.",
    },
  ],
  bottomCtaTitle: "Start your Georgia alcohol & substance abuse intervention plan today",
};
