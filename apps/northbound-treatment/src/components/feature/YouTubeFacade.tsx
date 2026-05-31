"use client";

import { useState } from "react";

interface YouTubeFacadeProps {
  /** YouTube video ID (the part after `/embed/`). */
  videoId: string;
  /** Accessible label / iframe title. */
  title: string;
}

/**
 * Lightweight click-to-load YouTube embed.
 *
 * Renders only a static thumbnail + play button on first paint, deferring the
 * full ~1MB YouTube player (base.js, www-player.css, etc.) until the visitor
 * actually clicks play. This is the "facade" pattern GTmetrix recommends and
 * removes YouTube from the critical loading path entirely.
 */
export default function YouTubeFacade({ videoId, title }: YouTubeFacadeProps) {
  const [active, setActive] = useState(false);

  if (active) {
    return (
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="absolute inset-0 h-full w-full"
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setActive(true)}
      aria-label={`Play video: ${title}`}
      className="group absolute inset-0 h-full w-full cursor-pointer"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`}
        alt={title}
        width={480}
        height={360}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <span className="absolute inset-0 flex items-center justify-center bg-black/25 transition-colors duration-300 group-hover:bg-black/35">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-terracotta text-white shadow-xl transition-transform duration-300 group-hover:scale-110">
          <i className="ri-play-fill text-3xl leading-none" />
        </span>
      </span>
    </button>
  );
}
