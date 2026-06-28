import Image from "next/image";
import Link from "next/link";
import { Calendar, MapPin, ArrowRight } from "lucide-react";
import { ColonyField } from "./colony-field";
import { LandingCountdown } from "./landing-countdown";
import { Reveal } from "./reveal";

const HERO_GRADIENT = [
  "radial-gradient(ellipse 90% 80% at 78% 12%, rgba(128,175,65,0.28) 0%, rgba(128,175,65,0) 55%)",
  "radial-gradient(ellipse 70% 70% at 12% 90%, rgba(34,96,173,0.55) 0%, rgba(34,96,173,0) 60%)",
  "linear-gradient(160deg, #0B284F 0%, #143D78 45%, #1B4E96 100%)",
].join(", ");

export function LandingHero() {
  return (
    <section
      className="relative isolate overflow-hidden"
      style={{ backgroundImage: HERO_GRADIENT }}
    >
      {/* Signature colony-dot field, growing toward the upper right. */}
      <ColonyField
        className="pointer-events-none absolute inset-0 h-full w-full opacity-70"
        color="#ffffff"
        accentColor="#80AF41"
      />

      <div className="relative mx-auto grid w-full max-w-6xl gap-12 px-5 py-20 sm:px-8 sm:py-24 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-10 lg:py-28">
        <div>
          <Reveal>
            <p className="lp-mono flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.7rem] font-medium uppercase tracking-[0.22em] text-white/60">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#80AF41]" aria-hidden="true" />
              Asian Consortium · Microbial Resources
              <span className="text-white/30" aria-hidden="true">/</span>
              23rd Annual Meeting
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <h1 className="lp-display mt-6 text-[3.75rem] font-bold leading-[0.92] tracking-tight text-white sm:text-7xl lg:text-[5.5rem]">
              ACM23
            </h1>
          </Reveal>

          <Reveal delay={0.16}>
            <p className="mt-5 max-w-xl text-lg leading-7 text-white/85 sm:text-xl sm:leading-8">
              The 23rd Annual Meeting of the Asian Consortium for the
              Conservation and Sustainable Use of Microbial Resources.
            </p>
          </Reveal>

          <Reveal delay={0.22}>
            <p className="lp-display mt-6 max-w-xl border-l-2 border-[#80AF41] pl-4 text-base font-medium italic leading-7 text-white sm:text-lg">
              Harnessing Microbial Resources: From Single Cells to Microbiomes
              for a Sustainable Bioeconomy
            </p>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/85 sm:text-base">
              <span className="flex items-center gap-2">
                <Calendar size={17} className="text-[#80AF41]" aria-hidden="true" />
                November 16–18, 2026
              </span>
              <span className="flex items-center gap-2">
                <MapPin size={17} className="text-[#80AF41]" aria-hidden="true" />
                Legend Westlake Hotel, Hanoi, Vietnam
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.38}>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                href="/registration"
                className="group inline-flex items-center gap-2 rounded-lg bg-[#80AF41] px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#80AF41]/20 transition-colors hover:bg-[#739D3B]"
              >
                Register now
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </Link>
              <Link
                href="/abstract"
                className="inline-flex items-center gap-2 rounded-lg border border-white/40 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                Submit an abstract
              </Link>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.3} className="flex flex-col items-start gap-6 lg:items-end">
          <div className="relative w-full max-w-sm overflow-hidden rounded-2xl border border-white/15 shadow-2xl shadow-black/30">
            <div className="relative aspect-[4/3] w-full">
              <Image
                src="/images/venue/legend-westlake-hotel.webp"
                alt="Legend Westlake Hotel, the ACM23 conference venue in Hanoi"
                fill
                sizes="(min-width: 1024px) 24rem, 100vw"
                className="object-cover"
                priority
              />
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage:
                    "linear-gradient(180deg, rgba(11,40,79,0) 45%, rgba(11,40,79,0.72) 100%)",
                }}
              />
              <p className="lp-mono absolute bottom-3 left-4 text-[0.65rem] uppercase tracking-[0.18em] text-white/90">
                Legend Westlake Hotel · Hanoi
              </p>
            </div>
          </div>
          <LandingCountdown />
        </Reveal>
      </div>
    </section>
  );
}
