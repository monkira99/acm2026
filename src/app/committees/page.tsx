import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/page-header";
import { committees } from "@/data/committees";

export const metadata: Metadata = { title: "Committees" };

export default function CommitteesPage() {
  return (
    <>
      <PageHeader title="Committees" subtitle="The people behind ACM23" />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
        {committees.map((committee) => (
          <section key={committee.name}>
            <h2 className="text-2xl font-bold text-dark mb-6">{committee.name}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {committee.members.map((member, i) => (
                <div key={i} className="p-4 rounded-xl border border-gray-100">
                  <div className="font-semibold text-dark">{member.name}</div>
                  <div className="text-sm text-gray-500">{member.affiliation}</div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </>
  );
}
