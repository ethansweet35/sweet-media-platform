/**
 * Google Ads conversion actions we surface in marketing reports.
 * Matched case-insensitively against Windsor `conversion_action_name`.
 */

export interface AdsGoalDefinition {
  id: string;
  label: string;
  match: (actionName: string) => boolean;
}

export const ADS_CONVERSION_GOALS: AdsGoalDefinition[] = [
  {
    id: "first_time_phone",
    label: "First time phone call",
    match: (n) => /first time phone call/i.test(n),
  },
  {
    id: "phone_call",
    label: "Phone call",
    match: (n) =>
      (/phone call/i.test(n) && !/first time/i.test(n)) || /calls from ads/i.test(n),
  },
  {
    id: "viable_vob",
    label: "Viable VOB",
    match: (n) => /viable vob/i.test(n),
  },
  {
    id: "vob",
    label: "VOB",
    match: (n) => /\bvob\b/i.test(n) && !/viable/i.test(n),
  },
  {
    id: "opportunity",
    label: "Opportunity",
    match: (n) => /opportunity/i.test(n),
  },
];

export function slugCampaign(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_|_$/g, "")
    .slice(0, 80) || "campaign";
}

export function slugConversionAction(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_|_$/g, "")
    .slice(0, 80);
}

/** True if this Windsor conversion action counts toward goal conversions + CPA. */
export function isTrackedAdsGoal(actionName: string): boolean {
  return ADS_CONVERSION_GOALS.some((g) => g.match(actionName));
}

export function goalLabelForAction(actionName: string): string | null {
  for (const g of ADS_CONVERSION_GOALS) {
    if (g.match(actionName)) return g.label;
  }
  return null;
}

/** Meta (Facebook) conversion actions surfaced in marketing reports. */
export const META_ADS_CONVERSION_GOALS: AdsGoalDefinition[] = [
  {
    id: "meta_lead",
    label: "Leads",
    match: (n) =>
      /actions_lead/i.test(n) ||
      /fb_pixel_lead/i.test(n) ||
      (/\.lead$/i.test(n) && !/pixel_custom/i.test(n)),
  },
  {
    id: "meta_calls",
    label: "Calls",
    match: (n) => /custom\.calls/i.test(n) || /click_to_call/i.test(n),
  },
  {
    id: "meta_forms",
    label: "Form submissions",
    match: (n) => /form submission/i.test(n),
  },
];

export function isTrackedMetaGoal(actionName: string): boolean {
  return META_ADS_CONVERSION_GOALS.some((g) => g.match(actionName));
}

export function metaGoalLabelForAction(actionName: string): string | null {
  for (const g of META_ADS_CONVERSION_GOALS) {
    if (g.match(actionName)) return g.label;
  }
  return null;
}
