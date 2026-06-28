import Image from "next/image";
import styles from "./PhotoBreak.module.css";

export default function PhotoBreak() {
  return (
    <>
      <svg width="0" height="0" style={{ position: "absolute" }}>
        <defs>
          <filter id="grain-photo" x="0%" y="0%" width="100%" height="100%">
            <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="4" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
            <feBlend in="SourceGraphic" mode="multiply" />
          </filter>
        </defs>
      </svg>
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
