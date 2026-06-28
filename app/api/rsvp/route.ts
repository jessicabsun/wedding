import { NextRequest, NextResponse } from "next/server";
import { submitRsvp } from "@/lib/sheets";

function buildRsvpSummary(responses: Record<string, string>) {
  const extraKeys = Object.keys(responses).filter(
    (k) => k.startsWith("friday-") || k.startsWith("dinner-") || k.startsWith("dancing-")
  );

  const lines = [
    `Guest: ${responses.guestName}`,
    responses.partnerName ? `Partner: ${responses.partnerName}` : "",
    "",
    `Friday: ${responses.fridayGuest1 || "—"}${responses.fridayGuest2 ? ` / ${responses.fridayGuest2}` : ""}`,
    `Dinner: ${responses.dinnerGuest1 || "—"}${responses.dinnerGuest2 ? ` / ${responses.dinnerGuest2}` : ""}`,
    `Dancing: ${responses.dancingGuest1 || "—"}${responses.dancingGuest2 ? ` / ${responses.dancingGuest2}` : ""}`,
  ];

  if (extraKeys.length) {
    lines.push("", "Additional guests:");
    for (const k of extraKeys) {
      lines.push(`  ${k}: ${responses[k]}`);
    }
  }

  if (responses.dietaryNotes) lines.push("", `Dietary: ${responses.dietaryNotes}`);

  return lines.filter((l) => l !== undefined).join("\n");
}

async function sendNotification(responses: Record<string, string>, duplicate: boolean) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.NOTIFICATION_EMAIL;
  if (!apiKey || !to) return;

  const subject = `${duplicate ? "[UPDATED] " : ""}RSVP: ${responses.guestName}${responses.partnerName ? ` & ${responses.partnerName}` : ""}`;

  const summary = buildRsvpSummary(responses);
  const meta = [
    responses.email ? `Email: ${responses.email}` : "",
    responses.phone ? `Phone: ${responses.phone}` : "",
    duplicate ? "⚠ This is an updated RSVP (guest submitted before)" : "",
  ].filter(Boolean).join("\n");

  const text = [summary, meta].filter(Boolean).join("\n\n");

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "Wedding RSVP <onboarding@resend.dev>",
      to,
      subject,
      text,
    }),
  });
  const resBody = await res.json();
  if (!res.ok) {
    console.error("Resend error:", JSON.stringify(resBody));
  } else {
    console.log("Resend sent:", resBody.id);
  }
}

async function sendConfirmation(responses: Record<string, string>, duplicate: boolean) {
  const apiKey = process.env.RESEND_API_KEY;
  const guestEmail = responses.email;
  if (!apiKey || !guestEmail) return;

  const guestName = responses.guestName?.split(" ")[0] || "there";
  const summary = buildRsvpSummary(responses);

  const text = duplicate
    ? `Hi ${guestName},\n\nYour updated RSVP has been received! Here's what we have:\n\n${summary}\n\nIf anything looks off, just RSVP again on the website to update.\n\nCan't wait to celebrate!\nJess & Jake`
    : `Hi ${guestName},\n\nThanks for RSVPing! Here's what we have:\n\n${summary}\n\nIf you need to make changes, just RSVP again on the website and it'll update automatically.\n\nCan't wait to celebrate!\nJess & Jake`;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "Jess & Jake <onboarding@resend.dev>",
      to: guestEmail,
      subject: duplicate ? "Your updated RSVP" : "We got your RSVP!",
      text,
    }),
  });
  const resBody = await res.json();
  if (!res.ok) {
    console.error("Confirmation email error:", JSON.stringify(resBody));
  } else {
    console.log("Confirmation sent:", resBody.id);
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
    await Promise.all([
      sendNotification(responses, duplicate).catch((e) => console.error("Notification failed:", e)),
      sendConfirmation(responses, duplicate).catch((e) => console.error("Confirmation failed:", e)),
    ]);
    return NextResponse.json({ success: true, duplicate });
  } catch (e) {
    console.error("RSVP submission failed:", e);
    return NextResponse.json({ error: "Failed to save RSVP" }, { status: 500 });
  }
}
