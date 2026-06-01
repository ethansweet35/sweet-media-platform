import Image from "next/image";
import ResultsCaseStudies from "@/components/pages/results/components/ResultsCaseStudies";
import { RESULTS_CASE_STUDIES, RESULTS_ROUTE } from "./resultsContentDefaults";

export default function ResultsCaseStudiesSection() {
  return (
    <ResultsCaseStudies
      header={{
        eyebrow: (
          <span className="text-[10px] tracking-[0.35em] uppercase text-[#0A1F44] font-semibold">Case Studies</span>
        ),
        headlineLine1: (
          <span className="block text-4xl md:text-5xl font-bold text-black leading-tight">Real Campaigns,</span>
        ),
        headlineLine2: (
          <span className="block text-4xl md:text-5xl font-light italic text-[#0A1F44] leading-tight">Real Outcomes.</span>
        ),
        body: (
          <span className="text-black/55 text-sm leading-relaxed">Every case below is a real behavioral health client. Real numbers, real timelines, real admissions growth. No cherry-picked outliers.</span>
        ),
      }}
      cardSlots={RESULTS_CASE_STUDIES.map((study, index) => ({
        image: (
          <Image
            src={study.image}
            alt={study.client}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover object-top"
          />
        ),
        client: (
          <span className="text-sm font-semibold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>{study.client}</span>
        ),
        location: (
          <span className="text-xs text-white/50">{study.location}</span>
        ),
        tag: (
          <span className="text-[10px] tracking-[0.2em] uppercase font-bold">{study.tag}</span>
        ),
        headline: (
          <span className="text-lg font-bold text-black leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>{study.headline}</span>
        ),
        detail: (
          <span className="text-sm text-black/55 leading-relaxed font-light">{study.detail}</span>
        ),
        sparkLabel:
          "sparkLabel" in study && study.sparkLabel ? (
            <span className="text-[9px] tracking-[0.3em] uppercase text-black/35">{study.sparkLabel}</span>
          ) : undefined,
        metrics: study.metrics.map((metric, metricIndex) => ({
          val: (
            <span className="text-lg font-bold text-black" style={{ fontFamily: "'Playfair Display', serif" }}>{metric.val}</span>
          ),
          label: (
            <span className="text-[9px] uppercase tracking-widest text-black/40 mt-0.5">{metric.label}</span>
          ),
        })),
      }))}
    />
  );
}
