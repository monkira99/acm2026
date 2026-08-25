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
import { FileText } from "lucide-react";

export const dynamic = "force-dynamic";

function formatFileSize(size: number): string {
  if (!size) return "0 KB";
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
        description="All submitted conference abstracts."
        count={abstracts.length}
        actions={<AdminExportButton href="/api/export/abstracts" />}
      />

      {abstracts.length === 0 ? (
        <AdminEmptyState message="No abstracts submitted yet." />
      ) : (
        <div className="overflow-hidden rounded-xl border border-[#2260AD]/10 bg-white shadow-sm shadow-[#2260AD]/5">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1000px] text-sm">
              <thead>
                <tr className="border-b border-[#2260AD]/10 bg-[#F4F8FD] text-left text-xs font-bold uppercase tracking-[0.1em] text-[#263D5C]/70">
                  <th className="px-4 py-3">ID</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Scientist</th>
                  <th className="px-4 py-3">Preferred Session</th>
                  <th className="px-4 py-3">File</th>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Confirmation Email</th>
                </tr>
              </thead>
              <tbody>
                {abstracts.map((a) => (
                  <tr
                    key={String(a._id)}
                    className="border-b border-[#2260AD]/5 last:border-0 hover:bg-[#F4F8FD]/50"
                  >
                    <td className="whitespace-nowrap px-4 py-3 font-mono text-xs font-semibold text-[#2260AD]">
                      {a.submissionId}
                    </td>
                    <td className="max-w-[200px] truncate px-4 py-3 text-[#263D5C]">
                      <a
                        href={`mailto:${a.notificationEmail}`}
                        title={a.notificationEmail}
                        className="hover:text-[#2260AD] hover:underline"
                      >
                        {a.notificationEmail}
                      </a>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        title={formatScientistCategory(a.scientistCategory)}
                        className="inline-flex whitespace-nowrap rounded-full bg-[#E8F1FA] px-2.5 py-0.5 text-xs font-semibold text-[#2260AD]"
                      >
                        {formatCategoryBadge(a.scientistCategory)}
                      </span>
                    </td>
                    <td className="max-w-[200px] px-4 py-3">
                      <span
                        title={formatAbstractSession(a.sessionPreference)}
                        className="inline-flex max-w-full truncate whitespace-nowrap rounded-full bg-[#EEF7E2] px-2.5 py-0.5 text-xs font-semibold text-[#486724]"
                      >
                        {formatAbstractSession(a.sessionPreference)}
                      </span>
                    </td>
                    <td className="max-w-[220px] px-4 py-3">
                      <a
                        href={`/api/admin/abstracts/${a.submissionId}/file`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex max-w-full items-center gap-1.5 font-medium text-[#2260AD] underline-offset-2 hover:underline"
                        title={a.fileName}
                      >
                        <FileText size={14} className="shrink-0 text-[#2260AD]" />
                        <span className="truncate">{a.fileName}</span>
                      </a>
                      <span className="ml-1.5 text-xs text-[#263D5C]/50">
                        {formatFileSize(a.fileSize)}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 tabular-nums text-[#263D5C]/70">
                      {formatAdminDate(a.submittedAt)}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3">
                      <div className="flex items-center gap-3">
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
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
