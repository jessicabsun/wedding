import styles from "./RecsSection.module.css";

export default function RecsSection() {
  return (
    <section className={styles.recs}>
      <h2 className={styles.heading}>City Recs</h2>

      <div className={styles.group}>
        <hr className={styles.rule} />
        <h3 className={styles.category}>Food &amp; Drink</h3>
        <hr className={styles.rule} />
      </div>

      <div className={styles.items}>
        <span className={styles.item}>Apollo Bagels</span>
        <span className={styles.dot}>&middot;</span>
        <span className={styles.item}>Russ &amp; Daughters</span>
        <span className={styles.dot}>&middot;</span>
        <span className={styles.item}>Katz&rsquo;s Delicatessen</span>
        <span className={styles.dot}>&middot;</span>
        <span className={styles.item}>John&rsquo;s of Bleecker Street</span>
        <span className={styles.dot}>&middot;</span>
        <span className={styles.item}>Scarr&rsquo;s Pizza</span>
        <span className={styles.dot}>&middot;</span>
        <span className={styles.item}>Stretch Pizza</span>
        <span className={styles.dot}>&middot;</span>
        <span className={styles.item}>Union Square Cafe</span>
        <span className={styles.dot}>&middot;</span>
        <span className={styles.item}>Grand Central Oyster Bar</span>
        <span className={styles.dot}>&middot;</span>
        <span className={styles.item}>Caff&egrave; Panna</span>
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
        <span className={styles.item}>Cruise around all of Manhattan on the Circle Line (Pier 83)</span>
        <span className={styles.dot}>&middot;</span>
        <span className={styles.item}>Walk the Brooklyn Bridge</span>
        <span className={styles.dot}>&middot;</span>
        <span className={styles.item}>Citi Bike the West Side Highway (use the Lyft app)</span>
        <span className={styles.dot}>&middot;</span>
        <span className={styles.item}>See some art at MoMA or The Whitney</span>
        <span className={styles.dot}>&middot;</span>
        <span className={styles.item}>Buy something in SoHo</span>
      </div>

      <div className={styles.group}>
        <hr className={styles.rule} />
        <h3 className={styles.category}>Brooklyn</h3>
        <hr className={styles.rule} />
      </div>

      <div className={styles.brooklynRows}>
        <div className={styles.items}>
          <span className={styles.item}>Birdee</span>
          <span className={styles.dot}>&middot;</span>
          <span className={styles.item}>Domino Park</span>
          <span className={styles.dot}>&middot;</span>
          <span className={styles.item}>Misi</span>
          <span className={styles.dot}>&middot;</span>
          <span className={styles.item}>Bernie&rsquo;s</span>
        </div>
        <div className={styles.items}>
          <span className={styles.item}>Fort Greene Park</span>
          <span className={styles.dot}>&middot;</span>
          <span className={styles.item}>Strange Delight</span>
          <span className={styles.dot}>&middot;</span>
          <span className={styles.item}>Saraghina Caff&egrave;</span>
        </div>
        <div className={styles.items}>
          <span className={styles.item}>Lucky Charlie</span>
          <span className={styles.dot}>&middot;</span>
          <span className={styles.item}>Mansions</span>
        </div>
      </div>

      <p className={styles.mapLink}>
        Click{" "}
        <a href="https://www.google.com/maps/d/u/0/edit?mid=1VV32eMR2yD5Z4tFLc7P2X4zWdifABvI&usp=sharing" target="_blank" rel="noopener noreferrer">
          here
        </a>
        {" "}for locations and more recommendations &mdash; or just ask!
      </p>

      <div className={styles.ornament}>囍</div>
    </section>
  );
}
