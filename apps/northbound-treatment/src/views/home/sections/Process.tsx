import Image from "next/image";
import Link from "next/link";
import { PROCESS_IMAGES } from "../assets";
import { AutoLinkedText } from "@sweetmedia/blog-core";

/**
 * Process — staggered 3-step timeline. Each step has a numbered badge in the
 * center spine, copy on one side, image on the other. Per Figma Process.tsx.
 *
 * NOTE: Tailwind v4's static class scanner cannot resolve `bg-${color}` at
 * build time, so each step carries explicit literal class strings.
 */

type StepTone = {
  /** Step badge label color (e.g. "Step 01") */
  label: string;
  /** Numbered ring border color */
  ring: string;
  /** Hover state ring + bg fill */
  ringHover: string;
  /** Eyebrow connector line bg */
  bar: string;
  /** Subtle image overlay */
  imgOverlay: string;
  /** Title hover color */
  titleHover: string;
};

const STEPS: Array<{
  number: number;
  label: string;
  title: string;
  href: string;
  description: string;
  image: string;
  alt: string;
  tone: StepTone;
}> = [
  {
    number: 1,
    label: "Step 01",
    title: "Feel Better",
    href: "/programs/detox/",
    description:
      "Our detox services give clients a safe, medically supervised start to recovery. This phase focuses on stabilizing the body, reducing cravings, and preparing each individual to transition smoothly into residential care utilizing Medication-Assisted Treatment (MAT).",
    image: PROCESS_IMAGES.feelBetter,
    alt: "Private residential bedroom at The Grove — Northbound's Garden Grove campus, prepared for a comfortable start to recovery.",
    tone: {
      label: "text-terracotta",
      ring: "border-terracotta/30",
      ringHover:
        "group-hover:bg-terracotta group-hover:border-terracotta group-hover:text-white",
      bar: "bg-terracotta",
      imgOverlay: "bg-terracotta/20",
      titleHover: "group-hover:text-terracotta",
    },
  },
  {
    number: 2,
    label: "Step 02",
    title: "Discover Yourself",
    href: "/programs/residential-treatment-center/",
    description:
      "In our residential, PHP, and IOP programs, clients begin the deeper therapeutic work. We address underlying trauma, build coping tools, repair emotional health, and develop the foundation needed for personal insight and sustainable habits.",
    image: PROCESS_IMAGES.discoverYourself,
    alt: "Clients in a guided outdoor mindfulness circle at The Grove — deeper therapeutic work on Northbound's Garden Grove campus.",
    tone: {
      label: "text-navy",
      ring: "border-navy/30",
      ringHover: "group-hover:bg-navy group-hover:border-navy group-hover:text-white",
      bar: "bg-navy",
      imgOverlay: "bg-navy/20",
      titleHover: "group-hover:text-navy",
    },
  },
  {
    number: 3,
    label: "Step 03",
    title: "Live Free",
    href: "/programs/aftercare/",
    description:
      "Through aftercare and alumni support, clients receive ongoing structure and accountability. Our team provides relapse-prevention planning and lifelong recovery resources to maintain momentum long after treatment ends.",
    image: PROCESS_IMAGES.liveFree,
    alt: "Outdoor reflection space at The Grove — shaded lawn and group seating at dusk on Northbound's Garden Grove campus.",
    tone: {
      label: "text-espresso",
      ring: "border-espresso/30",
      ringHover:
        "group-hover:bg-espresso group-hover:border-espresso group-hover:text-white",
      bar: "bg-espresso",
      imgOverlay: "bg-espresso/20",
      titleHover: "group-hover:text-espresso",
    },
  },
];

export default function Process() {
  return (
    <section
      id="process"
      className="relative overflow-hidden bg-sand-light py-32"
    >
      <div className="pointer-events-none absolute left-0 top-20 h-72 w-72 rounded-full bg-navy/10 blur-3xl"></div>
      <div className="pointer-events-none absolute bottom-20 right-0 h-96 w-96 rounded-full bg-terracotta/5 blur-3xl"></div>
      <div className="pointer-events-none absolute left-1/4 top-1/2 h-1 w-48 bg-gradient-to-r from-transparent via-navy/20 to-transparent"></div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12">
        <div className="mx-auto mb-24 max-w-3xl text-center">
          <div className="mb-6 flex items-center justify-center gap-3">
            <div className="h-[1px] w-8 bg-navy"></div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-navy">
              A Proven Pathway
            </p>
            <div className="h-[1px] w-8 bg-navy"></div>
          </div>
          <h2 className="mb-6 font-serif text-4xl text-espresso lg:text-6xl">
            The Northbound Process.
          </h2>
          <p className="font-light leading-relaxed text-espresso/70">
            <AutoLinkedText>{"Finding an addiction treatment center you can truly trust matters.\n            That&rsquo;s why we rely on a center built around you, your needs,\n            and a definitive three-step journey to long-term recovery."}</AutoLinkedText>
          </p>
        </div>

        <div className="relative space-y-24">
          <div className="absolute bottom-0 left-[27px] top-0 z-0 w-[1px] bg-gradient-to-b from-terracotta via-navy to-espresso md:left-1/2 md:-translate-x-1/2"></div>

          {STEPS.map((step, index) => {
            const copyOnLeft = index % 2 === 0;
            return (
              <div
                key={step.number}
                className="group relative z-10 flex flex-col items-center justify-between md:flex-row"
              >
                <div
                  className={`mt-6 pl-16 md:mt-0 md:w-5/12 md:pl-0 ${
                    copyOnLeft
                      ? "order-2 md:order-1 md:text-right"
                      : "order-2 md:order-3 md:text-left"
                  }`}
                >
                  <p
                    className={`mb-2 flex items-center gap-3 font-serif text-xl italic ${step.tone.label} ${
                      copyOnLeft ? "md:justify-end" : "md:justify-start"
                    }`}
                  >
                    <span
                      className={`h-[1px] w-12 ${step.tone.bar} ${
                        copyOnLeft ? "order-2" : "order-1"
                      }`}
                    ></span>
                    {step.label}
                  </p>
                  <Link href={step.href}>
                    <h3
                      className={`mb-4 font-serif text-3xl text-espresso transition-colors duration-300 ${step.tone.titleHover}`}
                    >
                      {step.title}
                    </h3>
                  </Link>
                  <p className="text-sm font-light leading-relaxed text-espresso/70"><AutoLinkedText>{step.description}</AutoLinkedText></p>
                </div>

                <div
                  className={`absolute left-0 z-10 order-1 flex h-14 w-14 items-center justify-center rounded-full border-2 bg-sand shadow-md transition-all duration-500 group-hover:scale-125 group-hover:shadow-xl md:left-1/2 md:order-2 md:-translate-x-1/2 ${step.tone.ring} ${step.tone.ringHover}`}
                >
                  <span className="font-serif text-lg font-semibold">
                    {step.number}
                  </span>
                </div>

                <div
                  className={`hidden pl-16 md:block md:w-5/12 md:pl-0 ${
                    copyOnLeft
                      ? "order-3 md:text-left"
                      : "order-3 md:order-1 md:text-right"
                  }`}
                >
                  <div className="architectural-border group/img relative overflow-hidden shadow-lg transition-shadow duration-500 hover:shadow-2xl">
                    <Image
                      src={step.image}
                      alt={step.alt}
                      width={600}
                      height={400}
                      sizes="(min-width: 1024px) 480px, 50vw"
                      className="h-48 w-full object-cover grayscale-[40%] transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
                    />
                    <div
                      className={`absolute inset-0 transition-all duration-500 group-hover:bg-transparent ${step.tone.imgOverlay}`}
                    ></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
