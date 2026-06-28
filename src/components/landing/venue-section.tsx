import Image from "next/image";
import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";
import { Section, SectionHeading } from "./section";
import { Reveal } from "./reveal";

const hanoiPhotos = [
  { src: "/images/venue/hoan-kiem-feature.webp", alt: "Hoan Kiem Lake, Hanoi" },
  { src: "/images/venue/temple-of-literature.webp", alt: "Temple of Literature, Hanoi" },
  {
    src: "/images/venue/imperial-citadel-thang-long.webp",
    alt: "Imperial Citadel of Thang Long, Hanoi",
  },
  { src: "/images/venue/hanoi-train-street.webp", alt: "Train Street, Hanoi" },
];

export function VenueSection() {
  return (
    <Section id="venue" tone="white">
      <SectionHeading
        eyebrow="Venue & Hanoi"
        title="Meet at West Lake, Hanoi"
        intro="ACM23 is hosted at the Legend Westlake Hotel on the shore of West Lake — a short distance from Hanoi's Old Quarter, museums, and centuries of culture."
      />

      <div className="mt-14 grid gap-6 lg:grid-cols-[1.1fr_1fr]">
        <Reveal>
          <div className="relative h-full min-h-[20rem] overflow-hidden rounded-2xl">
            <Image
              src="/images/venue/legend-westlake-hotel.webp"
              alt="Legend Westlake Hotel, Hanoi"
              fill
              sizes="(min-width: 1024px) 36rem, 100vw"
              className="object-cover"
            />
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "linear-gradient(180deg, rgba(11,40,79,0) 40%, rgba(11,40,79,0.85) 100%)",
              }}
            />
            <div className="absolute inset-x-0 bottom-0 p-7">
              <p className="lp-mono flex items-center gap-2 text-[0.65rem] uppercase tracking-[0.18em] text-[#9FE08A]">
                <MapPin size={13} aria-hidden="true" /> Conference venue
              </p>
              <p className="lp-display mt-2 text-2xl font-bold text-white">
                Legend Westlake Hotel
              </p>
              <p className="mt-1 text-sm text-white/80">1 Yen Phu, Hanoi, Vietnam</p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="grid h-full grid-cols-2 gap-3">
            {hanoiPhotos.map((photo) => (
              <div
                key={photo.src}
                className="relative aspect-[4/3] overflow-hidden rounded-xl"
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(min-width: 1024px) 16rem, 45vw"
                  className="object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
            ))}
          </div>
        </Reveal>
      </div>

      <Reveal>
        <Link
          href="/venue"
          className="group mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[#2260AD] hover:text-[#143D78]"
        >
          Venue, travel & where to stay
          <ArrowRight
            size={16}
            className="transition-transform group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </Link>
      </Reveal>
    </Section>
  );
}
