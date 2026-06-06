import Image from "next/image";
import type { ReactNode } from "react";

type VenueDetailRowProps = {
  image: string;
  imageAlt: string;
  aspect: "hotel" | "place" | "food";
  reversed?: boolean;
  badge?: string;
  children: ReactNode;
};

const aspectClasses = {
  hotel: "aspect-video",
  place: "aspect-[3/2]",
  food: "aspect-[4/3]",
};

export function VenueDetailRow({
  image,
  imageAlt,
  aspect,
  reversed = false,
  badge,
  children,
}: VenueDetailRowProps) {
  return (
    <article
      className={`group grid grid-cols-1 overflow-hidden border border-[#2260AD]/10 bg-white/90 shadow-sm shadow-[#2260AD]/5 transition-shadow duration-300 hover:shadow-lg ${
        reversed
          ? "min-[720px]:[grid-template-columns:46%_54%]"
          : "min-[720px]:[grid-template-columns:54%_46%]"
      }`}
    >
      <div
        className={`relative min-h-0 overflow-hidden ${aspectClasses[aspect]} min-[720px]:h-full min-[720px]:min-h-[360px] min-[720px]:aspect-auto ${
          reversed ? "min-[720px]:order-2" : ""
        }`}
      >
        <Image
          src={image}
          alt={imageAlt}
          fill
          sizes="(min-width: 720px) 54vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
        {badge && (
          <span className="absolute left-4 top-4 rounded-full bg-[#C8A951]/95 px-3 py-1 text-xs font-semibold text-white shadow-sm backdrop-blur-sm">
            {badge}
          </span>
        )}
      </div>

      <div className="flex min-w-0 flex-col justify-center px-5 py-6 sm:px-7 min-[720px]:px-8 min-[720px]:py-9 lg:px-10">
        {children}
      </div>
    </article>
  );
}
