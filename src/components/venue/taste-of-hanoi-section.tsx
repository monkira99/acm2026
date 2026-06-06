"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { MapPin, Utensils } from "lucide-react";

const dishes = [
  {
    name: "Phở",
    description: "Vietnam's national dish - aromatic broth with rice noodles",
    restaurant: "Phở Lý Quốc Sư",
    address: "10 Ly Quoc Su St.",
    mapUrl:
      "https://www.google.com/maps/place/10+P.+L%C3%BD+Qu%E1%BB%91c+S%C6%B0,+Ho%C3%A0n+Ki%E1%BA%BFm,+H%C3%A0+N%E1%BB%99i,+Vi%E1%BB%87t+Nam/@21.0304971,105.8487881,17z/data=!3m1!4b1!4m6!3m5!1s0x3135ab9588ba3bd3:0xfa5d929f5cfb541!8m2!3d21.0304971!4d105.8487881!16s%2Fg%2F11c2226tbq",
    image: "/images/venue/hoan-kiem-lake.jpg",
    imageAlt: "Vietnamese Phở",
  },
  {
    name: "Bún Chả",
    description:
      "Charcoal-grilled pork with vermicelli - President Obama's choice",
    restaurant: "Bún Chả Hương Liên",
    address: "24 Le Van Huu St.",
    mapUrl:
      "https://www.google.com/maps/place/B%C3%BAn+ch%E1%BA%A3+H%C6%B0%C6%A1ng+Li%C3%AAn/@21.0218278,105.8361203,15z/data=!4m6!3m5!1s0x3135abf2a4ba685d:0x7e67963f30fa90e7!8m2!3d21.0181373!4d105.8538926!16s%2Fg%2F1hm5x9fjz",
    image: "/images/venue/old-quarter.jpg",
    imageAlt: "Bún Chả - Grilled pork with vermicelli",
  },
  {
    name: "Egg Coffee (Cà Phê Trứng)",
    description: "Creamy custard-like meringue over rich Vietnamese coffee",
    restaurant: "Café Giảng",
    address: "39 Nguyen Huu Huan St. - The Original",
    mapUrl:
      "https://www.google.com/maps/place/Cafe+Gi%E1%BA%A3ng/@21.0334664,105.854518,17z/data=!3m1!4b1!4m6!3m5!1s0x3135abc0ee85335d:0xfca3408ac50e7363!8m2!3d21.0334664!4d105.854518!16s%2Fg%2F11bxg4n3g3",
    image: "/images/venue/hoan-kiem-feature.webp",
    imageAlt: "Hanoi Egg Coffee",
  },
];

export function TasteOfHanoiSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="mt-12">
      <div className="mb-5 flex flex-col gap-1 border-b border-[#2260AD]/20 pb-4 sm:flex-row sm:items-end sm:justify-between">
        <h2 className="text-2xl font-black text-[#2260AD]">Taste of Hanoi</h2>
      </div>

      <p className="mb-6 text-sm leading-6 text-[#263D5C]">
        Explore Hanoi's world-famous cuisine - from traditional phở to the
        unique egg coffee experience.
      </p>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {dishes.map((dish, index) => (
          <motion.div
            key={dish.name}
            initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              duration: 0.6,
              delay: index * 0.1,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="group overflow-hidden bg-white/80 shadow-sm shadow-[#2260AD]/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
          >
            {/* Image */}
            <div className="relative aspect-square overflow-hidden">
              <Image
                src={dish.image}
                alt={dish.imageAlt}
                fill
                sizes="(min-width: 768px) 33vw, 100vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>

            {/* Content */}
            <div className="p-5">
              <h3 className="mb-2 text-lg font-bold text-[#143D78]">
                {dish.name}
              </h3>
              <p className="mb-4 text-sm leading-relaxed text-[#263D5C]">
                {dish.description}
              </p>

              {/* Restaurant info */}
              <div className="mb-3 flex items-start gap-2">
                <Utensils
                  size={14}
                  className="mt-0.5 shrink-0 text-[#2260AD]"
                />
                <div className="text-xs">
                  <p className="font-semibold text-[#2260AD]">
                    {dish.restaurant}
                  </p>
                  <p className="text-[#263D5C]">{dish.address}</p>
                </div>
              </div>

              {/* Map link */}
              <a
                href={dish.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-medium text-[#2260AD] transition-colors hover:text-[#143D78]"
              >
                <MapPin size={12} />
                View on Map
              </a>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Additional note about craft beer */}
      <div className="mt-6 rounded-lg bg-white/60 px-5 py-4">
        <p className="text-sm text-[#263D5C]">
          <span className="font-semibold text-[#143D78]">
            West Lake Craft Beer Scene:
          </span>{" "}
          Around Legend Westlake Hotel (Xuan Dieu & To Ngoc Van streets),
          you'll find Hanoi's best craft beer taprooms and cocktail bars with
          stunning sunset views.
        </p>
      </div>
    </section>
  );
}
