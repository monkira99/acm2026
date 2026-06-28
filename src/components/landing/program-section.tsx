import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { program } from "@/data/program";
import { Section, SectionHeading } from "./section";
import { Reveal } from "./reveal";

/** A short, honest highlight list per day, derived from the schedule. */
const dayHighlights: Record<string, string[]> = {
  "day-1": [
    "Opening ceremony & keynote lectures",
    "Scientific Sessions 1–3",
    "Coffee breaks & poster presentations",
  ],
  "day-2": [
    "ACM23 General Assembly & Task Force report",
    "Scientific Sessions 4–5",
    "Wrap-up",
  ],
  "day-3": [
    "Tour: VNU Hanoi new campus",
    "Vietnam National Village for Ethnic Culture & Tourism",
  ],
};

// Facts counted from the schedule — not invented.
const facts = [
  { value: "3", label: "Days" },
  { value: "5", label: "Scientific sessions" },
  { value: "2", label: "Keynote lectures" },
  { value: "Posters", label: "ACM member reports" },
];

export function ProgramSection() {
  return (
    <Section id="program" tone="white">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <SectionHeading
          eyebrow="Programme"
          title="Three days in Hanoi"
          intro="Keynotes, oral presentations, poster sessions, the General Assembly, and a closing day of tours — 16–18 November 2026."
        />
        <Reveal>
          <Link
            href="/program"
            className="group inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-[#2260AD] hover:text-[#143D78]"
          >
            Full programme
            <ArrowRight
              size={16}
              className="transition-transform group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </Link>
        </Reveal>
      </div>

      <div className="mt-14 grid gap-5 lg:grid-cols-3">
        {program.map((day, i) => (
          <Reveal as="div" key={day.id} delay={i * 0.08} className="h-full">
            <article className="flex h-full flex-col rounded-2xl border border-[#E2E8F0] bg-white p-7 shadow-sm shadow-[#2260AD]/5">
              <p className="lp-mono text-[0.7rem] font-medium uppercase tracking-[0.2em] text-[#80AF41]">
                Day {i + 1}
              </p>
              <h3 className="lp-display mt-2 text-xl font-bold text-[#143D78]">
                {day.day}
              </h3>
              <p className="lp-mono mt-1 text-xs text-[#8895A7]">{day.date}</p>
              <ul className="mt-5 space-y-3 border-t border-[#EDF2F8] pt-5">
                {dayHighlights[day.id]?.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 text-sm leading-6 text-[#4A5A6F]"
                  >
                    <span
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#2260AD]/40"
                      aria-hidden="true"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal>
        <dl className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-[#E2E8F0] sm:grid-cols-4">
          {facts.map((fact) => (
            <div key={fact.label} className="bg-[#EAF2FB] px-6 py-7 text-center">
              <dt className="sr-only">{fact.label}</dt>
              <dd>
                <span className="lp-display block text-3xl font-bold text-[#2260AD]">
                  {fact.value}
                </span>
                <span className="lp-mono mt-2 block text-[0.65rem] uppercase tracking-[0.16em] text-[#6B7B90]">
                  {fact.label}
                </span>
              </dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </Section>
  );
}
