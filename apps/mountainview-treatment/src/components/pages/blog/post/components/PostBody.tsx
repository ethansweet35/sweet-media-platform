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
            className="text-[var(--mvt-forest)] underline underline-offset-2 transition-opacity hover:opacity-70"
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
              className="text-[var(--mvt-forest)] underline underline-offset-2 transition-opacity hover:opacity-70"
            >
              {seg.content}
            </a>
          );
        }
        return (
          <Link
            key={i}
            href={seg.href ?? "/"}
            className="text-[var(--mvt-forest)] underline underline-offset-2 transition-opacity hover:opacity-70"
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
              <p key={i} className="mb-6 text-base leading-[1.85] text-[var(--mvt-text)] md:text-[17px]">
                <InlineText text={section.text ?? ""} autoLinkMap={autoLinkMap} currentSlug={currentSlug} usedHrefs={usedHrefs} />
              </p>
            );

          case "h2":
            return (
              <h2
                key={i}
                className="font-heading mb-5 mt-12 text-2xl font-bold leading-tight text-[var(--mvt-ink)] md:text-3xl"
              >
                <InlineText text={section.text ?? ""} autoLinkMap={autoLinkMap} currentSlug={currentSlug} usedHrefs={usedHrefs} enableAutoLink={false} />
              </h2>
            );

          case "h3":
            return (
              <h3
                key={i}
                className="font-heading mb-3 mt-8 text-lg font-bold tracking-tight text-[var(--mvt-forest)] md:text-xl"
              >
                <InlineText text={section.text ?? ""} autoLinkMap={autoLinkMap} currentSlug={currentSlug} usedHrefs={usedHrefs} enableAutoLink={false} />
              </h3>
            );

          case "pullquote":
            return (
              <blockquote key={i} className="relative my-10 border-l-4 border-[var(--mvt-teal)] pl-7">
                <p className="font-heading text-xl font-bold italic leading-relaxed text-[var(--mvt-ink)] md:text-2xl">
                  &ldquo;<InlineText text={section.text ?? ""} autoLinkMap={autoLinkMap} currentSlug={currentSlug} usedHrefs={usedHrefs} />&rdquo;
                </p>
              </blockquote>
            );

          case "callout":
            return (
              <div
                key={i}
                className={`my-8 flex gap-4 rounded-xl p-5 md:p-6 ${
                  section.variant === "warning"
                    ? "border border-amber-200 bg-amber-50"
                    : section.variant === "tip"
                    ? "border border-[var(--mvt-teal-light)]/30 bg-[var(--mvt-teal-light)]/8"
                    : "border border-[var(--mvt-teal)]/20 bg-[var(--mvt-cream)]"
                }`}
              >
                <div className={`mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center ${
                  section.variant === "warning"
                    ? "text-amber-500"
                    : section.variant === "tip"
                    ? "text-[var(--mvt-teal)]"
                    : "text-[var(--mvt-teal)]"
                }`}>
                  <i className={`text-lg ${
                    section.variant === "warning" ? "ri-alert-line" : section.variant === "tip" ? "ri-lightbulb-line" : "ri-information-line"
                  }`} />
                </div>
                <p className={`text-sm leading-relaxed ${
                  section.variant === "warning"
                    ? "text-amber-800"
                    : "text-[var(--mvt-forest)]"
                }`}>
                  {section.text}
                </p>
              </div>
            );

          case "list":
            return (
              <ul key={i} className="my-6 space-y-3">
                {section.items?.map((item, j) => (
                  <li key={j} className="flex gap-3 text-base leading-relaxed text-[var(--mvt-text)]">
                    <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-[var(--mvt-teal)] text-white">
                      <i className="ri-check-line text-[10px]" />
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
                  <li key={j} className="flex gap-4 text-base leading-relaxed text-[var(--mvt-text)]">
                    <span className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-[var(--mvt-ink)] text-[11px] font-bold text-white">
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
              <div key={i} className="my-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
                {section.stats?.map((stat, j) => (
                  <div key={j} className="rounded-2xl bg-[var(--mvt-ink)] p-6 text-center">
                    <p className="font-heading text-3xl font-bold text-[var(--mvt-teal-light)]">
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
              <div key={i} className="my-8 w-full overflow-x-auto rounded-2xl border border-[var(--mvt-cream-2)]">
                <table className="w-full border-collapse text-left text-sm">
                  {section.tableHeaders && section.tableHeaders.length > 0 && (
                    <thead>
                      <tr className="bg-[var(--mvt-ink)]">
                        {section.tableHeaders.map((header, j) => (
                          <th key={j} className="whitespace-nowrap px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-white">
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                  )}
                  <tbody>
                    {section.tableRows?.map((row, j) => (
                      <tr key={j} className={j % 2 === 0 ? "bg-white" : "bg-[var(--mvt-cream)]"}>
                        {row.map((cell, k) => (
                          <td
                            key={k}
                            className={`border-t border-[var(--mvt-cream-2)] px-5 py-3.5 leading-relaxed text-[var(--mvt-muted)] ${
                              k === 0 ? "font-semibold text-[var(--mvt-ink)]" : ""
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
            return <hr key={i} className="my-10 border-[var(--mvt-cream-2)]" />;

          default:
            return null;
        }
      })}
    </div>
  );
}
