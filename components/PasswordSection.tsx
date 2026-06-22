"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { isValidPassword, getAccessiblePages, COOKIE_NAME } from "@/lib/permissions";
import styles from "./PasswordSection.module.css";

export default function PasswordSection() {
  const router = useRouter();

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key !== "Enter") return;
    const value = (e.currentTarget.value ?? "").trim().toLowerCase();
    if (!isValidPassword(value)) return;

    document.cookie = `${COOKIE_NAME}=${value}; path=/; max-age=${60 * 60 * 24 * 30}`;
    const pages = getAccessiblePages(value);
    router.push(`/${pages[0]}`);
  }

  return (
    <section className={styles.section} data-scroll-hide>
      <Image
        src="/brass_bar.jpg"
        alt=""
        fill
        sizes="100vw"
        className={styles.bgImage}
      />
      <div className={styles.overlay} />
      <div className={styles.field}>
        <input
          className={styles.input}
          type="password"
          placeholder="enter password"
          aria-label="Event password"
          onKeyDown={handleKeyDown}
        />
      </div>
    </section>
  );
}
