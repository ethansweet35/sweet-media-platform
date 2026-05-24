/**
 * Serialized JSON stored in page_content_overrides for field_type = "icon".
 *
 * Remix icon:
 *   {"kind":"remix","class":"ri-brain-line"}
 *
 * Custom image:
 *   {"kind":"image","src":"https://...","width":44,"height":44}
 */

export type IconOverrideValue =
  | { kind: "remix"; class: string }
  | { kind: "image"; src: string; width: number; height: number };

export function defaultRemixIcon(iconClass: string): IconOverrideValue {
  const trimmed = iconClass.trim();
  return { kind: "remix", class: trimmed || "ri-question-line" };
}

export function serializeIconValue(value: IconOverrideValue): string {
  if (value.kind === "remix") {
    return JSON.stringify({ kind: "remix", class: value.class.trim() });
  }
  return JSON.stringify({
    kind: "image",
    src: value.src.trim(),
    width: clampIconDimension(value.width),
    height: clampIconDimension(value.height),
  });
}

export function parseIconValue(raw: string | null | undefined): IconOverrideValue | null {
  if (typeof raw !== "string" || raw.trim().length === 0) return null;
  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!parsed || typeof parsed !== "object") return null;
    const obj = parsed as Record<string, unknown>;
    if (obj.kind === "remix" && typeof obj.class === "string" && obj.class.trim()) {
      return { kind: "remix", class: obj.class.trim() };
    }
    if (
      obj.kind === "image" &&
      typeof obj.src === "string" &&
      obj.src.trim() &&
      typeof obj.width === "number" &&
      typeof obj.height === "number"
    ) {
      return {
        kind: "image",
        src: obj.src.trim(),
        width: clampIconDimension(obj.width),
        height: clampIconDimension(obj.height),
      };
    }
    return null;
  } catch {
    return null;
  }
}

export function resolveIconValue(
  override: IconOverrideValue | null,
  defaultIconClass: string,
  defaultImageSize: number,
): IconOverrideValue {
  if (override) return override;
  return defaultRemixIcon(defaultIconClass);
}

export function iconValuesEqual(a: IconOverrideValue, b: IconOverrideValue): boolean {
  return serializeIconValue(a) === serializeIconValue(b);
}

export function clampIconDimension(n: number): number {
  if (!Number.isFinite(n)) return 44;
  return Math.min(200, Math.max(16, Math.round(n)));
}

/** Curated Remix icons for the inline picker (healthcare / UI). */
export const PAGE_EDITOR_ICON_OPTIONS: { class: string; label: string }[] = [
  { class: "ri-capsule-line", label: "Capsule" },
  { class: "ri-brain-line", label: "Brain" },
  { class: "ri-women-line", label: "Women" },
  { class: "ri-men-line", label: "Men" },
  { class: "ri-heart-pulse-line", label: "Heart pulse" },
  { class: "ri-heart-line", label: "Heart" },
  { class: "ri-mental-health-line", label: "Mental health" },
  { class: "ri-stethoscope-line", label: "Stethoscope" },
  { class: "ri-hospital-line", label: "Hospital" },
  { class: "ri-medicine-bottle-line", label: "Medicine" },
  { class: "ri-shield-check-line", label: "Shield check" },
  { class: "ri-shield-line", label: "Shield" },
  { class: "ri-lock-line", label: "Lock" },
  { class: "ri-phone-line", label: "Phone" },
  { class: "ri-phone-fill", label: "Phone filled" },
  { class: "ri-wifi-line", label: "Wifi" },
  { class: "ri-video-chat-line", label: "Video chat" },
  { class: "ri-computer-line", label: "Computer" },
  { class: "ri-home-heart-line", label: "Home heart" },
  { class: "ri-group-line", label: "Group" },
  { class: "ri-user-heart-line", label: "User heart" },
  { class: "ri-hand-heart-line", label: "Hand heart" },
  { class: "ri-leaf-line", label: "Leaf" },
  { class: "ri-plant-line", label: "Plant" },
  { class: "ri-time-line", label: "Time" },
  { class: "ri-calendar-line", label: "Calendar" },
  { class: "ri-award-line", label: "Award" },
  { class: "ri-star-line", label: "Star" },
  { class: "ri-star-fill", label: "Star filled" },
  { class: "ri-check-line", label: "Check" },
  { class: "ri-close-line", label: "Close" },
  { class: "ri-arrow-right-line", label: "Arrow right" },
  { class: "ri-arrow-down-line", label: "Arrow down" },
  { class: "ri-secure-payment-line", label: "Secure payment" },
  { class: "ri-bank-card-line", label: "Bank card" },
  { class: "ri-file-list-3-line", label: "Document" },
  { class: "ri-question-answer-line", label: "Q&A" },
  { class: "ri-emotion-happy-line", label: "Happy" },
  { class: "ri-emotion-sad-line", label: "Sad" },
  { class: "ri-map-pin-2-line", label: "Location" },
  { class: "ri-global-line", label: "Global" },
  { class: "ri-image-edit-line", label: "Image edit" },
  { class: "ri-image-line", label: "Image" },
];
