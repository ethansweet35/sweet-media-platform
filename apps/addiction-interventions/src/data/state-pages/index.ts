import type { StatePageConfig } from "@/components/templates/StatePageTemplate";
import { additionalUsStatePages } from "./additional-us-states";
import { builtInStatePages } from "./built-in";
import { californiaStatePage } from "./california";
import { georgiaStatePage } from "./georgia";
import { hawaiiStatePage } from "./hawaii";
import { illinoisStatePage } from "./illinois";
import { indianaStatePage } from "./indiana";
import { coloradoStatePage } from "./colorado";

export const STATE_PAGES: Record<string, StatePageConfig> = {
  ...builtInStatePages,
  california: californiaStatePage,
  georgia: georgiaStatePage,
  ...additionalUsStatePages,
  // Hawaii has a dedicated optimised file — must come after the spread to win
  hawaii: hawaiiStatePage,
  // Illinois has a dedicated SEO-optimised file — overrides additional-us-states spread
  illinois: illinoisStatePage,
  // Indiana has a dedicated SEO-optimised file — overrides additional-us-states spread
  indiana: indianaStatePage,
  // Colorado has a dedicated SEO-optimised file — overrides built-in spread
  colorado: coloradoStatePage,
};
