import { MapPin, Utensils } from "lucide-react";
import { VenueDetailRow } from "./venue-detail-row";

const dishes = [
  {
    name: "Pho",
    description: "Vietnam's national dish. A aromatic broth with tender beef or chicken and fresh rice noodles.",
    restaurant: "Phở Lý Quốc Sư",
    address: "10 Ly Quoc Su St.",
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
    address: "24 Le Van Huu St.",
    mapUrl:
      "https://www.google.com/maps/place/B%C3%BAn+ch%E1%BA%A3+H%C6%B0%C6%A1ng+Li%C3%AAn/@21.0218278,105.8361203,15z/data=!4m6!3m5!1s0x3135abf2a4ba685d:0x7e67963f30fa90e7!8m2!3d21.0181373!4d105.8538926!16s%2Fg%2F1hm5x9fjz",
    image: "/images/venue/bun-cha.webp",
    imageAlt: "Bún Chả - Grilled pork with vermicelli",
  },
  {
    name: "Egg Coffee",
    description: "A unique Hanoi specialty. A creamy, custard-like meringue whipped from egg yolk and condensed milk, poured over rich Vietnamese robusta coffee.",
    restaurant: "Café Giảng",
    address: "39 Nguyen Huu Huan St. - The Original",
    mapUrl:
      "https://www.google.com/maps/place/Cafe+Gi%E1%BA%A3ng/@21.0334664,105.854518,17z/data=!3m1!4b1!4m6!3m5!1s0x3135abc0ee85335d:0xfca3408ac50e7363!8m2!3d21.0334664!4d105.854518!16s%2Fg%2F11bxg4n3g3",
    image: "/images/venue/egg-coffee.webp",
    imageAlt: "Hanoi Egg Coffee",
  },
    {
    name: "Banh Mi",
    description: "A crispy, airy baguette packed with pate, local ham, cucumber, fresh herbs, and a drizzle of chili sauce. A perfect, quick street-food experience.",
    restaurant: "Bánh Mì 25",
    address: "25 Hang Ca St",
    mapUrl:
      "https://www.google.com/maps/place/Banh+Mi+25/@21.0348121,105.8426825,15z/data=!4m6!3m5!1s0x3135ab74bb3716b5:0xebfbc0d84354deb3!8m2!3d21.036113!4d105.848577!16s%2Fg%2F11tw_4rt41?entry=ttu&g_ep=EgoyMDI2MDYwMi4wIKXMDSoASAFQAw%3D%3D",
    image: "/images/venue/top-1-mon-sandwich-ngon-nhat-the-gioi-goi-ten-banh-my-viet-nam1710498007-182420240316092132.jpg",
    imageAlt: "Vietnamese Banh Mi Sandwich",
  },
];

export function TasteOfHanoiSection() {
  return (
    <section className="mt-12">
      <div className="mb-5 flex flex-col gap-1 border-b border-[#2260AD]/20 pb-4 sm:flex-row sm:items-end sm:justify-between">
        <h2 className="text-2xl font-black text-[#2260AD]">Cuisine</h2>
      </div>

      <div className="space-y-6">
        {dishes.map((dish, index) => (
          <VenueDetailRow
            key={dish.name}
            image={dish.image}
            imageAlt={dish.imageAlt}
            aspect="food"
            reversed={index % 2 === 1}
          >
            <h3 className="mb-2 text-xl font-black text-[#143D78] sm:text-2xl">
              {dish.name}
            </h3>
            <p className="mb-5 text-sm leading-6 text-[#263D5C]">
              {dish.description}
            </p>

            <div className="mb-4 flex items-start gap-2">
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
              className="inline-flex w-fit items-center gap-1.5 rounded-sm text-sm font-medium text-[#2260AD] transition-colors hover:text-[#143D78] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2260AD]"
            >
              <MapPin size={14} aria-hidden="true" />
              View on Map
            </a>
          </VenueDetailRow>
        ))}
      </div>
    </section>
  );
}
