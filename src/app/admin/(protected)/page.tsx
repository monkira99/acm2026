import Link from "next/link";
import { connectDB } from "@/lib/mongodb";
import { Registration } from "@/lib/models/registration";
import { Abstract } from "@/lib/models/abstract";
import { formatAdminDate } from "@/lib/admin-format";
import {
  AdminEmptyState,
  AdminPageHeader,
  AdminStatCard,
} from "@/components/admin";
import { FileText, Globe, Users } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminOverviewPage() {
  await connectDB();
  const [regCount, absCount, countries, recentRegistrations] = await Promise.all([
    Registration.countDocuments(),
    Abstract.countDocuments(),
    Registration.distinct("country"),
    Registration.find().sort({ registeredAt: -1 }).limit(5).lean(),
  ]);

  return (
    <div>
      <AdminPageHeader
        title="Dashboard"
        description="Overview of ACM23 registrations and abstract submissions."
      />

      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <AdminStatCard
          label="Registrations"
          value={regCount}
          icon={Users}
          href="/admin/registrations"
          accent="blue"
        />
        <AdminStatCard
          label="Abstracts"
          value={absCount}
          icon={FileText}
          href="/admin/abstracts"
          accent="green"
        />
        <AdminStatCard
          label="Countries"
          value={countries.length}
          icon={Globe}
          accent="slate"
        />
      </div>

      <section className="rounded-xl border border-[#2260AD]/10 bg-white shadow-sm shadow-[#2260AD]/5">
        <div className="flex items-center justify-between border-b border-[#2260AD]/10 px-5 py-4">
          <h2 className="text-sm font-bold uppercase tracking-[0.12em] text-[#2260AD]">
            Recent registrations
          </h2>
          <Link
            href="/admin/registrations"
            className="text-xs font-semibold text-[#2260AD] hover:underline"
          >
            View all
          </Link>
        </div>

        {recentRegistrations.length === 0 ? (
          <div className="p-6">
            <AdminEmptyState message="No registrations yet." />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#2260AD]/10 bg-[#F4F8FD] text-left text-xs font-bold uppercase tracking-[0.1em] text-[#263D5C]/70">
                  <th className="px-5 py-3">Name</th>
                  <th className="px-5 py-3">Email</th>
                  <th className="px-5 py-3">Country</th>
                  <th className="px-5 py-3">Date</th>
                </tr>
              </thead>
              <tbody>
                {recentRegistrations.map((r) => (
                  <tr
                    key={String(r._id)}
                    className="border-b border-[#2260AD]/5 last:border-0 hover:bg-[#F4F8FD]/50"
                  >
                    <td className="px-5 py-3 font-semibold text-[#143D78]">
                      {r.fullName}
                    </td>
                    <td className="px-5 py-3 text-[#263D5C]">{r.email}</td>
                    <td className="px-5 py-3 text-[#263D5C]">{r.country}</td>
                    <td className="px-5 py-3 tabular-nums text-[#263D5C]/70">
                      {formatAdminDate(r.registeredAt)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
