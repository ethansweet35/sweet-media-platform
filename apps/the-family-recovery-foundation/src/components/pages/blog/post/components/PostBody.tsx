import type { ReactNode } from "react";
import type { BlogSection } from "@sweetmedia/blog-core";
import {
  stripInlineMarkdown,
  normalizeSections,
  parseEmbeddedHeading,
  isResourceSectionHeading,
} from "@sweetmedia/blog-core";
import { parseInlineLinks, type InlineSegment } from "@/lib/markdownToBlog";
import { autoLinkText, type LinkSegment, type AutoLinkMapping } from "@sweetmedia/blog-core";
import { sanitizeBlogImageSrc, shouldUnoptimizeBlogImage } from "@/lib/blogImages";
import Image from "next/image";
import Link from "next/link";

const linkClass =
  "font-semibold text-tfrf-blue underline decoration-tfrf-blue/30 underline-offset-4 transition-colors hover:text-deep-navy";

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
  const inlineSegments: InlineSegment[] = parseInlineLinks(stripInlineMarkdown(text));

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

function SectionLabel({ text }: { text: string }) {
  return (
    <h3 className="mt-12 mb-5 flex items-center gap-3 border-l-4 border-tfrf-blue pl-4 font-display text-[22px] md:text-2xl font-medium text-deep-navy leading-snug">
      {text}
    </h3>
  );
}

function ResourceBlock({
  title,
  items,
  autoLinkMap,
  currentSlug,
  usedHrefs,
}: {
  title: string;
  items: string[];
  autoLinkMap?: AutoLinkMapping[];
  currentSlug?: string;
  usedHrefs: Set<string>;
}) {
  const icon = title.toLowerCase().includes("link") ? "ri-links-line" : "ri-hand-heart-line";

  return (
    <div className="mt-12 rounded-2xl border border-tfrf-blue/20 bg-gradient-to-br from-powder-blue/50 via-pure-white to-soft-white p-6 md:p-8 shadow-sm">
      <div className="mb-5 flex items-center gap-3">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-tfrf-blue text-pure-white shadow-sm">
          <i className={`${icon} text-lg`} />
        </span>
        <h3 className="font-display text-xl md:text-2xl text-deep-navy leading-snug">{title}</h3>
      </div>
      <ul className="space-y-3 border-t border-mist/80 pt-5">
        {items.map((item, j) => (
          <li key={j} className="font-body text-body-m leading-relaxed">
            <InlineText
              text={item}
              autoLinkMap={autoLinkMap}
              currentSlug={currentSlug}
              usedHrefs={usedHrefs}
            />
          </li>
        ))}
      </ul>
    </div>
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
    let raw: BlogSection[] = [];
    if (Array.isArray(sections)) raw = sections;
    else if (typeof sections === "string" && sections.trim()) {
      try {
        const parsed = JSON.parse(sections);
        if (Array.isArray(parsed)) raw = parsed as BlogSection[];
      } catch {
        return [];
      }
    }
    return normalizeSections(raw);
  })();

  const elements: ReactNode[] = [];

  for (let i = 0; i < parsedSections.length; i++) {
    const section = parsedSections[i];
    const key = i;

    if (
      section.type === "h3" &&
      section.text &&
      isResourceSectionHeading(section.text)
    ) {
      const next = parsedSections[i + 1];
      if (next && (next.type === "list" || next.type === "numbered") && next.items?.length) {
        elements.push(
          <ResourceBlock
            key={`resource-${key}`}
            title={section.text}
            items={next.items}
            autoLinkMap={autoLinkMap}
            currentSlug={currentSlug}
            usedHrefs={usedHrefs}
          />,
        );
        i += 1;
        continue;
      }
    }

    switch (section.type) {
          case "paragraph":
            elements.push(
              <p key={key} className="mb-6 font-body text-body-m text-slate leading-relaxed">
                <InlineText
                  text={section.text ?? ""}
                  autoLinkMap={autoLinkMap}
                  currentSlug={currentSlug}
                  usedHrefs={usedHrefs}
                />
              </p>,
            );
            break;

          case "h2":
            elements.push(
              <h2
                key={key}
                className="mt-14 mb-5 font-display text-[clamp(26px,3vw,36px)] text-deep-navy leading-[1.2]"
              >
                <InlineText
                  text={section.text ?? ""}
                  autoLinkMap={autoLinkMap}
                  currentSlug={currentSlug}
                  usedHrefs={usedHrefs}
                  enableAutoLink={false}
                />
              </h2>,
            );
            break;

          case "h3":
            elements.push(<SectionLabel key={key} text={section.text ?? ""} />);
            break;

          case "pullquote":
            elements.push(
              <blockquote
                key={key}
                className="relative my-10 rounded-2xl border border-mist bg-soft-white px-6 py-8 md:px-8"
              >
                <i className="ri-double-quotes-l absolute left-4 top-4 text-3xl text-tfrf-blue/25" />
                <p className="relative z-10 pl-6 font-display text-xl md:text-2xl italic text-deep-navy leading-relaxed">
                  <InlineText
                    text={section.text ?? ""}
                    autoLinkMap={autoLinkMap}
                    currentSlug={currentSlug}
                    usedHrefs={usedHrefs}
                  />
                </p>
              </blockquote>,
            );
            break;

          case "callout":
            elements.push(
              <div
                key={key}
                className={`my-8 flex gap-4 rounded-2xl border p-5 md:p-6 ${
                  section.variant === "warning"
                    ? "border-amber-200 bg-amber-50"
                    : section.variant === "tip"
                      ? "border-emerald-200 bg-emerald-50"
                      : "border-tfrf-blue/20 bg-powder-blue/25"
                }`}
              >
                <span
                  className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
                    section.variant === "warning"
                      ? "bg-amber-100 text-amber-600"
                      : section.variant === "tip"
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-tfrf-blue/15 text-tfrf-blue"
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
                </span>
                <p className="font-body text-body-s text-deep-navy/85 leading-relaxed">{section.text}</p>
              </div>,
            );
            break;

          case "list":
            elements.push(
              <ul key={key} className="my-6 space-y-3">
                {section.items?.map((item, j) => {
                  const heading = parseEmbeddedHeading(item);
                  if (heading) return <SectionLabel key={`${key}-${j}-h`} text={heading} />;
                  return (
                    <li key={j} className="flex gap-3 font-body text-body-m text-slate leading-relaxed">
                      <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-tfrf-blue text-pure-white">
                        <i className="ri-check-line text-[10px]" />
                      </span>
                      <InlineText
                        text={item}
                        autoLinkMap={autoLinkMap}
                        currentSlug={currentSlug}
                        usedHrefs={usedHrefs}
                      />
                    </li>
                  );
                })}
              </ul>,
            );
            break;

          case "numbered":
            elements.push(
              <ol key={key} className="my-6 space-y-4">
                {section.items?.map((item, j) => {
                  const heading = parseEmbeddedHeading(item);
                  if (heading) return <SectionLabel key={`${key}-${j}-h`} text={heading} />;
                  return (
                    <li key={j} className="flex gap-4 font-body text-body-m text-slate leading-relaxed">
                      <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-deep-navy font-body text-[11px] font-bold text-pure-white">
                        {j + 1}
                      </span>
                      <InlineText
                        text={item}
                        autoLinkMap={autoLinkMap}
                        currentSlug={currentSlug}
                        usedHrefs={usedHrefs}
                      />
                    </li>
                  );
                })}
              </ol>,
            );
            break;

          case "stat-row":
            elements.push(
              <div key={key} className="my-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
                {section.stats?.map((stat, j) => (
                  <div
                    key={j}
                    className="rounded-2xl bg-gradient-to-br from-deep-navy to-tfrf-blue px-5 py-6 text-center shadow-md"
                  >
                    <p className="font-display text-2xl md:text-3xl font-medium text-pure-white mb-1">
                      {stat.value}
                    </p>
                    <p className="text-[11px] font-body font-semibold uppercase tracking-[0.14em] text-pure-white/65">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>,
            );
            break;

          case "table":
            elements.push(
              <div key={key} className="my-8 w-full overflow-x-auto rounded-2xl border border-mist shadow-sm">
                <table className="w-full border-collapse text-left text-body-s">
                  {section.tableHeaders && section.tableHeaders.length > 0 && (
                    <thead>
                      <tr className="bg-deep-navy">
                        {section.tableHeaders.map((header, j) => (
                          <th
                            key={j}
                            className="whitespace-nowrap px-4 py-3 font-body text-[11px] font-semibold uppercase tracking-wider text-pure-white"
                          >
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                  )}
                  <tbody>
                    {section.tableRows?.map((row, j) => (
                      <tr key={j} className={j % 2 === 0 ? "bg-pure-white" : "bg-soft-white"}>
                        {row.map((cell, k) => (
                          <td
                            key={k}
                            className={`border-t border-mist px-4 py-3 font-body text-slate leading-relaxed ${
                              k === 0 ? "font-semibold text-deep-navy" : ""
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
              </div>,
            );
            break;

          case "divider":
            elements.push(<hr key={key} className="my-12 border-0 border-t border-mist" />);
            break;

          case "image": {
            const src = sanitizeBlogImageSrc(section.text?.trim());
            if (!src) break;
            const alt = section.alt?.trim() || "Blog illustration";
            elements.push(
              <figure key={key} className="my-10">
                <div className="overflow-hidden rounded-2xl ring-1 ring-mist shadow-sm">
                  <Image
                    src={src}
                    alt={alt}
                    width={1024}
                    height={1536}
                    sizes="(max-width: 768px) 100vw, 720px"
                    unoptimized={shouldUnoptimizeBlogImage(src)}
                    className="mx-auto h-auto w-full max-w-2xl"
                  />
                </div>
              </figure>,
            );
            break;
          }

          default:
            break;
        }
  }

  return <div className="max-w-none">{elements}</div>;
}
