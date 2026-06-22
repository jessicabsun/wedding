import { NextRequest } from "next/server";
import { google } from "googleapis";

function getDriveClient() {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    },
    scopes: ["https://www.googleapis.com/auth/drive"],
  });

  return google.drive({ version: "v3", auth });
}

export async function GET() {
  const drive = getDriveClient();
  const folderId = process.env.GOOGLE_DRIVE_FOLDER_ID;

  const res = await drive.files.list({
    q: `'${folderId}' in parents and trashed = false and mimeType contains 'image/'`,
    fields: "files(id, name, createdTime, webContentLink, thumbnailLink)",
    orderBy: "createdTime desc",
    pageSize: 100,
    supportsAllDrives: true,
    includeItemsFromAllDrives: true,
    driveId: folderId,
    corpora: "drive",
  });

  const photos = (res.data.files || []).map((file) => ({
    url: `https://drive.google.com/uc?id=${file.id}&export=view`,
    name: file.name,
    uploadedAt: file.createdTime,
  }));

  return Response.json({ photos });
}

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get("file") as File | null;
  const name = formData.get("name") as string | null;

  if (!file || !name) {
    return Response.json(
      { error: "File and name are required" },
      { status: 400 }
    );
  }

  const drive = getDriveClient();
  const folderId = process.env.GOOGLE_DRIVE_FOLDER_ID;

  const buffer = Buffer.from(await file.arrayBuffer());
  const { Readable } = await import("stream");
  const stream = Readable.from(buffer);

  const uploaded = await drive.files.create({
    requestBody: {
      name: `${name} - ${file.name}`,
      parents: [folderId!],
    },
    media: {
      mimeType: file.type,
      body: stream,
    },
    fields: "id",
    supportsAllDrives: true,
  });

  return Response.json({
    success: true,
    url: `https://drive.google.com/uc?id=${uploaded.data.id}&export=view`,
  });
}
