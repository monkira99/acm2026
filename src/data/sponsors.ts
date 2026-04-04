export interface Sponsor {
  name: string;
  logoUrl: string;
  url: string;
  tier: "platinum" | "gold" | "silver";
}

export const sponsors: Sponsor[] = [
  { name: "Sponsor 1", logoUrl: "/images/sponsors/placeholder.png", url: "#", tier: "platinum" },
  { name: "Sponsor 2", logoUrl: "/images/sponsors/placeholder.png", url: "#", tier: "gold" },
  { name: "Sponsor 3", logoUrl: "/images/sponsors/placeholder.png", url: "#", tier: "gold" },
  { name: "Sponsor 4", logoUrl: "/images/sponsors/placeholder.png", url: "#", tier: "silver" },
  { name: "Sponsor 5", logoUrl: "/images/sponsors/placeholder.png", url: "#", tier: "silver" },
  { name: "Sponsor 6", logoUrl: "/images/sponsors/placeholder.png", url: "#", tier: "silver" },
];
