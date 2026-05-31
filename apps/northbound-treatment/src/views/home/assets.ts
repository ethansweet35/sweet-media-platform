/**
 * Northbound homepage Supabase asset URLs.
 * All hosted at site-assets/{logos,images}/ on the project's Supabase storage.
 */

const SUPABASE_BASE =
  "https://ahufsygjwpbymomfdazb.supabase.co/storage/v1/object/public/site-assets";

export const NB_LOGO = `${SUPABASE_BASE}/logos/northbound-logo.png`;

export const HERO_BG = `${SUPABASE_BASE}/images/nbt_hero_bg01.jpg`;

/** Real Grove campus photography for the homepage three-step process timeline. */
export const PROCESS_IMAGES = {
  feelBetter: `${SUPABASE_BASE}/images/facility/grove/6.webp`,
  discoverYourself: `${SUPABASE_BASE}/images/facility/grove/carousel-06.jpg`,
  liveFree: `${SUPABASE_BASE}/images/facility/grove/carousel-04.webp`,
} as const;

export const SIGNATURE_IMAGES = {
  adventureTherapy: `${SUPABASE_BASE}/images/facility/grove/carousel-02.webp`,
  soundBath: `${SUPABASE_BASE}/images/facility/grove/4.webp`,
  artTherapy: `${SUPABASE_BASE}/images/facility/grove/carousel-05.webp`,
  wolfTherapy: `${SUPABASE_BASE}/images/facility/wolf/1.jpg`,
  musicRecovery: `${SUPABASE_BASE}/images/facility/grove/carousel-03.webp`,
  yoga: `${SUPABASE_BASE}/images/nbt_spiritual_wellness04.jpg`,
} as const;

export const WHY_US_IMAGE = `${SUPABASE_BASE}/images/facility/grove/carousel-01.webp`;

export const SIGNATURE_PAGE_IMAGES = {
  adventureHero: `${SUPABASE_BASE}/images/facility/grove/carousel-02.webp`,
  adventureGarden: `${SUPABASE_BASE}/images/nbt_spiritual_wellness04.jpg`,
  adventureCanyon: `${SUPABASE_BASE}/images/facility/grove/carousel-04.webp`,
  adventureArt: `${SUPABASE_BASE}/images/facility/grove/carousel-05.webp`,
  spiritualHero: `${SUPABASE_BASE}/images/facility/grove/carousel-02.webp`,
  spiritualBreathwork: `${SUPABASE_BASE}/images/facility/grove/carousel-06.jpg`,
  spiritualWellness: `${SUPABASE_BASE}/images/nbt_spiritual_wellness04.jpg`,
  musicHero: `${SUPABASE_BASE}/images/facility/grove/carousel-03.webp`,
  familyHero: `${SUPABASE_BASE}/images/facility/grove/carousel-07.webp`,
} as const;

/** Real facility and program photography for Treatment Services pages (no AI-generated assets). */
export const SERVICE_IMAGES = {
  wolfHero: `${SUPABASE_BASE}/images/facility/wolf/1.jpg`,
  wolfSession: `${SUPABASE_BASE}/images/facility/wolf/2.jpg`,
  wolfEncounter: `${SUPABASE_BASE}/images/facility/wolf/3.jpg`,
  wolfGroup: `${SUPABASE_BASE}/images/facility/wolf/4.jpg`,
  supportGroup: `${SUPABASE_BASE}/images/facility/grove/carousel-07.webp`,
  mindfulnessCircle: `${SUPABASE_BASE}/images/facility/grove/carousel-06.jpg`,
  outdoorMeditation: `${SUPABASE_BASE}/images/nbt_spiritual_wellness04.jpg`,
  campusExterior: `${SUPABASE_BASE}/images/facility/grove/carousel-01.webp`,
  communalLounge: `${SUPABASE_BASE}/images/facility/grove/carousel-03.webp`,
  outdoorCircle: `${SUPABASE_BASE}/images/facility/grove/carousel-02.webp`,
  meditationLounge: `${SUPABASE_BASE}/images/facility/grove/4.webp`,
  residentialBedroom: `${SUPABASE_BASE}/images/facility/grove/6.webp`,
  commons: `${SUPABASE_BASE}/images/facility/grove/carousel-05.webp`,
} as const;

export const DUAL_DIAGNOSIS_IMAGES = {
  anxietyHero: `${SUPABASE_BASE}/images/nbt_anxiety_hero01.jpg`,
  anxietyTherapy: `${SUPABASE_BASE}/images/nbt_anxiety_therapy01.jpg`,
  anxietyRecovery: `${SUPABASE_BASE}/images/nbt_anxiety_recovery01.jpg`,
  bipolarHero: `${SUPABASE_BASE}/images/nbt_bipolar_hero01.jpg`,
  bipolarTherapy: `${SUPABASE_BASE}/images/nbt_bipolar_therapy01.jpg`,
  bipolarRecovery: `${SUPABASE_BASE}/images/nbt_bipolar_recovery01.jpg`,
  bpdHero: `${SUPABASE_BASE}/images/nbt_bpd_hero01.jpg`,
  bpdTherapy: `${SUPABASE_BASE}/images/nbt_bpd_therapy01.jpg`,
  bpdRecovery: `${SUPABASE_BASE}/images/nbt_bpd_recovery01.jpg`,
  depressionHero: `${SUPABASE_BASE}/images/nbt_depression_hero01.jpg`,
  depressionTherapy: `${SUPABASE_BASE}/images/nbt_depression_therapy01.jpg`,
  depressionRecovery: `${SUPABASE_BASE}/images/nbt_depression_recovery01.jpg`,
  codependencyHero: `${SUPABASE_BASE}/images/nbt_codependency_hero01.jpg`,
  codependencyTherapy: `${SUPABASE_BASE}/images/nbt_codependency_therapy01.jpg`,
  codependencyRecovery: `${SUPABASE_BASE}/images/nbt_codependency_recovery01.jpg`,
  traumaHero: `${SUPABASE_BASE}/images/nbt_trauma_hero01.jpg`,
  traumaTherapy: `${SUPABASE_BASE}/images/nbt_trauma_therapy01.jpg`,
  traumaRecovery: `${SUPABASE_BASE}/images/nbt_trauma_recovery01.jpg`,
  ocdHero: `${SUPABASE_BASE}/images/nbt_ocd_hero01.jpg`,
  ocdTherapy: `${SUPABASE_BASE}/images/nbt_ocd_therapy01.jpg`,
  ocdRecovery: `${SUPABASE_BASE}/images/nbt_ocd_recovery01.jpg`,
} as const;

export const SUBSTANCE_PAGE_IMAGES = {
  alcoholHero: `${SUPABASE_BASE}/images/nbt_alcohol_hero01.jpg`,
  alcoholTherapy: `${SUPABASE_BASE}/images/nbt_alcohol_therapy01.jpg`,
  alcoholRecovery: `${SUPABASE_BASE}/images/nbt_alcohol_recovery01.jpg`,
  cocaineHero: `${SUPABASE_BASE}/images/nbt_cocaine_hero01.jpg`,
  cocaineTherapy: `${SUPABASE_BASE}/images/nbt_cocaine_therapy01.jpg`,
  cocaineRecovery: `${SUPABASE_BASE}/images/nbt_cocaine_recovery01.jpg`,
  heroinHero: `${SUPABASE_BASE}/images/nbt_heroin_hero01.jpg`,
  heroinTherapy: `${SUPABASE_BASE}/images/nbt_heroin_therapy01.jpg`,
  heroinRecovery: `${SUPABASE_BASE}/images/nbt_heroin_recovery01.jpg`,
  marijuanaHero: `${SUPABASE_BASE}/images/nbt_marijuana_hero01.jpg`,
  marijuanaTherapy: `${SUPABASE_BASE}/images/nbt_marijuana_therapy01.jpg`,
  marijuanaRecovery: `${SUPABASE_BASE}/images/nbt_marijuana_recovery01.jpg`,
  methHero: `${SUPABASE_BASE}/images/nbt_meth_hero01.jpg`,
  methTherapy: `${SUPABASE_BASE}/images/nbt_meth_therapy01.jpg`,
  methRecovery: `${SUPABASE_BASE}/images/nbt_meth_recovery01.jpg`,
  prescriptionHero: `${SUPABASE_BASE}/images/nbt_prescription_hero01.jpg`,
  prescriptionTherapy: `${SUPABASE_BASE}/images/nbt_prescription_therapy01.jpg`,
  prescriptionRecovery: `${SUPABASE_BASE}/images/nbt_prescription_recovery01.jpg`,
} as const;

export const LOCATION_IMAGES = {
  orangeCounty: `${SUPABASE_BASE}/images/nbt_oc_county_hero01.jpg`,
  newportBeach: `${SUPABASE_BASE}/images/facility/newport/1.webp`,
  gardenGrove: `${SUPABASE_BASE}/images/facility/grove/2.webp`,
  sanDiego: `${SUPABASE_BASE}/images/facility/sandiego/1.webp`,
  seattle: `${SUPABASE_BASE}/images/facility/seattle/1.webp`,
} as const;

export const NEWPORT_BEACH_IMAGES = {
  hero: `${SUPABASE_BASE}/images/facility/newport/1.webp`,
  interior: `${SUPABASE_BASE}/images/facility/newport/4.webp`,
  beach: `${SUPABASE_BASE}/images/facility/newport/7.webp`,
  garden: `${SUPABASE_BASE}/images/facility/newport/9.webp`,
} as const;

export const SAN_DIEGO_IMAGES = {
  hero: `${SUPABASE_BASE}/images/facility/sandiego/1.webp`,
  office: `${SUPABASE_BASE}/images/facility/sandiego/3.webp`,
  group: `${SUPABASE_BASE}/images/facility/sandiego/6.webp`,
} as const;

export const SEATTLE_IMAGES = {
  hero: `${SUPABASE_BASE}/images/facility/seattle/1.webp`,
  neighborhood: `${SUPABASE_BASE}/images/facility/seattle/3.webp`,
  nature: `${SUPABASE_BASE}/images/facility/seattle/5.webp`,
} as const;

export const ORANGE_COUNTY_IMAGES = {
  hero: `${SUPABASE_BASE}/images/nbt_oc_county_hero01.jpg`,
  intro: `${SUPABASE_BASE}/images/facility/newport/2.webp`,
  groveCampus: `${SUPABASE_BASE}/images/facility/grove/3.webp`,
  newportCampus: `${SUPABASE_BASE}/images/facility/newport/3.webp`,
  holistic: `${SUPABASE_BASE}/images/facility/newport/5.webp`,
} as const;

export const GARDEN_GROVE_IMAGES = {
  exterior: `${SUPABASE_BASE}/images/facility/grove/2.webp`,
  bedroom: `${SUPABASE_BASE}/images/facility/grove/6.webp`,
  interior: `${SUPABASE_BASE}/images/facility/grove/4.webp`,
  activities: `${SUPABASE_BASE}/images/nbt_spiritual_wellness04.jpg`,
  community: `${SUPABASE_BASE}/images/facility/grove/12.webp`,
} as const;

/** Garden Grove intro carousel — matches live site gallery order. */
export const GARDEN_GROVE_CAROUSEL = [
  {
    src: `${SUPABASE_BASE}/images/facility/grove/carousel-01.webp`,
    alt: "The Grove campus exterior — Northbound's Garden Grove residential treatment facility",
  },
  {
    src: `${SUPABASE_BASE}/images/facility/grove/carousel-02.webp`,
    alt: "Outdoor meditation circle with Adirondack seating on The Grove campus lawn",
  },
  {
    src: `${SUPABASE_BASE}/images/facility/grove/carousel-03.webp`,
    alt: "Comfortable communal lounge at The Grove — Northbound's Garden Grove residential treatment facility",
  },
  {
    src: `${SUPABASE_BASE}/images/facility/grove/carousel-04.webp`,
    alt: "Outdoor reflection space at The Grove — shaded lawn with group seating at dusk",
  },
  {
    src: `${SUPABASE_BASE}/images/facility/grove/carousel-05.webp`,
    alt: "Commons area at The Grove with GROVE marquee sign — shared campus gathering space",
  },
  {
    src: `${SUPABASE_BASE}/images/facility/grove/carousel-06.jpg`,
    alt: "Mindfulness circle at The Grove — clients holding hands during guided outdoor meditation",
  },
  {
    src: `${SUPABASE_BASE}/images/facility/grove/carousel-07.webp`,
    alt: "Support group at The Grove — participants joined in a recovery circle",
  },
] as const;
