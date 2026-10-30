"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const CONFERENCE_DATE = new Date("2026-11-16T09:00:00+07:00");

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calcTimeLeft(): TimeLeft {
  const diff = CONFERENCE_DATE.getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function TimeUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="relative min-w-0 text-center">
      <div className="flex h-[clamp(2rem,10cqw,2.75rem)] items-center justify-center text-[clamp(1.25rem,9cqw,2.5rem)] font-extrabold leading-none text-[#2260AD] tabular-nums">
        {String(value).padStart(2, "0")}
      </div>
      <div className="absolute inset-x-0 top-full mt-[clamp(0.125rem,0.8cqw,0.25rem)] whitespace-nowrap text-[clamp(0.625rem,2.7cqw,0.75rem)] uppercase leading-[1.15] tracking-[0.08em] text-gray-500">
        {label}
      </div>
    </div>
  );
}

// Container-relative sizing keeps the five marks responsive to the space left
// beside the countdown. The wide Suran lockup uses less height for visual balance.
const SPONSORS = [
  {
    src: "/images/sponsors/arc-logo.svg",
    alt: "ARC — Asia Research Center",
    width: 129,
    height: 79,
    className: "h-full",
  },
  {
    src: "/images/sponsors/tabc-logo.png",
    alt: "TABC",
    width: 640,
    height: 467,
    className: "h-full",
  },
  {
    src: "/images/sponsors/bien-xanh-logo.svg",
    alt: "BIỂN XANH",
    width: 1814,
    height: 1343,
    className: "h-full",
  },
  {
    src: "/images/sponsors/suran-logo.svg",
    alt: "Suran — Medical and Scientific Solution",
    width: 929,
    height: 291,
    className: "h-3/4",
  },
  {
    src: "/images/sponsors/tekco-logo.svg",
    alt: "TEKCO Viet Nam Company Limited",
    width: 394,
    height: 227,
    className: "h-full",
  },
] as const;

function SponsorGroup() {
  return (
    <ul className="grid w-full min-w-0 grid-cols-6 items-center gap-[clamp(0.5rem,2vw,2rem)] [container-type:inline-size] [&>li:nth-child(4)]:col-start-2 lg:w-auto lg:flex-1 lg:grid-cols-5 lg:[&>li:nth-child(4)]:col-start-auto" aria-label="Sponsors">
      {SPONSORS.map((logo) => (
        <li key={logo.src} className="col-span-2 flex h-[clamp(2.5rem,14cqw,4rem)] min-w-0 items-center justify-center lg:col-span-1 lg:h-[clamp(2rem,6cqw,3.5rem)]">
          <Image
            src={logo.src}
            alt={logo.alt}
            width={logo.width}
            height={logo.height}
            sizes="(min-width: 1024px) 15vw, 30vw"
            className={`w-full object-contain ${logo.className}`}
          />
        </li>
      ))}
    </ul>
  );
}

export function Countdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    void Promise.resolve().then(() => {
      setTimeLeft(calcTimeLeft());
    });
    const timer = setInterval(() => setTimeLeft(calcTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, []);

  const units = (
    <>
      <TimeUnit value={timeLeft.days} label="Days" />
      <span className="flex h-[clamp(2rem,10cqw,2.75rem)] items-center text-[clamp(1rem,6cqw,1.75rem)] font-light leading-none text-gray-300" aria-hidden="true">:</span>
      <TimeUnit value={timeLeft.hours} label="Hours" />
      <span className="flex h-[clamp(2rem,10cqw,2.75rem)] items-center text-[clamp(1rem,6cqw,1.75rem)] font-light leading-none text-gray-300" aria-hidden="true">:</span>
      <TimeUnit value={timeLeft.minutes} label="Minutes" />
      <span className="flex h-[clamp(2rem,10cqw,2.75rem)] items-center text-[clamp(1rem,6cqw,1.75rem)] font-light leading-none text-gray-300" aria-hidden="true">:</span>
      <TimeUnit value={timeLeft.seconds} label="Seconds" />
    </>
  );

  return (
    <section className="relative flex shrink-0 flex-col items-center gap-4 bg-light px-4 py-5 lg:h-[clamp(5rem,6.25vw,6rem)] lg:flex-row lg:gap-6 lg:px-6 lg:pb-0 lg:pt-2" aria-label="Conference countdown and sponsors">
      <h2 className="text-center text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-500 lg:absolute lg:left-6 lg:top-0.5">
        Sponsored by
      </h2>
      <SponsorGroup />
      <div className="order-first w-full max-w-md shrink-0 pb-5 [container-type:inline-size] lg:order-none lg:w-[30%] lg:max-w-[30rem] lg:pb-0" aria-label="Countdown to ACM23">
        <div className="grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)_auto_minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-[clamp(0.25rem,2cqw,0.75rem)]">
          {units}
        </div>
      </div>
    </section>
  );
}
