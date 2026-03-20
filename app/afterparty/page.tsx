import ProtectedPage from "@/components/ProtectedPage";
import styles from "./afterparty.module.css";

export default function AfterpartyPage() {
  return (
    <ProtectedPage page="afterparty">
      <main className={styles.page}>
        <h1 className={styles.heading}>The Afterparty</h1>
        <p className={styles.body}>Details coming soon.</p>
      </main>
    </ProtectedPage>
  );
}
