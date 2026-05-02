"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import Seo from "@/components/feature/Seo";

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
      <div className="min-h-screen bg-stone-50 flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-stone-300 border-t-stone-700 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <>
      <Seo title="Admin Setup" description="First-time admin account setup" noindex />
      <div className="min-h-screen bg-stone-50 flex items-center justify-center px-4">
        <div className="w-full max-w-sm">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-stone-900 rounded-xl mb-4">
              <i className="ri-shield-keyhole-line text-white text-xl" />
            </div>
            <h1 className="text-2xl font-semibold text-stone-900 tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
              First Admin Setup
            </h1>
            <p className="text-sm text-stone-500 mt-1">
              Create your admin account to manage blog content
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-stone-200 p-8">
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

          <p className="text-center text-xs text-stone-400 mt-6">
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
        className="w-full px-3.5 py-2.5 text-sm border border-stone-200 rounded-lg bg-stone-50 text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-900 focus:border-transparent transition-all"
      />
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="new-password"
          placeholder="Password (min 6 chars)"
          className="w-full px-3.5 py-2.5 text-sm border border-stone-200 rounded-lg bg-stone-50 text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-900 focus:border-transparent transition-all pr-10"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center text-stone-400 hover:text-stone-600 cursor-pointer"
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
        className="w-full px-3.5 py-2.5 text-sm border border-stone-200 rounded-lg bg-stone-50 text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-900 focus:border-transparent transition-all"
      />
      <button
        type="submit"
        disabled={submitting}
        className="w-full py-2.5 bg-stone-900 text-white text-sm font-medium rounded-lg hover:bg-stone-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer whitespace-nowrap"
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
