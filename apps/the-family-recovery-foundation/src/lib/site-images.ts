/**
 * Photography migrated from tfrfoundation.org (Squarespace CDN → Supabase).
 * Prefer these over AI-generated placeholders (tfrf_hero*, tfrf_services*, etc.).
 */
const IMG = "https://jkiafgbizwufsycqlfyr.supabase.co/storage/v1/object/public/site-assets/images";

export const SITE_IMAGES = {
  /** Homepage hero background (brand-specific; kept from original build) */
  homeHero: `${IMG}/tfrf_hero002.jpg`,
  lifeLinesGreyBanner: `${IMG}/tfrf_sq_6e0219c3_LifeLinesGrey_Banner.jpg`,
  lifeLinesBlueBanner: `${IMG}/tfrf_sq_744a3663_LifeLinesBlue_Banner.png`,
  lifeLinesGreyBannerPng: `${IMG}/tfrf_sq_8d7904a2_LifeLinesGrey_Banner.png`,
  aboutLifeLines: `${IMG}/tfrf_sq_71278bf2_AboutLifeLines-Image.jpg`,
  partnership: `${IMG}/tfrf_sq_dc054bf9_Partnership.jpg`,
  /** Community / gala photography used on live events + homepage */
  galaCommunity: `${IMG}/tfrf_sq_2c2c8470_IMG_8264.jpg`,
  eventPhotoA: `${IMG}/tfrf_sq_17134601_image-asset.jpg`,
  eventPhotoB: `${IMG}/tfrf_sq_17134603_image-asset.jpg`,
  eventPhotoC: `${IMG}/tfrf_sq_17144993_image-asset.jpg`,
  eventPhotoD: `${IMG}/tfrf_sq_17392180_image-asset.jpg`,
  prevention: `${IMG}/tfrf_sq_1e665371_Prevention.jpg`,
  education: `${IMG}/tfrf_sq_055d0731_Education.jpg`,
  supportHands: `${IMG}/tfrf_sq_a631656f_Hands.jpg`,
  /** Homepage “Families We Impact” section */
  familiesImpact: `${IMG}/tfrf_families_impact01.jpg`,
} as const;

/** Homepage hero stats card — AI community member portraits (not staff) */
export const HERO_COMMUNITY_AVATARS = [
  { id: "avatar-1", src: `${IMG}/tfrf_hero_avatar01.jpg`, alt: "Community member supported by family recovery programs" },
  { id: "avatar-2", src: `${IMG}/tfrf_hero_avatar02.jpg`, alt: "Community member supported by family recovery programs" },
  { id: "avatar-3", src: `${IMG}/tfrf_hero_avatar03.jpg`, alt: "Community member supported by family recovery programs" },
  { id: "avatar-4", src: `${IMG}/tfrf_hero_avatar04.jpg`, alt: "Community member supported by family recovery programs" },
  { id: "avatar-5", src: `${IMG}/tfrf_hero_avatar05.jpg`, alt: "Community member supported by family recovery programs" },
  { id: "avatar-6", src: `${IMG}/tfrf_hero_avatar06.jpg`, alt: "Community member supported by family recovery programs" },
] as const;

/** Homepage Resources & Partners logo strip (from live tfrfoundation.org) */
export const HOME_PARTNER_LOGOS = [
  { id: "nih", src: `${IMG}/tfrf_sq_16655974_NIH.png`, alt: "National Institutes of Health" },
  {
    id: "opioid-response",
    src: `${IMG}/tfrf_sq_16655974_OpioidResponseNetwork.png`,
    alt: "Opioid Response Network",
  },
  { id: "samhsa", src: `${IMG}/tfrf_sq_16655974_Samhsa.png`, alt: "SAMHSA" },
  {
    id: "partnership-to-end",
    src: `${IMG}/tfrf_sq_16655974_PartnershipToEndAddiction.png`,
    alt: "Partnership to End Addiction",
  },
] as const;
