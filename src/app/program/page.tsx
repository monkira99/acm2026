import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/page-header";
import { program } from "@/data/program";

export const metadata: Metadata = {
  title: "Scientific Program",
  description: "ACM23 scientific program for November 16-17, 2026.",
};

const typeColors: Record<string, string> = {
  keynote: "bg-gold text-dark",
  session: "bg-primary text-white",
  workshop: "bg-accent text-white",
  break: "bg-gray-100 text-gray-500",
  social: "bg-secondary text-white",
};

export default function ProgramPage() {
  return (
    <>
      <PageHeader title="Scientific Program" subtitle="November 16-17, 2026" />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {program.map((day) => (
          <div key={day.id} className="mb-12">
            <h2 className="text-2xl font-bold text-dark mb-2">{day.day}</h2>
            <p className="text-sm text-primary font-semibold mb-6">{day.date}</p>
            {day.sessions.length === 0 ? (
              <div className="rounded-xl border border-dashed border-gray-200 bg-gray-50 px-6 py-8 text-gray-500">
                To be updated
              </div>
            ) : (
              <div className="space-y-3">
                {day.sessions.map((session, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <div className="w-32 flex-shrink-0 text-sm text-gray-500 font-medium pt-1">
                      {session.time}
                    </div>
                    <div className="flex-1 p-4 rounded-xl border border-gray-100 hover:shadow-sm transition-shadow">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${typeColors[session.type]}`}>
                          {session.type}
                        </span>
                      </div>
                      <h3 className="font-semibold text-dark">{session.title}</h3>
                      {session.description && (
                        <p className="text-sm text-gray-500 mt-1">{session.description}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
