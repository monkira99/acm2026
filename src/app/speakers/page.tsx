import type { Metadata } from "next";
import { SectionHero } from "@/components/ui/section-hero";
import { speakers } from "@/data/speakers";
import { User } from "lucide-react";

export const metadata: Metadata = {
  title: "Keynote Speakers",
  description: "Meet the keynote speakers of ACM23 — leading experts in microbial resources.",
};

export default function SpeakersPage() {
  return (
    <div className="bg-[#EAF2FB]">
      <SectionHero title="Keynote speakers" />

      <div className="content-rail pb-12 pt-8 sm:pb-16 sm:pt-12">
        <div className="mb-8 flex flex-col gap-1 border-b border-[#2260AD]/20 pb-4 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="text-2xl font-black text-[#2260AD]">
            Featured talks
          </h2>
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
