import Image from "next/image";
import styles from "./OurStorySection.module.css";

export default function OurStorySection() {
  return (
    <section className={styles.ourStorySection}>
      <div className={styles.storyPhotoWrap}>
        <Image
          src="/story.png"
          alt="Jess and Jake"
          width={1200}
          height={1800}
          className={styles.storyPhoto}
          sizes="50vw"
        />
        <div className={styles.storySign}>
          <span className={`${styles.ssLine} ${styles.ssRule}`} />
          <span className={styles.ssLine}>Our</span>
          <span className={styles.ssLine}>Story</span>
          <span className={`${styles.ssLine} ${styles.ssRule}`} />
        </div>
      </div>

      <div className={styles.storyRight}>
        <p className={styles.storyText}>
          Jake and Jess met under the blue skies of Berkeley in 2015 as MBA students
          who would begin dating by the end of the program. A year later, Jess followed
          Jake to New York for the adventure of her lifetime. 6 years later, after
          countless parties hosted, miles driven, and pizzas tried, Jake proposed one
          summer morning on a bench in Herbert Von King, their Bed-Stuy neighborhood park.
        </p>
      </div>
    </section>
  );
}
