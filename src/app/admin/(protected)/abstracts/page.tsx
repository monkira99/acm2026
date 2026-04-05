import { connectDB } from "@/lib/mongodb";
import { Abstract } from "@/lib/models/abstract";
import { Download, ExternalLink } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminAbstractsPage() {
  await connectDB();
  const abstracts = await Abstract.find().sort({ submittedAt: -1 }).lean();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-dark">
          Abstracts ({abstracts.length})
        </h1>
        <a
          href="/api/export/abstracts"
          className="flex items-center gap-2 bg-dark text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-dark/90 transition-colors"
        >
          <Download size={16} aria-hidden="true" /> Export CSV
        </a>
      </div>

      <div className="space-y-4">
        {abstracts.map((a) => (
          <div key={String(a._id)} className="bg-white rounded-xl border border-gray-100 p-6">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-mono text-xs text-primary">{a.submissionId}</span>
                  <span
                    className={`text-xs px-2 py-0.5 rounded ${
                      a.presentationType === "oral"
                        ? "bg-gold/10 text-gold"
                        : "bg-secondary/10 text-secondary"
                    }`}
                  >
                    {a.presentationType}
                  </span>
                </div>
                <h3 className="font-bold text-dark">{a.title}</h3>
                <p className="text-sm text-gray-500 mt-1">
                  {a.authors} — {a.affiliation}
                </p>
                <p className="text-sm text-gray-500">{a.correspondingEmail}</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {(a.keywords as string[]).map((k: string, i: number) => (
                    <span
                      key={`${k}-${i}`}
                      className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded"
                    >
                      {k}
                    </span>
                  ))}
                </div>
              </div>
              {a.pdfFileUrl && (
                <a
                  href={`/api/admin/blob?url=${encodeURIComponent(a.pdfFileUrl as string)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-sm text-primary hover:underline flex-shrink-0"
                >
                  PDF <ExternalLink size={14} aria-hidden="true" />
                </a>
              )}
            </div>
            <details className="mt-4">
              <summary className="text-sm text-primary cursor-pointer font-semibold list-none">
                View Abstract
              </summary>
              <p className="text-sm text-gray-600 mt-2 leading-relaxed whitespace-pre-wrap">
                {a.abstractText as string}
              </p>
            </details>
          </div>
        ))}
        {abstracts.length === 0 && (
          <div className="text-center py-12 text-gray-400">No abstracts submitted yet</div>
        )}
      </div>
    </div>
  );
}
