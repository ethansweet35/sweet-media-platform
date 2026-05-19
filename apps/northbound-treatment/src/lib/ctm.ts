/**
 * Call Tracking Metrics (CTM) — scraped from live northboundtreatment.com.
 * Account: 186366 (https://186366.tctm.co).
 *
 * t.js — dynamic number replacement on tel: links (source number on site: 866-311-0003).
 * formreactor.js — FormReactor embeds (see CTM_FORM_REACTOR_SRC).
 */

export const CTM_TRACKING_SRC = "https://186366.tctm.co/t.js";

export const CTM_FORMREACTOR_SRC = "https://186366.tctm.co/formreactor.js";

/** FormReactor iframe used on the live WP homepage hero / mobile widgets. */
export const CTM_FORM_REACTOR_IFRAME_SRC =
  "https://186366.tctm.co/form/FRT472ABB2C5B9B141A3E9319F952E82732C7312FD26DC0CD11A8A650BB0264412C.html";

type CtmTracker = {
  trackEvent: (a: string, b: string, c: string) => void;
  popQueue: () => void;
  getSessionId?: () => string;
};

declare global {
  interface Window {
    __ctm?: { tracker: CtmTracker };
  }
}

/** Mirrors live site's wpcf7mailsent CTM form conversion hook. */
export function trackCtmFormSubmission(): void {
  if (typeof window === "undefined") return;
  try {
    window.__ctm?.tracker.trackEvent("", " ", "form");
    window.__ctm?.tracker.popQueue();
  } catch (e) {
    console.log("CTM tracking error:", e);
  }
}
