"use client";

import { useMemo, useState } from "react";
import {
  groupBlocksByPeriod,
  SCHEDULE_DAYS,
  SCHEDULE_PERIOD_META,
  SCHEDULE_PERIOD_ORDER,
  type ScheduleBlock,
  type ScheduleDay,
  type SchedulePeriodId,
} from "@/data/dailySchedule";

const KIND_STYLES: Record<ScheduleBlock["kind"], { card: string; icon: string }> = {
  clinical: {
    card: "border-[var(--sr-moss)]/40 bg-[var(--sr-moss)]/5",
    icon: "text-[var(--sr-moss)]",
  },
  therapy: {
    card: "border-[var(--sr-fern)]/35 bg-[var(--sr-fern)]/5",
    icon: "text-[var(--sr-fern)]",
  },
  holistic: {
    card: "border-[var(--sr-sage)]/50 bg-[var(--sr-sage)]/10",
    icon: "text-[var(--sr-moss)]",
  },
  rest: {
    card: "border-[var(--sr-sand)] bg-[var(--sr-parchment)]",
    icon: "text-[var(--sr-muted)]",
  },
};

const PERIOD_HEADER: Record<SchedulePeriodId, string> = {
  morning: "bg-[var(--sr-parchment)]",
  afternoon: "bg-[var(--sr-linen)]",
  evening: "bg-[var(--sr-moss)]/8",
};

function ScheduleCard({ block }: { block: ScheduleBlock }) {
  const style = KIND_STYLES[block.kind];
  return (
    <article
      className={`flex flex-col border p-4 transition hover:shadow-sm ${style.card}`}
    >
      <div className="mb-2 flex items-center justify-between gap-2">
        <time
          className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--sr-fern)] tabular-nums"
          style={{ fontFamily: "var(--font-dm-sans)" }}
          dateTime={block.time}
        >
          {block.time}
        </time>
        <span className={`${style.icon}`}>
          <i className={`${block.icon} text-base`} aria-hidden />
        </span>
      </div>
      <h3
        className="mb-1 text-base font-light leading-snug text-[var(--sr-ink)]"
        style={{ fontFamily: "var(--font-cormorant)" }}
      >
        {block.title}
      </h3>
      <p
        className="line-clamp-2 text-[12px] leading-[1.55] text-[var(--sr-body)]"
        style={{ fontFamily: "var(--font-dm-sans)" }}
      >
        {block.description}
      </p>
    </article>
  );
}

function DayRhythmStrip({ blocks }: { blocks: ScheduleBlock[] }) {
  const grouped = groupBlocksByPeriod(blocks);
  const total = blocks.length;

  return (
    <div className="mb-10 overflow-hidden border border-[var(--sr-sand)] bg-[var(--sr-parchment)]">
      <div className="flex h-3 w-full">
        {SCHEDULE_PERIOD_ORDER.map((periodId) => {
          const count = grouped[periodId].length;
          if (count === 0) return null;
          const width = `${(count / total) * 100}%`;
          const colors: Record<SchedulePeriodId, string> = {
            morning: "bg-[var(--sr-sage)]",
            afternoon: "bg-[var(--sr-fern)]",
            evening: "bg-[var(--sr-moss)]",
          };
          return (
            <div
              key={periodId}
              className={`${colors[periodId]} h-full min-w-[12%]`}
              style={{ width }}
              title={`${SCHEDULE_PERIOD_META[periodId].label}: ${count} activities`}
            />
          );
        })}
      </div>
      <div className="grid grid-cols-3 divide-x divide-[var(--sr-sand)]">
        {SCHEDULE_PERIOD_ORDER.map((periodId) => (
          <div key={periodId} className="px-3 py-3 text-center md:px-4 md:py-4">
            <p
              className="text-[10px] font-semibold uppercase tracking-wider text-[var(--sr-ink)]"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              {SCHEDULE_PERIOD_META[periodId].label}
            </p>
            <p
              className="mt-0.5 text-[10px] text-[var(--sr-muted)]"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              {SCHEDULE_PERIOD_META[periodId].range}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function PeriodColumn({
  periodId,
  blocks,
}: {
  periodId: SchedulePeriodId;
  blocks: ScheduleBlock[];
}) {
  const meta = SCHEDULE_PERIOD_META[periodId];
  if (blocks.length === 0) return null;

  return (
    <div className="flex min-w-0 flex-col">
      <header
        className={`flex items-center gap-3 border-b border-[var(--sr-sand)] px-4 py-4 md:px-5 md:py-5 ${PERIOD_HEADER[periodId]} ${periodId === "evening" ? "[&_h3]:text-[var(--sr-ink)]" : ""}`}
      >
        <span
          className={`flex h-9 w-9 shrink-0 items-center justify-center ${
            periodId === "evening"
              ? "bg-[var(--sr-moss)] text-[var(--sr-sage)]"
              : "bg-[var(--sr-moss)]/10 text-[var(--sr-moss)]"
          }`}
        >
          <i className={`${meta.icon} text-lg`} aria-hidden />
        </span>
        <div>
          <h3
            className="text-lg font-light text-[var(--sr-ink)]"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            {meta.label}
          </h3>
          <p
            className="text-[10px] uppercase tracking-wider text-[var(--sr-muted)]"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            {meta.range}
          </p>
        </div>
      </header>
      <ul className="flex flex-1 flex-col gap-2 p-3 md:gap-2.5 md:p-4">
        {blocks.map((block) => (
          <li key={block.time}>
            <ScheduleCard block={block} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function DailyScheduleTimeline() {
  const [active, setActive] = useState<ScheduleDay["id"]>("residential");
  const day = SCHEDULE_DAYS.find((d) => d.id === active)!;

  const grouped = useMemo(
    () => groupBlocksByPeriod(day.blocks),
    [day.blocks]
  );

  return (
    <section id="schedule" className="scroll-mt-28 bg-[var(--sr-linen)] py-14 md:py-20">
      <div className="sr-container">
        <div className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl">
            <p className="sr-eyebrow mb-4">Sample day</p>
            <h2
              className="text-[clamp(1.75rem,4vw,2.5rem)] font-light leading-[1.08] text-[var(--sr-ink)]"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              Your day at a glance
            </h2>
            <p
              className="mt-3 text-[15px] leading-[1.75] text-[var(--sr-body)]"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              {day.summary}
            </p>
          </div>
          <div
            className="inline-flex shrink-0 border border-[var(--sr-sand)] bg-[var(--sr-parchment)] p-1"
            role="tablist"
            aria-label="Schedule type"
          >
            {SCHEDULE_DAYS.map((d) => (
              <button
                key={d.id}
                type="button"
                role="tab"
                aria-selected={active === d.id}
                onClick={() => setActive(d.id)}
                className={`px-5 py-2.5 text-[11px] font-semibold uppercase tracking-wider transition ${
                  active === d.id
                    ? "bg-[var(--sr-moss)] text-white"
                    : "text-[var(--sr-muted)] hover:text-[var(--sr-ink)]"
                }`}
                style={{ fontFamily: "var(--font-dm-sans)" }}
              >
                {d.label}
              </button>
            ))}
          </div>
        </div>

        <DayRhythmStrip blocks={day.blocks} />

        <div className="mb-4 flex flex-wrap gap-x-5 gap-y-2 text-[10px] font-semibold uppercase tracking-wider text-[var(--sr-muted)]">
          <span className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[var(--sr-moss)]" aria-hidden /> Clinical
          </span>
          <span className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[var(--sr-fern)]" aria-hidden /> Therapy
          </span>
          <span className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[var(--sr-sage)]" aria-hidden /> Holistic
          </span>
          <span className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[var(--sr-sand)]" aria-hidden /> Rest & meals
          </span>
        </div>

        {/* Desktop: three-column day; mobile: stacked period bands */}
        <div className="overflow-hidden border border-[var(--sr-sand)] bg-[var(--sr-parchment)]">
          <div className="grid grid-cols-1 divide-y divide-[var(--sr-sand)] lg:grid-cols-3 lg:divide-x lg:divide-y-0">
            {SCHEDULE_PERIOD_ORDER.map((periodId) => (
              <PeriodColumn
                key={`${day.id}-${periodId}`}
                periodId={periodId}
                blocks={grouped[periodId]}
              />
            ))}
          </div>
        </div>

        <p
          className="mt-8 text-center text-[13px] leading-[1.65] text-[var(--sr-muted)]"
          style={{ fontFamily: "var(--font-dm-sans)" }}
        >
          Times are approximate — your clinician adjusts blocks based on clinical needs and weekly
          programming.
        </p>
      </div>
    </section>
  );
}
