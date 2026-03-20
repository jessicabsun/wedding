import Image from "next/image";
import styles from "./OurStorySection.module.css";

export default function OurStorySection() {
  return (
    <section className={styles.ourStorySection}>
      <div className={styles.storySign}>
        <span className={`${styles.ssLine} ${styles.ssRule}`} />
        <span className={styles.ssLine}>Our</span>
        <span className={styles.ssLine}>Story</span>
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
          Jake and Jess met under the beautiful blue skies of Berkeley in 2015, two MBA
          students who began dating by the end of the program. A year later, Jess
          followed Jake to New York for the adventure of her lifetime. Six years later,
          after countless parties hosted, miles driven, and pizzas tried, Jake proposed
          one summer morning in 2024 on a bench in Herbert Von King, their Bed-Stuy
          neighborhood park.
        </p>
      </div>
    </section>
  );
}
