import { looksLikeMarkdown, markdownToSections } from "../lib/markdownToSections";

export interface BlogSection {
  type: "paragraph" | "h2" | "h3" | "pullquote" | "callout" | "list" | "numbered" | "stat-row" | "divider" | "table" | "image";
  text?: string;
  /** Alt text when type is "image" (text holds the image URL). */
  alt?: string;
  items?: string[];
  stats?: { value: string; label: string }[];
  variant?: "warning" | "tip" | "insight";
  tableHeaders?: string[];
  tableRows?: string[][];
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  authorRole: string;
  authorBio: string;
  authorPhoto: string;
  date: string;
  publishedAt: string;
  createdAt: string;
  readTime: string;
  image: string;
  featured?: boolean;
  tags: string[];
  content: BlogSection[];
  status?: string;
  /** SEO `<title>` tag override (mirrors blog_posts.meta_title). */
  metaTitle?: string | null;
  metaDescription?: string;
  /** Optional primary keyword (mirrors blog_posts.focus_keyword). */
  focus_keyword?: string | null;
  approved_for_publish?: boolean;
  scheduled_publish_at?: string | null;
  /** Live URL for the published post — used by AI optimize / OG previews. */
  published_url?: string | null;
  /** Linked Content Editor row (mirrors blog_posts.content_editor_id). */
  content_editor_id?: string | null;
}

export interface DbBlogPost {
  id: string;
  slug: string;
  title: string;
  content: string;
  excerpt: string;
  author: string;
  author_title: string | null;
  author_bio: string | null;
  author_photo: string | null;
  tags: string[];
  category: string;
  hero_image_url: string | null;
  published_at: string | null;
  status: string;
  meta_title: string | null;
  meta_description: string | null;
  read_time: string | null;
  featured: boolean;
  created_at: string;
  updated_at: string;
  /** When set + approved, drafts can be promoted by auto-publish cron. */
  approved_for_publish?: boolean | null;
  scheduled_publish_at?: string | null;
  focus_keyword?: string | null;
  published_url?: string | null;
  content_editor_id?: string | null;
}

export const categories = [
  "All",
  "SEO",
  "Paid Media",
  "Web Development",
  "Social Media",
  "Compliance",
  "Strategy",
];

export function dbToBlogPost(db: DbBlogPost): BlogPost {
  let parsedContent: BlogSection[] = [];

  try {
    let raw: unknown = db.content;
    if (typeof raw === "string" && raw.startsWith("\"")) {
      raw = JSON.parse(raw);
    }
    const parsed = typeof raw === "string" ? JSON.parse(raw) : raw;
    if (Array.isArray(parsed)) {
      parsedContent = parsed as BlogSection[];
    } else if (typeof parsed === "string" && parsed.trim()) {
      parsedContent = markdownToSections(parsed);
    }
  } catch {
    // JSON parse failed — content is likely markdown
  }

  if (parsedContent.length === 0 && typeof db.content === "string" && db.content.trim()) {
    const raw = db.content.trim();
    parsedContent = markdownToSections(raw);
  } else if (
    parsedContent.length > 0 &&
    parsedContent.every((s) => s.type === "paragraph") &&
    typeof db.content === "string" &&
    looksLikeMarkdown(db.content)
  ) {
    // Legacy weak plain-text parse stored as single paragraphs — re-parse as markdown
    parsedContent = markdownToSections(db.content);
  }

  const dateObj = db.published_at ? new Date(db.published_at) : new Date(db.created_at);
  const dateStr = dateObj.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return {
    id: db.id,
    slug: db.slug,
    title: db.title,
    excerpt: db.excerpt,
    category: db.category,
    author: db.author,
    authorRole: db.author_title || "",
    authorBio: db.author_bio || "",
    authorPhoto: db.author_photo || "",
    date: dateStr,
    publishedAt: db.published_at || db.created_at,
    createdAt: db.created_at,
    readTime: db.read_time || "5 min read",
    image: db.hero_image_url || "",
    featured: db.featured,
    tags: db.tags || [],
    content: parsedContent,
    status: db.status,
    metaTitle: db.meta_title ?? null,
    metaDescription: db.meta_description || "",
    ...(typeof db.approved_for_publish === "boolean"
      ? { approved_for_publish: db.approved_for_publish }
      : {}),
    scheduled_publish_at: db.scheduled_publish_at ?? null,
    focus_keyword: db.focus_keyword ?? null,
    published_url: db.published_url ?? null,
    content_editor_id: db.content_editor_id ?? null,
  };
}

export function blogPostToDb(post: Partial<BlogPost>): Partial<DbBlogPost> {
  return {
    slug: post.slug,
    title: post.title,
    content:
      typeof post.content === "string"
        ? post.content
        : JSON.stringify(post.content || []),
    excerpt: post.excerpt,
    author: post.author,
    author_title: post.authorRole,
    author_bio: post.authorBio,
    author_photo: post.authorPhoto,
    tags: post.tags,
    category: post.category,
    hero_image_url: post.image,
    read_time: post.readTime,
    featured: post.featured,
    status: post.status || "published",
    meta_title: post.metaTitle ?? null,
    meta_description: post.metaDescription,
  };
}
