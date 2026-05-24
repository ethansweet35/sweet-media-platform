export const RESULTS_ROUTE = "/results";

export type CaseStudyChartType = "bars" | "spark" | "funnel";

export interface CaseStudyData {
  idx: string;
  client: string;
  location: string;
  tag: string;
  tagIcon: string;
  headline: string;
  detail: string;
  metrics: { val: string; label: string }[];
  chartType: CaseStudyChartType;
  bars?: { label: string; val: number; highlight?: boolean }[];
  sparkPts?: number[];
  sparkLabel?: string;
  funnelSteps?: { label: string; val: string; pct: number }[];
  image: string;
  caseStudyHref?: string;
}

export const RESULTS_STATS_GRID = [
  { displayValue: "3.2×", num: 3.2, suffix: "×", prefix: "", label: "Avg. Google ROAS", sub: "Across all BH clients", decimals: 1 },
  { displayValue: "$47", num: 47, suffix: "", prefix: "$", label: "Avg. Cost Per Lead", sub: "Industry avg. $180+", decimals: 0 },
  { displayValue: "74%", num: 74, suffix: "%", prefix: "", label: "Avg. CPA Reduction", sub: "Within first 6 months", decimals: 0 },
  { displayValue: "340%", num: 340, suffix: "%", prefix: "", label: "Avg. Organic Growth", sub: "SEO traffic increase", decimals: 0 },
  { displayValue: "40+", num: 40, suffix: "+", prefix: "", label: "Clients Served", sub: "Behavioral health orgs", decimals: 0 },
  { displayValue: "92%", num: 92, suffix: "%", prefix: "", label: "Client Retention", sub: "Year-over-year", decimals: 0 },
] as const;

export const RESULTS_STATS_PROOF = [
  { val: "40+", label: "BH Facilities Served" },
  { val: "3.2×", label: "Avg. Google ROAS" },
  { val: "90 Days", label: "Avg. Time to Results" },
  { val: "100%", label: "Behavioral Health Only" },
] as const;

export const RESULTS_CASE_STUDIES: CaseStudyData[] = [
  {
    idx: "01",
    client: "California Prime Recovery",
    location: "Orange County, CA",
    tag: "Full-Funnel",
    tagIcon: "ri-funds-line",
    headline: "30% Reduction in Paid CPA + Passing Core Web Vitals",
    detail:
      "Optimized paid campaigns, introduced AI chatbot lead capture, improved website to passing Core Web Vitals, and built a scalable SEO content system — creating a more efficient digital admissions engine.",
    metrics: [
      { val: "↓30%", label: "Paid CPA" },
      { val: "Passing", label: "Core Web Vitals" },
      { val: "AI-Powered", label: "Lead Capture" },
    ],
    chartType: "bars" as const,
    bars: [
      { label: "Jan", val: 100 },
      { label: "Feb", val: 92 },
      { label: "Mar", val: 84 },
      { label: "Apr", val: 78 },
      { label: "May", val: 74 },
      { label: "Jun", val: 70, highlight: true },
    ],
    image: "https://ynmldknprfusujudvutq.supabase.co/storage/v1/object/public/public_bucket/cs-cpr.jpg",
    caseStudyHref: "/case-studies/california-prime-recovery",
  },
  {
    idx: "02",
    client: "Rize OC",
    location: "Orange County, CA",
    tag: "Paid Media",
    tagIcon: "ri-funds-box-line",
    headline: "$10K to $300K/Month in Ad Spend — CPA Dropped 67% in 4 Months",
    detail:
      "Built a full multi-channel paid acquisition system across Google, Bing, and Meta. Scaled from $10K to $300K/month in ad spend while cutting CPA from $350 to $115 through intent-based campaign segmentation, dedicated landing pages, and geographic targeting.",
    metrics: [
      { val: "30×", label: "Spend Scaled" },
      { val: "↓67%", label: "CPA Reduction" },
      { val: "$115", label: "Avg CPA" },
    ],
    chartType: "spark" as const,
    sparkPts: [10, 18, 30, 52, 80, 110, 148, 190, 230, 265, 290, 300],
    sparkLabel: "Ad Spend Growth — 4 Months ($10K → $300K)",
    image: "https://ynmldknprfusujudvutq.supabase.co/storage/v1/object/public/public_bucket/cs-rizeoc.jpg",
    caseStudyHref: "/case-studies/rize-oc",
  },
];
