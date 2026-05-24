import Image from "next/image";
import type { TeamMember } from "@/data/team";

type TeamClinicalSpotlightProps = {
  member: TeamMember;
};

export default function TeamClinicalSpotlight({ member }: TeamClinicalSpotlightProps) {
  return (
    <article className="overflow-hidden rounded-3xl bg-white shadow-md ring-1 ring-[var(--sr-sand)]/80">
      <div className="grid md:grid-cols-12">
        <div className="flex items-center justify-center bg-[var(--sr-mist)] p-6 md:col-span-5 md:p-8">
          <Image
            src={member.image}
            alt={member.name}
            width={520}
            height={680}
            className="h-auto w-full max-w-sm object-contain object-center"
            sizes="(max-width: 768px) 100vw, 360px"
            priority
          />
        </div>

        <div className="flex flex-col justify-center bg-white p-8 md:col-span-7 md:p-10 lg:p-12">
          <p
            className="mb-3 text-[10px] font-medium uppercase tracking-[0.2em] text-[var(--sr-fern)]"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            Clinical leadership
          </p>
          <h3
            className="mb-3 text-[clamp(2rem,4vw,2.75rem)] font-light leading-[1.08] text-[var(--sr-ink)]"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            {member.name}
          </h3>
          {member.role ? (
            <p
              className="mb-6 text-sm font-medium uppercase tracking-[0.12em] text-[var(--sr-muted)]"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              {member.role}
            </p>
          ) : null}
          <p
            className="max-w-md text-[15px] leading-[1.85] text-[var(--sr-body)]"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            Chandra leads our clinical team with licensed expertise and a steady hand — ensuring
            every client receives thoughtful, evidence-based therapeutic care throughout detox
            and beyond.
          </p>
          <div className="mt-8 flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--sr-mist)] text-[var(--sr-fern)]">
              <i className="ri-heart-pulse-line text-lg" aria-hidden />
            </span>
            <span
              className="text-[13px] text-[var(--sr-muted)]"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              Licensed Marriage &amp; Family Therapist · Clinical Supervisor
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}
