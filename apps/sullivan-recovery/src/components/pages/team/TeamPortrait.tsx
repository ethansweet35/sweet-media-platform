import Image from "next/image";
import type { TeamMember } from "@/data/team";

type TeamPortraitProps = {
  member: TeamMember;
  index: number;
  className?: string;
  /** Dark moss section vs light linen section */
  tone?: "dark" | "light";
};

export default function TeamPortrait({
  member,
  index,
  className = "",
  tone = "dark",
}: TeamPortraitProps) {
  const isLight = tone === "light";
  const num = String(index + 1).padStart(2, "0");

  return (
    <article
      className={`flex flex-col overflow-hidden rounded-2xl ${
        isLight
          ? "bg-white shadow-sm ring-1 ring-[var(--sr-sand)]/80"
          : "bg-white/5 ring-1 ring-white/10"
      } ${className}`}
    >
      {/* Photo — full image, no crop */}
      <div
        className={`flex items-center justify-center p-3 sm:p-4 ${
          isLight ? "bg-[var(--sr-mist)]" : "bg-[var(--sr-bark)]/80"
        }`}
      >
        <Image
          src={member.image}
          alt={member.name}
          width={480}
          height={640}
          className="h-auto w-full object-contain object-center"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 280px"
        />
      </div>

      {/* Name & role below the photo */}
      <div
        className={`flex flex-col gap-1 border-t px-5 py-4 sm:px-6 sm:py-5 ${
          isLight
            ? "border-[var(--sr-sand)]/60 bg-white"
            : "border-white/10 bg-[var(--sr-moss)]"
        }`}
      >
        <span
          className={`mb-1 text-2xl font-light tabular-nums leading-none ${
            isLight ? "text-[var(--sr-sand)]" : "text-white/20"
          }`}
          style={{ fontFamily: "var(--font-cormorant)" }}
          aria-hidden
        >
          {num}
        </span>
        {member.role ? (
          <p
            className={`text-[10px] font-medium uppercase tracking-[0.18em] ${
              isLight ? "text-[var(--sr-fern)]" : "text-[var(--sr-sage)]"
            }`}
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            {member.role}
          </p>
        ) : null}
        <h3
          className={`text-xl font-light leading-tight sm:text-2xl ${
            isLight ? "text-[var(--sr-ink)]" : "text-white"
          }`}
          style={{ fontFamily: "var(--font-cormorant)" }}
        >
          {member.name}
        </h3>
      </div>
    </article>
  );
}
