import Image from "next/image";

type Member = {
  name: string;
  title: string;
  photo: string;
  bio: string;
};

const SUPABASE_BASE =
  "https://gueqxorkktfcwiakepcp.supabase.co/storage/v1/object/public/site-assets/images/wp-inline";

const TEAM: Member[] = [
  {
    name: "Tanner",
    title: "Founder / CEO",
    photo: `${SUPABASE_BASE}/2026/03/Tanner-Monstad.webp`,
    bio:
      "I've learned firsthand how a change of view can change a life. This is what drives me to give back and help others in this community. I came back to my hometown here in Washington to create a place for all to recover that truly feels like home. I believe Mountain View Treatment is that place.",
  },
  {
    name: "Tara",
    title: "Clinician",
    photo: `${SUPABASE_BASE}/2026/03/Untitled-design-2026-03-28T144828.888.webp`,
    bio:
      "If you find yourself in a hole, the best thing you can do for yourself is to stop digging. With firsthand experience in recovery, working in the field gives me the chance to give others what I have been given — a chance to change, a chance to grow, a chance to never forget where I have come from.",
  },
  {
    name: "Kaye",
    title: "Clinician",
    photo: `${SUPABASE_BASE}/2026/04/Mountain-View-Staff.png`,
    bio:
      "If you find yourself in a hole, the best thing you can do for yourself is to stop digging. With firsthand experience in recovery, working in the field gives me the chance to give others what I have been given — a chance to change, a chance to grow, a chance to never forget where I have come from.",
  },
  {
    name: "Jake",
    title: "Support Specialist",
    photo: `${SUPABASE_BASE}/2026/03/Untitled-design-2026-03-28T144619.786.webp`,
    bio:
      "Every day I am reminded that the gift of recovery is not just for me — it's meant to be shared. Helping others find their path forward is the most rewarding part of this work.",
  },
  {
    name: "Chad",
    title: "Behavioral Health Technician (BHT)",
    photo: `${SUPABASE_BASE}/2026/04/Mountain-View-Staff-1.png`,
    bio:
      "If you find yourself in a hole, the best thing you can do for yourself is to stop digging. With firsthand experience in recovery, working in the field gives me the chance to give others what I have been given — a chance to change, a chance to grow, a chance to never forget where I have come from.",
  },
  {
    name: "Hailey",
    title: "Human Resources",
    photo: `${SUPABASE_BASE}/2026/03/Untitled-design-2026-03-28T144852.903.webp`,
    bio:
      "Every day I am reminded that the gift of recovery is not just for me — it's meant to be shared. Helping others find their path forward is the most rewarding part of this work.",
  },
];

export default function TeamGrid() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-[1280px] px-6 py-20 lg:px-12 lg:py-24">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
          {TEAM.map((m) => (
            <article
              key={m.name}
              className="flex flex-col bg-[var(--mvt-cream)] p-7 text-center"
            >
              <div className="relative mx-auto aspect-square w-full max-w-[280px] overflow-hidden rounded-sm">
                <Image
                  src={m.photo}
                  alt={`${m.name}, ${m.title}`}
                  fill
                  sizes="(min-width: 1024px) 280px, (min-width: 640px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
              <h2 className="mt-6 font-heading text-3xl font-light tracking-tight text-[var(--mvt-ink)]">
                {m.name}
              </h2>
              <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-[var(--mvt-ink)]/80">
                {m.title}
              </p>
              <p className="mt-5 text-sm leading-7 text-[var(--mvt-text)]">
                <span className="font-heading text-2xl leading-none align-[-0.15em] text-[var(--mvt-ink)]/40">
                  &ldquo;
                </span>
                {m.bio}
                <span className="font-heading text-2xl leading-none align-[-0.15em] text-[var(--mvt-ink)]/40">
                  &rdquo;
                </span>
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
