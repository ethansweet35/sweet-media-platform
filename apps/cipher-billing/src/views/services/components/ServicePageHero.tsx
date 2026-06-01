import Image from "next/image";
import Link from "next/link";
import { SERVICE_CONTAINER, SERVICE_TEL_DISPLAY, SERVICE_TEL_HREF } from "./servicePageConstants";

type ServicePageHeroProps = {
  eyebrow: string;
  title: string;
  titleAccent?: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  secondaryCta?: { label: string; href: string };
};

export default function ServicePageHero({
  eyebrow,
  title,
  titleAccent,
  description,
  imageSrc,
  imageAlt,
  secondaryCta,
}: ServicePageHeroProps) {
  const headlineDefault = titleAccent ? `${title} ${titleAccent}` : title;

  return (
    <section className="relative overflow-hidden bg-[#101E3F]">
      <div className="absolute inset-0">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "linear-gradient(270deg, rgba(11, 26, 46, 0.61) 0%, #101E3F 100%)",
          }}
        />
      </div>
      <div className={`relative py-[50px] md:py-[100px] ${SERVICE_CONTAINER}`}>
        <div className="max-w-3xl">
          <div className="flex items-center gap-4">
            <span className="h-px w-12 min-w-[48px] bg-white/80" aria-hidden />
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#166C96]">
              {eyebrow}
            </p>
          </div>
          <h1 className="mt-4 font-[var(--font-heading)] text-4xl font-medium leading-[1.1] tracking-[-0.02em] text-white md:text-5xl">
            {title}
            {titleAccent ? (
              <>
                {" "}
                <span className="text-[#166C96]">{titleAccent}</span>
              </>
            ) : null}
          </h1>
          <p className="mt-6 max-w-2xl border-l-[3px] border-white/90 pl-8 text-sm leading-[1.65] text-white/90 md:text-base">
            {description}
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href={SERVICE_TEL_HREF}
              suppressHydrationWarning
              className="inline-flex rounded-[3px] bg-[#166C96] px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-white transition hover:bg-[#145a82]"
            >
              Call {SERVICE_TEL_DISPLAY}
            </a>
            {secondaryCta ? (
              <Link
                href={secondaryCta.href}
                className="inline-flex rounded-[3px] border border-white/40 px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-white transition hover:border-white/70 hover:bg-white/10"
              >
                {secondaryCta.label}
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
