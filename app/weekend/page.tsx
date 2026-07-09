import type { Metadata } from "next";
import ProtectedPage from "@/components/ProtectedPage";

export const metadata: Metadata = { title: "Jess & Jake · Weekend" };
import DetailsSection from "@/components/DetailsSection";
import RsvpSection from "@/components/RsvpSection";
import OurStorySection from "@/components/OurStorySection";
import RegistrySection from "@/components/RegistrySection";
import Ornament from "@/components/Ornament";
export default function FridayPage() {
  return (
    <ProtectedPage>
      <main>
        <DetailsSection includeFriday />
        <RsvpSection includeFriday />
        <OurStorySection />
        <RegistrySection />
        <Ornament />
      </main>
    </ProtectedPage>
  );
}
