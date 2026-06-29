import styles from "./StaysSection.module.css";

export default function StaysSection() {
  return (
    <section className={styles.stays}>
      <h2 className={styles.heading}>Hotels &amp; Transport</h2>

      <div className={styles.block}>
        <p className={styles.body}>
          We&rsquo;ve reserved hotel room blocks at The Evelyn (home to Brass,
          our dance party venue) and Ace Hotel, both in NoMad, and Residence Inn
          by Marriott Downtown/World Trade Center. Details to come.
        </p>
      </div>

      <div className={styles.block}>
        <p className={styles.body}>
          A coach bus will run between The Evelyn and Golden Unicorn before and
          after dinner. We kindly ask that seats be reserved for guests who need
          them &mdash; cars are easy to grab for everyone else.
        </p>
      </div>
    </section>
  );
}
