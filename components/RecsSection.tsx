import styles from "./RecsSection.module.css";

export default function RecsSection() {
  return (
    <section className={styles.recs}>
      <h2 className={styles.heading}>City Recommendations</h2>

      <div className={styles.group}>
        <hr className={styles.rule} />
        <h3 className={styles.category}>Food &amp; Drink</h3>
        <hr className={styles.rule} />
      </div>

      <div className={styles.items}>
        <span className={styles.item}>Scarr&rsquo;s Pizza</span>
        <span className={styles.dot}>&middot;</span>
        <span className={styles.item}>John&rsquo;s of Bleecker Street</span>
        <span className={styles.dot}>&middot;</span>
        <span className={styles.item}>Stretch Pizza</span>
        <span className={styles.dot}>&middot;</span>
        <span className={styles.item}>Apollo Bagels</span>
        <span className={styles.dot}>&middot;</span>
        <span className={styles.item}>Katz&rsquo;s Delicatessen</span>
        <span className={styles.dot}>&middot;</span>
        <span className={styles.item}>Union Square Cafe</span>
        <span className={styles.dot}>&middot;</span>
        <span className={styles.item}>Grand Central Oyster Bar</span>
        <span className={styles.dot}>&middot;</span>
        <span className={styles.item}>McSorley&rsquo;s Old Ale House</span>
        <span className={styles.dot}>&middot;</span>
        <span className={styles.item}>Paradise Lost</span>
      </div>

      <div className={styles.group}>
        <hr className={styles.rule} />
        <h3 className={styles.category}>Activities</h3>
        <hr className={styles.rule} />
      </div>

      <div className={styles.items}>
        <span className={styles.item}>Cruise around Manhattan Island on the Circle Line</span>
        <span className={styles.dot}>&middot;</span>
        <span className={styles.item}>Walk the Brooklyn Bridge</span>
        <span className={styles.dot}>&middot;</span>
        <span className={styles.item}>Bike the West Side Highway</span>
        <span className={styles.dot}>&middot;</span>
        <span className={styles.item}>Go to MoMA or The Whitney</span>
        <span className={styles.dot}>&middot;</span>
        <span className={styles.item}>Buy something in SoHo</span>
        <span className={styles.dot}>&middot;</span>
        <span className={styles.item}>Mansions</span>
      </div>

      <div className={styles.ornament}>囍</div>
    </section>
  );
}
