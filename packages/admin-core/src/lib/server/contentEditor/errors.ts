/**
 * Shared error class for the Content Editor pipeline.
 *
 * Wrap every vendor failure in this so the pipeline orchestrator can
 * persist a meaningful error message back to the editor row and the API
 * layer can surface an actionable error to the user.
 */
export class ContentEditorError extends Error {
  /** Suggested HTTP status code for API responses. */
  readonly status: number;
  /** Which vendor / phase produced the failure. */
  readonly source: string;
  /** Optional raw detail payload for debugging. Not serialized to user. */
  readonly detail?: unknown;

  constructor(message: string, opts: { status?: number; source: string; detail?: unknown }) {
    super(message);
    this.name = "ContentEditorError";
    this.status = opts.status ?? 500;
    this.source = opts.source;
    this.detail = opts.detail;
  }
}
