"use client";

import { useState } from "react";

const HERO_POSTER =
  "https://nstzjqmtsqgeihkyvkqq.supabase.co/storage/v1/object/public/site-assets/images/Untitled-design-2026-04-15T202355.948.png";

type HomeHeroVideoProps = {
  src: string;
};

/**
 * Hero background video — poster shows immediately; video fades in when ready
 * (avoids blank hero while a multi-MB MP4 loads, without a harsh poster flash).
 */
export default function HomeHeroVideo({ src }: HomeHeroVideoProps) {
  const [videoReady, setVideoReady] = useState(false);

  return (
    <video
      className={`h-full w-full object-cover transition-opacity duration-700 ease-out ${
        videoReady ? "opacity-100" : "opacity-0"
      }`}
      autoPlay
      muted
      playsInline
      loop
      preload="auto"
      poster={HERO_POSTER}
      onCanPlay={() => setVideoReady(true)}
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}
