import ProtectedPage from "@/components/ProtectedPage";
import GuestbookSection from "@/components/GuestbookSection";

export default function GuestbookPage() {
  return (
    <ProtectedPage>
      <main>
        <GuestbookSection />
      </main>
    </ProtectedPage>
  );
}
