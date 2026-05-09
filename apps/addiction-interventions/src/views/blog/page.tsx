"use client";

import { useState } from "react";
import Link from "next/link";
import BlogHero from "@/components/pages/blog/components/BlogHero";
import BlogFeatured from "@/components/pages/blog/components/BlogFeatured";
import BlogGrid from "@/components/pages/blog/components/BlogGrid";

const TOPICS = [
  { icon: "ri-heart-pulse-line", label: "Intervention Planning", href: "/how-to-plan-an-intervention-for-success", desc: "Step-by-step guides for families who are ready to act — from preparation through follow-up." },
  { icon: "ri-mental-health-line", label: "Mental Health", href: "/mental-health-interventions", desc: "Understanding depression, anxiety, PTSD, bipolar, and OCD through a family lens." },
  { icon: "ri-capsule-line", label: "Addiction & Recovery", href: "/substance-abuse-interventions", desc: "How addiction works, what families can do, and what evidence-based treatment looks like." },
  { icon: "ri-team-line", label: "Family Dynamics", href: "/family-interventions", desc: "Codependency, enabling, boundaries, and what healthy support for a loved one actually requires." },
  { icon: "ri-psychotherapy-line", label: "Trauma & Grief", href: "/resources", desc: "Processing loss, adverse childhood experiences, and the generational patterns that fuel substance use." },
  { icon: "ri-road-map-line", label: "After the Intervention", href: "/resources", desc: "What happens in treatment, how to maintain boundaries, and how families rebuild trust over time." },
];

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-white">
      <main>
        <BlogHero searchQuery={searchQuery} onSearchChange={setSearchQuery} />

        {/* Topics section — adds meaningful text to improve text-to-HTML ratio */}
        <section className="bg-[#F5F3E7] py-16">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="mb-8">
              <p className="brand-eyebrow mb-2 text-[#8FAC87]">What We Write About</p>
              <h2 className="font-heading text-2xl font-bold text-[#1A1A17] md:text-3xl">
                Topics covered in this journal
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#4B4B4B]">
                Every article is written by or in close collaboration with our certified interventionists and clinical advisors. We cover the full arc of the family experience — from first recognising a problem to rebuilding life after treatment. Our goal is to give you accurate, compassionate information so you can make the right decisions for your loved one, even when the situation feels impossible.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {TOPICS.map((t) => (
                <Link
                  key={t.label}
                  href={t.href}
                  className="group flex items-start gap-4 rounded-2xl border border-[#EFEFEF] bg-white p-5 shadow-sm transition hover:border-[#8FAC87]/50 hover:shadow-md"
                >
                  <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#8FAC87]/15 text-[#507969] transition group-hover:bg-[#8FAC87] group-hover:text-white">
                    <i className={`${t.icon} text-lg`}></i>
                  </span>
                  <div>
                    <h3 className="font-heading text-base font-bold text-[#1A1A17]">{t.label}</h3>
                    <p className="mt-1 text-xs leading-relaxed text-[#4B4B4B]">{t.desc}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <BlogFeatured />
        <BlogGrid searchQuery={searchQuery} />
      </main>
    </div>
  );
}
