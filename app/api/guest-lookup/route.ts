import { NextRequest, NextResponse } from "next/server";
import { lookupGuests } from "@/lib/sheets";

export async function POST(req: NextRequest) {
  const { name } = await req.json();
  if (!name || typeof name !== "string") {
    return NextResponse.json({ error: "Name is required" }, { status: 400 });
  }

  const guests = await lookupGuests(name);
  if (guests.length === 0) {
    return NextResponse.json({ found: false });
  }

  return NextResponse.json({
    found: true,
    matches: guests.map((g) => ({
      row: g.row,
      name: g.name,
      partner: g.partner,
      events: g.events,
    })),
  });
}
