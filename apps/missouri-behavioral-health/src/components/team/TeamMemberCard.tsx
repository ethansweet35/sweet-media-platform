import Image from "next/image";
import type { TeamMember } from "@/data/team";

export default function TeamMemberCard({ person }: { person: TeamMember }) {
  return (
    <div className="group overflow-hidden rounded-2xl bg-cream ring-1 ring-mbh-forest/8">
      <div className="relative overflow-hidden bg-mbh-forest/5" style={{ aspectRatio: "3/4" }}>
        <Image
          src={person.img}
          alt={`${person.name}, ${person.title} at Missouri Behavioral Health`}
          fill
          className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: "linear-gradient(to top, rgba(30,80,39,0.55) 0%, transparent 45%)",
          }}
          aria-hidden
        />
        <div className="absolute bottom-4 left-4 right-4">
          <p className="font-body text-[10px] font-semibold uppercase tracking-[0.18em] text-white/70">
            {person.title}
          </p>
        </div>
      </div>
      <div className="p-5">
        <p className="font-display text-[0.9375rem] font-semibold text-mbh-forest">{person.name}</p>
        <p className="mt-1.5 font-body text-sm leading-relaxed text-mbh-body">{person.bio}</p>
      </div>
    </div>
  );
}
