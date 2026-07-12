import { google } from "googleapis";

let auth: InstanceType<typeof google.auth.GoogleAuth> | null = null;

function getAuth() {
  if (!auth) {
    auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      },
      scopes: [
        "https://www.googleapis.com/auth/spreadsheets",
        "https://www.googleapis.com/auth/drive.file",
      ],
    });
  }
  return auth;
}

let sheets: ReturnType<typeof google.sheets> | null = null;

function getSheets() {
  if (!sheets) {
    sheets = google.sheets({ version: "v4", auth: getAuth() });
  }
  return sheets;
}

const SPREADSHEET_ID = process.env.GOOGLE_SPREADSHEET_ID!;

export interface GuestRecord {
  row: number;
  name: string;
  partner: string;
  events: string[];
  extraGuests: string[];
}

export async function lookupGuest(query: string, lastNameQuery?: string): Promise<GuestRecord | null> {
  const results = await lookupGuests(query, lastNameQuery);
  return results.length > 0 ? results[0] : null;
}

export async function lookupGuests(query: string, lastNameQuery?: string): Promise<GuestRecord[]> {
  const sheets = getSheets();
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: SPREADSHEET_ID,
    range: "Guests!A2:E",
  });

  const rows = res.data.values;
  if (!rows) return [];

  const q = query.trim().toLowerCase();
  const lq = (lastNameQuery || "").trim().toLowerCase();
  const fullQuery = lq ? `${q} ${lq}` : q;

  const matches: GuestRecord[] = [];

  for (let i = 0; i < rows.length; i++) {
    const name = (rows[i][0] || "").trim();
    const partner = (rows[i][1] || "").trim();
    const friday = (rows[i][2] || "").trim().toLowerCase();
    const nicknames = (rows[i][3] || "").split(",").map((n: string) => n.trim().toLowerCase());
    const extraGuests = (rows[i][4] || "").split(",").map((n: string) => n.trim()).filter(Boolean);
    // Columns F (Invite sent?) and G (Category) are internal tracking only
    // and are intentionally not read here.
    const events: string[] = [];
    if (friday === "x") events.push("friday");

    const nameLower = name.toLowerCase();
    const firstName = nameLower.split(" ")[0];
    const partnerLower = partner.toLowerCase();
    const partnerFirst = partnerLower.split(" ")[0];

    const nameMatch =
      nameLower === fullQuery ||
      nameLower === q ||
      firstName === q ||
      nicknames.includes(q) ||
      nicknames.includes(fullQuery);

    const partnerMatch =
      partner &&
      partner !== "+1" &&
      (partnerLower === fullQuery ||
        partnerLower === q ||
        partnerFirst === q ||
        nicknames.includes(q));

    if (nameMatch || partnerMatch) {
      matches.push({ row: i + 2, name, partner, events, extraGuests });
    }
  }

  return matches;
}

export async function submitRsvp(
  guestRow: number,
  responses: Record<string, string>
): Promise<{ duplicate: boolean }> {
  const sheets = getSheets();

  const existing = await sheets.spreadsheets.values.get({
    spreadsheetId: SPREADSHEET_ID,
    range: "RSVPs!A:B",
  });
  const rows = existing.data.values || [];
  const guestName = responses.guestName || "";
  const duplicateRowIndex = rows.findIndex((r) => r[1] === guestName);
  const duplicate = duplicateRowIndex !== -1;

  const timestamp = new Date().toISOString();
  const extraKeys = Object.keys(responses).filter(
    (k) => k.startsWith("friday-") || k.startsWith("dinner-") || k.startsWith("dancing-")
  );
  const extraValues = extraKeys.map((k) => `${k}: ${responses[k]}`);
  const values = [
    timestamp,
    guestName,
    responses.partnerName || "",
    responses.fridayGuest1 || "",
    responses.fridayGuest2 || "",
    responses.dinnerGuest1 || "",
    responses.dinnerGuest2 || "",
    responses.dancingGuest1 || "",
    responses.dancingGuest2 || "",
    responses.dietaryNotes || "",
    responses.mailingAddress || "",
    responses.email || "",
    responses.phone || "",
    extraValues.join("; "),
    duplicate ? "UPDATED" : "",
  ];

  let lastError: unknown;
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      await sheets.spreadsheets.values.append({
        spreadsheetId: SPREADSHEET_ID,
        range: "RSVPs!A:A",
        valueInputOption: "RAW",
        insertDataOption: "INSERT_ROWS",
        requestBody: { values: [values] },
      });
      return { duplicate };
    } catch (e) {
      lastError = e;
      if (attempt < 2) await new Promise((r) => setTimeout(r, 1000 * (attempt + 1)));
    }
  }
  throw lastError;
}

export interface GuestbookEntry {
  row: number;
  name: string;
  travelingFrom: string;
  howTheyKnow: string;
  message: string;
  timestamp: string;
}

export async function getGuestbookEntries(): Promise<GuestbookEntry[]> {
  const sheets = getSheets();
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: SPREADSHEET_ID,
    range: "Guestbook!A2:E",
  });

  const rows = res.data.values;
  if (!rows) return [];

  return rows.map((row, i) => ({
    row: i + 1,
    timestamp: row[0] || "",
    name: row[1] || "",
    travelingFrom: row[2] || "",
    howTheyKnow: row[3] || "",
    message: row[4] || "",
  })).reverse();
}

export async function deleteGuestbookEntry(rowIndex: number) {
  const sheets = getSheets();

  const spreadsheet = await sheets.spreadsheets.get({
    spreadsheetId: SPREADSHEET_ID,
  });

  const guestbookSheet = spreadsheet.data.sheets?.find(
    (s) => s.properties?.title === "Guestbook"
  );
  const sheetId = guestbookSheet?.properties?.sheetId ?? 0;

  await sheets.spreadsheets.batchUpdate({
    spreadsheetId: SPREADSHEET_ID,
    requestBody: {
      requests: [
        {
          deleteDimension: {
            range: {
              sheetId,
              dimension: "ROWS",
              startIndex: rowIndex,
              endIndex: rowIndex + 1,
            },
          },
        },
      ],
    },
  });
}

export async function updateGuestbookEntry(
  rowIndex: number,
  entry: { name: string; travelingFrom: string; howTheyKnow: string; message: string }
) {
  const sheets = getSheets();
  await sheets.spreadsheets.values.update({
    spreadsheetId: SPREADSHEET_ID,
    range: `Guestbook!B${rowIndex + 1}:E${rowIndex + 1}`,
    valueInputOption: "RAW",
    requestBody: {
      values: [[entry.name, entry.travelingFrom, entry.howTheyKnow, entry.message]],
    },
  });
}

export async function submitGuestbookEntry(entry: {
  name: string;
  travelingFrom: string;
  howTheyKnow: string;
  message: string;
}) {
  const sheets = getSheets();

  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: SPREADSHEET_ID,
    range: "Guestbook!A:A",
  });
  const nextRow = (res.data.values?.length || 0) + 1;

  const values = [
    new Date().toISOString(),
    entry.name,
    entry.travelingFrom,
    entry.howTheyKnow,
    entry.message,
  ];

  await sheets.spreadsheets.values.update({
    spreadsheetId: SPREADSHEET_ID,
    range: `Guestbook!A${nextRow}`,
    valueInputOption: "RAW",
    requestBody: { values: [values] },
  });
}
