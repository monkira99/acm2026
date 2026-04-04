import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function VenuePreview() {
  return (
    <section className="bg-gradient-to-r from-dark to-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-xs tracking-[0.2em] text-gold font-semibold uppercase">
              Discover Hanoi
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-3 mb-5">
              The City of the
              <br />
              Ascending Dragon
            </h2>
            <p className="text-base text-white/70 leading-relaxed max-w-md">
              A thousand years of history, culture, and cuisine await you in
              Vietnam&apos;s capital city. From the ancient Temple of Literature to
              the vibrant Old Quarter, Hanoi offers an unforgettable experience.
            </p>
            <Link
              href="/venue"
              className="inline-flex items-center gap-2 mt-8 text-white border border-white/20 px-6 py-3 rounded-lg hover:bg-white/10 transition-colors"
            >
              Explore Venue
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
          <div className="w-full h-64 lg:h-80 rounded-2xl bg-gradient-to-br from-secondary to-accent flex items-center justify-center">
            <span className="text-white/40 text-sm">
              [ Hanoi photo placeholder ]
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
