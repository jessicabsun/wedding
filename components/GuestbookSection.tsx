"use client";

import { useState, useEffect, useRef } from "react";
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
  const [entriesLoading, setEntriesLoading] = useState(true);

  useEffect(() => {
    fetch("/api/guestbook")
      .then((r) => r.json())
      .then((data) => setEntries(data.entries || []))
      .catch(() => {})
      .finally(() => setEntriesLoading(false));
  }, []);

  async function handleSubmit() {
    if (!name.trim()) return;
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
            placeholder="Leave a message for the group — marriage advice welcome! (optional)"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={4}
          />
          <button
            className={styles.button}
            onClick={handleSubmit}
            disabled={loading || !name.trim()}
          >
            {loading ? "Signing..." : "Sign the Guest Book"}
          </button>
        </div>
      ) : (
        <p className={styles.thanks}>Thank you for signing!</p>
      )}

      {entriesLoading && <p className={styles.entriesLoading}>Loading entries&hellip;</p>}

      {entries.length > 0 && (
        <div className={styles.entries}>
          {entries.map((entry, i) => (
            <GuestbookCard key={i} entry={entry} index={i} />
          ))}
        </div>
      )}
    </section>
  );
}

function GuestbookCard({ entry, index }: { entry: Entry; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const meta = [
    entry.travelingFrom ? `from ${entry.travelingFrom}` : "",
    entry.howTheyKnow || "",
  ].filter(Boolean).join(" · ");

  return (
    <div
      ref={ref}
      className={`${styles.card} ${visible ? styles.cardVisible : ""}`}
      style={{ transitionDelay: `${index * 0.1}s` }}
    >
      <div className={styles.cardInner}>
        <p className={styles.cardName}>{entry.name}</p>
        {meta && <p className={styles.cardMeta}>{meta}</p>}
        {entry.message && (
          <>
            <hr className={styles.cardRule} />
            <p className={styles.cardMessage}>&ldquo;{entry.message}&rdquo;</p>
          </>
        )}
      </div>
    </div>
  );
}
