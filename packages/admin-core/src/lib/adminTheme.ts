/**
 * Sweet Media admin design tokens — shared across every client brand.
 * Navy + periwinkle palette from sweetmediaservices.com.
 */

// ─── Brand colors ───────────────────────────────────────────────────────────
export const ADMIN_NAVY = "#0A1F44";
export const ADMIN_NAVY_DEEP = "#040e20";
export const ADMIN_NAVY_HOVER = "#0d2a5e";
export const ADMIN_ACCENT = "#7B9FD4";
export const ADMIN_ACCENT_HOVER = "#6a8fc4";

/** Surfaces */
export const ADMIN_SURFACE = "#F4F7FB";
export const ADMIN_CARD = "#FFFFFF";
export const ADMIN_BORDER = "#E2E8F0";

/** Text */
export const ADMIN_TEXT = "#0A1F44";
export const ADMIN_TEXT_MUTED = "#64748B";

/** Soft fills (8-digit hex) */
export const ADMIN_ACCENT_SOFT = "#7B9FD429";
export const ADMIN_NAVY_SOFT = "#0A1F4420";

// ─── Legacy aliases (prefer ADMIN_NAVY / ADMIN_ACCENT in new code) ──────────
/** Primary actions — navy */
export const ADMIN_OCEAN = ADMIN_NAVY;
export const ADMIN_OCEAN_HOVER = ADMIN_NAVY_HOVER;
export const ADMIN_CREAM_SIDEBAR = ADMIN_NAVY_DEEP;
export const ADMIN_CREAM_MAIN = ADMIN_SURFACE;

// ─── Typography ─────────────────────────────────────────────────────────────
export const ADMIN_FONT_URL =
  "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Outfit:wght@400;500;600;700&display=swap";

export const adminFontSans =
  "[font-family:'Outfit',ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,'Segoe_UI',Roboto,sans-serif]";

export const adminFontSerif =
  "[font-family:'Cormorant_Garamond',ui-serif,Georgia,Cambria,'Times_New_Roman',serif]";

// ─── Shared UI classes ──────────────────────────────────────────────────────
export const adminInputCls =
  "w-full px-3.5 py-2.5 text-sm border border-[#E2E8F0] rounded-xl bg-white text-[#0A1F44] placeholder-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#7B9FD4]/35 focus:border-[#7B9FD4] transition-all";

export const adminCardCls =
  "rounded-2xl border border-[#E2E8F0] bg-white shadow-[0_1px_24px_rgba(10,31,68,0.05)]";

export const adminPrimaryBtnCls =
  "inline-flex items-center justify-center gap-2 rounded-xl bg-[#0A1F44] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#0d2a5e] disabled:opacity-50 disabled:cursor-not-allowed";

export const adminSecondaryBtnCls =
  "inline-flex items-center justify-center gap-2 rounded-xl border border-[#E2E8F0] bg-white px-5 py-2.5 text-sm font-semibold text-[#0A1F44] transition-colors hover:bg-[#F4F7FB]";

export const adminLinkCls =
  "font-semibold text-[#7B9FD4] underline-offset-4 transition-colors hover:text-[#0A1F44] hover:underline";

// ─── Page layout & surfaces ─────────────────────────────────────────────────
export const adminPageCardCls = `${adminCardCls} p-6`;
export const adminPageCardSmCls = `${adminCardCls} p-5`;
export const adminStatCardCls =
  "rounded-2xl border border-[#E2E8F0] bg-white p-5 flex items-center gap-4 shadow-[0_1px_24px_rgba(10,31,68,0.05)]";
export const adminIconWellCls =
  "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl";
export const adminIconWellNavyCls = `${adminIconWellCls} bg-[#0A1F4420] text-[#0A1F44]`;

// ─── Typography ───────────────────────────────────────────────────────────────
export const adminEyebrowCls =
  "text-[10px] font-bold uppercase tracking-[0.22em] text-[#7B9FD4]";
export const adminFieldLabelCls =
  "mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.2em] text-[#64748B]";
export const adminBodyMutedCls = "text-sm leading-relaxed text-[#64748B]";
export const adminHeadingSmCls = "text-sm font-semibold text-[#0A1F44]";

// ─── Form extensions ─────────────────────────────────────────────────────────
export const adminTextareaCls = `${adminInputCls} min-h-[6rem] resize-y`;
export const adminSelectCls = adminInputCls;
export const adminReadonlyInputCls =
  "w-full rounded-xl border border-[#E2E8F0] bg-[#F4F7FB] px-3 py-2.5 font-mono text-xs text-[#0A1F44] focus:outline-none";

// ─── Buttons ──────────────────────────────────────────────────────────────────
export const ADMIN_PRIMARY_SHADOW = "0 2px 12px rgba(10, 31, 68, 0.18)";

export const adminPrimaryActionCls =
  "inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.12em] text-white transition-opacity hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-50 shadow-[0_2px_12px_rgba(10,31,68,0.18)]";

export const adminGhostBtnCls =
  "inline-flex items-center justify-center rounded-lg text-[#64748B] transition-colors hover:bg-[#0A1F440d] hover:text-[#0A1F44]";
export const adminIconBtnCls = `h-8 w-8 ${adminGhostBtnCls}`;

// ─── Tabs & filters ───────────────────────────────────────────────────────────
export const adminSegmentedTrackCls = "flex gap-1 rounded-lg bg-[#F4F7FB] p-0.5";
export const adminSegmentedActiveCls =
  "flex-1 rounded-md bg-[#0A1F44] py-1.5 text-[10px] font-bold uppercase tracking-[0.1em] text-white";
export const adminSegmentedInactiveCls =
  "flex-1 rounded-md py-1.5 text-[10px] font-bold uppercase tracking-[0.1em] text-[#64748B] hover:text-[#0A1F44]";

export function adminPillTabCls(active: boolean): string {
  return active
    ? "rounded-full bg-[#0A1F44] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-white"
    : "rounded-full border border-[#E2E8F0] bg-white px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#64748B] hover:border-[#7B9FD4]";
}

// ─── Tables ───────────────────────────────────────────────────────────────────
export const adminTableWrapCls = `${adminCardCls} overflow-hidden`;
export const adminTableHeadCls =
  "text-[10px] font-semibold uppercase tracking-wider text-[#64748B]";
export const adminTableRowCls =
  "border-t border-[#E2E8F0] text-sm text-[#0A1F44] hover:bg-[#F4F7FB]/60";

// ─── Modals ───────────────────────────────────────────────────────────────────
export const adminModalOverlayCls =
  "fixed inset-0 z-50 flex items-center justify-center px-4";
export const adminModalBackdropCls = "absolute inset-0 bg-black/40 backdrop-blur-sm";
export const adminModalPanelCls =
  "relative w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl";
export const adminModalPanelSmCls =
  "relative w-full max-w-md rounded-2xl bg-white p-6 shadow-xl";

// ─── Feedback ─────────────────────────────────────────────────────────────────
export const adminEmptyStateCls = `${adminCardCls} p-12 text-center`;
export const adminErrorBannerCls =
  "flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-xs text-red-600";
export const adminToastSuccessCls =
  "fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-2xl bg-[#0A1F44] px-5 py-3.5 text-sm font-medium text-white";
export const adminToastErrorCls =
  "fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-2xl bg-red-500 px-5 py-3.5 text-sm font-medium text-white";

// ─── Badges & tags ────────────────────────────────────────────────────────────
export const adminBadgeCls =
  "inline-flex items-center rounded-lg bg-[#F4F7FB] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.15em] text-[#64748B]";
export const adminTagCls =
  "inline-flex rounded-md border border-[#E2E8F0] bg-[#F4F7FB] px-2 py-0.5 text-[11px] text-[#64748B]";
