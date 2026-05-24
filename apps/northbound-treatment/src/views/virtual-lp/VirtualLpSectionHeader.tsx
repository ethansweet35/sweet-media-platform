import { EditableText } from "@sweetmedia/admin-core";

interface VirtualLpSectionHeaderProps {
  eyebrow: string;
  headline: string;
  italicWord?: string;
  body?: string;
  align?: "left" | "center";
  dark?: boolean;
  bodyWidth?: string;
  /**
   * When provided, wires up the eyebrow / headline / body in inline-editor
   * mode. Field keys are derived as `${editFieldPrefix}.{eyebrow,headline,body}`.
   */
  editRoutePath?: string;
  editFieldPrefix?: string;
}

/** Section header without auto-internal-links (keeps users on the LP). */
export default function VirtualLpSectionHeader({
  eyebrow,
  headline,
  italicWord,
  body,
  align = "left",
  dark = false,
  bodyWidth = "max-w-2xl",
  editRoutePath,
  editFieldPrefix,
}: VirtualLpSectionHeaderProps) {
  const center = align === "center";
  const headlineParts = italicWord
    ? headline.split(new RegExp(`(${italicWord})`, "i"))
    : [headline];

  const headlineJsx = italicWord
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
    : headline;

  const editable = Boolean(editRoutePath && editFieldPrefix);

  return (
    <div className={center ? "mx-auto text-center" : ""}>
      {editable ? (
        <EditableText
          routePath={editRoutePath!}
          fieldKey={`${editFieldPrefix}.eyebrow`}
          defaultValue={eyebrow}
          as="p"
          className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-terracotta"
        />
      ) : (
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-terracotta">
          {eyebrow}
        </p>
      )}

      {editable ? (
        <EditableText
          routePath={editRoutePath!}
          fieldKey={`${editFieldPrefix}.headline`}
          defaultValue={headline}
          as="h2"
          className={`font-heading text-4xl font-bold leading-tight md:text-5xl ${
            dark ? "text-white" : "text-navy"
          }`}
        >
          {headlineJsx}
        </EditableText>
      ) : (
        <h2
          className={`font-heading text-4xl font-bold leading-tight md:text-5xl ${
            dark ? "text-white" : "text-navy"
          }`}
        >
          {headlineJsx}
        </h2>
      )}

      {body
        ? editable
          ? (
              <EditableText
                routePath={editRoutePath!}
                fieldKey={`${editFieldPrefix}.body`}
                defaultValue={body}
                as="p"
                className={`mt-4 text-base leading-relaxed ${bodyWidth} ${
                  center ? "mx-auto" : ""
                } ${dark ? "text-white/70" : "text-espresso/70"}`}
              />
            )
          : (
              <p
                className={`mt-4 text-base leading-relaxed ${bodyWidth} ${
                  center ? "mx-auto" : ""
                } ${dark ? "text-white/70" : "text-espresso/70"}`}
              >
                {body}
              </p>
            )
        : null}
    </div>
  );
}
