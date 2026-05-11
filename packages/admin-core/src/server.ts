/**
 * Server-only exports for @sweetmedia/admin-core.
 * Import from "@sweetmedia/admin-core/server" in Node.js / Next API routes only.
 * Never import this in React components or browser code.
 */
export { scanAppRoutes, derivePageTitle, syncTrackedPages } from "./lib/scanAppRoutes";

export {
  SurferApiError,
  getSurferEnv,
  createAudit,
  getAudit,
  createContentEditor,
  getContentEditorContent,
} from "./lib/server/surferClient";

export {
  resolvePublicUrl,
  kickAudit,
  pollAuditAndPersist,
  createEditorForRow,
  refreshStaleAudits,
  type SurferRowKind,
  type KickAuditResult,
  type PollAuditResult,
  type CreateEditorResult,
  type RefreshStaleSummary,
} from "./lib/server/surferActions";
