import { NextRequest, NextResponse } from "next/server";
import { unstable_cache, revalidateTag } from "next/cache";
import { getGuestbookEntries, submitGuestbookEntry, deleteGuestbookEntry, updateGuestbookEntry } from "@/lib/sheets";

const getCachedGuestbookEntries = unstable_cache(
  getGuestbookEntries,
  ["guestbook-entries"],
  { revalidate: 20, tags: ["guestbook"] }
);

export async function GET() {
  const entries = await getCachedGuestbookEntries();
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
  revalidateTag("guestbook", { expire: 0 });
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
  revalidateTag("guestbook", { expire: 0 });
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
  revalidateTag("guestbook", { expire: 0 });
  return NextResponse.json({ success: true });
}
