"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import AdminPageHeader from "../components/AdminPageHeader";
import { ADMIN_OCEAN, adminFontSerif } from "../lib/adminTheme";
import { supabase } from "../lib/supabase";

type ConnectionStatus =
  | { state: "loading" }
  | { state: "connected"; email: string }
  | { state: "disconnected" };

export default function AdminSearchConsolePage() {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<ConnectionStatus>({ state: "loading" });
  const [disconnecting, setDisconnecting] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  // Read status from system_settings on mount
  useEffect(() => {
    let cancelled = false;
    async function check() {
      try {
        const { data } = await supabase
          .from("system_settings")
          .select("key, value")
          .in("key", ["google_search_console_refresh_token", "google_search_console_connected_email"]);

        if (cancelled) return;

        const rows = (data ?? []) as { key: string; value: unknown }[];
        const hasToken = rows.some((r) => r.key === "google_search_console_refresh_token" && r.value);
        const email = rows.find((r) => r.key === "google_search_console_connected_email")?.value as string | undefined;

        setStatus(
          hasToken
            ? { state: "connected", email: email ?? "" }
            : { state: "disconnected" },
        );
      } catch {
        setStatus({ state: "disconnected" });
      }
    }
    check();
    return () => { cancelled = true; };
  }, []);

  // Handle OAuth redirect params
  useEffect(() => {
    const connected = searchParams.get("gsc_connected");
    const error = searchParams.get("gsc_error");

    if (connected === "1") {
      showToast("Google Search Console connected successfully.", "success");
      // Re-check status
      setStatus({ state: "loading" });
      supabase
        .from("system_settings")
        .select("key, value")
        .in("key", ["google_search_console_refresh_token", "google_search_console_connected_email"])
        .then(({ data }) => {
          const rows = (data ?? []) as { key: string; value: unknown }[];
          const hasToken = rows.some((r) => r.key === "google_search_console_refresh_token" && r.value);
          const email = rows.find((r) => r.key === "google_search_console_connected_email")?.value as string | undefined;
          setStatus(hasToken ? { state: "connected", email: email ?? "" } : { state: "disconnected" });
        });
    } else if (error) {
      const messages: Record<string, string> = {
        access_denied: "You denied access. Please try again and click Allow.",
        missing_params: "OAuth callback was missing required parameters.",
        invalid_state: "Security check failed. Please try again.",
        token_exchange_failed: "Could not exchange the authorisation code. Check your OAuth client credentials.",
        no_refresh_token: "Google did not return a refresh token. Try revoking access at myaccount.google.com/permissions and reconnecting.",
        missing_env: "Server is missing GOOGLE_OAUTH_CLIENT_ID or GOOGLE_OAUTH_CLIENT_SECRET environment variables.",
        unexpected: "An unexpected error occurred. Check server logs.",
      };
      showToast(messages[error] ?? `OAuth error: ${error}`, "error");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function showToast(message: string, type: "success" | "error") {
    setToast({ message, type });
    setTimeout(() => setToast(null), 6000);
  }

  async function handleDisconnect() {
    if (!confirm("Remove the Google Search Console connection for this site?")) return;
    setDisconnecting(true);
    try {
      // Use the anon client — RLS allows authenticated admins to upsert system_settings
      await supabase.from("system_settings").upsert([
        { key: "google_search_console_refresh_token", value: null },
        { key: "google_search_console_connected_email", value: null },
      ], { onConflict: "key" });
      setStatus({ state: "disconnected" });
      showToast("Disconnected.", "success");
    } catch {
      showToast("Failed to disconnect.", "error");
    } finally {
      setDisconnecting(false);
    }
  }

  return (
    <div>
      <AdminPageHeader
        title="Search Console"
        subtitle="Connect your Google account to display live clicks, impressions, and ranking position in the Pages and Blog Posts tables."
      />

      {/* Toast */}
      {toast && (
        <div
          className={`mb-6 flex items-start gap-3 rounded-2xl px-5 py-4 text-sm ${
            toast.type === "success"
              ? "border border-emerald-200 bg-emerald-50 text-emerald-800"
              : "border border-red-200 bg-red-50 text-red-800"
          }`}
        >
          <i className={`mt-0.5 text-base flex-shrink-0 ${toast.type === "success" ? "ri-checkbox-circle-line" : "ri-error-warning-line"}`} />
          <p>{toast.message}</p>
        </div>
      )}

      {/* Connection card */}
      <div className="rounded-2xl border border-neutral-100 bg-white p-8 shadow-[0_1px_20px_rgba(0,0,0,0.04)]">
        {status.state === "loading" ? (
          <div className="flex items-center gap-3 text-neutral-400">
            <i className="ri-loader-4-line animate-spin text-xl" />
            <span className="text-sm">Checking connection…</span>
          </div>
        ) : status.state === "connected" ? (
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-50">
                <i className="ri-google-line text-2xl text-emerald-600" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className={`text-lg font-semibold text-neutral-900 ${adminFontSerif}`}>Connected</span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-700">
                    <i className="ri-checkbox-circle-fill text-[11px]" />
                    Active
                  </span>
                </div>
                {status.email ? (
                  <p className="mt-1 text-sm text-neutral-500">
                    Signed in as <span className="font-medium text-neutral-700">{status.email}</span>
                  </p>
                ) : (
                  <p className="mt-1 text-sm text-neutral-500">Google account connected.</p>
                )}
                <p className="mt-2 text-[12px] text-neutral-400">
                  GSC data refreshes every hour. To switch accounts, disconnect and reconnect.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <a
                href="/api/admin/search-console/connect"
                className="inline-flex items-center gap-2 rounded-xl border border-neutral-200 px-4 py-2.5 text-[12px] font-semibold text-neutral-600 transition-colors hover:border-neutral-300 hover:bg-neutral-50 cursor-pointer"
              >
                <i className="ri-refresh-line" />
                Reconnect
              </a>
              <button
                type="button"
                onClick={() => void handleDisconnect()}
                disabled={disconnecting}
                className="inline-flex items-center gap-2 rounded-xl border border-red-200 px-4 py-2.5 text-[12px] font-semibold text-red-600 transition-colors hover:border-red-300 hover:bg-red-50 disabled:opacity-50 cursor-pointer"
              >
                {disconnecting ? <i className="ri-loader-4-line animate-spin" /> : <i className="ri-link-unlink-line" />}
                Disconnect
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-6 py-6 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-3xl border border-neutral-100 bg-neutral-50">
              <i className="ri-google-line text-3xl text-neutral-400" />
            </div>
            <div>
              <h2 className={`text-xl font-semibold text-neutral-900 ${adminFontSerif}`}>
                Connect Google Search Console
              </h2>
              <p className="mt-2 max-w-md text-sm text-neutral-500">
                Sign in with the Google account that has access to this site&apos;s Search Console
                property. Clicks, impressions, and average position will appear in the Pages and
                Blog Posts tables.
              </p>
            </div>
            <a
              href="/api/admin/search-console/connect"
              className="inline-flex items-center gap-2.5 rounded-2xl px-7 py-3.5 text-sm font-semibold text-white shadow-[0_2px_24px_rgba(61,111,127,0.22)] transition-opacity hover:opacity-90"
              style={{ backgroundColor: ADMIN_OCEAN }}
            >
              <i className="ri-google-line text-base" />
              Connect Google Account
            </a>
            <p className="text-[11px] text-neutral-400 max-w-sm">
              You will be redirected to Google to authorise read-only access to Search Console data.
              No data is modified.
            </p>
          </div>
        )}
      </div>

      {/* How it works */}
      <div className="mt-6 rounded-2xl border border-neutral-100 bg-white p-6">
        <h3 className={`text-sm font-semibold text-neutral-800 ${adminFontSerif}`}>How it works</h3>
        <ul className="mt-4 flex flex-col gap-3">
          {[
            { icon: "ri-shield-keyhole-line", text: "Read-only access — this integration can only read Search Console data, never modify it." },
            { icon: "ri-time-line", text: "Data is refreshed every hour and cached server-side. GSC data has a ~3-day lag from Google." },
            { icon: "ri-building-2-line", text: "Works for any site your Google account has access to in Search Console — including WordPress sites." },
            { icon: "ri-link-unlink-line", text: "Disconnect at any time from this page. You can also revoke access from myaccount.google.com/permissions." },
          ].map(({ icon, text }) => (
            <li key={icon} className="flex items-start gap-3 text-sm text-neutral-600">
              <i className={`${icon} mt-0.5 text-base text-neutral-400 shrink-0`} />
              <span>{text}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Setup instructions callout */}
      <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-6">
        <div className="flex items-start gap-3">
          <i className="ri-information-line mt-0.5 text-base text-amber-600 shrink-0" />
          <div>
            <p className="text-sm font-semibold text-amber-800">First-time setup required</p>
            <p className="mt-1 text-sm text-amber-700">
              The <code className="rounded bg-amber-100 px-1 py-0.5 text-[11px]">GOOGLE_OAUTH_CLIENT_ID</code> and{" "}
              <code className="rounded bg-amber-100 px-1 py-0.5 text-[11px]">GOOGLE_OAUTH_CLIENT_SECRET</code> environment
              variables must be set on this Vercel project before the Connect button will work. See the setup guide
              in your project documentation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
