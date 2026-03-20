"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { isValidPassword, getAccessiblePages, COOKIE_NAME } from "@/lib/permissions";
import styles from "./CornerSign.module.css";

export default function CornerSign() {
  const router = useRouter();
  const [labelVisible, setLabelVisible] = useState(true);

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key !== "Enter") return;
    const value = (e.currentTarget.value ?? "").trim().toLowerCase();
    if (!isValidPassword(value)) return;

    // Set cookie
    document.cookie = `${COOKIE_NAME}=${value}; path=/; max-age=${60 * 60 * 24 * 30}`;

    // Navigate to the first page they have access to
    const pages = getAccessiblePages(value);
    router.push(`/${pages[0]}`);
  }

  return (
    <div
      className={styles.cornerSign}
      aria-label="Jess and Jake's Wedding, October 17, NYC"
    >
      <span className={`${styles.csLine} ${styles.csRule} ${styles.csRuleTop}`} />
      <span className={`${styles.csLine} ${styles.csName}`}>Jess</span>
      <span className={`${styles.csLine} ${styles.csAmp}`}>&amp;</span>
      <span className={`${styles.csLine} ${styles.csName}`}>Jake</span>
      <span className={`${styles.csLine} ${styles.csRule} ${styles.csRuleMid}`} />
      <span className={`${styles.csLine} ${styles.csSub}`}>10.17.26</span>
      <span className={`${styles.csLine} ${styles.csSub}`}>NYC</span>

      <div className={styles.pwField}>
        {labelVisible && (
          <span className={styles.pwLabel}>enter password</span>
        )}
        <input
          className={styles.pwInput}
          type="password"
          placeholder=" "
          aria-label="Event password"
          onFocus={() => setLabelVisible(false)}
          onBlur={(e) => {
            if (!e.currentTarget.value) setLabelVisible(true);
          }}
          onKeyDown={handleKeyDown}
        />
      </div>
    </div>
  );
}
