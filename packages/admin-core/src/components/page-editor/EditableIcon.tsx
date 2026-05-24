import { getPageContentForRequest } from "../../lib/server/pageContentOverrides";
import { getPageEditorRoutePath } from "../../lib/server/getPageEditorRoutePath";
import EditableIconClient from "./EditableIconClient";

export interface EditableIconProps {
  /** When omitted, resolved from the current request pathname (via middleware). */
  routePath?: string;
  fieldKey: string;
  /** Default Remix Icon class, e.g. "ri-brain-line". */
  defaultIconClass: string;
  /** Default pixel size when the slot uses a custom image. */
  defaultImageSize?: number;
  /** Extra classes on the Remix icon (e.g. "text-xl text-white"). */
  iconClassName?: string;
  /** Classes on the outer wrapper (the colored box around the icon). */
  containerClassName?: string;
  /** Short label for the editor panel ("network icon", etc.). */
  label?: string;
}

export default async function EditableIcon({
  routePath: routePathProp,
  fieldKey,
  defaultIconClass,
  defaultImageSize = 44,
  iconClassName,
  containerClassName,
  label,
}: EditableIconProps) {
  const routePath = routePathProp ?? (await getPageEditorRoutePath());
  const overrides = await getPageContentForRequest(routePath);
  const override = overrides.byKey.get(fieldKey);

  return (
    <EditableIconClient
      routePath={routePath}
      fieldKey={fieldKey}
      defaultIconClass={defaultIconClass}
      defaultImageSize={defaultImageSize}
      iconClassName={iconClassName}
      containerClassName={containerClassName}
      label={label}
      publishedValue={override?.published_value ?? null}
      draftValue={override?.draft_value ?? null}
    />
  );
}
