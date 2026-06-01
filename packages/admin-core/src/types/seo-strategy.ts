export type SeoStrategyImpact = "high" | "medium" | "low";
export type SeoStrategyEffort = "quick" | "moderate" | "project";

export interface SeoStrategySemrushKeyword {
  phrase: string;
  position: number;
  searchVolume: number;
  trafficPercent: number;
  difficulty: number;
  rankingUrl: string;
}

export interface SeoStrategyCompetitor {
  domain: string;
  relevance: number;
  commonKeywords: number;
  organicKeywords: number;
  organicTraffic: number;
}

export interface SeoStrategyMissingKeyword {
  phrase: string;
  searchVolume: number;
  competition: number;
}

export interface SeoStrategySiteCrawl {
  title: string;
  metaDescription: string;
  h1: string;
  navLabels: string[];
  internalPaths: string[];
  sitemapPathCount: number;
  homepageWordCount: number;
}

export interface SeoStrategyPsiSnapshot {
  performance: number | null;
  lcpMs: number | null;
  cls: number | null;
  topIssues: string[];
}

export interface SeoStrategyDataSnapshot {
  url: string;
  domain: string;
  fetchedAt: string;
  semrushAvailable: boolean;
  organicKeywordCount: number | null;
  organicTrafficEstimate: number | null;
  topKeywords: SeoStrategySemrushKeyword[];
  competitors: SeoStrategyCompetitor[];
  missingVsCompetitors: Array<{
    competitorDomain: string;
    keywords: SeoStrategyMissingKeyword[];
  }>;
  siteCrawl: SeoStrategySiteCrawl;
  psi: SeoStrategyPsiSnapshot | null;
  semrushNotes: string[];
}

export interface SeoStrategyInsightItem {
  title: string;
  finding: string;
  recommendation: string;
  impact: SeoStrategyImpact;
  effort: SeoStrategyEffort;
}

export interface SeoStrategyReportSection {
  title: string;
  summary: string;
  items: SeoStrategyInsightItem[];
}

export interface SeoStrategyReport {
  executiveSummary: string;
  scorecard: {
    organicVisibility: string;
    contentOpportunity: string;
    technicalHealth: string;
    conversionReadiness: string;
  };
  cro: SeoStrategyReportSection;
  siteStructure: SeoStrategyReportSection & { suggestedHierarchy: string[] };
  keywordGaps: SeoStrategyReportSection & { contentIdeas: string[] };
  technical: SeoStrategyReportSection;
  competitorInsights: SeoStrategyReportSection;
  prioritizedRoadmap: { thisWeek: string[]; thisMonth: string[] };
  dataSourcesNote: string;
}

export interface SeoStrategyResult {
  url: string;
  fetchedAt: string;
  snapshot: SeoStrategyDataSnapshot;
  report: SeoStrategyReport | null;
  error?: string;
  aiError?: string;
}
