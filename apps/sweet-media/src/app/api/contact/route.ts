import { Resend } from "resend";

type ContactPayload = {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
};

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(request: Request) {
  try {
    const resendApiKey = process.env.RESEND_API_KEY;
    if (!resendApiKey) {
      console.error("Missing RESEND_API_KEY");
      return Response.json({ success: false }, { status: 500 });
    }

    const resend = new Resend(resendApiKey);
    const formData = (await request.json()) as Record<string, string>;
    let service = "";
    if ("service" in formData && formData.service) service = String(formData.service);
    else if ("program" in formData && formData.program) service = String(formData.program);
    else if ("budget" in formData && formData.budget) service = String(formData.budget);

    const payload: ContactPayload = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      service: service.trim(),
      message: formData.message.trim(),
    };

    const html = `
      <div style="font-family: Arial, sans-serif; color: #111827; line-height: 1.6;">
        <h2 style="margin: 0 0 16px;">New Contact Form Submission</h2>
        <table style="border-collapse: collapse; width: 100%; max-width: 640px;">
          <tbody>
            <tr>
              <td style="padding: 8px 0; font-weight: 700; width: 140px;">Name</td>
              <td style="padding: 8px 0;">${escapeHtml(payload.name)}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: 700;">Email</td>
              <td style="padding: 8px 0;">${escapeHtml(payload.email)}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: 700;">Phone</td>
              <td style="padding: 8px 0;">${escapeHtml(payload.phone)}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: 700;">Service</td>
              <td style="padding: 8px 0;">${escapeHtml(payload.service)}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: 700; vertical-align: top;">Message</td>
              <td style="padding: 8px 0; white-space: pre-wrap;">${escapeHtml(payload.message)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    `;

    await resend.emails.send({
      from: "Sweet Media <onboarding@resend.dev>",
      to: "ethan@sweetmediaservices.com",
      subject: "New Contact Form Submission - Sweet Media",
      html,
    });

    return Response.json({ success: true }, { status: 200 });
  } catch {
    return Response.json({ success: false }, { status: 500 });
  }
}
// cache bust Thu Apr 30 12:54:17 PDT 2026
// cache bust Thu Apr 30 13:03:11 PDT 2026
