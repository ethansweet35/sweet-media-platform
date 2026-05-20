"use client";

import { useState } from "react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import Eyebrow from "@/components/ui/Eyebrow";
import Button from "@/components/ui/Button";
import Link from "next/link";
import { AutoLinkedTextClient } from "@sweetmedia/blog-core";

/* ─────────────────────────────────────────── Types & constants ─────── */

type GroupNum = 1 | 2 | 3 | 4;

interface Session {
  topic: string;
  note?: string;
}

interface DaySlot {
  grp1?: Session;
  grp2?: Session;
  grp3?: Session;
  grp4?: Session;
}

interface TimeBlock {
  time: string;
  mon: DaySlot;
  tue: DaySlot;
  wed: DaySlot;
  thu: DaySlot;
  fri: DaySlot;
}

const GROUP_COLORS: Record<GroupNum, { bg: string; text: string; border: string; badge: string; label: string }> = {
  1: { bg: "bg-[#FFF3B0]",    text: "text-[#7A6000]",  border: "border-[#E8C800]/40", badge: "bg-[#F5C800] text-[#5A4500]", label: "Group 1 — Yellow" },
  2: { bg: "bg-[#D4EDDA]",    text: "text-[#1A5C2E]",  border: "border-[#5C9E6A]/40", badge: "bg-[#4CAF6A] text-white",     label: "Group 2 — Green"  },
  3: { bg: "bg-[#CCE5FF]",    text: "text-[#0A3566]",  border: "border-[#4A90D9]/40", badge: "bg-[#2979C8] text-white",     label: "Group 3 — Blue"   },
  4: { bg: "bg-[#FFE0B2]",    text: "text-[#7A3800]",  border: "border-[#E07000]/40", badge: "bg-[#E07A00] text-white",     label: "Group 4 — Orange" },
};

const DAYS = ["mon", "tue", "wed", "thu", "fri"] as const;
const DAY_LABELS: Record<typeof DAYS[number], string> = {
  mon: "Monday", tue: "Tuesday", wed: "Wednesday", thu: "Thursday", fri: "Friday",
};

/* ──────────────────────────────────────────────── Schedule data ─────── */

const schedule: TimeBlock[] = [
  {
    time: "11:00 – 11:45 AM",
    mon: {
      grp1: { topic: "Life Goals" },
      grp2: { topic: "Guided Movement for Improving Posture & Physical Alignment" },
      grp3: { topic: "Process Group" },
      grp4: { topic: "Managing Frustration When Things Don't Go as Planned" },
    },
    tue: {
      grp1: { topic: "Outing 11–2 PM", note: "6/2, 6/9, 6/16, 6/23, 6/30, 7/7, 5/12, 5/19, 5/26" },
    },
    wed: {
      grp1: { topic: "Improving Anxiety" },
      grp2: { topic: "Collapsing Big Emotions" },
      grp3: { topic: "The Reset Room — Recovery/Life Skills" },
      grp4: { topic: "Fixed Mindset vs. Growth Mindset" },
    },
    thu: {
      grp1: { topic: "Community Mtg" },
      grp2: { topic: "Community Mtg" },
      grp3: { topic: "Community Mtg" },
      grp4: { topic: "Community Mtg" },
    },
    fri: {
      grp1: { topic: "Gentle Movement for Flexibility & Mobility" },
      grp2: { topic: "Managing Comparison Without Losing Confidence" },
      grp3: { topic: "Good, Grateful, Goal" },
      grp4: { topic: "Building Better Daily Habits" },
    },
  },
  {
    time: "12:00 – 12:45 PM",
    mon: {
      grp1: { topic: "Fresh Start" },
      grp2: { topic: "Grief & Loss" },
      grp3: { topic: "Stress Management" },
      grp4: { topic: "Staying in Control During Chaos" },
    },
    tue: {
      grp1: { topic: "Outing (continued)" },
    },
    wed: {
      grp1: { topic: "Somatic Mindfulness" },
      grp2: { topic: "Recovering From Relapse" },
      grp3: { topic: "Effective Listening & Being Heard" },
      grp4: { topic: "Recognizing Patterns of People-Pleasing" },
    },
    thu: {
      grp1: { topic: "Breathwork for Improving Energy & Physical Awareness" },
      grp2: { topic: "Embracing Life Again" },
      grp3: { topic: "Following Through on Priorities When Motivation is Low" },
      grp4: { topic: "Letting Go of Resentment" },
    },
    fri: {
      grp1: { topic: "Reclaiming Your Focus" },
      grp2: { topic: "Leadership in Recovery" },
      grp3: { topic: "CBT" },
      grp4: { topic: "Learning to Make Progress Without Waiting for Motivation" },
    },
  },
  {
    time: "1:00 – 1:45 PM",
    mon: {
      grp1: { topic: "Recognizing When Small Stressors Start to Add Up" },
      grp2: { topic: "Reframing Negative Thoughts" },
      grp3: { topic: "Grief & Loss" },
      grp4: { topic: "Breath & Movement for Relaxation and Balance" },
    },
    tue: {
      grp1: { topic: "Outing (ends 2 PM)" },
    },
    wed: {
      grp1: { topic: "Breaking Free From Perfectionism in Daily Tasks" },
      grp2: { topic: "Managing Mental Fatigue During Busy Days" },
      grp3: { topic: "Challenging Thought Patterns" },
      grp4: { topic: "Emotional Boundaries" },
    },
    thu: {
      grp1: { topic: "Belief Systems" },
      grp2: { topic: "Letting Go of the Need to Control Every Outcome" },
      grp3: { topic: "Fixed Mindset vs. Growth Mindset" },
      grp4: { topic: "Psychological Flexibility" },
    },
    fri: {
      grp1: { topic: "Recognizing When Your Inner Critic Takes Over" },
      grp2: { topic: "Creating Positive Strengths" },
      grp3: { topic: "Getting What You Want With the Language You Use" },
      grp4: { topic: "Irrational Beliefs & How to Challenge Them" },
    },
  },
  {
    time: "3:00 – 3:45 PM",
    mon: {
      grp1: { topic: "Stress Management" },
      grp2: { topic: "Meaning & Purpose" },
      grp3: { topic: "Building Healthy Boundaries in Changing Relationships" },
      grp4: { topic: "Weekly Recovery Reset" },
    },
    tue: {
      grp1: { topic: "Learning to be Authentic" },
      grp2: { topic: "Discipline Over Motivation" },
      grp3: { topic: "Stress Management" },
      grp4: { topic: "Staying Flexible When Plans Change Unexpectedly" },
    },
    wed: {
      grp1: { topic: "Creating Structure When Your Day Feels Disorganized" },
      grp2: { topic: "Unlearning Unhealthy Survival Skills" },
      grp3: { topic: "Building a Wall of Resistance" },
      grp4: { topic: "Handling Disappointment Without Shutting Down" },
    },
    thu: {
      grp1: { topic: "Creating New Perspectives" },
      grp2: { topic: "Recovering After Emotionally Draining Interactions" },
      grp3: { topic: "Emotional Regulation" },
      grp4: { topic: "Setting Realistic Expectations for Yourself" },
    },
    fri: {},
  },
  {
    time: "4:00 – 4:45 PM",
    mon: {
      grp1: { topic: "Anger Management" },
      grp2: { topic: "Creating Positive Strengths & Qualities" },
      grp3: { topic: "Managing Responsibilities Without Feeling Scattered" },
      grp4: { topic: "Learning to Reconnect With Personal Interests" },
    },
    tue: {
      grp1: { topic: "How to Create Support Systems" },
      grp2: { topic: "Recovery/Relapse" },
      grp3: { topic: "Adjusting to Shifts in Friendships & Social Connections" },
      grp4: { topic: "Building Momentum When You've Been Avoiding Tasks" },
    },
    wed: {
      grp1: { topic: "Building a Sense of Self" },
      grp2: { topic: "Working Through Disagreements Productively" },
      grp3: { topic: "Responding Calmly During Moments of Tension" },
      grp4: { topic: "Anger Management" },
    },
    thu: {
      grp1: { topic: "Positive Self Awareness" },
      grp2: { topic: "TBD" },
      grp3: { topic: "Sound Healing" },
      grp4: { topic: "Recognizing When You Need to Slow Down and Reset" },
    },
    fri: {
      grp1: { topic: "Outing 3–5 PM", note: "5/22, 5/29, 6/5, 6/12, 6/19, 6/26, 7/3, 7/10, 5/15" },
    },
  },
  {
    time: "5:00 – 5:45 PM",
    mon: {
      grp1: { topic: "Dealing with Social Anxiety" },
    },
    tue: {
      grp1: { topic: "Self Esteem" },
    },
    wed: {
      grp1: { topic: "Psycho Ed" },
    },
    thu: {
      grp1: { topic: "Conscious Communication" },
    },
    fri: {},
  },
  {
    time: "6:00 – 6:45 PM",
    mon: {
      grp1: { topic: "Psych-Ed" },
    },
    tue: {
      grp1: { topic: "Coping Skills" },
    },
    wed: {
      grp1: { topic: "Spirituality" },
    },
    thu: {
      grp1: { topic: "Accountability vs. Victim Mentality" },
    },
    fri: {},
  },
];

/* ─────────────────────────────────────────────────── Helpers ─────── */

function SessionCell({ slot, groupFilter }: { slot: DaySlot; groupFilter: GroupNum | 0 }) {
  const entries = ([1, 2, 3, 4] as GroupNum[])
    .filter((g) => (groupFilter === 0 || groupFilter === g) && slot[`grp${g}` as keyof DaySlot])
    .map((g) => ({ g, session: slot[`grp${g}` as keyof DaySlot]! }));

  if (entries.length === 0) {
    return <div className="min-h-[56px]" />;
  }

  return (
    <div className="flex flex-col gap-1.5">
      {entries.map(({ g, session }) => {
        const c = GROUP_COLORS[g];
        return (
          <div key={g} className={`rounded-sm px-3 py-2.5 ${c.bg} ${c.border} border`}>
            <span className={`inline-block rounded-sm px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.15em] mb-1.5 ${c.badge}`}>
              Grp-{g}
            </span>
            <p className={`text-[12px] font-medium leading-snug ${c.text}`}><AutoLinkedTextClient>{session.topic}</AutoLinkedTextClient></p>
            {session.note && (
              <p className={`mt-1 text-[10px] leading-snug opacity-70 ${c.text}`}><AutoLinkedTextClient>{session.note}</AutoLinkedTextClient></p>
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ─────────────────────────────────────────────────── Component ─────── */

export default function InPersonSchedulePage() {
  const [groupFilter, setGroupFilter] = useState<GroupNum | 0>(0);

  return (
    <main className="min-h-screen bg-[var(--color-background)]">

      {/* ①  Hero ────────────────────────────────────────────────────────── */}
      <section className="bg-ink relative overflow-hidden pt-32 pb-20">
        <div className="pointer-events-none absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-accent/5" />
        <div className="pointer-events-none absolute -left-20 bottom-0 h-64 w-64 rounded-full bg-accent/5" />

        <div className="relative mx-auto w-full max-w-[1300px] px-[30px] lg:px-6">
          <div className="min-w-0 w-full lg:max-w-[52rem]">
            <div className="flex items-center gap-2 mb-6">
              <Link
                href="/about"
                className="text-[10px] font-medium uppercase tracking-[0.25em] text-white/40 hover:text-accent transition-colors"
              >
                About Rize
              </Link>
              <span className="text-white/25 text-xs">/</span>
              <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-accent">
                In-Person Schedule
              </span>
            </div>

            <Eyebrow colorClass="text-accent">Mental Health Program</Eyebrow>
            <h1
              className="font-[family-name:var(--font-display)] font-normal text-white mt-4 mb-6"
              style={{ fontSize: "clamp(44px, 5vw, 76px)", lineHeight: 0.96 }}
            >
              In-Person Group
              <br />
              <em className="italic text-white/60">Schedule</em>
            </h1>
            <p className="text-[16px] font-light leading-relaxed text-white/80 lg:max-w-2xl mb-10">
              <AutoLinkedTextClient>{"Daily clinician-led group therapy sessions across four concurrent tracks — each designed to build evidence-based recovery skills in a structured, supportive environment."}</AutoLinkedTextClient>
            </p>
            <div className="flex flex-wrap gap-3">
              <Button href="/admissions" variant="accent" size="md">
                Join a Group
              </Button>
              <Button href="tel:9494612620" variant="outline-white" size="md">
                <i className="ri-phone-line mr-2 text-sm" /> (949) 461-2620
              </Button>
            </div>
          </div>

          {/* Group legend */}
          <div className="mt-14 flex flex-wrap gap-3">
            {([1, 2, 3, 4] as GroupNum[]).map((g) => {
              const c = GROUP_COLORS[g];
              return (
                <div key={g} className={`flex items-center gap-2 rounded-sm px-4 py-2 ${c.bg}`}>
                  <span className={`inline-block h-2.5 w-2.5 rounded-sm ${c.badge.split(" ")[0]}`} />
                  <span className={`text-[10px] font-semibold uppercase tracking-[0.15em] ${c.text}`}>
                    {c.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ②  Schedule ────────────────────────────────────────────────────── */}
      <SectionWrapper bg="bg-[#F8F4ED]" py="py-[80px]">

        {/* Filter bar */}
        <div className="mb-10 flex flex-wrap items-center gap-3">
          <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-ink/50 mr-1">
            Filter by group:
          </span>
          <button
            onClick={() => setGroupFilter(0)}
            className={`rounded-sm px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.15em] transition-all ${
              groupFilter === 0
                ? "bg-ink text-white"
                : "bg-white border border-warm/40 text-ink/60 hover:border-ink/30 hover:text-ink"
            }`}
          >
            All Groups
          </button>
          {([1, 2, 3, 4] as GroupNum[]).map((g) => {
            const c = GROUP_COLORS[g];
            return (
              <button
                key={g}
                onClick={() => setGroupFilter(g)}
                className={`rounded-sm px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.15em] transition-all border ${
                  groupFilter === g
                    ? `${c.badge} border-transparent`
                    : `bg-white ${c.border} ${c.text} opacity-70 hover:opacity-100`
                }`}
              >
                Group {g}
              </button>
            );
          })}
        </div>

        {/* Desktop table */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr>
                <th className="bg-ink text-white text-[10px] font-semibold uppercase tracking-[0.2em] px-4 py-3 w-[130px]">
                  Time
                </th>
                {DAYS.map((d) => (
                  <th key={d} className="bg-ink text-white text-[10px] font-semibold uppercase tracking-[0.2em] px-4 py-3">
                    {DAY_LABELS[d]}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {schedule.map((block, bi) => (
                <tr key={bi} className={bi % 2 === 0 ? "bg-white" : "bg-cream-tile"}>
                  <td className="border-r border-warm/30 px-4 py-4 align-top">
                    <span className="text-[11px] font-semibold text-ink whitespace-nowrap">{block.time}</span>
                  </td>
                  {DAYS.map((d) => (
                    <td key={d} className="border-r border-warm/20 last:border-0 px-3 py-3 align-top min-w-[180px]">
                      <SessionCell slot={block[d]} groupFilter={groupFilter} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile — stacked by time block */}
        <div className="flex flex-col gap-6 lg:hidden">
          {schedule.map((block, bi) => {
            const hasContent = DAYS.some((d) => {
              const slot = block[d];
              return ([1, 2, 3, 4] as GroupNum[]).some(
                (g) => (groupFilter === 0 || groupFilter === g) && slot[`grp${g}` as keyof DaySlot]
              );
            });
            if (!hasContent) return null;
            return (
              <div key={bi} className="bg-white border border-warm/30 overflow-hidden">
                <div className="bg-ink px-5 py-3">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white"><AutoLinkedTextClient>{block.time}</AutoLinkedTextClient></p>
                </div>
                <div className="divide-y divide-warm/20">
                  {DAYS.map((d) => {
                    const slot = block[d];
                    const entries = ([1, 2, 3, 4] as GroupNum[]).filter(
                      (g) => (groupFilter === 0 || groupFilter === g) && slot[`grp${g}` as keyof DaySlot]
                    );
                    if (entries.length === 0) return null;
                    return (
                      <div key={d} className="px-5 py-4">
                        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-ink/40 mb-3">
                          {DAY_LABELS[d]}
                        </p>
                        <div className="flex flex-col gap-2">
                          <SessionCell slot={slot} groupFilter={groupFilter} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </SectionWrapper>

      {/* ③  CTA ─────────────────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden py-[80px]"
        style={{ background: "linear-gradient(135deg, #2c302e 0%, #3a3f3c 50%, #2c302e 100%)" }}
      >
        <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-accent/8" />
        <div className="pointer-events-none absolute -right-20 -bottom-20 h-64 w-64 rounded-full bg-accent/6" />

        <div className="relative mx-auto w-full max-w-[1300px] px-[30px] lg:px-6 text-center">
          <Eyebrow colorClass="text-accent">Ready to Join?</Eyebrow>
          <h2
            className="font-[family-name:var(--font-display)] font-normal text-white mt-4 mx-auto"
            style={{ fontSize: "clamp(34px, 4vw, 58px)", lineHeight: 1.05, maxWidth: "620px" }}
          >
            Find the Right Group
            <br />
            <em className="italic text-white/60">For Where You Are</em>
          </h2>
          <p className="mt-6 text-[16px] font-light text-white/80 leading-relaxed max-w-[460px] mx-auto">
            <AutoLinkedTextClient>{"Our admissions team will assess your needs and place you in the group track that best supports your recovery goals."}</AutoLinkedTextClient>
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Button href="/admissions" variant="accent" size="lg">
              Start Admissions
            </Button>
            <Button href="tel:9494612620" variant="outline-white" size="lg">
              <i className="ri-phone-line mr-2" /> (949) 461-2620
            </Button>
          </div>
        </div>
      </section>

    </main>
  );
}
