import ProtectedPage from "@/components/ProtectedPage";
import DetailsSection from "@/components/DetailsSection";
import RsvpSection from "@/components/RsvpSection";
import StaysSection from "@/components/StaysSection";
import PhotoBreak from "@/components/PhotoBreak";
import OurStorySection from "@/components/OurStorySection";
import RegistrySection from "@/components/RegistrySection";
import RecsSection from "@/components/RecsSection";
import ScrollArrow from "@/components/ScrollArrow";

export default function FridayPage() {
  return (
    <ProtectedPage>
      <main>
        <ScrollArrow />
        <DetailsSection includeFriday />
        <RsvpSection />
        <StaysSection />
        <PhotoBreak />
        <RegistrySection />
        <OurStorySection />
        <RecsSection />
      </main>
    </ProtectedPage>
  );
}
