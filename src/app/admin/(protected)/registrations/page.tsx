import { connectDB } from "@/lib/mongodb";
import { Registration } from "@/lib/models/registration";
import { Download } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminRegistrationsPage() {
  await connectDB();
  const registrations = await Registration.find().sort({ registeredAt: -1 }).lean();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-dark">
          Registrations ({registrations.length})
        </h1>
        <a
          href="/api/export/registrations"
          className="flex items-center gap-2 bg-dark text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-dark/90 transition-colors"
        >
          <Download size={16} aria-hidden="true" /> Export CSV
        </a>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 text-left text-gray-500">
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
              <tr key={String(r._id)} className="border-t border-gray-50 hover:bg-gray-50">
                <td className="px-4 py-3 font-mono text-xs text-primary">{r.confirmationId}</td>
                <td className="px-4 py-3 font-medium text-dark">{r.fullName}</td>
                <td className="px-4 py-3 text-gray-500">{r.email}</td>
                <td className="px-4 py-3 text-gray-500">{r.affiliation}</td>
                <td className="px-4 py-3 text-gray-500">{r.country}</td>
                <td className="px-4 py-3">
                  <span className="bg-primary/10 text-primary text-xs px-2 py-0.5 rounded">
                    {r.role}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-400 text-xs">
                  {new Date(r.registeredAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
            {registrations.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-gray-400">
                  No registrations yet
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
