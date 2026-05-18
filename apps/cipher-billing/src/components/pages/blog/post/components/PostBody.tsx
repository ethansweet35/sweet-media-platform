import type { BlogSection } from "@sweetmedia/blog-core";
import { parseInlineLinks, type InlineSegment } from "@/lib/markdownToBlog";
import { autoLinkText, type LinkSegment, type AutoLinkMapping } from "@sweetmedia/blog-core";
import Link from "next/link";
import { decodeEntities } from "@/lib/decodeEntities";

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
            className="text-[#166C96] underline underline-offset-2 hover:text-[#101E3F] transition-colors"
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
  const inlineSegments: InlineSegment[] = parseInlineLinks(decodeEntities(text));

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
              className="text-[#166C96] underline underline-offset-2 hover:text-[#101E3F] transition-colors"
            >
              {seg.content}
            </a>
          );
        }
        return (
          <Link
            key={i}
            href={seg.href ?? "/"}
            className="text-[#166C96] underline underline-offset-2 hover:text-[#101E3F] transition-colors"
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
    <div className="cipher-prose">
      {parsedSections.map((section, i) => {
        switch (section.type) {
          case "paragraph":
            return (
              <p
                key={i}
                className="text-[#2C3E50] leading-[1.9] mb-5 text-[15px]"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
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
                className="text-[#101E3F] mt-12 mb-4 leading-snug border-l-4 border-[#166C96] pl-4"
                style={{
                  fontFamily: "'Marcellus', serif",
                  fontSize: "clamp(20px, 2.2vw, 28px)",
                }}
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
                className="text-[#101E3F] font-semibold mt-8 mb-3 text-base tracking-tight"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
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
                className="my-10 bg-[#101E3F] px-8 py-7 relative"
              >
                <div className="absolute top-0 left-0 w-1 h-full bg-[#166C96]" />
                <p
                  className="text-white text-lg leading-relaxed"
                  style={{ fontFamily: "'Marcellus', serif" }}
                >
                  &ldquo;{decodeEntities(section.text ?? "")}&rdquo;
                </p>
              </blockquote>
            );

          case "callout":
            return (
              <div
                key={i}
                className={`my-8 p-5 md:p-6 flex gap-4 border-l-4 ${
                  section.variant === "warning"
                    ? "bg-amber-50 border-amber-400"
                    : section.variant === "tip"
                    ? "bg-[#166C96]/6 border-[#166C96]"
                    : "bg-[#101E3F]/5 border-[#101E3F]"
                }`}
              >
                <div
                  className={`w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5 ${
                    section.variant === "warning"
                      ? "text-amber-500"
                      : section.variant === "tip"
                      ? "text-[#166C96]"
                      : "text-[#101E3F]"
                  }`}
                >
                  <i
                    className={`text-base ${
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
                    section.variant === "warning"
                      ? "text-amber-800"
                      : section.variant === "tip"
                      ? "text-[#101E3F]"
                      : "text-[#101E3F]"
                  }`}
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  {decodeEntities(section.text ?? "")}
                </p>
              </div>
            );

          case "list":
            return (
              <ul key={i} className="my-5 space-y-2.5">
                {section.items?.map((item, j) => (
                  <li
                    key={j}
                    className="flex gap-3 text-[#2C3E50] text-[15px] leading-relaxed"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    <span className="w-1.5 h-1.5 bg-[#166C96] flex-shrink-0 mt-2.5 rounded-full" />
                    <InlineText
                      text={item}
                      autoLinkMap={autoLinkMap}
                      currentSlug={currentSlug}
                      usedHrefs={usedHrefs}
                    />
                  </li>
                ))}
              </ul>
            );

          case "numbered":
            return (
              <ol key={i} className="my-5 space-y-3">
                {section.items?.map((item, j) => (
                  <li
                    key={j}
                    className="flex gap-4 text-[#2C3E50] text-[15px] leading-relaxed"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    <span
                      className="w-7 h-7 bg-[#166C96] text-white text-[11px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ fontFamily: "'Montserrat', sans-serif" }}
                    >
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
              <div key={i} className="my-10 grid grid-cols-1 sm:grid-cols-3 gap-px bg-[#101E3F]/10">
                {section.stats?.map((stat, j) => (
                  <div key={j} className="bg-[#101E3F] p-6 text-center">
                    <p
                      className="text-3xl text-white mb-1"
                      style={{ fontFamily: "'Marcellus', serif" }}
                    >
                      {stat.value}
                    </p>
                    <p
                      className="text-[10px] tracking-[0.2em] uppercase text-[#166C96] font-medium"
                      style={{ fontFamily: "'Montserrat', sans-serif" }}
                    >
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            );

          case "table":
            return (
              <div key={i} className="my-8 w-full overflow-x-auto border border-[#101E3F]/15">
                <table className="w-full text-sm text-left border-collapse">
                  {section.tableHeaders && section.tableHeaders.length > 0 && (
                    <thead>
                      <tr className="bg-[#101E3F]">
                        {section.tableHeaders.map((header, j) => (
                          <th
                            key={j}
                            className="px-4 py-3 text-white font-semibold text-[10px] tracking-[0.2em] uppercase whitespace-nowrap border-r border-white/10 last:border-r-0"
                            style={{ fontFamily: "'Montserrat', sans-serif" }}
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
                        className={j % 2 === 0 ? "bg-white" : "bg-[#F5F7FA]"}
                      >
                        {row.map((cell, k) => (
                          <td
                            key={k}
                            className={`px-4 py-3 text-[#2C3E50] text-[13px] leading-relaxed border-t border-[#101E3F]/8 border-r border-r-[#101E3F]/8 last:border-r-0 ${
                              k === 0 ? "font-semibold text-[#101E3F]" : ""
                            }`}
                            style={{ fontFamily: "'Montserrat', sans-serif" }}
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
            return (
              <div key={i} className="my-12 flex items-center gap-4">
                <div className="flex-1 h-px bg-[#101E3F]/10" />
                <div className="w-1.5 h-1.5 bg-[#166C96]" />
                <div className="flex-1 h-px bg-[#101E3F]/10" />
              </div>
            );

          default:
            return null;
        }
      })}
    </div>
  );
}
