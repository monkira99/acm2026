import type { Metadata } from "next";
import { SectionHero } from "@/components/ui/section-hero";
import { TransportationSection } from "@/components/venue/transportation-section";
import { AccommodationSection } from "@/components/venue/accommodation-section";
import { DiscoverHanoiSection } from "@/components/venue/discover-hanoi-section";
import { TasteOfHanoiSection } from "@/components/venue/taste-of-hanoi-section";

export const metadata: Metadata = { title: "Venue & Travel" };

export default function VenuePage() {
  return (
    <div className="bg-[#EAF2FB]">
      <SectionHero title="Venue & Travel" />

      <div className="content-rail pb-12 pt-8 sm:pb-16 sm:pt-12">
        <section>
          <div className="mb-5 flex flex-col gap-1 border-b border-[#2260AD]/20 pb-4 sm:flex-row sm:items-end sm:justify-between">
            <h2 className="text-2xl font-black text-[#2260AD]">
              Conference venue
            </h2>
          </div>
          <div className="space-y-5">
            <div className="border-l-4 border-[#2260AD] bg-white/80 px-5 py-5 shadow-sm shadow-[#2260AD]/5">
              <p className="text-xl font-black text-[#143D78]">
                Legend Westlake Hotel
              </p>
              <p className="mt-1 text-sm font-bold uppercase tracking-[0.14em] text-[#2260AD]">
                Yen Phu 1, Hanoi, Vietnam
              </p>
            </div>

            <div className="overflow-hidden bg-white/80 shadow-sm shadow-[#2260AD]/5 ring-1 ring-[#2260AD]/10">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1861.7772795208873!2d105.83835794897148!3d21.050501996553376!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135abadea7f3b8b%3A0xc4995ff3342e85c7!2sLegend%20Westlake%20Hotel!5e0!3m2!1svi!2s!4v1780136363489!5m2!1svi!2s"
                title="Map to Legend Westlake Hotel"
                className="h-[340px] w-full border-0 sm:h-[430px]"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </section>

        <TransportationSection />

        <AccommodationSection />

        <DiscoverHanoiSection />

        <TasteOfHanoiSection />
      </div>
    </div>
  );
}
