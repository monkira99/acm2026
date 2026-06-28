import Link from "next/link";
import { ArrowRight, UserCheck, FileText, Check } from "lucide-react";
import { importantDates } from "@/data/dates";
import { Section, SectionHeading } from "./section";
import { Reveal } from "./reveal";

const abstractDeadline =
  importantDates.find((d) => d.label === "Abstract Submission")?.date ??
  "September 30, 2026";
const registrationDeadline =
  importantDates.find((d) => d.label === "Registration")?.date ??
  "October 31, 2026";

const abstractTemplateUrl =
  "https://docs.google.com/document/d/15Fa2jXTihLB06bUN2qRHzlDZFFQIVf-H/";

const registrationPoints = [
  "Open to researchers across the ACM community and beyond",
  "Three days of sessions, keynotes, and poster presentations",
  "Includes the Day 3 tours in and around Hanoi",
];

const abstractPoints = [
  "Oral presentations welcome from junior and senior scientists",
  "ACM members: submit a poster abstract for the annual member report",
  "Use the official template before uploading your abstract",
];

export function ParticipationSection() {
  return (
    <Section id="participate" tone="tint">
      <SectionHeading
        align="center"
        eyebrow="Take part"
        title="Two ways to join ACM23"
        intro="Register to attend, and submit an abstract to present your work. Both open now."
      />

      <div className="mx-auto mt-14 grid max-w-4xl gap-6 lg:grid-cols-2">
        <Reveal as="div" className="h-full">
          <article className="flex h-full flex-col rounded-2xl border border-[#D6E2F2] bg-white p-7 sm:p-8">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#80AF41]/12 text-[#5C7E2C]">
              <UserCheck size={22} aria-hidden="true" />
            </span>
            <h3 className="lp-display mt-5 text-2xl font-bold text-[#143D78]">
              Register
            </h3>
            <p className="lp-mono mt-2 text-xs uppercase tracking-[0.14em] text-[#CC212A]">
              Closes {registrationDeadline}
            </p>
            <ul className="mt-6 flex-1 space-y-3">
              {registrationPoints.map((point) => (
                <li key={point} className="flex gap-3 text-sm leading-6 text-[#4A5A6F]">
                  <Check size={17} className="mt-0.5 shrink-0 text-[#80AF41]" aria-hidden="true" />
                  {point}
                </li>
              ))}
            </ul>
            <Link
              href="/registration"
              className="group mt-7 inline-flex items-center justify-center gap-2 rounded-lg bg-[#80AF41] px-6 py-3.5 text-sm font-bold text-white transition-colors hover:bg-[#739D3B]"
            >
              Register now
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </Link>
          </article>
        </Reveal>

        <Reveal as="div" delay={0.08} className="h-full">
          <article className="flex h-full flex-col rounded-2xl border border-[#D6E2F2] bg-white p-7 sm:p-8">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#2260AD]/10 text-[#2260AD]">
              <FileText size={22} aria-hidden="true" />
            </span>
            <h3 className="lp-display mt-5 text-2xl font-bold text-[#143D78]">
              Submit an abstract
            </h3>
            <p className="lp-mono mt-2 text-xs uppercase tracking-[0.14em] text-[#CC212A]">
              Closes {abstractDeadline}
            </p>
            <ul className="mt-6 flex-1 space-y-3">
              {abstractPoints.map((point) => (
                <li key={point} className="flex gap-3 text-sm leading-6 text-[#4A5A6F]">
                  <Check size={17} className="mt-0.5 shrink-0 text-[#2260AD]" aria-hidden="true" />
                  {point}
                </li>
              ))}
            </ul>
            <div className="mt-7 flex flex-col gap-2.5 sm:flex-row">
              <Link
                href="/abstract"
                className="group inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-[#2260AD] px-6 py-3.5 text-sm font-bold text-white transition-colors hover:bg-[#143D78] sm:flex-[1.7]"
              >
                Submit abstract
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </Link>
              <a
                href={abstractTemplateUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#2260AD]/30 px-6 py-3.5 text-sm font-semibold text-[#2260AD] transition-colors hover:bg-[#EAF2FB] sm:flex-1"
              >
                Template
              </a>
            </div>
          </article>
        </Reveal>
      </div>
    </Section>
  );
}
