import Image from "next/image";
import styles from "./OurStorySection.module.css";

export default function OurStorySection() {
  return (
    <section className={styles.ourStorySection}>
      <div className={styles.photoSide}>
        <Image
          src="/ourstory-bg3.jpeg"
          alt="Jess and Jake"
          fill
          sizes="(max-width: 700px) 100vw, 50vw"
          className={styles.photo}
        />
      </div>
      <div className={styles.textSide}>
        <h2 className={styles.heading}>Our Story</h2>
        <p className={styles.storyText}>
          Jake and Jess met under the blue skies of Berkeley in 2015 as MBA students
          and began dating by the end of the program. Soon after, Jess followed Jake
          to New York for the adventure of a lifetime.
        </p>
        <p className={styles.storyText}>
          Six years, countless parties
          hosted, miles driven, and pizzas tried later, Jake proposed one late summer morning
          on a bench in Herbert Von King, their Bed-Stuy neighborhood park. Now, they
          can&rsquo;t wait to make things official and gather everyone they love in one room.
        </p>
      </div>
    </section>
  );
}
