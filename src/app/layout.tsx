import type { Metadata } from "next";
import { Inter } from "next/font/google";
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
