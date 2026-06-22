"use client";

import { useEffect, useState } from "react";
import styles from "./ScrollArrow.module.css";

export default function ScrollArrow() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    function check() {
      const target = document.querySelector("[data-scroll-hide]");
      if (!target) return;
      const rect = target.getBoundingClientRect();
      setVisible(rect.top > window.innerHeight * 0.8);
    }

    check();
    window.addEventListener("scroll", check, { passive: true });
    return () => window.removeEventListener("scroll", check);
  }, []);

  return (
    <div
      className={styles.arrow}
      style={{ animation: visible ? undefined : "none", opacity: visible ? undefined : 0, pointerEvents: visible ? "auto" : "none" }}
    >
      <svg width="14" height="24" viewBox="0 0 14 24" fill="none">
        <path d="M7 2L7 22M7 22L2 17M7 22L12 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}
