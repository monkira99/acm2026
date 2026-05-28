import type { Metadata } from "next";
import { CalendarDays, MapPin, Microscope } from "lucide-react";
import { SectionHero } from "@/components/ui/section-hero";
import { program, programOverview, type ProgramSessionType } from "@/data/program";

export const metadata: Metadata = {
  title: "Scientific Program",
  description: "ACM23 tentative scientific program for November 16-18, 2026.",
};

const typeStyles: Record<
  ProgramSessionType,
  { label: string; badge: string; dot: string }
> = {
  assembly: {
    label: "Assembly",
    badge: "bg-[#E8F1FA] text-[#2260AD] ring-[#2260AD]/15",
    dot: "bg-[#2260AD]",
  },
  break: {
    label: "Break",
    badge: "bg-slate-100 text-slate-600 ring-slate-200",
    dot: "bg-[#B0ABAC]",
  },
  ceremony: {
    label: "Ceremony",
    badge: "bg-[#E8F1FA] text-[#2260AD] ring-[#2260AD]/15",
    dot: "bg-[#2260AD]",
  },
  keynote: {
    label: "Keynote",
    badge: "bg-[#2260AD] text-white ring-[#2260AD]",
    dot: "bg-[#2260AD]",
  },
  meal: {
    label: "Meal",
    badge: "bg-[#EEF7E2] text-[#5E822F] ring-[#80AF41]/25",
    dot: "bg-[#80AF41]",
  },
  registration: {
    label: "Registration",
    badge: "bg-[#E8F1FA] text-[#2260AD] ring-[#2260AD]/15",
    dot: "bg-[#2260AD]",
  },
  session: {
    label: "Session",
    badge: "bg-[#E8F1FA] text-[#2260AD] ring-[#2260AD]/15",
    dot: "bg-[#2260AD]",
  },
  tour: {
    label: "Tour",
    badge: "bg-[#EEF7E2] text-[#5E822F] ring-[#80AF41]/25",
    dot: "bg-[#80AF41]",
  },
  "wrap-up": {
    label: "Wrap-up",
    badge: "bg-[#E8F1FA] text-[#2260AD] ring-[#2260AD]/15",
    dot: "bg-[#2260AD]",
  },
};

export default function ProgramPage() {
  return (
    <div className="bg-[#EAF2FB]">
      <SectionHero title="Scientific Program" />

      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <section className="mb-10 grid gap-4 md:grid-cols-3">
          <div className="md:col-span-3">
            <div className="flex items-start gap-3 border-l-4 border-[#2260AD] bg-white/80 px-5 py-4 shadow-sm shadow-[#2260AD]/5">
              <Microscope
                className="mt-1 h-5 w-5 flex-shrink-0 text-[#2260AD]"
                aria-hidden="true"
              />
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#2260AD]">
                  Theme
                </p>
                <p className="mt-1 text-base font-semibold leading-7 text-[#143D78]">
                  {programOverview.theme}
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3 bg-white/70 px-5 py-4">
            <CalendarDays
              className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#2260AD]"
              aria-hidden="true"
            />
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#2260AD]">
                Dates
              </p>
              <p className="mt-1 text-sm font-semibold text-[#263D5C]">
                {programOverview.dates}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 bg-white/70 px-5 py-4 md:col-span-2">
            <MapPin
              className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#2260AD]"
              aria-hidden="true"
            />
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#2260AD]">
                Venue
              </p>
              <p className="mt-1 text-sm font-semibold text-[#263D5C]">
                {programOverview.venue}
              </p>
            </div>
          </div>
        </section>

        <div className="space-y-10">
          {program.map((day) => (
            <section key={day.id}>
              <div className="mb-5 flex flex-col gap-1 border-b border-[#2260AD]/20 pb-4 sm:flex-row sm:items-end sm:justify-between">
                <h2 className="text-2xl font-black text-[#2260AD]">
                  {day.day}
                </h2>
                <p className="text-sm font-bold uppercase tracking-[0.14em] text-[#263D5C]">
                  {day.date}
                </p>
              </div>

              <div className="space-y-3">
                {day.sessions.map((session) => {
                  const style = typeStyles[session.type];

                  return (
                    <div
                      key={`${day.id}-${session.time}-${session.title}`}
                      className="grid gap-3 bg-white/75 px-4 py-4 shadow-sm shadow-[#2260AD]/5 sm:grid-cols-[9rem_1fr]"
                    >
                      <div className="flex items-center gap-3 sm:block">
                        <span
                          className={`hidden h-2.5 w-2.5 rounded-full sm:mb-3 sm:block ${style.dot}`}
                        />
                        <p className="text-sm font-bold text-[#2260AD]">
                          {session.time}
                        </p>
                      </div>

                      <div>
                        <div className="mb-2 flex flex-wrap items-center gap-2">
                          <span
                            className={`inline-flex rounded-full px-2.5 py-1 text-xs font-bold uppercase tracking-[0.12em] ring-1 ${style.badge}`}
                          >
                            {style.label}
                          </span>
                        </div>
                        <h3 className="text-base font-bold text-[#143D78] sm:text-lg">
                          {session.title}
                        </h3>

                        {session.description && (
                          <p className="mt-2 text-sm leading-6 text-[#263D5C]">
                            {session.description}
                          </p>
                        )}

                        {session.items && (
                          <ul className="mt-3 grid gap-1.5 text-sm leading-6 text-[#263D5C] sm:grid-cols-2">
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
