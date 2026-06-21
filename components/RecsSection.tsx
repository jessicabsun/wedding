import styles from "./RecsSection.module.css";

const foodSpots = [
  { name: "Apollo Bagels", x: 252, y: 438 },
  { name: "John’s of Bleecker", x: 162, y: 455 },
  { name: "McSorley’s", x: 242, y: 448 },
  { name: "Katz’s Deli", x: 258, y: 472 },
  { name: "Stretch Pizza", x: 248, y: 325 },
  { name: "Union Square Cafe", x: 238, y: 352 },
  { name: "Grand Central Oyster Bar", x: 248, y: 225 },
];

const activitySpots = [
  { name: "Circle Line, Pier 83", x: 98, y: 222 },
  { name: "Brooklyn Bridge", x: 225, y: 630 },
  { name: "Bike the West Side Hwy", x: 102, y: 305 },
  { name: "MoMA", x: 210, y: 168 },
  { name: "The Whitney", x: 112, y: 388 },
  { name: "Mansions", x: 235, y: 90 },
];

type Anchor = "start" | "middle" | "end";

function labelOffset(name: string): { dx: number; dy: number; anchor: Anchor } {
  const offsets: Record<string, { dx: number; dy: number; anchor: Anchor }> = {
    "Apollo Bagels": { dx: 12, dy: -6, anchor: "start" },
    "John’s of Bleecker": { dx: -12, dy: 4, anchor: "end" },
    "McSorley’s": { dx: 12, dy: 10, anchor: "start" },
    "Katz’s Deli": { dx: 12, dy: 5, anchor: "start" },
    "Stretch Pizza": { dx: 12, dy: 4, anchor: "start" },
    "Union Square Cafe": { dx: 12, dy: 4, anchor: "start" },
    "Grand Central Oyster Bar": { dx: 12, dy: 5, anchor: "start" },
    "Circle Line, Pier 83": { dx: -12, dy: 5, anchor: "end" },
    "Brooklyn Bridge": { dx: 12, dy: 5, anchor: "start" },
    "Bike the West Side Hwy": { dx: -12, dy: 5, anchor: "end" },
    "MoMA": { dx: -12, dy: 5, anchor: "end" },
    "The Whitney": { dx: -12, dy: 5, anchor: "end" },
    "Mansions": { dx: 12, dy: 5, anchor: "start" },
  };
  return offsets[name] || { dx: 10, dy: 4, anchor: "start" };
}

export default function RecsSection() {
  return (
    <section className={styles.recs}>
      <h2 className={styles.heading}>NYC Recs</h2>
      <div className={styles.mapWrap}>
        <svg viewBox="0 0 500 800" className={styles.map} xmlns="http://www.w3.org/2000/svg">
          {/* Manhattan outline */}
          <path
            d="M200,720
               Q210,710 225,695
               L245,660
               L265,610
               L275,540
               L282,470
               L288,400
               L292,330
               L295,260
               L290,200
               L285,150
               L278,100
               L260,65
               L230,50
               L200,45
               L170,50
               L145,65
               L125,100
               L115,150
               L105,200
               L98,260
               L95,330
               L100,400
               L108,470
               L118,540
               L135,610
               L155,660
               L175,695
               Q190,710 200,720Z"
            fill="none"
            stroke="rgba(212, 175, 55, 0.15)"
            strokeWidth="1.5"
          />
          {/* Subtle grid lines for major streets */}
          <line x1="95" y1="390" x2="288" y2="390" stroke="rgba(212,175,55,0.06)" strokeWidth="0.5" />
          <line x1="98" y1="300" x2="292" y2="300" stroke="rgba(212,175,55,0.06)" strokeWidth="0.5" />
          <line x1="105" y1="225" x2="290" y2="225" stroke="rgba(212,175,55,0.06)" strokeWidth="0.5" />
          <line x1="115" y1="460" x2="280" y2="460" stroke="rgba(212,175,55,0.06)" strokeWidth="0.5" />

          {/* Food & Drink spots */}
          {foodSpots.map((spot) => {
            const off = labelOffset(spot.name);
            return (
              <g key={spot.name}>
                <circle cx={spot.x} cy={spot.y} r="4" fill="var(--neon-yellow)" opacity="0.85" />
                <circle cx={spot.x} cy={spot.y} r="7" fill="none" stroke="var(--neon-yellow)" strokeWidth="0.5" opacity="0.3" />
                <text
                  x={spot.x + off.dx}
                  y={spot.y + off.dy}
                  textAnchor={off.anchor}
                  className={styles.mapLabel}
                >
                  {spot.name}
                </text>
              </g>
            );
          })}

          {/* Activity spots */}
          {activitySpots.map((spot) => {
            const off = labelOffset(spot.name);
            return (
              <g key={spot.name}>
                <circle cx={spot.x} cy={spot.y} r="4" fill="var(--neon-orange)" opacity="0.85" />
                <circle cx={spot.x} cy={spot.y} r="7" fill="none" stroke="var(--neon-orange)" strokeWidth="0.5" opacity="0.3" />
                <text
                  x={spot.x + off.dx}
                  y={spot.y + off.dy}
                  textAnchor={off.anchor}
                  className={styles.mapLabelActivity}
                >
                  {spot.name}
                </text>
              </g>
            );
          })}
        </svg>
        <div className={styles.legend}>
          <span className={styles.legendItem}>
            <span className={styles.dotFood} />
            Food &amp; Drink
          </span>
          <span className={styles.legendItem}>
            <span className={styles.dotActivity} />
            Activities
          </span>
        </div>
      </div>
    </section>
  );
}
