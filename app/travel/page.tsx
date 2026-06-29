import type { Metadata } from "next";
import Image from "next/image";
import ProtectedPage from "@/components/ProtectedPage";
import StaysSection from "@/components/StaysSection";
import styles from "./page.module.css";

export const metadata: Metadata = { title: "Jess & Jake · Travel" };

export default function TravelPage() {
  return (
    <ProtectedPage>
      <main style={{ background: "#1a1a1a" }}>
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
      </main>
    </ProtectedPage>
  );
}
