import Image from "next/image";
import styles from "./RegistrySection.module.css";

export default function RegistrySection() {
  return (
    <>
      <svg width="0" height="0" style={{ position: "absolute" }}>
        <defs>
          <filter id="grain-registry" x="0%" y="0%" width="100%" height="100%">
            <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="4" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
            <feBlend in="SourceGraphic" mode="multiply" />
          </filter>
        </defs>
      </svg>
      <div className={styles.wrap}>
        <section id="registry" className={styles.registry}>
          <h2 className={styles.heading}>Registry</h2>
          <p className={styles.body}>
            Your presence is gift enough. But if you&rsquo;d like to contribute to
            the start of our new life together, we&rsquo;ve set up a house fund on
            Zola. We&rsquo;re saving toward our first home (or apartment!) to make
            Brooklyn our long-term home and the place where we start our family.
            Thank you for helping us start this next chapter.
          </p>
          <a
            href="https://www.zola.com/registry/jakeandjessoctober17"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.button}
          >
            Contribute here
          </a>
        </section>
        <div className={styles.photoWrap}>
          <Image
            src="/registry_photo.png"
            alt="Jess and Jake"
            fill
            sizes="(max-width: 700px) 100vw, 80vw"
            className={styles.photo}
          />
        </div>
      </div>
    </>
  );
}
