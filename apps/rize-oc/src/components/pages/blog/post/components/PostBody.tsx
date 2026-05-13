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
            className="text-accent underline underline-offset-2 hover:opacity-70 transition-opacity"
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

  return (
    <>
      {inlineSegments.map((seg, i) => {
        if (seg.type !== "link") {
          if (enableAutoLink && autoLinkMap && autoLinkMap.length > 0) {
            const autoSegments = autoLinkText(seg.content, autoLinkMap, currentSlug, usedHrefs);
            return <AutoLinkedText key={i} segments={autoSegments} />;
          }
          return <span key={i}>{seg.content}</span>;
        }

        if (seg.href) usedHrefs.add(seg.href);

        if (isExternal(seg.href)) {
          return (
            <a
              key={i}
              href={seg.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent underline underline-offset-2 hover:opacity-70 transition-opacity"
            >
              {seg.content}
            </a>
          );
        }
        return (
          <Link
            key={i}
            href={seg.href ?? "/"}
            className="text-accent underline underline-offset-2 hover:opacity-70 transition-opacity"
          >
            {seg.content}
          </Link>
        );
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
              <p key={i} className="text-ink/70 text-[16px] leading-[1.9] mb-6 font-light">
                <InlineText text={section.text ?? ""} autoLinkMap={autoLinkMap} currentSlug={currentSlug} usedHrefs={usedHrefs} />
              </p>
            );

          case "h2":
            return (
              <h2
                key={i}
                className="font-[family-name:var(--font-display)] font-normal text-ink mt-14 mb-5"
                style={{ fontSize: "clamp(22px, 2.2vw, 32px)" }}
              >
                <InlineText text={section.text ?? ""} autoLinkMap={autoLinkMap} currentSlug={currentSlug} usedHrefs={usedHrefs} enableAutoLink={false} />
              </h2>
            );

          case "h3":
            return (
              <h3 key={i} className="text-[17px] font-semibold text-ink mt-9 mb-3 tracking-tight">
                <InlineText text={section.text ?? ""} autoLinkMap={autoLinkMap} currentSlug={currentSlug} usedHrefs={usedHrefs} enableAutoLink={false} />
              </h3>
            );

          case "pullquote":
            return (
              <blockquote key={i} className="relative my-12 pl-7 border-l-[3px] border-accent">
                <p
                  className="font-[family-name:var(--font-display)] font-normal text-ink/80 leading-relaxed italic"
                  style={{ fontSize: "clamp(20px, 2vw, 28px)" }}
                >
                  &ldquo;<InlineText text={section.text ?? ""} autoLinkMap={autoLinkMap} currentSlug={currentSlug} usedHrefs={usedHrefs} />&rdquo;
                </p>
              </blockquote>
            );

          case "callout":
            return (
              <div
                key={i}
                className={`my-8 p-5 md:p-6 flex gap-4 border ${
                  section.variant === "warning"
                    ? "bg-amber-50 border-amber-200"
                    : section.variant === "tip"
                    ? "bg-emerald-50 border-emerald-200"
                    : "bg-cream border-[#DCDCDC]"
                }`}
              >
                <div className={`w-5 h-5 flex items-center justify-center shrink-0 mt-0.5 ${
                  section.variant === "warning" ? "text-amber-500" : section.variant === "tip" ? "text-emerald-600" : "text-accent"
                }`}>
                  <i className={`text-lg ${
                    section.variant === "warning" ? "ri-alert-line" : section.variant === "tip" ? "ri-lightbulb-line" : "ri-information-line"
                  }`} />
                </div>
                <p className={`text-[14px] leading-relaxed font-light ${
                  section.variant === "warning" ? "text-amber-800" : section.variant === "tip" ? "text-emerald-800" : "text-ink/70"
                }`}>
                  {section.text}
                </p>
              </div>
            );

          case "list":
            return (
              <ul key={i} className="my-6 space-y-3">
                {section.items?.map((item, j) => (
                  <li key={j} className="flex gap-3 text-ink/70 text-[15px] leading-relaxed font-light">
                    <span className="w-5 h-5 rounded-full bg-accent/15 flex items-center justify-center shrink-0 mt-0.5">
                      <i className="ri-check-line text-[10px] text-accent" />
                    </span>
                    <InlineText text={item} autoLinkMap={autoLinkMap} currentSlug={currentSlug} usedHrefs={usedHrefs} />
                  </li>
                ))}
              </ul>
            );

          case "numbered":
            return (
              <ol key={i} className="my-6 space-y-4">
                {section.items?.map((item, j) => (
                  <li key={j} className="flex gap-4 text-ink/70 text-[15px] leading-relaxed font-light">
                    <span className="w-7 h-7 rounded-full bg-ink text-white text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {j + 1}
                    </span>
                    <span className="pt-0.5"><InlineText text={item} autoLinkMap={autoLinkMap} currentSlug={currentSlug} usedHrefs={usedHrefs} /></span>
                  </li>
                ))}
              </ol>
            );

          case "stat-row":
            return (
              <div key={i} className="my-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
                {section.stats?.map((stat, j) => (
                  <div key={j} className="bg-ink p-6 text-center">
                    <p
                      className="font-[family-name:var(--font-display)] font-normal text-white mb-1"
                      style={{ fontSize: "clamp(26px, 2.5vw, 36px)" }}
                    >
                      {stat.value}
                    </p>
                    <p className="text-[10px] tracking-[0.18em] uppercase text-white/50 font-medium">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            );

          case "table":
            return (
              <div key={i} className="my-8 w-full overflow-x-auto border border-[#DCDCDC]">
                <table className="w-full text-sm text-left border-collapse">
                  {section.tableHeaders && section.tableHeaders.length > 0 && (
                    <thead>
                      <tr className="bg-ink">
                        {section.tableHeaders.map((header, j) => (
                          <th key={j} className="px-5 py-3 text-white font-semibold text-[11px] tracking-wider uppercase whitespace-nowrap">
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                  )}
                  <tbody>
                    {section.tableRows?.map((row, j) => (
                      <tr key={j} className={j % 2 === 0 ? "bg-white" : "bg-cream"}>
                        {row.map((cell, k) => (
                          <td key={k} className={`px-5 py-3 text-ink/70 text-[14px] leading-relaxed border-t border-[#EBEBEB] ${k === 0 ? "font-medium text-ink" : "font-light"}`}>
                            <InlineText text={cell} autoLinkMap={autoLinkMap} currentSlug={currentSlug} usedHrefs={usedHrefs} />
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );

          case "divider":
            return <hr key={i} className="my-12 border-[#EBEBEB]" />;

          default:
            return null;
        }
      })}
    </div>
  );
}
