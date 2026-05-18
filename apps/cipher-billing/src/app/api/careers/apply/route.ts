import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

const MAX_BYTES = 10 * 1024 * 1024; // 10 MB
const ALLOWED_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];
const ALLOWED_EXTS = [".pdf", ".doc", ".docx"];
const BUCKET = "resumes";
const SIGNED_URL_TTL = 60 * 60 * 24 * 7; // 7 days in seconds

const BRAND_NAME = process.env.CONTACT_BRAND_NAME ?? "Cipher Billing";
const TO = process.env.CONTACT_TO_EMAIL ?? "hello@example.com";
const FROM = process.env.CONTACT_FROM_EMAIL ?? `${BRAND_NAME} <no-reply@example.com>`;

function buildHtml(fields: Record<string, string>, resumeUrl: string, fileName: string) {
  function row(label: string, value: string | undefined) {
    if (!value) return "";
    return `<tr>
      <td style="padding:8px 12px;font-weight:600;color:#1F2937;background:#E2E8F0;width:160px;vertical-align:top;">${label}</td>
      <td style="padding:8px 12px;color:#3A4A3C;">${value}</td>
    </tr>`;
  }

  const rows = [
    row("Name", fields.name),
    row("Email", fields.email),
    row("Phone", fields.phone),
    row("Position", fields.position),
    row("LinkedIn", fields.linkedin),
    row("Cover Note", fields.coverNote),
  ]
    .filter(Boolean)
    .join("\n");

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><title>New Career Application — ${BRAND_NAME}</title></head>
<body style="font-family:'DM Sans',system-ui,sans-serif;background:#F8FAFC;margin:0;padding:32px;">
  <div style="max-width:620px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,0.08);">
    <div style="background:#101E3F;padding:28px 32px;">
      <h1 style="margin:0;color:#F8FAFC;font-size:20px;font-weight:600;">${BRAND_NAME}</h1>
      <p style="margin:6px 0 0;color:#5eb5e0;font-size:13px;text-transform:uppercase;letter-spacing:0.1em;">New Career Application</p>
    </div>
    <div style="padding:24px 32px;">
      <table style="width:100%;border-collapse:collapse;font-size:14px;">
        ${rows}
      </table>
      <div style="margin-top:24px;padding:16px;background:#EFF6FF;border:1px solid #BFDBFE;border-radius:8px;">
        <p style="margin:0 0 8px;font-size:13px;font-weight:600;color:#1E40AF;">Resume / CV</p>
        <p style="margin:0 0 10px;font-size:12px;color:#374151;">${fileName}</p>
        <a href="${resumeUrl}" style="display:inline-block;background:#166C96;color:#fff;padding:9px 18px;border-radius:6px;font-size:12px;font-weight:600;text-decoration:none;letter-spacing:0.05em;text-transform:uppercase;">Download Resume</a>
        <p style="margin:10px 0 0;font-size:11px;color:#6B7280;">This link expires in 7 days.</p>
      </div>
    </div>
    <div style="padding:14px 32px;background:#E2E8F0;font-size:12px;color:#6B7280;">
      Submitted via cipherbilling.com
    </div>
  </div>
</body>
</html>`;
}

function buildText(fields: Record<string, string>, resumeUrl: string, fileName: string) {
  return [
    `New Career Application — ${BRAND_NAME}`,
    ``,
    fields.name && `Name:     ${fields.name}`,
    fields.email && `Email:    ${fields.email}`,
    fields.phone && `Phone:    ${fields.phone}`,
    fields.position && `Position: ${fields.position}`,
    fields.linkedin && `LinkedIn: ${fields.linkedin}`,
    fields.coverNote && `\nCover Note:\n${fields.coverNote}`,
    ``,
    `Resume: ${fileName}`,
    `Download (expires 7 days): ${resumeUrl}`,
  ]
    .filter(Boolean)
    .join("\n");
}

export async function POST(req: NextRequest) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    console.error("[/api/careers/apply] Missing Supabase env vars");
    return NextResponse.json({ error: "Server configuration error." }, { status: 500 });
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey);
  const resend = new Resend(process.env.RESEND_API_KEY);

  // Parse multipart form data
  let formData: FormData;
  try {
    formData = await req.formData();
  } catch {
    return NextResponse.json({ error: "Invalid form data." }, { status: 400 });
  }

  const fields: Record<string, string> = {};
  let resumeFile: File | null = null;

  for (const [key, value] of formData.entries()) {
    if (key === "resume" && value instanceof File) {
      resumeFile = value;
    } else if (typeof value === "string") {
      fields[key] = value.trim();
    }
  }

  // Validation
  if (!fields.name) return NextResponse.json({ error: "Name is required." }, { status: 400 });
  if (!fields.email) return NextResponse.json({ error: "Email is required." }, { status: 400 });
  if (!resumeFile || resumeFile.size === 0)
    return NextResponse.json({ error: "Resume file is required." }, { status: 400 });

  if (resumeFile.size > MAX_BYTES)
    return NextResponse.json({ error: "Resume must be under 10 MB." }, { status: 400 });

  const ext = resumeFile.name.substring(resumeFile.name.lastIndexOf(".")).toLowerCase();
  if (!ALLOWED_EXTS.includes(ext) || !ALLOWED_TYPES.includes(resumeFile.type)) {
    return NextResponse.json(
      { error: "Only PDF, DOC, or DOCX files are accepted." },
      { status: 400 }
    );
  }

  // Ensure the resumes bucket exists (private)
  const { error: bucketErr } = await supabase.storage.createBucket(BUCKET, { public: false });
  // Ignore "already exists" errors
  if (bucketErr && !bucketErr.message.includes("already exists")) {
    console.error("[/api/careers/apply] Bucket creation error:", bucketErr);
    return NextResponse.json({ error: "Storage error. Please try again." }, { status: 500 });
  }

  // Build a unique file path
  const timestamp = Date.now();
  const safeName = fields.name.replace(/[^a-z0-9]/gi, "-").toLowerCase().slice(0, 40);
  const filePath = `${timestamp}-${safeName}${ext}`;

  const fileBuffer = await resumeFile.arrayBuffer();

  const { error: uploadErr } = await supabase.storage
    .from(BUCKET)
    .upload(filePath, fileBuffer, {
      contentType: resumeFile.type,
      upsert: false,
    });

  if (uploadErr) {
    console.error("[/api/careers/apply] Upload error:", uploadErr);
    return NextResponse.json({ error: "File upload failed. Please try again." }, { status: 500 });
  }

  // Generate 7-day signed URL
  const { data: signedData, error: signedErr } = await supabase.storage
    .from(BUCKET)
    .createSignedUrl(filePath, SIGNED_URL_TTL);

  if (signedErr || !signedData?.signedUrl) {
    console.error("[/api/careers/apply] Signed URL error:", signedErr);
    return NextResponse.json(
      { error: "Could not generate resume link. Please try again." },
      { status: 500 }
    );
  }

  const resumeUrl = signedData.signedUrl;

  // Send email
  const { error: emailErr } = await resend.emails.send({
    from: FROM,
    to: [TO],
    replyTo: fields.name ? `${fields.name} <${fields.email}>` : fields.email,
    subject: `New Career Application — ${fields.name} — ${BRAND_NAME}`,
    html: buildHtml(fields, resumeUrl, resumeFile.name),
    text: buildText(fields, resumeUrl, resumeFile.name),
  });

  if (emailErr) {
    console.error("[/api/careers/apply] Resend error:", emailErr);
    return NextResponse.json({ error: "Failed to send application. Please try again." }, { status: 500 });
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}
