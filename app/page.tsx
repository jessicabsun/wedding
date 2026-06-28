import type { Metadata } from "next";
import HeroSection from "@/components/HeroSection";
import VenueCard from "@/components/VenueCard";
import PasswordSection from "@/components/PasswordSection";
import ScrollArrow from "@/components/ScrollArrow";

export const metadata: Metadata = { title: "Jess & Jake · 10.17.26 · NYC" };

export default function Home() {
  return (
    <main style={{ background: "#1a1a1a" }}>
      <ScrollArrow />
      <HeroSection />
      <VenueCard
        src="/gu_banquet.png"
        alt="Golden Unicorn banquet hall"
        label="Dinner &middot; Golden Unicorn"
        objectPosition="center 30%"
        filter="brightness(0.88) saturate(0.9) contrast(1.05)"
      />
      <VenueCard
        src="/nyc_skyline.png"
        alt="NYC skyline at night"
        label="Dancing &middot; Brass"
        objectPosition="center 70%"
        filter="brightness(0.9) grayscale(1) contrast(0.9)"
      />
      <PasswordSection />
    </main>
  );
}
