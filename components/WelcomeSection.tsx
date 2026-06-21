import styles from "./WelcomeSection.module.css";

export default function WelcomeSection() {
  return (
    <section className={styles.welcome}>
      <p className={styles.copy}>
        Beloved friends and family, please join us for our wedding celebration &mdash; a night out in New York City, Jake&rsquo;s birthplace and our home since 2018.
      </p>
    </section>
  );
}
