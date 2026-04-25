import type { Metadata } from "next";
import Image from "next/image";
import { PageHeader } from "@/components/ui/page-header";
import { MapPin, Plane, Hotel, Utensils } from "lucide-react";

export const metadata: Metadata = { title: "Venue & Travel" };

const travelInfo = [
  { icon: Plane, title: "Getting to Hanoi", description: "Noi Bai International Airport (HAN) is served by major airlines across Asia. The airport is approximately 30km from the city center." },
  { icon: Hotel, title: "Accommodation", description: "A range of hotels near the conference venue will be recommended. Special rates may be available for ACM23 participants." },
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
    <>
      <PageHeader title="Venue & Travel" subtitle="Everything you need to know about visiting Hanoi" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-dark mb-6">Conference Venue</h2>
          <div className="rounded-2xl bg-light p-8 border border-gray-100">
            <p className="text-gray-600 leading-relaxed">
              The exact venue will be announced soon. ACM23 will be held at a prestigious
              location in Hanoi, easily accessible from major hotels and transportation hubs.
            </p>
          </div>
          <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-3">
            {hanoiGallery.map((item) => (
              <figure
                key={item.title}
                className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm"
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
                <figcaption className="px-4 py-3 text-sm font-semibold text-dark">
                  {item.title}
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-dark mb-6">Travel Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {travelInfo.map((item) => (
              <div key={item.title} className="p-6 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
                <item.icon size={28} className="text-primary mb-4" aria-hidden="true" />
                <h3 className="font-bold text-dark text-lg mb-2">{item.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
