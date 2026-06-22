import { NextRequest, NextResponse } from "next/server";
import { submitRsvp } from "@/lib/sheets";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { guestRow, responses } = body;

  if (!guestRow || !responses) {
    return NextResponse.json({ error: "Missing data" }, { status: 400 });
  }

  try {
    const { duplicate } = await submitRsvp(guestRow, responses);
    return NextResponse.json({ success: true, duplicate });
  } catch (e) {
    console.error("RSVP submission failed:", e);
    return NextResponse.json({ error: "Failed to save RSVP" }, { status: 500 });
  }
}
