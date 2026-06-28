import type { Metadata } from "next";
import Image from "next/image";
import { SectionHero } from "@/components/ui/section-hero";
import { speakers } from "@/data/speakers";
import { User } from "lucide-react";

export const metadata: Metadata = {
  title: "Keynote Speakers",
  description:
    "Meet the keynote speakers of ACM23 — leading experts in microbial resources.",
};

export default function SpeakersPage() {
  return (
    <div className="bg-[#EAF2FB]">
      <SectionHero title="Keynote speakers" />

      <div className="content-rail pb-12 pt-8 sm:pb-16 sm:pt-12">
        <div className="mb-8 flex flex-col gap-1 border-b border-[#2260AD]/20 pb-4 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="text-2xl font-black text-[#2260AD]">Featured talks</h2>
          <p className="text-sm font-semibold text-[#263D5C]">
            {speakers.length} keynote {speakers.length === 1 ? "lecture" : "lectures"}
          </p>
        </div>

        <div className="mx-auto flex max-w-4xl flex-col gap-6">
          {speakers.map((speaker) => (
            <article
              key={speaker.id}
              className="grid grid-cols-1 overflow-hidden bg-white/80 shadow-sm shadow-[#2260AD]/5 transition-shadow hover:shadow-md hover:shadow-[#2260AD]/10 sm:grid-cols-[14rem_1fr]"
            >
              <div className="relative aspect-[4/3] w-full bg-[linear-gradient(135deg,#2260AD_0%,#2D78D4_70%,#80AF41_100%)] sm:aspect-auto sm:h-full">
                {speaker.imageUrl ? (
                  <Image
                    src={speaker.imageUrl}
                    alt={speaker.name}
                    fill
                    sizes="(min-width: 640px) 14rem, 100vw"
                    className="object-cover object-top"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center">
                    <div className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-white/80 bg-white/15">
                      <User size={48} className="text-white/80" aria-hidden="true" />
                    </div>
                  </div>
                )}
              </div>

              <div className="flex flex-col p-6 sm:p-7">
                <h3 className="text-xl font-black leading-7 text-[#2260AD]">
                  {speaker.name}
                </h3>

                <ul className="mt-3 space-y-1.5 text-sm leading-6 text-[#263D5C]">
                  {speaker.positions.map((position) => (
                    <li key={position} className="flex gap-2">
                      <span
                        className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#80AF41]"
                        aria-hidden="true"
                      />
                      <span>{position}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex items-stretch gap-4 border-t border-[#2260AD]/10 pt-5">
                  <span
                    className="w-1 flex-shrink-0 rounded-full bg-[#80AF41]"
                    aria-hidden="true"
                  />
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#80AF41]">
                      Keynote lecture
                    </p>
                    <p className="mt-1.5 text-lg font-black leading-7 text-[#143D78]">
                      {speaker.talkTitle}
                    </p>
                    {speaker.bio && (
                      <p className="mt-2 text-sm leading-6 text-[#263D5C]">
                        {speaker.bio}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
