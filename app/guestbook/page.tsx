import type { Metadata } from "next";
import ProtectedPage from "@/components/ProtectedPage";
import GuestbookSection from "@/components/GuestbookSection";

export const metadata: Metadata = { title: "Jess & Jake · Guest Book" };

export default function GuestbookPage() {
  return (
    <ProtectedPage>
      <main>
        <GuestbookSection />
      </main>
    </ProtectedPage>
  );
}
