import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      // Marketing copy uses apostrophes and quotes freely — only forbid chars that break JSX.
      "react/no-unescaped-entities": ["error", { forbid: [">", "}"] }],
    },
  },
  globalIgnores([
    ".next/**",
    "simple-health/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "scripts/**",
    "supabase/functions/**",
    "readdy-export/**",
  ]),
]);

export default eslintConfig;
