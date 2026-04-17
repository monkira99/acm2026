import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/page-header";
import { importantDates } from "@/data/dates";
import { Check, Clock } from "lucide-react";

export const metadata: Metadata = { title: "Registration" };

export default function DatesPage() {
  return (
    <>
      <PageHeader title="Registration" subtitle="Registration timeline and abstract submission" />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="space-y-6">
          {importantDates.map((item, i) => (
            <div key={i} className="flex items-start gap-4">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${item.passed ? "bg-accent/10" : "bg-primary/10"}`}>
                {item.passed
                  ? <Check size={18} className="text-accent" aria-hidden="true" />
                  : <Clock size={18} className="text-primary" aria-hidden="true" />
                }
              </div>
              <div className="flex-1 pb-6 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <h3 className={`font-bold ${item.passed ? "text-gray-400" : "text-dark"}`}>{item.label}</h3>
                  <span className={`text-sm font-semibold ${item.passed ? "text-gray-400" : "text-primary"}`}>{item.date}</span>
                </div>
                <p className="text-sm text-gray-500 mt-1">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
