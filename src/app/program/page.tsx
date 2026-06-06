import type { Metadata } from "next";
import { CalendarDays } from "lucide-react";
import { SectionHero } from "@/components/ui/section-hero";
import { program } from "@/data/program";

export const metadata: Metadata = {
  title: "Scientific Program",
  description: "ACM23 tentative scientific program for November 16-18, 2026.",
};

export default function ProgramPage() {
  return (
    <div className="bg-[#EAF2FB]">
      <SectionHero title="Scientific program" />

      <div className="content-rail pb-12 pt-8 sm:pb-16 sm:pt-12">
        <div className="space-y-10">
          {program.map((day) => (
            <section key={day.id}>
              <div className="sticky top-20 z-30 -mx-4 mb-5 border-b border-[#2260AD]/20 bg-[#EAF2FB]/95 px-4 py-4 backdrop-blur sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
                <div className="flex flex-wrap items-center gap-3">
                  <h2 className="text-2xl font-black text-[#2260AD]">
                    {day.day}
                  </h2>
                  <div className="inline-flex items-center gap-2 rounded-full border border-[#2260AD]/20 bg-white/80 px-3 py-1.5 text-sm font-bold text-[#263D5C] shadow-sm shadow-[#2260AD]/5">
                    <CalendarDays
                      size={16}
                      className="text-[#2260AD]"
                      aria-hidden="true"
                    />
                    <span>{day.date}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                {day.sessions.map((session) => {
                  return (
                    <div
                      key={`${day.id}-${session.time}-${session.title}`}
                      className="grid gap-3 bg-white/75 px-4 py-4 shadow-sm shadow-[#2260AD]/5 sm:grid-cols-[9rem_1fr]"
                    >
                      <div className="self-start">
                        <p className="text-sm font-bold leading-7 text-[#2260AD]">
                          {session.time}
                        </p>
                      </div>

                      <div>
                        <h3 className="text-base font-bold leading-7 text-[#143D78] sm:text-lg">
                          {session.title}
                        </h3>

                        {session.description && (
                          <p className="mt-2 text-sm leading-6 text-[#263D5C]">
                            {session.description}
                          </p>
                        )}

                        {session.items && (
                          <ul
                            className={`mt-3 grid gap-1.5 text-sm leading-6 text-[#263D5C] ${
                              session.items.length >= 6
                                ? "sm:grid-flow-col sm:grid-cols-2 sm:grid-rows-3"
                                : "sm:grid-cols-2"
                            }`}
                          >
                            {session.items.map((item) => (
                              <li key={item} className="flex gap-2">
                                <span
                                  className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#80AF41]"
                                  aria-hidden="true"
                                />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
