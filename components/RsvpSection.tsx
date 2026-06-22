"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./RsvpSection.module.css";

interface GuestInfo {
  row: number;
  name: string;
  partner: string;
  events: string[];
}

type RsvpChoice = "yes" | "no" | "";

export default function RsvpSection() {
  const [step, setStep] = useState<"lookup" | "rsvp" | "done">("lookup");
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [guest, setGuest] = useState<GuestInfo | null>(null);

  const [fridayG1, setFridayG1] = useState<RsvpChoice>("");
  const [fridayG2, setFridayG2] = useState<RsvpChoice>("");
  const [dinnerG1, setDinnerG1] = useState<RsvpChoice>("");
  const [dinnerG2, setDinnerG2] = useState<RsvpChoice>("");
  const [dancingG1, setDancingG1] = useState<RsvpChoice>("");
  const [dancingG2, setDancingG2] = useState<RsvpChoice>("");
  const [guestName, setGuestName] = useState("");
  const [dietaryNotes, setDietaryNotes] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  async function handleLookup() {
    if (!query.trim()) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/guest-lookup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: query.trim() }),
      });
      const data = await res.json();
      if (data.found) {
        setGuest(data);
        setStep("rsvp");
      } else {
        setError("We couldn’t find that name. Please try your full name.");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    }
    setLoading(false);
  }

  async function handleSubmit() {
    if (!guest) return;
    setLoading(true);
    try {
      await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          guestRow: guest.row,
          responses: {
            guestName: guest.name,
            partnerName: isPlusOne ? guestName : (guest.partner || ""),
            fridayGuest1: fridayG1,
            fridayGuest2: fridayG2,
            dinnerGuest1: dinnerG1,
            dinnerGuest2: dinnerG2,
            dancingGuest1: dancingG1,
            dancingGuest2: dancingG2,
            dietaryNotes,
            email,
            phone,
          },
        }),
      });
      setStep("done");
    } catch {
      setError("Something went wrong. Please try again.");
    }
    setLoading(false);
  }

  const allChoices = [fridayG1, fridayG2, dinnerG1, dinnerG2, dancingG1, dancingG2].filter(c => c !== "");
  const allDeclined = allChoices.length > 0 && allChoices.every(c => c === "no");
  const hasFriday = guest?.events.includes("friday");
  const hasPartner = !!guest?.partner;
  const isPlusOne = guest?.partner === "+1";
  const partnerDisplay = isPlusOne ? (guestName || "Guest") : (guest?.partner || "");

  return (
    <section className={styles.rsvpWrap} data-scroll-hide>
      <div className={styles.photoSide}>
        <Image
          src="/rsvp-photo.jpeg"
          alt="Jess and Jake by the East River"
          fill
          sizes="(max-width: 700px) 100vw, 50vw"
          className={styles.photo}
        />
      </div>
      <div className={styles.rsvp}>
      <h2 className={styles.heading}>RSVP</h2>
      <p className={styles.deadline}>We&rsquo;re saving you a seat. RSVP by September 1st &mdash; or earlier if you can.</p>

      {step === "lookup" && (
        <div className={styles.lookupWrap}>
          <p className={styles.prompt}>Enter your name to find your invitation.</p>
          <input
            className={styles.input}
            type="text"
            placeholder="Your name"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleLookup()}
          />
          <button
            className={styles.button}
            onClick={handleLookup}
            disabled={loading}
          >
            {loading ? "..." : "Find"}
          </button>
          {error && <p className={styles.error}>{error}</p>}
        </div>
      )}

      {step === "rsvp" && guest && (
        <div className={styles.formWrap}>
          <p className={styles.greeting}>
            Welcome, {guest.name}
            {hasPartner ? ` & ${partnerDisplay}` : ""}!
          </p>

          {isPlusOne && (
            <div className={styles.guestNameWrap}>
              <label className={styles.dietaryLabel}>Guest name</label>
              <input
                className={styles.input}
                type="text"
                placeholder="Enter your guest's name"
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
              />
            </div>
          )}

          {hasFriday && (
            <div className={styles.eventBlock}>
              <h3 className={styles.eventLabel}>Friday Welcome</h3>
              <RsvpRow
                label={guest.name}
                value={fridayG1}
                onChange={setFridayG1}
              />
              {hasPartner && (
                <RsvpRow
                  label={partnerDisplay}
                  value={fridayG2}
                  onChange={setFridayG2}
                />
              )}
            </div>
          )}

          <div className={styles.eventBlock}>
            <h3 className={styles.eventLabel}>Dinner</h3>
            <RsvpRow
              label={guest.name}
              value={dinnerG1}
              onChange={setDinnerG1}
            />
            {hasPartner && (
              <RsvpRow
                label={guest.partner}
                value={dinnerG2}
                onChange={setDinnerG2}
              />
            )}
          </div>

          <div className={styles.eventBlock}>
            <h3 className={styles.eventLabel}>Dancing</h3>
            <RsvpRow
              label={guest.name}
              value={dancingG1}
              onChange={setDancingG1}
            />
            {hasPartner && (
              <RsvpRow
                label={guest.partner}
                value={dancingG2}
                onChange={setDancingG2}
              />
            )}
          </div>

          <div className={styles.eventBlock}>
            <label className={styles.dietaryLabel}>
              Dietary restrictions or notes
            </label>
            <textarea
              className={styles.textarea}
              value={dietaryNotes}
              onChange={(e) => setDietaryNotes(e.target.value)}
              rows={3}
            />
          </div>

          <div className={styles.eventBlock}>
            <label className={styles.dietaryLabel}>
              Sign up for updates (optional)
            </label>
            <input
              className={styles.input}
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className={styles.input}
              type="tel"
              placeholder="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <button
            className={styles.button}
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit RSVP"}
          </button>
          {error && <p className={styles.error}>{error}</p>}
        </div>
      )}

      {step === "done" && (
        <div className={styles.doneWrap}>
          {allDeclined ? (
            <p className={styles.doneText}>
              We&rsquo;ll miss you! Thanks for letting us know.
            </p>
          ) : (
            <p className={styles.doneText}>
              Thank you! We can&rsquo;t wait to celebrate with you.
            </p>
          )}
          <a href="/guestbook" className={styles.guestbookLink}>
            Sign the guest book &rarr;
          </a>
          <a href="/photos" className={styles.guestbookLink}>
            Share photos &rarr;
          </a>
        </div>
      )}
    </div>
    </section>
  );
}

function RsvpRow({
  label,
  value,
  onChange,
}: {
  label: string;
  value: RsvpChoice;
  onChange: (v: RsvpChoice) => void;
}) {
  return (
    <div className={styles.rsvpRow}>
      <span className={styles.rsvpName}>{label}</span>
      <div className={styles.rsvpButtons}>
        <button
          className={`${styles.choiceBtn} ${value === "yes" ? styles.choiceActive : ""}`}
          onClick={() => onChange("yes")}
        >
          Accept
        </button>
        <button
          className={`${styles.choiceBtn} ${value === "no" ? styles.choiceActive : ""}`}
          onClick={() => onChange("no")}
        >
          Decline
        </button>
      </div>
    </div>
  );
}
