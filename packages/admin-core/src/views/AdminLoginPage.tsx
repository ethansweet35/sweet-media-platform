"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../contexts/AuthContext";
import { supabaseConfigured } from "../lib/supabase";
import AdminFonts from "../components/AdminFonts";
import {
  ADMIN_ACCENT,
  ADMIN_NAVY,
  ADMIN_NAVY_DEEP,
  ADMIN_SURFACE,
  ADMIN_TEXT,
  ADMIN_TEXT_MUTED,
  adminFontSans,
  adminFontSerif,
  adminInputCls,
  adminPrimaryBtnCls,
  adminCardCls,
} from "../lib/adminTheme";

function LoginShell({ children }: { children: React.ReactNode }) {
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

export default function AdminLoginPage() {
  const { signIn, user, isAdmin, isLoading } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (!isLoading && isAdmin) {
      router.replace("/admin");
    }
  }, [isAdmin, isLoading, router]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      const { error: signInError } = await signIn(email, password);

      if (signInError) {
        setError("Invalid email or password");
        setSubmitting(false);
        return;
      }
    } catch {
      setError("Something went wrong. Please try again.");
      setSubmitting(false);
    }
  }, [email, password, signIn]);

  if (!supabaseConfigured) {
    return (
      <LoginShell>
        <div className="w-full max-w-sm text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-red-100 rounded-xl mb-4">
            <i className="ri-error-warning-line text-red-500 text-xl" />
          </div>
          <h1 className={`text-lg font-semibold mb-2 ${adminFontSerif}`} style={{ color: ADMIN_TEXT }}>
            Missing Configuration
          </h1>
          <p className="text-sm leading-relaxed" style={{ color: ADMIN_TEXT_MUTED }}>
            <code className="text-xs bg-white px-1.5 py-0.5 rounded border border-[#E2E8F0]">NEXT_PUBLIC_SUPABASE_URL</code> and{" "}
            <code className="text-xs bg-white px-1.5 py-0.5 rounded border border-[#E2E8F0]">NEXT_PUBLIC_SUPABASE_ANON_KEY</code>{" "}
            are not set in this environment.
          </p>
        </div>
      </LoginShell>
    );
  }

  if (isLoading) {
    return (
      <LoginShell>
        <div
          className="w-6 h-6 border-2 rounded-full animate-spin"
          style={{ borderColor: `${ADMIN_ACCENT}44`, borderTopColor: ADMIN_NAVY }}
        />
      </LoginShell>
    );
  }

  return (
    <LoginShell>
      <div className="w-full max-w-sm">
        <div className="text-center mb-10">
          <div
            className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-5 shadow-[0_8px_32px_rgba(123,159,212,0.3)]"
            style={{ background: `linear-gradient(135deg, ${ADMIN_ACCENT}, #5a7eb8)` }}
          >
            <i className="ri-shield-keyhole-line text-white text-2xl" />
          </div>
          <h1
            className={`text-3xl font-semibold tracking-tight ${adminFontSerif}`}
            style={{ color: ADMIN_TEXT }}
          >
            Admin Access
          </h1>
          <p className="text-sm mt-2" style={{ color: ADMIN_TEXT_MUTED }}>
            Sign in to manage your content
          </p>
        </div>

        <div className={`${adminCardCls} p-8`}>
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

            <div>
              <label className="block text-sm font-medium mb-1.5" style={{ color: ADMIN_TEXT }}>
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  placeholder="••••••••"
                  className={`${adminInputCls} pr-10`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center cursor-pointer"
                  style={{ color: ADMIN_TEXT_MUTED }}
                >
                  <i className={showPassword ? "ri-eye-off-line text-sm" : "ri-eye-line text-sm"} />
                </button>
              </div>
            </div>

            {error && (
              <div className="flex items-start gap-2.5 bg-red-50 border border-red-200 rounded-xl px-3.5 py-3">
                <i className="ri-error-warning-line text-red-500 text-sm mt-0.5 shrink-0" />
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={submitting}
              className={`w-full ${adminPrimaryBtnCls}`}
            >
              {submitting ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing in...
                </span>
              ) : (
                "Sign in"
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-xs mt-6" style={{ color: ADMIN_TEXT_MUTED }}>
          Restricted to authorized administrators only.
        </p>

        {/* Subtle brand strip */}
        <div
          className="mx-auto mt-8 h-1 w-24 rounded-full opacity-60"
          style={{ background: `linear-gradient(90deg, ${ADMIN_NAVY_DEEP}, ${ADMIN_ACCENT}, ${ADMIN_NAVY_DEEP})` }}
        />
      </div>
    </LoginShell>
  );
}
