import type { Metadata } from "next";
import Image from "next/image";
import ProtectedPage from "@/components/ProtectedPage";
import RegistrySection from "@/components/RegistrySection";
import styles from "./page.module.css";

export const metadata: Metadata = { title: "Jess & Jake · Registry" };

export default function RegistryPage() {
  return (
    <ProtectedPage>
      <main style={{ background: "#1a1a1a" }}>
        <RegistrySection />
        <div className={styles.photoWrap}>
          <Image
            src="/registry_photo.png"
            alt="Jess and Jake"
            fill
            unoptimized
            sizes="(max-width: 700px) 100vw, 80vw"
            className={styles.photo}
          />
        </div>
      </main>
    </ProtectedPage>
  );
}
