import type { BlogSection } from "@sweetmedia/blog-core";

interface ParsedBlogPost {
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  author: string;
  authorRole: string;
  authorBio: string;
  authorPhoto: string;
  readTime: string;
  image: string;
  tags: string[];
  content: BlogSection[];
  status: string;
  featured: boolean;
  metaDescription: string;
}

/**
 * Parse a single markdown blog post into a BlogPost structure.
 * Supports YAML frontmatter for metadata.
 */
/**
 * Expand "collapsed" single-line tables back into proper multi-line markdown.
 * A collapsed table looks like:
 *   | H1 | H2 | |---|---| | R1 | R2 | | R3 | R4 |
 * where all rows are on one line separated by spaces.
 */
function expandCollapsedTables(md: string): string {
  // Match a line that starts with | and contains a separator row (|---|---| etc.) inline
  return md.replace(
    /^(\|[^\n]+)$/gm,
    (line) => {
      // Only process if the line contains a separator segment like |---|---|
      if (!/\|\s*:?-+:?\s*\|/.test(line)) return line;
      // If the line is ONLY a separator row, leave it alone
      if (/^\|[\s|:-]+\|$/.test(line.trim())) return line;

      // Split the line into logical table rows by finding the separator row
      // and splitting around it. We tokenise by finding all |...| row segments.
      // Strategy: find the separator row position and split the string there.
      const sepMatch = line.match(/(\|(?:\s*:?-+:?\s*\|)+)/);
      if (!sepMatch) return line;

      const sepIndex = line.indexOf(sepMatch[0]);
      const headerPart = line.slice(0, sepIndex).trim();
      const afterSep = line.slice(sepIndex + sepMatch[0].length).trim();

      // afterSep contains the data rows — split them by detecting row boundaries.
      // Each row starts with | and ends before the next |...| group that starts a new row.
      // Simple approach: split on " | " where the preceding cell ends and a new row begins.
      // We detect new rows as: a pipe that follows a closing pipe + space.
      const dataRows: string[] = [];
      if (afterSep) {
        // Split on occurrences of "| " that start a new row (i.e., after a closing |)
        // We'll use a regex that finds row boundaries: a | preceded by content
        const rowSplitRegex = /(?<=\|)\s+(?=\|)/g;
        const rawRows = afterSep.split(rowSplitRegex).map((r) => r.trim()).filter(Boolean);
        dataRows.push(...rawRows);
      }

      const parts = [
        headerPart,
        sepMatch[0].trim(),
        ...dataRows,
      ].filter(Boolean);

      return parts.join("\n");
    }
  );
}

export function parseMarkdownPost(md: string): ParsedBlogPost {
  const lines = expandCollapsedTables(md).split("\n");
  let i = 0;

  // --- Parse YAML frontmatter ---
  let frontmatter: Record<string, string> = {};
  if (lines[0]?.trim() === "---") {
    const endIdx = lines.findIndex((l, idx) => idx > 0 && l.trim() === "---");
    if (endIdx > 0) {
      const fmLines = lines.slice(1, endIdx);
      frontmatter = parseFrontmatter(fmLines);
      i = endIdx + 1;
    }
  }

  // --- Parse body into content blocks ---
  const content: BlogSection[] = [];
  let currentParagraph = "";
  let currentList: string[] = [];
  let listType: "list" | "numbered" | null = null;
  let currentQuote = "";
  let tableLines: string[] = [];

  const flushParagraph = () => {
    const text = currentParagraph.trim();
    if (text) {
      content.push({ type: "paragraph", text });
    }
    currentParagraph = "";
  };

  const flushList = () => {
    if (currentList.length > 0) {
      content.push({ type: listType === "numbered" ? "numbered" : "list", items: [...currentList] });
      currentList = [];
      listType = null;
    }
  };

  const flushQuote = () => {
    const text = currentQuote.trim();
    if (text) {
      content.push({ type: "pullquote", text });
    }
    currentQuote = "";
  };

  const flushTable = () => {
    if (tableLines.length < 2) {
      // Not enough lines to be a real table — treat as paragraphs
      tableLines = [];
      return;
    }
    const parseRow = (line: string): string[] =>
      line
        .replace(/^\|/, "")
        .replace(/\|$/, "")
        .split("|")
        .map((cell) => cell.trim());

    const headers = parseRow(tableLines[0]);
    // tableLines[1] is the separator row (---|---), skip it
    const rows = tableLines.slice(2).map(parseRow);
    content.push({ type: "table", tableHeaders: headers, tableRows: rows });
    tableLines = [];
  };

  for (; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    // Empty line — flush accumulators
    if (trimmed === "") {
      flushParagraph();
      flushList();
      flushQuote();
      flushTable();
      continue;
    }

    // Divider
    if (trimmed === "---" || trimmed === "***" || trimmed === "___") {
      flushParagraph();
      flushList();
      flushQuote();
      flushTable();
      content.push({ type: "divider" });
      continue;
    }

    // Table row (starts with | and contains at least one more |)
    if (trimmed.startsWith("|") && trimmed.includes("|", 1)) {
      flushParagraph();
      flushList();
      flushQuote();
      tableLines.push(trimmed);
      continue;
    }

    // Heading 1
    if (trimmed.startsWith("# ") && !trimmed.startsWith("## ")) {
      flushParagraph();
      flushList();
      flushQuote();
      flushTable();
      continue; // title handled separately
    }

    // Heading 2
    if (trimmed.startsWith("## ")) {
      flushParagraph();
      flushList();
      flushQuote();
      flushTable();
      content.push({ type: "h2", text: trimmed.replace(/^##\s+/, "") });
      continue;
    }

    // Heading 3
    if (trimmed.startsWith("### ")) {
      flushParagraph();
      flushList();
      flushQuote();
      flushTable();
      content.push({ type: "h3", text: trimmed.replace(/^###\s+/, "") });
      continue;
    }

    // Blockquote
    if (trimmed.startsWith("> ")) {
      flushParagraph();
      flushList();
      flushTable();
      currentQuote += (currentQuote ? " " : "") + trimmed.replace(/^>\s+/, "");
      continue;
    }

    // Unordered list
    if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
      flushParagraph();
      flushQuote();
      flushTable();
      if (listType && listType !== "list") flushList();
      listType = "list";
      currentList.push(trimmed.replace(/^[-*]\s+/, ""));
      continue;
    }

    // Ordered list
    if (/^\d+\.\s+/.test(trimmed)) {
      flushParagraph();
      flushQuote();
      flushTable();
      if (listType && listType !== "numbered") flushList();
      listType = "numbered";
      currentList.push(trimmed.replace(/^\d+\.\s+/, ""));
      continue;
    }

    // Lines that look like frontmatter leaking through — skip known frontmatter keys
    if (/^(title|slug|category|author|authorRole|authorBio|authorPhoto|tags|excerpt|metaDescription|image|featuredImage|featuredImageAlt|featured_image|readTime|status|featured):\s/.test(trimmed)) {
      continue;
    }

    // Regular paragraph line
    flushList();
    flushQuote();
    flushTable();
    currentParagraph += (currentParagraph ? " " : "") + trimmed;
  }

  flushParagraph();
  flushList();
  flushQuote();
  flushTable();

  // --- Extract title from first H1 or frontmatter ---
  const title = frontmatter.title || extractTitle(md) || "Untitled Post";

  // --- Build slug from title ---
  const slug = frontmatter.slug || slugify(title);

  // --- Extract excerpt from first paragraph ---
  const firstParagraph = content.find((b) => b.type === "paragraph")?.text || "";
  const excerpt = frontmatter.excerpt || firstParagraph.slice(0, 200);

  // --- Estimate read time ---
  const wordCount = md.split(/\s+/).length;
  const readTimeMinutes = Math.max(1, Math.ceil(wordCount / 200));

  return {
    title,
    slug,
    excerpt,
    category: frontmatter.category || "Mental Health",
    author: frontmatter.author || "Inner Peak Colorado",
    authorRole: frontmatter.authorRole || "Content Team",
    authorBio: frontmatter.authorBio || "Women-centered virtual mental health and addiction treatment in Colorado.",
    authorPhoto: frontmatter.authorPhoto || "https://ynmldknprfusujudvutq.supabase.co/storage/v1/object/public/public_bucket/img2.png",
    readTime: frontmatter.readTime || `${readTimeMinutes} min read`,
    image: normalizeImageUrl(frontmatter.image || frontmatter.featuredImage || frontmatter.featured_image || ""),
    tags: parseTags(frontmatter.tags),
    content,
    status: "published",
    featured: frontmatter.featured === "true",
    metaDescription: frontmatter.metaDescription || excerpt.slice(0, 160),
  };
}

/**
 * Parse multiple markdown posts separated by a blank line + `---` + blank line.
 * This avoids splitting on YAML frontmatter delimiters.
 */
export function parseMarkdownBulk(md: string): ParsedBlogPost[] {
  const normalized = md.replace(/\r\n/g, "\n").trim();
  const lines = normalized.split("\n");
  const boundaries: number[] = [0];

  for (let i = 0; i < lines.length; i++) {
    if (lines[i].trim() !== "---") continue;

    // Must be at start OR preceded by an empty line (not inline in a paragraph)
    if (i > 0 && lines[i - 1].trim() !== "") continue;

    // Next lines must look like frontmatter (key: value) to be a new post boundary
    let j = i + 1;
    let looksLikeFrontmatter = false;
    while (j < lines.length && j < i + 20) {
      const nextLine = lines[j].trim();
      if (nextLine === "---") break;
      if (/^[a-zA-Z0-9_]+:\s/.test(nextLine)) {
        looksLikeFrontmatter = true;
        break;
      }
      if (nextLine !== "" && !/^[a-zA-Z0-9_]+:\s/.test(nextLine)) {
        break;
      }
      j++;
    }

    if (looksLikeFrontmatter && i > 0) {
      boundaries.push(i);
    }
  }

  const chunks: string[] = [];
  for (let i = 0; i < boundaries.length; i++) {
    const start = boundaries[i];
    const end = boundaries[i + 1] || lines.length;
    const chunk = lines.slice(start, end).join("\n").trim();
    if (chunk) chunks.push(chunk);
  }

  return chunks.map((chunk) => parseMarkdownPost(chunk));
}

// --- Helpers ---

/**
 * Converts Google Drive share/view URLs to a direct embeddable CDN URL.
 * Handles all common Drive URL formats.
 */
function normalizeImageUrl(url: string): string {
  if (!url) return url;

  // Format 1: https://drive.google.com/uc?export=view&id=FILE_ID
  // Format 2: https://drive.google.com/uc?id=FILE_ID&export=view
  const ucMatch = url.match(/drive\.google\.com\/uc[?&].*?(?:id=|export=view&id=)([a-zA-Z0-9_-]+)/);
  if (ucMatch) {
    return `https://lh3.googleusercontent.com/d/${ucMatch[1]}`;
  }

  // Format 3: https://drive.google.com/file/d/FILE_ID/view
  // Format 4: https://drive.google.com/file/d/FILE_ID/preview
  const fileMatch = url.match(/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (fileMatch) {
    return `https://lh3.googleusercontent.com/d/${fileMatch[1]}`;
  }

  // Format 5: https://drive.google.com/open?id=FILE_ID
  const openMatch = url.match(/drive\.google\.com\/open[?&]id=([a-zA-Z0-9_-]+)/);
  if (openMatch) {
    return `https://lh3.googleusercontent.com/d/${openMatch[1]}`;
  }

  return url;
}

function parseFrontmatter(lines: string[]): Record<string, string> {
  const result: Record<string, string> = {};
  for (const line of lines) {
    // Match "key: rest of line" — key is alphanumeric/underscore, value can contain colons (URLs etc.)
    const colonIdx = line.indexOf(":");
    if (colonIdx === -1) continue;
    const key = line.slice(0, colonIdx).trim();
    if (!/^[a-zA-Z0-9_]+$/.test(key)) continue;
    const value = line.slice(colonIdx + 1).trim().replace(/^["']|["']$/g, "");
    result[key] = value;
  }
  return result;
}

function extractTitle(md: string): string | null {
  const match = md.match(/^#\s+(.+)$/m);
  return match ? match[1].trim() : null;
}

function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .slice(0, 60)
    .replace(/-+$/, "");
}

function parseTags(tagsStr: string | undefined): string[] {
  if (!tagsStr) return [];
  // Handle "[tag1, tag2]" or "tag1, tag2" or "['tag1', 'tag2']"
  const cleaned = tagsStr.replace(/^\[|\]$/g, "").replace(/['"]/g, "");
  return cleaned.split(",").map((t) => t.trim()).filter(Boolean);
}

/**
 * Parse inline markdown links [text](url) in a string.
 * Returns an array of text/link segments for rendering.
 */
export interface InlineSegment {
  type: "text" | "link";
  content: string;
  href?: string;
}

export function parseInlineLinks(text: string): InlineSegment[] {
  const segments: InlineSegment[] = [];
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = linkRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      segments.push({ type: "text", content: text.slice(lastIndex, match.index) });
    }
    segments.push({ type: "link", content: match[1], href: match[2] });
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    segments.push({ type: "text", content: text.slice(lastIndex) });
  }

  return segments.length > 0 ? segments : [{ type: "text", content: text }];
}
