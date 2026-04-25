import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/page-header";
import { LotusDecor } from "@/components/cultural";

export const metadata: Metadata = {
  title: "Welcome",
  description: "Welcome information for ACM23.",
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        title="Welcome"
        subtitle="To be updated"
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <section>
          <div className="flex items-center gap-3 mb-4">
            <LotusDecor color="#0D7377" size={24} />
            <h2 className="text-2xl font-bold text-dark">Welcome</h2>
          </div>
          <p className="text-gray-600 leading-relaxed">To be updated</p>
        </section>
      </div>
    </>
  );
}
