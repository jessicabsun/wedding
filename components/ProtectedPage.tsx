"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { COOKIE_NAME, isValidPassword } from "@/lib/permissions";
import Nav from "./Nav";
import styles from "./ProtectedPage.module.css";

export default function ProtectedPage({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const cookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith(`${COOKIE_NAME}=`));
    const value = cookie?.split("=")[1] ?? "";

    if (isValidPassword(value)) {
      setAuthorized(true);
    } else {
      router.replace("/");
    }
  }, [router]);

  useEffect(() => {
    if (!authorized || !window.location.hash) return;
    // Double rAF: wait until after the browser's own hash-scroll attempt
    // (which fires too early, before children have mounted) has settled,
    // so ours runs last and reliably wins.
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        // A hash can end up with multiple "#" segments jammed together
        // (e.g. "#registry#rsvp"); fall back through each segment,
        // most recent first, so it still lands somewhere real.
        const raw = window.location.hash.slice(1);
        const segments = raw.split("#").filter(Boolean).reverse();
        for (const id of [raw, ...segments]) {
          const el = document.getElementById(id);
          if (el) {
            el.scrollIntoView();
            break;
          }
        }
      });
    });
  }, [authorized]);

  if (!authorized) {
    return (
      <div className={styles.loading}>
        <span className={styles.loadingText}>—</span>
      </div>
    );
  }

  return (
    <>
      <Nav />
      {children}
    </>
  );
}
