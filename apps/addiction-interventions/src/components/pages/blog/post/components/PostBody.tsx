import type { BlogSection } from "@sweetmedia/blog-core";
import { parseInlineLinks, type InlineSegment } from "@/lib/markdownToBlog";
import { autoLinkText, type LinkSegment, type AutoLinkMapping } from "@sweetmedia/blog-core";
import Link from "next/link";

function isExternal(href: string | undefined): boolean {
  if (!href) return false;
  return href.startsWith("http://") || href.startsWith("https://") || href.startsWith("//");
}

/**
 * Render auto-linked segments — either plain text or internal links.
 */
function AutoLinkedText({ segments }: { segments: LinkSegment[] }) {
  return (
    <>
      {segments.map((seg, i) => {
        if (seg.type === "text") return <span key={i}>{seg.content}</span>;
        return (
          <Link
            key={i}
            href={seg.href ?? "/"}
            className="text-[#507969] underline underline-offset-2 hover:text-[#3E5B50] transition-colors"
          >
            {seg.content}
          </Link>
        );
      })}
    </>
  );
}

/**
 * Render inline markdown links mixed with auto-linked text.
 * Priority: explicit markdown links > auto-links > plain text.
 *
 * `usedHrefs` is mutated in place so that each destination page is linked
 * at most once across the entire blog post.
 */
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
  // First, parse explicit markdown links
  const inlineSegments: InlineSegment[] = parseInlineLinks(text);

  return (
    <>
      {inlineSegments.map((seg, i) => {
        if (seg.type !== "link") {
          // Plain text — apply auto-linking (unless disabled, e.g. headings)
          if (enableAutoLink && autoLinkMap && autoLinkMap.length > 0) {
            const autoSegments = autoLinkText(
              seg.content,
              autoLinkMap,
              currentSlug,
              usedHrefs
            );
            return <AutoLinkedText key={i} segments={autoSegments} />;
          }
          return <span key={i}>{seg.content}</span>;
        }

        // Explicit markdown link — still track the href so auto-linker
        // won't create a second link to the same destination.
        if (seg.href) {
          usedHrefs.add(seg.href);
        }

        // Explicit markdown link
        if (isExternal(seg.href)) {
          return (
            <a
              key={i}
              href={seg.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#507969] underline underline-offset-2 hover:text-[#3E5B50] transition-colors"
            >
              {seg.content}
            </a>
          );
        }
        return (
          <Link
            key={i}
            href={seg.href ?? "/"}
            className="text-[#507969] underline underline-offset-2 hover:text-[#3E5B50] transition-colors"
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
    <div className="prose-custom max-w-none">
      {parsedSections.map((section, i) => {
        switch (section.type) {
          case "paragraph":
            return (
              <p
                key={i}
                className="text-[#4B4B4B] text-base md:text-[17px] leading-[1.85] mb-6"
              >
                <InlineText text={section.text ?? ""} autoLinkMap={autoLinkMap} currentSlug={currentSlug} usedHrefs={usedHrefs} />
              </p>
            );

          case "h2":
            return (
              <h2
                key={i}
                className="font-heading font-bold text-[#1A1A17] text-2xl md:text-3xl mt-12 mb-5"
                style={{ letterSpacing: "-0.01em" }}
              >
                <InlineText text={section.text ?? ""} autoLinkMap={autoLinkMap} currentSlug={currentSlug} usedHrefs={usedHrefs} enableAutoLink={false} />
              </h2>
            );

          case "h3":
            return (
              <h3
                key={i}
                className="font-heading font-bold text-[#1A1A17] text-lg mt-8 mb-3 tracking-tight"
              >
                <InlineText text={section.text ?? ""} autoLinkMap={autoLinkMap} currentSlug={currentSlug} usedHrefs={usedHrefs} enableAutoLink={false} />
              </h3>
            );

          case "pullquote":
            return (
              <blockquote
                key={i}
                className="relative my-10 pl-6 border-l-4 border-[#8FAC87] bg-[#F5F3E7] py-5 pr-6 rounded-r-xl"
              >
                <i className="ri-double-quotes-l text-2xl text-[#8FAC87]/50 block mb-2" />
                <p className="font-heading text-xl md:text-2xl font-bold italic text-[#1A1A17] leading-snug">
                  <InlineText text={section.text ?? ""} autoLinkMap={autoLinkMap} currentSlug={currentSlug} usedHrefs={usedHrefs} />
                </p>
              </blockquote>
            );

          case "callout":
            return (
              <div
                key={i}
                className={`my-8 rounded-xl p-5 md:p-6 flex gap-4 ${
                  section.variant === "warning"
                    ? "bg-amber-50 border border-amber-200"
                    : section.variant === "tip"
                    ? "bg-[#8FAC87]/10 border border-[#8FAC87]/30"
                    : "bg-[#F5F3E7] border border-[#EFEFEF]"
                }`}
              >
                <div className={`w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5 ${
                  section.variant === "warning" ? "text-amber-500" : "text-[#507969]"
                }`}>
                  <i className={`text-lg ${
                    section.variant === "warning" ? "ri-alert-line" : section.variant === "tip" ? "ri-lightbulb-line" : "ri-information-line"
                  }`}></i>
                </div>
                <p className={`text-sm leading-relaxed ${
                  section.variant === "warning" ? "text-amber-800" : "text-[#4B4B4B]"
                }`}>
                  {section.text}
                </p>
              </div>
            );

          case "list":
            return (
              <ul key={i} className="my-6 space-y-3">
                {section.items?.map((item, j) => (
                  <li key={j} className="flex gap-3 text-[#4B4B4B] text-base leading-relaxed">
                    <span className="w-5 h-5 rounded-full bg-[#8FAC87] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <i className="ri-check-line text-[10px] text-white"></i>
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
                  <li key={j} className="flex gap-4 text-[#4B4B4B] text-base leading-relaxed">
                    <span className="w-7 h-7 rounded-full bg-[#3E5B50] text-white text-[11px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
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
                  <div key={j} className={`rounded-2xl p-5 text-center ${j % 2 === 1 ? "bg-[#3E5B50]" : "bg-[#F5F3E7] border border-[#EFEFEF]"}`}>
                    <p
                      className={`font-heading text-3xl md:text-4xl font-bold mb-1 ${j % 2 === 1 ? "text-white" : "text-[#3E5B50]"}`}
                    >
                      {stat.value}
                    </p>
                    <p className={`text-[11px] tracking-[0.15em] uppercase font-semibold ${j % 2 === 1 ? "text-[#8FAC87]" : "text-[#4B4B4B]/60"}`}>
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            );

          case "table":
            return (
              <div key={i} className="my-8 w-full overflow-x-auto rounded-xl border border-[#EFEFEF]">
                <table className="w-full text-sm text-left border-collapse">
                  {section.tableHeaders && section.tableHeaders.length > 0 && (
                    <thead>
                      <tr className="bg-[#3E5B50]">
                        {section.tableHeaders.map((header, j) => (
                          <th
                            key={j}
                            className="px-4 py-3 text-white font-semibold text-xs tracking-wider uppercase whitespace-nowrap"
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
                        className={j % 2 === 0 ? "bg-white" : "bg-[#F5F3E7]"}
                      >
                        {row.map((cell, k) => (
                          <td
                            key={k}
                            className={`px-4 py-3 text-[#4B4B4B] leading-relaxed border-t border-[#EFEFEF] ${
                              k === 0 ? "font-semibold text-[#1A1A17]" : ""
                            }`}
                          >
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
            return <hr key={i} className="my-10 border-[#EFEFEF]" />;

          default:
            return null;
        }
      })}
    </div>
  );
}
