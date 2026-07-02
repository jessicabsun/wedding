"use client";

import Link from "next/link";
import styles from "./PageTourSection.module.css";

export default function PageTourSection() {
  return (
    <section className={styles.tour}>
      <h2 className={styles.heading}>Explore</h2>

      <div className={styles.entries}>
        <div className={styles.entry}>
          <Link href="/travel" className={styles.entryName}>Travel</Link>
          <p className={styles.entryDesc}>Where to stay and what to do in NYC</p>
        </div>
        <div className={styles.entry}>
          <Link href="/guestbook" className={styles.entryName}>Guest Book</Link>
          <p className={styles.entryDesc}>Leave us and your fellow wedding guests a note</p>
        </div>
        <div className={styles.entry}>
          <Link href="/photos" className={styles.entryName}>Photos</Link>
          <p className={styles.entryDesc}>See and share photos of us from over the years</p>
        </div>
      </div>

      <div className={styles.ornament}>囍</div>
    </section>
  );
}
