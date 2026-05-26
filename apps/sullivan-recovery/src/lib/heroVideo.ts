export const HERO_VIDEO_DESKTOP =
  "https://knvkrhwlflkulybcmgmq.supabase.co/storage/v1/object/public/site-assets/videos/sr_home_hero_video.mp4";

export const HERO_VIDEO_MOBILE =
  "https://knvkrhwlflkulybcmgmq.supabase.co/storage/v1/object/public/site-assets/videos/sr_home_hero_video_mobile.mp4";

export const heroVideoProps = {
  autoPlay: true,
  loop: true,
  muted: true,
  playsInline: true,
  className: "h-full w-full object-cover object-center",
} as const;
