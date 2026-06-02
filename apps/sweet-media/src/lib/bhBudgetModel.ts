/** Behavioral health paid-search budget model — locked benchmarks (Sweet Media). */

export const BOOKING_URL = "/contact";

export const CEILING = 0.35;
export const CLICKS_FLOOR_PER_DAY = 3;
export const FLOOR_CONV = 15;
export const REC_CONV = 30;
export const DAYS = 30.4;
export const WEEKS = 4.345;

export type TreatmentKey =
  | "detox"
  | "residential"
  | "php"
  | "iop"
  | "dual"
  | "outpatient"
  | "mentalhealth"
  | "telehealth"
  | "eating"
  | "adolescent";

export type MarketKey = "t1" | "t2" | "t3";
export type SizeKey = "small" | "mid" | "large" | "major" | "national";
export type Mode = "min" | "eval";

export type KeywordRow = [keyword: string, cpcMult: number];

export type TreatmentBenchmark = {
  label: string;
  cpc: number;
  ctr: number;
  clickToLead: number;
  leadToVob: number;
  vobToAdmit: number;
  volume: number;
  keywords: KeywordRow[];
};

export const TREATMENTS: Record<TreatmentKey, TreatmentBenchmark> = {
  detox: {
    label: "Medical Detox",
    cpc: 90,
    ctr: 0.05,
    clickToLead: 0.09,
    leadToVob: 0.45,
    vobToAdmit: 0.3,
    volume: 2400,
    keywords: [
      ["detox near me", 1.0],
      ["alcohol detox center", 0.95],
      ["drug detox [city]", 0.9],
      ["medical detox", 0.85],
      ["alcohol detox near me", 1.05],
      ["detox facility [city]", 0.8],
    ],
  },
  residential: {
    label: "Residential / Inpatient (RTC)",
    cpc: 85,
    ctr: 0.05,
    clickToLead: 0.09,
    leadToVob: 0.45,
    vobToAdmit: 0.3,
    volume: 1800,
    keywords: [
      ["residential treatment center", 1.0],
      ["inpatient rehab [city]", 0.95],
      ["drug rehab near me", 1.1],
      ["residential rehab", 0.9],
      ["inpatient drug treatment", 0.85],
      ["addiction treatment center", 1.0],
    ],
  },
  php: {
    label: "PHP (Partial Hospitalization)",
    cpc: 65,
    ctr: 0.05,
    clickToLead: 0.08,
    leadToVob: 0.45,
    vobToAdmit: 0.3,
    volume: 900,
    keywords: [
      ["partial hospitalization program", 1.0],
      ["php [city]", 0.9],
      ["php mental health", 0.95],
      ["day treatment program", 0.8],
      ["php addiction", 0.85],
      ["partial hospitalization near me", 1.05],
    ],
  },
  iop: {
    label: "IOP (Intensive Outpatient)",
    cpc: 55,
    ctr: 0.05,
    clickToLead: 0.08,
    leadToVob: 0.45,
    vobToAdmit: 0.3,
    volume: 1300,
    keywords: [
      ["intensive outpatient program", 1.0],
      ["iop near me", 1.05],
      ["iop [city]", 0.9],
      ["outpatient rehab program", 0.85],
      ["iop mental health", 0.95],
      ["intensive outpatient [city]", 0.9],
    ],
  },
  dual: {
    label: "Dual Diagnosis",
    cpc: 70,
    ctr: 0.05,
    clickToLead: 0.08,
    leadToVob: 0.45,
    vobToAdmit: 0.3,
    volume: 700,
    keywords: [
      ["dual diagnosis treatment", 1.0],
      ["co-occurring disorder treatment", 0.9],
      ["dual diagnosis rehab", 0.95],
      ["mental health and addiction treatment", 0.85],
      ["dual diagnosis [city]", 0.85],
      ["co-occurring treatment center", 0.8],
    ],
  },
  outpatient: {
    label: "Outpatient (General / MH)",
    cpc: 35,
    ctr: 0.055,
    clickToLead: 0.07,
    leadToVob: 0.5,
    vobToAdmit: 0.3,
    volume: 3500,
    keywords: [
      ["outpatient mental health", 1.0],
      ["outpatient treatment [city]", 0.9],
      ["outpatient therapy program", 0.85],
      ["outpatient rehab", 0.95],
      ["mental health outpatient near me", 1.0],
      ["outpatient program [city]", 0.85],
    ],
  },
  mentalhealth: {
    label: "Mental Health (Anxiety / Depression / Trauma)",
    cpc: 45,
    ctr: 0.055,
    clickToLead: 0.07,
    leadToVob: 0.5,
    vobToAdmit: 0.3,
    volume: 5000,
    keywords: [
      ["mental health treatment center", 1.0],
      ["depression treatment [city]", 0.9],
      ["anxiety treatment program", 0.9],
      ["trauma treatment center", 0.95],
      ["mental health treatment near me", 1.05],
      ["ptsd treatment [city]", 0.85],
    ],
  },
  telehealth: {
    label: "Telehealth / Virtual IOP",
    cpc: 30,
    ctr: 0.06,
    clickToLead: 0.06,
    leadToVob: 0.5,
    vobToAdmit: 0.28,
    volume: 2000,
    keywords: [
      ["virtual iop", 1.0],
      ["online intensive outpatient", 0.95],
      ["telehealth addiction treatment", 0.9],
      ["online rehab program", 0.9],
      ["virtual mental health treatment", 1.0],
      ["online therapy program", 0.85],
    ],
  },
  eating: {
    label: "Eating Disorder Treatment",
    cpc: 60,
    ctr: 0.05,
    clickToLead: 0.08,
    leadToVob: 0.5,
    vobToAdmit: 0.3,
    volume: 900,
    keywords: [
      ["eating disorder treatment center", 1.0],
      ["anorexia treatment [city]", 0.9],
      ["bulimia treatment program", 0.85],
      ["eating disorder rehab", 0.95],
      ["eating disorder treatment near me", 1.05],
      ["ed treatment center [city]", 0.8],
    ],
  },
  adolescent: {
    label: "Adolescent / Teen Treatment",
    cpc: 65,
    ctr: 0.05,
    clickToLead: 0.08,
    leadToVob: 0.5,
    vobToAdmit: 0.3,
    volume: 1100,
    keywords: [
      ["teen treatment center", 1.0],
      ["adolescent rehab [city]", 0.9],
      ["teen mental health treatment", 0.95],
      ["residential treatment for teens", 0.9],
      ["adolescent treatment near me", 1.0],
      ["teen rehab [city]", 0.85],
    ],
  },
};

export const MARKETS: Record<
  MarketKey,
  { label: string; hint: string; cpcMult: number }
> = {
  t1: {
    label: "Tier 1 — Ultra-competitive",
    hint: "LA/OC · S. Florida · Phoenix · Nashville",
    cpcMult: 1.25,
  },
  t2: {
    label: "Tier 2 — Standard metro",
    hint: "Most mid-size U.S. metros",
    cpcMult: 1.0,
  },
  t3: {
    label: "Tier 3 — Lower competition",
    hint: "Secondary / emerging markets",
    cpcMult: 0.7,
  },
};

export const SIZES: Record<SizeKey, { label: string; volMult: number }> = {
  small: { label: "Small — single city", volMult: 0.5 },
  mid: { label: "Mid metro", volMult: 1.0 },
  large: { label: "Large metro", volMult: 2.0 },
  major: { label: "Major / multi-city region", volMult: 3.5 },
  national: { label: "National (virtual / telehealth)", volMult: 15 },
};

export type PresetParams = {
  cpc: number;
  ctr: number;
  clickToLead: number;
  leadToVob: number;
  volume: number;
};

export function presetDefaults(
  tKey: TreatmentKey,
  mKey: MarketKey,
  sKey: SizeKey,
): PresetParams {
  const t = TREATMENTS[tKey];
  const m = MARKETS[mKey];
  const s = SIZES[sKey];
  return {
    cpc: Math.round(t.cpc * m.cpcMult),
    ctr: t.ctr,
    clickToLead: t.clickToLead,
    leadToVob: t.leadToVob,
    volume: Math.round(t.volume * s.volMult),
  };
}

export type FunnelResult = {
  B: number;
  clicks: number;
  leads: number;
  vobs: number;
  convMo: number;
  isShare: number;
};

export type ChartPoint = { B: number; leads: number; vobs: number };

export type BudgetModelResult = {
  cpc: number;
  cpl: number;
  cpvob: number;
  availClicks: number;
  ceilingBudget: number;
  floorBudget: number;
  floorBinding: string;
  recBudget: number;
  scaleBudget: number;
  marketTooSmall: boolean;
  funnel: (B: number) => FunnelResult;
  biddingFor: (B: number) => string;
  points: ChartPoint[];
  chartMax: number;
};

export function computeBudgetModel(p: PresetParams): BudgetModelResult {
  const cpc = Math.max(0.5, p.cpc);
  const ctr = Math.min(0.5, Math.max(0.005, p.ctr));
  const c2l = Math.min(0.5, Math.max(0.005, p.clickToLead));
  const l2v = Math.min(1, Math.max(0.01, p.leadToVob));
  const vol = Math.max(10, p.volume);

  const cpl = cpc / c2l;
  const cpvob = cpl / l2v;

  const availClicks = vol * ctr;
  const ceilingBudget = availClicks * CEILING * cpc;

  const bFloorConv = FLOOR_CONV * cpl;
  const bClicksFloor = CLICKS_FLOOR_PER_DAY * DAYS * cpc;
  const floorBudget = Math.max(bFloorConv, bClicksFloor);
  const floorBinding =
    bClicksFloor > bFloorConv
      ? "auction participation (a few clicks/day minimum)"
      : `conversion signal (${FLOOR_CONV} leads/mo to feed Smart Bidding)`;

  const recBudget = Math.max(REC_CONV * cpl, floorBudget);
  const scaleBudget = Math.min(
    Math.max(ceilingBudget, recBudget * 1.5),
    recBudget * 4,
  );
  const marketTooSmall = ceilingBudget < recBudget;

  const funnel = (B: number): FunnelResult => {
    const clicks = B / cpc;
    const leads = clicks * c2l;
    const vobs = leads * l2v;
    return {
      B,
      clicks,
      leads,
      vobs,
      convMo: leads,
      isShare: Math.min(1, clicks / availClicks),
    };
  };

  const curve = (B: number, unit: number) => {
    const eff = Math.min(B, ceilingBudget) / unit;
    const extra =
      B > ceilingBudget ? ((B - ceilingBudget) / unit) * 0.35 : 0;
    return eff + extra;
  };

  const biddingFor = (B: number) => {
    const cm = funnel(B).convMo;
    if (cm < FLOOR_CONV) {
      return "Maximize Clicks / Manual CPC — volume too low for Smart Bidding";
    }
    if (cm < REC_CONV) {
      return "Maximize Conversions — enough signal to optimize";
    }
    return "Target CPA — viable at this conversion volume";
  };

  const chartMax = Math.max(scaleBudget * 1.6, recBudget * 2.2);
  const points: ChartPoint[] = [];
  for (let i = 0; i <= 28; i++) {
    const B = (chartMax / 28) * i;
    points.push({
      B: Math.round(B),
      leads: +curve(B, cpl).toFixed(2),
      vobs: +curve(B, cpvob).toFixed(2),
    });
  }

  return {
    cpc,
    cpl,
    cpvob,
    availClicks,
    ceilingBudget,
    floorBudget,
    floorBinding,
    recBudget,
    scaleBudget,
    marketTooSmall,
    funnel,
    biddingFor,
    points,
    chartMax,
  };
}
