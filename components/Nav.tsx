"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { COOKIE_NAME } from "@/lib/permissions";
import styles from "./Nav.module.css";

export default function Nav() {
  const [home, setHome] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const cookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith(`${COOKIE_NAME}=`));
    const value = cookie?.split("=")[1] ?? "";

    if (value === "disco") setHome("/weekend");
    else if (value === "chinatown") setHome("/wedding");
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  if (!home) return null;

  const linkClass = (href: string) =>
    pathname === href ? `${styles.link} ${styles.active}` : styles.link;

  const handleAnchorClick = (id: string) => (e: React.MouseEvent) => {
    setMenuOpen(false);
    if (pathname !== home) return;
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView();
    window.history.pushState(null, "", `${home}#${id}`);
  };

  return (
    <nav className={styles.nav}>
      <button
        className={styles.menuToggle}
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((v) => !v)}
      >
        {menuOpen ? "✕" : "☰"}
      </button>

      <div className={`${styles.links} ${menuOpen ? styles.linksOpen : ""}`}>
        <div className={styles.menuOrnament} aria-hidden="true">囍</div>
        <Link href={home} className={linkClass(home)} onClick={() => setMenuOpen(false)}>
          {home === "/weekend" ? "Weekend" : "Wedding"}
        </Link>
        <Link href="/travel" className={linkClass("/travel")} onClick={() => setMenuOpen(false)}>
          Travel
        </Link>
        <Link href={`${home}#registry`} className={styles.link} onClick={handleAnchorClick("registry")}>
          Registry
        </Link>
        <Link href="/guestbook" className={linkClass("/guestbook")} onClick={() => setMenuOpen(false)}>
          Guest Book
        </Link>
        <Link href="/photos" className={linkClass("/photos")} onClick={() => setMenuOpen(false)}>
          Photos
        </Link>
      </div>

      <Link href={`${home}#rsvp`} className={`${styles.link} ${styles.cta}`} onClick={handleAnchorClick("rsvp")}>
        RSVP
      </Link>
    </nav>
  );
}
