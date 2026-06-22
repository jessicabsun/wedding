"use client";

import { useEffect, useState } from "react";
import styles from "./ScrollArrow.module.css";

export default function ScrollArrow() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const rsvp = document.querySelector("section[class*='rsvpWrap']");
    if (!rsvp) return;

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0.1 }
    );
    observer.observe(rsvp);
    return () => observer.disconnect();
  }, []);

  return (
    <div className={`${styles.arrow} ${visible ? "" : styles.hidden}`}>
      <svg width="14" height="24" viewBox="0 0 14 24" fill="none">
        <path d="M7 2L7 22M7 22L2 17M7 22L12 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}
