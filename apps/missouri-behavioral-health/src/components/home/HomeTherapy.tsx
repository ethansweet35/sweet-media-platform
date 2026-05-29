"use client";

import { useState } from "react";
import Link from "next/link";
import { CONTAINER, PHONE_HREF, PHONE_DISPLAY } from "@/data/site";

/**
 * Combined Therapy Types + Methods section.
 *
 * Layout: white bg, full-bleed left accent panel.
 * Top half — vertical type selector (left rail) + detail panel (right).
 * Bottom strip — dark forest band with 4 methods as a numbered horizontal list.
 */

const TYPES = [
  {
    id: "individual",
    label: "Individual Therapy",
    tagline: "One-on-one healing.",
    body: "A deeply personal therapeutic process focused on growth, self-understanding, and addressing specific mental health or substance use concerns. You and your clinician build a plan that fits your life — not the other way around.",
    bullets: [
      "Tailored treatment plan for your exact needs",
      "Private, confidential sessions",
      "Builds a trusted therapist-client relationship",
      "Explores thoughts, feelings, and behaviors at your pace",
    ],
  },
  {
    id: "group",
    label: "Group Therapy",
    tagline: "Strength in community.",
    body: "A therapist-led session with a small group of individuals navigating similar experiences. Peer accountability and shared stories create a kind of healing that is simply not possible alone.",
    bullets: [
      "Real support from people who understand",
      "Diverse perspectives that sharpen insight",
      "Builds authentic social skills and connection",
      "Reduces isolation — one of addiction's greatest weapons",
    ],
  },
  {
    id: "family",
    label: "Family Therapy",
    tagline: "Healing the whole system.",
    body: "Addiction and mental illness affect entire families. Family therapy addresses the relational patterns — communication, boundaries, trust — that need to shift for lasting recovery to take root.",
    bullets: [
      "Treats the family as the unit of care",
      "Identifies and transforms unhealthy cycles",
      "Rebuilds communication and mutual understanding",
      "Strengthens the support network around the individual",
    ],
  },
  {
    id: "holistic",
    label: "Holistic Therapy",
    tagline: "Mind, body, and spirit.",
    body: "Clinical care works best when the whole person is addressed. We integrate yoga, mindfulness, and body-based practices alongside traditional therapy — building balance that extends well beyond discharge.",
    bullets: [
      "Integrates multiple healing modalities",
      "Addresses the full interconnectedness of well-being",
      "Yoga, breathwork, and mindfulness practices",
      "Emphasizes long-term vitality and presence",
    ],
  },
] as const;

type TypeId = (typeof TYPES)[number]["id"];

const METHODS = [
  {
    num: "01",
    abbr: "EBT",
    label: "Evidence-Based Therapy",
    body: "Research-backed techniques aligned with the latest clinical science.",
    href: "/services",
  },
  {
    num: "02",
    abbr: "CBT",
    label: "Cognitive Behavioral Therapy",
    body: "Breaks negative thought patterns and builds practical coping skills.",
    href: "/cognitive-behavioral-therapy-springfield-mo",
  },
  {
    num: "03",
    abbr: "DBT",
    label: "Dialectical Behavior Therapy",
    body: "Balances acceptance and change through mindfulness and skill-building.",
    href: "/dialectical-behavioral-therapy-springfield-mo",
  },
  {
    num: "04",
    abbr: "DDT",
    label: "Dual Diagnosis Treatment",
    body: "Simultaneous treatment for mental health and substance use disorders.",
    href: "/services",
  },
] as const;

export default function HomeTherapy() {
  const [active, setActive] = useState<TypeId>("individual");
  const current = TYPES.find((t) => t.id === active)!;

  return (
    <section className="bg-white">

      {/* ── Top panel ─────────────────────────────────────────────── */}
      <div className={`${CONTAINER} pt-[100px] pb-[100px]`}>

        {/* Section label */}
        <div className="mb-10 flex items-center gap-3 lg:mb-14">
          <div className="h-px w-8 bg-mbh-green" aria-hidden />
          <span className="font-body text-[11px] font-semibold uppercase tracking-[0.3em] text-mbh-green">
            Personalized Care
          </span>
        </div>

        <div className="grid gap-0 lg:grid-cols-[300px_1fr] xl:grid-cols-[340px_1fr]">

          {/* Left rail — vertical type selector */}
          <div className="border-b border-mbh-forest/10 pb-8 lg:border-b-0 lg:border-r lg:pb-0 lg:pr-10">

            <h2 className="font-display text-[clamp(1.5rem,2.8vw,2.25rem)] font-semibold leading-[1.12] tracking-tight text-mbh-forest">
              Therapy types &amp; methods.
            </h2>
            <p className="mt-3 font-body text-sm leading-relaxed text-mbh-body">
              Every plan combines the modalities that fit your unique situation.
            </p>

            <nav className="mt-8 space-y-1" aria-label="Therapy types">
              {TYPES.map((type) => {
                const isActive = active === type.id;
                return (
                  <button
                    key={type.id}
                    onClick={() => setActive(type.id)}
                    className={`group flex w-full items-center justify-between rounded-xl px-4 py-3.5 text-left transition-all ${
                      isActive
                        ? "bg-mbh-forest text-white"
                        : "text-mbh-body hover:bg-mbh-forest/5 hover:text-mbh-forest"
                    }`}
                  >
                    <span className="font-display text-[0.9rem] font-semibold leading-snug">
                      {type.label}
                    </span>
                    <i
                      className={`ri-arrow-right-line shrink-0 text-sm transition-transform ${
                        isActive ? "translate-x-0.5 text-white/70" : "text-mbh-forest/30 group-hover:translate-x-0.5"
                      }`}
                      aria-hidden
                    />
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Right panel — detail */}
          <div className="pt-8 lg:pl-12 lg:pt-0 xl:pl-16">

            {/* Large tagline */}
            <p
              className="font-display font-semibold leading-[1] tracking-[-0.03em] text-mbh-forest/[0.04] select-none"
              style={{ fontSize: "clamp(2.5rem, 5.5vw, 5rem)" }}
              aria-hidden
            >
              {current.tagline.split(" ").map((word, i) => (
                <span key={i} className="block">{word}</span>
              ))}
            </p>

            {/* Content — overlaid using negative margin to sit atop the watermark */}
            <div className="mt-3">
              <h3 className="font-display text-[1.5rem] font-semibold text-mbh-forest lg:text-[1.75rem]">
                {current.label}
              </h3>
              <p className="mt-4 font-body text-base leading-relaxed text-mbh-body">
                {current.body}
              </p>
              <ul className="mt-6 space-y-3">
                {current.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-3">
                    <span className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-mbh-green/15">
                      <i className="ri-check-line text-[10px] text-mbh-green" aria-hidden />
                    </span>
                    <span className="font-body text-[0.9375rem] leading-relaxed text-mbh-body">{b}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      </div>

      {/* ── Methods strip ──────────────────────────────────────────── */}
      <div className="bg-mbh-forest-deep">
        <div className={CONTAINER}>

          {/* Top bar inside strip */}
          <div className="flex flex-col gap-4 border-b border-white/8 py-8 sm:flex-row sm:items-center sm:justify-between">
            <p className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-white/40">
              Clinical Methods
            </p>
            <a
              href={PHONE_HREF}
              className="inline-flex items-center gap-2 font-body text-sm font-semibold text-mbh-sage hover:underline underline-offset-4"
            >
              <i className="ri-phone-line" aria-hidden />
              Call 24/7 — {PHONE_DISPLAY}
            </a>
          </div>

          {/* 4-column methods */}
          <div className="grid divide-y divide-white/8 sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
            {METHODS.map((m) => (
              <Link
                key={m.abbr}
                href={m.href}
                className="group flex flex-col gap-3 px-0 py-8 transition-colors hover:bg-white/3 sm:px-7 lg:px-8"
              >
                <div className="flex items-baseline gap-3">
                  <span className="font-body text-[10px] font-bold tabular-nums text-white/20">
                    {m.num}
                  </span>
                  <span className="font-display text-xl font-semibold text-mbh-sage">
                    {m.abbr}
                  </span>
                </div>
                <p className="font-display text-[0.9375rem] font-semibold leading-snug text-white">
                  {m.label}
                </p>
                <p className="font-body text-sm leading-relaxed text-white/50">{m.body}</p>
                <div className="mt-auto flex items-center gap-1.5 font-body text-xs font-semibold text-mbh-sage/60 opacity-0 transition-opacity group-hover:opacity-100">
                  Learn more <i className="ri-arrow-right-line" aria-hidden />
                </div>
              </Link>
            ))}
          </div>

        </div>
      </div>

    </section>
  );
}
