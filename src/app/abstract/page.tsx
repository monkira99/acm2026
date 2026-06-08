import type { Metadata } from "next";
import { AbstractForm } from "@/components/forms/abstract-form";
import { SectionHero } from "@/components/ui/section-hero";
import { Download, FileText, Info } from "lucide-react";

export const metadata: Metadata = {
  title: "Abstract Submission",
  description: "Submit an abstract for ACM23 Hanoi 2026.",
};

const guidanceItems = [
  "We welcome you to submit an oral presentation covering topic of environmental protection, circular economy, sustainable crop and livestock production, blue aquaculture, food safety, human health, and One Health",
  "We encourage both junior and senior scientists to submit an oral presentation",
  "For ACM members, please submit the poster presentation abstract for the annual member report",
];

const abstractTemplateUrl =
  "https://docs.google.com/document/d/15Fa2jXTihLB06bUN2qRHzlDZFFQIVf-H/";

export default function AbstractPage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[#EAF2FB]">
      <SectionHero
        title="Abstract submission"
        subtitle=""
      />

      <div className="content-rail pb-12 pt-8 sm:pb-16 sm:pt-12">
        <div className="grid min-w-0 gap-6 lg:grid-cols-[0.95fr_1.35fr]">
          <aside className="min-w-0 space-y-5">
            <section className="min-w-0 bg-white/85 px-5 py-6 shadow-sm shadow-[#2260AD]/5 sm:px-6">
              <div className="mb-5 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E8F1FA] text-[#2260AD]">
                  <Info className="h-5 w-5" aria-hidden="true" />
                </span>
                <h2 className="text-xl font-black text-[#143D78]">
                  Submission guidance
                </h2>
              </div>
              <ul className="space-y-4">
                {guidanceItems.map((item) => (
                  <li
                    key={item}
                    className="break-words border-l-4 border-[#80AF41] bg-[#F4F8FD] px-4 py-3 text-sm leading-7 text-[#263D5C]"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            <section className="min-w-0 bg-white/85 px-5 py-6 shadow-sm shadow-[#2260AD]/5 sm:px-6">
              <div className="mb-4 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E8F1FA] text-[#2260AD]">
                  <FileText className="h-5 w-5" aria-hidden="true" />
                </span>
                <h2 className="text-xl font-black text-[#143D78]">
                  Abstract template
                </h2>
              </div>
              <p className="break-words text-sm leading-7 text-[#263D5C]">
                Use the provided template before uploading your abstract file.
              </p>
              <a
                href={abstractTemplateUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#2260AD] px-5 py-3 text-center text-sm font-bold text-white transition-colors hover:bg-[#143D78]"
              >
                <Download className="h-4 w-4" aria-hidden="true" />
                Download abstract template
              </a>
            </section>
          </aside>

          <section className="min-w-0 bg-white/85 px-5 py-6 shadow-sm shadow-[#2260AD]/5 sm:px-7">
            <div className="mb-6 border-b border-[#2260AD]/15 pb-4">
              <h2 className="text-2xl font-black text-[#2260AD]">
                Abstract submission
              </h2>
            </div>
            <AbstractForm />
          </section>
        </div>
      </div>
    </div>
  );
}
