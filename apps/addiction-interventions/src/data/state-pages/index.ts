import type { StatePageConfig } from "@/components/templates/StatePageTemplate";
import { additionalUsStatePages } from "./additional-us-states";
import { builtInStatePages } from "./built-in";
import { californiaStatePage } from "./california";

export const STATE_PAGES: Record<string, StatePageConfig> = {
  ...builtInStatePages,
  california: californiaStatePage,
  ...additionalUsStatePages,
};
