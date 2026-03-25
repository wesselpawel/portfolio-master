import { NextResponse, NextRequest } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

type ContactBody = {
  name?: string;
  email?: string;
  message?: string;
  website?: string; // honeypot
};

const isValidEmail = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

function missingEnv(vars: string[]) {
  return vars.filter(
    (v) => !process.env[v] || String(process.env[v]).trim() === ""
  );
}

export async function POST(req: NextRequest) {
  let body: ContactBody | null = null;
  try {
    body = (await req.json()) as ContactBody;
  } catch {
    return NextResponse.json(
      { success: false, message: "Invalid JSON body" },
      { status: 400 }
    );
  }

  // Honeypot: pretend success to bots.
  if (body?.website && String(body.website).trim().length > 0) {
    return NextResponse.json({ success: true });
  }

  const name = String(body?.name ?? "").trim();
  const email = String(body?.email ?? "").trim();
  const message = String(body?.message ?? "").trim();

  if (!name || !email || !message) {
    return NextResponse.json(
      { success: false, message: "Missing required fields" },
      { status: 400 }
    );
  }

  if (!isValidEmail(email)) {
    return NextResponse.json(
      { success: false, message: "Invalid email address" },
      { status: 400 }
    );
  }

  const missing = missingEnv([
    "SMTP_HOST",
    "SMTP_PORT",
    "SMTP_USER",
    "SMTP_PASS",
  ]);
  if (missing.length > 0) {
    return NextResponse.json(
      {
        success: false,
        message:
          "Email is not configured on the server. Missing: " +
          missing.join(", "),
      },
      { status: 500 }
    );
  }

  const host = process.env.SMTP_HOST as string;
  const port = Number(process.env.SMTP_PORT);
  const user = process.env.SMTP_USER as string;
  const pass = process.env.SMTP_PASS as string;
  const from = process.env.SMTP_FROM || user;
  const to = process.env.CONTACT_TO || user;
  const secure = port === 465;

  try {
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: { user, pass },
    });

    await transporter.sendMail({
      from,
      to,
      replyTo: email,
      subject: `[Portfolio] Message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      html: `
        <div style="font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial;">
          <h2>New message from portfolio contact form</h2>
          <p><strong>Name:</strong> ${escapeHtml(name)}</p>
          <p><strong>Email:</strong> ${escapeHtml(email)}</p>
          <pre style="white-space: pre-wrap; background: #f6f6f6; padding: 12px; border-radius: 8px;">${escapeHtml(
            message
          )}</pre>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("sendEmail failed:", err);
    return NextResponse.json(
      { success: false, message: "Failed to send email" },
      { status: 500 }
    );
  }
}

function escapeHtml(input: string) {
  return input
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
