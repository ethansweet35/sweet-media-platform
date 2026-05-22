import Image from "next/image";
import type { ReactNode } from "react";
import { SERVICE_CONTAINER, SERVICE_SECTION_PY } from "./servicePageConstants";
import ServiceSectionHeader from "./ServiceSectionHeader";

type ServiceSplitSectionProps = {
  eyebrow: string;
  heading: string;
  accent?: string;
  imageSrc: string;
  imageAlt: string;
  imagePosition?: "left" | "right";
  tone?: "white" | "slate";
  children: ReactNode;
};

export default function ServiceSplitSection({
  eyebrow,
  heading,
  accent,
  imageSrc,
  imageAlt,
  imagePosition = "right",
  tone = "white",
  children,
}: ServiceSplitSectionProps) {
  const bg = tone === "slate" ? "bg-[#F5F7FA]" : "bg-white";
  const imageBlock = (
    <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-lg ring-1 ring-slate-200/80">
      <Image src={imageSrc} alt={imageAlt} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 460px" />
    </div>
  );

  return (
    <section className={`${bg} ${SERVICE_SECTION_PY}`}>
      <div className={`${SERVICE_CONTAINER} grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16`}>
        {imagePosition === "left" ? imageBlock : null}
        <div>
          <ServiceSectionHeader eyebrow={eyebrow} heading={heading} accent={accent} />
          <div className="mt-8 space-y-4 text-[15px] leading-[1.7] text-slate-600 [&_ul]:mt-4 [&_ul]:space-y-2 [&_ul]:pl-5 [&_ul]:list-disc [&_strong]:font-semibold [&_strong]:text-[#101E3F]">
            {children}
          </div>
        </div>
        {imagePosition === "right" ? imageBlock : null}
      </div>
    </section>
  );
}
