import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Users } from "lucide-react";
import { committees } from "@/data/committees";
import { Section, SectionHeading } from "./section";
import { Reveal } from "./reveal";

const scientific = committees.find((c) => c.name === "Scientific committee");
const organizing = committees.find((c) => c.name === "Organizing committee");

function initials(name: string) {
  const parts = name.replace(/^(Dr\.|Prof\.|Assoc\.|Ms\.|Mr\.|MSc\.)\s*/gi, "").trim().split(/\s+/);
  return (parts[0]?.[0] ?? "") + (parts[parts.length - 1]?.[0] ?? "");
}

export function CommitteesSection() {
  return (
    <Section id="committees" tone="tint">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <SectionHeading
          eyebrow="Committees"
          title="Led by the region's collections"
          intro="ACM23 is guided by a Scientific Committee of culture-collection leaders from across Asia, with an Organizing Committee hosted by IMBT, VNU Hanoi."
        />
        <Reveal>
          <Link
            href="/committees"
            className="group inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-[#2260AD] hover:text-[#143D78]"
          >
            All committees
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </Link>
        </Reveal>
      </div>

      {scientific ? (
        <div className="mt-14">
          <h3 className="lp-mono text-[0.7rem] font-medium uppercase tracking-[0.2em] text-[#2260AD]">
            Scientific committee
          </h3>
          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {scientific.members.map((member, i) => (
              <Reveal as="div" key={member.name} delay={(i % 5) * 0.05} className="h-full">
                <article className="flex h-full flex-col items-center rounded-2xl border border-[#D6E2F2] bg-white p-5 text-center">
                  <div className="relative h-20 w-20 overflow-hidden rounded-full bg-[#EAF2FB] ring-1 ring-[#2260AD]/10">
                    {member.image ? (
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        sizes="80px"
                        className="object-cover"
                      />
                    ) : (
                      <span className="lp-display flex h-full w-full items-center justify-center text-lg font-bold text-[#9DB2CC]">
                        {initials(member.name)}
                      </span>
                    )}
                  </div>
                  <p className="lp-display mt-4 text-sm font-semibold leading-snug text-[#143D78]">
                    {member.name}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      ) : null}

      {organizing ? (
        <Reveal>
          <div className="mt-12 rounded-2xl border border-[#D6E2F2] bg-white p-7 sm:p-8">
            <h3 className="lp-mono flex items-center gap-2 text-[0.7rem] font-medium uppercase tracking-[0.2em] text-[#2260AD]">
              <Users size={14} aria-hidden="true" /> Organizing committee
            </h3>
            <ul className="mt-5 grid gap-x-6 gap-y-2.5 sm:grid-cols-2 lg:grid-cols-3">
              {organizing.members.map((member) => (
                <li
                  key={member.name}
                  className="flex items-center gap-2.5 text-sm text-[#3F5067]"
                >
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#80AF41]" aria-hidden="true" />
                  {member.name}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      ) : null}
    </Section>
  );
}
