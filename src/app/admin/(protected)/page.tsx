import { connectDB } from "@/lib/mongodb";
import { Registration } from "@/lib/models/registration";
import { Abstract } from "@/lib/models/abstract";

export const dynamic = "force-dynamic";

export default async function AdminOverviewPage() {
  await connectDB();
  const [regCount, absCount, countries] = await Promise.all([
    Registration.countDocuments(),
    Abstract.countDocuments(),
    Registration.distinct("country"),
  ]);

  const stats = [
    { label: "Total Registrations", value: regCount, color: "text-primary" },
    { label: "Abstracts Submitted", value: absCount, color: "text-gold" },
    { label: "Countries", value: countries.length, color: "text-accent" },
  ];

  const recentRegistrations = await Registration.find()
    .sort({ registeredAt: -1 })
    .limit(5)
    .lean();

  return (
    <div>
      <h1 className="text-2xl font-bold text-dark mb-6">Dashboard Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {stats.map((s) => (
          <div key={s.label} className="bg-white rounded-xl p-6 border border-gray-100">
            <div className="text-xs text-gray-400 uppercase tracking-wider">{s.label}</div>
            <div className={`text-3xl font-extrabold mt-1 ${s.color}`}>{s.value}</div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 font-bold text-dark">
          Recent Registrations
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-left text-gray-500">
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Email</th>
                <th className="px-6 py-3">Country</th>
                <th className="px-6 py-3">Date</th>
              </tr>
            </thead>
            <tbody>
              {recentRegistrations.map((r) => (
                <tr key={String(r._id)} className="border-t border-gray-50">
                  <td className="px-6 py-3 font-medium text-dark">{r.fullName}</td>
                  <td className="px-6 py-3 text-gray-500">{r.email}</td>
                  <td className="px-6 py-3 text-gray-500">{r.country}</td>
                  <td className="px-6 py-3 text-gray-400">
                    {new Date(r.registeredAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
              {recentRegistrations.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-gray-400">
                    No registrations yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
