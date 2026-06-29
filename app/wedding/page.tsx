import type { Metadata } from "next";
import ProtectedPage from "@/components/ProtectedPage";

export const metadata: Metadata = { title: "Jess & Jake · Wedding" };
import DetailsSection from "@/components/DetailsSection";
import RsvpSection from "@/components/RsvpSection";
import OurStorySection from "@/components/OurStorySection";
import RecsSection from "@/components/RecsSection";
export default function DinnerPage() {
  return (
    <ProtectedPage>
      <main>
        <DetailsSection />
        <RsvpSection />
        <OurStorySection />
        <RecsSection />
      </main>
    </ProtectedPage>
  );
}
