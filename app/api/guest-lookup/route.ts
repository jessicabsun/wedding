import { NextRequest, NextResponse } from "next/server";
import { lookupGuest } from "@/lib/sheets";

export async function POST(req: NextRequest) {
  const { name, lastName } = await req.json();
  if (!name || typeof name !== "string") {
    return NextResponse.json({ error: "Name is required" }, { status: 400 });
  }

  const guest = await lookupGuest(name, lastName);
  if (!guest) {
    return NextResponse.json({ found: false });
  }

  return NextResponse.json({
    found: true,
    row: guest.row,
    name: guest.name,
    partner: guest.partner,
    events: guest.events,
  });
}
