import type { ImageProps } from "next/image";
import { getPageContentForRequest } from "../../lib/server/pageContentOverrides";
import { getPageEditorRoutePath } from "../../lib/server/getPageEditorRoutePath";
import EditableImageClient from "./EditableImageClient";

export interface EditableImageProps {
  /** When omitted, resolved from the current request pathname (via middleware). */
  routePath?: string;
  fieldKey: string;
  /** Static default baked into the source. Used when no override exists. */
  defaultSrc: string;
  alt: string;
  /** Optional friendly label rendered inside the hover overlay button. */
  label?: string;
  className?: string;
  width?: ImageProps["width"];
  height?: ImageProps["height"];
  fill?: ImageProps["fill"];
  priority?: ImageProps["priority"];
  sizes?: ImageProps["sizes"];
  quality?: ImageProps["quality"];
  placeholder?: ImageProps["placeholder"];
  loading?: ImageProps["loading"];
  style?: ImageProps["style"];
}

/**
 * Server component that resolves a per-field image override and forwards
 * to the client wrapper. In view mode renders next/image with the
 * appropriate source; in edit mode shows a hover overlay with a
 * "Replace image" button that uploads to Supabase storage.
 */
export default async function EditableImage({
  routePath: routePathProp,
  fieldKey,
  defaultSrc,
  alt,
  label,
  className,
  ...imageProps
}: EditableImageProps) {
  const routePath = routePathProp ?? (await getPageEditorRoutePath());
  const overrides = await getPageContentForRequest(routePath);
  const override = overrides.byKey.get(fieldKey);

  return (
    <EditableImageClient
      routePath={routePath}
      fieldKey={fieldKey}
      defaultSrc={defaultSrc}
      publishedValue={override?.published_value ?? null}
      draftValue={override?.draft_value ?? null}
      alt={alt}
      label={label}
      className={className}
      {...imageProps}
    />
  );
}
