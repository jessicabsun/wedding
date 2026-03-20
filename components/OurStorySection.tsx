import Image from "next/image";
import styles from "./OurStorySection.module.css";

export default function OurStorySection() {
  return (
    <section className={styles.ourStorySection}>
      <div className={styles.storySign}>
        <span className={`${styles.ssLine} ${styles.ssRule}`} />
        <span className={styles.ssLine}>Our Story</span>
        <span className={`${styles.ssLine} ${styles.ssRule}`} />
      </div>

      <div className={styles.storyContent}>
        <div className={styles.storyPhotoWrap}>
          <Image
            src="/story.png"
            alt="Jess and Jake"
            width={380}
            height={500}
            className={styles.storyPhoto}
          />
        </div>
        <p className={styles.storyText}>
          {/* Replace with your story */}
          We met on a Tuesday that neither of us can quite agree on. What followed
          was years of coffee, arguments about films, and eventually, the realization
          that we couldn&rsquo;t imagine it any other way.
        </p>
      </div>
    </section>
  );
}
