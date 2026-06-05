import Image from "next/image";
import type { CommitteeMember } from "@/data/committees";

const NAME_PREFIX_PATTERN = /^(?:(?:prof\.|dr\.|ms\.|mr\.|mrs\.)\s*)+/i;

interface ScientificCommitteeCarouselProps {
  members: CommitteeMember[];
  title: string;
}

function getMemberDetails(member: CommitteeMember) {
  const affiliationDetails =
    member.affiliation
      ?.split("\n")
      .map((line) => line.trim())
      .filter(Boolean) ?? [];

  if (affiliationDetails.length > 0) {
    return affiliationDetails;
  }

  return member.titleLines.map((line) => line.trim()).filter(Boolean);
}

function getSortableMemberName(member: CommitteeMember) {
  return member.name.replace(NAME_PREFIX_PATTERN, "").trim();
}

function compareMembersByName(
  firstMember: CommitteeMember,
  secondMember: CommitteeMember,
) {
  const nameComparison = getSortableMemberName(firstMember).localeCompare(
    getSortableMemberName(secondMember),
    "en",
    { sensitivity: "base" },
  );

  if (nameComparison !== 0) {
    return nameComparison;
  }

  return firstMember.name.localeCompare(secondMember.name, "en", {
    sensitivity: "base",
  });
}

export function ScientificCommitteeCarousel({
  members,
  title,
}: ScientificCommitteeCarouselProps) {
  const sortedMembers = members.slice().sort(compareMembersByName);

  return (
    <div>
      <div className="mb-8 border-b border-[#2260AD]/20 pb-4">
        <h2 className="text-2xl font-black text-[#2260AD]">{title}</h2>
      </div>

      <div className="flex flex-wrap justify-center gap-5">
        {sortedMembers.map((member) => {
          const memberDetails = getMemberDetails(member);

          return (
            <article
              key={member.name}
              className="w-full bg-white/80 px-5 py-6 text-center shadow-sm shadow-[#2260AD]/5 sm:w-[calc((100%_-_1.25rem)/2)] xl:w-[calc((100%_-_3.75rem)/4)]"
            >
              {member.image && (
                <div className="mx-auto mb-5 h-32 w-32 overflow-hidden rounded-full border-4 border-white bg-[#E8F1FA] shadow-md shadow-[#2260AD]/15 ring-1 ring-[#2260AD]/15">
                  <div className="relative h-full w-full">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      sizes="128px"
                      className="object-cover"
                    />
                  </div>
                </div>
              )}
              <h2 className="text-lg font-black leading-7 text-[#2260AD]">
                {member.name}
              </h2>
              {memberDetails.length > 0 && (
                <ul className="mt-4 space-y-2 border-t border-[#2260AD]/10 pt-4 text-left text-sm leading-6 text-[#263D5C]">
                  {memberDetails.map((detail) => (
                    <li key={detail} className="flex gap-2">
                      <span
                        className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#80AF41]"
                        aria-hidden="true"
                      />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              )}
            </article>
          );
        })}
      </div>
    </div>
  );
}
