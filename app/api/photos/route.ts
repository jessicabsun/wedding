import { NextRequest, NextResponse } from "next/server";
import { uploadPhoto, listPhotos } from "@/lib/drive";

export async function GET() {
  const photos = await listPhotos();
  return NextResponse.json({ photos });
}

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get("file") as File | null;
  const name = formData.get("name") as string | null;

  if (!file || !name) {
    return NextResponse.json(
      { error: "File and name are required" },
      { status: 400 }
    );
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const result = await uploadPhoto(file.name, file.type, buffer, name);

  return NextResponse.json({ success: true, ...result });
}
