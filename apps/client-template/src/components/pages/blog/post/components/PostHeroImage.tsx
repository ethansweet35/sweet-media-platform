"use client";

import Image from "next/image";
import { useState } from "react";

interface PostHeroImageProps {
  src: string;
  alt: string;
}

export default function PostHeroImage({ src, alt }: PostHeroImageProps) {
  const [errored, setErrored] = useState(false);

  if (errored) {
    return (
      <div className="w-full h-[200px] rounded-2xl overflow-hidden mt-8 mb-0 bg-neutral-100 border border-neutral-200 flex flex-col items-center justify-center gap-3">
        <i className="ri-image-line text-3xl text-neutral-300" />
        <p className="text-[11px] text-neutral-400 tracking-wider uppercase">Image unavailable</p>
      </div>
    );
  }

  return (
    <div className="w-full rounded-2xl overflow-hidden mt-8 mb-0">
      <Image
        src={src}
        alt={alt}
        width={1200}
        height={630}
        priority
        className="w-full h-auto block"
        sizes="(max-width: 1280px) 100vw, 1200px"
        onError={() => setErrored(true)}
      />
    </div>
  );
}
