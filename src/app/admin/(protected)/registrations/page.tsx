import { connectDB } from "@/lib/mongodb";
import { Registration } from "@/lib/models/registration";
import { formatAdminDate, formatRole } from "@/lib/admin-format";
import {
  AdminEmptyState,
  AdminExportButton,
  AdminPageHeader,
} from "@/components/admin";

export const dynamic = "force-dynamic";

export default async function AdminRegistrationsPage() {
  await connectDB();
  const registrations = await Registration.find()
    .sort({ registeredAt: -1 })
    .lean();

  return (
    <div>
      <AdminPageHeader
        title="Registrations"
        description="All conference registration submissions."
        count={registrations.length}
        actions={<AdminExportButton href="/api/export/registrations" />}
      />

      {registrations.length === 0 ? (
        <AdminEmptyState message="No registrations submitted yet." />
      ) : (
        <div className="overflow-hidden rounded-xl border border-[#2260AD]/10 bg-white shadow-sm shadow-[#2260AD]/5">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px] text-sm">
              <thead>
                <tr className="border-b border-[#2260AD]/10 bg-[#F4F8FD] text-left text-xs font-bold uppercase tracking-[0.1em] text-[#263D5C]/70">
                  <th className="px-4 py-3">ID</th>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Affiliation</th>
                  <th className="px-4 py-3">Country</th>
                  <th className="px-4 py-3">Role</th>
                  <th className="px-4 py-3">Date</th>
                </tr>
              </thead>
              <tbody>
                {registrations.map((r) => (
                  <tr
                    key={String(r._id)}
                    className="border-b border-[#2260AD]/5 last:border-0 hover:bg-[#F4F8FD]/50"
                  >
                    <td className="px-4 py-3 font-mono text-xs font-semibold text-[#2260AD]">
                      {r.confirmationId}
                    </td>
                    <td className="px-4 py-3 font-semibold text-[#143D78]">
                      {r.fullName}
                    </td>
                    <td className="px-4 py-3 text-[#263D5C]">{r.email}</td>
                    <td className="max-w-[200px] truncate px-4 py-3 text-[#263D5C]">
                      {r.affiliation}
                    </td>
                    <td className="px-4 py-3 text-[#263D5C]">{r.country}</td>
                    <td className="px-4 py-3">
                      <span className="inline-flex rounded-full bg-[#E8F1FA] px-2.5 py-0.5 text-xs font-semibold text-[#2260AD]">
                        {formatRole(r.role)}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 tabular-nums text-[#263D5C]/70">
                      {formatAdminDate(r.registeredAt)}
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
