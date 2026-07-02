import styles from "./StaysSection.module.css";

export default function StaysSection() {
  return (
    <section className={styles.stays}>
      <h2 className={styles.heading}>Hotels</h2>

      <p className={styles.intro}>
        We&rsquo;ve reserved room blocks at the hotels below. Though rates are discounted,
        we encourage you to compare them online for your dates.
      </p>

      <div className={styles.group}>
        <hr className={styles.rule} />
        <h3 className={styles.hotelName}>The Evelyn</h3>
        <hr className={styles.rule} />
      </div>

      <div className={styles.items}>
        <span className={styles.item}>
          <a href="https://maps.app.goo.gl/CPzUVHuTLUqyEPxy8" target="_blank" rel="noopener noreferrer" className={styles.addressLink}>7 E 27th St</a>
        </span>
        <span className={styles.item}>Home to Brass, our dance party venue</span>
      </div>
      <div className={styles.items}>
        <a href="https://be.synxis.com/?Hotel=20986&Chain=16087&group=2610JJB&arrive=2026-10-15&nights=4" className={styles.bookLink}>Click here to book</a>
        <span className={styles.item}>Available through September 15</span>
      </div>
      <div className={styles.items}>
        <span className={styles.item}>evelynsales@triumphotels.com</span>
        <span className={styles.item}>855-468-3501</span>
      </div>

      <div className={styles.group}>
        <hr className={styles.rule} />
        <h3 className={styles.hotelName}>Ace Hotel New York</h3>
        <hr className={styles.rule} />
      </div>

      <div className={styles.items}>
        <span className={styles.item}>
          <a href="https://maps.app.goo.gl/YNEmF3ucjA9tRqzb8" target="_blank" rel="noopener noreferrer" className={styles.addressLink}>20 W 29th St</a>
        </span>
      </div>

      <div className={styles.group}>
        <hr className={styles.rule} />
        <h3 className={styles.hotelName}>Residence Inn Downtown Manhattan</h3>
        <hr className={styles.rule} />
      </div>

      <div className={styles.items}>
        <span className={styles.item}>
          <a href="https://maps.app.goo.gl/HhgHivZkNUQ73moWA" target="_blank" rel="noopener noreferrer" className={styles.addressLink}>170 Broadway</a>
        </span>
      </div>
      <div className={styles.items}>
        <span className={styles.item}>Linet Perez</span>
        <span className={styles.item}>lperez@riwtc.com</span>
        <span className={styles.item}>347-586-8723</span>
      </div>
    </section>
  );
}
