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
];

export const LOCATION_BY_SLUG = new Map(LOCATIONS.map((l) => [l.slug, l]));
