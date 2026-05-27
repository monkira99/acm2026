import { HeroBanner, Countdown } from "@/components/home";

export default function HomePage() {
  return (
    <div className="flex h-[calc(100svh-5rem)] flex-col overflow-hidden">
      <HeroBanner />
      <Countdown />
    </div>
  );
}
