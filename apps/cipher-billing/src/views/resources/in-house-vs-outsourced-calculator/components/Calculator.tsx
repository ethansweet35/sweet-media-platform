"use client";

import { useState, useRef, useEffect } from "react";
import EmailReportModal from "./EmailReportModal";

// ─── Formatting ───────────────────────────────────────────────────────────────

function usd(n: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);
}

// ─── Count-up animation hook ──────────────────────────────────────────────────

function useCountUp(target: number, durationMs = 400): number {
  const [value, setValue] = useState(target);
  const prevRef = useRef(target);

  useEffect(() => {
    const start = prevRef.current;
    const end = target;
    if (Math.abs(end - start) < 1) {
      setValue(end);
      prevRef.current = end;
      return;
    }
    let rafId: number;
    const t0 = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - t0) / durationMs, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(start + (end - start) * eased));
      if (progress < 1) {
        rafId = requestAnimationFrame(tick);
      } else {
        prevRef.current = end;
      }
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [target, durationMs]);

  return value;
}

// ─── Input atoms ──────────────────────────────────────────────────────────────

const labelCls =
  "block text-[10px] font-semibold uppercase tracking-[0.18em] text-[#5a6570]";
const inputCls =
  "w-full rounded border border-[#166C96]/30 bg-white px-3 py-2.5 text-sm text-[#0D1833] outline-none focus:border-[#166C96] focus:ring-1 focus:ring-[#166C96]/20 placeholder:text-[#8a9299]/60";

function FieldLabel({ htmlFor, children }: { htmlFor: string; children: React.ReactNode }) {
  return <label htmlFor={htmlFor} className={labelCls}>{children}</label>;
}

/** Currency text input with $ prefix, comma-formatted display, raw editing on focus. */
function CurrencyField({
  id,
  label,
  value,
  onChange,
  min = 0,
}: {
  id: string;
  label: string;
  value: number;
  onChange: (v: number) => void;
  min?: number;
}) {
  const [focused, setFocused] = useState(false);
  const [raw, setRaw] = useState("");

  function handleFocus() {
    setFocused(true);
    setRaw(value === 0 ? "" : String(value));
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const digits = e.target.value.replace(/[^0-9]/g, "");
    setRaw(digits);
    const n = parseInt(digits, 10);
    onChange(isNaN(n) ? 0 : Math.max(min, n));
  }

  function handleBlur() {
    setFocused(false);
    const n = parseInt(raw.replace(/[^0-9]/g, ""), 10);
    onChange(isNaN(n) ? 0 : Math.max(min, n));
  }

  const displayed = focused
    ? raw
    : value === 0
    ? ""
    : value.toLocaleString("en-US");

  return (
    <div className="grid gap-1.5">
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <div className="relative">
        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-[#8a9299]">$</span>
        <input
          id={id}
          type="text"
          inputMode="numeric"
          value={displayed}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder="0"
          className={`${inputCls} pl-7`}
        />
      </div>
    </div>
  );
}

/** Plain number input (claim volume, days, staff count). */
function NumberField({
  id,
  label,
  value,
  onChange,
  min = 0,
  step = 1,
}: {
  id: string;
  label: string;
  value: number;
  onChange: (v: number) => void;
  min?: number;
  step?: number;
}) {
  return (
    <div className="grid gap-1.5">
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <input
        id={id}
        type="number"
        min={min}
        step={step}
        value={value || ""}
        onChange={(e) => onChange(Math.max(min, Number(e.target.value) || 0))}
        placeholder="0"
        className={inputCls}
      />
    </div>
  );
}

/** Labeled slider with a live badge showing current value. */
function SliderField({
  id,
  label,
  value,
  min,
  max,
  step = 1,
  onChange,
  format = (v: number) => `${v}%`,
}: {
  id: string;
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (v: number) => void;
  format?: (v: number) => string;
}) {
  return (
    <div className="grid gap-2">
      <div className="flex items-center justify-between gap-3">
        <FieldLabel htmlFor={id}>{label}</FieldLabel>
        <span className="shrink-0 rounded bg-[#166C96]/10 px-2 py-0.5 text-[11px] font-semibold tabular-nums text-[#166C96]">
          {format(value)}
        </span>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        aria-valuenow={value}
        aria-valuemin={min}
        aria-valuemax={max}
        className="w-full cursor-pointer"
        style={{ accentColor: "#166C96" }}
      />
      <div className="flex justify-between text-[10px] text-[#8a9299]">
        <span>{format(min)}</span>
        <span>{format(max)}</span>
      </div>
    </div>
  );
}

/** Collapsible input section. */
function SectionPanel({
  letter,
  title,
  open,
  onToggle,
  children,
}: {
  letter: string;
  title: string;
  open: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-lg border border-[#e2e8f0] bg-white">
      <button
        type="button"
        className="flex w-full items-center justify-between px-5 py-4 text-left"
        onClick={onToggle}
        aria-expanded={open}
      >
        <div className="flex items-center gap-3">
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded bg-[#166C96]/10 text-[10px] font-bold text-[#166C96]">
            {letter}
          </span>
          <span className="text-[11.5px] font-semibold uppercase tracking-[0.12em] text-[#0D1833]">
            {title}
          </span>
        </div>
        <i
          className={`ri-arrow-down-s-line text-lg text-[#166C96] transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      {open && (
        <div className="grid gap-5 border-t border-[#f1f5f9] px-5 pb-5 pt-4">
          {children}
        </div>
      )}
    </div>
  );
}

// ─── Result breakdown rows ────────────────────────────────────────────────────

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-3">
      <span className="text-xs leading-snug text-[#4a5565]">{label}</span>
      <span className="shrink-0 text-xs font-medium tabular-nums text-[#0D1833]">{value}</span>
    </div>
  );
}

function RowDark({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-3">
      <span className="text-xs leading-snug text-white/55">{label}</span>
      <span className="shrink-0 text-xs font-medium tabular-nums text-white/90">{value}</span>
    </div>
  );
}

function MiniStats({
  costPerClaim,
  pctOfCollections,
  dark,
}: {
  costPerClaim: number;
  pctOfCollections: number;
  dark?: boolean;
}) {
  const textMain = dark ? "text-white" : "text-[#0D1833]";
  const textMuted = dark ? "text-white/50" : "text-[#8a9299]";
  const divider = dark ? "bg-white/15" : "bg-[#e2e8f0]";
  return (
    <div className={`flex items-center gap-4 border-t ${dark ? "border-white/10" : "border-[#f1f5f9]"} pt-3`}>
      <div>
        <p className={`text-[9.5px] font-semibold uppercase tracking-[0.15em] ${textMuted}`}>Cost / Claim</p>
        <p className={`text-sm font-semibold tabular-nums ${textMain}`}>{usd(costPerClaim)}</p>
      </div>
      <div className={`h-6 w-px ${divider}`} />
      <div>
        <p className={`text-[9.5px] font-semibold uppercase tracking-[0.15em] ${textMuted}`}>% of Collections</p>
        <p className={`text-sm font-semibold tabular-nums ${textMain}`}>{pctOfCollections.toFixed(1)}%</p>
      </div>
    </div>
  );
}

// ─── Results panel ────────────────────────────────────────────────────────────

interface ResultsProps {
  isValid: boolean;
  animInHouse: number;
  animOutsourced: number;
  animSavings: number;
  totalSalaryCost: number;
  annualSoftware: number;
  annualOverhead: number;
  denialDollarImpact: number;
  arOpportunityCost: number;
  inHouseCostPerClaim: number;
  inHousePercentOfCollections: number;
  cipherServiceFee: number;
  cipherDenialImpact: number;
  cipherAROpportunityCost: number;
  outsourcedCostPerClaim: number;
  outsourcedPercentOfCollections: number;
  annualSavings: number;
  threeYearSavings: number;
  isComparable: boolean;
  onEmailReport: () => void;
}

function ResultsPanel(p: ResultsProps) {
  if (!p.isValid) {
    return (
      <div className="flex items-center justify-center rounded-lg border border-[#e2e8f0] bg-white px-6 py-10 text-center text-sm text-[#8a9299]">
        Enter your inputs on the left to see the comparison.
      </div>
    );
  }

  const deltaColor = p.isComparable
    ? "bg-[#64748b]"
    : p.annualSavings > 0
    ? "bg-[#166C96]"
    : "bg-[#334155]";

  const deltaLabel = p.isComparable
    ? "Comparable Costs"
    : p.annualSavings > 0
    ? "Estimated Annual Savings"
    : "In-House Advantage";

  const deltaNote = p.isComparable
    ? "Both approaches are within 5% of each other. Your decision may hinge on control, staff capacity, or compliance risk tolerance."
    : p.annualSavings > 0
    ? `3-year projection: ${usd(Math.abs(p.threeYearSavings))} in cumulative savings`
    : `In-house costs ${usd(Math.abs(p.annualSavings))} less per year with your current setup`;

  return (
    <div className="grid gap-3" aria-live="polite" aria-label="Calculator results">
      {/* Card 1: In-House */}
      <div className="rounded-lg border border-[#e2e8f0] bg-white p-5">
        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#8a9299]">
          In-House True Cost (Annual)
        </p>
        <p className="mt-2 font-[var(--font-heading)] text-[2rem] leading-none tabular-nums text-[#0D1833]">
          {usd(p.animInHouse)}
        </p>
        <div className="mt-3 grid gap-2 border-t border-[#f1f5f9] pt-3">
          <Row label="Salaries + benefits" value={usd(p.totalSalaryCost)} />
          <Row label="Software + clearinghouse" value={usd(p.annualSoftware)} />
          <Row label="Office overhead" value={usd(p.annualOverhead)} />
          <Row label="Unrecovered denial revenue" value={usd(p.denialDollarImpact)} />
          <Row label="A/R aging opportunity cost" value={usd(p.arOpportunityCost)} />
        </div>
        <MiniStats costPerClaim={p.inHouseCostPerClaim} pctOfCollections={p.inHousePercentOfCollections} />
      </div>

      {/* Card 2: Outsourced */}
      <div className="rounded-lg bg-[#0D1833] p-5">
        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#AAB3B9]/60">
          With Cipher — Estimated Annual Cost
        </p>
        <p className="mt-2 font-[var(--font-heading)] text-[2rem] leading-none tabular-nums text-white">
          {usd(p.animOutsourced)}
        </p>
        <div className="mt-3 grid gap-2 border-t border-white/10 pt-3">
          <RowDark label="Service fee (6.5% of collections)" value={usd(p.cipherServiceFee)} />
          <RowDark label="Denial impact at 4% rate" value={usd(p.cipherDenialImpact)} />
          <RowDark label="A/R aging cost at 30-day avg" value={usd(p.cipherAROpportunityCost)} />
        </div>
        <MiniStats
          costPerClaim={p.outsourcedCostPerClaim}
          pctOfCollections={p.outsourcedPercentOfCollections}
          dark
        />
      </div>

      {/* Card 3: Delta */}
      <div className={`rounded-lg p-5 ${deltaColor}`}>
        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/65">
          {deltaLabel}
        </p>
        <p className="mt-2 font-[var(--font-heading)] text-[2rem] leading-none tabular-nums text-white">
          {usd(p.animSavings)}
        </p>
        <p className="mt-2 text-[11.5px] leading-relaxed text-white/65">{deltaNote}</p>
      </div>

      {/* CTA */}
      <a
        href="/contact-us?source=cost-calculator"
        className="flex items-center justify-center gap-2 rounded-lg bg-[#050a14] px-4 py-3.5 text-[11px] font-bold uppercase tracking-[0.16em] text-white transition hover:bg-black"
      >
        Schedule a Free Revenue Audit <i className="ri-arrow-right-line" />
      </a>

      <p className="text-center text-[11px] leading-relaxed text-[#8a9299]">
        Based on industry averages.{" "}
        <button
          type="button"
          onClick={p.onEmailReport}
          className="font-semibold text-[#166C96] underline-offset-2 hover:underline"
        >
          Email me this report
        </button>{" "}
        for a saved copy.
      </p>
    </div>
  );
}

// ─── Main Calculator export ───────────────────────────────────────────────────

export default function Calculator() {
  // Section open state
  const [secA, setSecA] = useState(true);
  const [secB, setSecB] = useState(true);
  const [secC, setSecC] = useState(true);

  // Section A — Volume & Revenue
  const [monthlyClaimVolume, setMonthlyClaimVolume] = useState(200);
  const [avgClaimValue, setAvgClaimValue] = useState(1200);
  const [currentDenialRate, setCurrentDenialRate] = useState(12);
  const [daysInAR, setDaysInAR] = useState(55);

  // Section B — In-House Team Costs
  const [numBillers, setNumBillers] = useState(2);
  const [avgSalary, setAvgSalary] = useState(58000);
  const [benefitsLoad, setBenefitsLoad] = useState(28);
  const [managerMode, setManagerMode] = useState<"full" | "percent">("percent");
  const [managerSalary, setManagerSalary] = useState(80000);
  const [managerPercent, setManagerPercent] = useState(25);

  // Section C — Technology & Overhead
  const [billingSoftwareMonthly, setBillingSoftwareMonthly] = useState(800);
  const [clearinghouseFeesMonthly, setClearinghouseFeesMonthly] = useState(300);
  const [overheadPerBiller, setOverheadPerBiller] = useState(4800);

  const [modalOpen, setModalOpen] = useState(false);

  const resultsRef = useRef<HTMLDivElement>(null);

  // ─── Math (exactly per spec) ───────────────────────────────────────────────

  const annualClaims = monthlyClaimVolume * 12;
  const annualRevenue = annualClaims * avgClaimValue;

  const fullyLoadedSalaryPerBiller = avgSalary * (1 + benefitsLoad / 100);
  const managerCost =
    managerSalary *
    (1 + benefitsLoad / 100) *
    (managerMode === "full" ? 1 : managerPercent / 100);
  const totalSalaryCost = fullyLoadedSalaryPerBiller * numBillers + managerCost;

  const annualSoftware = (billingSoftwareMonthly + clearinghouseFeesMonthly) * 12;
  const annualOverhead = overheadPerBiller * numBillers;

  const denialDollarImpact =
    annualClaims * (currentDenialRate / 100) * avgClaimValue * 0.4;
  const arOpportunityCost = annualRevenue * (daysInAR / 365) * 0.08;

  const inHouseTotalCost =
    totalSalaryCost + annualSoftware + annualOverhead + denialDollarImpact + arOpportunityCost;

  const inHouseCostPerClaim = annualClaims > 0 ? inHouseTotalCost / annualClaims : 0;
  const inHousePercentOfCollections =
    annualRevenue > 0 ? (inHouseTotalCost / annualRevenue) * 100 : 0;

  const cipherFeeRate = 0.065;
  const cipherServiceFee = annualRevenue * cipherFeeRate;
  const cipherDenialRate = 0.04;
  const cipherDenialImpact = annualClaims * cipherDenialRate * avgClaimValue * 0.4;
  const cipherARDays = 30;
  const cipherAROpportunityCost = annualRevenue * (cipherARDays / 365) * 0.08;

  const outsourcedTotalCost =
    cipherServiceFee + cipherDenialImpact + cipherAROpportunityCost;

  const outsourcedCostPerClaim =
    annualClaims > 0 ? outsourcedTotalCost / annualClaims : 0;
  const outsourcedPercentOfCollections =
    annualRevenue > 0 ? (outsourcedTotalCost / annualRevenue) * 100 : 0;

  const annualSavings = inHouseTotalCost - outsourcedTotalCost;
  const threeYearSavings = annualSavings * 3;

  const isComparable =
    inHouseTotalCost > 0 &&
    Math.abs(annualSavings) / inHouseTotalCost < 0.05;

  const isValid = annualClaims > 0 && annualRevenue > 0;

  // Animated big-number values (only the headline figures, not breakdown)
  const animInHouse = useCountUp(Math.round(inHouseTotalCost));
  const animOutsourced = useCountUp(Math.round(outsourcedTotalCost));
  const animSavings = useCountUp(Math.round(Math.abs(annualSavings)));

  const currentInputs = {
    monthlyClaimVolume,
    avgClaimValue,
    currentDenialRate,
    daysInAR,
    numBillers,
    avgSalary,
    benefitsLoad,
    managerMode,
    managerSalary,
    managerPercent,
    billingSoftwareMonthly,
    clearinghouseFeesMonthly,
    overheadPerBiller,
    inHouseTotalCost,
    outsourcedTotalCost,
    annualSavings,
  };

  const sharedResultsProps: ResultsProps = {
    isValid,
    animInHouse,
    animOutsourced,
    animSavings,
    totalSalaryCost,
    annualSoftware,
    annualOverhead,
    denialDollarImpact,
    arOpportunityCost,
    inHouseCostPerClaim,
    inHousePercentOfCollections,
    cipherServiceFee,
    cipherDenialImpact,
    cipherAROpportunityCost,
    outsourcedCostPerClaim,
    outsourcedPercentOfCollections,
    annualSavings,
    threeYearSavings,
    isComparable,
    onEmailReport: () => setModalOpen(true),
  };

  return (
    <>
      {/* Validation notice */}
      {!isValid && (
        <div className="mb-5 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          Enter a claim volume greater than 0 to see results.
        </div>
      )}

      <div className="grid gap-8 lg:grid-cols-[1fr_400px] xl:grid-cols-[1fr_440px]">
        {/* ── Inputs ──────────────────────────────────────────────────── */}
        <div className="grid gap-4">
          {/* Section A */}
          <SectionPanel
            letter="A"
            title="Volume & Revenue"
            open={secA}
            onToggle={() => setSecA((v) => !v)}
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <NumberField
                id="monthly-claim-volume"
                label="Monthly Claim Volume"
                value={monthlyClaimVolume}
                onChange={setMonthlyClaimVolume}
                min={1}
                step={10}
              />
              <CurrencyField
                id="avg-claim-value"
                label="Average Claim Value"
                value={avgClaimValue}
                onChange={setAvgClaimValue}
                min={1}
              />
            </div>
            <SliderField
              id="denial-rate"
              label="Current Denial Rate"
              value={currentDenialRate}
              min={0}
              max={30}
              step={0.5}
              onChange={setCurrentDenialRate}
            />
            <NumberField
              id="days-in-ar"
              label="Days in A/R"
              value={daysInAR}
              onChange={setDaysInAR}
              min={1}
              step={1}
            />
          </SectionPanel>

          {/* Section B */}
          <SectionPanel
            letter="B"
            title="In-House Team Costs"
            open={secB}
            onToggle={() => setSecB((v) => !v)}
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <NumberField
                id="num-billers"
                label="Number of Billing Staff"
                value={numBillers}
                onChange={setNumBillers}
                min={1}
                step={1}
              />
              <CurrencyField
                id="avg-salary"
                label="Avg. Annual Salary / Biller"
                value={avgSalary}
                onChange={setAvgSalary}
                min={20000}
              />
            </div>
            <SliderField
              id="benefits-load"
              label="Benefits & Payroll Tax Load"
              value={benefitsLoad}
              min={20}
              max={40}
              step={1}
              onChange={setBenefitsLoad}
            />

            {/* Manager allocation */}
            <div className="rounded-md bg-[#F5F7FA] p-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className={labelCls}>Manager / Supervisor Allocation</span>
                <div className="flex overflow-hidden rounded border border-[#166C96]/30">
                  {(["percent", "full"] as const).map((mode) => (
                    <button
                      key={mode}
                      type="button"
                      onClick={() => setManagerMode(mode)}
                      className={`px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wide transition-colors ${
                        managerMode === mode
                          ? "bg-[#166C96] text-white"
                          : "bg-white text-[#5a6570] hover:bg-[#166C96]/10"
                      }`}
                    >
                      {mode === "percent" ? "% of Time" : "Full Salary"}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-3 grid gap-4 sm:grid-cols-2">
                <CurrencyField
                  id="manager-salary"
                  label="Manager Annual Salary"
                  value={managerSalary}
                  onChange={setManagerSalary}
                  min={0}
                />
                {managerMode === "percent" && (
                  <SliderField
                    id="manager-percent"
                    label="% Time on Billing"
                    value={managerPercent}
                    min={5}
                    max={100}
                    step={5}
                    onChange={setManagerPercent}
                  />
                )}
              </div>

              <p className="mt-2 text-[10.5px] text-[#8a9299]">
                Allocated cost:{" "}
                <strong className="font-semibold text-[#4a5565]">
                  {usd(managerCost)}
                </strong>{" "}
                / yr
                {managerMode === "full" ? " (full-time)" : ` (${managerPercent}% allocation)`}
              </p>
            </div>
          </SectionPanel>

          {/* Section C */}
          <SectionPanel
            letter="C"
            title="Technology & Overhead"
            open={secC}
            onToggle={() => setSecC((v) => !v)}
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <CurrencyField
                id="software-monthly"
                label="Billing / EMR Software (Monthly)"
                value={billingSoftwareMonthly}
                onChange={setBillingSoftwareMonthly}
                min={0}
              />
              <CurrencyField
                id="clearinghouse-monthly"
                label="Clearinghouse Fees (Monthly)"
                value={clearinghouseFeesMonthly}
                onChange={setClearinghouseFeesMonthly}
                min={0}
              />
            </div>
            <CurrencyField
              id="overhead-per-biller"
              label="Office Overhead per Biller (Annual)"
              value={overheadPerBiller}
              onChange={setOverheadPerBiller}
              min={0}
            />
          </SectionPanel>
        </div>

        {/* ── Results — desktop sticky ─────────────────────────────────── */}
        <div ref={resultsRef} className="hidden lg:block">
          <div className="sticky top-24">
            <ResultsPanel {...sharedResultsProps} />
          </div>
        </div>
      </div>

      {/* ── Results — mobile inline (below inputs) ───────────────────── */}
      <div className="mt-6 lg:hidden">
        <ResultsPanel {...sharedResultsProps} />
      </div>

      {/* ── Mobile sticky bottom bar ─────────────────────────────────── */}
      {isValid && (
        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-[#0D1833] px-4 py-3 lg:hidden">
          <div className="mx-auto flex max-w-lg items-center justify-between gap-4">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/50">
                {annualSavings > 0
                  ? "Est. Annual Savings"
                  : annualSavings < 0
                  ? "In-House Advantage"
                  : "Comparable Costs"}
              </p>
              <p className="font-[var(--font-heading)] text-xl tabular-nums text-white">
                {usd(Math.abs(annualSavings))}
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              className="shrink-0 rounded bg-[#166C96] px-4 py-2.5 text-[11px] font-bold uppercase tracking-[0.14em] text-white transition hover:bg-[#145a82]"
            >
              View Full Results
            </button>
          </div>
        </div>
      )}

      {/* ── Email modal ──────────────────────────────────────────────── */}
      <EmailReportModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        inputs={currentInputs}
      />
    </>
  );
}
