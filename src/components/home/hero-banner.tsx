import Link from "next/link";
import { MapPin, Calendar } from "lucide-react";
import { DragonPattern } from "@/components/cultural";

export function HeroBanner() {
  return (
    <section className="relative min-h-0 flex-1 overflow-hidden bg-[linear-gradient(135deg,#2260AD_0%,#2D78D4_48%,#143D78_100%)]">
      <DragonPattern
        className="absolute top-0 right-0 w-2/3 h-full"
        color="#C8A951"
        opacity={0.06}
      />

      <div className="relative z-10 mx-auto flex h-full w-full max-w-7xl items-center px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-14">
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
          {/* <div className="mb-6 flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gold flex items-center justify-center">
              <span className="text-sm font-extrabold text-dark">ACM</span>
            </div>
            <span className="text-sm tracking-[0.2em] text-gold font-semibold uppercase">
              The 23rd Annual Meeting
            </span>
          </div> */}

          <h1 className="mb-3 text-4xl font-black leading-tight text-white sm:mb-4 sm:text-6xl lg:text-7xl">
            ACM23
          </h1>
          <div className="mb-2 max-w-4xl space-y-3 text-white/90">
            <p className="text-lg leading-snug sm:text-xl lg:text-2xl">
              The 23rd Meeting of the Asian Consortium for the Conservation
              <br className="hidden sm:block" />
              and Sustainable Use of Microbial Resources
            </p>
            <p className="text-sm font-medium leading-snug text-white/80 sm:text-base lg:text-lg">
              Harnessing Microbial Resources: From Single Cells to Microbiomes
              <br className="hidden sm:block" />
              for a Sustainable Bioeconomy
            </p>
          </div>

          <div className="mt-5 flex flex-wrap justify-center gap-3 text-white/80 sm:mt-6 sm:gap-4">
            <span className="flex items-center gap-2 text-sm sm:text-base">
              <Calendar size={18} className="text-accent" aria-hidden="true" />
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
              Register Now
            </Link>
            <Link
              href="/abstract"
              className="rounded-lg border-2 border-white/40 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10 sm:px-8 sm:py-3.5 sm:text-base"
            >
              Submit Abstract
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
