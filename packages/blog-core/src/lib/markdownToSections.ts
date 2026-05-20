import type { BlogSection } from "../types/blog";

/** If a line is a markdown heading (including list items like `- #### Title`), return clean title text. */
export function parseEmbeddedHeading(text: string): string | null {
  let trimmed = text.trim().replace(/^[✓✔•]\s*/, "");
  // Squarespace exports sometimes keep list markers on heading lines
  while (/^[-*+]\s+/.test(trimmed)) {
    trimmed = trimmed.replace(/^[-*+]\s+/, "");
  }
  const match = trimmed.match(/^#{1,6}\s+(.+)$/);
  if (!match) return null;
  return stripInlineMarkdown(match[1]).replace(/:+\s*$/, "").trim();
}

/** End-of-article resource blocks (Get Help, links, etc.) */
export function isResourceSectionHeading(text: string): boolean {
  const t = text.trim().toLowerCase();
  return (
    t.includes("get help") ||
    t.includes("helpful links") ||
    t.includes("additional resources") ||
    t.startsWith("resources")
  );
}

/** Split list blocks so `#### Section` items become h3 sections. */
export function normalizeSections(sections: BlogSection[]): BlogSection[] {
  const out: BlogSection[] = [];

  for (const section of sections) {
    if ((section.type === "list" || section.type === "numbered") && section.items?.length) {
      let batch: string[] = [];
      const flushBatch = () => {
        if (batch.length > 0) {
          out.push({
            type: section.type,
            items: batch.map((item) => stripInlineMarkdown(item)),
          });
          batch = [];
        }
      };

      for (const item of section.items) {
        const heading = parseEmbeddedHeading(item);
        if (heading) {
          flushBatch();
          out.push({ type: "h3", text: heading });
        } else {
          batch.push(item);
        }
      }
      flushBatch();
      continue;
    }

    if (section.type === "paragraph" && section.text) {
      const heading = parseEmbeddedHeading(section.text);
      if (heading) {
        out.push({ type: "h3", text: heading });
        continue;
      }
    }

    if (section.text) {
      out.push({ ...section, text: stripInlineMarkdown(section.text) });
    } else if (section.items) {
      out.push({
        ...section,
        items: section.items.map((item) => stripInlineMarkdown(item)),
      });
    } else {
      out.push(section);
    }
  }

  return out;
}

/** Strip common inline markdown emphasis markers for display. */
export function stripInlineMarkdown(text: string): string {
  return text
    .replace(/\*\*\*([^*]+)\*\*\*/g, "$1")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1")
    .replace(/__([^_]+)__/g, "$1")
    .replace(/_([^_]+)_/g, "$1")
    .trim();
}

const IMAGE_LINE = /^\s*!\[([^\]]*)\]\(([^)]+)\)\s*$/;
const HTML_IMG = /<img[^>]+src=["']([^"']+)["'][^>]*\/?>/i;

function expandCollapsedTables(md: string): string {
  return md.replace(/^(\|[^\n]+)$/gm, (line) => {
    if (!/\|\s*:?-+:?\s*\|/.test(line)) return line;
    if (/^\|[\s|:-]+\|$/.test(line.trim())) return line;

    const sepMatch = line.match(/(\|(?:\s*:?-+:?\s*\|)+)/);
    if (!sepMatch) return line;

    const sepIndex = line.indexOf(sepMatch[0]);
    const headerPart = line.slice(0, sepIndex).trim();
    const afterSep = line.slice(sepIndex + sepMatch[0].length).trim();
    const dataRows: string[] = [];

    if (afterSep) {
      const rowSplitRegex = /(?<=\|)\s+(?=\|)/g;
      dataRows.push(...afterSep.split(rowSplitRegex).map((r) => r.trim()).filter(Boolean));
    }

    return [headerPart, sepMatch[0].trim(), ...dataRows].filter(Boolean).join("\n");
  });
}

/**
 * Convert markdown (Squarespace exports, AI output, etc.) into BlogSection[].
 */
export function markdownToSections(md: string): BlogSection[] {
  const lines = expandCollapsedTables(md).split("\n");
  const content: BlogSection[] = [];
  let currentParagraph = "";
  let currentList: string[] = [];
  let listType: "list" | "numbered" | null = null;
  let currentQuote = "";
  let tableLines: string[] = [];

  const flushParagraph = () => {
    const text = stripInlineMarkdown(currentParagraph);
    if (text) content.push({ type: "paragraph", text });
    currentParagraph = "";
  };

  const flushList = () => {
    if (currentList.length > 0) {
      content.push({
        type: listType === "numbered" ? "numbered" : "list",
        items: currentList.map(stripInlineMarkdown),
      });
      currentList = [];
      listType = null;
    }
  };

  const flushQuote = () => {
    const text = stripInlineMarkdown(currentQuote);
    if (text) content.push({ type: "pullquote", text });
    currentQuote = "";
  };

  const flushTable = () => {
    if (tableLines.length < 2) {
      tableLines = [];
      return;
    }
    const parseRow = (line: string): string[] =>
      line
        .replace(/^\|/, "")
        .replace(/\|$/, "")
        .split("|")
        .map((cell) => stripInlineMarkdown(cell.trim()));

    const headers = parseRow(tableLines[0]);
    const rows = tableLines.slice(2).map(parseRow);
    content.push({ type: "table", tableHeaders: headers, tableRows: rows });
    tableLines = [];
  };

  const pushImage = (src: string, alt?: string) => {
    const url = src.trim();
    if (!url) return;
    content.push({ type: "image", text: url, alt: alt?.trim() || undefined });
  };

  for (const line of lines) {
    const trimmed = line.trim();

    if (!trimmed) {
      flushParagraph();
      flushList();
      flushQuote();
      flushTable();
      continue;
    }

    const imageMatch = trimmed.match(IMAGE_LINE);
    if (imageMatch) {
      flushParagraph();
      flushList();
      flushQuote();
      flushTable();
      pushImage(imageMatch[2], imageMatch[1]);
      continue;
    }

    const htmlImg = trimmed.match(HTML_IMG);
    if (htmlImg) {
      flushParagraph();
      flushList();
      flushQuote();
      flushTable();
      pushImage(htmlImg[1]);
      continue;
    }

    if (trimmed === "---" || trimmed === "***" || trimmed === "___") {
      flushParagraph();
      flushList();
      flushQuote();
      flushTable();
      content.push({ type: "divider" });
      continue;
    }

    if (trimmed.startsWith("|") && trimmed.includes("|", 1)) {
      flushParagraph();
      flushList();
      flushQuote();
      tableLines.push(trimmed);
      continue;
    }

    if (/^#{1}\s+/.test(trimmed) && !/^#{2,}/.test(trimmed)) {
      flushParagraph();
      flushList();
      flushQuote();
      flushTable();
      continue;
    }

    if (/^####\s+/.test(trimmed)) {
      flushParagraph();
      flushList();
      flushQuote();
      flushTable();
      content.push({ type: "h3", text: stripInlineMarkdown(trimmed.replace(/^####\s+/, "")) });
      continue;
    }

    if (/^###\s+/.test(trimmed)) {
      flushParagraph();
      flushList();
      flushQuote();
      flushTable();
      content.push({ type: "h3", text: stripInlineMarkdown(trimmed.replace(/^###\s+/, "")) });
      continue;
    }

    if (/^##\s+/.test(trimmed)) {
      flushParagraph();
      flushList();
      flushQuote();
      flushTable();
      content.push({ type: "h2", text: stripInlineMarkdown(trimmed.replace(/^##\s+/, "")) });
      continue;
    }

    if (trimmed.startsWith("> ")) {
      flushParagraph();
      flushList();
      flushTable();
      currentQuote += (currentQuote ? " " : "") + trimmed.replace(/^>\s+/, "");
      continue;
    }

    if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
      flushParagraph();
      flushQuote();
      flushTable();
      const listContent = trimmed.replace(/^[-*]\s+/, "");
      const embeddedHeading = parseEmbeddedHeading(listContent);
      if (embeddedHeading) {
        flushList();
        content.push({ type: "h3", text: embeddedHeading });
        continue;
      }
      if (listType && listType !== "list") flushList();
      listType = "list";
      currentList.push(listContent);
      continue;
    }

    if (/^\d+\.\s+/.test(trimmed)) {
      flushParagraph();
      flushQuote();
      flushTable();
      if (listType && listType !== "numbered") flushList();
      listType = "numbered";
      currentList.push(trimmed.replace(/^\d+\.\s+/, ""));
      continue;
    }

    if (/^(title|slug|category|author|tags|excerpt|metaDescription|image|featured):\s/i.test(trimmed)) {
      continue;
    }

    flushList();
    flushQuote();
    flushTable();
    currentParagraph += (currentParagraph ? " " : "") + trimmed;
  }

  flushParagraph();
  flushList();
  flushQuote();
  flushTable();

  return normalizeSections(content);
}

export function looksLikeMarkdown(content: string): boolean {
  return (
    content.includes("| ") ||
    /^#{1,6}\s/m.test(content) ||
    /^[-*]\s/m.test(content) ||
    /^\d+\.\s/m.test(content) ||
    /^>\s/m.test(content) ||
    /!\[[^\]]*\]\([^)]+\)/.test(content) ||
    /\*\*[^*]+\*\*/.test(content)
  );
}
