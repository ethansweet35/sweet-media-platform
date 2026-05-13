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
              <p key={i} className="text-ink/75 text-[16.5px] leading-[1.95] mb-7 font-light">
                <InlineText text={section.text ?? ""} autoLinkMap={autoLinkMap} currentSlug={currentSlug} usedHrefs={usedHrefs} />
              </p>
            );

          case "h2":
            return (
              <div key={i} className="mt-16 mb-6">
                <h2
                  className="font-[family-name:var(--font-display)] font-normal text-ink leading-[1.1]"
                  style={{ fontSize: "clamp(24px, 2.4vw, 34px)" }}
                >
                  <InlineText text={section.text ?? ""} autoLinkMap={autoLinkMap} currentSlug={currentSlug} usedHrefs={usedHrefs} enableAutoLink={false} />
                </h2>
                <span className="block w-8 h-[2px] bg-accent mt-3" />
              </div>
            );

          case "h3":
            return (
              <h3
                key={i}
                className="font-[family-name:var(--font-display)] italic font-normal text-ink mt-10 mb-3"
                style={{ fontSize: "clamp(18px, 1.8vw, 22px)" }}
              >
                <InlineText text={section.text ?? ""} autoLinkMap={autoLinkMap} currentSlug={currentSlug} usedHrefs={usedHrefs} enableAutoLink={false} />
              </h3>
            );

          case "pullquote":
            return (
              <blockquote key={i} className="relative my-12 bg-cream px-8 py-8 border-l-[3px] border-accent">
                <span
                  className="block font-[family-name:var(--font-display)] text-accent/30 leading-none select-none mb-2"
                  style={{ fontSize: "72px", lineHeight: 0.8 }}
                  aria-hidden="true"
                >
                  &ldquo;
                </span>
                <p
                  className="font-[family-name:var(--font-display)] font-normal text-ink/80 leading-relaxed italic"
                  style={{ fontSize: "clamp(19px, 1.9vw, 26px)" }}
                >
                  <InlineText text={section.text ?? ""} autoLinkMap={autoLinkMap} currentSlug={currentSlug} usedHrefs={usedHrefs} />
                </p>
              </blockquote>
            );

          case "callout":
            return (
              <div
                key={i}
                className={`my-8 pl-5 pr-6 py-5 flex gap-4 border-l-[3px] ${
                  section.variant === "warning"
                    ? "bg-amber-50/60 border-l-amber-400"
                    : section.variant === "tip"
                    ? "bg-emerald-50/60 border-l-emerald-500"
                    : "bg-cream border-l-accent"
                }`}
              >
                <div className={`shrink-0 mt-0.5 ${
                  section.variant === "warning" ? "text-amber-500" : section.variant === "tip" ? "text-emerald-600" : "text-accent"
                }`}>
                  <i className={`text-[18px] ${
                    section.variant === "warning" ? "ri-alert-line" : section.variant === "tip" ? "ri-seedling-line" : "ri-heart-pulse-line"
                  }`} />
                </div>
                <p className={`text-[14.5px] leading-relaxed font-light ${
                  section.variant === "warning" ? "text-amber-900/80" : section.variant === "tip" ? "text-emerald-900/80" : "text-ink/75"
                }`}>
                  {section.text}
                </p>
              </div>
            );

          case "list":
            return (
              <ul key={i} className="my-7 space-y-3.5">
                {section.items?.map((item, j) => (
                  <li key={j} className="flex gap-4 text-ink/75 text-[15.5px] leading-relaxed font-light">
                    <span className="w-[7px] h-[7px] rotate-45 bg-accent shrink-0 mt-[9px]" />
                    <InlineText text={item} autoLinkMap={autoLinkMap} currentSlug={currentSlug} usedHrefs={usedHrefs} />
                  </li>
                ))}
              </ul>
            );

          case "numbered":
            return (
              <ol key={i} className="my-7 space-y-5">
                {section.items?.map((item, j) => (
                  <li key={j} className="flex gap-4 text-ink/75 text-[15.5px] leading-relaxed font-light">
                    <span className="w-7 h-7 rounded-full bg-accent/15 border border-accent/30 text-accent text-[11px] font-semibold flex items-center justify-center shrink-0 mt-0.5">
                      {j + 1}
                    </span>
                    <span className="pt-0.5">
                      <InlineText text={item} autoLinkMap={autoLinkMap} currentSlug={currentSlug} usedHrefs={usedHrefs} />
                    </span>
                  </li>
                ))}
              </ol>
            );

          case "stat-row":
            return (
              <div key={i} className="my-12 grid grid-cols-1 sm:grid-cols-3 gap-px bg-warm overflow-hidden border border-warm">
                {section.stats?.map((stat, j) => (
                  <div key={j} className="bg-cream-tile px-6 py-8 text-center">
                    <p
                      className="font-[family-name:var(--font-display)] font-normal text-accent mb-2"
                      style={{ fontSize: "clamp(30px, 3vw, 42px)" }}
                    >
                      {stat.value}
                    </p>
                    <p className="text-[10px] tracking-[0.2em] uppercase text-muted font-medium">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            );

          case "table":
            return (
              <div key={i} className="my-10 w-full overflow-x-auto border border-warm">
                <table className="w-full text-sm text-left border-collapse">
                  {section.tableHeaders && section.tableHeaders.length > 0 && (
                    <thead>
                      <tr className="bg-cream border-b border-warm">
                        {section.tableHeaders.map((header, j) => (
                          <th key={j} className="px-5 py-3.5 text-ink font-semibold text-[10.5px] tracking-[0.12em] uppercase whitespace-nowrap">
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                  )}
                  <tbody>
                    {section.tableRows?.map((row, j) => (
                      <tr key={j} className={j % 2 === 0 ? "bg-white" : "bg-cream-tile"}>
                        {row.map((cell, k) => (
                          <td key={k} className={`px-5 py-3.5 text-[14px] leading-relaxed border-t border-soft ${k === 0 ? "font-medium text-ink" : "font-light text-ink/70"}`}>
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
            return (
              <div key={i} className="my-14 flex items-center gap-4">
                <span className="flex-1 block h-px bg-warm" />
                <span className="w-2 h-2 rotate-45 bg-accent/50 shrink-0" />
                <span className="flex-1 block h-px bg-warm" />
              </div>
            );

          default:
            return null;
        }
      })}
    </div>
  );
}
