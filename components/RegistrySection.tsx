import Image from "next/image";
import styles from "./RegistrySection.module.css";

export default function RegistrySection() {
  return (
    <>
      <svg width="0" height="0" style={{ position: "absolute" }}>
        <defs>
          <filter id="grain-registry" x="-2%" y="-2%" width="104%" height="104%">
            <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="4" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
            <feBlend in="SourceGraphic" mode="multiply" />
            <feComposite in2="SourceGraphic" operator="in" />
          </filter>
        </defs>
      </svg>
      <div className={styles.wrap}>
        <section id="registry" className={styles.registry}>
          <h2 className={styles.heading}>Registry</h2>
          <p className={styles.body}>
            Your presence is gift enough. But if you&rsquo;d like to
            contribute to the start of our new life together, we&rsquo;ve
            set up a house (or apartment!) fund to help us make Brooklyn our
            long-term home and place we start our family. Thank you for
            being a part of our next chapter!
          </p>
          <a
            href="https://www.zola.com/registry/jakeandjessoctober17"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.button}
          >
            Contribute
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
