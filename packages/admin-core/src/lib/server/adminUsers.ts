/**
 * Server handlers for /api/admin/users — list, invite, and remove admin users.
 * Uses service role after requireAdminContext verifies the caller.
 */
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import {
  requireAdminContext,
  type PageContentEditorError,
} from "./pageContentEditor";

export interface AdminUserRow {
  id: string;
  email: string;
  role: string;
  created_at: string;
}

function getServiceRoleClient(): SupabaseClient {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();
  if (!url || !key) {
    throw {
      status: 500,
      message:
        "Supabase server config missing (NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY).",
    } satisfies PageContentEditorError;
  }
  return createClient(url, key, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}

function normalizeEmail(value: unknown): string {
  if (typeof value !== "string" || !value.trim()) {
    throw { status: 400, message: "A valid email is required." } satisfies PageContentEditorError;
  }
  const email = value.trim().toLowerCase();
  if (!email.includes("@")) {
    throw { status: 400, message: "A valid email is required." } satisfies PageContentEditorError;
  }
  return email;
}

async function findAuthUserIdByEmail(
  admin: SupabaseClient,
  email: string,
): Promise<string | null> {
  const target = email.toLowerCase();
  let page = 1;
  const perPage = 200;

  while (page <= 20) {
    const { data, error } = await admin.auth.admin.listUsers({ page, perPage });
    if (error) {
      throw {
        status: 500,
        message: `Failed to look up auth user: ${error.message}`,
      } satisfies PageContentEditorError;
    }
    const match = data.users.find((u) => u.email?.toLowerCase() === target);
    if (match?.id) return match.id;
    if (data.users.length < perPage) break;
    page += 1;
  }
  return null;
}

async function ensureAuthUser(
  admin: SupabaseClient,
  email: string,
  options: { sendInvite: boolean; password?: string },
): Promise<{ authUserId: string | null; note: string }> {
  const existingId = await findAuthUserIdByEmail(admin, email);
  if (existingId) {
    if (options.password) {
      const { error } = await admin.auth.admin.updateUserById(existingId, {
        password: options.password,
        email_confirm: true,
      });
      if (error) {
        throw {
          status: 500,
          message: `Failed to update password: ${error.message}`,
        } satisfies PageContentEditorError;
      }
      return { authUserId: existingId, note: "password updated for existing auth user" };
    }
    return { authUserId: existingId, note: "auth user already existed" };
  }

  if (options.password) {
    const { data, error } = await admin.auth.admin.createUser({
      email,
      password: options.password,
      email_confirm: true,
    });
    if (error || !data.user?.id) {
      throw {
        status: 500,
        message: error?.message ?? "Failed to create auth user.",
      } satisfies PageContentEditorError;
    }
    return { authUserId: data.user.id, note: "auth user created with password" };
  }

  const { data, error } = await admin.auth.admin.inviteUserByEmail(email);
  if (error) {
    throw {
      status: 500,
      message: error.message ?? "Failed to send invitation email.",
    } satisfies PageContentEditorError;
  }
  return {
    authUserId: data.user?.id ?? null,
    note: "invitation email sent",
  };
}

export async function handleAdminUsersGet(request: Request): Promise<{ users: AdminUserRow[] }> {
  await requireAdminContext(request);
  const admin = getServiceRoleClient();
  const { data, error } = await admin
    .from("admin_users")
    .select("id, email, role, created_at")
    .order("created_at", { ascending: true });

  if (error) {
    throw {
      status: 500,
      message: `Failed to load admin users: ${error.message}`,
    } satisfies PageContentEditorError;
  }

  return {
    users: (data ?? []).map((row) => ({
      id: row.id as string,
      email: row.email as string,
      role: (row.role as string) ?? "admin",
      created_at: row.created_at as string,
    })),
  };
}

export async function handleAdminUsersPost(
  request: Request,
): Promise<{ user: AdminUserRow; authNote: string }> {
  await requireAdminContext(request);

  let body: { email?: unknown; sendInvite?: boolean; password?: string };
  try {
    body = await request.json();
  } catch {
    throw { status: 400, message: "Invalid request body." } satisfies PageContentEditorError;
  }

  const email = normalizeEmail(body.email);
  const password =
    typeof body.password === "string" && body.password.trim().length > 0
      ? body.password.trim()
      : undefined;
  const sendInvite = body.sendInvite !== false && !password;

  if (password && password.length < 8) {
    throw {
      status: 400,
      message: "Password must be at least 8 characters.",
    } satisfies PageContentEditorError;
  }

  const admin = getServiceRoleClient();
  const { note: authNote } = await ensureAuthUser(admin, email, {
    sendInvite,
    password,
  });

  const role = "admin";
  const { data: inserted, error: insertError } = await admin
    .from("admin_users")
    .insert({ email, role })
    .select("id, email, role, created_at")
    .single();

  if (insertError) {
    if (
      insertError.code === "23505" ||
      insertError.message.toLowerCase().includes("duplicate")
    ) {
      const { data: existing, error: fetchError } = await admin
        .from("admin_users")
        .select("id, email, role, created_at")
        .ilike("email", email)
        .single();
      if (fetchError || !existing) {
        throw {
          status: 500,
          message: fetchError?.message ?? "Admin user exists but could not be loaded.",
        } satisfies PageContentEditorError;
      }
      return {
        user: {
          id: existing.id as string,
          email: existing.email as string,
          role: (existing.role as string) ?? role,
          created_at: existing.created_at as string,
        },
        authNote,
      };
    }
    throw {
      status: 500,
      message: `Failed to grant admin access: ${insertError.message}`,
    } satisfies PageContentEditorError;
  }

  return {
    user: {
      id: inserted.id as string,
      email: inserted.email as string,
      role: (inserted.role as string) ?? role,
      created_at: inserted.created_at as string,
    },
    authNote,
  };
}

export async function handleAdminUsersDelete(
  request: Request,
): Promise<{ deleted: true; email: string }> {
  const ctx = await requireAdminContext(request);
  const url = new URL(request.url);
  const id = url.searchParams.get("id")?.trim();
  if (!id) {
    throw { status: 400, message: "id query parameter is required." } satisfies PageContentEditorError;
  }

  const admin = getServiceRoleClient();

  const { data: row, error: fetchError } = await admin
    .from("admin_users")
    .select("id, email")
    .eq("id", id)
    .maybeSingle();

  if (fetchError) {
    throw {
      status: 500,
      message: `Failed to load admin user: ${fetchError.message}`,
    } satisfies PageContentEditorError;
  }
  if (!row) {
    throw { status: 404, message: "Admin user not found." } satisfies PageContentEditorError;
  }

  const targetEmail = (row.email as string).toLowerCase();
  if (targetEmail === ctx.email) {
    throw {
      status: 400,
      message: "You cannot remove your own admin access.",
    } satisfies PageContentEditorError;
  }

  const { count, error: countError } = await admin
    .from("admin_users")
    .select("id", { count: "exact", head: true });

  if (countError) {
    throw {
      status: 500,
      message: `Failed to verify admin count: ${countError.message}`,
    } satisfies PageContentEditorError;
  }
  if ((count ?? 0) <= 1) {
    throw {
      status: 400,
      message: "Cannot remove the last admin user for this site.",
    } satisfies PageContentEditorError;
  }

  const { error: deleteError } = await admin.from("admin_users").delete().eq("id", id);
  if (deleteError) {
    throw {
      status: 500,
      message: `Failed to remove admin access: ${deleteError.message}`,
    } satisfies PageContentEditorError;
  }

  const authUserId = await findAuthUserIdByEmail(admin, targetEmail);
  if (authUserId) {
    const { error: authDeleteError } = await admin.auth.admin.deleteUser(authUserId);
    if (authDeleteError) {
      throw {
        status: 500,
        message: `Admin access removed, but auth user deletion failed: ${authDeleteError.message}`,
      } satisfies PageContentEditorError;
    }
  }

  return { deleted: true, email: row.email as string };
}
