import Image from "next/image";
import styles from "./VenueCard.module.css";

interface VenueCardProps {
  src: string;
  alt: string;
  label: string;
  objectPosition?: string;
  filter?: string;
  overlayOpacity?: number;
}

export default function VenueCard({ src, alt, label, objectPosition, filter, overlayOpacity = 0.5 }: VenueCardProps) {
  const style: React.CSSProperties = {};
  if (objectPosition) style.objectPosition = objectPosition;
  if (filter) style.filter = filter;

  return (
    <section className={styles.venue}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes="100vw"
        className={styles.venueImage}
        style={Object.keys(style).length ? style : undefined}
      />
      <div className={styles.overlay} style={{ background: `rgba(0,0,0,${overlayOpacity})` }} />
      <p className={styles.venueLabel} dangerouslySetInnerHTML={{ __html: label }} />
    </section>
  );
}
