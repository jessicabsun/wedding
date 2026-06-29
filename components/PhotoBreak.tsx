import Image from "next/image";
import styles from "./PhotoBreak.module.css";

export default function PhotoBreak() {
  return (
    <>
      <section className={styles.photoBreak}>
        <div className={styles.photoWrap}>
          <Image
            src="/divider_left.png"
            alt="Jess and Jake"
            fill
            sizes="(max-width: 700px) 100vw, 50vw"
            className={`${styles.photo} ${styles.photoLeft}`}
          />
        </div>
        <div className={`${styles.photoWrap} ${styles.photoWrapRight}`}>
          <Image
            src="/divider_right_v2.png"
            alt="Jess and Jake"
            fill
            sizes="(max-width: 700px) 100vw, 50vw"
            className={`${styles.photo} ${styles.photoRight}`}
          />
        </div>
      </section>
    </>
  );
}
