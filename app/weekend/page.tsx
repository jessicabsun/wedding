import type { Metadata } from "next";
import ProtectedPage from "@/components/ProtectedPage";

export const metadata: Metadata = { title: "Jess & Jake · Weekend" };
import DetailsSection from "@/components/DetailsSection";
import RsvpSection from "@/components/RsvpSection";
import OurStorySection from "@/components/OurStorySection";
import RegistrySection from "@/components/RegistrySection";
import PageTourSection from "@/components/PageTourSection";
export default function FridayPage() {
  return (
    <ProtectedPage>
      <main>
        <DetailsSection includeFriday />
        <RsvpSection includeFriday />
        <OurStorySection />
        <RegistrySection />
        <PageTourSection />
      </main>
    </ProtectedPage>
  );
}
