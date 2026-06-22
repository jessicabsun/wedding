import type { Metadata } from "next";
import ProtectedPage from "@/components/ProtectedPage";
import PhotosSection from "@/components/PhotosSection";

export const metadata: Metadata = { title: "Jess & Jake · Photos" };

export default function PhotosPage() {
  return (
    <ProtectedPage>
      <main>
        <PhotosSection />
      </main>
    </ProtectedPage>
  );
}
