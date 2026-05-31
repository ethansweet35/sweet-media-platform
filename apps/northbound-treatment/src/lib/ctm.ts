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

type CtmMain = {
  runNow: (root?: ParentNode) => unknown;
};

declare global {
  interface Window {
    __ctm?: { tracker: CtmTracker; main?: CtmMain };
    __ctm_loaded?: { push: (cb: () => void) => void; ready?: boolean };
    __ctm_tracked?: boolean;
  }
}

/** True on production builds and when explicitly enabled for local QA. */
export const CTM_SCRIPTS_ENABLED =
  process.env.NODE_ENV === "production" ||
  process.env.NEXT_PUBLIC_ENABLE_CTM === "true";

/** Ask CTM to re-scan the DOM (safe if t.js is still booting). */
export function rescheduleCtmNumberSwap(delayMs = 0): void {
  if (typeof window === "undefined") return;

  const run = () => {
    try {
      window.__ctm?.main?.runNow?.();
      return;
    } catch (e) {
      console.warn("CTM runNow failed:", e);
    }
    const queue = window.__ctm_loaded;
    if (queue && typeof queue.push === "function") {
      queue.push(() => {
        try {
          window.__ctm?.main?.runNow?.();
        } catch (e) {
          console.warn("CTM deferred runNow failed:", e);
        }
      });
    }
  };

  if (delayMs > 0) setTimeout(run, delayMs);
  else run();
}

/** Full re-init for client navigations (same src will not re-execute without a cache buster). */
export function reloadCtmTrackingScript(): void {
  if (typeof window === "undefined") return;

  try {
    delete window.__ctm;
  } catch {
    /* ignore */
  }
  window.__ctm_tracked = false;

  document.getElementById("ctm-spa-reload")?.remove();

  const script = document.createElement("script");
  script.id = "ctm-spa-reload";
  script.src = `${CTM_TRACKING_SRC}?_r=${Date.now()}`;
  script.async = true;
  script.setAttribute("data-cfasync", "false");
  document.head.appendChild(script);
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
