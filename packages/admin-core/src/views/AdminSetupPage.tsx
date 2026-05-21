"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../lib/supabase";
import AdminFonts from "../components/AdminFonts";
import {
  ADMIN_SURFACE,
  ADMIN_TEXT,
  ADMIN_TEXT_MUTED,
  adminCardCls,
  adminFontSans,
  adminFontSerif,
  adminInputCls,
  adminPrimaryBtnCls,
} from "../lib/adminTheme";

const EDGE_FUNCTION_URL = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/admin-setup`;

export default function FirstAdminSetupPage() {
  const router = useRouter();

  const [error, setError] = useState<string | null>(null);
  const [checking, setChecking] = useState(true);
  const [hasAdmins, setHasAdmins] = useState(false);

  // Check if admins already exist
  useEffect(() => {
    const checkAdmins = async () => {
      try {
        const { count, error: queryError } = await supabase
          .from("admin_users")
          .select("*", { count: "exact", head: true });

        if (queryError) {
          console.error("Setup check error:", queryError);
          setError("Could not check admin status. Please refresh.");
        } else if (count && count > 0) {
          setHasAdmins(true);
        }
      } catch (err) {
        console.error("Setup check exception:", err);
        setError("Something went wrong checking admin status.");
      } finally {
        setChecking(false);
      }
    };

    // Safety timeout — never hang longer than 3 seconds
    const timeout = setTimeout(() => {
      setChecking(false);
    }, 3000);

    checkAdmins();

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (hasAdmins) {
      router.replace("/admin/login");
    }
  }, [hasAdmins, router]);

  if (checking) {
    return (
      <>
        <AdminFonts />
        <div className={`min-h-screen flex items-center justify-center ${adminFontSans}`} style={{ backgroundColor: ADMIN_SURFACE }}>
          <div className="w-6 h-6 border-2 border-[#7B9FD4]/30 border-t-[#0A1F44] rounded-full animate-spin" />
        </div>
      </>
    );
  }

  return (
    <>
      <AdminFonts />
      <div className={`min-h-screen flex items-center justify-center px-4 ${adminFontSans}`} style={{ backgroundColor: ADMIN_SURFACE }}>
        <div className="w-full max-w-sm">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4 bg-[#0A1F44]">
              <i className="ri-shield-keyhole-line text-white text-xl" />
            </div>
            <h1 className={`text-2xl font-semibold tracking-tight ${adminFontSerif}`} style={{ color: ADMIN_TEXT }}>
              First Admin Setup
            </h1>
            <p className="text-sm mt-1" style={{ color: ADMIN_TEXT_MUTED }}>
              Create your admin account to manage blog content
            </p>
          </div>

          <div className={`${adminCardCls} p-8`}>
            <EmailPasswordSetup />

            {error && (
              <div className="flex items-start gap-2.5 bg-red-50 border border-red-200 rounded-lg px-3.5 py-3 mt-5">
                <div className="w-4 h-4 flex items-center justify-center mt-0.5 shrink-0">
                  <i className="ri-error-warning-line text-red-500 text-sm" />
                </div>
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}
          </div>

          <p className="text-center text-xs mt-6" style={{ color: ADMIN_TEXT_MUTED }}>
            This page only works when no admins exist. Once set up, it will redirect to the login page.
          </p>
        </div>
      </div>
    </>
  );
}

function EmailPasswordSetup() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch(EDGE_FUNCTION_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok || data.error) {
        setError(data.error || "Something went wrong. Please try again.");
        setSubmitting(false);
        return;
      }

      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        setError("Account created but sign-in failed. Please go to /admin/login and sign in manually.");
        setSubmitting(false);
        return;
      }

      router.replace("/admin/blogs");
    } catch (err) {
      setError("Network error. Please check your connection and try again.");
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        autoComplete="email"
        placeholder="Email address"
        className={adminInputCls}
      />
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="new-password"
          placeholder="Password (min 6 chars)"
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
      <input
        type={showPassword ? "text" : "password"}
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
        autoComplete="new-password"
        placeholder="Confirm password"
        className={adminInputCls}
      />
      <button
        type="submit"
        disabled={submitting}
        className={`w-full ${adminPrimaryBtnCls}`}
      >
        {submitting ? (
          <span className="flex items-center justify-center gap-2">
            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Setting up...
          </span>
        ) : (
          "Create Admin Account"
        )}
      </button>
      {error && (
        <div className="flex items-start gap-2.5 bg-red-50 border border-red-200 rounded-lg px-3.5 py-3">
          <div className="w-4 h-4 flex items-center justify-center mt-0.5 shrink-0">
            <i className="ri-error-warning-line text-red-500 text-sm" />
          </div>
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}
    </form>
  );
}
