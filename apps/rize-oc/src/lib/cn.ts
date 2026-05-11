/** Minimal class-name joiner — merges truthy strings and filters falsy values. */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}
