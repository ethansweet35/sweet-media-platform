"use client";

import { createContext, useContext, useEffect, useState, useCallback, useRef } from "react";
import type { Session, User } from "@supabase/supabase-js";
import { supabase } from "../lib/supabase";

interface AuthContextValue {
  session: Session | null;
  user: User | null;
  isAdmin: boolean;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  requestPasswordReset: (email: string) => Promise<{ error: string | null }>;
  updatePassword: (password: string) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const sessionSeqRef = useRef(0);

  const checkAdmin = useCallback(async (userEmail: string | null | undefined) => {
    if (!userEmail) return false;
    try {
      const { data, error } = await supabase
        .from("admin_users")
        .select("id")
        .ilike("email", userEmail)
        .maybeSingle();
      if (error) {
        console.error("Admin check failed:", error);
        return false;
      }
      return !!data;
    } catch (err) {
      console.error("Admin check failed:", err);
      return false;
    }
  }, []);

  useEffect(() => {
    let mounted = true;

    const handleSession = async (s: Session | null) => {
      if (!mounted) return;
      const seq = ++sessionSeqRef.current;
      setSession(s);
      setUser(s?.user ?? null);

      if (s?.user?.email) {
        const admin = await checkAdmin(s.user.email);
        if (mounted && seq === sessionSeqRef.current) setIsAdmin(admin);
      } else if (mounted && seq === sessionSeqRef.current) {
        setIsAdmin(false);
      }

      if (mounted && seq === sessionSeqRef.current) setIsLoading(false);
    };

    // Get the initial session explicitly. This always resolves, even if no session exists.
    supabase.auth.getSession().then(({ data: { session: s } }) => {
      handleSession(s);
    }).catch((err) => {
      console.error("getSession error:", err);
      if (mounted) setIsLoading(false);
    });

    // Listen for subsequent auth changes (sign-in, sign-out, token refresh)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, s) => {
        handleSession(s);
      }
    );

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [checkAdmin]);

  // Keep the sm_internal cookie in sync with admin status so analytics
  // can suppress tracking for internal team members without a static IP.
  useEffect(() => {
    if (isAdmin) {
      document.cookie = "sm_internal=1; max-age=31536000; path=/; SameSite=Strict";
    } else if (!isLoading) {
      document.cookie = "sm_internal=; max-age=0; path=/; SameSite=Strict";
    }
  }, [isAdmin, isLoading]);

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return { error: error.message };
    // Don't manually set state — onAuthStateChange will fire with the new session
    return { error: null };
  };

  const requestPasswordReset = async (email: string) => {
    const normalized = email.trim().toLowerCase();
    if (!normalized) return { error: "Email is required." };

    try {
      const res = await fetch("/api/admin/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: normalized }),
      });
      if (!res.ok) {
        let message = "Something went wrong. Please try again.";
        try {
          const json = (await res.json()) as { message?: string; error?: string };
          message = json.error || json.message || message;
        } catch {
          /* ignore */
        }
        return { error: message };
      }
    } catch (err) {
      console.error("Password reset request failed:", err);
      return { error: "Something went wrong. Please try again." };
    }

    return { error: null };
  };

  const updatePassword = async (password: string) => {
    const { error } = await supabase.auth.updateUser({ password });
    if (error) return { error: error.message };
    return { error: null };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    // Don't manually set state — onAuthStateChange will fire with null session
  };

  return (
    <AuthContext.Provider
      value={{ session, user, isAdmin, isLoading, signIn, requestPasswordReset, updatePassword, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
