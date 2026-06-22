"use client";

import { useState, useEffect } from "react";
import styles from "./admin.module.css";

interface Entry {
  row: number;
  name: string;
  travelingFrom: string;
  howTheyKnow: string;
  message: string;
  timestamp: string;
}

export default function AdminPage() {
  const [key, setKey] = useState("");
  const [authed, setAuthed] = useState(false);
  const [entries, setEntries] = useState<Entry[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingRow, setEditingRow] = useState<number | null>(null);
  const [editForm, setEditForm] = useState({ name: "", travelingFrom: "", howTheyKnow: "", message: "" });

  async function loadEntries() {
    setLoading(true);
    const res = await fetch("/api/guestbook");
    const data = await res.json();
    setEntries(data.entries || []);
    setLoading(false);
  }

  function handleLogin() {
    setAuthed(true);
    loadEntries();
  }

  function startEdit(entry: Entry) {
    setEditingRow(entry.row);
    setEditForm({
      name: entry.name,
      travelingFrom: entry.travelingFrom,
      howTheyKnow: entry.howTheyKnow,
      message: entry.message,
    });
  }

  async function saveEdit(row: number) {
    await fetch("/api/guestbook", {
      method: "PUT",
      headers: { "Content-Type": "application/json", "x-admin-key": key },
      body: JSON.stringify({ row, ...editForm }),
    });
    setEditingRow(null);
    loadEntries();
  }

  async function deleteEntry(row: number) {
    if (!confirm("Delete this entry?")) return;
    await fetch("/api/guestbook", {
      method: "DELETE",
      headers: { "Content-Type": "application/json", "x-admin-key": key },
      body: JSON.stringify({ row }),
    });
    loadEntries();
  }

  if (!authed) {
    return (
      <main className={styles.admin}>
        <h1 className={styles.title}>Admin</h1>
        <div className={styles.loginWrap}>
          <input
            className={styles.input}
            type="password"
            placeholder="Admin key"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
          />
          <button className={styles.btn} onClick={handleLogin}>Enter</button>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.admin}>
      <h1 className={styles.title}>Guestbook Admin</h1>
      {loading && <p className={styles.loading}>Loading...</p>}

      <div className={styles.entries}>
        {entries.map((entry) => (
          <div key={entry.row} className={styles.entry}>
            {editingRow === entry.row ? (
              <div className={styles.editForm}>
                <input
                  className={styles.input}
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  placeholder="Name"
                />
                <input
                  className={styles.input}
                  value={editForm.travelingFrom}
                  onChange={(e) => setEditForm({ ...editForm, travelingFrom: e.target.value })}
                  placeholder="Traveling from"
                />
                <input
                  className={styles.input}
                  value={editForm.howTheyKnow}
                  onChange={(e) => setEditForm({ ...editForm, howTheyKnow: e.target.value })}
                  placeholder="How they know you"
                />
                <textarea
                  className={styles.textarea}
                  value={editForm.message}
                  onChange={(e) => setEditForm({ ...editForm, message: e.target.value })}
                  rows={3}
                />
                <div className={styles.actions}>
                  <button className={styles.btn} onClick={() => saveEdit(entry.row)}>Save</button>
                  <button className={styles.btnSecondary} onClick={() => setEditingRow(null)}>Cancel</button>
                </div>
              </div>
            ) : (
              <>
                <div className={styles.entryHeader}>
                  <strong>{entry.name}</strong>
                  <span className={styles.meta}>
                    {entry.travelingFrom && `from ${entry.travelingFrom}`}
                    {entry.howTheyKnow && ` · ${entry.howTheyKnow}`}
                  </span>
                </div>
                <p className={styles.message}>{entry.message}</p>
                <div className={styles.entryFooter}>
                  <span className={styles.timestamp}>{new Date(entry.timestamp).toLocaleDateString()}</span>
                  <div className={styles.actions}>
                    <button className={styles.btnSmall} onClick={() => startEdit(entry)}>Edit</button>
                    <button className={styles.btnDanger} onClick={() => deleteEntry(entry.row)}>Delete</button>
                  </div>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </main>
  );
}
