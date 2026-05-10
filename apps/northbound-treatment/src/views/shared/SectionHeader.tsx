import { AutoLinkedText } from "@sweetmedia/blog-core";
interface SectionHeaderProps {
  eyebrow: string;
  headline: string;
  /** First occurrence of this word gets italic + accent color styling */
  italicWord?: string;
  body?: string;
  /** "left" (default) | "center" */
  align?: "left" | "center";
  /** true = white/terracotta text (use inside navy sections) */
  dark?: boolean;
  /** Max width class for the body text (default: "max-w-2xl") */
  bodyWidth?: string;
}

/**
 * Reusable section header: eyebrow + h2 + optional body.
 * Handles light and dark backgrounds with a single prop.
 */
export default function SectionHeader({
  eyebrow,
  headline,
  italicWord,
  body,
  align = "left",
  dark = false,
  bodyWidth = "max-w-2xl",
}: SectionHeaderProps) {
  const center = align === "center";
  const headlineParts = italicWord
    ? headline.split(new RegExp(`(${italicWord})`, "i"))
    : [headline];

  return (
    <div className={center ? "mx-auto text-center" : ""}>
      <p
        className={`mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-terracotta`}
      ><AutoLinkedText>{eyebrow}</AutoLinkedText></p>
      <h2
        className={`font-heading text-4xl font-bold leading-tight md:text-5xl ${
          dark ? "text-white" : "text-navy"
        }`}
      >
        {italicWord
          ? headlineParts.map((part, i) =>
              part.toLowerCase() === italicWord.toLowerCase() ? (
                <span
                  key={i}
                  className={`italic ${dark ? "text-terracotta-light" : "text-terracotta"}`}
                >
                  {part}
                </span>
              ) : (
                part
              ),
            )
          : headline}
      </h2>
      {body && (
        <p
          className={`mt-4 text-base leading-relaxed ${bodyWidth} ${
            center ? "mx-auto" : ""
          } ${dark ? "text-white/70" : "text-espresso/70"}`}
        ><AutoLinkedText>{body}</AutoLinkedText></p>
      )}
    </div>
  );
}
