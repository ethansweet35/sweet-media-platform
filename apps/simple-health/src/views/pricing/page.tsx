import { AutoLinkedText } from "@sweetmedia/blog-core";
// No interactivity needed — pure price list

type PriceItem = { name: string; price: string };
type PriceGroup = { category: string; title: string; items: PriceItem[] };

const SCHEDULE_CTA = "https://secure.gethealthie.com/appointments/embed_appt?dietitian_id=13219022";

const groups: PriceGroup[] = [
  // ── Weight Loss Injectable ──────────────────────────────────────────
  { category: "Weight Loss Injectable", title: "Semaglutide 2.5 mg/mL", items: [
    { name: "Semaglutide 2.5 mg/mL — 1 mL", price: "$270" },
    { name: "Semaglutide 2.5 mg/mL — 2 mL", price: "$330" },
    { name: "Semaglutide 2.5 mg/mL — 3 mL", price: "$365" },
    { name: "Semaglutide 2.5 mg/mL — 4 mL", price: "$380" },
    { name: "Semaglutide 2.5 mg/mL — 5 mL", price: "$460" },
  ]},
  { category: "Weight Loss Injectable", title: "Semaglutide 2.5 mg/mL + B12", items: [
    { name: "Sema 2.5 + B12 — 1 mL", price: "$270" },
    { name: "Sema 2.5 + B12 — 2 mL", price: "$330" },
    { name: "Sema 2.5 + B12 — 3 mL", price: "$365" },
    { name: "Sema 2.5 + B12 — 4 mL", price: "$380" },
  ]},
  { category: "Weight Loss Injectable", title: "Semaglutide 2.5 mg/mL + Glycine", items: [
    { name: "Sema 2.5 + Glycine — 1 mL", price: "$270" },
    { name: "Sema 2.5 + Glycine — 2 mL", price: "$330" },
    { name: "Sema 2.5 + Glycine — 3 mL", price: "$365" },
    { name: "Sema 2.5 + Glycine — 4 mL", price: "$380" },
  ]},
  { category: "Weight Loss Injectable", title: "Semaglutide 5 mg/mL", items: [
    { name: "Semaglutide 5 mg/mL — 1 mL", price: "$330" },
    { name: "Semaglutide 5 mg/mL — 2 mL", price: "$380" },
    { name: "Semaglutide 5 mg/mL — 3 mL", price: "$490" },
    { name: "Semaglutide 5 mg/mL — 4 mL", price: "$550" },
    { name: "Semaglutide 5 mg/mL — 5 mL", price: "$660" },
  ]},
  { category: "Weight Loss Injectable", title: "Semaglutide 5 mg/mL + B12", items: [
    { name: "Sema 5 + B12 — 1 mL", price: "$330" },
    { name: "Sema 5 + B12 — 2 mL", price: "$380" },
    { name: "Sema 5 + B12 — 3 mL", price: "$490" },
    { name: "Sema 5 + B12 — 4 mL", price: "$550" },
    { name: "Sema 5 + B12 — 5 mL", price: "$660" },
  ]},
  { category: "Weight Loss Injectable", title: "Semaglutide 5 mg/mL + Glycine", items: [
    { name: "Sema 5 + Glycine — 1 mL", price: "$330" },
    { name: "Sema 5 + Glycine — 2 mL", price: "$380" },
    { name: "Sema 5 + Glycine — 3 mL", price: "$490" },
    { name: "Sema 5 + Glycine — 4 mL", price: "$550" },
    { name: "Sema 5 + Glycine — 5 mL", price: "$660" },
  ]},
  { category: "Weight Loss Injectable", title: "Tirzepatide 10 mg/mL", items: [
    { name: "Tirzepatide 10 mg/mL — 1 mL", price: "$345" },
    { name: "Tirzepatide 10 mg/mL — 2 mL", price: "$370" },
    { name: "Tirzepatide 10 mg/mL — 2.5 mL", price: "$385" },
    { name: "Tirzepatide 10 mg/mL — 3 mL", price: "$380" },
    { name: "Tirzepatide 10 mg/mL — 4 mL", price: "$475" },
    { name: "Tirzepatide 10 mg/mL — 5 mL", price: "$525" },
    { name: "Tirzepatide 10 mg/mL — 6 mL", price: "$550" },
  ]},
  { category: "Weight Loss Injectable", title: "Tirzepatide 10 mg/mL + B12", items: [
    { name: "Tirz 10 + B12 — 1 mL", price: "$345" },
    { name: "Tirz 10 + B12 — 2 mL", price: "$370" },
  ]},
  { category: "Weight Loss Injectable", title: "Tirzepatide 10 mg/mL + Glycine", items: [
    { name: "Tirz 10 + Glycine — 1 mL", price: "$345" },
    { name: "Tirz 10 + Glycine — 2 mL", price: "$370" },
  ]},
  { category: "Weight Loss Injectable", title: "Tirzepatide 20 mg/mL", items: [
    { name: "Tirzepatide 20 mg/mL — 1 mL", price: "$340" },
    { name: "Tirzepatide 20 mg/mL — 2 mL", price: "$470" },
    { name: "Tirzepatide 20 mg/mL — 3 mL", price: "$550" },
  ]},
  { category: "Weight Loss Injectable", title: "Tirzepatide 20 mg/mL + B12 / Glycine", items: [
    { name: "Tirz 20 + B12/Glycine — 1.5 mL", price: "$380" },
    { name: "Tirz 20 + B12/Glycine — 2 mL", price: "$475" },
    { name: "Tirz 20 + B12/Glycine — 2.5 mL", price: "$480" },
    { name: "Tirz 20 + B12/Glycine — 3 mL", price: "$550" },
  ]},
  { category: "Weight Loss Injectable", title: "Tirzepatide 30 mg/mL", items: [
    { name: "Tirzepatide 30 mg/mL — 1 mL", price: "$380" },
    { name: "Tirzepatide 30 mg/mL — 2 mL", price: "$550" },
    { name: "Tirzepatide 30 mg/mL — 3 mL", price: "$745" },
    { name: "Tirzepatide 30 mg/mL — 4 mL", price: "$865" },
    { name: "Tirzepatide 30 mg/mL — 5 mL", price: "$985" },
  ]},
  { category: "Weight Loss Injectable", title: "Retatrutide", items: [
    { name: "Retatrutide — 1 mL (10 mg)", price: "$300" },
    { name: "Retatrutide — 2 mL (20 mg)", price: "$450" },
    { name: "Retatrutide — 3 mL (30 mg)", price: "$600" },
    { name: "Retatrutide — 4 mL (40 mg)", price: "$800" },
    { name: "Retatrutide — 5 mL (50 mg)", price: "$900" },
  ]},
  // ── Injectable Support ──────────────────────────────────────────────
  { category: "Injectable Support", title: "NAD+ / Lipo / Injectable Support", items: [
    { name: "NAD+ 500 mg/mL — 10 mL", price: "$200" },
    { name: "NAD+ 1000 mg/mL — 10 mL", price: "$350" },
    { name: "LIPO-C 10 mL (MIC + B12)", price: "$360" },
    { name: "LIPO-C 30 mL (MIC + B12)", price: "$675" },
    { name: "LIPO-B 10 mL (standard)", price: "$370" },
    { name: "MIC B12/Lipo-B 1000 mcg/mL — 10 mL", price: "$265" },
    { name: "MIC B12/Lipo-B 1000 mcg/mL — 50 mL", price: "$345" },
  ]},
  // ── Wellness ────────────────────────────────────────────────────────
  { category: "Wellness", title: "Health Boosters", items: [
    { name: "Sermorelin 5 mg (5 mL vial)", price: "$350" },
    { name: "Sermorelin 10 mg (5 mL vial)", price: "$400" },
    { name: "Glutathione 1000 mg — 200 mg/mL 5 mL", price: "$265" },
    { name: "Glutathione 2000 mg — 200 mg/mL 10 mL", price: "$340" },
  ]},
  // ── Recovery & Healing ─────────────────────────────────────────────
  { category: "Recovery & Healing", title: "BPC / TB", items: [
    { name: "BPC-157 — 5 mg", price: "$300" },
    { name: "BPC-157 — 10 mg", price: "$310" },
    { name: "TB-500 — 5 mg", price: "$300" },
    { name: "TB-500 — 10 mg", price: "$300" },
    { name: "BPC + TB Combo — 5 mg/5 mg", price: "$400" },
    { name: "KPV — 10 mg", price: "$295" },
  ]},
  // ── Growth Hormone ─────────────────────────────────────────────────
  { category: "Growth Hormone Support", title: "Growth Hormone / Secretagogues", items: [
    { name: "Ipamorelin — 5 mg", price: "$400" },
    { name: "CJC 1295 + Ipamorelin Blend 6 mg/12 mg", price: "$500" },
    { name: "GHRP-6 — 10 mg", price: "$310" },
    { name: "Tesamorelin — 5 mg", price: "$400" },
    { name: "Tesamorelin — 10 mg", price: "$500" },
    { name: "IGF-LR3 — 1 mg", price: "$300" },
  ]},
  // ── Metabolic ──────────────────────────────────────────────────────
  { category: "Metabolic", title: "Hormone-Based Weight Loss / Metabolic Boosters", items: [
    { name: "AOD 9604 — 10 mg", price: "$280" },
    { name: "5 Amino-1MQ — 5 mg", price: "$285" },
    { name: "SLU-PP-332 — 10 mg", price: "$400" },
    { name: "Adipotide — 5 mg", price: "$305" },
    { name: "SS-31 — 10 mg", price: "$285" },
    { name: "MOTS-C — 10 mg", price: "$450" },
  ]},
  // ── Cognitive & Neuro ──────────────────────────────────────────────
  { category: "Cognitive & Neuro", title: "Cognitive / Neuro", items: [
    { name: "Semax — 10 mg", price: "$295" },
    { name: "Selank — 10 mg", price: "$295" },
    { name: "DSIP — 5 mg", price: "$280" },
    { name: "DSIP — 10 mg", price: "$295" },
    { name: "Pinealon — 5 mg", price: "$280" },
    { name: "Ara-290 — 10 mg", price: "$285" },
    { name: "Dihexa — 5 mg", price: "$290" },
    { name: "PE-22-28 — 10 mg", price: "$285" },
  ]},
  // ── Hormonal ───────────────────────────────────────────────────────
  { category: "Hormonal", title: "Sexual / Hormonal", items: [
    { name: "PT-141 — 10 mg", price: "$295" },
    { name: "Oxytocin — 10 mg", price: "$305" },
    { name: "PT-141 / Oxytocin Combo 50 mg/10 mg", price: "$330" },
    { name: "Kisspeptin-10 — 10 mg", price: "$295" },
    { name: "Melanotan II — 10 mg", price: "$295" },
  ]},
  // ── Longevity ──────────────────────────────────────────────────────
  { category: "Longevity", title: "Anti-Aging / Cellular", items: [
    { name: "Thymosin Alpha-1 — 10 mg", price: "$295" },
    { name: "Epithalon — 10 mg", price: "$285" },
    { name: "Thymalin — 5 mg", price: "$280" },
  ]},
  // ── Aesthetic ──────────────────────────────────────────────────────
  { category: "Aesthetic Optimization", title: "Skin / Aesthetic", items: [
    { name: "GHK-Cu — 50 mg", price: "$285" },
    { name: "GHK-Cu — 100 mg", price: "$500" },
    { name: "GLOW — 70 mg", price: "$600" },
    { name: "KLOW — 80 mg", price: "$450" },
  ]},
  // ── General ────────────────────────────────────────────────────────
  { category: "General", title: "Misc", items: [
    { name: "B12 — 10 mg", price: "$295" },
    { name: "Epitalon — 10 mg", price: "$300" },
    { name: "LL-37 — 5 mg", price: "$295" },
  ]},
];

function OrnamentDivider() {
  return (
    <div className="my-4 flex items-center gap-2.5" aria-hidden>
      <span className="h-px flex-1 bg-[#D9CDB F]" style={{ backgroundColor: "#D9CDBF" }} />
      <span className="h-[5px] w-[5px] shrink-0 rounded-full bg-[#C67B5C]" />
      <span className="h-px flex-1 bg-[#D9CDBF]" style={{ backgroundColor: "#D9CDBF" }} />
    </div>
  );
}

function PriceGroup({ group }: { group: PriceGroup }) {
  return (
    <div>
      <p className="text-[0.68rem] font-medium uppercase tracking-[0.22em] text-[#C67B5C]"><AutoLinkedText>{group.category}</AutoLinkedText></p>
      <h2 className="mt-1.5 font-serif text-[1.55rem] italic leading-tight text-[#2A2020]">
        {group.title}
      </h2>
      <OrnamentDivider />
      <ul>
        {group.items.map((item) => (
          <li
            key={item.name}
            className="group flex items-end gap-2 border-b border-dashed border-[#E8DDD0] py-[0.65rem] last:border-0 transition-all hover:pl-1.5"
          >
            <span className="text-[0.92rem] font-light text-[#2A2520] leading-snug">
              {item.name}
            </span>
            <span className="mb-[4px] min-w-[16px] flex-1 border-b-[1.5px] border-dotted border-[#D9CDBF]" />
            <span className="font-serif text-[1.15rem] font-medium tabular-nums text-[#C67B5C]">
              {item.price}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function PricingPage() {
  return (
    <div className="bg-[#FAF8F5] text-[#2A2520]">
      {/* Page header */}
      <section className="border-b border-[#E8DDD0] bg-[#FAF8F5] py-12 text-center">
        <p className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-[#C67B5C]">
          Transparent Pricing
        </p>
        <h1 className="mt-3 font-serif text-4xl text-[#2A2520] md:text-5xl">
          Medication Price List
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-[#8a7f76]">
          <AutoLinkedText>{"All prices reflect per-vial medication costs. Consultation fees are billed separately.\n          Prices subject to change — confirm at time of order."}</AutoLinkedText>
        </p>
        <a
          href={SCHEDULE_CTA}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-2 rounded-md bg-[#C67B5C] px-7 py-3.5 text-sm font-semibold uppercase tracking-[0.1em] text-white transition hover:bg-[#B86B4E]"
        >
          Schedule Consultation
        </a>
      </section>

      {/* Price grid */}
      <section className="mx-auto max-w-[1300px] px-8 py-16 md:py-20 lg:px-12">
        <div className="grid gap-x-20 gap-y-14 md:grid-cols-2">
          {groups.map((group) => (
            <PriceGroup key={`${group.category}-${group.title}`} group={group} />
          ))}
        </div>

        {/* Disclaimer */}
        <p className="mt-16 border-t border-[#E8DDD0] pt-8 text-center text-xs leading-6 text-[#8a7f76]">
          <AutoLinkedText>{"Results are based on clinical trial data. Individual results vary. Medication prescribed\n          only where clinically appropriate. All compounded medications are prepared by FDA-registered\n          503B compounding pharmacies."}</AutoLinkedText>
        </p>
      </section>
    </div>
  );
}
