"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { isValidPassword, getAccessiblePages, COOKIE_NAME } from "@/lib/permissions";
import styles from "./HeroSection.module.css";

export default function HeroSection() {
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
    <section className={styles.hero}>
      <div className={styles.imageWrap}>
        <Image
          src="/hero.png"
          alt="Jess and Jake"
          fill
          priority
          className={styles.heroPhoto}
          sizes="100vw"
        />
        <div className={styles.imageOverlay} />
      </div>
      <div className={styles.title}>
        <span className={`${styles.csLine} ${styles.csRule}`} />
        <span className={`${styles.csLine} ${styles.csName}`}>Jess</span>
        <span className={`${styles.csLine} ${styles.csAmp}`}>&amp;</span>
        <span className={`${styles.csLine} ${styles.csName}`}>Jake</span>
        <span className={`${styles.csLine} ${styles.csRule} ${styles.csRuleMid}`} />
        <span className={`${styles.csLine} ${styles.csSub}`}>10.17.26</span>
        <span className={`${styles.csLine} ${styles.csSub}`}>NYC</span>
        <div className={styles.pwField}>
          <input
            className={styles.pwInput}
            type="password"
            placeholder="enter password"
            aria-label="Event password"
            onKeyDown={handleKeyDown}
          />
        </div>
      </div>
      <p className={styles.copyText}>
        Beloved friends and family, please join us for our wedding celebration &mdash; a night out in New York City, Jake&rsquo;s birthplace and our home since 2018.
      </p>
    </section>
  );
}
