import ResultsStats from "@/components/pages/results/components/ResultsStats";
import { RESULTS_ROUTE, RESULTS_STATS_GRID, RESULTS_STATS_PROOF } from "./resultsContentDefaults";

export default function ResultsStatsSection() {
  return (
    <ResultsStats
      eyebrow={
        <span className="text-[9px] tracking-[0.45em] uppercase text-white/40 font-medium">Performance Metrics</span>
      }
      headlineBold={
        <span className="block text-4xl md:text-5xl font-bold text-white leading-tight">Averages Across</span>
      }
      headlineItalic={
        <span className="block text-4xl md:text-5xl font-light italic text-[#7B9FD4] leading-tight">All Active Accounts.</span>
      }
      body={
        <span className="text-white/60 text-sm leading-relaxed font-light">These aren't our best results — they're our typical results. Every number below is the median across our entire client base over the last 12 months.</span>
      }
      updatedLabel={
        <span className="text-[10px] text-white/40 tracking-widest uppercase">Updated April 2026</span>
      }
      statValues={RESULTS_STATS_GRID.map((item, index) => (
        <span className="text-3xl md:text-5xl font-bold text-white leading-none" style={{ fontFamily: "'Playfair Display', serif" }}>{item.displayValue}</span>
      ))}
      statLabels={RESULTS_STATS_GRID.map((item, index) => (
        <span className="text-xs md:text-sm font-semibold text-white/80">{item.label}</span>
      ))}
      statSubs={RESULTS_STATS_GRID.map((item, index) => (
        <span className="text-[10px] text-white/45 tracking-wide">{item.sub}</span>
      ))}
      proofValues={RESULTS_STATS_PROOF.map((item, index) => (
        <span className="text-2xl font-bold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>{item.val}</span>
      ))}
      proofLabels={RESULTS_STATS_PROOF.map((item, index) => (
        <span className="text-[10px] uppercase tracking-widest text-white/35 mt-1">{item.label}</span>
      ))}
    />
  );
}
