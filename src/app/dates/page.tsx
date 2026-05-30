import type { Metadata } from "next";
import { SectionHero } from "@/components/ui/section-hero";
import { importantDates } from "@/data/dates";
import { Check, Clock } from "lucide-react";

export const metadata: Metadata = { title: "Registration" };

export default function DatesPage() {
  return (
    <div className="bg-[#EAF2FB]">
      <SectionHero title="Registration" />

      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <section>
          <div className="mb-5 flex flex-col gap-1 border-b border-[#2260AD]/20 pb-4 sm:flex-row sm:items-end sm:justify-between">
            <h2 className="text-2xl font-black text-[#2260AD]">
              Important dates
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {importantDates.map((item) => (
              <article
                key={item.label}
                className="flex items-start gap-4 bg-white/75 px-5 py-5 shadow-sm shadow-[#2260AD]/5"
              >
                <div
                  className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full ${
                    item.passed ? "bg-[#80AF41]/10" : "bg-[#2260AD]/10"
                  }`}
                >
                  {item.passed ? (
                    <Check
                      size={18}
                      className="text-[#80AF41]"
                      aria-hidden="true"
                    />
                  ) : (
                    <Clock
                      size={18}
                      className="text-[#2260AD]"
                      aria-hidden="true"
                    />
                  )}
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#2260AD]">
                    {item.label}
                  </p>
                  <h3
                    className={`mt-2 text-xl font-black ${
                      item.passed ? "text-[#B0ABAC]" : "text-[#143D78]"
                    }`}
                  >
                    {item.date}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-[#263D5C]">
                    {item.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
