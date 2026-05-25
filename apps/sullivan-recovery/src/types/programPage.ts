export type ProgramTrustItem = {
  icon: string;
  label: string;
  detail?: string;
};

export type ProgramStat = {
  value: string;
  label: string;
};

export type ProgramStep = {
  num: string;
  phase?: string;
  title: string;
  description: string;
  icon?: string;
  image?: string;
  imageAlt?: string;
};

export type ProgramBenefit = {
  title: string;
  description: string;
  icon: string;
};

export type ProgramDifferentiator = {
  title: string;
  description: string;
  icon: string;
  featured?: boolean;
};

export type ProgramAmenity = {
  title: string;
  description: string;
  icon: string;
};

export type ProgramGalleryImage = {
  src: string;
  alt: string;
  caption?: string;
};

export type ProgramSubstanceLink = {
  title: string;
  description: string;
  href: string;
  icon: string;
};

export type ProgramRelatedLink = {
  title: string;
  description: string;
  href: string;
};

export type ProgramFaq = {
  question: string;
  answer: string;
};

export type ProgramPageCta = {
  title: string;
  description: string;
};

export type ProgramPageData = {
  canonical: string;
  breadcrumb: {
    /** Additional crumbs before parent (e.g. Programs → Detox → current) */
    ancestors?: { label: string; href: string }[];
    parent: { label: string; href: string };
    current: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    titleAccent?: string;
    description: string;
    image: string;
    imageAlt: string;
    stats?: ProgramStat[];
  };
  trust: ProgramTrustItem[];
  story: {
    eyebrow?: string;
    title: string;
    titleAccent?: string;
    paragraphs: string[];
    bullets: string[];
    image: string;
    imageAlt: string;
    link?: { label: string; href: string };
  };
  stats?: ProgramStat[];
  differentiators: {
    eyebrow?: string;
    title: string;
    titleAccent?: string;
    items: ProgramDifferentiator[];
  };
  intro?: {
    eyebrow?: string;
    title: string;
    paragraphs: string[];
  };
  process: {
    eyebrow?: string;
    title: string;
    titleAccent?: string;
    description?: string;
    steps: ProgramStep[];
    image?: string;
    imageAlt?: string;
  };
  clinical?: {
    eyebrow?: string;
    title: string;
    paragraphs: string[];
    highlights: { title: string; description: string; icon: string }[];
    image: string;
    imageAlt: string;
  };
  benefits: {
    eyebrow?: string;
    title: string;
    items: ProgramBenefit[];
  };
  amenities?: {
    eyebrow?: string;
    title: string;
    description?: string;
    items: ProgramAmenity[];
    image: string;
    imageAlt: string;
  };
  gallery?: {
    eyebrow?: string;
    title: string;
    images: ProgramGalleryImage[];
  };
  substances?: {
    eyebrow?: string;
    title: string;
    description?: string;
    items: ProgramSubstanceLink[];
  };
  location?: {
    eyebrow?: string;
    title: string;
    description: string;
    bullets: string[];
    image: string;
    imageAlt: string;
    href?: string;
  };
  relatedPrograms: {
    eyebrow?: string;
    title: string;
    items: ProgramRelatedLink[];
  };
  faqs?: ProgramFaq[];
  cta?: ProgramPageCta;
};
