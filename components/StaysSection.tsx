import styles from "./StaysSection.module.css";

export default function StaysSection() {
  return (
    <section className={styles.stays}>
      <h2 className={styles.heading}>Hotels</h2>

      <p className={styles.intro}>
        We&rsquo;ve reserved room blocks at the hotels below &mdash; The Evelyn and Ace in NoMad, near our
        dessert &amp; dancing venue, and The Residence Inn closer to dinner in Chinatown. Though rates
        are discounted, we encourage you to compare them online for your dates. Reference Jess &amp; Jake
        wedding if you call or email for assistance.
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
      <div className={`${styles.items} ${styles.bookRow}`}>
        <span className={styles.item}>Book by September 15</span>
        <a href="https://be.synxis.com/?Hotel=20986&Chain=16087&group=2610JJB&arrive=2026-10-15&nights=4" className={styles.bookLink}>Click here to book</a>
      </div>
      <div className={styles.items}>
        <span className={styles.item}>evelynsales@triumphotels.com</span>
        <span className={styles.item}>855.468.3501</span>
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
      <div className={`${styles.items} ${styles.bookRow}`}>
        <span className={styles.item}>Book by September 17</span>
        <a href="https://reservations.acehotel.com/?adult=1&arrive=2026-10-16&chain=7231&child=0&currency=USD&depart=2026-10-18&dest=ACE&group=IHO2610HUS&hotel=22033&level=hotel&locale=en-US&productcurrency=USD&rooms=1" target="_blank" rel="noopener noreferrer" className={styles.bookLink}>Click here to book</a>
      </div>
      <div className={styles.items}>
        <span className={styles.item}>Lori Nunez</span>
        <span className={styles.item}>lnunez@acehotelnyc.com</span>
        <span className={styles.item}>646.214.5783</span>
      </div>

      <div className={`${styles.group} ${styles.groupWide}`}>
        <hr className={styles.rule} />
        <h3 className={styles.hotelName}>Residence Inn Downtown Manhattan</h3>
        <hr className={styles.rule} />
      </div>

      <div className={styles.items}>
        <span className={styles.item}>
          <a href="https://maps.app.goo.gl/HhgHivZkNUQ73moWA" target="_blank" rel="noopener noreferrer" className={styles.addressLink}>170 Broadway</a>
        </span>
      </div>
      <div className={`${styles.items} ${styles.bookRow}`}>
        <span className={styles.item}>Book by August 17</span>
        <a href="https://www.marriott.com/event-reservations/reservation-link.mi?id=1783084496533&key=GRP&app=resvlink&_branch_match_id=1571288151237798423&_branch_referrer=H4sIAAAAAAAAA8soKSkottLXTywo0MtNLCrKzC8p0UvOz9UvSi0uy0wtN7IHytiCODmZedlqmSm2huYWxgYWJiaWZqbGxmrZqZW27kEBanVFqWmpQO156fFJRfnlxalFts4ZRfm5qQCn1jIqYQAAAA%3D%3D" target="_blank" rel="noopener noreferrer" className={styles.bookLink}>Click here to book</a>
      </div>
      <div className={styles.items}>
        <span className={styles.item}>Linet Perez</span>
        <span className={styles.item}>lperez@riwtc.com</span>
        <span className={styles.item}>347.586.8723</span>
      </div>
    </section>
  );
}
