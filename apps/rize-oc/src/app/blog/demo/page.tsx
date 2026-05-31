import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

/**
 * Static design preview — no DB required.
 * Visit /blog/demo to see the full article template.
 */

import PostHero from "@/components/pages/blog/post/components/PostHero";
import PostCta from "@/components/pages/blog/post/components/PostCta";
import PostBody from "@/components/pages/blog/post/components/PostBody";
import PostAuthor from "@/components/pages/blog/post/components/PostAuthor";
import type { BlogPost, BlogSection } from "@sweetmedia/blog-core";

const HERO_IMAGE = "https://nfjlvkxrbzytjefmcvhg.supabase.co/storage/v1/object/public/site-assets/images/rize_irvine_hero01.jpg";

const demoSections: BlogSection[] = [
  { type: "h2", text: "What Is an Intensive Outpatient Program?" },
  { type: "paragraph", text: "An Intensive Outpatient Program (IOP) is a structured treatment option designed for individuals who need more support than weekly therapy but do not require round-the-clock residential care. Clients typically attend group and individual sessions three to five days per week while continuing to live at home or in sober living." },
  { type: "paragraph", text: "At Rize OC, our IOP is built around evidence-based modalities — including Cognitive Behavioral Therapy (CBT), Dialectical Behavior Therapy (DBT), and trauma-informed care — delivered by a team of licensed clinicians with deep experience in co-occurring disorder treatment." },
  { type: "callout", variant: "tip", text: "IOP is often the right step after completing a PHP or residential program, providing a structured bridge back to daily life while maintaining strong clinical support." },
  { type: "h2", text: "Who Is a Good Candidate for IOP?" },
  { type: "paragraph", text: "Not every person in recovery needs the same level of care. IOP works especially well for individuals who have already completed a higher level of care — such as detox or a Partial Hospitalization Program — and are ready to take on more independence." },
  { type: "list", items: [
    "Stable enough to live outside a 24-hour clinical environment",
    "Motivated to engage in daily or near-daily therapeutic work",
    "Have a safe, supportive home environment or sober living arrangement",
    "Need structured accountability while rebuilding everyday routines",
    "Are managing co-occurring mental health conditions alongside addiction",
  ]},
  { type: "pullquote", text: "Recovery is not just about stopping — it is about building a life that makes stopping possible." },
  { type: "h2", text: "What to Expect at Rize OC's IOP" },
  { type: "paragraph", text: "Our IOP runs in three-hour sessions, typically held mornings or evenings to accommodate work and family schedules. Each week includes a blend of group therapy, individual counseling, case management check-ins, and family sessions when appropriate." },
  { type: "numbered", items: [
    "Intake assessment and personalized treatment planning with your assigned clinician",
    "Group therapy sessions focused on coping skills, relapse prevention, and interpersonal dynamics",
    "Individual therapy — weekly minimum, more frequent based on clinical need",
    "Medication management coordination if applicable",
    "Weekly case management to address housing, employment, and legal needs",
    "Discharge planning with a detailed aftercare and alumni support plan",
  ]},
  { type: "stat-row", stats: [
    { value: "3:1", label: "Client-to-Clinician Ratio" },
    { value: "90%+", label: "Complete Their Program" },
    { value: "12 wks", label: "Average IOP Duration" },
  ]},
  { type: "h2", text: "Insurance Coverage for IOP" },
  { type: "paragraph", text: "Most PPO insurance plans cover Intensive Outpatient Programs when they are deemed medically necessary. At Rize OC, our admissions team will verify your benefits before your first session — at no cost to you — and walk you through any out-of-pocket expectations so there are no surprises." },
  { type: "callout", variant: "insight", text: "Rize OC is in-network with most major PPO plans. Call us at (949) 461-2620 or use our secure online verification form to check your coverage in minutes." },
];

const demoPost: BlogPost = {
  id: "demo-post",
  slug: "what-is-iop-intensive-outpatient-program",
  title: "What Is an IOP? A Guide to Intensive Outpatient Programs",
  excerpt: "If you or someone you love is considering treatment for addiction or mental health, understanding the different levels of care is essential. Here is everything you need to know about Intensive Outpatient Programs.",
  content: demoSections,
  category: "Levels of Care",
  tags: ["IOP", "Addiction Recovery", "Mental Health", "Orange County"],
  author: "Chandra Medina",
  authorRole: "Clinical Director, LMFT",
  authorBio: "Chandra brings over 10 years of experience in the mental health and SUD treatment field, specializing in trauma, addiction, and brain health. She leads the clinical team at Rize OC.",
  authorPhoto: "https://nfjlvkxrbzytjefmcvhg.supabase.co/storage/v1/object/public/site-assets/images/staff/rize_team_chandra-medina.png",
  image: HERO_IMAGE,
  date: "May 13, 2026",
  readTime: "6 min read",
  featured: false,
  publishedAt: "2026-05-13",
  createdAt: "2026-05-13",
};

export default function BlogDemoPage() {
  const usedHrefs = new Set<string>();

  return (
    <div className="min-h-screen bg-white">
      <PostHero post={demoPost} />

      <section className="w-full bg-white">
        <div className="mx-auto w-full max-w-[1300px] px-6 lg:px-10 py-[72px]">
          <div className="flex gap-10 lg:gap-16 items-start">

            {/* Article body */}
            <div className="flex-1 min-w-0 max-w-3xl">
              {/* Lead excerpt */}
              <div className="mb-8 pb-8 border-b border-[#EBEBEB]">
                <p
                  className="font-[family-name:var(--font-display)] font-normal text-ink/65 leading-relaxed italic"
                  style={{ fontSize: "clamp(19px, 1.8vw, 24px)" }}
                >
                  {demoPost.excerpt}
                </p>
              </div>

              <PostBody sections={demoSections} usedHrefs={usedHrefs} />

              <PostAuthor post={demoPost} />
            </div>

            {/* TOC + floating CTA sidebar */}
            <div className="hidden xl:block w-52 shrink-0">
              <div className="sticky top-28 flex flex-col gap-8">

                <div>
                  <p className="text-[9px] tracking-[0.32em] uppercase text-ink/35 font-semibold mb-5">
                    In This Article
                  </p>
                  <nav className="flex flex-col gap-1">
                    {demoSections
                      .filter((s) => s.type === "h2")
                      .map((s, i) => (
                        <span
                          key={i}
                          className="text-[12px] font-light text-ink/45 hover:text-ink leading-snug cursor-pointer transition-colors py-1.5 border-l-2 border-transparent hover:border-accent pl-3"
                        >
                          {s.text}
                        </span>
                      ))}
                  </nav>
                </div>

                <div className="pt-6 border-t border-[#EBEBEB]">
                  <p className="text-[9px] tracking-[0.32em] uppercase text-ink/35 font-semibold mb-3">
                    Tags
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {demoPost.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[9px] tracking-widest uppercase text-ink/60 bg-cream border border-[#E0E0E0] px-2 py-1 whitespace-nowrap"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Floating CTA */}
                <div className="bg-ink p-5 flex flex-col gap-4">
                  <div>
                    <p className="text-[9px] font-semibold uppercase tracking-[0.28em] text-accent mb-2">
                      Get Help Today
                    </p>
                    <p className="font-[family-name:var(--font-display)] font-normal text-white leading-snug" style={{ fontSize: "17px" }}>
                      Speak with our team — free &amp; confidential.
                    </p>
                  </div>
                  <ul className="flex flex-col gap-2">
                    {["Same-day admissions", "Most PPO plans accepted", "Available 24/7"].map((item) => (
                      <li key={item} className="flex items-center gap-2 text-[11px] font-light text-white/65">
                        <i className="ri-check-line text-accent text-xs shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <a
                    href="tel:9494612620"
                    className="flex items-center justify-center gap-2 bg-accent text-white text-[10px] font-semibold uppercase tracking-[0.18em] px-4 py-3 hover:bg-accent/90 transition-colors"
                  >
                    <i className="ri-phone-line text-xs" /> (949) 461-2620
                  </a>
                  <Link
                    href="/admissions"
                    className="flex items-center justify-center gap-2 border border-white/20 text-white/65 text-[10px] font-semibold uppercase tracking-[0.18em] px-4 py-2.5 hover:border-white/40 hover:text-white transition-colors"
                  >
                    Verify Insurance
                  </Link>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      <PostCta />
    </div>
  );
}
