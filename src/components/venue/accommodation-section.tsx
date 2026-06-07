import { MapPin, ExternalLink } from "lucide-react";
import { VenueDetailRow } from "./venue-detail-row";

const hotels = [
  {
    name: "Legend Westlake Hotel",
    starRating: "Premium Lakeside Hotel",
    description:
      "Our official conference venue. Premium stay located right by scenic West Lake, offering world-class amenities and peaceful lakeside views.",
    location: "Yen Phu 1, West Lake, Hanoi",
    distance: "At Venue",
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
    <section className="mt-12">
      <div className="mb-5 flex flex-col gap-1 border-b border-[#2260AD]/20 pb-4 sm:flex-row sm:items-end sm:justify-between">
        <h2 className="text-2xl font-black text-[#2260AD]">Accommodation</h2>
      </div>

      <div className="space-y-6">
        {hotels.map((hotel, index) => (
          <VenueDetailRow
            key={hotel.name}
            image={hotel.image}
            imageAlt={hotel.imageAlt}
            aspect="hotel"
            reversed={index % 2 === 1}
          >
            <div className="mb-3 flex flex-wrap items-center gap-2">
              {hotel.starRating && (
                <p className="text-xs font-semibold uppercase tracking-wide text-[#2260AD]">
                  {hotel.starRating}
                </p>
              )}
              <span className="rounded bg-[#2260AD]/10 px-2 py-1 text-xs font-bold text-[#2260AD]">
                {hotel.distance}
              </span>
            </div>

            <h3 className="mb-2 text-xl font-black text-[#143D78] sm:text-2xl">
              {hotel.name}
            </h3>
            <p className="mb-3 text-sm leading-6 text-[#263D5C]">
              {hotel.description}
            </p>

            <div className="mb-4 flex items-start gap-1.5 text-xs text-[#263D5C]">
              <MapPin
                size={14}
                className="mt-0.5 shrink-0"
                aria-hidden="true"
              />
              <span>{hotel.location}</span>
            </div>

            <ul className="mb-5 space-y-1.5">
              {hotel.features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-start gap-2 text-sm text-[#263D5C]"
                >
                  <span className="mt-1.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-[#2260AD]" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap items-center gap-3">
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
                className="inline-flex items-center gap-1.5 rounded-sm text-sm font-medium text-[#2260AD] transition-colors hover:text-[#143D78] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2260AD]"
              >
                <MapPin size={14} aria-hidden="true" />
                View on Map
              </a>
            </div>
          </VenueDetailRow>
        ))}
      </div>
    </section>
  );
}
