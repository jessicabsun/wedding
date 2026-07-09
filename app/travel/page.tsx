import type { Metadata } from "next";
import Image from "next/image";
import ProtectedPage from "@/components/ProtectedPage";
import StaysSection from "@/components/StaysSection";
import RecsSection from "@/components/RecsSection";
import styles from "./page.module.css";

export const metadata: Metadata = { title: "Jess & Jake · Travel" };

export default function TravelPage() {
  return (
    <ProtectedPage>
      <main style={{ background: "#1a1a1a" }}>
        <svg width="0" height="0" style={{ position: "absolute" }}>
          <defs>
            <filter id="grain-travel" x="0%" y="0%" width="100%" height="100%">
              <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="4" stitchTiles="stitch" />
              <feColorMatrix type="saturate" values="0" />
              <feBlend in="SourceGraphic" mode="multiply" />
            </filter>
          </defs>
        </svg>
        <StaysSection />
        <div className={styles.photoWrap}>
          <Image
            src="/travel_photo.png"
            alt="Jess and Jake"
            fill
            unoptimized
            sizes="(max-width: 700px) 100vw, 80vw"
            className={styles.heroPhoto}
          />
        </div>
        <RecsSection />
      </main>
    </ProtectedPage>
  );
}
