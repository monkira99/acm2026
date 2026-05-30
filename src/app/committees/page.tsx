import type { Metadata } from "next";
import { SectionHero } from "@/components/ui/section-hero";
import { ScientificCommitteeCarousel } from "@/components/committees/scientific-committee-carousel";
import { committees } from "@/data/committees";

export const metadata: Metadata = {
  title: "Committees",
  description: "Scientific and organizing committees for ACM23.",
};

export default function CommitteesPage() {
  const scientificCommittee = committees.find(
    (committee) => committee.name === "Scientific committee",
  );
  const organizingCommittee = committees.find(
    (committee) => committee.name === "Organizing committee",
  );

  return (
    <div className="bg-[#EAF2FB]">
      <SectionHero title="Committees" />

      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        {scientificCommittee && (
          <section>
            <ScientificCommitteeCarousel
              title={scientificCommittee.name}
              members={scientificCommittee.members}
            />
          </section>
        )}

        {organizingCommittee && (
          <section className="mt-12">
            <div className="mb-5 flex flex-col gap-1 border-b border-[#2260AD]/20 pb-4 sm:flex-row sm:items-end sm:justify-between">
              <h2 className="text-2xl font-black text-[#2260AD]">
                {organizingCommittee.name}
              </h2>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {organizingCommittee.members.map((member, index) => (
                <div
                  key={`${member.name}-${index}`}
                  className="bg-white/70 px-5 py-4"
                >
                  <p className="text-base font-bold text-[#143D78]">
                    {member.name}
                  </p>
                  {member.titleLines[0] && (
                    <p className="mt-1 text-sm text-[#263D5C]">
                      {member.titleLines[0]}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
