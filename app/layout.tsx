import type { Metadata } from "next";
import { Cormorant_Garamond, Josefin_Sans, Bebas_Neue, Unbounded } from "next/font/google";
import "./globals.css";
import GrainOverlay from "@/components/GrainOverlay";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "600"],
  style: ["normal", "italic"],
});

const josefin = Josefin_Sans({
  variable: "--font-josefin",
  subsets: ["latin"],
  weight: ["100", "300", "400"],
});

const bebas = Bebas_Neue({
  variable: "--font-bebas",
  subsets: ["latin"],
  weight: ["400"],
});

const unbounded = Unbounded({
  variable: "--font-unbounded",
  subsets: ["latin"],
  weight: ["700", "900"],
});

export const metadata: Metadata = {
  title: "Jess & Jake",
  description: "Jess & Jake's Wedding",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${josefin.variable} ${bebas.variable} ${unbounded.variable}`}
    >
      <body>
        <GrainOverlay />
        {children}
      </body>
    </html>
  );
}
