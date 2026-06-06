import Image from "next/image";
import { MapPin, ExternalLink } from "lucide-react";

const hotels = [
  {
    name: "Legend Westlake Hotel",
    featured: true,
    badge: "Main Venue",
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
    image: "/images/venue/legend-hotel-1.jpg",
    imageAlt: "Legend Westlake Hotel lakeside view",
  },
  {
    name: "InterContinental Hanoi Westlake",
    featured: false,
    badge: "5-Star Lakeside",
    starRating: null,
    description:
      "Luxurious lakeside resort built over West Lake waters.",
    location: "1A Nghi Tam, West Lake, Hanoi",
    distance: "5 min to venue",
    features: ["Overwater luxury resort", "Award-winning dining"],
    bookingUrl: "https://hanoi.intercontinental.com/?updatelang=yes",
    mapUrl:
      "https://www.google.com/maps/place/InterContinental+H%C3%A0+N%E1%BB%99i+Westlake/@21.058365,105.8315408,17z/data=!3m1!4b1!4m9!3m8!1s0x3135aa5504cf4f8d:0x38355eb7fe4e696d!5m2!4m1!1i2!8m2!3d21.058365!4d105.8315408!16s%2Fg%2F11cjk0swfk",
    image: "/images/venue/intercontinental-hotel.jpg",
    imageAlt: "InterContinental Hanoi Westlake resort",
  },
  {
    name: "Elegant Suites Westlake",
    featured: false,
    badge: "Serviced Apartments",
    starRating: null,
    description:
      "Spacious luxury apartments offering a cozy stay on West Lake.",
    location: "To Ngoc Van, West Lake, Hanoi",
    distance: "10 min to venue",
    features: ["Full kitchen & living space", "Perfect for extended stays"],
    bookingUrl: "https://www.elegantsuites.com/group/contact-us.htm",
    mapUrl:
      "https://www.google.com/maps/place/Elegant+Suites+Westlake+Serviced+Residences/@21.0543314,105.8271846,15z/data=!4m20!1m10!3m9!1s0x3135aafea34cb56d:0x44f078835258c48f!2sElegant+Suites+Westlake+Serviced+Residences!5m2!4m1!1i2!8m2!3d21.062033!4d105.8247673!16s%2Fg%2F11b6dd88l7!3m8!1s0x3135aafea34cb56d:0x44f078835258c48f!5m2!4m1!1i2!8m2!3d21.062033!4d105.8247673!16s%2Fg%2F11b6dd88l7",
    image: "/images/venue/hanoi-skyline.jpg",
    imageAlt: "Elegant Suites Westlake apartments",
  },
];

export function AccommodationSection() {
  return (
    <section className="mt-12">
      <div className="mb-5 flex flex-col gap-1 border-b border-[#2260AD]/20 pb-4 sm:flex-row sm:items-end sm:justify-between">
        <h2 className="text-2xl font-black text-[#2260AD]">Where to Stay</h2>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {hotels.map((hotel) => (
          <div
            key={hotel.name}
            className={`group overflow-hidden bg-white/80 shadow-sm shadow-[#2260AD]/5 transition-all duration-400 hover:-translate-y-1 hover:shadow-lg ${
              hotel.featured
                ? "border-l-4 border-[#2260AD] hover:shadow-[#2260AD]/10 md:col-span-2"
                : ""
            }`}
          >
            {/* Image */}
            <div className="relative aspect-video overflow-hidden md:aspect-[16/9]">
              <Image
                src={hotel.image}
                alt={hotel.imageAlt}
                fill
                sizes="(min-width: 768px) 33vw, 100vw"
                className="object-cover transition-transform duration-400 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark/60 via-transparent to-transparent" />
              
              {/* Badge */}
              <div className="absolute left-4 top-4 rounded-full bg-[#C8A951]/90 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                {hotel.badge}
              </div>

              {/* Distance badge */}
              <div className="absolute bottom-4 right-4 rounded bg-[#2260AD] px-2 py-1 text-xs font-bold text-white">
                {hotel.distance}
              </div>
            </div>

            {/* Content */}
            <div className="px-5 py-5">
              {hotel.starRating && (
                <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-[#2260AD]">
                  {hotel.starRating}
                </p>
              )}
              <h3 className="mb-2 text-xl font-black text-[#143D78]">
                {hotel.name}
              </h3>
              <p className="mb-3 text-sm leading-6 text-[#263D5C]">
                {hotel.description}
              </p>

              <div className="mb-4 flex items-start gap-1.5 text-xs text-[#263D5C]">
                <MapPin size={14} className="mt-0.5 shrink-0" />
                <span>{hotel.location}</span>
              </div>

              {/* Features */}
              <ul className="mb-4 space-y-1.5">
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

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={hotel.bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded bg-[#2260AD] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#143D78]"
                >
                  View Details & Book
                  <ExternalLink size={14} />
                </a>
                <a
                  href={hotel.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-[#2260AD] transition-colors hover:text-[#143D78]"
                >
                  <MapPin size={14} />
                  View on Map
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
