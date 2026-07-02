import type { Metadata } from "next";
import ProtectedPage from "@/components/ProtectedPage";
import GuestbookSection from "@/components/GuestbookSection";
import Ornament from "@/components/Ornament";

export const metadata: Metadata = { title: "Jess & Jake · Guest Book" };

export default function GuestbookPage() {
  return (
    <ProtectedPage>
      <main>
        <GuestbookSection />
        <Ornament />
      </main>
    </ProtectedPage>
  );
}
