import { connectDB } from "@/lib/mongodb";
import { Abstract } from "@/lib/models/abstract";
import { formatAbstractTopic } from "@/lib/abstract-topics";
import { formatAdminDate, parseAuthors } from "@/lib/admin-format";
import {
  AdminEmptyState,
  AdminExportButton,
  AdminPageHeader,
} from "@/components/admin";

export const dynamic = "force-dynamic";

export default async function AdminAbstractsPage() {
  await connectDB();
  const abstracts = await Abstract.find().sort({ submittedAt: -1 }).lean();

  return (
    <div>
      <AdminPageHeader
        title="Abstracts"
        description="Review submitted abstracts and export data."
        count={abstracts.length}
        actions={<AdminExportButton href="/api/export/abstracts" />}
      />

      {abstracts.length === 0 ? (
        <AdminEmptyState message="No abstracts submitted yet." />
      ) : (
        <div className="space-y-4">
          {abstracts.map((a) => {
            const authors = parseAuthors(a.authors);
            const presenting = authors.find((x) => x.role === "presenting");
            const coAuthors = authors.filter((x) => x.role === "co");

            return (
              <article
                key={String(a._id)}
                className="rounded-xl border border-[#2260AD]/10 bg-white p-5 shadow-sm shadow-[#2260AD]/5 sm:p-6"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-xs font-bold text-[#2260AD]">
                    {a.submissionId}
                  </span>
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-bold uppercase tracking-[0.08em] ${
                      a.presentationType === "oral"
                        ? "bg-[#2260AD] text-white"
                        : "bg-[#EEF7E2] text-[#5E822F] ring-1 ring-[#80AF41]/30"
                    }`}
                  >
                    {a.presentationType}
                  </span>
                  <span className="rounded-full bg-[#E8F1FA] px-2.5 py-0.5 text-xs font-semibold text-[#2260AD] ring-1 ring-[#2260AD]/15">
                    {formatAbstractTopic(a.topic)}
                  </span>
                  <span className="ml-auto text-xs tabular-nums text-[#263D5C]/60">
                    {formatAdminDate(a.submittedAt)}
                  </span>
                </div>

                <h2 className="mt-3 text-lg font-bold leading-snug text-[#143D78]">
                  {a.title}
                </h2>

                <div className="mt-4 space-y-3 border-t border-[#2260AD]/10 pt-4">
                  {presenting && (
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.1em] text-[#80AF41]">
                        Presenting author
                      </p>
                      <p className="mt-1 text-sm font-semibold text-[#143D78]">
                        {presenting.name}
                      </p>
                      <p className="text-sm text-[#263D5C]">
                        {presenting.affiliation}
                      </p>
                      <p className="text-sm text-[#2260AD]">
                        {presenting.email ?? a.correspondingEmail}
                      </p>
                    </div>
                  )}

                  {coAuthors.length > 0 && (
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.1em] text-[#2260AD]/70">
                        Co-authors
                      </p>
                      <ul className="mt-2 space-y-2">
                        {coAuthors.map((author, i) => (
                          <li
                            key={`${author.name}-${i}`}
                            className="text-sm text-[#263D5C]"
                          >
                            <span className="font-semibold text-[#143D78]">
                              {author.name}
                            </span>
                            {author.affiliation && (
                              <span className="text-[#263D5C]/80">
                                {" "}
                                — {author.affiliation}
                              </span>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <div className="mt-3 flex flex-wrap gap-1.5">
                  {(a.keywords as string[]).map((k, i) => (
                    <span
                      key={`${k}-${i}`}
                      className="rounded bg-[#F4F8FD] px-2 py-0.5 text-xs font-medium text-[#263D5C]"
                    >
                      {k}
                    </span>
                  ))}
                </div>

                <details className="group mt-4 border-t border-[#2260AD]/10 pt-4">
                  <summary className="cursor-pointer text-sm font-semibold text-[#2260AD] marker:content-none [&::-webkit-details-marker]:hidden">
                    <span className="group-open:hidden">View abstract text</span>
                    <span className="hidden group-open:inline">Hide abstract text</span>
                  </summary>
                  <p className="mt-3 whitespace-pre-wrap text-sm leading-7 text-[#263D5C]">
                    {a.abstractText as string}
                  </p>
                </details>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
