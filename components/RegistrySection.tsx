import Image from "next/image";
import styles from "./RegistrySection.module.css";

export default function RegistrySection() {
  return (
    <>
      <section id="registry" className={styles.registry}>
        <h2 className={styles.heading}>Registry</h2>
        <p className={styles.body}>
          Your presence is gift enough. But if you&rsquo;d like to contribute to
          the start of our new life as a couple, we&rsquo;re gratefully accepting
          cash via Venmo (<a href="https://account.venmo.com/pay?recipients=Jake-Huston" target="_blank" rel="noopener noreferrer" className={styles.link}>@Jake-Huston</a>) or Zelle (612-961-1719).
        </p>
      </section>
      <div className={styles.photoWrap}>
        <Image
          src="/registry_photo.png"
          alt="Jess and Jake"
          fill
          unoptimized
          sizes="(max-width: 700px) 100vw, 80vw"
          className={styles.photo}
        />
      </div>
    </>
  );
}
