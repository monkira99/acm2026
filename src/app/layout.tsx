import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter } from "next/font/google";
import { Navbar, Footer } from "@/components/layout";
import "@/styles/globals.css";

const inter = Inter({ subsets: ["latin", "vietnamese"] });

export const metadata: Metadata = {
  title: {
    default: "ACM23 — Hanoi, Vietnam | October 2026",
    template: "%s | ACM23 Hanoi",
  },
  description:
    "The 23rd Annual Meeting of ACM — Asian Consortium for the Conservation and Sustainable Use of Microbial Resources. Hanoi, Vietnam, October 2026.",
  keywords: [
    "ACM23",
    "microbial resources",
    "conference",
    "Hanoi",
    "Vietnam",
    "microbiology",
    "Asian Consortium",
  ],
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Event",
  name: "ACM23 — The 23rd Annual Meeting",
  description:
    "Asian Consortium for the Conservation and Sustainable Use of Microbial Resources",
  startDate: "2026-10-15",
  endDate: "2026-10-16",
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  eventStatus: "https://schema.org/EventScheduled",
  location: {
    "@type": "Place",
    name: "Hanoi, Vietnam",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Hanoi",
      addressCountry: "VN",
    },
  },
  organizer: {
    "@type": "Organization",
    name: "ACM — Asian Consortium for the Conservation and Sustainable Use of Microbial Resources",
    url: "https://www.acm-mrc.asia",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Navbar />
        <main className="pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
