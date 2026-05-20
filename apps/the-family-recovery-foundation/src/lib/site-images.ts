/**
 * Photography migrated from tfrfoundation.org (Squarespace CDN → Supabase).
 * Prefer these over AI-generated placeholders (tfrf_hero*, tfrf_services*, etc.).
 */
const IMG = "https://jkiafgbizwufsycqlfyr.supabase.co/storage/v1/object/public/site-assets/images";

export const SITE_IMAGES = {
  /** Homepage hero — LifeLines grey banner */
  heroBanner: `${IMG}/tfrf_sq_6e0219c3_LifeLinesGrey_Banner.jpg`,
  lifeLinesBlueBanner: `${IMG}/tfrf_sq_744a3663_LifeLinesBlue_Banner.png`,
  lifeLinesGreyBanner: `${IMG}/tfrf_sq_8d7904a2_LifeLinesGrey_Banner.png`,
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
} as const;
