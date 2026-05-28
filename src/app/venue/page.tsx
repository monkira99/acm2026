import type { Metadata } from "next";
import Image from "next/image";
import { Hotel, MapPin, Plane, Utensils } from "lucide-react";
import { SectionHero } from "@/components/ui/section-hero";

export const metadata: Metadata = { title: "Venue & Travel" };

const travelInfo = [
  { icon: Plane, title: "Getting to Hanoi", description: "Noi Bai International Airport (HAN) is served by major airlines across Asia. The airport is approximately 30km from the city center." },
  { icon: Hotel, title: "Accommodation", description: "ACM23 will be held at Legend Westlake Hotel. Accommodation guidance and special rates may be shared with participants when available." },
  { icon: Utensils, title: "Dining", description: "Hanoi is famous for its cuisine — from phở and bún chả to egg coffee. The Old Quarter offers endless culinary adventures." },
  { icon: MapPin, title: "Local Attractions", description: "Visit the Temple of Literature, Hoan Kiem Lake, Ho Chi Minh Mausoleum, and the vibrant Old Quarter during your stay." },
];

const hanoiGallery = [
  {
    src: "/images/venue/one-pillar-pagoda.jpg",
    alt: "One Pillar Pagoda in Hanoi",
    title: "One Pillar Pagoda",
  },
  {
    src: "/images/venue/old-quarter-basket.jpg",
    alt: "Street vendor carrying a flower basket in Hanoi's Old Quarter",
    title: "Old Quarter",
  },
  {
    src: "/images/venue/hoan-kiem-lake.jpg",
    alt: "Hoan Kiem Lake in Hanoi",
    title: "Hoan Kiem Lake",
  },
];

export default function VenuePage() {
  return (
    <div className="bg-[#EAF2FB]">
      <SectionHero title="Venue & Travel" />

      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <section>
          <div className="mb-5 flex flex-col gap-1 border-b border-[#2260AD]/20 pb-4 sm:flex-row sm:items-end sm:justify-between">
            <h2 className="text-2xl font-black text-[#2260AD]">
              Conference Venue
            </h2>
            <p className="text-sm font-bold uppercase tracking-[0.14em] text-[#263D5C]">
              Yen Phu 1, Hanoi
            </p>
          </div>
          <div className="border-l-4 border-[#2260AD] bg-white/80 px-5 py-4 shadow-sm shadow-[#2260AD]/5">
            <p className="text-xl font-black text-[#143D78]">
              Legend Westlake Hotel
            </p>
            <p className="mt-1 text-sm font-bold uppercase tracking-[0.14em] text-[#2260AD]">
              Yen Phu 1, Hanoi, Vietnam
            </p>
          </div>
        </section>

        <section className="mt-12">
          <div className="mb-5 flex flex-col gap-1 border-b border-[#2260AD]/20 pb-4 sm:flex-row sm:items-end sm:justify-between">
            <h2 className="text-2xl font-black text-[#2260AD]">
              Travel Information
            </h2>
            <p className="text-sm font-bold uppercase tracking-[0.14em] text-[#263D5C]">
              Visitor guide
            </p>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {travelInfo.map((item) => (
              <div
                key={item.title}
                className="bg-white/75 px-5 py-5 shadow-sm shadow-[#2260AD]/5"
              >
                <item.icon
                  size={24}
                  className="mb-4 text-[#2260AD]"
                  aria-hidden="true"
                />
                <h3 className="mb-2 text-lg font-bold text-[#143D78]">
                  {item.title}
                </h3>
                <p className="text-sm leading-6 text-[#263D5C]">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-12">
          <div className="mb-5 flex flex-col gap-1 border-b border-[#2260AD]/20 pb-4 sm:flex-row sm:items-end sm:justify-between">
            <h2 className="text-2xl font-black text-[#2260AD]">
              Hanoi Highlights
            </h2>
            <p className="text-sm font-bold uppercase tracking-[0.14em] text-[#263D5C]">
              Around the city
            </p>
          </div>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {hanoiGallery.map((item) => (
              <figure
                key={item.title}
                className="overflow-hidden bg-white/80 shadow-sm shadow-[#2260AD]/5"
              >
                <div className="relative aspect-[4/3]">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <figcaption className="border-t border-[#2260AD]/10 px-4 py-3 text-sm font-semibold text-[#143D78]">
                  {item.title}
                </figcaption>
              </figure>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
