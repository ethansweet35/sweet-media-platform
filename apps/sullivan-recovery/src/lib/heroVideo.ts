export const SR_SUPABASE_ORIGIN = "https://knvkrhwlflkulybcmgmq.supabase.co";

export const HERO_VIDEO_DESKTOP =
  `${SR_SUPABASE_ORIGIN}/storage/v1/object/public/site-assets/videos/sr_home_hero_video.mp4`;

export const HERO_VIDEO_MOBILE =
  `${SR_SUPABASE_ORIGIN}/storage/v1/object/public/site-assets/videos/sr_home_hero_video_mobile.mp4`;

/** First frame of the hero loop — LCP background on `/` (see HomeHero). */
export const HERO_POSTER_URL =
  `${SR_SUPABASE_ORIGIN}/storage/v1/object/public/site-assets/images/sr_home_hero_poster.webp`;

export const heroVideoProps = {
  autoPlay: true,
  loop: true,
  muted: true,
  playsInline: true,
  preload: "none",
  poster: HERO_POSTER_URL,
  className: "h-full w-full object-cover object-right md:object-center",
} as const;
