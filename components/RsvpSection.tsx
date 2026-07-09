"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./RsvpSection.module.css";

interface GuestInfo {
  row: number;
  name: string;
  partner: string;
  events: string[];
  extraGuests?: string[];
}

type RsvpChoice = "yes" | "no" | "";

export default function RsvpSection({ includeFriday: pageIncludesFriday }: { includeFriday?: boolean }) {
  const [step, setStep] = useState<"lookup" | "pick" | "rsvp" | "done">("lookup");
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [guest, setGuest] = useState<GuestInfo | null>(null);
  const [matches, setMatches] = useState<GuestInfo[]>([]);

  const [fridayG1, setFridayG1] = useState<RsvpChoice>("");
  const [fridayG2, setFridayG2] = useState<RsvpChoice>("");
  const [dinnerG1, setDinnerG1] = useState<RsvpChoice>("");
  const [dinnerG2, setDinnerG2] = useState<RsvpChoice>("");
  const [dancingG1, setDancingG1] = useState<RsvpChoice>("");
  const [dancingG2, setDancingG2] = useState<RsvpChoice>("");
  const [guestName, setGuestName] = useState("");
  const [extraChoices, setExtraChoices] = useState<Record<string, RsvpChoice>>({});
  const [dietaryNotes, setDietaryNotes] = useState("");
  const [mailingAddress, setMailingAddress] = useState("");
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
        if (data.matches.length === 1) {
          setGuest(data.matches[0]);
          setStep("rsvp");
        } else {
          setMatches(data.matches);
          setStep("pick");
        }
      } else {
        setError("We couldn’t find that name. Try your full name as it appears on the invitation, or reach out to Jess & Jake directly.");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    }
    setLoading(false);
  }

  function resetForm() {
    setStep("lookup");
    setQuery("");
    setError("");
    setGuest(null);
    setMatches([]);
    setFridayG1("");
    setFridayG2("");
    setDinnerG1("");
    setDinnerG2("");
    setDancingG1("");
    setDancingG2("");
    setGuestName("");
    setExtraChoices({});
    setDietaryNotes("");
    setMailingAddress("");
    setEmail("");
    setPhone("");
  }

  function validate(): string | null {
    if (isPlusOne && !guestName.trim()) {
      return "Please enter your guest's name.";
    }
    const required: RsvpChoice[] = [dinnerG1, dancingG1];
    if (hasPartner) required.push(dinnerG2, dancingG2);
    if (hasFriday) {
      required.push(fridayG1);
      if (hasPartner) required.push(fridayG2);
    }
    for (const ex of extras) {
      required.push(extraChoices[`dinner-${ex}`] || "");
      required.push(extraChoices[`dancing-${ex}`] || "");
      if (hasFriday) required.push(extraChoices[`friday-${ex}`] || "");
    }
    if (required.some((v) => v === "")) {
      return "Please accept or decline each event for every guest.";
    }
    return null;
  }

  async function handleSubmit() {
    if (!guest) return;
    setError("");
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/rsvp", {
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
            mailingAddress,
            email,
            phone,
            ...Object.fromEntries(
              extras.flatMap((ex) => [
                [`friday-${ex}`, extraChoices[`friday-${ex}`] || ""],
                [`dinner-${ex}`, extraChoices[`dinner-${ex}`] || ""],
                [`dancing-${ex}`, extraChoices[`dancing-${ex}`] || ""],
              ])
            ),
          },
        }),
      });
      if (!res.ok) throw new Error("Server error");
      setStep("done");
    } catch {
      setError("Something went wrong. Please try again.");
    }
    setLoading(false);
  }

  function setExtra(key: string, val: RsvpChoice) {
    setExtraChoices((prev) => ({ ...prev, [key]: val }));
  }

  const extras = guest?.extraGuests || [];

  function formatNames(names: string[]) {
    if (names.length <= 1) return names[0] || "";
    const parsed = names.map((n) => {
      const parts = n.trim().split(" ");
      return { first: parts.slice(0, -1).join(" "), last: parts[parts.length - 1] };
    });
    const allSameLast = parsed.every((p) => p.last === parsed[0].last);
    if (allSameLast && parsed[0].last) {
      const firsts = parsed.map((p) => p.first);
      const lastTwo = firsts.splice(-2);
      const joined = [...firsts, lastTwo.join(" & ")].join(", ");
      return `${joined} ${parsed[0].last}`;
    }
    const lastTwo = names.splice(-2);
    return [...names, lastTwo.join(" & ")].join(", ");
  }
  const allChoices = [fridayG1, fridayG2, dinnerG1, dinnerG2, dancingG1, dancingG2, ...Object.values(extraChoices)].filter(c => c !== "");
  const allDeclined = allChoices.length > 0 && allChoices.every(c => c === "no");
  const hasFriday = pageIncludesFriday && guest?.events.includes("friday");
  const hasPartner = !!guest?.partner;
  const isPlusOne = guest?.partner === "+1" || guest?.partner?.toLowerCase() === "guest";
  const partnerDisplay = isPlusOne ? (guestName || "Guest") : (guest?.partner || "");

  return (
    <section className={styles.rsvpWrap} data-scroll-hide>
      <div className={styles.photoSide}>
        <svg width="0" height="0" style={{ position: "absolute" }}>
          <defs>
            <filter id="grain-rsvp" x="0%" y="0%" width="100%" height="100%">
              <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="4" stitchTiles="stitch" />
              <feColorMatrix type="saturate" values="0" />
              <feBlend in="SourceGraphic" mode="multiply" />
            </filter>
          </defs>
        </svg>
        <Image
          src="/rsvp-photo.jpeg"
          alt="Jess and Jake by the East River"
          fill
          sizes="(max-width: 700px) 100vw, 50vw"
          className={styles.photo}
        />
      </div>
      <div id="rsvp" className={styles.rsvp}>
      <h2 className={styles.heading}>RSVP</h2>
      <p className={styles.deadline}>We&rsquo;re saving you a seat. RSVP by September 1st or earlier if you can.</p>

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

      {step === "pick" && (
        <div className={styles.lookupWrap}>
          <p className={styles.prompt}>We found a few people with that name. Which one is you?</p>
          {matches.map((m, i) => (
            <button
              key={i}
              className={styles.button}
              onClick={() => { setGuest(m); setStep("rsvp"); }}
            >
              {formatNames([m.name, ...(m.partner && m.partner !== "+1" && m.partner.toLowerCase() !== "guest" ? [m.partner] : []), ...(m.extraGuests || [])])}
            </button>
          ))}
          <button className={styles.backBtn} onClick={resetForm}>
            &larr; Start over
          </button>
        </div>
      )}

      {step === "rsvp" && guest && (
        <div className={styles.formWrap}>
          <p className={styles.greeting}>
            Welcome, {formatNames([guest.name, ...(hasPartner ? [partnerDisplay] : []), ...extras])}!
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
              {extras.map((ex) => (
                <RsvpRow
                  key={`friday-${ex}`}
                  label={ex}
                  value={extraChoices[`friday-${ex}`] || ""}
                  onChange={(v) => setExtra(`friday-${ex}`, v)}
                />
              ))}
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
                label={partnerDisplay}
                value={dinnerG2}
                onChange={setDinnerG2}
              />
            )}
            {extras.map((ex) => (
              <RsvpRow
                key={`dinner-${ex}`}
                label={ex}
                value={extraChoices[`dinner-${ex}`] || ""}
                onChange={(v) => setExtra(`dinner-${ex}`, v)}
              />
            ))}
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
                label={partnerDisplay}
                value={dancingG2}
                onChange={setDancingG2}
              />
            )}
            {extras.map((ex) => (
              <RsvpRow
                key={`dancing-${ex}`}
                label={ex}
                value={extraChoices[`dancing-${ex}`] || ""}
                onChange={(v) => setExtra(`dancing-${ex}`, v)}
              />
            ))}
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
              Mailing address (for future thank you notes &amp; holiday cards)
            </label>
            <textarea
              className={styles.textarea}
              value={mailingAddress}
              onChange={(e) => setMailingAddress(e.target.value)}
              rows={3}
              placeholder="Street, City, State, ZIP"
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
          <button className={styles.backBtn} onClick={resetForm}>
            &larr; Start over
          </button>
        </div>
      )}

      {step === "done" && guest && (
        <div className={styles.doneWrap}>
          {allDeclined ? (
            <p className={styles.doneText}>
              We&rsquo;ll miss you! Thanks for letting us know.
            </p>
          ) : (
            <p className={styles.doneText}>
              Thanks! We can&rsquo;t wait to celebrate with you.
            </p>
          )}
          <div className={styles.confirmation}>
            <p className={styles.confirmLabel}>Your RSVP:</p>
            {hasFriday && (
              <p className={styles.confirmLine}>
                Friday: {guest.name} {fridayG1}
                {hasPartner ? `, ${partnerDisplay} ${fridayG2}` : ""}
                {extras.map((ex) => `, ${ex} ${extraChoices[`friday-${ex}`] || ""}`)}
              </p>
            )}
            <p className={styles.confirmLine}>
              Dinner: {guest.name} {dinnerG1}
              {hasPartner ? `, ${partnerDisplay} ${dinnerG2}` : ""}
              {extras.map((ex) => `, ${ex} ${extraChoices[`dinner-${ex}`] || ""}`)}
            </p>
            <p className={styles.confirmLine}>
              Dancing: {guest.name} {dancingG1}
              {hasPartner ? `, ${partnerDisplay} ${dancingG2}` : ""}
              {extras.map((ex) => `, ${ex} ${extraChoices[`dancing-${ex}`] || ""}`)}
            </p>
            {dietaryNotes && <p className={styles.confirmLine}>Dietary: {dietaryNotes}</p>}
          </div>
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
