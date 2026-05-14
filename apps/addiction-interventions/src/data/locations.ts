export type LocationConfig = {
  slug: string;
  displayName: string;
  type: "state" | "city";
  parentRegion?: string;
  routePath?: string;
  seoTitle?: string;
  metaDescription?: string;
  heroEyebrow?: string;
  heroHeadline?: string;
  heroBody?: string;
  heroImage?: string;
  heroImageAlt?: string;
};

const STATES: Array<{ slug: string; name: string }> = [
  { slug: "alabama", name: "Alabama" },
  { slug: "alaska", name: "Alaska" },
  { slug: "professional-interventionist-arizona", name: "Arizona" },
  { slug: "arkansas", name: "Arkansas" },
  { slug: "california", name: "California" },
  { slug: "colorado", name: "Colorado" },
  { slug: "connecticut", name: "Connecticut" },
  { slug: "delaware", name: "Delaware" },
  { slug: "florida", name: "Florida" },
  { slug: "georgia", name: "Georgia" },
  { slug: "hawaii", name: "Hawaii" },
  { slug: "idaho", name: "Idaho" },
  { slug: "illinois", name: "Illinois" },
  { slug: "indiana", name: "Indiana" },
  { slug: "iowa", name: "Iowa" },
  { slug: "kansas", name: "Kansas" },
  { slug: "kentucky", name: "Kentucky" },
  { slug: "louisiana", name: "Louisiana" },
  { slug: "maine", name: "Maine" },
  { slug: "maryland", name: "Maryland" },
  { slug: "massachusetts", name: "Massachusetts" },
  { slug: "michigan", name: "Michigan" },
  { slug: "minnesota", name: "Minnesota" },
  { slug: "mississippi", name: "Mississippi" },
  { slug: "missouri", name: "Missouri" },
  { slug: "montana", name: "Montana" },
  { slug: "nebraska", name: "Nebraska" },
  { slug: "nevada", name: "Nevada" },
  { slug: "new-hampshire", name: "New Hampshire" },
  { slug: "new-jersey", name: "New Jersey" },
  { slug: "new-mexico", name: "New Mexico" },
  { slug: "new-york", name: "New York" },
  { slug: "north-carolina", name: "North Carolina" },
  { slug: "north-dakota", name: "North Dakota" },
  { slug: "ohio", name: "Ohio" },
  { slug: "oklahoma", name: "Oklahoma" },
  { slug: "oregon", name: "Oregon" },
  { slug: "pennsylvania", name: "Pennsylvania" },
  { slug: "rhode-island", name: "Rhode Island" },
  { slug: "south-carolina", name: "South Carolina" },
  { slug: "south-dakota", name: "South Dakota" },
  { slug: "tennessee", name: "Tennessee" },
  { slug: "texas", name: "Texas" },
  { slug: "utah", name: "Utah" },
  { slug: "vermont", name: "Vermont" },
  { slug: "virginia", name: "Virginia" },
  { slug: "washington", name: "Washington" },
  { slug: "west-virginia", name: "West Virginia" },
  { slug: "wisconsin", name: "Wisconsin" },
  { slug: "wyoming", name: "Wyoming" },
];

const CITIES: Array<{ slug: string; name: string; state: string }> = [
  { slug: "los-angeles", name: "Los Angeles", state: "California" },
  { slug: "san-diego", name: "San Diego", state: "California" },
];

const CA_BASE =
  "https://bxtwcdgjzzjxjvqdiuvn.supabase.co/storage/v1/object/public/site-assets/images";

const CALIFORNIA_CITIES: LocationConfig[] = [
  {
    slug: "ca-newport-beach",
    displayName: "Newport Beach",
    type: "city",
    parentRegion: "California",
    routePath: "/service-areas/california/newport-beach",
    seoTitle: "Drug Intervention in Newport Beach | Certified Interventionists",
    metaDescription:
      "On-site drug intervention services in Newport Beach, CA. Certified interventionists available 24/7 — on the ground in 24–48 hours. We know Orange County's treatment landscape.",
    heroEyebrow: "Newport Beach, Orange County",
    heroHeadline: "Drug Intervention in Newport Beach",
    heroBody:
      "Certified interventionists serving Newport Beach and greater Orange County. From Corona del Mar to Balboa Peninsula, we know the local recovery landscape and can have the right team at your home within 24–48 hours.",
    heroImage: `${CA_BASE}/ai_ca-newport-beach_hero01.jpg`,
    heroImageAlt: "Newport Beach harbor at sunset with luxury sailboats",
  },
  {
    slug: "ca-sacramento",
    displayName: "Sacramento",
    type: "city",
    parentRegion: "California",
    routePath: "/service-areas/california/sacramento",
    seoTitle: "Drug Intervention Sacramento CA | Certified Interventionists",
    metaDescription:
      "On-site drug intervention services in Sacramento, CA. Certified interventionists available 24/7 — on the ground within 24–48 hours. Serving the entire Sacramento Valley.",
    heroEyebrow: "Sacramento, Central Valley",
    heroHeadline: "Drug Intervention in Sacramento",
    heroBody:
      "On-site addiction interventions serving Sacramento and the Central Valley. Our certified interventionists understand the local treatment landscape from midtown to the suburbs and can mobilize within 24–48 hours.",
    heroImage: `${CA_BASE}/ai_ca-sacramento_hero01.jpg`,
    heroImageAlt: "Sacramento California State Capitol at golden hour",
  },
  {
    slug: "ca-san-francisco",
    displayName: "San Francisco",
    type: "city",
    parentRegion: "California",
    routePath: "/service-areas/california/san-francisco",
    seoTitle: "Alcohol Intervention San Francisco | Certified Interventionists",
    metaDescription:
      "On-site alcohol intervention services in San Francisco, CA. Certified interventionists available 24/7 — covering the Bay Area including Oakland, Berkeley, and Marin.",
    heroEyebrow: "San Francisco, Bay Area",
    heroHeadline: "Alcohol Intervention in San Francisco",
    heroBody:
      "Certified interventionists serving San Francisco and the greater Bay Area. We know the local treatment landscape from the Peninsula to the East Bay and can coordinate same-day mobilization for active crises.",
    heroImage: `${CA_BASE}/ai_ca-san-francisco_hero01.jpg`,
    heroImageAlt: "San Francisco Bay Bridge at sunrise with city skyline",
  },
  {
    slug: "ca-san-diego",
    displayName: "San Diego",
    type: "city",
    parentRegion: "California",
    routePath: "/service-areas/california/san-diego",
    seoTitle: "Drug Intervention San Diego | Certified Interventionists",
    metaDescription:
      "On-site drug intervention services in San Diego, CA. Certified interventionists available 24/7 — covering all San Diego County including La Jolla, Chula Vista, and Carlsbad.",
    heroEyebrow: "San Diego, Southern California",
    heroHeadline: "Drug Intervention in San Diego",
    heroBody:
      "On-site addiction interventions serving San Diego County. From La Jolla to Chula Vista, our certified interventionists know the San Diego treatment landscape and can arrive within 24–48 hours.",
    heroImage: `${CA_BASE}/ai_ca-san-diego_hero01.jpg`,
    heroImageAlt: "San Diego coastline and Coronado Bay at golden hour",
  },
  {
    slug: "ca-solana-beach",
    displayName: "Solana Beach",
    type: "city",
    parentRegion: "California",
    routePath: "/service-areas/california/solana-beach",
    seoTitle:
      "Addiction Intervention Services in Solana Beach CA | Certified Interventionists",
    metaDescription:
      "Professional addiction intervention services in Solana Beach, CA. Certified interventionists serving North San Diego County — on-site within 24–48 hours.",
    heroEyebrow: "Solana Beach, North San Diego County",
    heroHeadline: "Addiction Intervention Services in Solana Beach",
    heroBody:
      "Certified interventionists serving Solana Beach and North San Diego County. From Del Mar to Encinitas, we provide compassionate, on-site addiction intervention services with 24-hour availability.",
    heroImage: `${CA_BASE}/ai_ca-solana-beach_hero01.jpg`,
    heroImageAlt: "Solana Beach California coastal bluffs and Pacific Ocean at sunset",
  },
  {
    slug: "ca-irvine",
    displayName: "Irvine",
    type: "city",
    parentRegion: "California",
    routePath: "/service-areas/california/irvine",
    seoTitle: "Drug Intervention Services in Irvine | Certified Interventionists",
    metaDescription:
      "Effective drug intervention services in Irvine, CA. Certified interventionists serving Orange County — on-site within 24–48 hours. 1,500+ families helped nationwide.",
    heroEyebrow: "Irvine, Orange County",
    heroHeadline: "Drug Intervention Services in Irvine",
    heroBody:
      "On-site drug intervention services for families in Irvine and greater Orange County. Our certified interventionists understand the local community and can mobilize to your home within 24–48 hours.",
    heroImage: `${CA_BASE}/ai_ca-irvine_hero01.jpg`,
    heroImageAlt: "Irvine California master-planned neighborhoods with green parks and clear blue sky",
  },
  {
    slug: "ca-santa-ana",
    displayName: "Santa Ana",
    type: "city",
    parentRegion: "California",
    routePath: "/service-areas/california/santa-ana",
    seoTitle:
      "Drug Intervention Services in Santa Ana | Certified Interventionists",
    metaDescription:
      "Effective drug intervention services in Santa Ana, CA. Certified interventionists serving central Orange County — on-site within 24–48 hours, available 24/7.",
    heroEyebrow: "Santa Ana, Orange County",
    heroHeadline: "Drug Intervention Services in Santa Ana",
    heroBody:
      "On-site drug intervention services for families in Santa Ana and central Orange County. Our certified interventionists provide compassionate, structured interventions — arriving within 24–48 hours of your first call.",
    heroImage: `${CA_BASE}/ai_ca-santa-ana_hero01.jpg`,
    heroImageAlt: "Santa Ana California downtown boulevard at golden hour with palm trees",
  },
  {
    slug: "ca-long-beach",
    displayName: "Long Beach",
    type: "city",
    parentRegion: "California",
    routePath: "/service-areas/california/long-beach",
    seoTitle:
      "Alcohol Intervention Services in Long Beach | Certified Interventionists",
    metaDescription:
      "Effective alcohol intervention services in Long Beach, CA. Certified interventionists serving Long Beach and the South Bay — on-site within 24–48 hours.",
    heroEyebrow: "Long Beach, South Bay LA",
    heroHeadline: "Alcohol Intervention Services in Long Beach",
    heroBody:
      "On-site alcohol intervention services for families in Long Beach and the South Bay. Our certified interventionists know the LA County treatment landscape and can arrive at your home within 24–48 hours.",
    heroImage: `${CA_BASE}/ai_ca-long-beach_hero01.jpg`,
    heroImageAlt: "Long Beach California Queen Mary harbor at sunset with golden reflections",
  },
  {
    slug: "ca-torrance",
    displayName: "Torrance",
    type: "city",
    parentRegion: "California",
    routePath: "/service-areas/california/torrance",
    seoTitle:
      "Alcohol Intervention Services in Torrance | Certified Interventionists",
    metaDescription:
      "Effective alcohol intervention services in Torrance, CA. Certified interventionists serving Torrance and the South Bay — on-site within 24–48 hours, available 24/7.",
    heroEyebrow: "Torrance, South Bay",
    heroHeadline: "Alcohol Intervention Services in Torrance",
    heroBody:
      "On-site alcohol intervention services for families in Torrance and South Bay communities. From Redondo Beach to Gardena, our certified interventionists provide compassionate, structured support arriving within 24–48 hours.",
    heroImage: `${CA_BASE}/ai_ca-torrance_hero01.jpg`,
    heroImageAlt:
      "Torrance California residential neighborhoods with Palos Verdes Peninsula coastline at golden hour",
  },
];

// Slugs that live outside /service-areas/ and should not be prefixed
const NON_SERVICE_AREA_SLUGS = new Set(["professional-interventionist-arizona"]);

function buildState(s: { slug: string; name: string }): LocationConfig {
  return {
    slug: s.slug,
    displayName: s.name,
    type: "state",
    routePath: NON_SERVICE_AREA_SLUGS.has(s.slug)
      ? `/${s.slug}`
      : `/service-areas/${s.slug}`,
    seoTitle: `${s.name} Addiction Interventions | Family Intervention Services in ${s.name}`,
    metaDescription: `Compassionate, certified addiction and mental health interventionists serving families across ${s.name}. 24/7 crisis support, on-site help in 24–48 hours, 1,500+ families helped nationwide.`,
    heroEyebrow: `Serving ${s.name} 24/7`,
    heroHeadline: `Addiction & Mental Health Interventions in ${s.name}`,
    heroBody: `Family-centered, on-site interventions throughout ${s.name}. We help families across the state break the cycle of denial and guide loved ones into the right treatment — with structure, compassion, and proven success.`,
  };
}

function buildCity(c: { slug: string; name: string; state: string }): LocationConfig {
  return {
    slug: c.slug,
    displayName: c.name,
    type: "city",
    parentRegion: c.state,
    routePath: `/service-areas/${c.slug}`,
    seoTitle: `${c.name} Addiction Interventions | Certified Interventionists in ${c.name}`,
    metaDescription: `On-site addiction and mental health interventions throughout ${c.name} and surrounding ${c.state}. 24/7 crisis support and same-day mobilisation when needed.`,
    heroEyebrow: `Serving ${c.name} & Greater ${c.state}`,
    heroHeadline: `Addiction & Mental Health Interventions in ${c.name}`,
    heroBody: `Local, on-site help for families in ${c.name}. Our certified interventionists know the ${c.state} treatment landscape and can have the right team in your home within 24–48 hours.`,
  };
}

export const LOCATIONS: LocationConfig[] = [
  ...STATES.map(buildState),
  ...CITIES.map(buildCity),
  ...CALIFORNIA_CITIES,
];

export const LOCATION_BY_SLUG = new Map(LOCATIONS.map((l) => [l.slug, l]));
