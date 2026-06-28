import Link from "next/link";
import { FileText, UserCheck, CalendarCheck } from "lucide-react";
import { importantDates } from "@/data/dates";
import { Section, SectionHeading } from "./section";
import { Reveal } from "./reveal";

const abstract = importantDates.find((d) => d.label === "Abstract Submission");
const registration = importantDates.find((d) => d.label === "Registration");

type Kind = "deadline" | "event";

interface Milestone {
  icon: typeof FileText;
  tag: string;
  date: string;
  title: string;
  kind: Kind;
  href: string;
}

const milestones: Milestone[] = [
  {
    icon: FileText,
    tag: "Deadline",
    date: abstract?.date ?? "September 30, 2026",
    title: "Abstract submission closes",
    kind: "deadline",
    href: "/abstract",
  },
  {
    icon: UserCheck,
    tag: "Deadline",
    date: registration?.date ?? "October 31, 2026",
    title: "Registration closes",
    kind: "deadline",
    href: "/registration",
  },
  {
    icon: CalendarCheck,
    tag: "The meeting",
    date: "November 16–18, 2026",
    title: "ACM23 in Hanoi",
    kind: "event",
    href: "/program",
  },
];

export function DatesSection() {
  return (
    <Section id="dates" tone="white">
      <SectionHeading
        eyebrow="Key dates"
        title="Mark your calendar"
        intro="Two deadlines lead up to the meeting. Submit early — abstract review supports both junior and senior scientists."
      />

      <ol className="mt-14 grid gap-5 md:grid-cols-3">
        {milestones.map((m, i) => {
          const isDeadline = m.kind === "deadline";
          const accent = isDeadline ? "#CC212A" : "#80AF41";
          return (
            <Reveal as="li" key={m.title} delay={i * 0.1} className="h-full">
              <Link
                href={m.href}
                className="group relative flex h-full flex-col rounded-2xl border border-[#E2E8F0] bg-white p-7 transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-[#2260AD]/5"
                style={{ borderTopWidth: 3, borderTopColor: accent }}
              >
                <div className="flex items-center justify-between">
                  <span
                    className="flex h-11 w-11 items-center justify-center rounded-xl"
                    style={{ backgroundColor: `${accent}14`, color: accent }}
                  >
                    <m.icon size={20} aria-hidden="true" />
                  </span>
                  <span
                    className="lp-mono rounded-full px-2.5 py-1 text-[0.6rem] font-medium uppercase tracking-[0.16em]"
                    style={{ backgroundColor: `${accent}14`, color: accent }}
                  >
                    {m.tag}
                  </span>
                </div>
                <p className="lp-display mt-6 text-xl font-bold text-[#143D78]">
                  {m.date}
                </p>
                <p className="mt-1.5 text-sm leading-6 text-[#5A6B80]">
                  {m.title}
                </p>
              </Link>
            </Reveal>
          );
        })}
      </ol>
    </Section>
  );
}
