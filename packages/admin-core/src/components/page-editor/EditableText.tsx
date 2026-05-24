import type { CSSProperties, ReactNode } from "react";
import { getPageContentForRequest } from "../../lib/server/pageContentOverrides";
import EditableTextClient from "./EditableTextClient";

export interface EditableTextProps {
  /**
   * Route path this field belongs to, e.g. "/virtual-lp". Must match
   * `usePathname()` for the wiring to find pending edits in the editor
   * context.
   */
  routePath: string;
  /**
   * Stable per-page identifier for this slot, e.g. "hero.headline" or
   * "pathways.0.bestFor". Must be unique within `routePath`.
   */
  fieldKey: string;
  /**
   * Plain-text default baked into the source. Used as fallback when no
   * override is present and `children` is not provided.
   */
  defaultValue: string;
  /** HTML tag to render. Defaults to "span" so it never adds layout. */
  as?: keyof HTMLElementTagNameMap;
  className?: string;
  style?: CSSProperties;
  /**
   * Optional richer JSX fallback (e.g., text containing inline styled
   * spans). Rendered when no override exists. Once an override is set,
   * the override text replaces these children entirely.
   */
  children?: ReactNode;
}

/**
 * Server component that resolves a per-field text override and forwards
 * to a small client wrapper. In view mode the wrapper renders nothing
 * beyond the underlying tag; in edit mode it adds contenteditable +
 * a subtle outline and reports edits back to PageEditorContext.
 */
export default async function EditableText({
  routePath,
  fieldKey,
  defaultValue,
  as = "span",
  className,
  style,
  children,
}: EditableTextProps) {
  const overrides = await getPageContentForRequest(routePath);
  const override = overrides.byKey.get(fieldKey);

  return (
    <EditableTextClient
      routePath={routePath}
      fieldKey={fieldKey}
      defaultValue={defaultValue}
      publishedValue={override?.published_value ?? null}
      draftValue={override?.draft_value ?? null}
      as={as}
      className={className}
      style={style}
    >
      {children}
    </EditableTextClient>
  );
}
