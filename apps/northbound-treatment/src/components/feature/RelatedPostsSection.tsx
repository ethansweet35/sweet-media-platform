"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { createClient } from "@supabase/supabase-js";

interface RelatedPost {
  slug: string;
  title: string;
  excerpt: string;
  hero_image_url: string | null;
  category: string;
}

// Routes where related posts add no value
const SKIP_PREFIXES = ["/blog", "/admin"];
const SKIP_EXACT = new Set([
  "/contact-us",
  "/admissions/faqs",
  "/community/alumni",
  "/wahler-scholarship",
  "/referring-professionals",
  "/resources",
  "/virtual-lp",
]);

// Maps path segments → more effective search terms
const SEGMENT_KEYWORDS: Record<string, string> = {
  alcoholism: "alcohol",
  "alcohol": "alcohol",
  heroin: "heroin",
  fentanyl: "fentanyl",
  meth: "meth",
  cocaine: "cocaine",
  "crack-cocaine": "cocaine",
  opioid: "opioid",
  oxycontin: "opioid",
  methadone: "methadone",
  suboxone: "suboxone",
  marijuana: "marijuana",
  adderall: "adderall",
  amphetamine: "amphetamine",
  benzodiazepine: "benzodiazepine benzo",
  hydrocodone: "hydrocodone",
  prescription: "prescription drug",
  detox: "detox withdrawal",
  "residential-treatment-center": "residential treatment",
  "intensive-outpatient-treatment": "outpatient IOP",
  "partial-hospitalization-program": "PHP partial hospitalization",
  aftercare: "aftercare recovery",
  "family-therapy": "family therapy",
  "medication-assisted-treatment": "medication assisted MAT",
  lgbtq: "LGBTQ",
  "dual-diagnosis": "dual diagnosis",
  anxiety: "anxiety",
  depression: "depression",
  ptsd: "PTSD trauma",
  "bipolar-disorder": "bipolar",
  "borderline-personality-disorder": "BPD borderline",
  codependency: "codependency",
  "eating-disorders": "eating disorder",
  trauma: "trauma",
  "trauma-therapy": "trauma",
  "ocd-treatment-and-counseling": "OCD",
  "treatment-for-anxiety-disorders": "anxiety",
  "mental-health-disorders": "mental health",
  "telehealth-iop-services": "telehealth online treatment",
  "adventure-therapy-program": "adventure therapy",
  "wolf-assisted-therapy": "therapy",
  "veterans-track-program": "veteran",
  "music-program": "music therapy",
  "christ-centered-links-residential-program": "faith recovery",
  "mens-residential-treatment": "men residential",
  "womens-residential-treatment": "women residential",
  "transitional-living-programs": "sober living transitional",
  "sober-living": "sober living",
  "alternative-sentencing": "legal court",
  interventions: "intervention",
  "spouse-of-an-addict": "family loved one",
  insurance: "insurance coverage",
  aetna: "insurance coverage",
  "anthem-blue-cross": "insurance coverage",
  beacon: "insurance coverage",
  "blue-cross-blue-shield": "insurance coverage",
  cigna: "insurance coverage",
  compsych: "insurance coverage",
  "first-health": "insurance coverage",
  "geha-insurance": "insurance coverage",
  "health-net": "insurance coverage",
  ilwu: "insurance coverage",
  magellan: "insurance coverage",
  mhn: "insurance coverage",
  nyship: "insurance coverage",
  "premera-blue-cross": "insurance coverage",
  tricare: "insurance coverage veterans",
  usamco: "insurance coverage",
  "financial-assistance": "cost financial",
  "impact-reach": "recovery success",
  "reviews-testimonials": "recovery success",
  admissions: "admissions treatment",
  services: "treatment addiction",
  "addiction-treatment-resources": "addiction treatment",
};

function deriveKeywords(pathname: string): string[] {
  const clean = pathname.replace(/\/$/, "");
  const segments = clean.split("/").filter(Boolean);
  if (segments.length === 0) return [];

  // Work from the most specific segment backwards
  for (let i = segments.length - 1; i >= 0; i--) {
    const seg = segments[i];
    if (SEGMENT_KEYWORDS[seg]) {
      return SEGMENT_KEYWORDS[seg].split(" ");
    }
  }

  // Fallback: humanise the last segment
  const last = segments[segments.length - 1].replace(/-/g, " ");
  return [last];
}

function buildOrFilter(keywords: string[]): string {
  return keywords
    .map((k) => `title.ilike.%${k}%,category.ilike.%${k}%`)
    .join(",");
}

let _client: ReturnType<typeof createClient> | null = null;
function getClient() {
  if (_client) return _client;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const key =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!;
  _client = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return _client;
}

export default function RelatedPostsSection() {
  const pathname = usePathname();
  const [posts, setPosts] = useState<RelatedPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const skip =
      SKIP_EXACT.has(pathname) ||
      SKIP_PREFIXES.some((p) => pathname.startsWith(p));

    const keywords = deriveKeywords(pathname);
    let cancelled = false;

    async function fetch() {
      if (skip || keywords.length === 0) {
        if (!cancelled) {
          setPosts([]);
          setLoading(false);
        }
        return;
      }

      setLoading(true);
      const filter = buildOrFilter(keywords);
      const { data } = await getClient()
        .from("blog_posts")
        .select("slug, title, excerpt, hero_image_url, category")
        .eq("status", "published")
        .or(filter)
        .order("published_at", { ascending: false })
        .limit(3);

      if (!cancelled) {
        setPosts((data as RelatedPost[]) || []);
        setLoading(false);
      }
    }

    fetch();
    return () => {
      cancelled = true;
    };
  }, [pathname]);

  if (loading || posts.length === 0) return null;

  return (
    <section className="bg-sand py-16">
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
        {/* Header */}
        <div className="mb-10">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-terracotta">
            Further Reading
          </p>
          <h2 className="font-heading text-3xl font-bold text-navy md:text-4xl">
            Related Resources
          </h2>
        </div>

        {/* Cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}/`}
              className="group flex flex-col overflow-hidden bg-white ring-1 ring-sand-dark transition hover:shadow-md"
            >
              {post.hero_image_url && (
                <div className="aspect-[16/9] overflow-hidden">
                  <Image
                    src={post.hero_image_url}
                    alt={post.title}
                    width={640}
                    height={360}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>
              )}
              <div className="flex flex-1 flex-col p-6">
                <span className="mb-3 text-xs font-semibold uppercase tracking-[0.12em] text-terracotta">
                  {post.category}
                </span>
                <h3 className="font-heading mb-3 text-lg font-bold leading-snug text-navy group-hover:text-terracotta transition-colors line-clamp-2">
                  {post.title}
                </h3>
                {post.excerpt && (
                  <p className="mb-4 flex-1 text-sm leading-relaxed text-espresso/80 line-clamp-3">
                    {post.excerpt.replace(/<[^>]+>/g, "")}
                  </p>
                )}
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-terracotta">
                  Read Article
                  <i className="ri-arrow-right-line" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
