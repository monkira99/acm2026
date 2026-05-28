import type { Metadata } from "next";
import { AbstractForm } from "@/components/forms/abstract-form";
import { SectionHero } from "@/components/ui/section-hero";

export const metadata: Metadata = {
  title: "Abstract Submission",
  description: "Submit your research abstract for ACM23.",
};

export default function AbstractPage() {
  return (
    <div className="bg-[#EAF2FB]">
      <SectionHero title="Abstract Submission" />
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <AbstractForm />
      </div>
    </div>
  );
}
