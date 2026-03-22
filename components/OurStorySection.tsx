import Image from "next/image";
import styles from "./OurStorySection.module.css";

export default function OurStorySection() {
  return (
    <section className={styles.ourStorySection}>
      <div className={styles.storyPhotoWrap}>
        <Image
          src="/story2.png"
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
          and began dating by the end of the program. Soon after, Jess followed Jake
          to New York for the adventure of her lifetime. 6 years plus countless parties
          hosted, miles driven, and pizzas tried later, Jake proposed one late summer morning
          on a bench in Herbert Von King, their Bed-Stuy neighborhood park.
        </p>
      </div>
    </section>
  );
}
