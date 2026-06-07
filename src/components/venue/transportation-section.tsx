import { Car, Bus, MapPin } from "lucide-react";

const transportOptions = [
  {
    icon: Car,
    title: "Airport Taxi",
    details: "GrabCar or official airport taxis (Mai Linh, Taxi Group)",
    price: "250,000 - 350,000 VND",
    priceSubtitle: "~$10-15 USD",
    duration: "~30 minutes to Legend Westlake Hotel",
    ctaText: "Download Grab",
    ctaUrl: "https://www.grab.com/vn/download/",
  }
];

const arrivalTips = [
  "Taxis available right outside arrival terminal",
  "Bus stop located at Terminal 1 & 2",
  "Hotel pickup available (contact your hotel)",
];

export function TransportationSection() {
  return (
    <section className="mt-12">
      <div className="mb-5 flex flex-col gap-1 border-b border-[#2260AD]/20 pb-4 sm:flex-row sm:items-end sm:justify-between">
        <h2 className="text-2xl font-black text-[#2260AD]">Arrival information</h2>
      </div>

      <p className="mb-6 text-sm leading-6 text-[#263D5C]">
        Noi Bai International Airport (HAN) is approximately 30km from the city
        center.
      </p>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-5">
        {/* Left column - 2 transport options */}
        <div className="space-y-4 lg:col-span-3">
          {transportOptions.map((option) => (
            <div
              key={option.title}
              className="border border-transparent bg-white/75 px-5 py-5 shadow-sm shadow-[#2260AD]/5 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#2260AD]/20 hover:shadow-md"
            >
              <option.icon
                size={24}
                className="mb-4 text-[#2260AD]"
                aria-hidden="true"
              />
              <h3 className="mb-2 text-lg font-bold text-[#143D78]">
                {option.title}
              </h3>
              <p className="mb-3 text-sm leading-6 text-[#263D5C]">
                {option.details}
              </p>
              <div className="mb-2 inline-block rounded bg-[#2260AD]/10 px-3 py-1">
                <p className="text-sm font-bold text-[#2260AD]">
                  {option.price}
                </p>
                {option.priceSubtitle && (
                  <p className="text-xs text-[#2260AD]/70">
                    {option.priceSubtitle}
                  </p>
                )}
              </div>
              <p className="mb-4 text-xs text-[#263D5C]">{option.duration}</p>
              <a
                href={option.ctaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block rounded bg-[#2260AD] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#143D78]"
              >
                {option.ctaText}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
