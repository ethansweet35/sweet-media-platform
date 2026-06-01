export type PsiStrategy = "mobile" | "desktop";

export type RecommendationImpact = "high" | "medium" | "low";
export type RecommendationEffort = "quick" | "moderate" | "project";

export interface SpeedTestCoreMetrics {
  performance: number | null;
  fcp_ms: number | null;
  lcp_ms: number | null;
  cls: number | null;
  tbt_ms: number | null;
  speed_index_ms: number | null;
}

export interface SpeedTestRecommendation {
  id: string;
  title: string;
  psiTitle: string;
  impact: RecommendationImpact;
  effort: RecommendationEffort;
  category: "images" | "javascript" | "fonts" | "css" | "server" | "third-party" | "layout" | "caching" | "other";
  savingsMs: number | null;
  savingsLabel: string | null;
  summary: string;
  actions: string[];
}

export interface SpeedTestResult {
  url: string;
  strategy: PsiStrategy;
  fetchedAt: string;
  metrics: SpeedTestCoreMetrics;
  recommendations: SpeedTestRecommendation[];
  error?: string;
}
