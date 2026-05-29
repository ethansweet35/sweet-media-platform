import type { BlogSection } from "@sweetmedia/blog-core";
import { parseInlineLinks, type InlineSegment } from "@/lib/markdownToBlog";
import { autoLinkText, type LinkSegment, type AutoLinkMapping } from "@sweetmedia/blog-core";
import { blogHeadingId } from "@/lib/blogHeadingId";
import Image from "next/image";
import Link from "next/link";

const LINK_CLASS =
  "font-semibold text-mbh-green underline decoration-mbh-green/30 underline-offset-2 transition hover:text-mbh-forest";

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
          <Link key={i} href={seg.href ?? "/"} className={LINK_CLASS}>
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
            const autoSegments = autoLinkText(
              seg.content,
              autoLinkMap,
              currentSlug,
              usedHrefs,
            );
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
              className={LINK_CLASS}
            >
              {seg.content}
            </a>
          );
        }
        return (
          <Link key={i} href={seg.href ?? "/"} className={LINK_CLASS}>
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

export default function PostBody({
  sections,
  autoLinkMap,
  currentSlug,
  usedHrefs,
}: PostBodyProps) {
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
    <>
      {parsedSections.map((section, i) => {
        switch (section.type) {
          case "paragraph":
            return (
              <p key={i}>
                <InlineText
                  text={section.text ?? ""}
                  autoLinkMap={autoLinkMap}
                  currentSlug={currentSlug}
                  usedHrefs={usedHrefs}
                />
              </p>
            );

          case "h2": {
            const id = blogHeadingId(section.text ?? "", i);
            return (
              <h2 key={i} id={id}>
                <InlineText
                  text={section.text ?? ""}
                  autoLinkMap={autoLinkMap}
                  currentSlug={currentSlug}
                  usedHrefs={usedHrefs}
                  enableAutoLink={false}
                />
              </h2>
            );
          }

          case "h3":
            return (
              <h3 key={i}>
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
                className="relative my-10 border-l-4 border-mbh-green py-1 pl-6 md:pl-8"
              >
                <p className="font-display text-xl font-medium italic leading-relaxed text-mbh-forest md:text-2xl">
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
                className={`my-8 flex gap-4 rounded-xl p-5 md:p-6 ${
                  section.variant === "warning"
                    ? "border border-amber-200/80 bg-amber-50"
                    : section.variant === "tip"
                      ? "border border-mbh-green/30 bg-mbh-green/8"
                      : "border border-mbh-forest/12 bg-cream"
                }`}
              >
                <span
                  className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center ${
                    section.variant === "warning"
                      ? "text-amber-600"
                      : section.variant === "tip"
                        ? "text-mbh-green"
                        : "text-mbh-forest"
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
                </span>
                <p
                  className={`font-body text-sm leading-relaxed ${
                    section.variant === "warning"
                      ? "text-amber-900"
                      : section.variant === "tip"
                        ? "text-mbh-forest"
                        : "text-mbh-body"
                  }`}
                >
                  {section.text}
                </p>
              </div>
            );

          case "list":
            return (
              <ul key={i} className="my-6 list-none space-y-3 pl-0">
                {section.items?.map((item, j) => (
                  <li key={j} className="flex gap-3 font-body text-[0.9375rem] leading-relaxed text-mbh-body">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-mbh-green/15 text-mbh-green">
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
              <ol key={i} className="my-6 list-none space-y-4 pl-0">
                {section.items?.map((item, j) => (
                  <li key={j} className="flex gap-4 font-body text-[0.9375rem] leading-relaxed text-mbh-body">
                    <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-mbh-forest font-body text-[11px] font-bold text-white">
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
                  <div
                    key={j}
                    className="rounded-xl bg-mbh-forest-deep px-5 py-6 text-center"
                  >
                    <p className="font-display text-2xl font-bold text-white md:text-3xl">
                      {stat.value}
                    </p>
                    <p className="mt-1 font-body text-[11px] font-semibold uppercase tracking-[0.15em] text-white/55">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            );

          case "table":
            return (
              <div
                key={i}
                className="my-8 w-full overflow-x-auto rounded-xl border border-mbh-forest/12"
              >
                <table className="w-full border-collapse text-left text-sm">
                  {section.tableHeaders && section.tableHeaders.length > 0 && (
                    <thead>
                      <tr className="bg-mbh-forest">
                        {section.tableHeaders.map((header, j) => (
                          <th
                            key={j}
                            className="whitespace-nowrap px-4 py-3 font-body text-xs font-semibold uppercase tracking-wider text-white"
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
                        className={j % 2 === 0 ? "bg-white" : "bg-cream"}
                      >
                        {row.map((cell, k) => (
                          <td
                            key={k}
                            className={`border-t border-mbh-forest/8 px-4 py-3 font-body leading-relaxed text-mbh-body ${
                              k === 0 ? "font-semibold text-mbh-forest" : ""
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
            return <hr key={i} className="section-divider" />;

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
                  className="mx-auto h-auto w-full max-w-2xl rounded-2xl ring-1 ring-mbh-forest/10"
                />
              </figure>
            );
          }

          default:
            return null;
        }
      })}
    </>
  );
}
