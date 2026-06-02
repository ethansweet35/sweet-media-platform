"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useMemo, useState } from "react";
import {
  BOOKING_URL,
  CEILING,
  DAYS,
  MARKETS,
  REC_CONV,
  SIZES,
  TREATMENTS,
  WEEKS,
  computeBudgetModel,
  presetDefaults,
  type MarketKey,
  type Mode,
  type SizeKey,
  type TreatmentKey,
} from "@/lib/bhBudgetModel";
import { moneyR, num1, pct } from "@/lib/bhBudgetFormat";

const BhBudgetChart = dynamic(() => import("./BhBudgetChart"), {
  ssr: false,
  loading: () => (
    <div
      className="h-[230px] w-full animate-pulse rounded-lg bg-[#E2DDD2]/60"
      aria-hidden
    />
  ),
});

function StatRow({
  label,
  value,
  strong,
}: {
  label: string;
  value: string;
  strong?: boolean;
}) {
  return (
    <div
      className={`flex justify-between text-xs ${strong ? "[&>b]:text-[#3A7F8E] [&>b]:text-[13px]" : ""}`}
    >
      <span className="text-[#6B7178]">{label}</span>
      <b className="font-semibold text-[#14202E]">{value}</b>
    </div>
  );
}

function CadenceCol({
  label,
  clicks,
  leads,
}: {
  label: string;
  clicks: number;
  leads: number;
}) {
  return (
    <div className="flex flex-col gap-0.5">
      <div className="text-[10px] font-semibold uppercase tracking-[0.1em] text-[#C9A961]">
        {label}
      </div>
      <div className="text-sm font-medium text-[#14202E]">
        {num1(clicks)} <small className="text-[11px] font-normal text-[#6B7178]">clicks</small>
      </div>
      <div className="text-sm font-medium text-[#14202E]">
        {num1(leads)} <small className="text-[11px] font-normal text-[#6B7178]">leads</small>
      </div>
    </div>
  );
}

const selectClass =
  "w-full appearance-none rounded-md border border-[#E2DDD2] bg-white px-2.5 py-2.5 text-[13px] text-[#14202E] outline-none transition focus:border-[#3A7F8E] focus:ring-[3px] focus:ring-[#3A7F8E]/10 bg-[length:12px] bg-[right_10px_center] bg-no-repeat pr-8";
const selectChevron =
  "bg-[url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%236B7178' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E\")]";

export default function BhBudgetCalculator() {
  const [mode, setMode] = useState<Mode>("min");
  const [treatment, setTreatment] = useState<TreatmentKey>("detox");
  const [market, setMarket] = useState<MarketKey>("t1");
  const [size, setSize] = useState<SizeKey>("mid");
  const [budgetInput, setBudgetInput] = useState(15000);

  const p = useMemo(
    () => presetDefaults(treatment, market, size),
    [treatment, market, size],
  );
  const m = useMemo(() => computeBudgetModel(p), [p]);

  const tName = TREATMENTS[treatment].label;
  const kwUnitVol = Math.round(p.volume / 6);

  const f = m.funnel(m.recBudget);
  const narrative = [
    `At a ${MARKETS[market].label.split(" — ")[0]} CPC of ~${moneyR(m.cpc)}, a ${tName.toLowerCase()} campaign needs roughly ${moneyR(m.recBudget, 100)}/mo to be genuinely impactful in this market — not just "running."`,
    `That delivers ~${num1(f.clicks)} clicks, ~${num1(f.leads)} leads and ~${num1(f.vobs)} verified (VOB) opportunities per month — about ${moneyR(m.cpl, 5)} per lead and ${moneyR(m.cpvob, 25)} per verified lead.`,
    m.marketTooSmall
      ? `Heads-up: this market is small relative to the budget needed to optimize. You'd push past the ~${pct(CEILING)} impression-share ceiling where CPCs inflate without adding viable volume. Expanding geography or adding modalities beats overspending here.`
      : `At that level you'd capture ~${pct(f.isShare)} of available search demand — ${f.isShare < CEILING ? "comfortably under" : "near"} the ~${pct(CEILING)} impression-share ceiling where extra spend starts inflating CPCs rather than adding admits.`,
    `Bidding: ${m.biddingFor(m.recBudget)}. Start on Maximize Conversions, graduate to Target CPA once you clear ~${REC_CONV} leads/mo, and expect a 1–2 week learning phase — targets and budget stay untouched during it.`,
    `The binding constraint at the floor is ${m.floorBinding}. And before any of this serves: addiction-treatment ads require LegitScript certification — that lead time gets built into launch.`,
    `Cost per admit is the number that actually matters to your census — and it depends on your VOB-to-admit close rate and payer mix, which are specific to your facility. That's what we model with you directly on a strategy call.`,
  ];

  const ev = m.funnel(Math.max(0, budgetInput));
  let verdict: string;
  let vTone: "bad" | "warn" | "good";
  if (budgetInput < m.floorBudget) {
    verdict = "Underfunded";
    vTone = "bad";
  } else if (budgetInput < m.recBudget) {
    verdict = "Viable but lean";
    vTone = "warn";
  } else if (budgetInput <= m.ceilingBudget || m.marketTooSmall) {
    verdict = "Well-funded — impactful range";
    vTone = "good";
  } else {
    verdict = "Above efficient ceiling";
    vTone = "warn";
  }

  const verdictNotes: Record<string, string> = {
    Underfunded: `Below ~${moneyR(m.floorBudget, 100)}/mo, delivery is erratic and Smart Bidding can't gather enough signal to optimize. Results won't be a fair read on the channel.`,
    "Viable but lean": `The campaign can run, but you're under the ~${moneyR(m.recBudget, 100)}/mo impactful threshold. Expect modest volume and slower optimization — fine for a market test, not for scale.`,
    "Well-funded — impactful range":
      "You're in the productive range for this market — enough volume to optimize and to produce a clear, defensible result.",
    "Above efficient ceiling": `You're spending past the ~${pct(CEILING)} impression-share ceiling (~${moneyR(m.ceilingBudget, 100)}/mo). Extra dollars convert at sharply lower efficiency; expanding geography or modalities returns more than adding spend here.`,
  };

  const tiers = [
    {
      key: "floor",
      name: "Minimum Viable",
      tag: "Floor",
      B: m.floorBudget,
      blurb: "Least you can spend and still run a real, optimizable campaign.",
      hot: false,
    },
    {
      key: "rec",
      name: "Recommended",
      tag: "Impactful",
      B: m.recBudget,
      blurb: "Enough verified volume to optimize well and prove the channel.",
      hot: true,
    },
    {
      key: "scale",
      name: "Competitive",
      tag: "Scale",
      B: m.scaleBudget,
      blurb: "Pushes toward the efficient impression-share ceiling for this market.",
      hot: false,
    },
  ];

  const verdictBorder =
    vTone === "good"
      ? "border-l-[#3A7F8E]"
      : vTone === "warn"
        ? "border-l-[#C9A961]"
        : "border-l-[#B4541F]";

  return (
    <div className="w-full max-w-5xl mx-auto rounded-2xl bg-[#F7F5F0] text-[#14202E] p-5 md:p-7 shadow-[0_24px_80px_rgba(0,0,0,0.2)]">
      <header className="border-b border-[#E2DDD2] pb-5 mb-4">
        <div className="flex items-center gap-3 mb-3">
          <span className="font-[family-name:var(--font-cormorant-garamond)] text-xl font-semibold text-[#0A1F44]">
            Sweet Media
          </span>
          <span className="h-3.5 w-px bg-[#C9A961]" aria-hidden />
          <span className="text-[10.5px] uppercase tracking-[0.22em] text-[#6B7178]">
            Paid Search Intelligence
          </span>
        </div>
        <h2 className="font-[family-name:var(--font-cormorant-garamond)] text-3xl md:text-[38px] font-semibold leading-tight text-[#0A1F44] mb-2">
          What does it cost to fill beds with Google Ads?
        </h2>
        <p className="text-sm text-[#6B7178] max-w-2xl leading-relaxed">
          Minimum spend to be impactful, leads and verified (VOB) volume to expect, and where
          added budget stops paying off — modeled for your treatment type and market.
        </p>
      </header>

      <div className="flex flex-wrap gap-2 mb-4">
        <button
          type="button"
          onClick={() => setMode("min")}
          className={`inline-flex items-center gap-1.5 rounded-md border px-3.5 py-2 text-[13px] font-medium transition cursor-pointer ${
            mode === "min"
              ? "border-[#0A1F44] bg-[#0A1F44] text-white"
              : "border-[#E2DDD2] bg-white text-[#6B7178] hover:border-[#3A7F8E] hover:text-[#3A7F8E]"
          }`}
        >
          <i className="ri-calculator-line text-[15px]" aria-hidden />
          Find my minimum budget
        </button>
        <button
          type="button"
          onClick={() => setMode("eval")}
          className={`inline-flex items-center gap-1.5 rounded-md border px-3.5 py-2 text-[13px] font-medium transition cursor-pointer ${
            mode === "eval"
              ? "border-[#0A1F44] bg-[#0A1F44] text-white"
              : "border-[#E2DDD2] bg-white text-[#6B7178] hover:border-[#3A7F8E] hover:text-[#3A7F8E]"
          }`}
        >
          <i className="ri-focus-3-line text-[15px]" aria-hidden />
          Evaluate a budget I have in mind
        </button>
      </div>

      <section className="rounded-md border border-[#E2DDD2] bg-white p-4 md:p-5 mb-4">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <label className="mb-1.5 block text-[11px] font-medium uppercase tracking-wide text-[#6B7178]">
              Treatment type
            </label>
            <select
              className={`${selectClass} ${selectChevron}`}
              value={treatment}
              onChange={(e) => setTreatment(e.target.value as TreatmentKey)}
            >
              {(Object.entries(TREATMENTS) as [TreatmentKey, (typeof TREATMENTS)[TreatmentKey]][]).map(
                ([k, v]) => (
                  <option key={k} value={k}>
                    {v.label}
                  </option>
                ),
              )}
            </select>
          </div>
          <div>
            <label className="mb-1.5 block text-[11px] font-medium uppercase tracking-wide text-[#6B7178]">
              Market competitiveness
            </label>
            <select
              className={`${selectClass} ${selectChevron}`}
              value={market}
              onChange={(e) => setMarket(e.target.value as MarketKey)}
            >
              {(Object.entries(MARKETS) as [MarketKey, (typeof MARKETS)[MarketKey]][]).map(
                ([k, v]) => (
                  <option key={k} value={k}>
                    {v.label}
                  </option>
                ),
              )}
            </select>
            <span className="mt-1 block text-[10.5px] text-[#6B7178]/85">
              {MARKETS[market].hint}
            </span>
          </div>
          <div>
            <label className="mb-1.5 block text-[11px] font-medium uppercase tracking-wide text-[#6B7178]">
              Market size
            </label>
            <select
              className={`${selectClass} ${selectChevron}`}
              value={size}
              onChange={(e) => setSize(e.target.value as SizeKey)}
            >
              {(Object.entries(SIZES) as [SizeKey, (typeof SIZES)[SizeKey]][]).map(([k, v]) => (
                <option key={k} value={k}>
                  {v.label}
                </option>
              ))}
            </select>
            <span className="mt-1 block text-[10.5px] text-[#6B7178]/85">
              Drives available search demand
            </span>
          </div>
          {mode === "eval" && (
            <div>
              <label className="mb-1.5 block text-[11px] font-medium uppercase tracking-wide text-[#6B7178]">
                Monthly ad budget
              </label>
              <div className="relative">
                <span className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-[13px] text-[#6B7178]">
                  $
                </span>
                <input
                  type="number"
                  min={0}
                  step={500}
                  value={budgetInput}
                  onChange={(e) =>
                    setBudgetInput(Math.max(0, Number(e.target.value) || 0))
                  }
                  className={`${selectClass} pl-6 ${selectChevron}`}
                />
              </div>
            </div>
          )}
        </div>
        <div className="mt-4 grid gap-3 border-t border-[#E2DDD2] pt-3.5 sm:grid-cols-3">
          <div>
            <span className="text-[10px] uppercase tracking-wide text-[#6B7178]">
              Typical CPC
            </span>
            <b className="mt-0.5 block font-[family-name:var(--font-cormorant-garamond)] text-2xl font-semibold text-[#0A1F44]">
              {moneyR(m.cpc)}
            </b>
          </div>
          <div>
            <span className="text-[10px] uppercase tracking-wide text-[#6B7178]">
              Cost / lead
            </span>
            <b className="mt-0.5 block font-[family-name:var(--font-cormorant-garamond)] text-2xl font-semibold text-[#0A1F44]">
              {moneyR(m.cpl, 5)}
            </b>
          </div>
          <div>
            <span className="text-[10px] uppercase tracking-wide text-[#6B7178]">
              Cost / verified lead (VOB)
            </span>
            <b className="mt-0.5 block font-[family-name:var(--font-cormorant-garamond)] text-2xl font-semibold text-[#0A1F44]">
              {moneyR(m.cpvob, 25)}
            </b>
          </div>
        </div>
      </section>

      <div className="flex flex-col gap-4">
        {mode === "min" ? (
          <>
            <div className="grid gap-3.5 sm:grid-cols-3">
              {tiers.map((t) => {
                const ff = m.funnel(t.B);
                return (
                  <div
                    key={t.key}
                    className={`rounded-md border bg-white p-4 ${
                      t.hot
                        ? "border-[#3A7F8E] shadow-[0_6px_24px_-12px_rgba(58,127,142,0.5)]"
                        : "border-[#E2DDD2]"
                    }`}
                  >
                    <div
                      className={`text-[9.5px] font-semibold uppercase tracking-[0.16em] ${
                        t.hot ? "text-[#3A7F8E]" : "text-[#6B7178]"
                      }`}
                    >
                      {t.tag}
                    </div>
                    <div className="font-[family-name:var(--font-cormorant-garamond)] text-lg font-semibold text-[#0A1F44] mt-0.5">
                      {t.name}
                    </div>
                    <div className="font-[family-name:var(--font-cormorant-garamond)] text-[31px] font-semibold leading-none text-[#14202E]">
                      {moneyR(t.B, 100)}
                      <small className="text-[13px] font-normal text-[#6B7178]">/mo</small>
                    </div>
                    <div className="text-[11.5px] text-[#6B7178] mt-0.5">
                      {moneyR(t.B / DAYS, 5)}/day
                    </div>
                    <p className="text-[11.5px] text-[#6B7178] my-2 min-h-[46px] leading-snug">
                      {t.blurb}
                    </p>
                    <div className="flex flex-col gap-1.5 border-t border-[#E2DDD2] pt-2.5">
                      <StatRow label="Clicks / mo" value={num1(ff.clicks)} />
                      <StatRow label="Leads / mo" value={num1(ff.leads)} />
                      <StatRow label="Verified (VOB) / mo" value={num1(ff.vobs)} strong />
                      <StatRow label="Impr. share" value={pct(ff.isShare)} />
                    </div>
                  </div>
                );
              })}
            </div>
            {m.marketTooSmall && (
              <div className="flex gap-2 rounded-md border border-[#C9A961] bg-[#FBF6E9] p-3.5 text-[12.5px] leading-snug text-[#6b5a23]">
                <i className="ri-alert-line shrink-0 text-[#C9A961] text-base mt-0.5" aria-hidden />
                <span>
                  This market can&apos;t efficiently absorb the recommended budget — the
                  impression-share ceiling (~{moneyR(m.ceilingBudget, 100)}/mo) sits below it.
                  Expanding geography, adding modalities, or running national/telehealth returns
                  more than added spend.
                </span>
              </div>
            )}
          </>
        ) : (
          <>
            <div
              className={`rounded-md border border-[#E2DDD2] border-l-4 bg-white p-5 ${verdictBorder}`}
            >
              <div className="text-[10.5px] uppercase tracking-[0.12em] text-[#6B7178]">
                At {moneyR(budgetInput, 100)}/mo
              </div>
              <div className="font-[family-name:var(--font-cormorant-garamond)] text-[27px] font-semibold text-[#0A1F44] mt-0.5 mb-1.5">
                {verdict}
              </div>
              <p className="text-[13px] leading-relaxed mb-3">{verdictNotes[verdict]}</p>
              <div className="flex flex-wrap gap-4 border-t border-[#E2DDD2] pt-2.5 text-[11.5px] text-[#6B7178]">
                <span>Floor {moneyR(m.floorBudget, 100)}</span>
                <span>Recommended {moneyR(m.recBudget, 100)}</span>
                <span>Ceiling {moneyR(m.ceilingBudget, 100)}</span>
              </div>
            </div>

            <div className="rounded-md border border-[#E2DDD2] bg-white p-4 md:p-5 flex flex-col gap-2.5">
              {(
                [
                  ["Clicks", ev.clicks, m.cpc, 1, 100, "click"],
                  ["Leads", ev.leads, m.cpl, 5, 60, "lead"],
                  ["Verified (VOB)", ev.vobs, m.cpvob, 25, 36, "verified lead"],
                ] as const
              ).map(([k, val, cost, step, w, unit], i) => (
                <div key={k} className="flex items-center gap-3">
                  <div className="w-[70px] sm:w-24 shrink-0 text-xs font-medium text-[#6B7178]">
                    {k}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div
                      className="flex h-[30px] min-w-[54px] items-center rounded-md bg-gradient-to-r from-[#0A1F44] to-[#3A7F8E] px-3"
                      style={{ width: `${w}%`, opacity: 1 - i * 0.14 }}
                    >
                      <span className="text-[13px] font-semibold text-white">{num1(val)}</span>
                    </div>
                  </div>
                  <div className="w-[88px] sm:w-[118px] shrink-0 text-right text-[11.5px] text-[#6B7178]">
                    {moneyR(cost, step)} / {unit}
                  </div>
                </div>
              ))}
            </div>

            <div className="grid gap-3 rounded-md border border-[#E2DDD2] bg-white p-4 sm:grid-cols-2 lg:grid-cols-4">
              <CadenceCol label="Daily" clicks={ev.clicks / DAYS} leads={ev.leads / DAYS} />
              <CadenceCol label="Weekly" clicks={ev.clicks / WEEKS} leads={ev.leads / WEEKS} />
              <CadenceCol label="Monthly" clicks={ev.clicks} leads={ev.leads} />
              <div className="flex flex-col gap-0.5">
                <div className="text-[10px] font-semibold uppercase tracking-[0.1em] text-[#C9A961]">
                  Bidding
                </div>
                <div className="text-[12.5px] font-semibold leading-snug text-[#3A7F8E]">
                  {m.biddingFor(budgetInput).split(" — ")[0]}
                </div>
              </div>
            </div>
          </>
        )}

        <div className="rounded-md border border-[#E2DDD2] bg-white p-4">
          <div className="mb-2 flex flex-wrap items-center gap-2 text-[11.5px] font-semibold uppercase tracking-wide text-[#0A1F44]">
            <i className="ri-line-chart-line text-[#3A7F8E]" aria-hidden />
            <span>Budget → monthly volume</span>
            <span className="ml-auto flex items-center text-[11px] font-normal normal-case tracking-normal text-[#6B7178]">
              <i className="mr-1.5 ml-2.5 inline-block h-2 w-2 rounded-full bg-[#3A7F8E]" />
              Leads
              <i className="mr-1.5 ml-2.5 inline-block h-2 w-2 rounded-full bg-[#C9A961]" />
              Verified (VOB)
            </span>
          </div>
          <BhBudgetChart model={m} mode={mode} budgetInput={budgetInput} />
        </div>

        <div className="rounded-md border border-[#E2DDD2] bg-white p-5">
          <div className="mb-3 flex items-center gap-2 text-[11.5px] font-semibold uppercase tracking-wide text-[#0A1F44]">
            <i className="ri-pulse-line text-[#3A7F8E]" aria-hidden />
            <span>Strategy read-out</span>
          </div>
          {narrative.map((s, i) => (
            <p
              key={s}
              className={`text-[13.5px] leading-relaxed mb-2.5 last:mb-0 ${
                i === narrative.length - 1
                  ? "border-l-[3px] border-[#C9A961] pl-3 font-medium text-[#0A1F44]"
                  : "text-[#14202E]"
              }`}
            >
              {s}
            </p>
          ))}
        </div>

        <div className="rounded-md border border-[#E2DDD2] bg-white p-4 md:p-5 overflow-x-auto">
          <div className="mb-3 flex items-center gap-2 text-[11.5px] font-semibold uppercase tracking-wide text-[#0A1F44]">
            <i className="ri-information-line text-[#3A7F8E]" aria-hidden />
            <span>Representative keyword set — {tName}</span>
          </div>
          <table className="w-full min-w-[480px] border-collapse text-[12.5px]">
            <thead>
              <tr>
                <th className="border-b border-[#E2DDD2] px-2 py-1.5 text-left text-[10px] font-semibold uppercase tracking-wide text-[#6B7178]">
                  Keyword
                </th>
                <th className="border-b border-[#E2DDD2] px-2 py-1.5 text-right text-[10px] font-semibold uppercase tracking-wide text-[#6B7178]">
                  Est. CPC
                </th>
                <th className="border-b border-[#E2DDD2] px-2 py-1.5 text-right text-[10px] font-semibold uppercase tracking-wide text-[#6B7178]">
                  Est. vol/mo
                </th>
                <th className="border-b border-[#E2DDD2] px-2 py-1.5 text-right text-[10px] font-semibold uppercase tracking-wide text-[#6B7178]">
                  Est. cost/lead
                </th>
              </tr>
            </thead>
            <tbody>
              {TREATMENTS[treatment].keywords.map(([kw, mult]) => (
                <tr key={kw}>
                  <td className="border-b border-[#F7F5F0] px-2 py-1.5">{kw}</td>
                  <td className="border-b border-[#F7F5F0] px-2 py-1.5 text-right">
                    {moneyR(m.cpc * mult)}
                  </td>
                  <td className="border-b border-[#F7F5F0] px-2 py-1.5 text-right">
                    {Math.round(kwUnitVol * mult).toLocaleString("en-US")}
                  </td>
                  <td className="border-b border-[#F7F5F0] px-2 py-1.5 text-right">
                    {moneyR((m.cpc * mult) / p.clickToLead, 5)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="mt-2.5 text-[11px] italic leading-snug text-[#6B7178]">
            Representative terms with modeled estimates. For your exact market we pull live
            volume and CPC by keyword.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-5 rounded-md bg-[#0A1F44] p-6 md:p-7">
          <div className="min-w-[260px] flex-1">
            <h3 className="font-[family-name:var(--font-cormorant-garamond)] text-2xl font-semibold text-white leading-tight mb-2">
              See the number that actually moves your census.
            </h3>
            <p className="text-[13px] text-[#C7CEDD] leading-relaxed max-w-xl">
              This model stops at verified leads. Cost per admit — the metric that ties spend to
              filled beds — depends on your close rate and payer mix. Bring your historicals and
              we&apos;ll project it with you, then build the campaign to hit it.
            </p>
          </div>
          <Link
            href={BOOKING_URL}
            className="inline-flex shrink-0 items-center gap-2 rounded-md bg-[#C9A961] px-5 py-3 text-sm font-semibold text-[#2A2410] transition hover:bg-[#d8ba74] hover:-translate-y-px"
          >
            Book a strategy call
            <i className="ri-arrow-right-line text-base" aria-hidden />
          </Link>
        </div>

        <p className="px-1 text-[10.5px] leading-relaxed text-[#6B7178]">
          Estimates are built on 2025–2026 behavioral health paid-search benchmarks (WordStream /
          LocaliQ healthcare data, ForwardCare, Webserv treatment-center data) and Google Ads Smart
          Bidding guidance, refined against Sweet Media&apos;s campaign experience across behavioral
          health accounts. Planning figures only — actual results depend on creative, landing-page
          quality, payer mix, speed-to-lead, and LegitScript status. Not a guarantee of
          performance.
        </p>
      </div>
    </div>
  );
}
