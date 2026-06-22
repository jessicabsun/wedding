"use client";

import { useEffect, useState } from "react";
import styles from "./ScrollArrow.module.css";

export default function ScrollArrow() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const target = document.querySelector("[data-scroll-hide]");
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0.1 }
    );

    // Delay observing so the initial viewport position doesn't immediately hide it
    const timer = setTimeout(() => observer.observe(target), 500);
    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  return (
    <div className={styles.arrow} style={{ visibility: visible ? "visible" : "hidden", opacity: visible ? undefined : 0 }}>
      <svg width="14" height="24" viewBox="0 0 14 24" fill="none">
        <path d="M7 2L7 22M7 22L2 17M7 22L12 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}
