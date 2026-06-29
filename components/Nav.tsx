"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { COOKIE_NAME } from "@/lib/permissions";
import styles from "./Nav.module.css";

export default function Nav() {
  const [home, setHome] = useState<string | null>(null);

  useEffect(() => {
    const cookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith(`${COOKIE_NAME}=`));
    const value = cookie?.split("=")[1] ?? "";

    if (value === "disco") setHome("/weekend");
    else if (value === "chinatown") setHome("/wedding");
  }, []);

  if (!home) return null;

  return (
    <nav className={styles.nav}>
      <Link href={home} className={styles.link}>
        {home === "/weekend" ? "Weekend" : "Wedding"}
      </Link>
      <Link href="#travel" className={styles.link}>
        Travel
      </Link>
      <Link href="/guestbook" className={styles.link}>
        Guest Book
      </Link>
      <Link href="/photos" className={styles.link}>
        Photos
      </Link>
    </nav>
  );
}
