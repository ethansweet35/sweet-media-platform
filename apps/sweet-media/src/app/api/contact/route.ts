import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const BRAND_NAME = process.env.CONTACT_BRAND_NAME ?? 'Sweet Media';
const TO = process.env.CONTACT_TO_EMAIL ?? 'ethan@sweetmediaservices.com';
const FROM = process.env.CONTACT_FROM_EMAIL ?? 'Sweet Media <no-reply@sweetmediaservices.com>';
const SUBJECT = `New Contact Form Submission — ${BRAND_NAME}`;

function siteOriginLabel(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL;
  if (!raw) return 'sweetmediaservices.com';
  try { return new URL(raw).hostname; } catch { return 'sweetmediaservices.com'; }
}
const SITE_ORIGIN_LABEL = siteOriginLabel();

function row(label: string, value: string | undefined) {
  if (!value) return '';
  return `<tr>
    <td style="padding:8px 12px;font-weight:600;color:#1F2937;background:#E2E8F0;width:160px;vertical-align:top;">${label}</td>
    <td style="padding:8px 12px;color:#374151;">${value}</td>
  </tr>`;
}

function buildHtml(fields: Record<string, string | undefined>) {
  const rows = [
    row('Name', fields.name),
    row('Email', fields.email),
    row('Phone', fields.phone),
    row('Service / Budget', fields.service ?? fields.program ?? fields.budget),
    row('Message', fields.message),
  ].filter(Boolean).join('\n');

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><title>${SUBJECT}</title></head>
<body style="font-family:'DM Sans',system-ui,sans-serif;background:#F8FAFC;margin:0;padding:32px;">
  <div style="max-width:600px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,0.08);">
    <div style="background:#1F2937;padding:28px 32px;">
      <h1 style="margin:0;color:#F8FAFC;font-size:20px;font-weight:600;">${BRAND_NAME}</h1>
      <p style="margin:6px 0 0;color:#60A5FA;font-size:13px;text-transform:uppercase;letter-spacing:0.1em;">New Contact Form Submission</p>
    </div>
    <div style="padding:24px 32px;">
      <table style="width:100%;border-collapse:collapse;font-size:14px;">${rows}</table>
    </div>
    <div style="padding:16px 32px;background:#E2E8F0;font-size:12px;color:#6B7280;border-top:1px solid #D1D5DB;">
      Submitted via ${SITE_ORIGIN_LABEL}
    </div>
  </div>
</body>
</html>`;
}

function buildText(fields: Record<string, string | undefined>) {
  return [
    `New Contact Form Submission — ${BRAND_NAME}`,
    ``,
    fields.name    && `Name:    ${fields.name}`,
    fields.email   && `Email:   ${fields.email}`,
    fields.phone   && `Phone:   ${fields.phone}`,
    (fields.service ?? fields.program ?? fields.budget) && `Service: ${fields.service ?? fields.program ?? fields.budget}`,
    fields.message && `\nMessage:\n${fields.message}`,
  ].filter(Boolean).join('\n');
}

export async function POST(req: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  let fields: Record<string, string | undefined>;

  const contentType = req.headers.get('content-type') ?? '';
  if (contentType.includes('application/json')) {
    fields = await req.json();
  } else if (
    contentType.includes('application/x-www-form-urlencoded') ||
    contentType.includes('multipart/form-data')
  ) {
    const formData = await req.formData();
    fields = Object.fromEntries([...formData.entries()].map(([k, v]) => [k, String(v)]));
  } else {
    fields = await req.json().catch(() => ({}));
  }

  if (!fields.email) {
    return NextResponse.json({ error: 'Email is required.' }, { status: 400 });
  }

  const replyTo = fields.name ? `${fields.name} <${fields.email}>` : fields.email;

  const { error } = await resend.emails.send({
    from: FROM,
    to: [TO],
    replyTo,
    subject: SUBJECT,
    html: buildHtml(fields),
    text: buildText(fields),
  });

  if (error) {
    console.error('[/api/contact] Resend error:', error);
    return NextResponse.json({ error: 'Failed to send message.' }, { status: 500 });
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}
