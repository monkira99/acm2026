import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/page-header";
import { AbstractForm } from "@/components/forms/abstract-form";

export const metadata: Metadata = {
  title: "Abstract Submission",
  description: "Submit your research abstract for ACM23.",
};

export default function AbstractPage() {
  return (
    <>
      <PageHeader title="Abstract Submission" subtitle="Submit your research for ACM23" />
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <AbstractForm />
      </div>
    </>
  );
}
