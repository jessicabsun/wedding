import ProtectedPage from "@/components/ProtectedPage";
import styles from "./dinner.module.css";

export default function DinnerPage() {
  return (
    <ProtectedPage page="dinner">
      <main className={styles.page}>
        <h1 className={styles.heading}>The Dinner</h1>
        <p className={styles.body}>Details coming soon.</p>
      </main>
    </ProtectedPage>
  );
}
