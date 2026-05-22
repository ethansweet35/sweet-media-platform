import Image from "next/image";
import type { ReactNode } from "react";

import { LANDING_SECTION_PY, SERVICE_CONTAINER } from "@/views/services/components/servicePageConstants";

type ServiceLandingImageBandProps = {
  eyebrow: string;
  heading: ReactNode;
  children: ReactNode;
  imageSrc: string;
  imageAlt: string;
  imagePosition?: "left" | "right";
};

/** Navy band with text + photo — used on IOP/PHP/residential landings. */
export default function ServiceLandingImageBand({
  eyebrow,
  heading,
  children,
  imageSrc,
  imageAlt,
  imagePosition = "right",
}: ServiceLandingImageBandProps) {
  const imageBlock = (
    <div className="relative aspect-[4/3] overflow-hidden rounded-xl shadow-2xl ring-1 ring-white/10">
      <Image src={imageSrc} alt={imageAlt} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 520px" />
    </div>
  );

  return (
    <section className={`bg-[#101E3F] text-white ${LANDING_SECTION_PY}`}>
      <div className={`${SERVICE_CONTAINER} grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-14`}>
        {imagePosition === "left" ? imageBlock : null}
        <div className={imagePosition === "left" ? "lg:py-2" : ""}>
          <div className="flex items-center gap-3">
            <span className="h-px w-10 bg-[#166C96]" aria-hidden />
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#5eb5e0]">{eyebrow}</p>
          </div>
          <h2 className="mt-4 font-[var(--font-heading)] text-[1.75rem] font-medium leading-tight md:text-[2.125rem]">
            {heading}
          </h2>
          <div className="mt-5 space-y-4 text-[15px] leading-[1.75] text-white/85 [&_p:last-child]:text-white/70">
            {children}
          </div>
        </div>
        {imagePosition === "right" ? imageBlock : null}
      </div>
    </section>
  );
}
