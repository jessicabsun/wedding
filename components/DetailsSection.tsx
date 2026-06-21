import styles from "./DetailsSection.module.css";

interface Props {
  includeFriday?: boolean;
}

export default function DetailsSection({ includeFriday }: Props) {
  return (
    <section className={styles.details}>
      <div className={styles.card}>
        <div className={styles.cardInner}>
          <h2 className={styles.heading}>Jess &amp; Jake</h2>
          <p className={styles.date}>10.17.26 &middot; NYC</p>

          <hr className={styles.headingRule} />

          {includeFriday && (
            <>
              <div className={styles.dayBlock}>
                <h3 className={styles.dayName}>Friday, October 16</h3>
                <span className={styles.attire}>Cocktail attire</span>

                <div className={styles.item}>
                  <span className={styles.venueName}>
                    Welcome Cocktails &amp; Bites
                  </span>
                  <span className={styles.venueDetail}>
                    Hosted by Jake&rsquo;s parents
                  </span>
                  <span className={styles.venueDetail}>
                    136 E 64th St, Apt 11D, Upper East Side &middot; 7:30&ndash;10pm
                  </span>
                </div>
              </div>

              <hr className={styles.dayRule} />
            </>
          )}

          <div className={styles.dayBlock}>
            <h3 className={styles.dayName}>Saturday, October 17</h3>
            <span className={styles.attire}>Black tie optional</span>

            <div className={styles.item}>
              <span className={styles.ceremony}>
                Private Ceremony &middot; Jacob Wrey Mould Fountain
              </span>
            </div>

            <hr className={styles.eventRule} />

            <div className={styles.item}>
              <span className={styles.venueName}>Dinner</span>
              <span className={styles.venueDetail}>
                Golden Unicorn &middot; 18 E Broadway, Chinatown &middot; 6pm
              </span>
            </div>

            <hr className={styles.eventRule} />

            <div className={styles.item}>
              <span className={styles.venueName}>Dancing</span>
              <span className={styles.venueDetail}>
                Brass at The Evelyn Hotel &middot; 7 E 27th St, NoMad &middot; 10pm
              </span>
            </div>
          </div>

          <div className={styles.ornament}>囍</div>
        </div>
      </div>
    </section>
  );
}
