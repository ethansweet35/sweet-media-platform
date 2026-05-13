import OurCompanyLeadSection from "@/views/our-company/components/OurCompanyLeadSection";
import { AutoLinkedText } from "@sweetmedia/blog-core";

/** Elementor `post-199.css` + migration HTML: 3-col grid from 768px, 27px gap, 454px portrait cards. */
const team = [
  {
    name: "Simon Jozani",
    role: "Chief Visionary Officer",
    image:
      "https://nstzjqmtsqgeihkyvkqq.supabase.co/storage/v1/object/public/site-assets/images/Untitled-design-2026-04-09T172559.159.png",
  },
  {
    name: "Ian Roy",
    role: "Chief Strategy Officer",
    image:
      "https://nstzjqmtsqgeihkyvkqq.supabase.co/storage/v1/object/public/site-assets/images/Untitled-design-2026-04-09T180045.019.png",
  },
  {
    name: "Yasmine Elkady",
    role: "Chief Operating Officer",
    image:
      "https://nstzjqmtsqgeihkyvkqq.supabase.co/storage/v1/object/public/site-assets/images/Untitled-design-2026-04-09T180259.929.png",
  },
  {
    name: "Laura McMillan",
    role: "Chief Revenue Officer",
    image:
      "https://nstzjqmtsqgeihkyvkqq.supabase.co/storage/v1/object/public/site-assets/images/Untitled-design-2026-04-09T180555.091.png",
  },
  {
    name: "Elle Ervin",
    role: "Director Of Operations",
    image:
      "https://nstzjqmtsqgeihkyvkqq.supabase.co/storage/v1/object/public/site-assets/images/Untitled-design-2026-04-09T180635.958.png",
  },
  {
    name: "Caressa",
    role: "Director of Quality Assurance",
    image:
      "https://nstzjqmtsqgeihkyvkqq.supabase.co/storage/v1/object/public/site-assets/images/Untitled-design-2026-04-09T180708.948.png",
  },
  {
    name: "Hayden Moser",
    role: "Director Of Partner Experience",
    image:
      "https://nstzjqmtsqgeihkyvkqq.supabase.co/storage/v1/object/public/site-assets/images/Untitled-design-2026-04-09T180840.983.png",
  },
  {
    name: "Jasmine Pennala",
    role: "Director of Employee Engagement",
    image:
      "https://nstzjqmtsqgeihkyvkqq.supabase.co/storage/v1/object/public/site-assets/images/Untitled-design-2026-04-09T181034.957.png",
  },
  {
    name: "Jenna Clegg",
    role: "Director Of Utilization Review",
    image:
      "https://nstzjqmtsqgeihkyvkqq.supabase.co/storage/v1/object/public/site-assets/images/Untitled-design-2026-04-09T181120.956.png",
  },
  {
    name: "Sarai Zumwalt",
    role: "Director Of Charges",
    image:
      "https://nstzjqmtsqgeihkyvkqq.supabase.co/storage/v1/object/public/site-assets/images/Untitled-design-2026-04-09T181232.989.png",
  },
  {
    name: "Alec Freeman",
    role: "Experience Executive",
    image:
      "https://nstzjqmtsqgeihkyvkqq.supabase.co/storage/v1/object/public/site-assets/images/Untitled-design-2026-04-09T181312.945.png",
  },
  {
    name: "Chris Sandoval",
    role: "Experience Executive",
    image:
      "https://nstzjqmtsqgeihkyvkqq.supabase.co/storage/v1/object/public/site-assets/images/Untitled-design-2026-04-09T181826.010.png",
  },
  {
    name: "Cassandra Johnson",
    role: "Experience Executive",
    image:
      "https://nstzjqmtsqgeihkyvkqq.supabase.co/storage/v1/object/public/site-assets/images/Untitled-design-2026-04-09T181905.959.png",
  },
  {
    name: "Andrew Ulloa",
    role: "Experience Executive",
    image:
      "https://nstzjqmtsqgeihkyvkqq.supabase.co/storage/v1/object/public/site-assets/images/Untitled-design-2026-04-09T181943.962.png",
  },
  {
    name: "Runa",
    role: "Director Of Security",
    image:
      "https://nstzjqmtsqgeihkyvkqq.supabase.co/storage/v1/object/public/site-assets/images/Untitled-design-2026-04-09T172143.121.png",
  },
  {
    name: "Bella",
    role: "Director Of Pawsitivity",
    image:
      "https://nstzjqmtsqgeihkyvkqq.supabase.co/storage/v1/object/public/site-assets/images/Untitled-design-2026-04-09T182040.086.png",
  },
] as const;

export default function OurTeamPage() {
  return (
    <main className="bg-[#101E3F] text-white">
      <section className="py-[50px] md:py-[80px]">
        <div className="mx-auto max-w-[1140px] max-[767px]:px-[30px] md:px-5">
          <h1 className="text-center font-[var(--font-heading)] text-4xl font-medium tracking-[-0.02em] text-white md:text-5xl md:leading-[1.1]">
            Our Team
          </h1>
          <p className="mx-auto mt-4 max-w-3xl text-center text-base leading-[1.42] text-white/90 md:text-lg">
            <AutoLinkedText>{"Deep expertise in the complexities of Behavioral Health RCM."}</AutoLinkedText>
          </p>

          <div className="mt-14 grid grid-cols-1 gap-5 min-[768px]:grid-cols-3 min-[768px]:gap-[27px]">
            {team.map((person) => (
              <div
                key={person.name}
                className="relative flex min-h-[454px] flex-col justify-end overflow-hidden rounded-sm p-6 text-white"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${person.image})` }}
                />
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage:
                      "linear-gradient(180deg, rgba(255,255,255,0) 23%, #101E3F 100%)",
                  }}
                />
                <div className="relative">
                  <p className="font-marcellus text-xl font-medium text-white md:text-2xl"><AutoLinkedText>{person.name}</AutoLinkedText></p>
                  <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/95"><AutoLinkedText>{person.role}</AutoLinkedText></p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <OurCompanyLeadSection />
    </main>
  );
}
