"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { isValidPassword, getAccessiblePages, COOKIE_NAME } from "@/lib/permissions";
import styles from "./PasswordSection.module.css";

export default function PasswordSection() {
  const router = useRouter();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const input = e.currentTarget.elements.namedItem("event-code") as HTMLInputElement;
    const value = (input?.value ?? "").trim().toLowerCase();
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
      <form className={styles.field} onSubmit={handleSubmit}>
        <input
          className={styles.input}
          type="text"
          name="event-code"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={false}
          placeholder="enter password"
          aria-label="Event password"
        />
      </form>
    </section>
  );
}
