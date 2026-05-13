/**
 * <TrackedPageBody trackedPagePath="/some-route" />
 *
 * Async server component that fetches active body content blocks for a
 * tracked page and renders them inline. Use this on any tracked page where
 * you want admins to be able to apply AI-generated content from the
 * Content Editor brief workspace without redeploying.
 *
 * Usage in a page.tsx (server component):
 *
 *   import { TrackedPageBody } from "@sweetmedia/admin-core";
 *
 *   export const revalidate = 3600;
 *
 *   export default async function MyPage() {
 *     return (
 *       <>
 *         <Hero />
 *         <StaticBodySections />
 *         <TrackedPageBody trackedPagePath="/my-route" />
 *         <Footer />
 *       </>
 *     );
 *   }
 *
 * When admins apply a pending block in the Content Editor, the route
 * handler calls revalidatePath() so the new content goes live on the next
 * request without waiting for the ISR window to expire.
 */
import { createClient } from "@supabase/supabase-js";

export type TrackedPageBodyBlock = {
  id: string;
  block_type: string;
  position: number;
  heading: string | null;
  body_markdown: string | null;
  list_items: string[] | null;
  callout_variant: string | null;
  stats: Array<{ value: string; label: string }> | null;
  table_headers: string[] | null;
  table_rows: string[][] | null;
};

interface TrackedPageBodyProps {
  /** The route path of the page (e.g. "/about", "/locations/newport-beach"). */
  trackedPagePath: string;
  /** Tailwind container className applied to the wrapping <section>. */
  className?: string;
  /** Optional wrapper around each block — defaults to a Tailwind prose container. */
  proseClassName?: string;
  /**
   * If true, only render the wrapping container when at least one active
   * block exists. Default true — keeps pages clean when no AI content has
   * been applied yet.
   */
  hideWhenEmpty?: boolean;
}

async function fetchActiveBlocks(
  routePath: string,
): Promise<TrackedPageBodyBlock[]> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return [];

  const supabase = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: { fetch },
  });

  const normalized = routePath.startsWith("/") ? routePath : `/${routePath}`;

  const { data: page } = await supabase
    .from("tracked_pages")
    .select("id, is_active")
    .eq("route_path", normalized)
    .maybeSingle();

  const pageRow = page as { id: string; is_active: boolean } | null;
  if (!pageRow || !pageRow.is_active) return [];

  const { data: blocks } = await supabase
    .from("tracked_page_content_blocks")
    .select(
      "id, block_type, position, heading, body_markdown, list_items, callout_variant, stats, table_headers, table_rows",
    )
    .eq("tracked_page_id", pageRow.id)
    .eq("status", "active")
    .order("position", { ascending: true });

  return (blocks ?? []) as TrackedPageBodyBlock[];
}

/* ───────────────────────────────────────────────────────────────────── */
/*  Inline markdown rendering — kept intentionally tiny.                  */
/*  Supports: **bold**, *italic*, [link](url), inline `code`, line breaks.*/
/* ───────────────────────────────────────────────────────────────────── */

function InlineMd({ text }: { text: string }) {
  // Split text into segments by recognized markdown tokens.
  const segments = text.split(
    /(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g,
  );
  return (
    <>
      {segments.map((seg, i) => {
        if (/^\*\*[^*]+\*\*$/.test(seg)) {
          return <strong key={i}>{seg.slice(2, -2)}</strong>;
        }
        if (/^\*[^*]+\*$/.test(seg)) {
          return <em key={i}>{seg.slice(1, -1)}</em>;
        }
        if (/^`[^`]+`$/.test(seg)) {
          return (
            <code key={i} className="px-1 py-0.5 rounded bg-neutral-100 font-mono text-[0.9em]">
              {seg.slice(1, -1)}
            </code>
          );
        }
        const linkMatch = seg.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
        if (linkMatch) {
          const [, anchor, href] = linkMatch;
          const isExternal = href.startsWith("http");
          return (
            <a
              key={i}
              href={href}
              className="underline underline-offset-2 hover:no-underline"
              {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            >
              {anchor}
            </a>
          );
        }
        return <span key={i}>{seg}</span>;
      })}
    </>
  );
}

/**
 * Render a multi-paragraph markdown string as a stack of <p> elements.
 * Splits on blank lines so AI output that lands as a single string can
 * still render as multiple paragraphs.
 */
function ParagraphsFromMarkdown({ text }: { text: string }) {
  const paragraphs = text
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);
  if (paragraphs.length === 0) return null;
  return (
    <>
      {paragraphs.map((p, i) => (
        <p key={i}>
          <InlineMd text={p} />
        </p>
      ))}
    </>
  );
}

function CalloutAccentClasses(variant: string | null | undefined): {
  wrap: string;
  badge: string;
  label: string;
} {
  switch (variant) {
    case "warning":
      return {
        wrap: "border-amber-300 bg-amber-50 text-amber-900",
        badge: "bg-amber-200 text-amber-900",
        label: "Heads up",
      };
    case "insight":
      return {
        wrap: "border-emerald-300 bg-emerald-50 text-emerald-900",
        badge: "bg-emerald-200 text-emerald-900",
        label: "Insight",
      };
    case "tip":
    default:
      return {
        wrap: "border-sky-300 bg-sky-50 text-sky-900",
        badge: "bg-sky-200 text-sky-900",
        label: "Tip",
      };
  }
}

/**
 * Render a single block. Kept small + deterministic so brand-specific
 * typography (driven by the parent <section className=…>) wins via CSS
 * cascade.
 */
function Block({ block }: { block: TrackedPageBodyBlock }) {
  switch (block.block_type) {
    case "h1":
      return block.heading ? (
        <h1 className="font-heading text-4xl md:text-5xl font-bold tracking-tight mt-12 mb-4">
          {block.heading}
        </h1>
      ) : null;
    case "h2":
      return block.heading ? (
        <h2 className="font-heading text-2xl md:text-3xl font-bold tracking-tight mt-10 mb-3">
          {block.heading}
        </h2>
      ) : null;
    case "h3":
      return block.heading ? (
        <h3 className="font-heading text-xl md:text-2xl font-bold mt-6 mb-2">
          {block.heading}
        </h3>
      ) : null;
    case "h4":
      return block.heading ? (
        <h4 className="font-heading text-lg font-bold mt-5 mb-2">{block.heading}</h4>
      ) : null;
    case "paragraph":
      return block.body_markdown ? (
        <div className="space-y-3 text-base leading-relaxed">
          <ParagraphsFromMarkdown text={block.body_markdown} />
        </div>
      ) : null;
    case "list":
      return block.list_items?.length ? (
        <ul className="list-disc pl-6 space-y-2 text-base leading-relaxed">
          {block.list_items.map((item, i) => (
            <li key={i}>
              <InlineMd text={item} />
            </li>
          ))}
        </ul>
      ) : null;
    case "numbered":
      return block.list_items?.length ? (
        <ol className="list-decimal pl-6 space-y-2 text-base leading-relaxed">
          {block.list_items.map((item, i) => (
            <li key={i}>
              <InlineMd text={item} />
            </li>
          ))}
        </ol>
      ) : null;
    case "pullquote":
      return block.body_markdown ? (
        <blockquote className="border-l-4 border-current/30 pl-4 py-1 my-6 italic text-xl leading-relaxed">
          <InlineMd text={block.body_markdown} />
        </blockquote>
      ) : null;
    case "callout": {
      if (!block.body_markdown) return null;
      const accent = CalloutAccentClasses(block.callout_variant);
      return (
        <aside
          className={`my-6 rounded-2xl border-l-4 px-5 py-4 ${accent.wrap}`}
          role="note"
        >
          <span
            className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-[0.12em] mr-2 ${accent.badge}`}
          >
            {accent.label}
          </span>
          <span className="text-base leading-relaxed">
            <InlineMd text={block.body_markdown} />
          </span>
        </aside>
      );
    }
    case "stat-row":
      return block.stats?.length ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-6">
          {block.stats.map((s, i) => (
            <div key={i} className="text-center">
              <p className="text-2xl md:text-3xl font-bold tracking-tight">{s.value}</p>
              <p className="text-xs uppercase tracking-[0.1em] text-neutral-500 mt-1">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      ) : null;
    case "table":
      return block.table_headers?.length ? (
        <div className="my-6 overflow-x-auto">
          <table className="min-w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-neutral-200">
                {block.table_headers.map((h, i) => (
                  <th key={i} className="text-left font-bold px-3 py-2">
                    <InlineMd text={h} />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {(block.table_rows ?? []).map((row, ri) => (
                <tr key={ri} className="border-b border-neutral-100">
                  {row.map((cell, ci) => (
                    <td key={ci} className="px-3 py-2 align-top">
                      <InlineMd text={cell} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null;
    case "divider":
      return <hr className="my-8 border-neutral-200" />;
    default:
      return null;
  }
}

export default async function TrackedPageBody({
  trackedPagePath,
  className = "mx-auto w-full max-w-3xl px-6 py-10",
  proseClassName = "",
  hideWhenEmpty = true,
}: TrackedPageBodyProps) {
  const blocks = await fetchActiveBlocks(trackedPagePath);
  if (blocks.length === 0 && hideWhenEmpty) return null;

  return (
    <section
      data-tracked-page-body={trackedPagePath}
      className={className}
    >
      <div className={proseClassName}>
        {blocks.map((block) => (
          <Block key={block.id} block={block} />
        ))}
      </div>
    </section>
  );
}
