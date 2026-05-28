import type { Metadata } from "next";
import { AbstractForm } from "@/components/forms/abstract-form";
import { SectionHero } from "@/components/ui/section-hero";

export const metadata: Metadata = {
  title: "Abstract Submission",
  description: "Submit your research abstract for ACM23 Hanoi 2026.",
};

export default function AbstractPage() {
  return (
    <div className="bg-[#EAF2FB] min-h-screen">
      <SectionHero
        title="Abstract Submission"
      />

      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <AbstractForm />
      </div>
    </div>
  );
}
