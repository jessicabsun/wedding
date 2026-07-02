import type { Metadata } from "next";
import ProtectedPage from "@/components/ProtectedPage";
import PhotosSection from "@/components/PhotosSection";
import Ornament from "@/components/Ornament";

export const metadata: Metadata = { title: "Jess & Jake · Photos" };

export default function PhotosPage() {
  return (
    <ProtectedPage>
      <main>
        <PhotosSection />
        <Ornament />
      </main>
    </ProtectedPage>
  );
}
