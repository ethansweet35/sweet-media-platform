const SUPABASE =
  "https://yfwyxafsgexejjebkwor.supabase.co/storage/v1/object/public/site-assets/images";

export type TeamGroup = "leadership" | "administration" | "clinical" | "wellness";

export type TeamMember = {
  slug: string;
  name: string;
  title: string;
  img: string;
  bio: string;
  group: TeamGroup;
};

function img(slug: string, ext: "png" | "jpg" | "webp" = "png") {
  return `${SUPABASE}/mbh_team_${slug}.${ext}`;
}

/** Full staff roster — order matches missouribehavioralhealth.com/about-us */
export const MBH_TEAM: TeamMember[] = [
  {
    slug: "james",
    name: "James Voaklander",
    title: "CEO & Founder",
    img: img("james", "png"),
    group: "leadership",
    bio: "Founder and CEO with 20+ years in healthcare leadership, business development, and building patient-centered treatment organizations across Missouri.",
  },
  {
    slug: "daniel",
    name: "Daniel Hart",
    title: "Executive Director",
    img: img("daniel", "png"),
    group: "leadership",
    bio: "CRADC, LCDC. Executive Director working in mental health and substance use treatment since 2013, known for a personable, impact-driven approach.",
  },
  {
    slug: "jen",
    name: "Jen Ramsden",
    title: "Chief Marketing Officer",
    img: img("jen", "png"),
    group: "administration",
    bio: "A decade in behavioral health marketing and outreach. Draws on her own treatment experience to help others find outpatient care that fits their lives.",
  },
  {
    slug: "karynne",
    name: "Karynne Witkin",
    title: "Chief Human Resources Officer",
    img: img("karynne", "png"),
    group: "administration",
    bio: "Industrial-organizational psychologist and leadership coach focused on employee well-being, workplace resilience, and healthy organizational culture.",
  },
  {
    slug: "andrew",
    name: "Andrew Shaffer",
    title: "Admissions Coordinator",
    img: img("andrew", "png"),
    group: "administration",
    bio: "Five+ years in admissions helping families take the first step toward recovery with a welcoming, supportive intake experience.",
  },
  {
    slug: "jake-whitcomb",
    name: "Jake Whitcomb",
    title: "Program Coordinator",
    img: img("jake-whitcomb", "jpg"),
    group: "administration",
    bio: "Certified Peer Support Specialist in long-term recovery since 2020, bringing lived experience and professional case management to client care.",
  },
  {
    slug: "shawn",
    name: "Dr. Shawn Stranckmeyer",
    title: "Medical Director",
    img: img("shawn", "png"),
    group: "leadership",
    bio: "Double board-certified in Family Medicine and Addiction Medicine. Medical director focused on integrated behavioral health and long-term recovery.",
  },
  {
    slug: "stephanie",
    name: "Stephanie Behrens",
    title: "Clinical Director",
    img: img("stephanie", "png"),
    group: "leadership",
    bio: "LPC. Clinical Director since 2014 specializing in substance use, complex trauma, co-dependency, and anxiety and depressive disorders.",
  },
  {
    slug: "darla",
    name: "Darla Evans",
    title: "Trauma Therapist · LPC",
    img: img("darla", "jpg"),
    group: "clinical",
    bio: "Licensed Professional Counselor and trauma therapist for 15 years. Practices EMDR, ego state, somatic, and attachment-based therapy. Fluent in ASL.",
  },
  {
    slug: "mary",
    name: "Mary DeMoss",
    title: "PLPC",
    img: img("mary", "jpg"),
    group: "clinical",
    bio: "Counselor for 16 years using EMDR, EFT tapping, CBT, psychotherapy, and art therapy to support clients through life's challenges.",
  },
  {
    slug: "bri",
    name: "Bri Beasley",
    title: "Therapist · LCSW",
    img: img("bri", "jpg"),
    group: "clinical",
    bio: "Licensed Clinical Social Worker for five years. Favors CBT, DBT, and solution-focused therapy with a passion for group facilitation and connection.",
  },
  {
    slug: "jake-martin",
    name: "Jake Martin",
    title: "Meditation Instructor",
    img: img("jake-martin", "jpg"),
    group: "wellness",
    bio: "Guides meditation practices that support nervous system regulation, mindfulness, and emotional balance as part of the recovery process.",
  },
  {
    slug: "brent",
    name: "Brent Gilstrap",
    title: "LPC",
    img: img("brent", "png"),
    group: "clinical",
    bio: "Licensed Professional Counselor for 25 years dedicated to identifying and supporting the strengths that help clients build lasting recovery.",
  },
  {
    slug: "morgan",
    name: "Morgan Geier",
    title: "LPC",
    img: img("morgan", "png"),
    group: "clinical",
    bio: "Trauma-informed LPC supporting teens, children, and young adults with EMDR, attachment-based care, and mindfulness for five+ years.",
  },
  {
    slug: "philip",
    name: "Philip Immekus",
    title: "Yoga Instructor",
    img: img("philip", "png"),
    group: "wellness",
    bio: "Yoga instructor whose practice deepened through his own recovery journey. Helps clients build grounding, resilience, and mind-body connection.",
  },
  {
    slug: "alex",
    name: "Alex Seaton",
    title: "Recovery Care Advocate",
    img: img("alex", "jpg"),
    group: "wellness",
    bio: "Recovery Care Advocate who uses lived experience with addiction and mental health to relate, empathize, and guide others toward lasting change.",
  },
  {
    slug: "emily",
    name: "Emily Journagan",
    title: "PLPC",
    img: img("emily", "png"),
    group: "clinical",
    bio: "Provisionally Licensed Professional Counselor with 15+ years in behavioral health. Integrates CBT, DBT, trauma-informed care, and solution-focused techniques.",
  },
  {
    slug: "monica",
    name: "Monica Loden",
    title: "Psychiatric Mental Health Nurse Practitioner",
    img: img("monica", "png"),
    group: "clinical",
    bio: "Board-certified PMHNP with 30+ years in healthcare, specializing in psychiatric evaluation, substance use treatment, and individualized medication support.",
  },
  {
    slug: "brooklynn",
    name: "Brooklynn Wright",
    title: "Licensed Master Social Worker",
    img: img("brooklynn", "png"),
    group: "clinical",
    bio: "LMSW helping clients across populations build resilience and reach their full potential through compassionate, client-centered social work.",
  },
  {
    slug: "tina",
    name: "Tina Simmons",
    title: "Licensed Master Social Worker",
    img: img("tina", "png"),
    group: "clinical",
    bio: "LMSW providing trauma-informed psychotherapy for anxiety, depression, PTSD, mood disorders, substance use, grief, and life transitions.",
  },
  {
    slug: "andrea",
    name: "Andrea Guadalupe Gonzales",
    title: "MS · LPC",
    img: img("andrea", "jpg"),
    group: "clinical",
    bio: "Licensed Professional Counselor whose background in counseling, education, and communication helps her connect warmly with diverse clients.",
  },
  {
    slug: "derrick",
    name: "Derrick Flores",
    title: "Recovery Care Advocate",
    img: img("derrick", "png"),
    group: "wellness",
    bio: "Recovery Care Advocate driven by compassion and a commitment to being present, listening actively, and supporting clients through difficult moments.",
  },
  {
    slug: "crystal",
    name: "Crystal Cramer",
    title: "LPC · Mental Health Coach",
    img: img("crystal", "png"),
    group: "clinical",
    bio: "LPC and Certified Autism Specialist with 22+ years in behavioral health, integrating CBT, attachment work, play therapy, and trauma-informed care.",
  },
  {
    slug: "kellie",
    name: "Kellie Crain",
    title: "Yoga Instructor",
    img: img("kellie", "jpg"),
    group: "wellness",
    bio: "RYT-200 yoga teacher since 2007 leading Vinyasa, Yin, recovery yoga, and more — helping clients find ease in discomfort and sustainable wellness.",
  },
];

/** Homepage leadership preview */
export const LEADERSHIP_TEAM: TeamMember[] = MBH_TEAM.filter((m) =>
  ["james", "daniel", "shawn", "stephanie"].includes(m.slug),
);

export const TEAM_GROUP_LABELS: Record<TeamGroup, string> = {
  leadership: "Leadership",
  administration: "Administration & admissions",
  clinical: "Clinical team",
  wellness: "Recovery support & wellness",
};

export const TEAM_GROUPS: TeamGroup[] = [
  "leadership",
  "administration",
  "clinical",
  "wellness",
];
