import { EditableText } from "@sweetmedia/admin-core/page-editor";
import ResultsStats from "@/components/pages/results/components/ResultsStats";
import { RESULTS_ROUTE, RESULTS_STATS_GRID, RESULTS_STATS_PROOF } from "./resultsContentDefaults";

export default async function ResultsStatsSection() {
  return (
    <ResultsStats
      eyebrow={
        <EditableText
          routePath={RESULTS_ROUTE}
          fieldKey="stats.eyebrow"
          defaultValue="Performance Metrics"
          className="text-[9px] tracking-[0.45em] uppercase text-white/40 font-medium"
        />
      }
      headlineBold={
        <EditableText
          routePath={RESULTS_ROUTE}
          fieldKey="stats.headline.bold"
          defaultValue="Averages Across"
          className="block text-4xl md:text-5xl font-bold text-white leading-tight"
        />
      }
      headlineItalic={
        <EditableText
          routePath={RESULTS_ROUTE}
          fieldKey="stats.headline.italic"
          defaultValue="All Active Accounts."
          className="block text-4xl md:text-5xl font-light italic text-[#7B9FD4] leading-tight"
        />
      }
      body={
        <EditableText
          routePath={RESULTS_ROUTE}
          fieldKey="stats.body"
          defaultValue="These aren't our best results — they're our typical results. Every number below is the median across our entire client base over the last 12 months."
          as="span"
          className="text-white/60 text-sm leading-relaxed font-light"
        />
      }
      updatedLabel={
        <EditableText
          routePath={RESULTS_ROUTE}
          fieldKey="stats.updated"
          defaultValue="Updated April 2026"
          className="text-[10px] text-white/40 tracking-widest uppercase"
        />
      }
      statValues={RESULTS_STATS_GRID.map((item, index) => (
        <EditableText
          key={`value-${index}`}
          routePath={RESULTS_ROUTE}
          fieldKey={`stats.grid.${index}.value`}
          defaultValue={item.displayValue}
          className="text-3xl md:text-5xl font-bold text-white leading-none"
          style={{ fontFamily: "'Playfair Display', serif" }}
        />
      ))}
      statLabels={RESULTS_STATS_GRID.map((item, index) => (
        <EditableText
          key={`label-${index}`}
          routePath={RESULTS_ROUTE}
          fieldKey={`stats.grid.${index}.label`}
          defaultValue={item.label}
          className="text-xs md:text-sm font-semibold text-white/80"
        />
      ))}
      statSubs={RESULTS_STATS_GRID.map((item, index) => (
        <EditableText
          key={`sub-${index}`}
          routePath={RESULTS_ROUTE}
          fieldKey={`stats.grid.${index}.sub`}
          defaultValue={item.sub}
          className="text-[10px] text-white/45 tracking-wide"
        />
      ))}
      proofValues={RESULTS_STATS_PROOF.map((item, index) => (
        <EditableText
          key={`proof-val-${index}`}
          routePath={RESULTS_ROUTE}
          fieldKey={`stats.proof.${index}.value`}
          defaultValue={item.val}
          className="text-2xl font-bold text-white"
          style={{ fontFamily: "'Playfair Display', serif" }}
        />
      ))}
      proofLabels={RESULTS_STATS_PROOF.map((item, index) => (
        <EditableText
          key={`proof-label-${index}`}
          routePath={RESULTS_ROUTE}
          fieldKey={`stats.proof.${index}.label`}
          defaultValue={item.label}
          className="text-[10px] uppercase tracking-widest text-white/35 mt-1"
        />
      ))}
    />
  );
}
