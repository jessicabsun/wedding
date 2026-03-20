import ProtectedPage from "@/components/ProtectedPage";
import styles from "./ceremony.module.css";

export default function CeremonyPage() {
  return (
    <ProtectedPage page="ceremony">
      <main className={styles.page}>
        <h1 className={styles.heading}>The Ceremony</h1>
        <p className={styles.body}>Details coming soon.</p>
      </main>
    </ProtectedPage>
  );
}
