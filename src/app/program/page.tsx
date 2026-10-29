import type { Metadata } from "next";
import { CalendarDays } from "lucide-react";
import { SectionHero } from "@/components/ui/section-hero";
import { program } from "@/data/program";

export const metadata: Metadata = {
  title: "Scientific Program",
  description: "ACM23 scientific program for November 16-18, 2026.",
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
                {day.sessions.map((session) => (
                  <div
                    key={`${day.id}-${session.time}-${session.title}`}
                    className="bg-white/75 px-4 py-4 shadow-sm shadow-[#2260AD]/5"
                  >
                    <div className="grid gap-3 sm:grid-cols-[9rem_1fr]">
                      <p className="text-sm font-bold leading-7 tabular-nums text-[#2260AD]">
                        {session.time}
                      </p>

                      <div className="min-w-0">
                        <h3 className="text-base font-bold leading-7 text-[#143D78] sm:text-lg">
                          {session.title}
                        </h3>

                        {session.description && (
                          <p className="mt-2 max-w-[75ch] text-sm leading-6 text-[#263D5C]">
                            {session.description}
                          </p>
                        )}
                      </div>
                    </div>

                    {session.talks && (
                      <ol className="mt-4 divide-y divide-[#2260AD]/15 border-t border-[#2260AD]/15">
                        {session.talks.map((talk) => (
                          <li
                            key={`${talk.time}-${talk.title}`}
                            className="grid gap-3 py-5 last:pb-0 sm:grid-cols-[9rem_1fr]"
                          >
                            <p className="text-sm font-bold leading-7 tabular-nums text-[#2260AD]">
                              {talk.time}
                            </p>
                            <div className="min-w-0 max-w-[75ch]">
                              <h4 className="text-base font-bold leading-7 text-[#143D78]">
                                {talk.keynote && `${talk.keynote}: `}
                                {talk.title}
                              </h4>
                              <p className="mt-2 text-sm font-semibold leading-6 text-[#263D5C]">
                                {talk.speaker}
                              </p>
                              <p className="text-sm leading-6 text-[#263D5C]">
                                {talk.affiliation}
                              </p>
                            </div>
                          </li>
                        ))}
                      </ol>
                    )}
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
