import ProtectedPage from "@/components/ProtectedPage";
import PhotosSection from "@/components/PhotosSection";

export default function PhotosPage() {
  return (
    <ProtectedPage>
      <main>
        <PhotosSection />
      </main>
    </ProtectedPage>
  );
}
