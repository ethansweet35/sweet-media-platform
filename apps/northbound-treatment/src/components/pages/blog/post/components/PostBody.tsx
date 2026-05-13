import type { BlogSection } from "@sweetmedia/blog-core";
import { parseInlineLinks, type InlineSegment } from "@/lib/markdownToBlog";
import { autoLinkText, type LinkSegment, type AutoLinkMapping } from "@sweetmedia/blog-core";
import Link from "next/link";

function isExternal(href: string | undefined): boolean {
  if (!href) return false;
  return href.startsWith("http://") || href.startsWith("https://") || href.startsWith("//");
}

function AutoLinkedText({ segments }: { segments: LinkSegment[] }) {
  return (
    <>
      {segments.map((seg, i) => {
        if (seg.type === "text") return <span key={i}>{seg.content}</span>;
        return (
          <Link
            key={i}
            href={seg.href ?? "/"}
            className="font-medium text-[#e97a52] underline underline-offset-2 transition-colors hover:text-[#3a6697]"
          >
            {seg.content}
          </Link>
        );
      })}
    </>
  );
}

function InlineText({
  text,
  autoLinkMap,
  currentSlug,
  usedHrefs,
  enableAutoLink = true,
}: {
  text: string;
  autoLinkMap?: AutoLinkMapping[];
  currentSlug?: string;
  usedHrefs: Set<string>;
  enableAutoLink?: boolean;
}) {
  const inlineSegments: InlineSegment[] = parseInlineLinks(text);

  const linkClass =
    "font-medium text-[#e97a52] underline underline-offset-2 transition-colors hover:text-[#3a6697]";

  return (
    <>
      {inlineSegments.map((seg, i) => {
        // Bold
        if (seg.type === "bold") {
          return <strong key={i} className="font-bold text-[#3a6697]">{seg.content}</strong>;
        }

        // Italic
        if (seg.type === "italic") {
          return <em key={i}>{seg.content}</em>;
        }

        // Bold + italic
        if (seg.type === "bolditalic") {
          return <strong key={i} className="font-bold text-[#3a6697]"><em>{seg.content}</em></strong>;
        }

        // Explicit markdown link
        if (seg.type === "link") {
          if (seg.href) usedHrefs.add(seg.href);
          if (isExternal(seg.href)) {
            return (
              <a key={i} href={seg.href} target="_blank" rel="noopener noreferrer" className={linkClass}>
                {seg.content}
              </a>
            );
          }
          return (
            <Link key={i} href={seg.href ?? "/"} className={linkClass}>
              {seg.content}
            </Link>
          );
        }

        // Plain text — apply auto-linking (unless disabled, e.g. headings)
        if (enableAutoLink && autoLinkMap && autoLinkMap.length > 0) {
          const autoSegments = autoLinkText(seg.content, autoLinkMap, currentSlug, usedHrefs);
          return <AutoLinkedText key={i} segments={autoSegments} />;
        }
        return <span key={i}>{seg.content}</span>;
      })}
    </>
  );
}

interface PostBodyProps {
  sections: BlogSection[] | string | null | undefined;
  autoLinkMap?: AutoLinkMapping[];
  currentSlug?: string;
  usedHrefs: Set<string>;
}

export default function PostBody({ sections, autoLinkMap, currentSlug, usedHrefs }: PostBodyProps) {
  const parsedSections: BlogSection[] = (() => {
    if (Array.isArray(sections)) return sections;
    if (typeof sections !== "string" || !sections.trim()) return [];
    try {
      const parsed = JSON.parse(sections);
      return Array.isArray(parsed) ? (parsed as BlogSection[]) : [];
    } catch {
      return [];
    }
  })();

  return (
    <div className="max-w-none">
      {parsedSections.map((section, i) => {
        switch (section.type) {
          case "paragraph":
            return (
              <p key={i} className="mb-6 text-base leading-[1.9] text-[#4b5563] md:text-[17px]">
                <InlineText
                  text={section.text ?? ""}
                  autoLinkMap={autoLinkMap}
                  currentSlug={currentSlug}
                  usedHrefs={usedHrefs}
                />
              </p>
            );

          case "h2":
            return (
              <h2
                key={i}
                className="font-heading mt-12 mb-5 border-l-[3px] border-[#e97a52] pl-4 text-2xl font-bold text-[#3a6697] md:text-[1.625rem]"
              >
                <InlineText
                  text={section.text ?? ""}
                  autoLinkMap={autoLinkMap}
                  currentSlug={currentSlug}
                  usedHrefs={usedHrefs}
                  enableAutoLink={false}
                />
              </h2>
            );

          case "h3":
            return (
              <h3
                key={i}
                className="font-heading mt-8 mb-3 text-lg font-bold text-[#3a6697] md:text-xl"
              >
                <InlineText
                  text={section.text ?? ""}
                  autoLinkMap={autoLinkMap}
                  currentSlug={currentSlug}
                  usedHrefs={usedHrefs}
                  enableAutoLink={false}
                />
              </h3>
            );

          case "pullquote":
            return (
              <blockquote
                key={i}
                className="relative my-10 border-l-4 border-[#e97a52] bg-[#eef2f7] py-6 pl-8 pr-6"
              >
                <p className="font-heading text-xl font-bold italic leading-relaxed text-[#3a6697] md:text-2xl">
                  &ldquo;
                  <InlineText
                    text={section.text ?? ""}
                    autoLinkMap={autoLinkMap}
                    currentSlug={currentSlug}
                    usedHrefs={usedHrefs}
                  />
                  &rdquo;
                </p>
              </blockquote>
            );

          case "callout":
            return (
              <div
                key={i}
                className={`my-8 flex gap-4 border-l-4 p-5 md:p-6 ${
                  section.variant === "warning"
                    ? "border-amber-400 bg-amber-50"
                    : section.variant === "tip"
                      ? "border-[#e97a52] bg-[#eef2f7]"
                      : "border-[#3a6697] bg-[#eef2f7]"
                }`}
              >
                <div
                  className={`mt-0.5 shrink-0 ${
                    section.variant === "warning"
                      ? "text-amber-500"
                      : section.variant === "tip"
                        ? "text-[#e97a52]"
                        : "text-[#3a6697]"
                  }`}
                >
                  <i
                    className={`text-lg ${
                      section.variant === "warning"
                        ? "ri-alert-line"
                        : section.variant === "tip"
                          ? "ri-lightbulb-line"
                          : "ri-information-line"
                    }`}
                  />
                </div>
                <p
                  className={`text-sm leading-relaxed ${
                    section.variant === "warning" ? "text-amber-800" : "text-[#3a6697]"
                  }`}
                >
                  {section.text}
                </p>
              </div>
            );

          case "list":
            return (
              <ul key={i} className="my-6 space-y-3">
                {section.items?.map((item, j) => (
                  <li key={j} className="flex gap-3 text-base leading-relaxed text-[#4b5563]">
                    <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center bg-[#e97a52]">
                      <i className="ri-check-line text-[10px] text-white" />
                    </span>
                    <span>
                      <InlineText
                        text={item}
                        autoLinkMap={autoLinkMap}
                        currentSlug={currentSlug}
                        usedHrefs={usedHrefs}
                      />
                    </span>
                  </li>
                ))}
              </ul>
            );

          case "numbered":
            return (
              <ol key={i} className="my-6 space-y-4">
                {section.items?.map((item, j) => (
                  <li key={j} className="flex gap-4 text-base leading-relaxed text-[#4b5563]">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center bg-[#3a6697] text-[11px] font-bold text-white">
                      {j + 1}
                    </span>
                    <span className="pt-0.5">
                      <InlineText
                        text={item}
                        autoLinkMap={autoLinkMap}
                        currentSlug={currentSlug}
                        usedHrefs={usedHrefs}
                      />
                    </span>
                  </li>
                ))}
              </ol>
            );

          case "stat-row":
            return (
              <div key={i} className="my-10 grid grid-cols-1 gap-px bg-[#cdd8e8] sm:grid-cols-3">
                {section.stats?.map((stat, j) => (
                  <div key={j} className="bg-[#3a6697] p-6 text-center">
                    <p className="font-heading text-3xl font-bold text-[#e97a52] md:text-4xl">
                      {stat.value}
                    </p>
                    <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.15em] text-white/50">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            );

          case "table":
            return (
              <div key={i} className="my-8 w-full overflow-x-auto border border-[#cdd8e8]">
                <table className="w-full border-collapse text-left text-sm">
                  {section.tableHeaders && section.tableHeaders.length > 0 && (
                    <thead>
                      <tr className="bg-[#3a6697]">
                        {section.tableHeaders.map((header, j) => (
                          <th
                            key={j}
                            className="px-4 py-3 text-xs font-bold uppercase tracking-wider whitespace-nowrap text-white"
                          >
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                  )}
                  <tbody>
                    {section.tableRows?.map((row, j) => (
                      <tr
                        key={j}
                        className={j % 2 === 0 ? "bg-white" : "bg-[#eef2f7]"}
                      >
                        {row.map((cell, k) => (
                          <td
                            key={k}
                            className={`border-t border-[#cdd8e8] px-4 py-3 leading-relaxed text-[#64748b] ${
                              k === 0 ? "font-semibold text-[#3a6697]" : ""
                            }`}
                          >
                            <InlineText
                              text={cell}
                              autoLinkMap={autoLinkMap}
                              currentSlug={currentSlug}
                              usedHrefs={usedHrefs}
                            />
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );

          case "divider":
            return <div key={i} className="my-10 h-px bg-[#cdd8e8]" />;

          default:
            return null;
        }
      })}
    </div>
  );
}
