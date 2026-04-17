import {
  HeroBanner,
  Countdown,
  Highlights,
  DatesPreview,
  VenuePreview,
} from "@/components/home";

export default function HomePage() {
  return (
    <>
      <HeroBanner />
      <Countdown />
      <Highlights />
      <DatesPreview />
      <VenuePreview />
    </>
  );
}
