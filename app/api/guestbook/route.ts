import { NextRequest, NextResponse } from "next/server";
import { getGuestbookEntries, submitGuestbookEntry } from "@/lib/sheets";

export async function GET() {
  const entries = await getGuestbookEntries();
  return NextResponse.json({ entries });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, travelingFrom, howTheyKnow, message } = body;

  if (!name || !message) {
    return NextResponse.json(
      { error: "Name and message are required" },
      { status: 400 }
    );
  }

  await submitGuestbookEntry({ name, travelingFrom, howTheyKnow, message });
  return NextResponse.json({ success: true });
}
