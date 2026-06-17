import Image from "next/image";
import { ExternalLink, MapPin } from "lucide-react";

const hotels = [
  {
    name: "Legend Westlake Hotel",
    description:
      "Our official conference venue. Premium stay located right by scenic West Lake, offering world-class amenities and peaceful lakeside views.",
    location: "1 Yen Phu, West Lake, Hanoi",
    websiteUrl: "https://www.legendwestlake.com/",
    bookingUrl: "https://www.booking.com/hotel/vn/legend-west-lake.html",
    agodaUrl:
      "https://www.agoda.com/legend-west-lake-hotel/hotel/hanoi-vn.html",
    mapUrl:
      "https://www.google.com/maps/place/Legend+Westlake+Hotel/@21.050502,105.8394434,17z/data=!3m1!4b1!4m9!3m8!1s0x3135abadea7f3b8b:0xc4995ff3342e85c7!5m2!4m1!1i2!8m2!3d21.050502!4d105.8394434!16s%2Fg%2F11y3ncghh1",
    image: "/images/venue/khong-gian-hien-dai-va-am-cung-tai-legend-westlake-hotel.png",
    imageAlt: "Legend Westlake Hotel lakeside view",
  },
  {
    name: "The Hanoi Club Hotel",
    description:
      "A charming hotel offering a blend of colonial architecture and modern comforts, located near the West Lake and just a short drive from the venue.",
    location: "76 Yen Phu, West Lake, Hanoi",
    websiteUrl: "https://www.thehanoiclub.com/",
    bookingUrl:
      "https://www.booking.com/hotel/vn/hanoiclub-lake-palais-residences.html",
    agodaUrl:
      "https://www.agoda.com/the-hanoi-club-hotel-lake-palais-residences/hotel/hanoi-vn.html",
    mapUrl: "https://maps.app.goo.gl/yFzxFfuK1KEnyCWHA",
    image: "/images/venue/the_hanoi_club.webp",
    imageAlt: "The Hanoi Club Hotel lakeside view",
  },
  {
    name: "Elegant Suites Westlake",
    description:
      "Luxury apartments and suites offering a cozy and spacious stay on the West Lake side.",
    location: "10B Dang Thai Mai, West Lake, Hanoi",
    websiteUrl: "https://www.elegantsuites.com/westlake/home.htm",
    bookingUrl: "https://www.booking.com/hotel/vn/elegant-suites-westlake.html",
    agodaUrl:
      "https://www.agoda.com/elegant-suites-westlake/hotel/hanoi-vn.html",
    mapUrl:
      "https://www.google.com/maps/place/Elegant+Suites+Westlake+Serviced+Residences/@21.0543314,105.8271846,15z/data=!4m20!1m10!3m9!1s0x3135aafea34cb56d:0x44f078835258c48f!2sElegant+Suites+Westlake+Serviced+Residences!5m2!4m1!1i2!8m2!3d21.062033!4d105.8247673!16s%2Fg%2F11b6dd88l7!3m8!1s0x3135aafea34cb56d:0x44f078835258c48f!5m2!4m1!1i2!8m2!3d21.062033!4d105.8247673!16s%2Fg%2F11b6dd88l7?hl=vi&entry=ttu&g_ep=EgoyMDI2MDYwMi4wIKXMDSoASAFQAw%3D%3D",
    image: "/images/venue/elegant-suites-westlake.webp",
    imageAlt: "Elegant Suites Westlake lakeside view",
  },
  {
    name: "InterContinental Hanoi Westlake",
    description:
      "A luxurious lakeside resort built entirely over the water of West Lake, just 5 mins away from the venue.",
    location: "05 Tu Hoa, West Lake, Hanoi",
    websiteUrl: "https://hanoi.intercontinental.com/?updatelang=yes",
    bookingUrl:
      "https://www.booking.com/hotel/vn/intercontinental-westlake.html",
    agodaUrl:
      "https://www.agoda.com/intercontinental-hanoi-westlake/hotel/hanoi-vn.html",
    mapUrl:
      "https://www.google.com/maps/place/InterContinental+H%C3%A0+N%E1%BB%99i+Westlake/@21.058365,105.8315408,17z/data=!3m1!4b1!4m9!3m8!1s0x3135aa5504cf4f8d:0x38355eb7fe4e696d!5m2!4m1!1i2!8m2!3d21.058365!4d105.8315408!16s%2Fg%2F11cjk0swfk?hl=vi&entry=ttu&g_ep=EgoyMDI2MDYwMi4wIKXMDSoASAFQAw%3D%3D",
    image: "/images/venue/intercontinental-hanoi-westlake.webp",
    imageAlt: "InterContinental Hanoi Westlake lakeside view",
  },
  {
    name: "Pan Pacific Hanoi",
    description:
      "A 5-star hotel blending contemporary design with Vietnamese culture, located in the heart of Hanoi and just a short drive from the venue.",
    location: "1 Thanh Nien Road, Ba Dinh Ward, Hanoi",
    websiteUrl: "https://www.panpacific.com/en/hotels-and-resorts/pp-hanoi.html",
    bookingUrl: "https://www.booking.com/hotel/vn/pan-pacific-hanoi.html",
    agodaUrl: "https://www.agoda.com/pan-pacific-hanoi/hotel/hanoi-vn.html",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Pan+Pacific+Hanoi",
    image: "/images/venue/PanPacificHanoi.jpg",
    imageAlt: "Pan Pacific Hanoi exterior",
  },
];

function BookingMark() {
  return (
    <span
      aria-hidden="true"
      className="grid size-5 place-items-center rounded-sm bg-[#003B95] text-[11px] font-black text-white"
    >
      B.
    </span>
  );
}

const secondaryActionClassName =
  "inline-flex min-h-10 w-full items-center justify-center gap-2 whitespace-nowrap rounded border border-[#D5DCE7] bg-white px-3 py-2 text-sm font-semibold text-[#263D5C] transition-colors hover:border-[#2260AD]/30 hover:bg-[#F7FBFF] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2260AD]";

export function AccommodationSection() {
  return (
    <section className="mt-10">
      <div className="mb-5 flex flex-col gap-2 border-b border-[#2260AD]/20 pb-4 sm:flex-row sm:items-end sm:justify-between">
        <h2 className="text-2xl font-black text-[#2260AD]">Accommodation</h2>
      </div>

      <div className="space-y-5">
        {hotels.map((hotel, index) => (
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
                  loading={index === 0 ? "eager" : "lazy"}
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

                <div className="mt-5 grid grid-cols-1 gap-2 min-[360px]:grid-cols-2 xl:grid-cols-4">
                  <a
                    href={hotel.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-10 w-full items-center justify-center gap-2 whitespace-nowrap rounded bg-[#2260AD] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#143D78] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2260AD]"
                  >
                    Website
                    <ExternalLink size={14} aria-hidden="true" />
                  </a>
                  <a
                    href={hotel.bookingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={secondaryActionClassName}
                  >
                    <BookingMark />
                    <span className="text-[#003B95]">Booking.com</span>
                  </a>
                  <a
                    href={hotel.agodaUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={secondaryActionClassName}
                  >
                    <Image
                      src="/images/brands/agoda-logo.png"
                      alt="Agoda"
                      width={91}
                      height={14}
                      className="h-3.5 w-auto"
                    />
                  </a>
                  <a
                    href={hotel.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={secondaryActionClassName}
                  >
                    <MapPin
                      size={14}
                      className="text-[#2260AD]"
                      aria-hidden="true"
                    />
                    <span className="text-[#2260AD]">View on Map</span>
                  </a>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
