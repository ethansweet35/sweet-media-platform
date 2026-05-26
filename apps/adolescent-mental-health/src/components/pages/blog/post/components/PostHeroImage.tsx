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
      <div className="mb-0 mt-8 flex h-[200px] flex-col items-center justify-center gap-3 rounded-3xl border border-border bg-surface">
        <i className="ri-image-line text-3xl text-border" aria-hidden />
        <p className="text-[11px] uppercase tracking-wider text-body">Image unavailable</p>
      </div>
    );
  }

  return (
    <div className="mb-0 mt-8 w-full overflow-hidden rounded-3xl ring-1 ring-border">
      <Image
        src={src}
        alt={alt}
        width={1200}
        height={630}
        priority
        className="block h-auto w-full"
        sizes="(max-width: 1280px) 100vw, 1200px"
        onError={() => setErrored(true)}
      />
    </div>
  );
}
