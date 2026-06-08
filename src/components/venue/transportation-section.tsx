import { Car, ExternalLink, Plane } from "lucide-react";

const transportOptions = [
  {
    icon: Car,
    title: "Airport Taxi",
    details: "GrabCar or official airport taxis (Mai Linh, Taxi Group)",
    price: "250,000 - 350,000 VND",
    priceSubtitle: "~$10-15 USD",
    duration: "~30 minutes to reach Legend Westlake Hotel",
    ctaText: "Download Grab",
    ctaUrl: "https://www.grab.com/vn/download/",
  },
];

export function TransportationSection() {
  return (
    <section className="mt-10">
      <div className="overflow-hidden border border-[#2260AD]/10 bg-white/85 shadow-sm shadow-[#2260AD]/5">
        <div className="px-5 py-5 sm:px-6 sm:py-6">
          <div className="mb-4 flex items-start gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#2260AD]/10 text-[#2260AD]">
              <Plane size={22} aria-hidden="true" />
            </span>
            <div>
              <h2 className="text-2xl font-black text-[#2260AD]">
                Arrival information
              </h2>
              <p className="mt-1 text-sm leading-6 text-[#263D5C]">
                Noi Bai International Airport (HAN) is approximately 30km from
                the city center.
              </p>
            </div>
          </div>

          {transportOptions.map((option) => (
            <article
              key={option.title}
              className="border-l-4 border-[#2260AD] bg-[#F7FBFF] px-4 py-4"
            >
              <div className="grid gap-4 sm:grid-cols-[1fr_auto] sm:items-start">
                <div className="min-w-0">
                  <div className="mb-2 flex items-center gap-2 text-[#2260AD]">
                    <option.icon size={18} aria-hidden="true" />
                    <h3 className="text-lg font-black text-[#143D78]">
                      {option.title}
                    </h3>
                  </div>
                  <p className="text-sm leading-6 text-[#263D5C]">
                    {option.details}
                  </p>
                </div>

                <a
                  href={option.ctaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-fit items-center gap-2 rounded bg-[#2260AD] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#143D78] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2260AD]"
                >
                  {option.ctaText}
                  <ExternalLink size={14} aria-hidden="true" />
                </a>
              </div>

              <dl className="mt-4 grid gap-3 sm:grid-cols-3">
                <div className="bg-white/80 px-3 py-2 ring-1 ring-[#2260AD]/10">
                  <dt className="text-xs font-semibold text-[#263D5C]/75">
                    Estimated fare
                  </dt>
                  <dd className="mt-0.5 text-sm font-black text-[#2260AD]">
                    {option.price}
                  </dd>
                  {option.priceSubtitle && (
                    <dd className="text-xs text-[#263D5C]">
                      {option.priceSubtitle}
                    </dd>
                  )}
                </div>
                <div className="bg-white/80 px-3 py-2 ring-1 ring-[#2260AD]/10 sm:col-span-2">
                  <dt className="text-xs font-semibold text-[#263D5C]/75">
                    Travel time
                  </dt>
                  <dd className="mt-0.5 text-sm font-black text-[#143D78]">
                    {option.duration}
                  </dd>
                </div>
              </dl>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
