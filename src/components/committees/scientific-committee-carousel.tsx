import Image from "next/image";
import type { CommitteeMember } from "@/data/committees";

const NAME_PREFIX_PATTERN = /^(?:(?:prof\.|dr\.|ms\.|mr\.|mrs\.)\s*)+/i;
const SMALL_LAST_ROW_START_CLASSES: Record<number, string> = {
  1: "sm:col-start-2",
};
const LARGE_LAST_ROW_START_CLASSES: Record<number, string> = {
  1: "xl:col-start-4",
  2: "xl:col-start-3",
  3: "xl:col-start-2",
};

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

function getCenteredLastRowClass(index: number, total: number) {
  const smallRemainder = total % 2;
  const largeRemainder = total % 4;
  const classes: string[] = [];

  if (smallRemainder > 0 && index === total - smallRemainder) {
    classes.push(SMALL_LAST_ROW_START_CLASSES[smallRemainder]);
  }

  if (largeRemainder > 0 && index === total - largeRemainder) {
    classes.push(LARGE_LAST_ROW_START_CLASSES[largeRemainder]);
  }

  return classes.join(" ");
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

      <div className="grid auto-rows-fr gap-5 sm:grid-cols-4 xl:grid-cols-8">
        {sortedMembers.map((member, index) => {
          const memberDetails = getMemberDetails(member);
          const centeredLastRowClass = getCenteredLastRowClass(
            index,
            sortedMembers.length,
          );

          return (
            <article
              key={member.name}
              className={[
                "h-full bg-white/80 px-5 py-6 text-center shadow-sm shadow-[#2260AD]/5 sm:col-span-2",
                centeredLastRowClass,
              ]
                .filter(Boolean)
                .join(" ")}
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
