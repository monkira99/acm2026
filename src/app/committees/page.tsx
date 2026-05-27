import type { Metadata } from "next";
import Image from "next/image";
import { committees } from "@/data/committees";

export const metadata: Metadata = {
  title: "Committees",
  description: "Scientific and organizing committees for ACM23.",
};

export default function CommitteesPage() {
  const scientificCommittee = committees.find(
    (committee) => committee.name === "Scientific Committee",
  );
  const organizingCommittee = committees.find(
    (committee) => committee.name === "Organizing Committee",
  );

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
            Committees
          </h1>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        {scientificCommittee && (
          <section>
            <div className="mb-8 flex flex-col gap-1 border-b border-[#2260AD]/20 pb-4 sm:flex-row sm:items-end sm:justify-between">
              <h2 className="text-2xl font-black text-[#2260AD]">
                {scientificCommittee.name}
              </h2>
              <p className="text-sm font-bold uppercase tracking-[0.14em] text-[#263D5C]">
                Scientific Advisory
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
              {scientificCommittee.members.map((member) => (
                <article
                  key={member.name}
                  className="bg-white/80 px-5 py-6 text-center shadow-sm shadow-[#2260AD]/5"
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
                  <div className="mt-3 space-y-1.5">
                    {member.titleLines.map((line) => (
                      <p
                        key={line}
                        className="text-sm font-semibold leading-6 text-[#263D5C]"
                      >
                        {line}
                      </p>
                    ))}
                  </div>
                  {member.affiliation && (
                    <p className="mt-4 border-t border-[#2260AD]/10 pt-4 text-sm leading-6 text-slate-600">
                      {member.affiliation}
                    </p>
                  )}
                </article>
              ))}
            </div>
          </section>
        )}

        {organizingCommittee && (
          <section className="mt-12">
            <div className="mb-5 flex flex-col gap-1 border-b border-[#2260AD]/20 pb-4 sm:flex-row sm:items-end sm:justify-between">
              <h2 className="text-2xl font-black text-[#2260AD]">
                {organizingCommittee.name}
              </h2>
              <p className="text-sm font-bold uppercase tracking-[0.14em] text-[#263D5C]">
                To be announced
              </p>
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
                  <p className="mt-1 text-sm text-[#263D5C]">
                    {member.titleLines[0]}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
