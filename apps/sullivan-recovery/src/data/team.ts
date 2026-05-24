const IMG_BASE =
  "https://knvkrhwlflkulybcmgmq.supabase.co/storage/v1/object/public/site-assets/images";

export type TeamMember = {
  slug: string;
  name: string;
  role: string;
  image: string;
  /** Leadership — shown in dark moss mosaic */
  featured?: boolean;
};

export const TEAM_MEMBERS: TeamMember[] = [
  {
    slug: "cory-sullivan",
    name: "Cory Sullivan",
    role: "CEO",
    image: `${IMG_BASE}/sr_team_cory-sullivan.png`,
    featured: true,
  },
  {
    slug: "tyson-sullivan",
    name: "Tyson Sullivan",
    role: "COO / Co-Founder",
    image: `${IMG_BASE}/sr_team_tyson-sullivan.png`,
    featured: true,
  },
  {
    slug: "anna-sullivan",
    name: "Anna Sullivan",
    role: "Co-Owner",
    image: `${IMG_BASE}/sr_team_anna-sullivan.png`,
    featured: true,
  },
  {
    slug: "brad-bailey",
    name: "Brad Bailey",
    role: "Director of Outreach",
    image: `${IMG_BASE}/sr_team_brad-bailey.png`,
    featured: true,
  },
  {
    slug: "chandra-medina",
    name: "Chandra Medina",
    role: "Clinical Supervisor / LMFT",
    image: `${IMG_BASE}/sr_team_chandra-medina.png`,
  },
  {
    slug: "amy-pride",
    name: "Amy Pride",
    role: "AMFT / Therapist",
    image: `${IMG_BASE}/sr_team_amy-pride.png`,
  },
  {
    slug: "tj-sullivan",
    name: "TJ Sullivan",
    role: "Clinical Case Manager",
    image: `${IMG_BASE}/sr_team_tj-sullivan.png`,
  },
  {
    slug: "amber-conley",
    name: "Amber Conley",
    role: "Detox Manager",
    image: `${IMG_BASE}/sr_team_amber-conley.png`,
  },
  {
    slug: "jonah-bautista",
    name: "Jonah Bautista",
    role: "LVN",
    image: `${IMG_BASE}/sr_team_jonah-bautista.png`,
  },
  {
    slug: "alejandro-alva",
    name: "Alejandro Alva",
    role: "MD",
    image: `${IMG_BASE}/sr_team_alejandro-alva.jpg`,
  },
  {
    slug: "bobby-campbell",
    name: "Bobby Campbell",
    role: "BHT RADT",
    image: `${IMG_BASE}/sr_team_bobby-campbell.png`,
  },
  {
    slug: "jacob-parker",
    name: "Jacob Parker",
    role: "RADT-1 Detox Tech",
    image: `${IMG_BASE}/sr_team_jacob-parker.png`,
  },
  {
    slug: "hunter-burson",
    name: "Hunter Burson",
    role: "BHT RADT",
    image: `${IMG_BASE}/sr_team_hunter-burson.jpg`,
  },
  {
    slug: "billy-sullivan",
    name: "Billy Sullivan",
    role: "",
    image: `${IMG_BASE}/sr_team_billy-sullivan.jpg`,
  },
];

export const TEAM_FEATURED = TEAM_MEMBERS.filter((m) => m.featured);
export const TEAM_CLINICAL = TEAM_MEMBERS.filter((m) => !m.featured);
