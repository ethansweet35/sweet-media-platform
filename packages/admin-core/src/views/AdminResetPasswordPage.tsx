"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "../contexts/AuthContext";
import { supabase } from "../lib/supabase";
import { supabaseConfigured } from "../lib/supabase";
import AdminFonts from "../components/AdminFonts";
import {
  ADMIN_ACCENT,
  ADMIN_SURFACE,
  ADMIN_TEXT,
  ADMIN_TEXT_MUTED,
  adminCardCls,
  adminFontSans,
  adminFontSerif,
  adminInputCls,
  adminPrimaryBtnCls,
} from "../lib/adminTheme";

function AuthShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AdminFonts />
      <div
        className={`min-h-screen flex items-center justify-center px-4 ${adminFontSans}`}
        style={{ backgroundColor: ADMIN_SURFACE }}
      >
        {children}
      </div>
    </>
  );
}

export default function AdminResetPasswordPage() {
  const router = useRouter();
  const { updatePassword } = useAuth();
  const [ready, setReady] = useState(false);
  const [invalidLink, setInvalidLink] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!supabaseConfigured) return;

    let mounted = true;
    let timeoutId: number | undefined;

    const markReady = () => {
      if (mounted) {
        setReady(true);
        setInvalidLink(false);
      }
    };

    const markInvalid = () => {
      if (mounted) setInvalidLink(true);
    };

    const cleanAuthParamsFromUrl = () => {
      if (typeof window === "undefined") return;
      const url = new URL(window.location.href);
      url.searchParams.delete("code");
      url.searchParams.delete("type");
      url.hash = "";
      window.history.replaceState({}, "", `${url.pathname}${url.search}`);
    };

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY" || event === "SIGNED_IN") {
        markReady();
      }
    });

    async function bootstrapRecoverySession() {
      const params = new URLSearchParams(window.location.search);
      const code = params.get("code");

      if (code) {
        const { error } = await supabase.auth.exchangeCodeForSession(code);
        if (error) {
          console.error("exchangeCodeForSession failed:", error);
          markInvalid();
          return;
        }
        cleanAuthParamsFromUrl();
        markReady();
        return;
      }

      const hash = window.location.hash || "";
      if (hash.includes("access_token=") || hash.includes("type=recovery")) {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error || !session) {
          markInvalid();
          return;
        }
        cleanAuthParamsFromUrl();
        markReady();
        return;
      }

      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        markReady();
        return;
      }

      timeoutId = window.setTimeout(() => {
        if (mounted) markInvalid();
      }, 8000);
    }

    void bootstrapRecoverySession();

    return () => {
      mounted = false;
      subscription.unsubscribe();
      if (timeoutId) window.clearTimeout(timeoutId);
    };
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setError(null);

      if (password.length < 8) {
        setError("Password must be at least 8 characters.");
        return;
      }
      if (password !== confirmPassword) {
        setError("Passwords do not match.");
        return;
      }

      setSubmitting(true);
      const { error: updateError } = await updatePassword(password);
      setSubmitting(false);

      if (updateError) {
        setError(updateError);
        return;
      }

      setDone(true);
      window.setTimeout(() => {
        router.replace("/admin/login");
      }, 2000);
    },
    [confirmPassword, password, router, updatePassword],
  );

  if (!supabaseConfigured) {
    return (
      <AuthShell>
        <p className="text-sm" style={{ color: ADMIN_TEXT_MUTED }}>
          Supabase is not configured in this environment.
        </p>
      </AuthShell>
    );
  }

  if (invalidLink && !ready) {
    return (
      <AuthShell>
        <div className="w-full max-w-sm text-center">
          <div className={`${adminCardCls} p-8 space-y-4`}>
            <i className="ri-link-unlink text-3xl" style={{ color: ADMIN_TEXT_MUTED }} />
            <h1 className={`text-xl font-semibold ${adminFontSerif}`} style={{ color: ADMIN_TEXT }}>
              Link expired or invalid
            </h1>
            <p className="text-sm" style={{ color: ADMIN_TEXT_MUTED }}>
              Request a new password reset email and open the latest link.
            </p>
            <Link
              href="/admin/forgot-password"
              className="inline-flex text-sm font-semibold underline-offset-4 hover:underline"
              style={{ color: ADMIN_ACCENT }}
            >
              Request new link
            </Link>
          </div>
        </div>
      </AuthShell>
    );
  }

  if (!ready && !done) {
    return (
      <AuthShell>
        <div
          className="w-6 h-6 border-2 rounded-full animate-spin"
          style={{ borderColor: `${ADMIN_ACCENT}44`, borderTopColor: ADMIN_ACCENT }}
        />
      </AuthShell>
    );
  }

  return (
    <AuthShell>
      <div className="w-full max-w-sm">
        <div className="text-center mb-10">
          <div
            className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-5 shadow-[0_8px_32px_rgba(123,159,212,0.3)]"
            style={{ background: `linear-gradient(135deg, ${ADMIN_ACCENT}, #5a7eb8)` }}
          >
            <i className="ri-lock-password-line text-white text-2xl" />
          </div>
          <h1 className={`text-3xl font-semibold tracking-tight ${adminFontSerif}`} style={{ color: ADMIN_TEXT }}>
            Choose a new password
          </h1>
        </div>

        <div className={`${adminCardCls} p-8`}>
          {done ? (
            <div className="text-center space-y-3">
              <p className="text-sm" style={{ color: ADMIN_TEXT }}>
                Password updated. Redirecting to sign in…
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium mb-1.5" style={{ color: ADMIN_TEXT }}>
                  New password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={8}
                    autoComplete="new-password"
                    placeholder="At least 8 characters"
                    className={`${adminInputCls} pr-10`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                    style={{ color: ADMIN_TEXT_MUTED }}
                  >
                    <i className={showPassword ? "ri-eye-off-line text-sm" : "ri-eye-line text-sm"} />
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1.5" style={{ color: ADMIN_TEXT }}>
                  Confirm password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  minLength={8}
                  autoComplete="new-password"
                  placeholder="Repeat password"
                  className={adminInputCls}
                />
              </div>

              {error && (
                <div className="flex items-start gap-2.5 bg-red-50 border border-red-200 rounded-xl px-3.5 py-3">
                  <i className="ri-error-warning-line text-red-500 text-sm mt-0.5 shrink-0" />
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              )}

              <button type="submit" disabled={submitting} className={`w-full ${adminPrimaryBtnCls}`}>
                {submitting ? "Saving…" : "Update password"}
              </button>
            </form>
          )}
        </div>
      </div>
    </AuthShell>
  );
}
