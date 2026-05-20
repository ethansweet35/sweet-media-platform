import type { BlogSection } from "@sweetmedia/blog-core";
import { parseInlineLinks, type InlineSegment } from "@/lib/markdownToBlog";
import { autoLinkText, type LinkSegment, type AutoLinkMapping } from "@sweetmedia/blog-core";
import Image from "next/image";
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
            className="text-[#1F2937] underline underline-offset-2 hover:opacity-70 transition-opacity"
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
              className="text-[#1F2937] underline underline-offset-2 hover:opacity-70 transition-opacity"
            >
              {seg.content}
            </a>
          );
        }
        return (
          <Link
            key={i}
            href={seg.href ?? "/"}
            className="text-[#1F2937] underline underline-offset-2 hover:opacity-70 transition-opacity"
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
                className="text-[#3A4A3C]/75 text-base md:text-[17px] leading-[1.85] mb-6"
              >
                <InlineText text={section.text ?? ""} autoLinkMap={autoLinkMap} currentSlug={currentSlug} usedHrefs={usedHrefs} />
              </p>
            );

          case "h2":
            return (
              <h2
                key={i}
                className="text-2xl md:text-3xl font-light text-[#1F2937] mt-12 mb-5"
                style={{ fontFamily: "'Inter', serif" }}
              >
                <InlineText text={section.text ?? ""} autoLinkMap={autoLinkMap} currentSlug={currentSlug} usedHrefs={usedHrefs} enableAutoLink={false} />
              </h2>
            );

          case "h3":
            return (
              <h3
                key={i}
                className="text-lg font-semibold text-[#3A4A3C] mt-8 mb-3 tracking-tight"
              >
                <InlineText text={section.text ?? ""} autoLinkMap={autoLinkMap} currentSlug={currentSlug} usedHrefs={usedHrefs} enableAutoLink={false} />
              </h3>
            );

          case "pullquote":
            return (
              <blockquote
                key={i}
                className="relative my-10 pl-8 border-l-4 border-[#1F2937]"
              >
                <p
                  className="text-xl md:text-2xl font-light text-[#3A4A3C] leading-relaxed italic"
                  style={{ fontFamily: "'Inter', serif" }}
                >
                  &ldquo;<InlineText text={section.text ?? ""} autoLinkMap={autoLinkMap} currentSlug={currentSlug} usedHrefs={usedHrefs} />&rdquo;
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
                    ? "bg-emerald-50 border border-emerald-200"
                    : "bg-[#1F2937]/5 border border-[#1F2937]/15"
                }`}
              >
                <div className={`w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5 ${
                  section.variant === "warning" ? "text-amber-500" : section.variant === "tip" ? "text-emerald-600" : "text-[#1F2937]"
                }`}>
                  <i className={`text-lg ${
                    section.variant === "warning" ? "ri-alert-line" : section.variant === "tip" ? "ri-lightbulb-line" : "ri-information-line"
                  }`}></i>
                </div>
                <p className={`text-sm leading-relaxed ${
                  section.variant === "warning" ? "text-amber-800" : section.variant === "tip" ? "text-emerald-800" : "text-[#1F2937]/80"
                }`}>
                  {section.text}
                </p>
              </div>
            );

          case "list":
            return (
              <ul key={i} className="my-6 space-y-3">
                {section.items?.map((item, j) => (
                  <li key={j} className="flex gap-3 text-[#3A4A3C]/75 text-base leading-relaxed">
                    <span className="w-5 h-5 rounded-full bg-[#1F2937]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <i className="ri-check-line text-[10px] text-[#1F2937]"></i>
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
                  <li key={j} className="flex gap-4 text-[#3A4A3C]/75 text-base leading-relaxed">
                    <span className="w-7 h-7 rounded-full bg-[#1F2937] text-white text-[11px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
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
                  <div key={j} className="bg-[#1F2937] rounded-xl p-5 text-center">
                    <p
                      className="text-2xl md:text-3xl font-bold text-white mb-1"
                      style={{ fontFamily: "'Inter', serif" }}
                    >
                      {stat.value}
                    </p>
                    <p className="text-[11px] tracking-[0.15em] uppercase text-white/50 font-medium">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            );

          case "table":
            return (
              <div key={i} className="my-8 w-full overflow-x-auto rounded-xl border border-[#6B7D67]/20">
                <table className="w-full text-sm text-left border-collapse">
                  {section.tableHeaders && section.tableHeaders.length > 0 && (
                    <thead>
                      <tr className="bg-[#1F2937]">
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
                        className={j % 2 === 0 ? "bg-[#F8FAFC]" : "bg-[#E2E8F0]"}
                      >
                        {row.map((cell, k) => (
                          <td
                            key={k}
                            className={`px-4 py-3 text-neutral-700 leading-relaxed border-t border-neutral-100 ${
                              k === 0 ? "font-medium text-[#1F2937]" : ""
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
            return <hr key={i} className="my-10 border-neutral-100" />;

          case "image": {
            const src = section.text?.trim();
            if (!src) return null;
            const alt = section.alt?.trim() || "Blog illustration";
            return (
              <figure key={i} className="my-10">
                <Image
                  src={src}
                  alt={alt}
                  width={1024}
                  height={1536}
                  sizes="(max-width: 768px) 100vw, 720px"
                  className="mx-auto w-full max-w-2xl h-auto rounded-2xl"
                />
              </figure>
            );
          }

          default:
            return null;
        }
      })}
    </div>
  );
}
