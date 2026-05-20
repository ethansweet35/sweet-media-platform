import type { Config } from "tailwindcss";

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "tfrf-blue": "#1B5FA0",
        "deep-navy": "#0C2640",
        "sky-blue": "#5A8FBA",
        "powder-blue": "#B8CEDF",
        "soft-white": "#F7F9FC",
        "pure-white": "#FFFFFF",
        "mist": "#ECF1F6",
        "slate": "#5A6B7D",
        "stone-blue": "#8497A8",
      },
      fontFamily: {
        display: ['"Playfair Display"', "Georgia", "serif"],
        body: ['"Inter"', "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-xl": ["clamp(56px, 8vw, 120px)", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        "display-l": ["clamp(44px, 5.5vw, 80px)", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        "display-m": ["clamp(36px, 3.5vw, 56px)", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        "display-s": ["clamp(28px, 2.5vw, 36px)", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        "body-l": ["clamp(18px, 1.4vw, 22px)", { lineHeight: "1.6" }],
        "body-m": ["17px", { lineHeight: "1.55" }],
        "body-s": ["15px", { lineHeight: "1.55" }],
        "caption": ["13px", { lineHeight: "1.5" }],
        "eyebrow": ["12px", { lineHeight: "1.4", letterSpacing: "0.15em" }],
      },
      spacing: {
        "space-1": "4px",
        "space-2": "8px",
        "space-3": "16px",
        "space-4": "24px",
        "space-5": "40px",
        "space-6": "64px",
        "space-7": "96px",
        "space-8": "160px",
        "space-9": "240px",
      },
      maxWidth: {
        "content": "1440px",
        "bleed": "1680px",
      },
    },
  },
  plugins: [],
} satisfies Config;