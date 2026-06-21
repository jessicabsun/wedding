import { google } from "googleapis";
import { Readable } from "stream";

function getAuth() {
  return new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    },
    scopes: ["https://www.googleapis.com/auth/drive.file"],
  });
}

function getDrive() {
  return google.drive({ version: "v3", auth: getAuth() });
}

const FOLDER_ID = process.env.GOOGLE_DRIVE_FOLDER_ID!;

export async function uploadPhoto(
  fileName: string,
  mimeType: string,
  buffer: Buffer,
  uploaderName: string
) {
  const drive = getDrive();

  const res = await drive.files.create({
    requestBody: {
      name: `${uploaderName} - ${fileName}`,
      parents: [FOLDER_ID],
    },
    media: {
      mimeType,
      body: Readable.from(buffer),
    },
    fields: "id,webViewLink",
  });

  return { id: res.data.id, link: res.data.webViewLink };
}

export async function listPhotos() {
  const drive = getDrive();

  const res = await drive.files.list({
    q: `'${FOLDER_ID}' in parents and trashed = false and mimeType contains 'image/'`,
    fields: "files(id,name,thumbnailLink,webViewLink)",
    orderBy: "createdTime desc",
    pageSize: 100,
  });

  return (res.data.files || []).map((f) => ({
    id: f.id!,
    name: f.name!,
    thumbnail: f.thumbnailLink || "",
    link: f.webViewLink || "",
  }));
}
