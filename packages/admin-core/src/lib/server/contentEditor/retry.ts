/**
 * Tiny retry helper for vendor calls.
 *
 * Retries on:
 *   - Network errors (fetch threw, no response object)
 *   - HTTP 408 (timeout), 429 (rate limit), 502, 503, 504
 *
 * Backoff is exponential with jitter: 500ms, 1.5s, 4s by default.
 */
export interface RetryOptions {
  attempts?: number;
  baseDelayMs?: number;
  /** Hook for logging each attempt — useful in tests and ops. */
  onAttempt?: (attempt: number, err: unknown) => void;
}

const RETRYABLE_STATUS = new Set([408, 429, 502, 503, 504]);

export async function withRetry<T>(
  fn: () => Promise<T>,
  opts: RetryOptions = {},
): Promise<T> {
  const attempts = Math.max(1, opts.attempts ?? 3);
  const base = opts.baseDelayMs ?? 500;
  let lastErr: unknown;

  for (let i = 0; i < attempts; i++) {
    try {
      return await fn();
    } catch (err) {
      lastErr = err;
      const status = extractStatus(err);
      const retryable = status === null || RETRYABLE_STATUS.has(status);
      opts.onAttempt?.(i + 1, err);
      if (!retryable || i === attempts - 1) throw err;
      const jitter = 0.7 + Math.random() * 0.6; // 0.7x..1.3x
      const delay = Math.round(base * Math.pow(3, i) * jitter);
      await new Promise((r) => setTimeout(r, delay));
    }
  }
  throw lastErr instanceof Error ? lastErr : new Error(String(lastErr));
}

/** Extracts an HTTP status code from a thrown Error with `.status`, or null. */
function extractStatus(err: unknown): number | null {
  if (err && typeof err === "object" && "status" in err) {
    const s = (err as { status?: unknown }).status;
    if (typeof s === "number") return s;
  }
  return null;
}
