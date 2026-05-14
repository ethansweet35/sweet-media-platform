import type { StatePageConfig } from "@/components/templates/StatePageTemplate";

const BASE =
  "https://bxtwcdgjzzjxjvqdiuvn.supabase.co/storage/v1/object/public/site-assets/images";

export const californiaStatePage: StatePageConfig = {
  stateName: "California",
  fullBleedStateLayout: true,
  heroImage: `${BASE}/ca_hero01.jpg`,
  heroImageAlt: "California Pacific coastline at sunrise",
  heroHeadlineSuffix: "from Eureka to Chula Vista",
  heroBody:
    "On-site addiction and mental health interventions in every California county. Our team is on the ground in 24–48 hours, vetted across the state's treatment landscape, and stays with your family for the full recovery year.",
  anchorId: "contact-ca",
  heroSecondaryCtaLabel: "Talk to a CA specialist",
  trustBullets: [
    { icon: "ri-time-line", text: "Available 24/7 PT" },
    { icon: "ri-shield-check-line", text: "100% Confidential" },
    { icon: "ri-award-line", text: "Joint Commission Accredited" },
    { icon: "ri-map-pin-2-line", text: "All 58 CA counties" },
  ],
  stats: [
    {
      value: "10,898",
      label: "Californians lost to overdose in 2023",
      sublabel: "California Dept. of Public Health",
    },
    {
      value: "2.6M",
      label: "Adults in CA with a substance use disorder",
      sublabel: "SAMHSA 2023 NSDUH",
    },
    {
      value: "1 in 8",
      label: "Californians experience serious mental illness",
      sublabel: "California Health Care Foundation",
    },
    {
      value: "24–48 hrs",
      label: "Our team is on the ground in CA",
      sublabel: "Same-day mobilisation for active crises",
    },
  ],
  statsEyebrow: "The California Reality",
  statsHeadline:
    "California has the largest behavioural health crisis in the country. Your family isn't alone in this.",
  familiesHelped: "1,500+",
  familiesHelpedLocalStat: "300+",
  familiesHelpedLocalLabel: "CA families helped",
  interventionImage: `${BASE}/ca_intervention01.jpg`,
  interventionImageAlt: "California family meeting with an interventionist in their living room",
  citiesRegionImage: `${BASE}/ca_cities01.jpg`,
  citiesRegionImageAlt: "California cities — Los Angeles, San Francisco, San Diego",
  recoveryImage: `${BASE}/ca_recovery01.jpg`,
  recoveryImageAlt: "Person walking on a California beach at sunrise — symbolising recovery",
  whyUsLeadParagraph:
    "California is its own country when it comes to addiction, mental health, and treatment. Our team has spent more than two decades learning the state's geography, its insurance carriers, and its clinical strengths and gaps.",
  regionsSupportingText:
    "From the redwood country in the north to the Mexican border in the south — and from coastal communities to the Sierra. Click your region for the city-specific page or call us for any community we don't yet have a dedicated page for.",
  differentiators: [
    {
      icon: "ri-map-pin-2-line",
      title: "We come to your California home",
      body: "Our certified interventionists fly into LAX, SAN, SFO, OAK, SMF, and SNA — and into smaller regionals when families need rural support. No telehealth-only intervention.",
    },
    {
      icon: "ri-shield-check-line",
      title: "We know California's treatment landscape",
      body: "From Newport Beach luxury rehabs to East LA county systems, NorCal medical detox, and Coachella Valley recovery communities — we vet every program before we recommend it.",
    },
    {
      icon: "ri-bank-line",
      title: "We work with California insurance",
      body: "We help families navigate Kaiser Permanente, Anthem Blue Cross of CA, Blue Shield of CA, Health Net, and the protections of California's Mental Health Parity Act (SB 855).",
    },
    {
      icon: "ri-time-line",
      title: "We work on California's clock",
      body: "California crises happen at 3am Friday after a Vegas bender, or noon Sunday in Tahoe. Our team is on call 24/7 PT and can coordinate hand-offs across the state same-day.",
    },
  ],
  regions: [
    {
      name: "Greater Los Angeles",
      cities: "Beverly Hills · Pasadena · Santa Monica · Burbank · Culver City",
      href: "/service-areas/los-angeles",
      icon: "ri-sun-line",
    },
    {
      name: "Long Beach & South Bay",
      cities: "Long Beach · Signal Hill · Lakewood · Paramount · Compton",
      href: "/service-areas/california/long-beach",
      icon: "ri-anchor-line",
    },
    {
      name: "Torrance & South Bay Coast",
      cities: "Torrance · Redondo Beach · Gardena · Hawthorne · El Segundo",
      href: "/service-areas/california/torrance",
      icon: "ri-compass-3-line",
    },
    {
      name: "Newport Beach & OC Coast",
      cities: "Newport Beach · Corona del Mar · Laguna Beach · Dana Point",
      href: "/service-areas/california/newport-beach",
      icon: "ri-sailboat-line",
    },
    {
      name: "Irvine & Central OC",
      cities: "Irvine · Lake Forest · Mission Viejo · Aliso Viejo · Tustin",
      href: "/service-areas/california/irvine",
      icon: "ri-building-4-line",
    },
    {
      name: "Santa Ana & North OC",
      cities: "Santa Ana · Anaheim · Orange · Fullerton · Garden Grove",
      href: "/service-areas/california/santa-ana",
      icon: "ri-leaf-line",
    },
    {
      name: "San Diego County",
      cities: "Downtown · La Jolla · Chula Vista · Carlsbad · Oceanside",
      href: "/service-areas/california/san-diego",
      icon: "ri-ship-line",
    },
    {
      name: "Solana Beach & North County",
      cities: "Solana Beach · Del Mar · Encinitas · Carlsbad · San Marcos",
      href: "/service-areas/california/solana-beach",
      icon: "ri-landscape-line",
    },
    {
      name: "San Francisco Bay Area",
      cities: "San Francisco · Oakland · Berkeley · Marin · San Jose · Palo Alto",
      href: "/service-areas/california/san-francisco",
      icon: "ri-bridge-line",
    },
    {
      name: "Sacramento & Central Valley",
      cities: "Sacramento · Stockton · Modesto · Fresno · Bakersfield",
      href: "/service-areas/california/sacramento",
      icon: "ri-government-line",
    },
    {
      name: "Inland Empire & Coachella",
      cities: "Riverside · San Bernardino · Palm Springs · Indio · Temecula",
      href: "/contact",
      icon: "ri-fire-line",
    },
    {
      name: "Northern California",
      cities: "Napa · Santa Rosa · Eureka · Redding · South Lake Tahoe",
      href: "/contact",
      icon: "ri-tree-line",
    },
  ],
  processSteps: [
    {
      number: "01",
      title: "First confidential call",
      body: "Tell us what's happening in your family right now — drinking patterns, mental health, recent crises. We listen first, then explain whether a California intervention is the right next step.",
    },
    {
      number: "02",
      title: "Family preparation (CA-specific)",
      body: "We build a private intervention plan that matches your loved one's California life: their job, their friend group, their access to alcohol or substances, the treatment programs that fit your zip code.",
    },
    {
      number: "03",
      title: "Interventionist arrives in California",
      body: "Your interventionist flies in the day before, meets the family privately, conducts a full rehearsal, and stays nearby to answer 11pm phone calls before the morning intervention.",
    },
    {
      number: "04",
      title: "The intervention conversation",
      body: "We lead the conversation in your California home, business, or a neutral location. Most loved ones say yes that day. The few who don't get a structured second-attempt plan within the week.",
    },
    {
      number: "05",
      title: "Direct transport to treatment",
      body: "We physically escort your loved one — by car within California or by air to an out-of-state program — and remain on the line with the family during admission.",
    },
    {
      number: "06",
      title: "Long-term California family coaching",
      body: "We don't disappear after admission. We coach the California family through 12 months of recovery — the visit weekend, the relapse risk, the return home, and the boundaries that keep recovery alive.",
    },
  ],
  processIntro:
    "You don't have to figure this out. We've done it 1,500+ times — and several hundred of them have been in California.",
  urgencyEyebrow: "Don't wait for the next California crisis",
  urgencyHeadlineBefore: "Most California families wait ",
  urgencyHeadlineItalic: "six years",
  urgencyHeadlineAfter: " too long.",
  recoveryEyebrow: "Recovery is real in California",
  recoveryHeadline: "Your loved one's next sunrise can look different.",
  recoveryBody:
    "We've watched fathers come back to their families in Newport Beach. Daughters get sober in Sacramento. Executives rebuild in San Francisco. The first step is a phone call.",
  faqs: [
    {
      question: "Do you only help families in Los Angeles and San Francisco?",
      answer:
        "No. We come to every part of California — coastal, central valley, mountain, and desert communities. We've conducted interventions in Eureka, Fresno, Bakersfield, Mammoth Lakes, Big Bear, Palm Springs, and small towns most directories never mention.",
    },
    {
      question: "How quickly can a certified interventionist reach my California home?",
      answer:
        "Most California cases are on the ground within 24–48 hours of the first call. Same-day mobilisation is available for active crises — overdose, suicidal ideation, or imminent danger. We can usually have a clinician on a flight to LAX, SAN, SFO, OAK, or SMF within hours.",
    },
    {
      question: "Will my Kaiser, Blue Shield, or Anthem plan cover treatment?",
      answer:
        "California's Mental Health Parity Act (SB 855) requires commercial health plans to cover medically necessary substance use and mental health treatment at parity with physical care. We help families read their plans, file authorisations, and appeal denials. We also know which California treatment centres are in-network with each major carrier.",
    },
    {
      question: "Should we keep our loved one in California, or send them out of state?",
      answer:
        "It depends on the case. California has world-class treatment in Malibu, Newport Beach, the Bay Area, and Lake Arrowhead — but proximity to drug-using friends, job stress, or romantic relationships in California can also undermine recovery. We help your family weigh both options honestly. Sometimes 30 days in Arizona, Tennessee, or Florida is the most loving thing a family can do.",
    },
    {
      question: "Can the intervention happen at the family home, or does it have to be neutral ground?",
      answer:
        "Either works. Many California interventions happen in a family living room because that's where the conversation feels safest. For executives, public figures, or families where the loved one might run, we'll arrange a hotel suite, a private office, or a treatment-program family room.",
    },
    {
      question: "What if my loved one is undocumented or doesn't have insurance?",
      answer:
        "We help. California has a strong public behavioural health system through county Behavioural Health Services agencies, plus Medi-Cal coverage for many residents regardless of immigration status. We know which treatment centres in your county accept self-pay, sliding scale, or Medi-Cal — and we'll never let cost stop the conversation.",
    },
    {
      question: "How much does a California intervention cost?",
      answer:
        "Our intervention services are quoted transparently on the first call — no celebrity-style premium pricing. The cost of a structured family intervention is almost always less than one continued month of active addiction.",
    },
    {
      question: "Can you help with a Prop 36 / drug court / DUI court case?",
      answer:
        "Yes. We've coordinated with California probation officers, Prop 36 case managers, and DUI court programs. A documented intervention and admission to a state-approved treatment program is often viewed favourably by California courts.",
    },
  ],
  faqTitle: "California intervention questions, answered.",
  bottomCtaTitle: "Ready to act for your family in California?",
};
