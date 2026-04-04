import Link from "next/link";
import { MapPin, Calendar } from "lucide-react";
import { DragonPattern } from "@/components/cultural";

export function HeroBanner() {
  return (
    <section className="relative min-h-[600px] flex items-center overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-dark">
      <DragonPattern
        className="absolute top-0 right-0 w-2/3 h-full"
        color="#C8A951"
        opacity={0.06}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-full bg-gold flex items-center justify-center">
            <span className="text-sm font-extrabold text-dark">ACM</span>
          </div>
          <span className="text-sm tracking-[0.2em] text-gold font-semibold uppercase">
            The 23rd Annual Meeting
          </span>
        </div>

        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white mb-4">
          ACM23
        </h1>
        <p className="text-xl sm:text-2xl text-white/90 max-w-2xl mb-2">
          Asian Consortium for Conservation &amp;
          <br />
          Sustainable Use of Microbial Resources
        </p>

        <div className="flex flex-wrap gap-4 mt-6 text-white/80">
          <span className="flex items-center gap-2 text-base">
            <MapPin size={18} className="text-accent" aria-hidden="true" />
            Hanoi, Vietnam
          </span>
          <span className="flex items-center gap-2 text-base">
            <Calendar size={18} className="text-accent" aria-hidden="true" />
            October 2026
          </span>
        </div>

        <div className="flex flex-wrap gap-4 mt-10">
          <Link
            href="/registration"
            className="bg-gold text-dark px-8 py-3.5 rounded-lg font-bold text-base hover:bg-gold/90 transition-colors"
          >
            Register Now
          </Link>
          <Link
            href="/abstract"
            className="border-2 border-white/40 text-white px-8 py-3.5 rounded-lg font-semibold text-base hover:bg-white/10 transition-colors"
          >
            Submit Abstract
          </Link>
        </div>
      </div>
    </section>
  );
}
