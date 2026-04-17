import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function VenuePreview() {
  return (
    <section className="bg-gradient-to-r from-dark to-primary">
      <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="mx-auto max-w-xl text-center lg:mx-0 lg:text-left">
            <span className="text-xs tracking-[0.2em] text-gold font-semibold uppercase">
              Discover Hanoi
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-3 mb-5">
              The City of the
              <br />
              Ascending Dragon
            </h2>
            <p className="mx-auto max-w-md text-base leading-relaxed text-white/70 lg:mx-0">
              A thousand years of history, culture, and cuisine await you in
              Vietnam&apos;s capital city. From the ancient Temple of Literature to
              the vibrant Old Quarter, Hanoi offers an unforgettable experience.
            </p>
            <Link
              href="/venue"
              className="mt-8 inline-flex items-center gap-2 rounded-lg border border-white/20 px-6 py-3 text-white transition-colors hover:bg-white/10"
            >
              Explore Venue
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
          <div className="relative mx-auto h-64 w-full max-w-2xl overflow-hidden rounded-2xl lg:h-80">
            <Image
              src="/images/venue/hoan-kiem-hero.jpg"
              alt="Hoan Kiem Lake view in Hanoi"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark/35 via-transparent to-white/10" />
          </div>
        </div>
      </div>
    </section>
  );
}
