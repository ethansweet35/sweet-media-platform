export type PsiStrategy = "mobile" | "desktop";

export type RecommendationImpact = "high" | "medium" | "low";
export type RecommendationEffort = "quick" | "moderate" | "project";

/** Detected site builder / CMS stack */
export type SitePlatform =
  | "wordpress-elementor"
  | "wordpress-divi"
  | "wordpress-other"
  | "wix"
  | "squarespace"
  | "shopify"
  | "webflow"
  | "nextjs"
  | "hubspot"
  | "godaddy"
  | "unknown";

export interface PlatformQuickWin {
  id: string;
  title: string;
  /** One sentence a non-technical owner can understand */
  why: string;
  steps: string[];
  impact: RecommendationImpact;
  effort: RecommendationEffort;
}

export interface SitePlatformInsight {
  platform: SitePlatform;
  displayName: string;
  confidence: "high" | "medium" | "low";
  /** Short signals shown for transparency, e.g. "Elementor scripts detected" */
  detectedSignals: string[];
  headline: string;
  explanation: string;
  quickWins: PlatformQuickWin[];
  /** Honest note about what the platform makes hard to fix */
  realityCheck: string | null;
}

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
  /** Plain-language "why this matters for admissions/SEO" */
  whyItMatters: string | null;
  actions: string[];
  /** True when copy was tailored to the detected platform */
  tailored: boolean;
}

export interface SpeedTestResult {
  url: string;
  strategy: PsiStrategy;
  fetchedAt: string;
  metrics: SpeedTestCoreMetrics;
  platform: SitePlatformInsight | null;
  recommendations: SpeedTestRecommendation[];
  error?: string;
}
