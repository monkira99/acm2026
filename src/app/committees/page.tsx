import type { Metadata } from "next";
import { SectionHero } from "@/components/ui/section-hero";
import { ScientificCommitteeCarousel } from "@/components/committees/scientific-committee-carousel";
import { committees } from "@/data/committees";

const ORGANIZING_LAST_ROW_START_CLASSES: Record<number, string> = {
  1: "sm:col-start-3",
  2: "sm:col-start-2",
};

export const metadata: Metadata = {
  title: "Committees",
  description: "Scientific and organizing committees for ACM23.",
};

function getOrganizingCardPlacementClass(index: number, total: number) {
  const remainder = total % 3;

  if (remainder === 0 || index !== total - remainder) {
    return "";
  }

  return ORGANIZING_LAST_ROW_START_CLASSES[remainder];
}

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

      <div className="content-rail pb-12 pt-8 sm:pb-16 sm:pt-12">
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
            <div className="grid auto-rows-fr gap-3 sm:grid-cols-6">
              {organizingCommittee.members.map((member, index) => (
                <div
                  key={`${member.name}-${index}`}
                  className={[
                    "h-full bg-white/70 px-5 py-4 sm:col-span-2",
                    getOrganizingCardPlacementClass(
                      index,
                      organizingCommittee.members.length,
                    ),
                  ]
                    .filter(Boolean)
                    .join(" ")}
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
