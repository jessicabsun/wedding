import Image from "next/image";
import styles from "./VenueSection.module.css";

export default function VenueSection() {
  return (
    <section className={styles.venues}>
      <div className={styles.venueCard}>
        <Image
          src="/option3_gu.jpg"
          alt="Golden Unicorn interior"
          fill
          sizes="(max-width: 700px) 100vw, 50vw"
          className={styles.venueImage}
        />
        <div className={styles.gradient} />
        <p className={styles.venueLabel}>Dinner &middot; Golden Unicorn</p>
      </div>
      <div className={styles.venueCard}>
        <Image
          src="/option3_brass.jpg"
          alt="Brass bar interior"
          fill
          sizes="(max-width: 700px) 100vw, 50vw"
          className={styles.venueImage}
        />
        <div className={styles.gradient} />
        <p className={styles.venueLabel}>Dancing &middot; Brass</p>
      </div>
    </section>
  );
}
