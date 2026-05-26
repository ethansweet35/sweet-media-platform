import type { BlogPost, BlogSection } from "@sweetmedia/blog-core";
import { ADOLESCENT_IOP_IMGS, VIOP_IMGS } from "@/lib/site";

/** Static demo content — used by /blog/demo before real posts are imported. */
export const DEMO_BLOG_SECTIONS: BlogSection[] = [
  { type: "h2", text: "What is Virtual IOP for teens?" },
  {
    type: "paragraph",
    text: "Virtual Intensive Outpatient Program (IOP) is structured mental health treatment for adolescents who need more support than weekly therapy but do not require inpatient hospitalization. Teens attend live video sessions several days per week while continuing to live at home and stay connected to school.",
  },
  {
    type: "paragraph",
    text: "At Adolescent Mental Health, Virtual IOP combines evidence-based therapies — including [Cognitive Behavioral Therapy (CBT)](/online-cbt-for-teens), [Dialectical Behavior Therapy (DBT)](/online-dbt-for-teens), and family support — with a team experienced in anxiety, depression, school avoidance, and mood disorders in teens ages 12–17.",
  },
  {
    type: "callout",
    variant: "tip",
    text: "Virtual IOP can be a strong fit when your teen needs structured care but transportation, scheduling, or school attendance make in-person programs difficult to sustain.",
  },
  { type: "h2", text: "Who is a good candidate?" },
  {
    type: "paragraph",
    text: "Not every teen needs the same level of care. Virtual IOP works especially well when symptoms are interfering with school, friendships, sleep, or family life — but your teen is medically stable enough to participate safely from home.",
  },
  {
    type: "list",
    items: [
      "Anxiety, depression, or mood symptoms that are worsening despite weekly therapy",
      "School avoidance, refusal, or difficulty re-engaging after a mental health crisis",
      "Self-harm urges or emotional dysregulation that need more frequent clinical contact",
      "A safe, supportive home environment with a caregiver available during sessions",
      "Motivation to participate in group and individual therapy via secure video",
    ],
  },
  {
    type: "pullquote",
    text: "The goal is not just symptom relief — it is helping your teen rebuild routines, confidence, and connection.",
  },
  { type: "h2", text: "What a typical week looks like" },
  {
    type: "paragraph",
    text: "Programs vary based on clinical need, but most teens in Virtual IOP attend a structured mix of group therapy, individual sessions, and family meetings. Sessions are scheduled around school when possible.",
  },
  {
    type: "numbered",
    items: [
      "Clinical intake and treatment planning with your teen and a parent or guardian",
      "Live group therapy focused on coping skills, emotion regulation, and peer support",
      "Individual therapy at least once per week — more often when clinically indicated",
      "Family sessions to improve communication, boundaries, and crisis planning",
      "Care coordination with schools, outpatient providers, or psychiatrists when appropriate",
      "Step-down planning as symptoms stabilize and weekly outpatient care becomes sufficient",
    ],
  },
  {
    type: "stat-row",
    stats: [
      { value: "12–17", label: "Ages served" },
      { value: "3–5 days", label: "Typical weekly schedule" },
      { value: "100% virtual", label: "Secure video sessions" },
    ],
  },
  { type: "h3", text: "Virtual IOP vs. weekly therapy" },
  {
    type: "table",
    tableHeaders: ["", "Weekly therapy", "Virtual IOP"],
    tableRows: [
      ["Session frequency", "Usually 1× per week", "Several sessions per week"],
      ["Group support", "Rarely included", "Core part of the program"],
      ["Family involvement", "As needed", "Built into the treatment plan"],
      ["Best for", "Mild to moderate symptoms", "Moderate symptoms needing structure"],
    ],
  },
  { type: "divider" },
  {
    type: "image",
    text: ADOLESCENT_IOP_IMGS.group,
    alt: "Teen participating in a virtual group therapy session at home with a laptop",
  },
  { type: "h2", text: "Insurance and getting started" },
  {
    type: "paragraph",
    text: "Many families worry that intensive care means complicated billing. In most cases, Virtual IOP is covered when treatment is medically necessary. Our admissions team verifies benefits before enrollment and explains any out-of-pocket costs clearly.",
  },
  {
    type: "callout",
    variant: "insight",
    text: "Call our admissions line for a free, confidential consultation. We can explain Virtual IOP, help you understand insurance coverage, and outline next steps for your teen.",
  },
  {
    type: "callout",
    variant: "warning",
    text: "If your teen is in immediate danger or having thoughts of suicide, call 988 or go to the nearest emergency room. Virtual IOP is not a substitute for emergency care.",
  },
];

export const DEMO_BLOG_POST: BlogPost = {
  id: "demo-post",
  slug: "what-is-virtual-iop-for-teens",
  title: "What Is Virtual IOP for Teens? A Parent's Guide",
  excerpt:
    "If your teen needs more support than weekly therapy, Virtual IOP may be the right step. Here is how structured outpatient care works online — and how to know if it fits your family.",
  content: DEMO_BLOG_SECTIONS,
  category: "Virtual IOP",
  tags: ["Virtual IOP", "Teen Therapy", "School Avoidance", "Family Support"],
  author: "Sarah Chen",
  authorRole: "Clinical Director, LMFT",
  authorBio:
    "Sarah specializes in adolescent mood disorders, school refusal, and family systems work. She leads clinical programming for Virtual IOP at Adolescent Mental Health.",
  authorPhoto: "",
  image: VIOP_IMGS.hero,
  date: "May 25, 2026",
  readTime: "7 min read",
  featured: true,
  publishedAt: "2026-05-25",
  createdAt: "2026-05-25",
};

export const DEMO_BLOG_POSTS: BlogPost[] = [
  DEMO_BLOG_POST,
  {
    id: "demo-2",
    slug: "signs-your-teen-may-need-more-than-weekly-therapy",
    title: "7 Signs Your Teen May Need More Than Weekly Therapy",
    excerpt:
      "When symptoms start affecting school attendance, sleep, or safety, weekly sessions may not be enough. Here are patterns parents often notice first.",
    content: [],
    category: "Teen Therapy",
    tags: ["Teen Therapy", "Anxiety", "Depression"],
    author: "Sarah Chen",
    authorRole: "Clinical Director, LMFT",
    authorBio: "",
    authorPhoto: "",
    image: ADOLESCENT_IOP_IMGS.individual,
    date: "May 20, 2026",
    readTime: "5 min read",
    featured: false,
    publishedAt: "2026-05-20",
    createdAt: "2026-05-20",
  },
  {
    id: "demo-3",
    slug: "supporting-a-teen-with-school-avoidance",
    title: "Supporting a Teen With School Avoidance Without Escalating Conflict",
    excerpt:
      "School refusal is rarely about laziness. Learn practical ways to reduce power struggles while still getting clinical help in place.",
    content: [],
    category: "School Avoidance",
    tags: ["School Avoidance", "Family Support", "Virtual IOP"],
    author: "Clinical Editorial Team",
    authorRole: "Adolescent Mental Health",
    authorBio: "",
    authorPhoto: "",
    image: ADOLESCENT_IOP_IMGS.bento,
    date: "May 15, 2026",
    readTime: "6 min read",
    featured: false,
    publishedAt: "2026-05-15",
    createdAt: "2026-05-15",
  },
  {
    id: "demo-4",
    slug: "what-parents-should-know-about-teen-anxiety",
    title: "What Parents Should Know About Teen Anxiety Treatment",
    excerpt:
      "From physical symptoms to avoidance loops, adolescent anxiety often looks different than adult anxiety. Here is how care is tailored for teens.",
    content: [],
    category: "Anxiety",
    tags: ["Anxiety", "Teen Therapy", "CBT"],
    author: "Clinical Editorial Team",
    authorRole: "Adolescent Mental Health",
    authorBio: "",
    authorPhoto: "",
    image: ADOLESCENT_IOP_IMGS.family,
    date: "May 10, 2026",
    readTime: "5 min read",
    featured: false,
    publishedAt: "2026-05-10",
    createdAt: "2026-05-10",
  },
  {
    id: "demo-5",
    slug: "how-family-therapy-fits-into-virtual-iop",
    title: "How Family Therapy Fits Into Virtual IOP",
    excerpt:
      "Family sessions are not optional add-ons — they are often where lasting change happens. See what to expect and how to prepare.",
    content: [],
    category: "Family Support",
    tags: ["Family Support", "Virtual IOP"],
    author: "Sarah Chen",
    authorRole: "Clinical Director, LMFT",
    authorBio: "",
    authorPhoto: "",
    image: ADOLESCENT_IOP_IMGS.family,
    date: "May 5, 2026",
    readTime: "4 min read",
    featured: false,
    publishedAt: "2026-05-05",
    createdAt: "2026-05-05",
  },
];
