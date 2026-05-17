"use client";

import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

/** Returns true when the current browser session belongs to an internal team member. */
function isInternalUser(): boolean {
  if (typeof document === "undefined") return false;
  return document.cookie.split(";").some((c) => c.trim() === "sm_internal=1");
}

/**
 * Drop-in replacement for `<Analytics /> + <SpeedInsights />` in every client
 * app layout. Suppresses all Vercel tracking events when the `sm_internal`
 * cookie is present (set automatically by AuthContext when an admin logs in).
 */
export function AnalyticsWrapper() {
  return (
    <>
      <Analytics
        beforeSend={(event) => (isInternalUser() ? null : event)}
      />
      <SpeedInsights
        beforeSend={(data) => (isInternalUser() ? null : data)}
      />
    </>
  );
}
