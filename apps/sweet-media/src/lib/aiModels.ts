export interface AIModel {
  id: string;
  displayName: string;
  description: string;
  isDefault?: boolean;
}

export const AI_MODELS: AIModel[] = [
  {
    id: "anthropic/claude-sonnet-4.6",
    displayName: "Claude Sonnet 4.6",
    description: "Best balance of quality and cost. Great default for most posts.",
    isDefault: true,
  },
  {
    id: "anthropic/claude-opus-4.7",
    displayName: "Claude Opus 4.7",
    description:
      "Premium quality. Use for high-stakes posts, complex topics, or when first draft must be excellent.",
  },
  {
    id: "openai/gpt-5.5-pro",
    displayName: "GPT-5.5 Pro",
    description: "OpenAI's flagship. Different voice than Claude—try when Claude output feels stale.",
  },
  {
    id: "openai/gpt-5.4-mini",
    displayName: "GPT-5.4 Mini",
    description: "Cheap and fast. Use for low-stakes filler posts.",
  },
  {
    id: "google/gemini-pro-latest",
    displayName: "Gemini Pro (latest)",
    description: "Strong at research-heavy posts. Different angle on the same topic.",
  },
];

export const DEFAULT_MODEL_ID = AI_MODELS.find((m) => m.isDefault)?.id ?? AI_MODELS[0].id;

export const ALLOWED_MODEL_IDS = new Set(AI_MODELS.map((m) => m.id));
