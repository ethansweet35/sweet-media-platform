"use client";

import { useCallback, useEffect, useState } from "react";
import AdminPageHeader from "../components/AdminPageHeader";
import { useAuth } from "../contexts/AuthContext";
import { supabase } from "../lib/supabase";
import {
  ADMIN_ACCENT,
  ADMIN_ACCENT_SOFT,
  ADMIN_OCEAN,
  ADMIN_OCEAN_HOVER,
  ADMIN_TEXT,
  ADMIN_TEXT_MUTED,
} from "../lib/adminTheme";
import type { AdminUserRow } from "../lib/server/adminUsers";

async function adminFetch(
  path: string,
  init?: RequestInit,
): Promise<Response> {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const token = session?.access_token;
  if (!token) {
    throw new Error("Not signed in.");
  }
  return fetch(path, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...(init?.headers ?? {}),
    },
  });
}

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return iso;
  }
}

export default function AdminUsersPage() {
  const { user } = useAuth();
  const currentEmail = user?.email?.toLowerCase() ?? "";

  const [users, setUsers] = useState<AdminUserRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [inviteEmail, setInviteEmail] = useState("");
  const [sendInvite, setSendInvite] = useState(true);
  const [manualPassword, setManualPassword] = useState("");
  const [inviting, setInviting] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const showToast = (message: string, type: "success" | "error" = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4500);
  };

  const loadUsers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await adminFetch("/api/admin/users");
      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.error ?? "Failed to load users.");
      }
      setUsers(json.users ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load users.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadUsers();
  }, [loadUsers]);

  const handleInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    const email = inviteEmail.trim().toLowerCase();
    if (!email.includes("@")) {
      showToast("Enter a valid email address.", "error");
      return;
    }
    if (!sendInvite && manualPassword.length < 8) {
      showToast("Password must be at least 8 characters.", "error");
      return;
    }

    setInviting(true);
    try {
      const body: { email: string; sendInvite: boolean; password?: string } = {
        email,
        sendInvite,
      };
      if (!sendInvite) {
        body.password = manualPassword;
      }

      const res = await adminFetch("/api/admin/users", {
        method: "POST",
        body: JSON.stringify(body),
      });
      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.error ?? "Failed to invite user.");
      }

      setUsers((prev) => {
        const exists = prev.some((u) => u.id === json.user.id);
        if (exists) {
          return prev.map((u) => (u.id === json.user.id ? json.user : u));
        }
        return [...prev, json.user].sort(
          (a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
        );
      });

      setInviteEmail("");
      setManualPassword("");
      const note =
        json.authNote === "invitation email sent"
          ? "Invitation email sent."
          : json.authNote === "auth user created with password"
            ? "User created with the password you set."
            : json.authNote === "password updated for existing auth user"
              ? "Password updated for existing account."
              : "Admin access granted.";
      showToast(note);
    } catch (err) {
      showToast(err instanceof Error ? err.message : "Failed to invite user.", "error");
    } finally {
      setInviting(false);
    }
  };

  const handleDelete = async (row: AdminUserRow) => {
    if (row.email.toLowerCase() === currentEmail) {
      showToast("You cannot remove your own admin access.", "error");
      return;
    }
    if (
      !window.confirm(
        `Remove admin access for ${row.email}? This deletes their login for this site.`,
      )
    ) {
      return;
    }

    setDeletingId(row.id);
    try {
      const res = await adminFetch(`/api/admin/users?id=${encodeURIComponent(row.id)}`, {
        method: "DELETE",
      });
      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.error ?? "Failed to remove user.");
      }
      setUsers((prev) => prev.filter((u) => u.id !== row.id));
      showToast(`Removed ${row.email}.`);
    } catch (err) {
      showToast(err instanceof Error ? err.message : "Failed to remove user.", "error");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div>
      <AdminPageHeader
        title="User management"
        subtitle="Invite teammates and manage who can sign in to this admin panel."
      />

      {toast && (
        <div
          className="mb-6 rounded-lg border px-4 py-3 text-sm"
          style={{
            borderColor: toast.type === "error" ? "#fecaca" : ADMIN_ACCENT,
            backgroundColor: toast.type === "error" ? "#fef2f2" : ADMIN_ACCENT_SOFT,
            color: toast.type === "error" ? "#991b1b" : ADMIN_TEXT,
          }}
        >
          {toast.message}
        </div>
      )}

      <section
        className="mb-8 rounded-xl border bg-white p-6 shadow-sm"
        style={{ borderColor: "#e8e4dc" }}
      >
        <h2 className="mb-1 text-lg font-semibold" style={{ color: ADMIN_TEXT }}>
          Invite admin
        </h2>
        <p className="mb-5 text-sm" style={{ color: ADMIN_TEXT_MUTED }}>
          New users receive an email to set their password, unless you set one manually below.
        </p>

        <form onSubmit={handleInvite} className="space-y-4">
          <div>
            <label
              htmlFor="invite-email"
              className="mb-1.5 block text-xs font-semibold uppercase tracking-wide"
              style={{ color: ADMIN_TEXT_MUTED }}
            >
              Email
            </label>
            <input
              id="invite-email"
              type="email"
              required
              autoComplete="off"
              value={inviteEmail}
              onChange={(e) => setInviteEmail(e.target.value)}
              placeholder="name@company.com"
              className="w-full max-w-md rounded-lg border px-3 py-2.5 text-sm outline-none focus:ring-2"
              style={{ borderColor: "#e8e4dc", color: ADMIN_TEXT }}
            />
          </div>

          <label className="flex cursor-pointer items-center gap-2 text-sm" style={{ color: ADMIN_TEXT }}>
            <input
              type="checkbox"
              checked={sendInvite}
              onChange={(e) => setSendInvite(e.target.checked)}
              className="h-4 w-4 rounded border-gray-300"
            />
            Send invitation email (recommended)
          </label>

          {!sendInvite && (
            <div>
              <label
                htmlFor="invite-password"
                className="mb-1.5 block text-xs font-semibold uppercase tracking-wide"
                style={{ color: ADMIN_TEXT_MUTED }}
              >
                Temporary password
              </label>
              <input
                id="invite-password"
                type="password"
                autoComplete="new-password"
                value={manualPassword}
                onChange={(e) => setManualPassword(e.target.value)}
                placeholder="At least 8 characters"
                className="w-full max-w-md rounded-lg border px-3 py-2.5 text-sm outline-none focus:ring-2"
                style={{ borderColor: "#e8e4dc", color: ADMIN_TEXT }}
              />
              <p className="mt-1.5 text-xs" style={{ color: ADMIN_TEXT_MUTED }}>
                Share this password securely. Ask them to change it after first login.
              </p>
            </div>
          )}

          <button
            type="submit"
            disabled={inviting}
            className="inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold text-white transition disabled:opacity-60"
            style={{ backgroundColor: ADMIN_OCEAN }}
            onMouseEnter={(e) => {
              if (!inviting) e.currentTarget.style.backgroundColor = ADMIN_OCEAN_HOVER;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = ADMIN_OCEAN;
            }}
          >
            <i className="ri-user-add-line" />
            {inviting ? "Inviting…" : sendInvite ? "Send invite" : "Create user"}
          </button>
        </form>
      </section>

      <section className="rounded-xl border bg-white shadow-sm" style={{ borderColor: "#e8e4dc" }}>
        <div
          className="flex items-center justify-between border-b px-6 py-4"
          style={{ borderColor: "#e8e4dc" }}
        >
          <h2 className="text-lg font-semibold" style={{ color: ADMIN_TEXT }}>
            Admin users
          </h2>
          <button
            type="button"
            onClick={() => void loadUsers()}
            disabled={loading}
            className="text-sm font-medium transition hover:opacity-80"
            style={{ color: ADMIN_ACCENT }}
          >
            <i className="ri-refresh-line mr-1" />
            Refresh
          </button>
        </div>

        {error && (
          <p className="px-6 py-4 text-sm text-red-700">{error}</p>
        )}

        {loading ? (
          <p className="px-6 py-8 text-sm" style={{ color: ADMIN_TEXT_MUTED }}>
            Loading users…
          </p>
        ) : users.length === 0 ? (
          <p className="px-6 py-8 text-sm" style={{ color: ADMIN_TEXT_MUTED }}>
            No admin users yet.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[480px] text-left text-sm">
              <thead>
                <tr
                  className="border-b text-xs font-semibold uppercase tracking-wide"
                  style={{ borderColor: "#e8e4dc", color: ADMIN_TEXT_MUTED }}
                >
                  <th className="px-6 py-3">Email</th>
                  <th className="px-6 py-3">Role</th>
                  <th className="px-6 py-3">Added</th>
                  <th className="px-6 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((row) => {
                  const isSelf = row.email.toLowerCase() === currentEmail;
                  return (
                    <tr key={row.id} className="border-b last:border-0" style={{ borderColor: "#f0ebe3" }}>
                      <td className="px-6 py-3.5 font-medium" style={{ color: ADMIN_TEXT }}>
                        {row.email}
                        {isSelf && (
                          <span
                            className="ml-2 rounded px-1.5 py-0.5 text-[10px] font-bold uppercase"
                            style={{ backgroundColor: ADMIN_ACCENT_SOFT, color: ADMIN_ACCENT }}
                          >
                            You
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-3.5 capitalize" style={{ color: ADMIN_TEXT_MUTED }}>
                        {row.role}
                      </td>
                      <td className="px-6 py-3.5" style={{ color: ADMIN_TEXT_MUTED }}>
                        {formatDate(row.created_at)}
                      </td>
                      <td className="px-6 py-3.5 text-right">
                        <button
                          type="button"
                          disabled={isSelf || deletingId === row.id}
                          onClick={() => void handleDelete(row)}
                          className="inline-flex items-center gap-1 rounded px-2 py-1 text-sm font-medium text-red-700 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-40"
                        >
                          <i className="ri-delete-bin-line" />
                          {deletingId === row.id ? "Removing…" : "Remove"}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
