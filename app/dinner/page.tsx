import ProtectedPage from "@/components/ProtectedPage";
import DetailsSection from "@/components/DetailsSection";
import RsvpSection from "@/components/RsvpSection";
import StaysSection from "@/components/StaysSection";
import OurStorySection from "@/components/OurStorySection";
import RegistrySection from "@/components/RegistrySection";

export default function DinnerPage() {
  return (
    <ProtectedPage>
      <main>
        <DetailsSection />
        <RsvpSection />
        <StaysSection />
        <OurStorySection />
        <RegistrySection />
      </main>
    </ProtectedPage>
  );
}
