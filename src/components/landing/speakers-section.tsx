import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Mic2 } from "lucide-react";
import { speakers } from "@/data/speakers";
import { Section, SectionHeading } from "./section";
import { Reveal } from "./reveal";

export function SpeakersSection() {
  return (
    <Section id="speakers" tone="tint">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <SectionHeading
          eyebrow="Speakers"
          title="Keynote lectures"
          intro="Distinguished scientists open the meeting with keynote lectures. More invited speakers will be announced."
        />
        <Reveal>
          <Link
            href="/speakers"
            className="group inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-[#2260AD] hover:text-[#143D78]"
          >
            All speakers
            <ArrowRight
              size={16}
              className="transition-transform group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </Link>
        </Reveal>
      </div>

      <div className="mt-14 grid gap-6 sm:grid-cols-2">
        {speakers.map((speaker, i) => {
          const announced = Boolean(speaker.imageUrl);
          return (
            <Reveal as="div" key={speaker.id} delay={i * 0.08} className="h-full">
              <article className="flex h-full gap-5 rounded-2xl border border-[#D6E2F2] bg-white p-6 sm:p-7">
                <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl bg-[#EAF2FB] ring-1 ring-[#2260AD]/10 sm:h-28 sm:w-28">
                  {announced && speaker.imageUrl ? (
                    <Image
                      src={speaker.imageUrl}
                      alt={speaker.name}
                      fill
                      sizes="112px"
                      className="object-cover"
                    />
                  ) : (
                    <span className="flex h-full w-full items-center justify-center text-[#9DB2CC]">
                      <Mic2 size={28} aria-hidden="true" />
                    </span>
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <p className="lp-display text-lg font-bold leading-tight text-[#143D78]">
                    {announced ? speaker.name : "To be announced"}
                  </p>
                  {announced ? (
                    <p className="mt-1.5 text-xs leading-5 text-[#6B7B90]">
                      {speaker.positions[0]}
                    </p>
                  ) : (
                    <p className="lp-mono mt-2 inline-block rounded-full bg-[#EAF2FB] px-2.5 py-0.5 text-[0.6rem] uppercase tracking-[0.16em] text-[#2260AD]">
                      Speaker to be confirmed
                    </p>
                  )}
                  <p className="mt-3 border-t border-[#EDF2F8] pt-3 text-sm leading-6 text-[#3F5067]">
                    {speaker.talkTitle}
                  </p>
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
