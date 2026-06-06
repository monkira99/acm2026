import Image from "next/image";
import { MapPin, ExternalLink } from "lucide-react";

const landmarks = [
  {
    title: "Ho Chi Minh Mausoleum",
    category: "Historical",
    description: "The historic and political heart of Vietnam",
    image: "/images/venue/hoan-kiem-feature.webp",
    imageAlt: "Ho Chi Minh Mausoleum and Ba Dinh Square",
    mapUrl:
      "https://www.google.com/maps/place/L%C4%83ng+Ch%E1%BB%A7+t%E1%BB%8Bch+H%E1%BB%93+Ch%C3%AD+Minh/@21.0368973,105.8346667,17z/data=!3m1!4b1!4m6!3m5!1s0x3135aba15ec15d17:0x620e85c2cfe14d4c!8m2!3d21.0368973!4d105.8346667!16s%2Fm%2F02xbhg7",
    featured: true,
  },
  {
    title: "Imperial Citadel of Thang Long",
    category: "UNESCO Site",
    description: "1,300 years of royal history",
    image: "/images/venue/imperial-citadel-hanoi.jpg",
    imageAlt: "Imperial Citadel of Thang Long",
    mapUrl:
      "https://www.google.com/maps/place/Ho%C3%A0ng+Th%C3%A0nh+Th%C4%83ng+Long/@21.0352231,105.8402594,16z/data=!3m1!4b1!4m6!3m5!1s0x3135aba3381d7c49:0xb521a7d98f582937!8m2!3d21.0352231!4d105.8402594!16s%2Fm%2F05zw9vk",
    featured: false,
  },
  {
    title: "Temple of Literature",
    category: "Historical",
    description: "Vietnam's first national university",
    image: "/images/venue/temple-literature.jpg",
    imageAlt: "Temple of Literature",
    mapUrl:
      "https://www.google.com/maps/place/V%C4%83n+Mi%C3%AA%CC%81u+%E2%80%93+Qu%C3%B4%CC%81c+T%C6%B0%CC%89+Gia%CC%81m/@21.0281225,105.8330889,17z/data=!3m1!4b1!4m6!3m5!1s0x3135ab9926e7bd67:0x580e078874d5df1e!8m2!3d21.0281175!4d105.8356692!16zL20vMGI5aGp6",
    featured: false,
  },
];

const experiences = [
  {
    title: "Train Street (Phung Hung)",
    category: "Experience",
    description: "Watch trains pass inches away from local cafes",
    image: "/images/venue/train-street-hanoi.jpg",
    imageAlt: "Hanoi Train Street",
    info: null,
    mapUrl:
      "https://www.google.com/maps/place/Train+Street/@21.0315171,105.8443877,19z/data=!4m10!1m2!2m1!1sHanoi+Train+Street+%28Phung+Hung%29!3m6!1s0x3135ab004433f795:0x18113f540dba99ee!8m2!3d21.0319482!4d105.845082!15sCh9IYW5vaSBUcmFpbiBTdHJlZXQgKFBodW5nIEh1bmcpWh8iHWhhbm9pIHRyYWluIHN0cmVldCBwaHVuZyBodW5nkgESdG91cmlzdF9hdHRyYWN0aW9umgFEQ2k5RFFVbFJRVU52WkVOb2RIbGpSamx2VDIxR01WRlhWa3RYYVRGMlVXNUNabEZyYnpOaWFsVTFZV3hLVmxWdVl4QULgAQD6AQQIABAh!16s%2Fg%2F11mzz2lqm6",
    bookingUrl: null,
  },
  {
    title: "Water Puppet Theatre",
    category: "Culture",
    description: "1,000-year-old art form on water stage",
    image: "/images/venue/water-puppet-show.jpg",
    imageAlt: "Thang Long Water Puppet Show",
    info: "Daily: 15:00, 16:10, 17:20, 18:30, 20:00",
    mapUrl:
      "https://www.google.com/maps/place/Nh%C3%A0+H%C3%A1t+M%C3%BAa+R%E1%BB%91i+Th%C4%83ng+Long/@21.0316876,105.8507663,17z/data=!3m1!4b1!4m6!3m5!1s0x3135abc013454289:0x4e5ea7a5d23aad1c!8m2!3d21.0316826!4d105.8533466!16s%2Fg%2F1tdp2j4q",
    bookingUrl: "https://nhahatmuaroithanglong.vn/en/",
  },
  {
    title: "Cyclo Tour",
    category: "Experience",
    description: "Relaxing bicycle tour through Old Quarter streets",
    image: "/images/venue/cyclo-hanoi.jpg",
    imageAlt: "Traditional Cyclo Tour",
    info: "~150,000-200,000 VND/hour",
    mapUrl: null,
    bookingUrl: null,
  },
  {
    title: "Hanoi City Tour Bus",
    category: "Tour",
    description: "Hop-on hop-off at all major landmarks",
    image: "/images/venue/hanoi-skyline.jpg",
    imageAlt: "Hanoi City Tour Bus",
    info: "Every 30 min | 08:30-22:00 weekdays",
    mapUrl:
      "https://www.google.com/maps/place/Qu%E1%BA%A3ng+tr%C6%B0%E1%BB%9Dng+%C4%90%C3%B4ng+Kinh+-+Ngh%C4%A9a+Th%E1%BB%A5c/@21.0319076,105.8515757,17z/data=!3m1!4b1!4m6!3m5!1s0x3135ab0059c6d3a5:0xcf239e14be3c7736!8m2!3d21.0319076!4d105.8515757!16s%2Fg%2F11xvmhykmt",
    bookingUrl: "https://hanoi-citytour.com.vn/",
  },
];

export function DiscoverHanoiSection() {
  return (
    <section className="mt-12">
      <div className="mb-5 flex flex-col gap-1 border-b border-[#2260AD]/20 pb-4 sm:flex-row sm:items-end sm:justify-between">
        <h2 className="text-2xl font-black text-[#2260AD]">Discover Hanoi</h2>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {/* Landmarks - Featured larger cards */}
        {landmarks.map((landmark) => (
          <div
            key={landmark.title}
            className={`group relative overflow-hidden bg-white/80 shadow-sm shadow-[#2260AD]/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
              landmark.featured ? "md:col-span-2" : ""
            }`}
          >
            {/* Image with overlay */}
            <div className="relative aspect-[3/2] overflow-hidden">
              <Image
                src={landmark.image}
                alt={landmark.imageAlt}
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/40 to-transparent" />

              {/* Category badge */}
              <div className="absolute left-4 top-4 rounded-full bg-white/20 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                {landmark.category}
              </div>

              {/* Content overlay at bottom */}
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <h3 className="mb-1 text-lg font-bold text-white">
                  {landmark.title}
                </h3>
                <p className="text-sm text-white/90">{landmark.description}</p>
              </div>

              {/* Map button */}
              <a
                href={landmark.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-4 right-4 flex h-8 w-8 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm transition-all hover:bg-white/30"
                aria-label={`View ${landmark.title} on map`}
              >
                <MapPin size={16} className="text-white" />
              </a>
            </div>
          </div>
        ))}

        {/* Experiences - Compact cards */}
        {experiences.map((experience) => (
          <div
            key={experience.title}
            className="group bg-white/80 shadow-sm shadow-[#2260AD]/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
          >
            {/* Image */}
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src={experience.image}
                alt={experience.imageAlt}
                fill
                sizes="(min-width: 768px) 33vw, 100vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              {/* Category badge */}
              <div className="absolute left-3 top-3 rounded-full bg-[#C8A951]/90 px-2.5 py-0.5 text-xs font-semibold text-white">
                {experience.category}
              </div>
            </div>

            {/* Content */}
            <div className="p-4">
              <h3 className="mb-1.5 text-base font-bold text-[#143D78]">
                {experience.title}
              </h3>
              <p className="mb-3 text-sm leading-relaxed text-[#263D5C]">
                {experience.description}
              </p>

              {experience.info && (
                <p className="mb-3 text-xs font-semibold text-[#2260AD]">
                  {experience.info}
                </p>
              )}

              {/* Links */}
              <div className="flex flex-wrap items-center gap-3 text-xs">
                {experience.bookingUrl && (
                  <a
                    href={experience.bookingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-medium text-[#2260AD] transition-colors hover:text-[#143D78]"
                  >
                    Book Tickets
                    <ExternalLink size={12} />
                  </a>
                )}
                {experience.mapUrl && (
                  <a
                    href={experience.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-medium text-[#2260AD] transition-colors hover:text-[#143D78]"
                  >
                    <MapPin size={12} />
                    View Map
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
