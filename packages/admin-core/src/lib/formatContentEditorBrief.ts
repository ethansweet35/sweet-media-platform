import type {
  ContentEditorFactRow,
  ContentEditorOutlineRow,
  ContentEditorQuestionRow,
  ContentEditorTermRow,
} from "../types/content-editor";

/** Minimal term shape accepted by the brief formatter (full rows or API subsets). */
export type ContentEditorBriefTerm = Pick<
  ContentEditorTermRow,
  "term" | "min_recommended_uses" | "max_recommended_uses" | "user_blacklisted" | "user_included"
> & { is_heading_recommended?: boolean };

export type ContentEditorBriefQuestion = Pick<
  ContentEditorQuestionRow,
  "question" | "user_dismissed"
>;

export type ContentEditorBriefFact = Pick<ContentEditorFactRow, "fact_text" | "user_dismissed">;

export type ContentEditorBriefOutline = Pick<
  ContentEditorOutlineRow,
  "heading_level" | "heading_text" | "position"
>;

export interface ContentEditorBriefPayload {
  editor: {
    primary_keyword: string;
    recommended_word_count_min?: number | null;
    recommended_word_count_max?: number | null;
    recommended_word_count_target?: number | null;
    recommended_h2_min?: number | null;
    recommended_h2_max?: number | null;
    target_score?: number | null;
    competitor_avg_score?: number | null;
  };
  terms?: ContentEditorBriefTerm[];
  questions?: ContentEditorBriefQuestion[];
  facts?: ContentEditorBriefFact[];
  outline?: ContentEditorBriefOutline[];
}

/** Plaintext SEO brief for AI blog generation (Blog Writer, bulk rewrite, etc.). */
export function formatContentEditorBrief(state: ContentEditorBriefPayload): string {
  const parts: string[] = [];
  const editor = state.editor;

  parts.push(`Primary keyword: ${editor.primary_keyword}`);
  parts.push("");

  if (editor.recommended_word_count_min != null && editor.recommended_word_count_max != null) {
    parts.push("=== STRUCTURAL TARGETS ===");
    parts.push(
      `Target word count: ${editor.recommended_word_count_min}–${editor.recommended_word_count_max} words`,
    );
    if (editor.recommended_word_count_target != null) {
      parts.push(`Ideal target: ${editor.recommended_word_count_target} words`);
    }
    if (editor.recommended_h2_min != null && editor.recommended_h2_max != null) {
      parts.push(`H2 sections: ${editor.recommended_h2_min}–${editor.recommended_h2_max}`);
    }
    if (editor.target_score != null) {
      parts.push(`Target content score: ${Math.round(editor.target_score)}`);
    }
    parts.push("");
  }

  const outline = [...(state.outline ?? [])].sort((a, b) => a.position - b.position);
  if (outline.length > 0) {
    parts.push("=== RECOMMENDED OUTLINE ===");
    for (const s of outline) {
      const prefix = s.heading_level === 3 ? "  H3: " : "H2: ";
      parts.push(`${prefix}${s.heading_text}`);
    }
    parts.push("");
  }

  const activeTerms = (state.terms ?? []).filter(
    (t) => !t.user_blacklisted && t.user_included !== false,
  );
  if (activeTerms.length > 0) {
    parts.push("=== NLP TERMS (use each term at the specified frequency) ===");
    for (const t of activeTerms.slice(0, 60)) {
      const headingNote = t.is_heading_recommended ? " — USE AS HEADING" : "";
      parts.push(`- ${t.term}: ${t.min_recommended_uses}–${t.max_recommended_uses} uses${headingNote}`);
    }
    parts.push("");
  }

  const activeQuestions = (state.questions ?? []).filter((q) => !q.user_dismissed);
  if (activeQuestions.length > 0) {
    parts.push("=== QUESTIONS TO ANSWER ===");
    for (const q of activeQuestions.slice(0, 15)) {
      parts.push(`- ${q.question}`);
    }
    parts.push("");
  }

  const activeFacts = (state.facts ?? []).filter((f) => !f.user_dismissed);
  if (activeFacts.length > 0) {
    parts.push("=== KEY FACTS TO COVER (paraphrase — do not copy verbatim) ===");
    for (const f of activeFacts.slice(0, 20)) {
      parts.push(`- ${f.fact_text}`);
    }
    parts.push("");
  }

  parts.push("COVERAGE REQUIREMENT: Address outline sections, questions, and NLP terms throughout the post.");

  return parts.join("\n").trim();
}
