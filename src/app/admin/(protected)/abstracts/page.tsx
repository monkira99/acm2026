import { connectDB } from "@/lib/mongodb";
import { Abstract } from "@/lib/models/abstract";
import {
  formatAbstractSession,
  formatScientistCategory,
} from "@/lib/abstract-topics";
import { formatAdminDate } from "@/lib/admin-format";
import {
  AdminEmptyState,
  AdminExportButton,
  AdminPageHeader,
  AdminResendEmailButton,
  EmailStatus,
} from "@/components/admin";
import { resendAbstractEmailAction } from "@/lib/actions/resend-abstract-email";

export const dynamic = "force-dynamic";

function formatFileSize(size: number): string {
  if (size < 1024 * 1024) return `${Math.ceil(size / 1024)} KB`;
  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
}

function formatCategoryBadge(category: string): string {
  if (!category) return "";
  return category.charAt(0).toUpperCase() + category.slice(1);
}

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
          {abstracts.map((a) => (
            <article
              key={String(a._id)}
              className="rounded-xl border border-[#2260AD]/10 bg-white p-5 shadow-sm shadow-[#2260AD]/5 sm:p-6"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#2260AD]/10 pb-3">
                <span className="font-mono text-sm font-bold text-[#143D78]">
                  {a.submissionId}
                </span>
                <span className="text-xs tabular-nums text-[#263D5C]/60">
                  {formatAdminDate(a.submittedAt)}
                </span>
              </div>

              <div className="mt-3 flex flex-wrap gap-2">
                <span
                  title={formatScientistCategory(a.scientistCategory)}
                  className="rounded-full bg-[#E8F1FA] px-2.5 py-0.5 text-xs font-semibold text-[#2260AD] ring-1 ring-[#2260AD]/15"
                >
                  {formatCategoryBadge(a.scientistCategory)}
                </span>
                <span className="rounded-full bg-[#EEF7E2] px-2.5 py-0.5 text-xs font-semibold text-[#486724] ring-1 ring-[#80AF41]/20">
                  {formatAbstractSession(a.sessionPreference)}
                </span>
              </div>

              <div className="mt-4 space-y-2 text-sm text-[#263D5C]">
                <div>
                  <span className="font-medium text-[#263D5C]/70">
                    Notification email:{" "}
                  </span>
                  <a
                    href={`mailto:${a.notificationEmail}`}
                    className="font-medium text-[#143D78] hover:underline"
                  >
                    {a.notificationEmail}
                  </a>
                </div>
                <div>
                  <span className="font-medium text-[#263D5C]/70">File: </span>
                  <a
                    href={`/api/admin/abstracts/${a.submissionId}/file`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-[#2260AD] underline-offset-2 hover:underline"
                  >
                    {a.fileName}
                  </a>{" "}
                  <span className="text-xs text-[#263D5C]/60">
                    ({formatFileSize(a.fileSize)})
                  </span>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-[#2260AD]/10 pt-3">
                <EmailStatus
                  sent={a.emailSent}
                  sentAt={a.emailSentAt}
                  error={a.lastEmailError}
                />
                <AdminResendEmailButton
                  id={a.submissionId}
                  sent={Boolean(a.emailSent)}
                  resendAction={resendAbstractEmailAction}
                />
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
