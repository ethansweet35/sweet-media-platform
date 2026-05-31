"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { useAuth } from "../contexts/AuthContext";
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

export default function AdminForgotPasswordPage() {
  const { requestPasswordReset } = useAuth();
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setError(null);
      setSubmitting(true);

      const { error: resetError } = await requestPasswordReset(email);
      setSubmitting(false);

      if (resetError) {
        setError(resetError);
        return;
      }

      setSent(true);
    },
    [email, requestPasswordReset],
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

  return (
    <AuthShell>
      <div className="w-full max-w-sm">
        <div className="text-center mb-10">
          <div
            className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-5 shadow-[0_8px_32px_rgba(123,159,212,0.3)]"
            style={{ background: `linear-gradient(135deg, ${ADMIN_ACCENT}, #5a7eb8)` }}
          >
            <i className="ri-mail-send-line text-white text-2xl" />
          </div>
          <h1 className={`text-3xl font-semibold tracking-tight ${adminFontSerif}`} style={{ color: ADMIN_TEXT }}>
            Reset password
          </h1>
          <p className="text-sm mt-2" style={{ color: ADMIN_TEXT_MUTED }}>
            We&apos;ll email a link to set a new password
          </p>
        </div>

        <div className={`${adminCardCls} p-8`}>
          {sent ? (
            <div className="space-y-4 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-emerald-50 rounded-xl">
                <i className="ri-check-line text-emerald-600 text-xl" />
              </div>
              <p className="text-sm leading-relaxed" style={{ color: ADMIN_TEXT }}>
                If <strong>{email.trim()}</strong> is registered as an admin for this site, you&apos;ll receive a
                password reset email shortly.
              </p>
              <p className="text-xs" style={{ color: ADMIN_TEXT_MUTED }}>
                Check spam if it doesn&apos;t arrive within a few minutes.
              </p>
              <Link
                href="/admin/login"
                className="inline-flex text-sm font-semibold underline-offset-4 hover:underline"
                style={{ color: ADMIN_ACCENT }}
              >
                Back to sign in
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium mb-1.5" style={{ color: ADMIN_TEXT }}>
                  Email address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                  placeholder="you@example.com"
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
                {submitting ? "Sending…" : "Send reset link"}
              </button>

              <p className="text-center text-sm">
                <Link
                  href="/admin/login"
                  className="font-semibold underline-offset-4 hover:underline"
                  style={{ color: ADMIN_TEXT_MUTED }}
                >
                  Back to sign in
                </Link>
              </p>
            </form>
          )}
        </div>
      </div>
    </AuthShell>
  );
}
