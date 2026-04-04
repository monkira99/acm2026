import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/page-header";
import { faqItems } from "@/data/faq";

export const metadata: Metadata = { title: "FAQ" };

export default function FaqPage() {
  return (
    <>
      <PageHeader title="Frequently Asked Questions" />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="space-y-4">
          {faqItems.map((item, i) => (
            <details key={i} className="group rounded-xl border border-gray-100 overflow-hidden">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-semibold text-dark hover:bg-gray-50 transition-colors list-none">
                {item.question}
                <span className="text-gray-400 group-open:rotate-45 transition-transform text-xl" aria-hidden="true">+</span>
              </summary>
              <div className="px-5 pb-5 text-sm text-gray-600 leading-relaxed">
                {item.answer}
              </div>
            </details>
          ))}
        </div>
      </div>
    </>
  );
}
