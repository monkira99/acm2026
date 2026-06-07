import Image from "next/image";
import { MapPin, Utensils } from "lucide-react";

const dishes = [
  {
    name: "Pho",
    description:
      "Vietnam's national dish. An aromatic broth with tender beef or chicken and fresh rice noodles.",
    restaurant: "Phở Lý Quốc Sư",
    address: "10 Ly Quoc Su St",
    mapUrl:
      "https://www.google.com/maps/place/10+P.+L%C3%BD+Qu%E1%BB%91c+S%C6%B0,+Ho%C3%A0n+Ki%E1%BA%BFm,+H%C3%A0+N%E1%BB%99i,+Vi%E1%BB%87t+Nam/@21.0304971,105.8487881,17z/data=!3m1!4b1!4m6!3m5!1s0x3135ab9588ba3bd3:0xfa5d929f5cfb541!8m2!3d21.0304971!4d105.8487881!16s%2Fg%2F11c2226tbq",
    image: "/images/venue/pho.webp",
    imageAlt: "Vietnamese Phở",
  },
  {
    name: "Bun Cha",
    description:
      "Famous worldwide (especially after President Obama tried it). Features flavorful charcoal-grilled pork patties in a warm, sweet-savory broth, served with herbs and rice vermicelli.",
    restaurant: "Bún Chả Hương Liên",
    address: "24 Le Van Huu St",
    mapUrl:
      "https://www.google.com/maps/place/B%C3%BAn+ch%E1%BA%A3+H%C6%B0%C6%A1ng+Li%C3%AAn/@21.0218278,105.8361203,15z/data=!4m6!3m5!1s0x3135abf2a4ba685d:0x7e67963f30fa90e7!8m2!3d21.0181373!4d105.8538926!16s%2Fg%2F1hm5x9fjz",
    image: "/images/venue/bun-cha.webp",
    imageAlt: "Bún Chả - Grilled pork with vermicelli",
  },
  {
    name: "Banh Mi",
    description:
      "A crispy, airy baguette packed with pate, local ham, cucumber, fresh herbs, and a drizzle of chili sauce. A perfect, quick street-food experience.",
    restaurant: "Bánh Mì 25",
    address: "25 Hang Ca St",
    mapUrl:
      "https://www.google.com/maps/place/Banh+Mi+25/@21.0348121,105.8426825,15z/data=!4m6!3m5!1s0x3135ab74bb3716b5:0xebfbc0d84354deb3!8m2!3d21.036113!4d105.848577!16s%2Fg%2F11tw_4rt41?entry=ttu&g_ep=EgoyMDI2MDYwMi4wIKXMDSoASAFQAw%3D%3D",
    image: "/images/venue/top-1-mon-sandwich-ngon-nhat-the-gioi-goi-ten-banh-my-viet-nam1710498007-182420240316092132.jpg",
    imageAlt: "Vietnamese Banh Mi Sandwich",
  },
  {
    name: "Egg Coffee",
    description:
      "A unique Hanoi specialty. A creamy, custard-like meringue whipped from egg yolk and condensed milk, poured over rich Vietnamese robusta coffee.",
    restaurant: "Café Giảng",
    address: "39 Nguyen Huu Huan St",
    mapUrl:
      "https://www.google.com/maps/place/Cafe+Gi%E1%BA%A3ng/@21.0334664,105.854518,17z/data=!3m1!4b1!4m6!3m5!1s0x3135abc0ee85335d:0xfca3408ac50e7363!8m2!3d21.0334664!4d105.854518!16s%2Fg%2F11bxg4n3g3",
    image: "/images/venue/egg-coffee.webp",
    imageAlt: "Hanoi Egg Coffee",
  },
];

export function TasteOfHanoiSection() {
  return (
    <section className="mt-10">
      <div className="overflow-hidden border border-[#2260AD]/10 bg-white/85 shadow-sm shadow-[#2260AD]/5">
        <div className="flex flex-col gap-2 border-b border-[#2260AD]/10 bg-[#F7FBFF] px-5 py-5 sm:flex-row sm:items-end sm:justify-between sm:px-6">
          <div>
            <h2 className="text-2xl font-black text-[#2260AD]">Cuisine</h2>
            <p className="mt-1 text-sm leading-6 text-[#263D5C]">
              Hanoi flavors with recommended local stops and map links.
            </p>
          </div>
        </div>

        <div className="grid gap-px bg-[#2260AD]/10 md:grid-cols-2 xl:grid-cols-4">
          {dishes.map((dish) => (
            <article
              key={dish.name}
              className="group flex min-h-full flex-col bg-white transition-colors duration-300 hover:bg-[#F7FBFF]"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-[#EAF2FB]">
                <Image
                  src={dish.image}
                  alt={dish.imageAlt}
                  fill
                  sizes="(min-width: 1280px) 25vw, (min-width: 768px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                />
              </div>

              <div className="flex flex-1 flex-col px-4 py-4">
                <h3 className="text-lg font-black text-[#143D78]">
                  {dish.name}
                </h3>
                <p className="mt-2 text-sm leading-6 text-[#263D5C]">
                  {dish.description}
                </p>

                <div className="mt-auto pt-4">
                  <div className="flex items-start gap-2 bg-[#F7FBFF] px-3 py-3 ring-1 ring-[#2260AD]/10">
                    <Utensils
                      size={16}
                      className="mt-0.5 shrink-0 text-[#2260AD]"
                      aria-hidden="true"
                    />
                    <div className="text-sm">
                      <p className="font-semibold text-[#2260AD]">
                        {dish.restaurant}
                      </p>
                      <p className="text-[#263D5C]">{dish.address}</p>
                    </div>
                  </div>

                  <a
                    href={dish.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-[#2260AD] transition-colors hover:text-[#143D78] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2260AD]"
                  >
                    <MapPin size={14} aria-hidden="true" />
                    View on Map
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
