import type { Metadata } from "next";
import ProtectedPage from "@/components/ProtectedPage";

export const metadata: Metadata = { title: "Jess & Jake · Wedding" };
import DetailsSection from "@/components/DetailsSection";
import RsvpSection from "@/components/RsvpSection";
import OurStorySection from "@/components/OurStorySection";
import PageTourSection from "@/components/PageTourSection";
export default function DinnerPage() {
  return (
    <ProtectedPage>
      <main>
        <DetailsSection />
        <RsvpSection />
        <OurStorySection />
        <PageTourSection />
      </main>
    </ProtectedPage>
  );
}
