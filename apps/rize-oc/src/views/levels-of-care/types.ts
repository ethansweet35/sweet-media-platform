export interface LevelStat {
  value: string;
  label: string;
}

export interface LevelFeature {
  icon: string;
  title: string;
  desc: string;
}

export interface LevelStep {
  num: string;
  title: string;
  desc: string;
}

export interface CandidacyItem {
  label: string;
}

export interface LevelOfCareData {
  /** Short label for the eyebrow — e.g. "Levels of Care" */
  eyebrow: string;
  /** Full program name */
  heading: string;
  /** Hero subheading — one sentence */
  tagline: string;
  /** 3-4 stats for the hero band */
  stats: LevelStat[];
  /** Supabase CDN image URL */
  heroImage: string;
  heroImageAlt: string;

  /** Overview section */
  overviewTitle: string;
  overviewBody: string[];
  overviewFeatures: LevelFeature[];

  /** What to expect section */
  expectTitle: string;
  expectBody: string;
  expectSteps: LevelStep[];

  /** Who is a candidate */
  candidacyTitle: string;
  candidacyBody: string;
  candidacyItems: CandidacyItem[];

  /** Other levels — links at the bottom */
  nextLevel?: { label: string; href: string };
  prevLevel?: { label: string; href: string };
}
