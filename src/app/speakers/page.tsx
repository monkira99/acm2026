import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/page-header";
import { speakers } from "@/data/speakers";
import { User } from "lucide-react";

export const metadata: Metadata = {
  title: "Keynote Speakers",
  description: "Meet the keynote speakers of ACM23 — leading experts in microbial resources.",
};

export default function SpeakersPage() {
  return (
    <>
      <PageHeader title="Keynote Speakers" subtitle="Leading experts in microbial resources and conservation" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {speakers.map((speaker) => (
            <div key={speaker.id} className="rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <User size={64} className="text-white/30" aria-hidden="true" />
              </div>
              <div className="p-6">
                <h3 className="font-bold text-dark text-lg">{speaker.name}</h3>
                <p className="text-sm text-primary font-semibold">{speaker.title}, {speaker.affiliation}</p>
                <p className="text-xs text-gray-400 mt-1">{speaker.country}</p>
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <p className="text-sm font-semibold text-gold">{speaker.talkTitle}</p>
                  <p className="text-sm text-gray-500 mt-2">{speaker.bio}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
