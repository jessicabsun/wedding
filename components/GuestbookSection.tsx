"use client";

import { useState, useEffect } from "react";
import styles from "./GuestbookSection.module.css";

interface Entry {
  name: string;
  travelingFrom: string;
  howTheyKnow: string;
  message: string;
}

export default function GuestbookSection() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [name, setName] = useState("");
  const [travelingFrom, setTravelingFrom] = useState("");
  const [howTheyKnow, setHowTheyKnow] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    fetch("/api/guestbook")
      .then((r) => r.json())
      .then((data) => setEntries(data.entries || []))
      .catch(() => {});
  }, []);

  async function handleSubmit() {
    if (!name.trim() || !message.trim()) return;
    setLoading(true);
    try {
      await fetch("/api/guestbook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          travelingFrom: travelingFrom.trim(),
          howTheyKnow: howTheyKnow.trim(),
          message: message.trim(),
        }),
      });
      setEntries((prev) => [
        { name: name.trim(), travelingFrom: travelingFrom.trim(), howTheyKnow: howTheyKnow.trim(), message: message.trim() },
        ...prev,
      ]);
      setSubmitted(true);
      setName("");
      setTravelingFrom("");
      setHowTheyKnow("");
      setMessage("");
    } catch {
      // silent
    }
    setLoading(false);
  }

  return (
    <section id="guestbook" className={styles.guestbook}>
      <h2 className={styles.heading}>Guest Book</h2>
      <p className={styles.subtitle}>
        Say hello and let everyone know who you are &mdash; your entry will be posted&nbsp;below.
      </p>

      {!submitted ? (
        <div className={styles.formWrap}>
          <input
            className={styles.input}
            type="text"
            placeholder="Your name(s)"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className={styles.input}
            type="text"
            placeholder="Where will you be traveling from?"
            value={travelingFrom}
            onChange={(e) => setTravelingFrom(e.target.value)}
          />
          <input
            className={styles.input}
            type="text"
            placeholder="How do you know the happy couple?"
            value={howTheyKnow}
            onChange={(e) => setHowTheyKnow(e.target.value)}
          />
          <textarea
            className={styles.textarea}
            placeholder="Leave a message for the group — marriage advice welcome!"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={4}
          />
          <button
            className={styles.button}
            onClick={handleSubmit}
            disabled={loading || !name.trim() || !message.trim()}
          >
            {loading ? "Signing..." : "Sign the Guest Book"}
          </button>
        </div>
      ) : (
        <p className={styles.thanks}>Thank you for signing!</p>
      )}

      {entries.length > 0 && (
        <div className={styles.entries}>
          {entries.map((entry, i) => (
            <div key={i} className={styles.entry}>
              <p className={styles.entryMessage}>&ldquo;{entry.message}&rdquo;</p>
              <p className={styles.entryMeta}>
                <span className={styles.entryName}>{entry.name}</span>
                {entry.travelingFrom && (
                  <span className={styles.entryDetail}> &middot; from {entry.travelingFrom}</span>
                )}
                {entry.howTheyKnow && (
                  <span className={styles.entryDetail}> &middot; {entry.howTheyKnow}</span>
                )}
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
