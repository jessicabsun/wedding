import { NextRequest, NextResponse } from "next/server";
import { submitRsvp } from "@/lib/sheets";

async function sendNotification(responses: Record<string, string>, duplicate: boolean) {
  const to = process.env.NOTIFICATION_EMAIL;
  if (!to) return;

  const subject = `${duplicate ? "[UPDATED] " : ""}RSVP: ${responses.guestName}${responses.partnerName ? ` & ${responses.partnerName}` : ""}`;

  const lines = [
    `Guest: ${responses.guestName}`,
    responses.partnerName ? `Partner: ${responses.partnerName}` : "",
    "",
    `Friday: ${responses.fridayGuest1 || "—"}${responses.fridayGuest2 ? ` / ${responses.fridayGuest2}` : ""}`,
    `Dinner: ${responses.dinnerGuest1 || "—"}${responses.dinnerGuest2 ? ` / ${responses.dinnerGuest2}` : ""}`,
    `Dancing: ${responses.dancingGuest1 || "—"}${responses.dancingGuest2 ? ` / ${responses.dancingGuest2}` : ""}`,
    "",
    responses.dietaryNotes ? `Dietary: ${responses.dietaryNotes}` : "",
    responses.email ? `Email: ${responses.email}` : "",
    responses.phone ? `Phone: ${responses.phone}` : "",
    "",
    duplicate ? "⚠ This is an updated RSVP (guest submitted before)" : "",
  ].filter(Boolean).join("\n");

  const extraKeys = Object.keys(responses).filter(
    (k) => k.startsWith("friday-") || k.startsWith("dinner-") || k.startsWith("dancing-")
  );
  const extraLines = extraKeys.length
    ? "\n\nExtra guests:\n" + extraKeys.map((k) => `${k}: ${responses[k]}`).join("\n")
    : "";

  try {
    const { google } = await import("googleapis");
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      },
      scopes: ["https://www.googleapis.com/auth/gmail.send"],
      clientOptions: { subject: to },
    });
    const gmail = google.gmail({ version: "v1", auth });
    const raw = Buffer.from(
      `To: ${to}\r\nSubject: ${subject}\r\nContent-Type: text/plain; charset=utf-8\r\n\r\n${lines}${extraLines}`
    ).toString("base64url");
    await gmail.users.messages.send({ userId: "me", requestBody: { raw } });
  } catch {
    // Email is best-effort — don't fail the RSVP
  }
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { guestRow, responses } = body;

  if (!guestRow || !responses) {
    return NextResponse.json({ error: "Missing data" }, { status: 400 });
  }

  try {
    const { duplicate } = await submitRsvp(guestRow, responses);
    sendNotification(responses, duplicate).catch(() => {});
    return NextResponse.json({ success: true, duplicate });
  } catch (e) {
    console.error("RSVP submission failed:", e);
    return NextResponse.json({ error: "Failed to save RSVP" }, { status: 500 });
  }
}
