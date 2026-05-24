import { EditableImage, EditableText } from "@sweetmedia/admin-core";
import ResultsCaseStudies from "@/components/pages/results/components/ResultsCaseStudies";
import { RESULTS_CASE_STUDIES, RESULTS_ROUTE } from "./resultsContentDefaults";

export default async function ResultsCaseStudiesSection() {
  return (
    <ResultsCaseStudies
      header={{
        eyebrow: (
          <EditableText
            routePath={RESULTS_ROUTE}
            fieldKey="caseStudies.eyebrow"
            defaultValue="Case Studies"
            className="text-[10px] tracking-[0.35em] uppercase text-[#0A1F44] font-semibold"
          />
        ),
        headlineLine1: (
          <EditableText
            routePath={RESULTS_ROUTE}
            fieldKey="caseStudies.headline.line1"
            defaultValue="Real Campaigns,"
            className="block text-4xl md:text-5xl font-bold text-black leading-tight"
          />
        ),
        headlineLine2: (
          <EditableText
            routePath={RESULTS_ROUTE}
            fieldKey="caseStudies.headline.line2"
            defaultValue="Real Outcomes."
            className="block text-4xl md:text-5xl font-light italic text-[#0A1F44] leading-tight"
          />
        ),
        body: (
          <EditableText
            routePath={RESULTS_ROUTE}
            fieldKey="caseStudies.body"
            defaultValue="Every case below is a real behavioral health client. Real numbers, real timelines, real admissions growth. No cherry-picked outliers."
            as="span"
            className="text-black/55 text-sm leading-relaxed"
          />
        ),
      }}
      cardSlots={RESULTS_CASE_STUDIES.map((study, index) => ({
        image: (
          <EditableImage
            routePath={RESULTS_ROUTE}
            fieldKey={`caseStudies.${index}.image`}
            defaultSrc={study.image}
            alt={study.client}
            label={`Case study ${index + 1} image`}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover object-top"
          />
        ),
        client: (
          <EditableText
            routePath={RESULTS_ROUTE}
            fieldKey={`caseStudies.${index}.client`}
            defaultValue={study.client}
            className="text-sm font-semibold text-white"
            style={{ fontFamily: "'Playfair Display', serif" }}
          />
        ),
        location: (
          <EditableText
            routePath={RESULTS_ROUTE}
            fieldKey={`caseStudies.${index}.location`}
            defaultValue={study.location}
            className="text-xs text-white/50"
          />
        ),
        tag: (
          <EditableText
            routePath={RESULTS_ROUTE}
            fieldKey={`caseStudies.${index}.tag`}
            defaultValue={study.tag}
            className="text-[10px] tracking-[0.2em] uppercase font-bold"
          />
        ),
        headline: (
          <EditableText
            routePath={RESULTS_ROUTE}
            fieldKey={`caseStudies.${index}.headline`}
            defaultValue={study.headline}
            className="text-lg font-bold text-black leading-tight"
            style={{ fontFamily: "'Playfair Display', serif" }}
          />
        ),
        detail: (
          <EditableText
            routePath={RESULTS_ROUTE}
            fieldKey={`caseStudies.${index}.detail`}
            defaultValue={study.detail}
            as="span"
            className="text-sm text-black/55 leading-relaxed font-light"
          />
        ),
        sparkLabel:
          "sparkLabel" in study && study.sparkLabel ? (
            <EditableText
              routePath={RESULTS_ROUTE}
              fieldKey={`caseStudies.${index}.sparkLabel`}
              defaultValue={study.sparkLabel}
              className="text-[9px] tracking-[0.3em] uppercase text-black/35"
            />
          ) : undefined,
        metrics: study.metrics.map((metric, metricIndex) => ({
          val: (
            <EditableText
              routePath={RESULTS_ROUTE}
              fieldKey={`caseStudies.${index}.metrics.${metricIndex}.val`}
              defaultValue={metric.val}
              className="text-lg font-bold text-black"
              style={{ fontFamily: "'Playfair Display', serif" }}
            />
          ),
          label: (
            <EditableText
              routePath={RESULTS_ROUTE}
              fieldKey={`caseStudies.${index}.metrics.${metricIndex}.label`}
              defaultValue={metric.label}
              className="text-[9px] uppercase tracking-widest text-black/40 mt-0.5"
            />
          ),
        })),
      }))}
    />
  );
}
