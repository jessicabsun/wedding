import Image from "next/image";
import styles from "./PhotoBreak.module.css";

export default function PhotoBreak() {
  return (
    <section className={styles.photoBreak}>
      <div className={styles.photoWrap}>
        <Image
          src="/ourstory-bg2.jpeg"
          alt="Jess and Jake dressed up"
          fill
          sizes="(max-width: 700px) 100vw, 50vw"
          className={styles.photo}
        />
      </div>
      <div className={styles.photoWrap}>
        <Image
          src="/candlelit.png"
          alt="Jess and Jake by candlelight"
          fill
          sizes="(max-width: 700px) 100vw, 50vw"
          className={styles.photo}
        />
      </div>
    </section>
  );
}
