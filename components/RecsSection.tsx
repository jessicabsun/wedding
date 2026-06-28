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
        <span className={styles.item}>Apollo Bagels <span className={styles.dot}>&middot;</span></span>
        <span className={styles.item}>Russ &amp; Daughters <span className={styles.dot}>&middot;</span></span>
        <span className={styles.item}>Katz&rsquo;s Delicatessen <span className={styles.dot}>&middot;</span></span>
        <span className={styles.item}>John&rsquo;s of Bleecker Street <span className={styles.dot}>&middot;</span></span>
        <span className={styles.item}>Scarr&rsquo;s Pizza <span className={styles.dot}>&middot;</span></span>
        <span className={styles.item}>Stretch Pizza <span className={styles.dot}>&middot;</span></span>
        <span className={styles.item}>Union Square Cafe <span className={styles.dot}>&middot;</span></span>
        <span className={styles.item}>Grand Central Oyster Bar <span className={styles.dot}>&middot;</span></span>
        <span className={styles.item}>Caff&egrave; Panna <span className={styles.dot}>&middot;</span></span>
        <span className={styles.item}>McSorley&rsquo;s Old Ale House <span className={styles.dot}>&middot;</span></span>
        <span className={styles.item}>Paradise Lost</span>
      </div>

      <div className={styles.group}>
        <hr className={styles.rule} />
        <h3 className={styles.category}>Activities</h3>
        <hr className={styles.rule} />
      </div>

      <div className={styles.items}>
        <span className={styles.item}>Cruise around all of Manhattan on the Circle Line (Pier 83) <span className={styles.dot}>&middot;</span></span>
        <span className={styles.item}>Walk the Brooklyn Bridge <span className={styles.dot}>&middot;</span></span>
        <span className={styles.item}>Get a photo inside the Oculus <span className={styles.dot}>&middot;</span></span>
        <span className={styles.item}>Citi Bike the West Side Highway (use the Lyft app) <span className={styles.dot}>&middot;</span></span>
        <span className={styles.item}>See some art at MoMA or The Whitney <span className={styles.dot}>&middot;</span></span>
        <span className={styles.item}>Buy something in SoHo</span>
      </div>

      <div className={styles.group}>
        <hr className={styles.rule} />
        <h3 className={styles.category}>Brooklyn</h3>
        <hr className={styles.rule} />
      </div>

      <div className={styles.brooklynRows}>
        <div className={styles.items}>
          <span className={styles.item}>Birdee <span className={styles.dot}>&middot;</span></span>
          <span className={styles.item}>Domino Park <span className={styles.dot}>&middot;</span></span>
          <span className={styles.item}>Misi <span className={styles.dot}>&middot;</span></span>
          <span className={styles.item}>Bernie&rsquo;s</span>
        </div>
        <div className={styles.items}>
          <span className={styles.item}>Fort Greene Park <span className={styles.dot}>&middot;</span></span>
          <span className={styles.item}>Strange Delight <span className={styles.dot}>&middot;</span></span>
          <span className={styles.item}>Saraghina Caff&egrave;</span>
        </div>
        <div className={styles.items}>
          <span className={styles.item}>Lucky Charlie <span className={styles.dot}>&middot;</span></span>
          <span className={styles.item}>Mansions</span>
        </div>
      </div>

      <p className={styles.mapLink}>
        <a href="https://www.google.com/maps/d/u/0/edit?mid=1VV32eMR2yD5Z4tFLc7P2X4zWdifABvI&usp=sharing" target="_blank" rel="noopener noreferrer">
          Click here
        </a>
        {" "}for location details and more recommendations &mdash; or just ask!
      </p>

      <div className={styles.ornament}>囍</div>
    </section>
  );
}
