import Image from "next/image";
import Link from "next/link";
import { AutoLinkedText } from "@sweetmedia/blog-core";

const SUPABASE = "https://ahufsygjwpbymomfdazb.supabase.co/storage/v1/object/public/site-assets/images";

type Member = {
  name: string;
  title: string;
  photo: string;
  bio?: string;
};

const executives: Member[] = [
  {
    name: "Paul Alexander",
    title: "Chief Executive Officer",
    photo: `${SUPABASE}/nbt_team_paul-alexander.jpg`,
    bio: "Paul Alexander is the founder and CEO of Northbound Treatment. He received his Certified Addiction Treatment Specialist training at Saddleback College in Mission Viejo, CA, and was awarded Outstanding Alumni Service Award in 2002. Paul holds a Bachelor of Arts degree in Criminology, Law and Society, Summa Cum Laude, from UC Irvine, and a Juris Doctorate from Loyola Law School of Los Angeles. He believes wholeheartedly in transformational leadership, organizational health, and effective, fully integrated substance use disorder treatment.",
  },
  {
    name: "Erick Rocca",
    title: "Chief Financial Officer",
    photo: `${SUPABASE}/nbt_team_erick-rocca.jpg`,
  },
  {
    name: "Jillian Kristofferson",
    title: "Chief Operating Officer",
    photo: `${SUPABASE}/nbt_team_jillian-kristofferson.jpg`,
  },
  {
    name: "Alexa Pelech Helfer",
    title: "Chief Marketing Officer",
    photo: `${SUPABASE}/nbt_team_alexa-pelech-helfer.jpg`,
  },
];

const medical: Member[] = [
  {
    name: "Dr. Venice Sanchez",
    title: "Medical Director — Board-Certified Psychiatrist & Addiction Medicine Specialist",
    photo: `${SUPABASE}/nbt_team_venice-sanchez.webp`,
    bio: "Venice Sanchez, MD, is a double board-certified physician specializing in Psychiatry and Neurology as well as Addiction Medicine. She is a diplomate of the American Board of Psychiatry and Neurology and the American Board of Addiction Medicine. At her private practice in Newport Beach, California, Dr. Sanchez offers a holistic approach to patient care, integrating medication management, therapy, spirituality, healthy eating, exercise, and attention to social factors that impact well-being. Dr. Sanchez earned her bachelor's degree from UCLA and her medical degree from Michigan State University College of Human Medicine. She completed her psychiatry residency at UC Irvine, where she was honored with the Outstanding Resident of the Year Award. Her subspecialty in addiction medicine allows her to guide patients through the difficult journey of recovery. Dr. Sanchez has been recognized as Women in Medicine Top Doctor 2024 and Best of 2024 Newport Beach, Psychiatrist.",
  },
];

const leadership: Member[] = [
  {
    name: "Amanda Ferguson",
    title: "Program Director",
    photo: `${SUPABASE}/nbt_team_amanda-ferguson.jpg`,
  },
  {
    name: "David Gates",
    title: "Director of Family Services",
    photo: `${SUPABASE}/nbt_team_david-gates.jpg`,
  },
  {
    name: "Erick Holbeck",
    title: "Director of Admissions",
    photo: `${SUPABASE}/nbt_team_erick-holbeck.jpg`,
  },
  {
    name: "Anna Trusk",
    title: "Director of Finance",
    photo: `${SUPABASE}/nbt_team_anna-trusk.jpg`,
  },
  {
    name: "Ryan Lamb",
    title: "Experiential Therapy Director",
    photo: `${SUPABASE}/nbt_team_ryan-lamb.jpg`,
  },
  {
    name: "Wendy Baugh",
    title: "Program Manager",
    photo: `${SUPABASE}/nbt_team_wendy-baugh.jpg`,
  },
  {
    name: "Dustin Helvig",
    title: "Director of Discharge & Client Care",
    photo: `${SUPABASE}/nbt_team_dustin-helvig.jpg`,
  },
];

function MemberCard({ member }: { member: Member }) {
  return (
    <div className="group flex flex-col bg-white border border-[#cdd8e8]">
      <div className="relative h-64 w-full overflow-hidden bg-[#eef2f7]">
        <Image
          src={member.photo}
          alt={member.name}
          fill
          className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#3a6697]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      <div className="flex flex-col flex-1 p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#e97a52] mb-1"><AutoLinkedText>{member.title}</AutoLinkedText></p>
        <h3 className="font-heading text-lg font-bold text-[#3a6697] leading-tight">
          {member.name}
        </h3>
        {member.bio && (
          <details className="mt-4 group/bio">
            <summary className="cursor-pointer list-none text-xs font-semibold uppercase tracking-[0.12em] text-[#7a8b76] hover:text-[#e97a52] transition-colors select-none flex items-center gap-1.5">
              <i className="ri-add-line group-open/bio:hidden" />
              <i className="ri-subtract-line hidden group-open/bio:inline" />
              Read Bio
            </summary>
            <p className="mt-3 text-sm leading-7 text-[#64748b]"><AutoLinkedText>{member.bio}</AutoLinkedText></p>
          </details>
        )}
      </div>
    </div>
  );
}

export default function TeamPage() {
  return (
    <div className="min-h-screen bg-white">

      {/* ── Hero ──────────────────────────────────────────────── */}
      <section className="bg-[#3a6697] py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#e97a52]">
            Our People
          </p>
          <h1 className="font-heading text-5xl font-bold text-white md:text-6xl lg:text-7xl">
            Meet the <span className="italic text-[#e97a52]">Team</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/70">
            <AutoLinkedText>{"More than any other aspect of the Northbound experience, it is our people that set us apart.\n            Our leadership, medical, and clinical staff are passionately committed to helping every\n            client achieve long-term recovery."}</AutoLinkedText>
          </p>
          <div className="mt-10 flex flex-wrap gap-6">
            <Link
              href="/admissions/"
              className="inline-flex items-center gap-2 bg-[#e97a52] px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-[#f09068]"
            >
              Start Admissions <i className="ri-arrow-right-line" />
            </Link>
            <Link
              href="/contact-us/"
              className="inline-flex items-center gap-2 border border-white/30 px-7 py-3.5 text-sm font-semibold text-white transition hover:border-white/60 hover:bg-white/10"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* ── Executive Team ───────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mb-12">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#e97a52]">
              Leadership
            </p>
            <h2 className="font-heading text-4xl font-bold text-[#3a6697] md:text-5xl">
              Executive Team
            </h2>
          </div>
          {/* Paul gets a wider card; remaining 3 in a row below */}
          <div className="grid gap-px bg-[#cdd8e8] sm:grid-cols-2 lg:grid-cols-4">
            {executives.map((m) => (
              <MemberCard key={m.name} member={m} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Medical Staff ────────────────────────────────────── */}
      <section className="py-24 bg-[#eef2f7]">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mb-12">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#e97a52]">
              Clinical Medicine
            </p>
            <h2 className="font-heading text-4xl font-bold text-[#3a6697] md:text-5xl">
              Medical Staff
            </h2>
          </div>
          {/* Single-member spotlight layout */}
          <div className="border border-[#cdd8e8] bg-white flex flex-col md:flex-row">
            <div className="relative h-80 md:h-auto md:w-72 shrink-0 overflow-hidden bg-[#eef2f7]">
              <Image
                src={medical[0].photo}
                alt={medical[0].name}
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 100vw, 288px"
              />
            </div>
            <div className="flex flex-col justify-center p-8 lg:p-12">
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#e97a52] mb-2"><AutoLinkedText>{medical[0].title}</AutoLinkedText></p>
              <h3 className="font-heading text-2xl font-bold text-[#3a6697] mb-6">
                {medical[0].name}
              </h3>
              <p className="text-sm leading-7 text-[#64748b]"><AutoLinkedText>{medical[0].bio}</AutoLinkedText></p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Leadership Team ──────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mb-12">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#e97a52]">
              <AutoLinkedText>{"Operations &amp; Clinical"}</AutoLinkedText>
            </p>
            <h2 className="font-heading text-4xl font-bold text-[#3a6697] md:text-5xl">
              Leadership Team
            </h2>
          </div>
          <div className="grid gap-px bg-[#cdd8e8] sm:grid-cols-2 lg:grid-cols-4">
            {leadership.map((m) => (
              <MemberCard key={m.name} member={m} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Strip ────────────────────────────────────────── */}
      <section className="bg-[#3a6697] py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 flex flex-col items-center text-center gap-6">
          <h2 className="font-heading text-3xl font-bold text-white md:text-4xl">
            Ready to join a team that changes lives?
          </h2>
          <p className="max-w-xl text-base text-white/70">
            <AutoLinkedText>{"Northbound Treatment is always looking for compassionate, skilled professionals to grow our team."}</AutoLinkedText>
          </p>
          <Link
            href="/contact-us/"
            className="inline-flex items-center gap-2 bg-[#e97a52] px-8 py-4 text-sm font-semibold text-white transition hover:bg-[#f09068]"
          >
            Get In Touch <i className="ri-arrow-right-line" />
          </Link>
        </div>
      </section>

    </div>
  );
}
