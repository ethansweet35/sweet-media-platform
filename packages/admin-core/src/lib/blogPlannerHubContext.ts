/**
 * Blog Planner discovery context — derives geographic scope and Semrush seeds from a hub page
 * so "Discover topics" stays aligned with location/service-area hubs (not generic national FAQs).
 */
import { cleanSeedPhrase, routeSlugToSeed } from "./seedCleaner";
import type { SemrushKeywordSuggestion } from "./server/semrushClient";

/** US state/territory slug → display name (lowercase slug keys). */
const US_STATE_BY_SLUG: Record<string, string> = {
  alabama: "Alabama",
  alaska: "Alaska",
  arizona: "Arizona",
  arkansas: "Arkansas",
  california: "California",
  colorado: "Colorado",
  connecticut: "Connecticut",
  delaware: "Delaware",
  florida: "Florida",
  georgia: "Georgia",
  hawaii: "Hawaii",
  idaho: "Idaho",
  illinois: "Illinois",
  indiana: "Indiana",
  iowa: "Iowa",
  kansas: "Kansas",
  kentucky: "Kentucky",
  louisiana: "Louisiana",
  maine: "Maine",
  maryland: "Maryland",
  massachusetts: "Massachusetts",
  michigan: "Michigan",
  minnesota: "Minnesota",
  mississippi: "Mississippi",
  missouri: "Missouri",
  montana: "Montana",
  nebraska: "Nebraska",
  nevada: "Nevada",
  "new-hampshire": "New Hampshire",
  "new-jersey": "New Jersey",
  "new-mexico": "New Mexico",
  "new-york": "New York",
  "north-carolina": "North Carolina",
  "north-dakota": "North Dakota",
  ohio: "Ohio",
  oklahoma: "Oklahoma",
  oregon: "Oregon",
  pennsylvania: "Pennsylvania",
  "rhode-island": "Rhode Island",
  "south-carolina": "South Carolina",
  "south-dakota": "South Dakota",
  tennessee: "Tennessee",
  texas: "Texas",
  utah: "Utah",
  vermont: "Vermont",
  virginia: "Virginia",
  washington: "Washington",
  "west-virginia": "West Virginia",
  wisconsin: "Wisconsin",
  wyoming: "Wyoming",
  "district-of-columbia": "Washington DC",
};

/** Phrases that look like Semrush matches but are not clinical intervention services content. */
const SEMRUSH_NOISE_PATTERN =
  /\b(wheel|curriculum\s+map|public\s+health\s+intervention\s+wheel|district|school\s+district|mtss|pbis|rti\b|lesson\s+plan)\b/i;

export type BlogPlannerHubScope = "misc" | "location" | "general";

export interface BlogPlannerHubInput {
  route_path: string;
  page_title: string;
  primary_keyword: string | null;
  is_blog_hub_misc: boolean;
  seo_title?: string | null;
  meta_description?: string | null;
}

export interface BlogPlannerDiscoveryContext {
  scope: BlogPlannerHubScope;
  routePath: string;
  pageTitle: string;
  /** Lowercase tokens that must appear in geo-anchored keywords (state name, slug, city slug). */
  geoTokens: string[];
  /** Human label for prompts, e.g. "Minnesota" or "Newport Beach, California". */
  geoLabel: string | null;
  cityLabel: string | null;
  requiresGeoAnchoring: boolean;
  serviceCoreTerms: string[];
}

function titleCaseWords(s: string): string {
  return s.replace(/\b\w/g, (c) => c.toUpperCase());
}

function parseLocationFromRoute(routePath: string): {
  geoLabel: string;
  geoTokens: string[];
  cityLabel: string | null;
} | null {
  const segments = routePath.split("/").filter(Boolean).map((s) => s.toLowerCase());
  const saIdx = segments.indexOf("service-areas");
  if (saIdx < 0 || !segments[saIdx + 1]) return null;

  const stateSlug = segments[saIdx + 1];
  const stateName = US_STATE_BY_SLUG[stateSlug];
  if (!stateName) return null;

  const tokens = new Set<string>([stateSlug, stateName.toLowerCase()]);
  let cityLabel: string | null = null;

  const citySlug = segments[saIdx + 2];
  if (citySlug && !US_STATE_BY_SLUG[citySlug]) {
    const cityName = titleCaseWords(citySlug.replace(/-/g, " "));
    cityLabel = cityName;
    tokens.add(citySlug);
    for (const w of citySlug.split("-")) {
      if (w.length > 2) tokens.add(w);
    }
    for (const w of cityName.toLowerCase().split(/\s+/)) {
      if (w.length > 2) tokens.add(w);
    }
    return {
      geoLabel: `${cityName}, ${stateName}`,
      geoTokens: [...tokens],
      cityLabel,
    };
  }

  return {
    geoLabel: stateName,
    geoTokens: [...tokens],
    cityLabel: null,
  };
}

function extractGeoFromText(text: string, knownTokens: Set<string>): void {
  const lower = text.toLowerCase();
  for (const [slug, name] of Object.entries(US_STATE_BY_SLUG)) {
    if (lower.includes(slug.replace(/-/g, " ")) || lower.includes(name.toLowerCase())) {
      knownTokens.add(slug);
      knownTokens.add(name.toLowerCase());
    }
  }
}

/** Core service modifiers when the hub is about interventions / treatment (not generic blog). */
function inferServiceCoreTerms(pageTitle: string, primaryKeyword: string | null): string[] {
  const blob = `${pageTitle} ${primaryKeyword ?? ""}`.toLowerCase();
  const terms: string[] = [];
  if (/intervention/.test(blob)) terms.push("intervention");
  if (/addiction|substance|drug|alcohol/.test(blob)) terms.push("addiction");
  if (terms.length === 0) terms.push("treatment");
  return terms;
}

export function resolveBlogPlannerDiscoveryContext(hub: BlogPlannerHubInput): BlogPlannerDiscoveryContext {
  if (hub.is_blog_hub_misc) {
    return {
      scope: "misc",
      routePath: hub.route_path,
      pageTitle: hub.page_title,
      geoTokens: [],
      geoLabel: null,
      cityLabel: null,
      requiresGeoAnchoring: false,
      serviceCoreTerms: [],
    };
  }

  const fromRoute = parseLocationFromRoute(hub.route_path);
  const geoTokens = new Set<string>(fromRoute?.geoTokens ?? []);
  extractGeoFromText(hub.page_title, geoTokens);
  extractGeoFromText(hub.primary_keyword ?? "", geoTokens);
  extractGeoFromText(hub.seo_title ?? "", geoTokens);
  extractGeoFromText(hub.meta_description ?? "", geoTokens);

  const scope: BlogPlannerHubScope = fromRoute || geoTokens.size > 0 ? "location" : "general";
  const geoLabel =
    fromRoute?.geoLabel ??
    (geoTokens.size > 0
      ? titleCaseWords([...geoTokens].find((t) => t.length > 3 && !t.includes("-")) ?? "")
      : null);

  return {
    scope,
    routePath: hub.route_path,
    pageTitle: hub.page_title,
    geoTokens: [...geoTokens],
    geoLabel: geoLabel || null,
    cityLabel: fromRoute?.cityLabel ?? null,
    requiresGeoAnchoring: scope === "location" && geoTokens.size > 0,
    serviceCoreTerms: inferServiceCoreTerms(hub.page_title, hub.primary_keyword),
  };
}

/**
 * Semrush broad-match requires every seed word to appear in results — long seeds often return zero rows.
 * Location hubs need short, geo-anchored 2–3 word seeds (same pattern as manual keyword research).
 */
export function buildSemrushDiscoverySeeds(
  hub: BlogPlannerHubInput,
  ctx: BlogPlannerDiscoveryContext,
): string[] {
  const seeds = new Set<string>();
  const add = (raw: string) => {
    const p = cleanSeedPhrase(raw) || raw.trim().toLowerCase();
    if (!p) return;
    const words = p.split(/\s+/).filter(Boolean);
    if (words.length >= 1 && words.length <= 4) seeds.add(p);
  };

  if (ctx.requiresGeoAnchoring && ctx.geoLabel) {
    const geo = ctx.geoLabel.toLowerCase();
    const stateOnly = ctx.cityLabel
      ? ctx.geoLabel.split(",")[1]?.trim().toLowerCase() ?? geo
      : geo;

    add(`${stateOnly} addiction intervention`);
    add(`addiction intervention ${stateOnly}`);
    add(`${stateOnly} alcohol intervention`);
    add(`drug intervention ${stateOnly}`);
    add(`mental health intervention ${stateOnly}`);

    if (ctx.cityLabel) {
      const city = ctx.cityLabel.toLowerCase();
      add(`${city} addiction intervention`);
      add(`addiction intervention ${city}`);
    }
  }

  const pk = hub.primary_keyword?.trim();
  if (pk) add(pk);

  const slug = routeSlugToSeed(hub.route_path);
  if (slug) add(slug);

  const titleCleaned = cleanSeedPhrase(hub.page_title);
  if (titleCleaned) add(titleCleaned);

  if (seeds.size === 0) {
    add(hub.primary_keyword?.trim() || hub.page_title || slug || "addiction intervention");
  }

  return [...seeds].slice(0, 6);
}

export function phraseMatchesGeo(phrase: string, geoTokens: string[]): boolean {
  const lower = phrase.toLowerCase();
  return geoTokens.some((t) => t.length > 2 && lower.includes(t));
}

export function isRelevantSemrushSuggestion(
  phrase: string,
  ctx: BlogPlannerDiscoveryContext,
): boolean {
  if (SEMRUSH_NOISE_PATTERN.test(phrase)) return false;
  if (!ctx.requiresGeoAnchoring) return true;
  return phraseMatchesGeo(phrase, ctx.geoTokens);
}

export function filterSemrushSuggestionsForHub(
  rows: SemrushKeywordSuggestion[],
  ctx: BlogPlannerDiscoveryContext,
  opts?: { minVolume?: number },
): SemrushKeywordSuggestion[] {
  const minVol = ctx.requiresGeoAnchoring ? (opts?.minVolume ?? 0) : (opts?.minVolume ?? 10);
  return rows.filter(
    (r) => r.searchVolume >= minVol && isRelevantSemrushSuggestion(r.phrase, ctx),
  );
}

export function buildAiTopicDiscoveryPromptBlock(
  ctx: BlogPlannerDiscoveryContext,
  siteUrl: string,
  semrushHints: string[],
): string {
  if (ctx.scope === "misc") {
    return `Hub type: miscellaneous / news-style topics not tied to one service page.`;
  }

  const lines: string[] = [
    `Hub route: ${ctx.routePath}`,
    `Hub page title: ${ctx.pageTitle}`,
  ];

  if (ctx.requiresGeoAnchoring && ctx.geoLabel) {
    lines.push(
      "",
      `CRITICAL — GEOGRAPHIC SCOPE`,
      `This hub exists only to support the ${ctx.geoLabel} location/service-area page.`,
      `Every primary_keyword MUST include the location (${ctx.geoLabel}) — e.g. "${ctx.geoLabel.toLowerCase()} addiction intervention", not generic "what is an intervention".`,
      `Every suggested_title and suggested_h1 must clearly be about ${ctx.geoLabel} (local laws, resources, access, families in that area).`,
      `Do NOT suggest nationwide generic intervention FAQs with no mention of ${ctx.geoLabel}.`,
    );
  } else if (ctx.scope === "general") {
    lines.push(
      "",
      `Anchor all topics to this specific service page's subject — stay on the same intent as "${ctx.pageTitle}", not tangential national topics.`,
    );
  }

  if (semrushHints.length > 0) {
    lines.push(
      "",
      `Semrush keywords with search demand (use as inspiration; prefer these angles when relevant):`,
      ...semrushHints.slice(0, 12).map((h) => `- ${h}`),
    );
  }

  lines.push("", `Site: ${siteUrl}`);
  return lines.join("\n");
}
