import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const BRAND_NAME = process.env.CONTACT_BRAND_NAME ?? 'Rize OC';
function siteOriginLabel(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL;
  if (!raw) return 'rizeoc.com';
  try {
    return new URL(raw).hostname;
  } catch {
    return 'rizeoc.com';
  }
}

const SITE_ORIGIN_LABEL = siteOriginLabel();

const TO = process.env.CONTACT_TO_EMAIL ?? 'hello@rizeoc.com';
const SUBJECT = `New Contact Form Submission — ${BRAND_NAME}`;
const FROM = process.env.CONTACT_FROM_EMAIL ?? `${BRAND_NAME} <no-reply@rizeoc.com>`;

function row(label: string, value: string | undefined) {
  if (!value) return '';
  return `<tr>
    <td style="padding:8px 12px;font-weight:600;color:#1F2937;background:#E2E8F0;width:160px;vertical-align:top;">${label}</td>
    <td style="padding:8px 12px;color:#3A4A3C;">${value}</td>
  </tr>`;
}

function buildHtml(fields: Record<string, string | undefined>) {
  const rows = [
    row('Name', fields.name),
    row('Email', fields.email),
    row('Phone', fields.phone),
    row('Program / Service', fields.service ?? fields.program),
    row('Insurance', fields.insurance ?? fields.insurance_provider),
    row('Member ID', fields.member_id),
    row('Message', fields.message),
  ].filter(Boolean).join('\n');

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><title>${SUBJECT}</title></head>
<body style="font-family:'DM Sans',system-ui,sans-serif;background:#F8FAFC;margin:0;padding:32px;">
  <div style="max-width:600px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 2px 12px rgba(44,59,46,0.08);">
    <div style="background:#1F2937;padding:28px 32px;">
      <h1 style="margin:0;color:#F8FAFC;font-size:20px;font-weight:600;">Rize OC</h1>
      <p style="margin:6px 0 0;color:#DDA15E;font-size:13px;text-transform:uppercase;letter-spacing:0.1em;">New Contact Form Submission</p>
    </div>
    <div style="padding:24px 32px;">
      <table style="width:100%;border-collapse:collapse;font-size:14px;">
        ${rows}
      </table>
    </div>
    <div style="padding:16px 32px;background:#E2E8F0;font-size:12px;color:#6B7D67;border-top:1px solid #e0dbd0;">
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
    fields.name       && `Name:     ${fields.name}`,
    fields.email      && `Email:    ${fields.email}`,
    fields.phone      && `Phone:    ${fields.phone}`,
    (fields.service ?? fields.program) && `Service:  ${fields.service ?? fields.program}`,
    (fields.insurance ?? fields.insurance_provider) && `Insurance: ${fields.insurance ?? fields.insurance_provider}`,
    fields.member_id  && `Member ID: ${fields.member_id}`,
    fields.message    && `\nMessage:\n${fields.message}`,
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
    fields = Object.fromEntries(
      [...formData.entries()].map(([k, v]) => [k, String(v)])
    );
  } else {
    fields = await req.json().catch(() => ({}));
  }

  if (!fields.email && !fields.phone && !fields.name) {
    return NextResponse.json({ error: 'At least one contact field is required.' }, { status: 400 });
  }

  const replyTo = fields.email
    ? (fields.name ? `${fields.name} <${fields.email}>` : fields.email)
    : undefined;

  const { error } = await resend.emails.send({
    from: FROM,
    to: [TO],
    ...(replyTo ? { replyTo } : {}),
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
