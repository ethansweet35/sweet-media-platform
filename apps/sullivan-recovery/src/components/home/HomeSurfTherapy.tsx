"use client";

import Image from "next/image";
import LandingOptionalLink from "@/components/landing/LandingOptionalLink";

const CORY = "https://knvkrhwlflkulybcmgmq.supabase.co/storage/v1/object/public/site-assets/images/sr_cory_surf_v2.jpg";

export default function HomeSurfTherapy() {
  return (
    <section className="bg-[var(--sr-moss)] py-[100px]">
      <div className="sr-container">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">

          {/* Left: content */}
          <div>
            <p
              className="mb-5 text-[11px] font-medium uppercase tracking-[0.22em] text-[var(--sr-sage)]"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              Surf Therapy
            </p>

            <h2
              className="mb-8 text-[clamp(2.75rem,5vw,4.5rem)] font-light leading-[1.05] text-white"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              The ocean <em className="italic text-[var(--sr-sage)]">heals</em><br />
              what words<br />cannot.
            </h2>

            <div className="mb-8 h-px w-12 bg-[var(--sr-sage)]" />

            <p
              className="mb-5 text-[14px] leading-[1.9] text-white/70"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              At Sullivan Recovery, we harness the healing power of the ocean. Our surf therapy
              program was built by Cory Sullivan — a former competitive surfer turned recovery
              advocate who has lived the deep parallels between surfing and sobriety firsthand.
            </p>

            <p
              className="mb-10 text-[14px] leading-[1.9] text-white/70"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              Through riding waves, clients build confidence, practice mindfulness, and discover
              a clarity that comes only from being fully present. It&apos;s learning to find calm
              inside chaos — a skill that stays with you long after you leave the water.
            </p>

            <blockquote
              className="mb-10 border-l-2 border-[var(--sr-sage)] pl-6"
            >
              <p
                className="text-lg italic leading-relaxed text-white/80"
                style={{ fontFamily: "var(--font-cormorant)" }}
              >
                &ldquo;Surfing taught me presence. Recovery gave me permanence.&rdquo;
              </p>
              <cite
                className="mt-2 block text-[11px] not-italic font-medium uppercase tracking-[0.15em] text-white/40"
                style={{ fontFamily: "var(--font-dm-sans)" }}
              >
                — Cory Sullivan, Co-Founder
              </cite>
            </blockquote>

            <LandingOptionalLink
              href="/insurance/"
              className="inline-flex items-center gap-2 border border-[var(--sr-sage)]/50 px-7 py-3.5 text-[12px] font-medium uppercase tracking-[0.12em] text-white transition hover:border-white hover:bg-white/5"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              Start Your Journey
              <i className="ri-arrow-right-line" />
            </LandingOptionalLink>
          </div>

          {/* Right: Cory's actual photo */}
          <div className="relative w-full overflow-hidden" style={{ height: 580 }}>
            <Image
              src={CORY}
              alt="Cory Sullivan surfing a barrel wave — co-founder of Sullivan Recovery"
              fill
              className="object-cover object-top"
            />
            {/* Subtle caption at bottom */}
            <div
              className="absolute bottom-0 left-0 right-0 px-6 py-4"
              style={{ background: "linear-gradient(to top, rgba(30,31,27,0.7) 0%, transparent 100%)" }}
            >
              <p
                className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/60"
                style={{ fontFamily: "var(--font-dm-sans)" }}
              >
                Cory Sullivan — Co-Founder &amp; Surf Instructor
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
