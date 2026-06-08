import { HeroBanner, Countdown } from "@/components/home";

export default function HomePage() {
  return (
    <div className="flex min-h-[calc(100svh-5rem)] flex-col">
      <HeroBanner />
      <Countdown />
    </div>
  );
}
