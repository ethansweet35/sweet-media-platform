export const SITE = {
  brand: "Adolescent Mental Health",
  phone: {
    display: "(949) 946-5876",
    href: "tel:+19499465876",
  },
  email: "admissions@adolescentmentalhealth.com",
  ages: "12–17",
} as const;

export const SB_ROOT =
  "https://almncgkbmooyuptdgkhe.supabase.co/storage/v1/object/public/site-assets/images";

export const CONTAINER = "mx-auto max-w-content";

/** Brand logo + payer marks — live under site-assets/images/logos/, not wp-migrated. */
export const BRAND_LOGO = `${SB_ROOT}/logos/amh-logo.png`;

export const INSURANCE_LOGOS = {
  cigna: `${SB_ROOT}/logos/insurance/cigna.png`,
  anthem: `${SB_ROOT}/logos/insurance/anthem.png`,
  aetna: `${SB_ROOT}/logos/insurance/aetna.png`,
  becn: `${SB_ROOT}/logos/insurance/becn.png`,
  umr: `${SB_ROOT}/logos/insurance/umr.webp`,
} as const;

export const HOME_IMGS = {
  heroTeen: `${SB_ROOT}/amh_hero_virtual_v1.jpg`,
  virtualIop: `${SB_ROOT}/amh_iop_section_v1.jpg`,
  resilience: `${SB_ROOT}/amh_resilience_bg_v1.jpg`,
  whyConvenience: `${SB_ROOT}/amh_home_why01.jpg`,
  whyClinical: `${SB_ROOT}/amh_home_why02.jpg`,
  whyInsurance: `${SB_ROOT}/amh_home_why03.jpg`,
} as const;

export const PAGE_IMGS = {
  aboutHero: `${SB_ROOT}/amh_about_hero01.jpg`,
  aboutMission: `${SB_ROOT}/amh_about_mission01.jpg`,
  aboutTeam: `${SB_ROOT}/amh_about_serve01.jpg`,
  contactHero: `${SB_ROOT}/amh_contact_hero01.jpg`,
} as const;

export const ADOLESCENT_IOP_IMGS = {
  hero: `${SB_ROOT}/amh_aiop_hero01.jpg`,
  bento: `${SB_ROOT}/amh_aiop_bento01.jpg`,
  individual: `${SB_ROOT}/amh_aiop_individual01.jpg`,
  group: `${SB_ROOT}/amh_aiop_group01.jpg`,
  family: `${SB_ROOT}/amh_aiop_family01.jpg`,
} as const;

export const ADMISSIONS_IMGS = {
  hero: `${SB_ROOT}/amh_admissions_hero01.jpg`,
  intake: `${SB_ROOT}/amh_admissions_intake01.jpg`,
} as const;

export const SERVICES_IMGS = {
  hero: `${SB_ROOT}/amh_services_hero01.jpg`,
} as const;

export const RESOURCES_IMGS = {
  hero: `${SB_ROOT}/amh_resources_hero01.jpg`,
  support: `${SB_ROOT}/amh_resources_support01.jpg`,
} as const;

export const VIOP_IMGS = {
  hero: `${SB_ROOT}/amh_viop_hero02.jpg`,
  bento: `${SB_ROOT}/amh_viop_bento01.jpg`,
  individual: `${SB_ROOT}/amh_viop_individual05.jpg`,
  group: `${SB_ROOT}/amh_viop_group03.jpg`,
  family: `${SB_ROOT}/amh_viop_family04.jpg`,
} as const;

export const CBT_IMGS = {
  hero: `${SB_ROOT}/amh_cbt_hero01.jpg`,
  bento: `${SB_ROOT}/amh_cbt_bento01.jpg`,
} as const;

export const DBT_IMGS = {
  hero: `${SB_ROOT}/amh_dbt_hero01.jpg`,
  bento: `${SB_ROOT}/amh_dbt_bento01.jpg`,
} as const;

export const INSOMNIA_IMGS = {
  hero: `${SB_ROOT}/amh_insomnia_hero01.jpg`,
  bento: `${SB_ROOT}/amh_insomnia_bento01.jpg`,
} as const;

export const BIPOLAR_IMGS = {
  hero: `${SB_ROOT}/amh_bipolar_hero01.jpg`,
  bento: `${SB_ROOT}/amh_bipolar_bento01.jpg`,
} as const;

export const INDIVIDUAL_THERAPY_IMGS = {
  hero: `${SB_ROOT}/amh_indiv_hero01.jpg`,
  bento: `${SB_ROOT}/amh_indiv_bento01.jpg`,
  overview: `${SB_ROOT}/amh_indiv_overview01.jpg`,
} as const;

export const HUB_IMGS = {
  treatment: `${SB_ROOT}/amh_treatment_hero01.jpg`,
  therapy: `${SB_ROOT}/amh_therapy_hub_hero01.jpg`,
  levelsOfCare: `${SB_ROOT}/amh_loc_hero01.jpg`,
} as const;

export const THERAPY_IMGS = {
  group: {
    hero: `${SB_ROOT}/amh_group_hero01.jpg`,
    bento: `${SB_ROOT}/amh_group_bento01.jpg`,
    overview: `${SB_ROOT}/amh_group_overview01.jpg`,
  },
  family: {
    hero: `${SB_ROOT}/amh_family_hero01.jpg`,
    bento: `${SB_ROOT}/amh_family_bento01.jpg`,
    overview: `${SB_ROOT}/amh_family_overview01.jpg`,
  },
} as const;

export const CONDITION_IMGS = {
  anxiety: `${SB_ROOT}/amh_cond_anxiety_hero01.jpg`,
  depression: `${SB_ROOT}/amh_cond_depression_hero01.jpg`,
  trauma: `${SB_ROOT}/amh_cond_trauma_hero01.jpg`,
  adhd: `${SB_ROOT}/amh_cond_adhd_hero01.jpg`,
  selfHarm: `${SB_ROOT}/amh_cond_selfharm_hero01.jpg`,
  schoolAvoidance: `${SB_ROOT}/amh_cond_school_hero01.jpg`,
  bipolar: `${SB_ROOT}/amh_cond_bipolar_hero01.jpg`,
} as const;

export const TREATMENT_LANDING_IMGS = {
  depression: {
    hero: CONDITION_IMGS.depression,
    bento: `${SB_ROOT}/amh_treat_depression_bento01.jpg`,
  },
  ptsd: {
    hero: CONDITION_IMGS.trauma,
    bento: `${SB_ROOT}/amh_treat_ptsd_bento01.jpg`,
  },
  anxiety: {
    hero: CONDITION_IMGS.anxiety,
    bento: `${SB_ROOT}/amh_treat_anxiety_bento01.jpg`,
  },
  adhd: {
    hero: CONDITION_IMGS.adhd,
    bento: `${SB_ROOT}/amh_treat_adhd_bento01.jpg`,
  },
  ocd: {
    hero: `${SB_ROOT}/amh_treat_ocd_hero01.jpg`,
    bento: `${SB_ROOT}/amh_treat_ocd_bento01.jpg`,
  },
  schizophrenia: {
    hero: `${SB_ROOT}/amh_treat_schiz_hero01.jpg`,
    bento: `${SB_ROOT}/amh_treat_schiz_bento01.jpg`,
  },
  psychiatrist: {
    hero: `${SB_ROOT}/amh_treat_psych_hero01.jpg`,
    bento: `${SB_ROOT}/amh_treat_psych_bento01.jpg`,
  },
} as const;

export const INSURANCE_IMGS = {
  hero: `${SB_ROOT}/amh_insurance_hero01.jpg`,
} as const;
