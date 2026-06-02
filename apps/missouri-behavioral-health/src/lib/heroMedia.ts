/** Homepage hero — WebP poster is LCP; video loads deferred (see DeferredHeroVideo). */

export const MBH_SUPABASE_ORIGIN = "https://yfwyxafsgexejjebkwor.supabase.co";

const IMAGES = `${MBH_SUPABASE_ORIGIN}/storage/v1/object/public/site-assets/images`;
const VIDEOS = `${MBH_SUPABASE_ORIGIN}/storage/v1/object/public/site-assets/videos`;

export const MBH_HERO_VIDEO_URL = `${VIDEOS}/mbh_hero_bg.mp4`;

/** Same asset until a dedicated mobile encode exists. */
export const MBH_HERO_VIDEO_MOBILE = MBH_HERO_VIDEO_URL;
export const MBH_HERO_VIDEO_DESKTOP = MBH_HERO_VIDEO_URL;

/**
 * LCP posters — same-origin `/public/images` for zero extra connection on first paint.
 * Regenerate via scripts/optimize-hero-poster.mjs (also uploads Supabase fallbacks).
 */
const LOCAL_POSTERS = "/images";
export const MBH_HERO_POSTER_MOBILE_AVIF_URL = `${LOCAL_POSTERS}/mbh_home_hero_poster_mobile.avif`;
export const MBH_HERO_POSTER_MOBILE_URL = `${LOCAL_POSTERS}/mbh_home_hero_poster_mobile.webp`;
export const MBH_HERO_POSTER_DESKTOP_URL = `${LOCAL_POSTERS}/mbh_home_hero_poster.webp`;

/** @deprecated Use MBH_HERO_POSTER_DESKTOP_URL */
export const MBH_HERO_POSTER_URL = MBH_HERO_POSTER_DESKTOP_URL;
