import { ExternalLink, MapPin } from "lucide-react";
import { VenueDetailRow } from "./venue-detail-row";

const discoverItems = [
  {
    title: "Ho Chi Minh Mausoleum",
    category: "Historical",
    description: "The historic and political heart of Vietnam. A solemn, grand complex where Vietnam's greatest leader rests. ",
    image: "/images/venue/ho-chi-minh-mausoleum.webp",
    imageAlt: "Ho Chi Minh Mausoleum and Ba Dinh Square",
    info: null,
    mapUrl:
      "https://www.google.com/maps/place/L%C4%83ng+Ch%E1%BB%A7+t%E1%BB%8Bch+H%E1%BB%93+Ch%C3%AD+Minh/@21.0368973,105.8346667,17z/data=!3m1!4b1!4m6!3m5!1s0x3135aba15ec15d17:0x620e85c2cfe14d4c!8m2!3d21.0368973!4d105.8346667!16s%2Fm%2F02xbhg7",
    bookingUrl: null,
  },
  {
    title: "Imperial Citadel of Thang Long",
    category: "UNESCO Site",
    description: "A UNESCO World Heritage site with over 1,300 years of history, reflecting the ancient royal culture of Hanoi. ",
    image: "/images/venue/imperial-citadel-thang-long.webp",
    imageAlt: "Imperial Citadel of Thang Long",
    info: null,
    mapUrl:
      "https://www.google.com/maps/place/Ho%C3%A0ng+Th%C3%A0nh+Th%C4%83ng+Long/@21.0352231,105.8402594,16z/data=!3m1!4b1!4m6!3m5!1s0x3135aba3381d7c49:0xb521a7d98f582937!8m2!3d21.0352231!4d105.8402594!16s%2Fm%2F05zw9vk",
    bookingUrl: null,
  },
  {
    title: "Temple of Literature",
    category: "Historical",
    description: "Vietnam’s very first national university, famous for its stunning traditional architecture and rich educational history.",
    image: "/images/venue/temple-of-literature.webp",
    imageAlt: "Temple of Literature",
    info: null,
    mapUrl:
      "https://www.google.com/maps/place/V%C4%83n+Mi%C3%AA%CC%81u+%E2%80%93+Qu%C3%B4%CC%81c+T%C6%B0%CC%89+Gia%CC%81m/@21.0281225,105.8330889,17z/data=!3m1!4b1!4m6!3m5!1s0x3135ab9926e7bd67:0x580e078874d5df1e!8m2!3d21.0281175!4d105.8356692!16zL20vMGI5aGp6",
    bookingUrl: null,
  },
    {
    title: "Hanoi Old Quarter & Hoan Kiem Lake",
    category: "Experience",
    description: "The core of old Hanoi. Walk around the lake, visit the red The Huc Bridge, and explore the dense network of 36 traditional trade streets.",
    image: "/images/venue/hoan-kiem-feature.webp",
    imageAlt: "Hanoi Old Quarter & Hoan Kiem Lake",
    info: null,
    mapUrl:
      "https://www.google.com/maps/place/H%E1%BB%93+Ho%C3%A0n+Ki%E1%BA%BFm/@21.0287748,105.8523647,17z/data=!3m1!4b1!4m6!3m5!1s0x3135ab953357c995:0x1babf6bb4f9a20e!8m2!3d21.0286669!4d105.8521484!16zL20vMGdwNjV3?hl=vi&entry=ttu&g_ep=EgoyMDI2MDYwMi4wIKXMDSoASAFQAw%3D%3D",
    bookingUrl: null,
  },
  {
    title: "Train Street (Phung Hung)",
    category: "Experience",
    description: "Sit at a local cafe right next to the active train tracks and watch the train pass by just inches away. A global tourist favorite. ",
    image: "/images/venue/Spots-to-see-Hanoi-Train-Street.jpg",
    imageAlt: "Hanoi Train Street",
    info: null,
    mapUrl:
      "https://www.google.com/maps/place/Train+Street/@21.0315171,105.8443877,19z/data=!4m10!1m2!2m1!1sHanoi+Train+Street+%28Phung+Hung%29!3m6!1s0x3135ab004433f795:0x18113f540dba99ee!8m2!3d21.0319482!4d105.845082!15sCh9IYW5vaSBUcmFpbiBTdHJlZXQgKFBodW5nIEh1bmcpWh8iHWhhbm9pIHRyYWluIHN0cmVldCBwaHVuZyBodW5nkgESdG91cmlzdF9hdHRyYWN0aW9umgFEQ2k5RFFVbFJRVU52WkVOb2RIbGpSamx2VDIxR01WRlhWa3RYYVRGMlVXNUNabEZyYnpOaWFsVTFZV3hLVmxWdVl4QULgAQD6AQQIABAh!16s%2Fg%2F11mzz2lqm6",
    bookingUrl: null,
  },
  {
    title: "Thang Long Water Puppet Show",
    category: "Culture",
    description: "A unique, 1,000-year-old Vietnamese art form performed entirely on a water stage with live traditional music.",
    image: "/images/venue/thang-long-water-puppets.webp",
    imageAlt: "Thang Long Water Puppet Show",
    info: "Daily: 15:00, 16:10, 17:20, 18:30, 20:00",
    mapUrl:
      "https://www.google.com/maps/place/Nh%C3%A0+H%C3%A1t+M%C3%BAa+R%E1%BB%91i+Th%C4%83ng+Long/@21.0316876,105.8507663,17z/data=!3m1!4b1!4m6!3m5!1s0x3135abc013454289:0x4e5ea7a5d23aad1c!8m2!3d21.0316826!4d105.8533466!16s%2Fg%2F1tdp2j4q",
    bookingUrl: "https://nhahatmuaroithanglong.vn/en/",
  },
  {
    title: "Traditional Cyclo Tour",
    category: "Experience",
    description: "Relax on a 1-hour traditional three-wheel bicycle ride through the bustling streets of the Old Quarter. Perfect for photography.",
    image: "/images/venue/vietnamese-cyclo-02_1709108631.webp",
    imageAlt: "Traditional Cyclo Tour",
    info: "~150,000-200,000 VND/hour (Always agree on the price before hopping on).",
    mapUrl: null,
    bookingUrl: null,
  },
  {
    title: "Hanoi City Tour Bus",
    category: "Tour",
    description: "The best way to see all landmarks in one go. Hop on and off freely at any famous spot around the city.",
    image: "/images/venue/hanoi-city-tour-bus.webp",
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

      <div className="space-y-6">
        {discoverItems.map((item, index) => (
          <VenueDetailRow
            key={item.title}
            image={item.image}
            imageAlt={item.imageAlt}
            aspect="place"
            reversed={index % 2 === 1}
            badge={item.category}
          >
            <h3 className="mb-2 text-xl font-black text-[#143D78] sm:text-2xl">
              {item.title}
            </h3>
            <p className="mb-4 text-sm leading-6 text-[#263D5C]">
              {item.description}
            </p>

            {item.info && (
              <p className="mb-4 text-xs font-semibold text-[#2260AD]">
                {item.info}
              </p>
            )}

            <div className="flex flex-wrap items-center gap-4 text-sm">
              {item.bookingUrl && (
                <a
                  href={item.bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-sm font-medium text-[#2260AD] transition-colors hover:text-[#143D78] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2260AD]"
                >
                  Book Tickets
                  <ExternalLink size={14} aria-hidden="true" />
                </a>
              )}
              {item.mapUrl && (
                <a
                  href={item.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-sm font-medium text-[#2260AD] transition-colors hover:text-[#143D78] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2260AD]"
                >
                  <MapPin size={14} aria-hidden="true" />
                  View Map
                </a>
              )}
            </div>
          </VenueDetailRow>
        ))}
      </div>
    </section>
  );
}
