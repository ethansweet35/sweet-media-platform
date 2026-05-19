/**
 * Northbound homepage Supabase asset URLs.
 * All hosted at site-assets/{logos,images}/ on the project's Supabase storage.
 */

const SUPABASE_BASE =
  "https://ahufsygjwpbymomfdazb.supabase.co/storage/v1/object/public/site-assets";

export const NB_LOGO = `${SUPABASE_BASE}/logos/northbound-logo.png`;

export const HERO_BG = `${SUPABASE_BASE}/images/nbt_hero_bg01.jpg`;

export const PROCESS_IMAGES = {
  feelBetter: `${SUPABASE_BASE}/images/nbt_process_step01_feel-better_v2.jpg`,
  discoverYourself: `${SUPABASE_BASE}/images/nbt_process_step02_discover-yourself.jpg`,
  liveFree: `${SUPABASE_BASE}/images/nbt_process_step03_live-free.jpg`,
} as const;

export const SIGNATURE_IMAGES = {
  adventureTherapy: `${SUPABASE_BASE}/images/nbt_signature_adventure-therapy.jpg`,
  soundBath: `${SUPABASE_BASE}/images/nbt_signature_sound-bath.jpg`,
  artTherapy: `${SUPABASE_BASE}/images/nbt_signature_art-therapy.jpg`,
  wolfTherapy: `${SUPABASE_BASE}/images/nbt_signature_wolf-therapy.jpg`,
  musicRecovery: `${SUPABASE_BASE}/images/nbt_signature_music-recovery.jpg`,
  yoga: `${SUPABASE_BASE}/images/nbt_signature_yoga.jpg`,
} as const;

export const WHY_US_IMAGE = `${SUPABASE_BASE}/images/nbt_why_us_hero.jpg`;

export const SIGNATURE_PAGE_IMAGES = {
  adventureHero: `${SUPABASE_BASE}/images/nbt_adventure_hero01.jpg`,
  adventureGarden: `${SUPABASE_BASE}/images/nbt_adventure_garden01.jpg`,
  adventureCanyon: `${SUPABASE_BASE}/images/nbt_adventure_canyon01.jpg`,
  adventureArt: `${SUPABASE_BASE}/images/nbt_adventure_art01.jpg`,
  wolfHero: `${SUPABASE_BASE}/images/nbt_wolf_hero01.jpg`,
  musicHero: `${SUPABASE_BASE}/images/nbt_music_hero01.jpg`,
  familyHero: `${SUPABASE_BASE}/images/nbt_family_hero01.jpg`,
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

export const GARDEN_GROVE_IMAGES = {
  exterior: `${SUPABASE_BASE}/images/facility/grove/1.webp`,
  interior: `${SUPABASE_BASE}/images/facility/grove/4.webp`,
  activities: `${SUPABASE_BASE}/images/nbt_gg_activities01_v2.jpg`,
  community: `${SUPABASE_BASE}/images/facility/grove/12.webp`,
} as const;
