import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/page-header";
import { sponsors } from "@/data/sponsors";

export const metadata: Metadata = { title: "Sponsors" };

const tiers = ["platinum", "gold", "silver"] as const;
const tierStyles = {
  platinum: { label: "Platinum Sponsors", size: "w-40 h-20" },
  gold: { label: "Gold Sponsors", size: "w-32 h-16" },
  silver: { label: "Silver Sponsors", size: "w-24 h-12" },
};

export default function SponsorsPage() {
  return (
    <>
      <PageHeader title="Sponsors & Partners" subtitle="Organizations supporting ACM23" />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        {tiers.map((tier) => {
          const tierSponsors = sponsors.filter((s) => s.tier === tier);
          if (tierSponsors.length === 0) return null;
          return (
            <section key={tier} className="text-center">
              <h2 className="text-xl font-bold text-dark mb-8">{tierStyles[tier].label}</h2>
              <div className="flex flex-wrap justify-center gap-8">
                {tierSponsors.map((sponsor) => (
                  <a
                    key={sponsor.name}
                    href={sponsor.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${tierStyles[tier].size} rounded-lg bg-light border border-gray-100 flex items-center justify-center text-xs text-gray-400 hover:shadow-md transition-shadow`}
                  >
                    {sponsor.name}
                  </a>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </>
  );
}
