import { supabase } from "./supabase";

/**
 * Auto-internal linking system for blog content.
 *
 * Strategy:
 * 1. Service pages get high priority (100) for BROAD terms only — "seo",
 *    "paid media", "web development", etc.
 * 2. Blog posts extract natural, specific phrases from their titles with
 *    priority 60–95. When a blog post covers a specific sub-topic (e.g.
 *    "Local SEO", "Google Ads", "Technical SEO"), its phrase beats the
 *    broad service-page term because it is longer / more specific.
 * 3. When multiple mappings match the same text, the longest match at each
 *    position wins. This lets "Local SEO for Rehab Centers" link to its
 *    blog post while "seo" alone links to the service page.
 * 4. Existing markdown links are never overwritten.
 * 5. Each destination page is linked at most once per blog post.
 * 6. Manual mappings: ALL keyword variations for a URL stay in the map and
 *    compete — whichever one appears in a given post wins. This means
 *    "medical seo" and "seo for medical practices" both point to the same
 *    URL, and whichever phrase actually appears in a post gets the link.
 * 7. Auto-extracted title phrases: deduped to one per URL (longest wins)
 *    and only generated when no manual mapping exists for that URL.
 */

export interface AutoLinkMapping {
  keyword: string;
  href: string;
  priority: number;
}

export interface LinkSegment {
  type: "text" | "link";
  content: string;
  href?: string;
}

/* ── Static mappings (service pages, case studies) ─────────────────────
 *
 * RULE: Only broad service-level terms here.  Specific sub-topics
 * ("local seo", "google ads", "technical seo", etc.) are left for
 * blog posts to claim so the most relevant content wins the link.
 */

const STATIC_MAPPINGS: AutoLinkMapping[] = [
  // Paid Media — broad only
  { keyword: "paid media", href: "/paid-media", priority: 100 },

  // SEO — broad only
  { keyword: "seo", href: "/seo", priority: 100 },
  { keyword: "search engine optimization", href: "/seo", priority: 100 },

  // Social Media — broad only
  { keyword: "social media marketing", href: "/social-media", priority: 100 },

  // Web Development — broad only
  { keyword: "web development", href: "/web-dev", priority: 100 },
  { keyword: "website design", href: "/web-dev", priority: 100 },
  { keyword: "web design", href: "/web-dev", priority: 100 },

  // Other key pages
  { keyword: "industries", href: "/industries", priority: 90 },
  { keyword: "healthcare marketing", href: "/industries", priority: 90 },
  { keyword: "treatment center marketing", href: "/industries", priority: 90 },
  { keyword: "results", href: "/results", priority: 90 },
  { keyword: "case studies", href: "/results", priority: 90 },

  // Case studies
  { keyword: "california prime recovery", href: "/case-studies/california-prime-recovery", priority: 85 },
  { keyword: "rize oc", href: "/case-studies/rize-oc", priority: 85 },
];

/* ── Phrase extraction helpers ─────────────────────────────────────────── */

/** Single-word or ultra-short phrases that should never link. */
const TOO_GENERIC = new Set([
  "marketing",
  "digital marketing",
  "healthcare",
  "treatment center",
  "rehab",
  "addiction",
  "mental health",
  "behavioral health",
  "patient",
  "admissions",
  "website",
  "blog",
  "article",
  "guide",
  "strategy",
  "tips",
  "best practices",
  "the",
  "a",
  "an",
  "how to",
  "why",
  "what",
  "when",
  "where",
]);

function isTooGeneric(phrase: string): boolean {
  const lower = phrase.toLowerCase().trim();
  if (TOO_GENERIC.has(lower)) return true;
  if (lower.length < 8) return true;
  if (lower.split(/\s+/).length < 2) return true;
  return false;
}

/**
 * Pull natural, link-worthy phrases out of a blog post title.
 * Returns multiple candidates so the longest / most specific one can win
 * at match time.
 */
function extractPhrasesFromTitle(title: string): string[] {
  const phrases: string[] = [];
  const clean = title.trim();

  // 1. Everything before the colon (the "topic" of the post)
  const colonIdx = clean.indexOf(":");
  if (colonIdx !== -1 && colonIdx > 5) {
    const beforeColon = clean
      .slice(0, colonIdx)
      .trim()
      .replace(/^(The|A|An)\s+/i, "");
    if (!isTooGeneric(beforeColon) && beforeColon.length <= 70) {
      phrases.push(beforeColon);
    }
  }

  // 2. The meat after "How to / Why / What / When / Where"
  const questionMatch = clean.match(
    /^(How to|Why|What|When|Where)\s+(.+?)(?:\s*[:?]|$)/i
  );
  if (questionMatch) {
    const phrase = questionMatch[2]
      .trim()
      .replace(/^(The|A|An)\s+/i, "");
    if (!isTooGeneric(phrase) && phrase.length >= 8 && phrase.length <= 70) {
      phrases.push(phrase);
    }
  }

  // 3. First 2–6 words as fallback (skip leading articles)
  const noArticles = clean.replace(/^(The|A|An)\s+/i, "");
  const words = noArticles.split(/\s+/);
  if (words.length >= 2) {
    for (let count = 2; count <= Math.min(6, words.length); count++) {
      const phrase = words.slice(0, count).join(" ");
      if (!isTooGeneric(phrase) && phrase.length >= 8 && phrase.length <= 60) {
        phrases.push(phrase);
      }
    }
  }

  // Deduplicate (case-insensitive)
  const seen = new Set<string>();
  const unique: string[] = [];
  for (const p of phrases) {
    const lower = p.toLowerCase();
    if (!seen.has(lower)) {
      seen.add(lower);
      unique.push(p);
    }
  }
  return unique;
}

/* ── Build the full keyword map ────────────────────────────────────────── */

/**
 * Fetch manually-configured internal link mappings from Supabase.
 * These are user-defined anchor text → URL pairs with custom priority.
 */
export async function fetchManualLinkMappings(): Promise<AutoLinkMapping[]> {
  const { data, error } = await supabase
    .from("internal_links")
    .select("keyword, href, priority")
    .eq("active", true)
    .order("priority", { ascending: false });

  if (error || !data) return [];
  return data.map((row) => ({
    keyword: row.keyword,
    href: row.href,
    priority: row.priority,
  }));
}

/**
 * Build a keyword map using ONLY manual mappings — no auto-extracted title
 * phrases, no static service page terms. Use this for blog post body content
 * so only explicitly configured anchor text gets linked.
 */
export function buildManualOnlyLinkMap(
  manualMappings: AutoLinkMapping[]
): AutoLinkMapping[] {
  if (!manualMappings || manualMappings.length === 0) return [];
  return manualMappings
    .map((m) => ({ ...m, priority: Math.min(200, m.priority + 50) }))
    .sort((a, b) => b.priority - a.priority);
}

/**
 * Build a keyword-to-href mapping from blog posts + static service pages
 * + optional manual mappings from the admin panel.
 *
 * Manual mappings always win deduplication for their URL — auto-extracted
 * title phrases only fill in for URLs that have no manual mapping.
 */
export function buildAutoLinkMap(
  posts: { slug: string; title: string; category: string; tags: string[] }[],
  manualMappings: AutoLinkMapping[] = []
): AutoLinkMapping[] {
  // Track which hrefs have an explicit manual mapping — these are protected
  // and auto-extracted phrases will never override them.
  const manualHrefs = new Set(manualMappings.map((m) => m.href));

  // Boost manual priority so they beat everything at match time too.
  const boostedManuals = manualMappings.map((m) => ({
    ...m,
    priority: Math.min(200, m.priority + 50),
  }));

  const mappings: AutoLinkMapping[] = [...boostedManuals, ...STATIC_MAPPINGS];
  const seenKeywords = new Set<string>();

  for (const m of mappings) {
    seenKeywords.add(m.keyword.toLowerCase());
  }

  for (const post of posts) {
    if (!post.slug || !post.title) continue;

    const postHref = `/blog/${post.slug}`;

    // If this blog post's URL already has a manual mapping, skip
    // auto-extraction entirely — the manual keyword owns this URL.
    if (manualHrefs.has(postHref)) continue;

    const phrases = extractPhrasesFromTitle(post.title);

    for (const phrase of phrases) {
      const phraseLower = phrase.toLowerCase();

      // Exact duplicate keyword — skip
      if (seenKeywords.has(phraseLower)) continue;

      // If the blog phrase is a *substring* of a static keyword it is too
      // generic and the static page should win (e.g. "media" inside
      // "paid media").
      let coveredByStatic = false;
      for (const staticMap of STATIC_MAPPINGS) {
        const staticLower = staticMap.keyword.toLowerCase();
        if (staticLower.includes(phraseLower) && phraseLower !== staticLower) {
          coveredByStatic = true;
          break;
        }
      }
      if (coveredByStatic) continue;

      // Priority: longer / more specific phrases get higher priority.
      // Range 60–95 ensures blog phrases beat broad static terms (100)
      // when they are longer matches at the same position.
      const priority = Math.min(95, 60 + phrase.length);

      mappings.push({
        keyword: phrase,
        href: postHref,
        priority,
      });
      seenKeywords.add(phraseLower);
    }
  }

  // Deduplicate by href — but ONLY for auto-extracted phrases.
  // Manual mappings all survive so every keyword variation can fire
  // in whichever post actually contains it.
  const manualKeywordSet = new Set(boostedManuals.map((m) => m.keyword.toLowerCase()));

  const hrefMap = new Map<string, AutoLinkMapping>();
  const finalMappings: AutoLinkMapping[] = [];

  for (const m of mappings) {
    const isManual = manualKeywordSet.has(m.keyword.toLowerCase());
    if (isManual) {
      // All manual mappings go through unconditionally
      finalMappings.push(m);
    } else {
      // Auto-extracted: keep only the longest keyword per href
      const existing = hrefMap.get(m.href);
      if (!existing || m.keyword.length > existing.keyword.length) {
        hrefMap.set(m.href, m);
      }
    }
  }

  // Add the winning auto-extracted phrase for each href
  for (const m of hrefMap.values()) {
    finalMappings.push(m);
  }

  // Sort by priority descending so high-priority terms are considered first
  return finalMappings.sort((a, b) => b.priority - a.priority);
}

/* ── Auto-link text ───────────────────────────────────────────────────── */

interface Match {
  start: number;
  end: number;
  keyword: string;
  href: string;
  priority: number;
}

// Words that can follow a keyword without it being considered "mid-phrase".
// e.g. "medical seo is important" → "seo" followed by "is" → still links.
// e.g. "medical seo strategy" → "seo" followed by "strategy" → skip, mid-phrase.
const PHRASE_STOPWORDS = new Set([
  "is", "are", "was", "were", "has", "have", "had", "be", "been",
  "the", "a", "an", "and", "or", "but", "in", "on", "at", "to",
  "for", "of", "with", "by", "from", "that", "this", "it", "its",
  "can", "will", "may", "should", "would", "could", "not", "no",
  "as", "if", "so", "do", "does", "did", "your", "our", "their",
  "you", "we", "they", "he", "she", "i", "my", "his", "her",
  "more", "most", "also", "than", "then", "when", "where", "how",
  "what", "which", "who", "all", "any", "each", "both", "few",
  "into", "through", "during", "before", "after", "above", "below",
  "between", "out", "off", "over", "under", "again", "further",
  "once", "here", "there", "why", "while", "about", "against",
  "up", "down", "just", "because", "until", "although", "since",
  "across", "among", "within", "without", "toward", "towards",
]);

/**
 * Returns true if the keyword at position idx is immediately followed by
 * a non-stopword, meaning it's part of a longer phrase and should NOT link.
 */
function isMidPhrase(text: string, idx: number, keywordLength: number): boolean {
  const afterEnd = idx + keywordLength;
  const rest = text.slice(afterEnd);
  // Check if next token is a word (space then letters)
  const m = rest.match(/^\s+([a-zA-Z]+)/);
  if (!m) return false; // end of string or punctuation follows — not mid-phrase
  const nextWord = m[1].toLowerCase();
  // If next word is a stopword, the keyword is at a natural phrase boundary
  return !PHRASE_STOPWORDS.has(nextWord);
}

/**
 * Scan text for all possible keyword matches, then select the best
 * non-overlapping set.  At any given position the *longest* match wins,
 * which lets specific blog phrases beat shorter service-page terms when
 * they share the same start index (e.g. "Local SEO" beats "seo").
 *
 * `usedHrefs` tracks which destination pages have already been linked
 * elsewhere in the same blog post. Each href is linked at most once.
 */
export function autoLinkText(
  text: string,
  mappings: AutoLinkMapping[],
  currentSlug?: string,
  usedHrefs?: Set<string>,
  maxLinks: number = 4
): LinkSegment[] {
  if (!text || mappings.length === 0) {
    return [{ type: "text", content: text }];
  }

  const textLower = text.toLowerCase();
  const matches: Match[] = [];

  for (const mapping of mappings) {
    if (currentSlug && mapping.href === `/blog/${currentSlug}`) continue;

    const keywordLower = mapping.keyword.toLowerCase();
    let pos = 0;

    while (true) {
      const idx = textLower.indexOf(keywordLower, pos);
      if (idx === -1) break;

      pos = idx + 1;

      // Word-boundary guard — must not be adjacent to a word character
      const before = idx > 0 ? text[idx - 1] : " ";
      const after =
        idx + mapping.keyword.length < text.length
          ? text[idx + mapping.keyword.length]
          : " ";
      const isWordChar = (c: string) => /[a-zA-Z0-9]/.test(c);
      if (isWordChar(before) || isWordChar(after)) continue;

      // Phrase-continuation guard — skip if keyword is mid-phrase
      // e.g. "seo" in "medical seo strategy" should NOT link
      if (isMidPhrase(text, idx, mapping.keyword.length)) continue;

      // Make sure we are not inside an existing markdown link `[...](...)`
      const beforeText = text.slice(0, idx);
      const open = (beforeText.match(/\[/g) || []).length;
      const close = (beforeText.match(/\]/g) || []).length;
      if (open > close) continue;

      matches.push({
        start: idx,
        end: idx + mapping.keyword.length,
        keyword: mapping.keyword,
        href: mapping.href,
        priority: mapping.priority,
      });
    }
  }

  // Sort: start position ascending, then length descending (longer wins),
  // then priority descending as tie-breaker.
  matches.sort((a, b) => {
    if (a.start !== b.start) return a.start - b.start;
    const lenDiff = b.end - b.start - (a.end - a.start);
    if (lenDiff !== 0) return lenDiff;
    return b.priority - a.priority;
  });

  // Greedily pick non-overlapping matches, respecting the per-page
  // "one link per destination" rule via `usedHrefs`.
  const selected: Match[] = [];
  const used: [number, number][] = [];
  const localUsedHrefs = usedHrefs ?? new Set<string>();

  for (const m of matches) {
    // Skip if this destination was already linked elsewhere on the page
    if (localUsedHrefs.has(m.href)) continue;

    let overlaps = false;
    for (const [s, e] of used) {
      if (m.start < e && m.end > s) {
        overlaps = true;
        break;
      }
    }
    if (!overlaps) {
      selected.push(m);
      used.push([m.start, m.end]);
      localUsedHrefs.add(m.href);
      if (selected.length >= maxLinks) break;
    }
  }

  selected.sort((a, b) => a.start - b.start);

  // Build segments
  const segments: LinkSegment[] = [];
  let lastEnd = 0;

  for (const m of selected) {
    if (m.start > lastEnd) {
      segments.push({ type: "text", content: text.slice(lastEnd, m.start) });
    }
    segments.push({
      type: "link",
      content: text.slice(m.start, m.end),
      href: m.href,
    });
    lastEnd = m.end;
  }

  if (lastEnd < text.length) {
    segments.push({ type: "text", content: text.slice(lastEnd) });
  }

  return segments.length > 0 ? segments : [{ type: "text", content: text }];
}
