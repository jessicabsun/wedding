import { NextResponse } from "next/server";

export async function GET() {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.NOTIFICATION_EMAIL;

  if (!apiKey) return NextResponse.json({ error: "RESEND_API_KEY not set" });
  if (!to) return NextResponse.json({ error: "NOTIFICATION_EMAIL not set" });

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "Wedding RSVP <onboarding@resend.dev>",
      to,
      subject: "Test email from wedding site",
      text: "If you see this, email notifications are working!",
    }),
  });
  const body = await res.json();
  return NextResponse.json({ status: res.status, body });
}
