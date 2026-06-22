import { NextRequest, NextResponse } from "next/server";
import { getGuestbookEntries, submitGuestbookEntry, deleteGuestbookEntry, updateGuestbookEntry } from "@/lib/sheets";

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

export async function PUT(req: NextRequest) {
  const adminKey = req.headers.get("x-admin-key");
  if (adminKey !== process.env.ADMIN_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { row, name, travelingFrom, howTheyKnow, message } = await req.json();
  if (typeof row !== "number") {
    return NextResponse.json({ error: "Row number required" }, { status: 400 });
  }

  await updateGuestbookEntry(row, { name, travelingFrom, howTheyKnow, message });
  return NextResponse.json({ success: true });
}

export async function DELETE(req: NextRequest) {
  const adminKey = req.headers.get("x-admin-key");
  if (adminKey !== process.env.ADMIN_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { row } = await req.json();
  if (typeof row !== "number") {
    return NextResponse.json({ error: "Row number required" }, { status: 400 });
  }

  await deleteGuestbookEntry(row);
  return NextResponse.json({ success: true });
}
