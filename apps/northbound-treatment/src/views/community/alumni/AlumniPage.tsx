"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { heroContentPad, heroLocationSection } from "@/lib/heroSpacing";
import CtaBanner from "@/views/shared/CtaBanner";
import { AutoLinkedTextClient } from "@sweetmedia/blog-core";

const HERO =
  "https://ahufsygjwpbymomfdazb.supabase.co/storage/v1/object/public/site-assets/images/nbt_alumni_hero01.jpg";

const CONTAINER = "mx-auto w-full max-w-7xl px-6 lg:px-10";

const STATS = [
  { value: "500+", label: "Active Alumni Members" },
  { value: "38", label: "Years of Community" },
  { value: "1,000+", label: "Graduates Per Year" },
  { value: "1/3", label: "Staff Are Alumni" },
];

const TESTIMONIALS = [
  {
    quote:
      "Sobriety is not something anyone can do on their own. I could have never gotten sober without a healthy and fostering community of people to build me back up when I was broken to the core. Northbound provided me with a safe place to teach me the tools to live a life of sobriety and instilled a sense of self-love that I didn't know I had before.",
    name: "Tony M.",
    milestone: "Northbound Alumni",
  },
  {
    quote:
      "After completing the program I can proudly say Northbound was an absolute blessing and truly saved my life. Each individual involved in the company from the techs to the case managers to the doctors had my genuine best interest in mind. Northbound gave me a reason to live again and I will forever be grateful and indebted to everyone in the Northbound Community.",
    name: "Jason J.",
    milestone: "Northbound Alumni",
  },
  {
    quote:
      "Northbound helped me above and beyond what I had anticipated. I am still currently involved in their alumni community. They have amazing follow-up programs, which is something that has helped me tremendously. Next month I will be celebrating two years clean and sober, thanks to Northbound!",
    name: "Brynn A.",
    milestone: "2 Years Clean & Sober",
  },
  {
    quote:
      "Northbound is an incredible treatment center. Not only did they teach me how to get sober and stay sober, they helped me tackle my other problems as well and helped me become the best version of myself possible. I have so much love and gratitude for the staff that saved my life.",
    name: "Grace F.",
    milestone: "Northbound Alumni",
  },
  {
    quote:
      "The alumni program continues to keep me connected to my fellowship of Northbound. Not only do we have fun events to do together monthly, I have a firm foundation of sober friends. I am more grateful for the opportunities that Northbound has given me. I am sober, happy, and free.",
    name: "Haley G.",
    milestone: "Northbound Alumni",
  },
];

const EVENTS = [
  {
    icon: "ri-group-line",
    title: "Weekly Monday Evening Meetings",
    desc: "In-person alumni meetings at our Orange County headquarters every Monday evening — with guest speakers, open shares, and community.",
  },
  {
    icon: "ri-sun-line",
    title: "Friday Morning Meetings",
    desc: "Friday morning alumni meetings with an optional lunch together afterward — a standing weekly ritual for the Northbound community.",
  },
  {
    icon: "ri-vidicon-line",
    title: "Wednesday Family Support (Zoom)",
    desc: "Weekly Zoom meetings for families impacted by a loved one's addiction — open to anyone in the Northbound family circle.",
  },
  {
    icon: "ri-compass-discover-line",
    title: "Monthly Adventures",
    desc: "Past events: indoor skydiving, K1 speedway racing, mini golf, go-karts, bowling, camping, concerts, and movies on the beach.",
  },
  {
    icon: "ri-medal-line",
    title: "Quarterly Sobriety Celebrations",
    desc: "Quarterly milestone celebrations honoring one year — and multiple years — of continuous sobriety, attended by staff, alumni, clients, and families.",
  },
  {
    icon: "ri-heart-line",
    title: "Community Volunteer Work",
    desc: "Alumni participate in ongoing community service — beach cleanups, mentorship, and service activities that reinforce the giving-back principles of lasting recovery.",
  },
];

export default function AlumniPage() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────── */}
      <section className={`${heroLocationSection} overflow-hidden`}>
        <Image
          src={HERO}
          alt="Northbound alumni celebrating together at an outdoor event in Southern California"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy/90 via-navy/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent" />

        <div className={`relative z-10 mx-auto flex min-h-full w-full max-w-7xl flex-col justify-center ${heroContentPad}`}>
          <nav className="mb-6 flex items-center gap-2 text-xs font-semibold text-white/50">
            <Link href="/" className="hover:text-white transition">Home</Link>
            <span>/</span>
            <Link href="/community/alumni/" className="hover:text-white transition">Community</Link>
            <span>/</span>
            <span className="text-white/80">Alumni Programs</span>
          </nav>

          <p className="brand-eyebrow mb-4 text-terracotta">Alumni Community</p>
          <h1 className="font-heading max-w-2xl text-5xl font-bold leading-tight text-white md:text-6xl">
            The Northbound{" "}
            <span className="italic text-terracotta-light">Alumni</span>{" "}
            Family
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/75">
            <AutoLinkedTextClient>{"Recovery built in community lasts. Northbound's alumni association connects 500+ former clients through weekly meetings, monthly adventures, sobriety milestone celebrations, and lifelong support — because the relationships formed in treatment are among the most powerful forces in sustained recovery."}</AutoLinkedTextClient>
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="tel:8663110003"
              className="inline-flex items-center gap-2 rounded-none bg-terracotta px-7 py-3.5 text-sm font-bold uppercase tracking-widest text-white transition hover:bg-terracotta-light"
            >
              <i className="ri-phone-fill" /> Call (866) 311-0003
            </a>
            <a
              href="/admissions/"
              className="inline-flex items-center gap-2 rounded-none border border-white/30 px-7 py-3.5 text-sm font-bold uppercase tracking-widest text-white transition hover:border-white/60 hover:bg-white/10"
            >
              Get Started <i className="ri-arrow-right-line" />
            </a>
          </div>
        </div>
      </section>

      {/* ── Stats ─────────────────────────────────────────────── */}
      <section className="bg-terracotta py-12">
        <div className={`${CONTAINER} grid grid-cols-2 gap-8 lg:grid-cols-4`}>
          {STATS.map((s) => (
            <div key={s.label} className="text-center">
              <p className="font-heading text-4xl font-bold text-white"><AutoLinkedTextClient>{s.value}</AutoLinkedTextClient></p>
              <p className="mt-1 text-xs font-semibold uppercase tracking-widest text-white/70"><AutoLinkedTextClient>{s.label}</AutoLinkedTextClient></p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Paul Alexander Quote ───────────────────────────────── */}
      <section className="bg-navy py-20">
        <div className={`${CONTAINER} max-w-4xl text-center`}>
          <div className="mb-6 flex justify-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-terracotta/20">
              <i className="ri-double-quotes-l text-2xl text-terracotta" />
            </span>
          </div>
          <blockquote className="font-heading text-2xl font-bold italic leading-relaxed text-white md:text-3xl">
            &ldquo;What Northbound offers is a long-term solution. There is a huge difference between physical abstinence and living in recovery. The Northbound alumni are made up of people in recovery who are emotionally balanced and spiritually fit. We help people find that enlightened state.&rdquo;
          </blockquote>
          <p className="mt-6 text-sm font-semibold text-terracotta">
            <AutoLinkedTextClient>{"Paul Alexander — CEO & Founder, Northbound Treatment Services"}</AutoLinkedTextClient>
          </p>
        </div>
      </section>

      {/* ── Alumni Programs ────────────────────────────────────── */}
      <section className="bg-white py-20 lg:py-28">
        <div className={CONTAINER}>
          <div className="mb-14 text-center">
            <p className="brand-eyebrow mb-3 text-terracotta">Community Events</p>
            <h2 className="font-heading text-4xl font-bold text-navy md:text-5xl">
              How the <span className="italic text-terracotta">Alumni</span> Program Works
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-navy/60">
              <AutoLinkedTextClient>{"From weekly meetings to monthly adventures, Northbound's alumni program provides ongoing connection, accountability, and celebration throughout every stage of sustained recovery."}</AutoLinkedTextClient>
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {EVENTS.map((e) => (
              <div
                key={e.title}
                className="group flex flex-col gap-4 rounded-none border border-navy/10 bg-white p-7 shadow-sm transition hover:border-terracotta/30 hover:shadow-md"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-none bg-terracotta/10 transition group-hover:bg-terracotta/20">
                  <i className={`${e.icon} text-xl text-terracotta`} />
                </span>
                <div>
                  <h3 className="font-heading text-base font-bold text-navy">{e.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-navy/60"><AutoLinkedTextClient>{e.desc}</AutoLinkedTextClient></p>
                </div>
              </div>
            ))}
          </div>

          <p className="mt-10 text-center text-sm text-navy/40">
            <AutoLinkedTextClient>{"Open to all Northbound alumni and anyone in the recovery community — you don't have to have been a Northbound client to join."}</AutoLinkedTextClient>
          </p>
        </div>
      </section>

      {/* ── Testimonials ──────────────────────────────────────── */}
      <section className="bg-navy py-20 lg:py-28">
        <div className={CONTAINER}>
          <div className="mb-14 text-center">
            <p className="brand-eyebrow mb-3 text-terracotta">Alumni Voices</p>
            <h2 className="font-heading text-4xl font-bold text-white md:text-5xl">
              Lives <span className="italic text-terracotta">Transformed</span>
            </h2>
          </div>

          <div className="relative mx-auto max-w-3xl">
            <div className="min-h-[240px] rounded-none border border-white/10 bg-white/5 p-10 backdrop-blur-sm">
              <i className="ri-double-quotes-l mb-4 block text-3xl text-terracotta" />
              <p className="font-heading text-lg font-medium italic leading-relaxed text-white md:text-xl">
                &ldquo;{TESTIMONIALS[activeTestimonial].quote}&rdquo;
              </p>
              <div className="mt-6 flex items-center gap-3">
                <div className="h-px flex-1 bg-white/10" />
                <div className="text-right">
                  <p className="text-sm font-bold text-white">{TESTIMONIALS[activeTestimonial].name}</p>
                  <p className="text-xs text-terracotta">{TESTIMONIALS[activeTestimonial].milestone}</p>
                </div>
              </div>
            </div>

            {/* Navigation dots */}
            <div className="mt-6 flex justify-center gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveTestimonial(i)}
                  aria-label={`View testimonial ${i + 1}`}
                  className={`h-2 rounded-full transition-all ${i === activeTestimonial ? "w-8 bg-terracotta" : "w-2 bg-white/20 hover:bg-white/40"}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Work Exchange Program ──────────────────────────────── */}
      <section className="bg-white py-20 lg:py-28">
        <div className={CONTAINER}>
          <div className="grid gap-14 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="brand-eyebrow mb-3 text-terracotta">Career in Recovery</p>
              <h2 className="font-heading text-4xl font-bold text-navy md:text-5xl">
                The Work <span className="italic text-terracotta">Exchange</span> Program
              </h2>
              <p className="mt-5 text-base leading-relaxed text-navy/70">
                <AutoLinkedTextClient>{"Eligible Northbound alumni can apply for the Work Exchange Program — working at Northbound after completing treatment while studying to become a Licensed Addiction Counselor. It's one of the most powerful bridges between personal recovery and professional purpose we offer."}</AutoLinkedTextClient>
              </p>
              <ul className="mt-6 grid gap-3">
                {[
                  "Work at Northbound post-treatment in a sober professional environment",
                  "Pursue Licensed Addiction Counseling credentials concurrently",
                  "Support new clients through the same recovery process you completed",
                  "Build professional identity, income, and purpose in early recovery",
                  "Stay embedded in a therapeutic community during the most vulnerable period",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-terracotta text-white">
                      <i className="ri-check-line text-xs" />
                    </span>
                    <span className="text-sm leading-relaxed text-navy/70">{item}</span>
                  </li>
                ))}
              </ul>
              <a
                href="/admissions/"
                className="mt-8 inline-flex items-center gap-2 rounded-none bg-navy px-7 py-3.5 text-sm font-bold uppercase tracking-widest text-white transition hover:bg-navy-light"
              >
                Learn About Admissions <i className="ri-arrow-right-line" />
              </a>
            </div>

            <div className="rounded-none border border-white/10 bg-navy p-10">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-terracotta/20">
                <i className="ri-briefcase-line text-2xl text-terracotta" />
              </div>
              <h3 className="font-heading text-2xl font-bold text-white">One-Third of Our Staff Are Alumni</h3>
              <p className="mt-3 text-base leading-relaxed text-white/70">
                <AutoLinkedTextClient>{"About one-third of Northbound's clinical and support staff are graduates of the program. This means every client is supported by people who have walked the same path — who understand addiction not just academically, but personally."}</AutoLinkedTextClient>
              </p>
              <div className="mt-8 grid grid-cols-2 gap-4">
                {[
                  { icon: "ri-team-line", label: "1:1 Staff Ratio" },
                  { icon: "ri-award-line", label: "DHCS Licensed" },
                  { icon: "ri-heart-pulse-line", label: "200+ Yrs Expertise" },
                  { icon: "ri-star-line", label: "4.6★ Google Rating" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-3 rounded-none border border-white/10 bg-white/5 px-4 py-3">
                    <i className={`${item.icon} text-lg text-terracotta`} />
                    <span className="text-xs font-semibold text-white">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────── */}
      <CtaBanner
        eyebrow="Join the Family"
        headline="Ready to Start Your Recovery Journey?"
        body="Whether you're seeking treatment for yourself or a loved one, or you're a Northbound alumni looking to reconnect with the community, we want to hear from you. One call starts it all."
        primaryCta={{ label: "Call (866) 311-0003", href: "tel:8663110003" }}
        secondaryCta={{ label: "Verify Insurance", href: "/admissions/" }}
      />
    </>
  );
}
