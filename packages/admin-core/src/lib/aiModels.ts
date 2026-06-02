import { OPENROUTER_HAIKU_MODEL } from "./openRouterModels";

export interface AIModel {
  id: string;
  displayName: string;
  description: string;
  isDefault?: boolean;
}

export const AI_MODELS: AIModel[] = [
  {
    id: "anthropic/claude-sonnet-4-6",
    displayName: "Claude Sonnet 4.6",
    description: "Best balance of quality and cost. Great default for most posts.",
    isDefault: true,
  },
  {
    id: "anthropic/claude-opus-4-7",
    displayName: "Claude Opus 4.7",
    description:
      "Premium quality. Use for high-stakes posts, complex topics, or when first draft must be excellent.",
  },
  {
    id: "openai/gpt-4.1",
    displayName: "GPT-4.1",
    description: "OpenAI's flagship. Different voice than Claude—try when Claude output feels stale.",
  },
  {
    id: "openai/gpt-4o-mini",
    displayName: "GPT-4o Mini",
    description: "Cheap and fast. Use for low-stakes filler posts.",
  },
  {
    id: OPENROUTER_HAIKU_MODEL,
    displayName: "Claude Haiku 4.5",
    description: "Fast and capable. Good for research-heavy posts or lower-cost drafts.",
  },
];

export const DEFAULT_MODEL_ID = AI_MODELS.find((m) => m.isDefault)?.id ?? AI_MODELS[0].id;

export const ALLOWED_MODEL_IDS = new Set(AI_MODELS.map((m) => m.id));
