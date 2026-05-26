import type { BlogSection } from "../types/blog";

function escapeTableCell(text: string): string {
  return text.replace(/\|/g, "\\|").trim();
}

/**
 * Convert BlogSection[] (blog_posts.content JSON) into markdown for the Content Editor.
 */
export function sectionsToMarkdown(sections: BlogSection[]): string {
  const lines: string[] = [];

  for (const s of sections) {
    switch (s.type) {
      case "h2":
        if (s.text?.trim()) {
          lines.push(`## ${s.text.trim()}`, "");
        }
        break;
      case "h3":
        if (s.text?.trim()) {
          lines.push(`### ${s.text.trim()}`, "");
        }
        break;
      case "paragraph":
        if (s.text?.trim()) {
          lines.push(s.text.trim(), "");
        }
        break;
      case "pullquote":
        if (s.text?.trim()) {
          lines.push(`> ${s.text.trim()}`, "");
        }
        break;
      case "callout": {
        if (!s.text?.trim()) break;
        const label =
          s.variant === "warning"
            ? "Warning"
            : s.variant === "tip"
              ? "Tip"
              : s.variant === "insight"
                ? "Insight"
                : "Note";
        lines.push(`> **${label}:** ${s.text.trim()}`, "");
        break;
      }
      case "list":
        s.items?.forEach((item) => {
          if (item.trim()) lines.push(`- ${item.trim()}`);
        });
        if (s.items?.length) lines.push("");
        break;
      case "numbered":
        s.items?.forEach((item, i) => {
          if (item.trim()) lines.push(`${i + 1}. ${item.trim()}`);
        });
        if (s.items?.length) lines.push("");
        break;
      case "stat-row":
        s.stats?.forEach((st) => {
          lines.push(`**${st.value.trim()}** — ${st.label.trim()}`);
        });
        if (s.stats?.length) lines.push("");
        break;
      case "key-takeaway":
        lines.push("> **Key takeaway for parents**");
        if (s.text?.trim()) {
          lines.push(`> ${s.text.trim()}`);
        }
        s.items?.forEach((item) => {
          if (item.trim()) lines.push(`- ${item.trim()}`);
        });
        if (s.items?.length) lines.push("");
        break;
      case "divider":
        lines.push("---", "");
        break;
      case "table": {
        const headers = s.tableHeaders ?? [];
        const rows = s.tableRows ?? [];
        if (headers.length) {
          lines.push(`| ${headers.map(escapeTableCell).join(" | ")} |`);
          lines.push(`| ${headers.map(() => "---").join(" | ")} |`);
          rows.forEach((row) => {
            const cells = headers.map((_, i) => escapeTableCell(row[i] ?? ""));
            lines.push(`| ${cells.join(" | ")} |`);
          });
          lines.push("");
        }
        break;
      }
      case "image":
        if (s.text?.trim()) {
          const alt = s.alt?.trim() || "";
          lines.push(`![${alt}](${s.text.trim()})`, "");
        }
        break;
      default:
        if (s.text?.trim()) {
          lines.push(s.text.trim(), "");
        }
        break;
    }
  }

  return lines.join("\n").replace(/\n{3,}/g, "\n\n").trim();
}
