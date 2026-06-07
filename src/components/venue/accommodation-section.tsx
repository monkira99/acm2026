import Image from "next/image";
import { CheckCircle2, ExternalLink, MapPin } from "lucide-react";

const hotels = [
  {
    name: "Legend Westlake Hotel",
    description:
      "Our official conference venue. Premium stay located right by scenic West Lake, offering world-class amenities and peaceful lakeside views.",
    location: "Yen Phu 1, West Lake, Hanoi",
    features: [
      "Conference facilities on-site",
      "Lakeside rooms with panoramic views",
      "Restaurant & spa",
    ],
    bookingUrl: "https://www.legendwestlake.com/",
    mapUrl:
      "https://www.google.com/maps/place/Legend+Westlake+Hotel/@21.050502,105.8394434,17z/data=!3m1!4b1!4m9!3m8!1s0x3135abadea7f3b8b:0xc4995ff3342e85c7!5m2!4m1!1i2!8m2!3d21.050502!4d105.8394434!16s%2Fg%2F11y3ncghh1",
    image: "/images/venue/legend-westlake-hotel.webp",
    imageAlt: "Legend Westlake Hotel lakeside view",
  }
];

export function AccommodationSection() {
  return (
    <section className="mt-10">
      <div className="mb-5 flex flex-col gap-2 border-b border-[#2260AD]/20 pb-4 sm:flex-row sm:items-end sm:justify-between">
        <h2 className="text-2xl font-black text-[#2260AD]">Accommodation</h2>
      </div>

      {hotels.map((hotel) => (
        <article
          key={hotel.name}
          className="overflow-hidden border border-[#2260AD]/10 bg-white/85 shadow-sm shadow-[#2260AD]/5"
        >
          <div className="grid gap-0 lg:grid-cols-[minmax(16rem,0.82fr)_minmax(0,1.18fr)]">
            <div className="relative min-h-56 overflow-hidden sm:min-h-64 lg:min-h-full">
              <Image
                src={hotel.image}
                alt={hotel.imageAlt}
                fill
                sizes="(min-width: 1024px) 34vw, 100vw"
                className="object-cover"
              />
            </div>

            <div className="px-5 py-5 sm:px-6 sm:py-6">

              <h3 className="text-2xl font-black text-[#143D78]">
                {hotel.name}
              </h3>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-[#263D5C]">
                {hotel.description}
              </p>

              <div className="mt-4 flex items-start gap-2 text-sm text-[#263D5C]">
                <MapPin
                  size={16}
                  className="mt-0.5 shrink-0 text-[#2260AD]"
                  aria-hidden="true"
                />
                <span>{hotel.location}</span>
              </div>

              <ul className="mt-5 grid gap-2 sm:grid-cols-3">
                {hotel.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2 bg-[#F7FBFF] px-3 py-2 text-sm text-[#263D5C] ring-1 ring-[#2260AD]/10"
                  >
                    <CheckCircle2
                      size={15}
                      className="mt-0.5 shrink-0 text-[#80AF41]"
                      aria-hidden="true"
                    />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-5 flex flex-wrap items-center gap-3">
                <a
                  href={hotel.bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded bg-[#2260AD] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#143D78] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2260AD]"
                >
                  View Details & Book
                  <ExternalLink size={14} aria-hidden="true" />
                </a>
                <a
                  href={hotel.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-sm text-sm font-semibold text-[#2260AD] transition-colors hover:text-[#143D78] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2260AD]"
                >
                  <MapPin size={14} aria-hidden="true" />
                  View on Map
                </a>
              </div>
            </div>
          </div>
        </article>
      ))}
    </section>
  );
}
