import type { BlogSection } from "@sweetmedia/blog-core";
import { parseInlineLinks, type InlineSegment } from "@/lib/markdownToBlog";
import { slugifyHeading } from "@/lib/slugify";
import { autoLinkText, type LinkSegment, type AutoLinkMapping } from "@sweetmedia/blog-core";
import Image from "next/image";
import Link from "next/link";

const linkClass =
  "text-[var(--sr-fern)] underline decoration-[var(--sr-sand)] underline-offset-2 transition hover:text-[var(--sr-moss)]";

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
            className={linkClass}
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
              className={linkClass}
            >
              {seg.content}
            </a>
          );
        }
        return (
          <Link
            key={i}
            href={seg.href ?? "/"}
            className={linkClass}
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
                className="mb-6 text-base leading-[1.85] text-[var(--sr-ink)]/80 md:text-[17px]"
                style={{ fontFamily: "var(--font-dm-sans)" }}
              >
                <InlineText text={section.text ?? ""} autoLinkMap={autoLinkMap} currentSlug={currentSlug} usedHrefs={usedHrefs} />
              </p>
            );

          case "h2": {
            const h2Text = section.text?.trim() ?? "";
            return (
              <h2
                key={i}
                id={h2Text ? slugifyHeading(h2Text) : undefined}
                className="scroll-mt-28 mt-14 mb-5 text-2xl font-light text-[var(--sr-ink)] md:text-[2rem]"
                style={{ fontFamily: "var(--font-cormorant)" }}
              >
                <InlineText text={h2Text} autoLinkMap={autoLinkMap} currentSlug={currentSlug} usedHrefs={usedHrefs} enableAutoLink={false} />
              </h2>
            );
          }

          case "h3":
            return (
              <h3
                key={i}
                className="mt-8 mb-3 text-lg font-semibold tracking-tight text-[var(--sr-ink)]"
                style={{ fontFamily: "var(--font-dm-sans)" }}
              >
                <InlineText text={section.text ?? ""} autoLinkMap={autoLinkMap} currentSlug={currentSlug} usedHrefs={usedHrefs} enableAutoLink={false} />
              </h3>
            );

          case "pullquote":
            return (
              <blockquote
                key={i}
                className="relative my-10 border-l-4 border-[var(--sr-moss)] pl-8"
              >
                <p
                  className="text-xl font-light italic leading-relaxed text-[var(--sr-ink)] md:text-2xl"
                  style={{ fontFamily: "var(--font-cormorant)" }}
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
                    : "border border-[var(--sr-sand)] bg-[var(--sr-parchment)]"
                }`}
              >
                <div className={`w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5 ${
                  section.variant === "warning" ? "text-amber-500" : section.variant === "tip" ? "text-emerald-600" : "text-[var(--sr-moss)]"
                }`}>
                  <i className={`text-lg ${
                    section.variant === "warning" ? "ri-alert-line" : section.variant === "tip" ? "ri-lightbulb-line" : "ri-information-line"
                  }`}></i>
                </div>
                <p className={`text-sm leading-relaxed ${
                  section.variant === "warning" ? "text-amber-800" : section.variant === "tip" ? "text-emerald-800" : "text-[var(--sr-ink)]/80"
                }`}>
                  {section.text}
                </p>
              </div>
            );

          case "list":
            return (
              <ul key={i} className="my-6 space-y-3">
                {section.items?.map((item, j) => (
                  <li key={j} className="flex gap-3 text-base leading-relaxed text-[var(--sr-ink)]/80">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--sr-moss)]/15">
                      <i className="ri-check-line text-[10px] text-[var(--sr-moss)]"></i>
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
                  <li key={j} className="flex gap-4 text-base leading-relaxed text-[var(--sr-ink)]/80">
                    <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--sr-moss)] text-[11px] font-bold text-[var(--sr-parchment)]">
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
                  <div key={j} className="rounded-xl bg-[var(--sr-moss)] p-5 text-center">
                    <p
                      className="mb-1 text-2xl font-bold text-[var(--sr-parchment)] md:text-3xl"
                      style={{ fontFamily: "var(--font-cormorant)" }}
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
              <div key={i} className="my-8 w-full overflow-x-auto rounded-xl border border-[var(--sr-sand)]">
                <table className="w-full border-collapse text-left text-sm">
                  {section.tableHeaders && section.tableHeaders.length > 0 && (
                    <thead>
                      <tr className="bg-[var(--sr-moss)]">
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
                        className={j % 2 === 0 ? "bg-[var(--sr-parchment)]" : "bg-[var(--sr-linen)]"}
                      >
                        {row.map((cell, k) => (
                          <td
                            key={k}
                            className={`border-t border-[var(--sr-sand)] px-4 py-3 leading-relaxed text-[var(--sr-ink)]/80 ${
                              k === 0 ? "font-medium text-[var(--sr-ink)]" : ""
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
            return <hr key={i} className="my-10 border-[var(--sr-sand)]" />;

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
