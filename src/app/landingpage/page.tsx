import type { Metadata } from "next";
import { Space_Grotesk, IBM_Plex_Mono } from "next/font/google";
import {
  LandingHero,
  AboutSection,
  ThemesSection,
  ProgramSection,
  SpeakersSection,
  DatesSection,
  ParticipationSection,
  VenueSection,
  CommitteesSection,
  InstitutionsSection,
  ContactCta,
} from "@/components/landing";

const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ACM23 — Hanoi 2026",
  description:
    "ACM23, the 23rd Annual Meeting of the Asian Consortium for the Conservation and Sustainable Use of Microbial Resources. Hanoi, Vietnam, 16–18 November 2026. Register and submit abstracts.",
};

export default function LandingPage() {
  return (
    <div className={`landing-root ${display.variable} ${mono.variable}`}>
      <LandingHero />
      <AboutSection />
      <ThemesSection />
      <ProgramSection />
      <SpeakersSection />
      <DatesSection />
      <ParticipationSection />
      <VenueSection />
      <CommitteesSection />
      <InstitutionsSection />
      <ContactCta />
    </div>
  );
}
