import { NextRequest, NextResponse } from "next/server";
import { submitRsvp } from "@/lib/sheets";

async function sendNotification(responses: Record<string, string>, duplicate: boolean) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.NOTIFICATION_EMAIL;
  if (!apiKey || !to) return;

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
  const extraText = extraKeys.length
    ? "\n\nExtra guests:\n" + extraKeys.map((k) => `${k}: ${responses[k]}`).join("\n")
    : "";

  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "Wedding RSVP <onboarding@resend.dev>",
      to,
      subject,
      text: lines + extraText,
    }),
  });
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
