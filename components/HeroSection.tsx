import Image from "next/image";
import styles from "./HeroSection.module.css";
import CornerSign from "./CornerSign";

export default function HeroSection() {
  return (
    <section className={styles.hero}>
      <Image
        src="/hero.png"
        alt="Jess and Jake"
        fill
        priority
        className={styles.heroPhoto}
        sizes="100vw"
      />
      <CornerSign />
    </section>
  );
}
