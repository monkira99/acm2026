import type { Metadata } from "next";
import Link from "next/link";
import { SectionHero } from "@/components/ui/section-hero";
import { importantDates } from "@/data/dates";
import { ArrowRight, Check, Clock } from "lucide-react";

export const metadata: Metadata = { title: "Registration" };

const dateActions: Record<string, { href: string }> = {
  "Abstract Submission": {
    href: "/abstract",
  },
  Registration: {
    href: "/registration",
  },
};

export default function DatesPage() {
  return (
    <div className="bg-[#EAF2FB]">
      <SectionHero title="Registration" />

      <div className="content-rail pb-12 pt-8 sm:pb-16 sm:pt-12">
        <section>
          <div className="mb-5 flex flex-col gap-1 border-b border-[#2260AD]/20 pb-4 sm:flex-row sm:items-end sm:justify-between">
            <h2 className="text-2xl font-black text-[#2260AD]">
              Important dates
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {importantDates.map((item) => {
              const action = dateActions[item.label];

              return (
                <Link
                  key={item.label}
                  href={action.href}
                  className="group block h-full cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2260AD]"
                >
                  <article
                    className="flex h-full items-start gap-4 border border-transparent bg-white/75 px-5 py-5 shadow-sm shadow-[#2260AD]/5 transition duration-200 group-hover:-translate-y-0.5 group-hover:border-[#2260AD]/20 group-hover:bg-white group-hover:shadow-md group-hover:shadow-[#2260AD]/10"
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

                    <div className="min-w-0 flex-1">
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

                    <ArrowRight
                      className="ml-auto h-5 w-5 shrink-0 self-center text-[#2260AD]/60 transition duration-200 group-hover:translate-x-1 group-hover:text-[#2260AD]"
                      aria-hidden="true"
                    />
                  </article>
                </Link>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
