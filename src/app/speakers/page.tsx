import type { Metadata } from "next";
import { speakers } from "@/data/speakers";
import { User } from "lucide-react";

export const metadata: Metadata = {
  title: "Keynote Speakers",
  description: "Meet the keynote speakers of ACM23 — leading experts in microbial resources.",
};

export default function SpeakersPage() {
  return (
    <div className="bg-[#EAF2FB]">
      <section className="bg-[linear-gradient(135deg,#2260AD_0%,#2D78D4_58%,#143D78_100%)]">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
          <div className="mb-5 flex items-center gap-3">
            <span className="h-1.5 w-14 rounded-full bg-white" />
            <span className="h-1.5 w-6 rounded-full bg-[#80AF41]" />
          </div>
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-white/80">
            ACM23 Hanoi
          </p>
          <h1 className="max-w-4xl text-4xl font-black leading-tight text-white sm:text-5xl">
            Keynote Speakers
          </h1>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="mb-8 flex flex-col gap-1 border-b border-[#2260AD]/20 pb-4 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="text-2xl font-black text-[#2260AD]">
            Featured Talks
          </h2>
          <p className="text-sm font-bold uppercase tracking-[0.14em] text-[#263D5C]">
            Microbial Resources
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {speakers.map((speaker) => (
            <article
              key={speaker.id}
              className="overflow-hidden bg-white/80 shadow-sm shadow-[#2260AD]/5 transition-shadow hover:shadow-md hover:shadow-[#2260AD]/10"
            >
              <div className="flex h-44 items-center justify-center bg-[linear-gradient(135deg,#2260AD_0%,#2D78D4_70%,#80AF41_100%)]">
                <div className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-white/80 bg-white/15">
                  <User size={48} className="text-white/80" aria-hidden="true" />
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-lg font-black text-[#2260AD]">
                  {speaker.name}
                </h3>
                <p className="mt-2 text-sm font-semibold leading-6 text-[#263D5C]">
                  {speaker.title}, {speaker.affiliation}
                </p>
                <p className="mt-1 text-xs font-bold uppercase tracking-[0.14em] text-[#80AF41]">
                  {speaker.country}
                </p>

                <div className="mt-5 border-t border-[#2260AD]/10 pt-5">
                  <p className="text-sm font-bold leading-6 text-[#143D78]">
                    {speaker.talkTitle}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-[#263D5C]">
                    {speaker.bio}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
