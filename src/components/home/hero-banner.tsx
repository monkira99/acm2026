import Image from "next/image";
import Link from "next/link";
import { MapPin, Calendar } from "lucide-react";
import { Ordinal23 } from "@/components/ui/ordinal-23";

const HERO_LOGOS = [
  {
    src: "/logo_imbt.png",
    alt: "Institute of Microbiology and Biotechnology logo",
    width: 1578,
    height: 238,
    className: "max-w-[16.2rem] sm:max-w-[25.2rem] lg:max-w-[27.9rem]",
    sizes: "(min-width: 1024px) 27.9rem, (min-width: 640px) 25.2rem, 77vw",
    align: "lg:justify-start",
  },
  {
    src: "/acm_logo.png",
    alt: "Asian Consortium for the Conservation and Sustainable Use of Microbial Resources logo",
    width: 1280,
    height: 274,
    className: "max-w-[11.9rem] sm:max-w-[17.85rem] lg:max-w-[20.4rem]",
    sizes: "(min-width: 1024px) 20.4rem, (min-width: 640px) 17.85rem, 72vw",
    align: "lg:justify-end",
  },
] as const;

const HERO_BACKGROUND = [
  "radial-gradient(ellipse 74% 64% at 44% -2%, rgba(224,244,253,0.98) 0%, rgba(206,236,250,0.94) 20%, rgba(170,219,244,0.76) 42%, rgba(116,188,230,0.42) 66%, rgba(66,154,213,0) 100%)",
  "radial-gradient(ellipse 86% 72% at 43% 30%, rgba(132,201,236,0.22) 0%, rgba(91,176,224,0.12) 52%, rgba(49,135,199,0) 100%)",
  "linear-gradient(180deg, #75BDE9 0%, #5EADE0 25%, #3F8FCC 50%, #2172BC 74%, #0753A9 100%)",
].join(", ");

export function HeroBanner() {
  return (
    <section
      className="relative min-h-0 flex-1 overflow-hidden bg-[#0753A9]"
      style={{ backgroundImage: HERO_BACKGROUND }}
    >
      <div className="relative z-10 flex h-full w-full flex-col">
        <div className="grid w-full gap-3 px-4 pt-4 sm:px-[1cm] sm:pt-5 lg:grid-cols-2 lg:px-[1.5cm] lg:pt-6">
          {HERO_LOGOS.map((logo) => (
            <div
              key={logo.src}
              className={`flex justify-center ${logo.align}`}
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                width={logo.width}
                height={logo.height}
                sizes={logo.sizes}
                className={`h-auto w-full object-contain drop-shadow-[0_8px_18px_rgba(0,0,0,0.22)] ${logo.className}`}
              />
            </div>
          ))}
        </div>

        <div className="mx-auto flex w-full max-w-7xl flex-1 items-center px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-14">
          <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
            <h1 className="mb-3 text-4xl font-black leading-tight text-[#2260AD] sm:mb-4 sm:text-6xl lg:text-7xl">
              ACM23
            </h1>
            <div className="mb-2 max-w-4xl space-y-3 text-white drop-shadow-[0_2px_8px_rgba(16,55,104,0.3)]">
              <p className="text-lg leading-snug sm:text-xl lg:text-2xl">
                The <Ordinal23 /> Meeting of the Asian Consortium for the
                Conservation
                <br className="hidden sm:block" />
                and Sustainable Use of Microbial Resources
              </p>
              <p className="text-sm font-medium leading-snug text-white/90 sm:text-base lg:text-lg">
                Harnessing Microbial Resources: From Single Cells to Microbiomes
                <br className="hidden sm:block" />
                for a Sustainable Bioeconomy
              </p>
            </div>

            <div className="mt-5 flex flex-wrap justify-center gap-3 text-white/95 drop-shadow-[0_2px_7px_rgba(16,55,104,0.3)] sm:mt-6 sm:gap-4">
              <span className="flex items-center gap-2 text-sm sm:text-base">
                <Calendar
                  size={18}
                  className="text-accent"
                  aria-hidden="true"
                />
                November 16-18, 2026
              </span>
              <span className="flex items-center gap-2 text-sm sm:text-base">
                <MapPin size={18} className="text-accent" aria-hidden="true" />
                Hanoi, Vietnam
              </span>
            </div>

            <div className="mt-7 flex flex-wrap justify-center gap-3 sm:mt-10 sm:gap-4">
              <Link
                href="/registration"
                className="rounded-lg bg-[#80AF41] px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-[#739D3B] sm:px-8 sm:py-3.5 sm:text-base"
              >
                Register now
              </Link>
              <Link
                href="/abstract"
                className="rounded-lg border-2 border-white/70 px-6 py-3 text-sm font-semibold text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.22)] transition-colors hover:bg-white/10 sm:px-8 sm:py-3.5 sm:text-base"
              >
                Submit abstract
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
