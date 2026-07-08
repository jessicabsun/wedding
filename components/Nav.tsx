"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { COOKIE_NAME } from "@/lib/permissions";
import styles from "./Nav.module.css";

export default function Nav() {
  const [home, setHome] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const cookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith(`${COOKIE_NAME}=`));
    const value = cookie?.split("=")[1] ?? "";

    if (value === "disco") setHome("/weekend");
    else if (value === "chinatown") setHome("/wedding");
  }, []);

  if (!home) return null;

  const linkClass = (href: string) =>
    pathname === href ? `${styles.link} ${styles.active}` : styles.link;

  return (
    <nav className={styles.nav}>
      <Link href={home} className={linkClass(home)}>
        {home === "/weekend" ? "Weekend" : "Wedding"}
      </Link>
      <Link href="/travel" className={linkClass("/travel")}>
        Travel
      </Link>
      <Link href="/registry" className={linkClass("/registry")}>
        Registry
      </Link>
      <Link href="/guestbook" className={linkClass("/guestbook")}>
        Guest Book
      </Link>
      <Link href="/photos" className={linkClass("/photos")}>
        Photos
      </Link>
    </nav>
  );
}
