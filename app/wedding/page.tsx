import type { Metadata } from "next";
import ProtectedPage from "@/components/ProtectedPage";

export const metadata: Metadata = { title: "Jess & Jake · Wedding" };
import DetailsSection from "@/components/DetailsSection";
import RsvpSection from "@/components/RsvpSection";
import StaysSection from "@/components/StaysSection";
import PhotoBreak from "@/components/PhotoBreak";
import OurStorySection from "@/components/OurStorySection";
import RegistrySection from "@/components/RegistrySection";
import RecsSection from "@/components/RecsSection";
export default function DinnerPage() {
  return (
    <ProtectedPage>
      <main>
        <DetailsSection />
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
