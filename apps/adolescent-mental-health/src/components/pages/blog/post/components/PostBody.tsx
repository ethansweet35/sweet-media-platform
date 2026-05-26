import type { BlogSection } from "@sweetmedia/blog-core";
import { parseInlineLinks, type InlineSegment } from "@/lib/markdownToBlog";
import { autoLinkText, type LinkSegment, type AutoLinkMapping } from "@sweetmedia/blog-core";
import Link from "next/link";
import { BLOG_HEADING } from "@/components/pages/blog/blogTokens";

function isExternal(href: string | undefined): boolean {
  if (!href) return false;
  return href.startsWith("http://") || href.startsWith("https://") || href.startsWith("//");
}

const linkClass =
  "font-semibold text-accent-dark underline underline-offset-2 transition hover:text-accent";

function AutoLinkedText({ segments }: { segments: LinkSegment[] }) {
  return (
    <>
      {segments.map((seg, i) => {
        if (seg.type === "text") return <span key={i}>{seg.content}</span>;
        return (
          <Link key={i} href={seg.href ?? "/"} className={linkClass}>
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

        if (seg.href) {
          usedHrefs.add(seg.href);
        }

        if (isExternal(seg.href)) {
          return (
            <a
              key={i}
              href={seg.href}
              target="_blank"
              rel="noopener noreferrer"
              className={linkClass}
            >
              {seg.content}
            </a>
          );
        }
        return (
          <Link key={i} href={seg.href ?? "/"} className={linkClass}>
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
              <p key={i} className="mb-6 text-base leading-[1.85] text-body md:text-[17px]">
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
                className="mt-12 mb-5 text-2xl font-bold text-ink md:text-3xl"
                style={BLOG_HEADING}
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
              <h3 key={i} className="mt-8 mb-3 text-lg font-bold tracking-tight text-ink">
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
              <blockquote key={i} className="relative my-10 border-l-4 border-accent pl-8">
                <p className="text-xl italic leading-relaxed text-ink md:text-2xl" style={BLOG_HEADING}>
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
                className={`my-8 flex gap-4 rounded-2xl p-5 md:p-6 ${
                  section.variant === "warning"
                    ? "border border-amber-200 bg-amber-50"
                    : section.variant === "tip"
                      ? "border border-emerald-200 bg-emerald-50"
                      : "border border-accent/20 bg-accent/5"
                }`}
              >
                <div
                  className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center ${
                    section.variant === "warning"
                      ? "text-amber-500"
                      : section.variant === "tip"
                        ? "text-emerald-600"
                        : "text-accent-dark"
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
                    aria-hidden
                  />
                </div>
                <p
                  className={`text-sm leading-relaxed ${
                    section.variant === "warning"
                      ? "text-amber-800"
                      : section.variant === "tip"
                        ? "text-emerald-800"
                        : "text-ink/80"
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
                  <li key={j} className="flex gap-3 text-base leading-relaxed text-body">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent text-white">
                      <i className="ri-check-line text-[10px]" aria-hidden />
                    </span>
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
              <ol key={i} className="my-6 space-y-4">
                {section.items?.map((item, j) => (
                  <li key={j} className="flex gap-4 text-base leading-relaxed text-body">
                    <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-dark text-[11px] font-bold text-white">
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
              <div key={i} className="my-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
                {section.stats?.map((stat, j) => (
                  <div key={j} className="rounded-2xl bg-dark p-5 text-center">
                    <p className="mb-1 text-2xl font-bold text-white md:text-3xl" style={BLOG_HEADING}>
                      {stat.value}
                    </p>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-white/50">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            );

          case "table":
            return (
              <div key={i} className="my-8 w-full overflow-x-auto rounded-2xl border border-border">
                <table className="w-full border-collapse text-left text-sm">
                  {section.tableHeaders && section.tableHeaders.length > 0 ? (
                    <thead>
                      <tr className="bg-dark">
                        {section.tableHeaders.map((header, j) => (
                          <th
                            key={j}
                            className="whitespace-nowrap px-4 py-3 text-xs font-semibold uppercase tracking-wider text-white"
                          >
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                  ) : null}
                  <tbody>
                    {section.tableRows?.map((row, j) => (
                      <tr key={j} className={j % 2 === 0 ? "bg-white" : "bg-surface-muted"}>
                        {row.map((cell, k) => (
                          <td
                            key={k}
                            className={`border-t border-border px-4 py-3 leading-relaxed text-body ${
                              k === 0 ? "font-semibold text-ink" : ""
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
            return <hr key={i} className="my-10 border-border" />;

          default:
            return null;
        }
      })}
    </div>
  );
}
