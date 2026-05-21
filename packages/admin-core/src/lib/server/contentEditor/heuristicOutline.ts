/**
 * Heuristic outline synthesis for lite Content Editor analysis.
 * Clusters recurring competitor H2/H3 headings without an LLM call.
 */
import type { OutlineSection } from "./prompts";

const SKIP_HEADING =
  /\b(about us|contact|newsletter|subscribe|related|sources|references|table of contents|share this|read more|comments|footer|menu|login|sign up)\b/i;

function normalizeHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function buildHeuristicOutline(opts: {
  primaryKeyword: string;
  targetWordCount: number;
  competitorHeadings: Array<{
    domain: string;
    headings: Array<{ level: number; text: string }>;
  }>;
}): OutlineSection[] {
  const counts = new Map<
    string,
    { text: string; level: number; score: number; h3Children: Map<string, number> }
  >();

  for (const comp of opts.competitorHeadings) {
    for (const h of comp.headings) {
      if (h.level !== 2 && h.level !== 3) continue;
      const text = h.text.trim();
      if (!text || text.length < 4 || SKIP_HEADING.test(text)) continue;
      const key = normalizeHeading(text);
      if (!key) continue;
      if (h.level === 2) {
        const existing = counts.get(key);
        if (existing) {
          existing.score += 2;
        } else {
          counts.set(key, { text, level: 2, score: 2, h3Children: new Map() });
        }
      } else {
        let parentKey: string | null = null;
        let parentScore = 0;
        for (const [pk, pv] of counts) {
          if (pv.score > parentScore) {
            parentScore = pv.score;
            parentKey = pk;
          }
        }
        if (parentKey) {
          const parent = counts.get(parentKey)!;
          parent.h3Children.set(key, (parent.h3Children.get(key) ?? 0) + 1);
        } else {
          const existing = counts.get(key);
          if (existing) existing.score += 1;
          else counts.set(key, { text, level: 3, score: 1, h3Children: new Map() });
        }
      }
    }
  }

  const h2Sections = [...counts.values()]
    .filter((c) => c.level === 2)
    .sort((a, b) => b.score - a.score)
    .slice(0, 12);

  if (h2Sections.length < 4) {
    const fallback = [
      `What is ${opts.primaryKeyword}?`,
      `Who needs ${opts.primaryKeyword}?`,
      `How ${opts.primaryKeyword} works`,
      `Benefits and outcomes`,
      `What to expect`,
      `Getting started`,
      `Frequently asked questions`,
    ];
    const perSection = Math.max(150, Math.round(opts.targetWordCount / fallback.length));
    return fallback.map((text) => ({
      level: 2,
      text,
      estimated_words: perSection,
    }));
  }

  const totalSections = h2Sections.reduce(
    (n, s) => n + 1 + [...s.h3Children.entries()].filter(([, c]) => c >= 2).slice(0, 3).length,
    0,
  );
  const baseWords = Math.max(120, Math.round(opts.targetWordCount / Math.max(1, totalSections)));

  const outline: OutlineSection[] = [];
  for (const section of h2Sections) {
    outline.push({
      level: 2,
      text: section.text,
      estimated_words: baseWords,
    });
    const h3s = [...section.h3Children.entries()]
      .filter(([, c]) => c >= 2)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3);
    for (const [childKey] of h3s) {
      const childEntry = counts.get(childKey);
      if (childEntry) {
        outline.push({
          level: 3,
          text: childEntry.text,
          estimated_words: Math.max(80, Math.round(baseWords * 0.6)),
        });
      }
    }
  }

  return outline;
}
