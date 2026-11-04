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
    <div className="min-w-0 text-center">
      <div className="text-3xl font-bold leading-none text-[#2260AD] tabular-nums sm:text-4xl lg:text-5xl xl:text-6xl">
        {String(value).padStart(2, "0")}
      </div>
      <div className="mt-2 text-[10px] uppercase leading-none tracking-widest text-gray-500 lg:text-xs">
        {label}
      </div>
    </div>
  );
}

// Preserve each mark's proportions; the wide Suran lockup needs less height
// to carry the same visual weight as the more compact logos.
const SPONSORS = [
  {
    src: "/images/sponsors/arc-logo.svg",
    alt: "ARC — Asia Research Center",
    width: 129,
    height: 79,
    className: "h-full scale-125",
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
    <ul className="grid min-w-0 grid-cols-6 items-center gap-x-6 gap-y-4 sm:grid-cols-5 [&>li:nth-child(4)]:col-start-2 sm:[&>li:nth-child(4)]:col-start-auto" aria-label="Sponsors">
      {SPONSORS.map((logo) => (
        <li key={logo.src} className="col-span-2 flex h-12 min-w-0 items-center justify-center sm:col-span-1 lg:h-10">
          <Image
            src={logo.src}
            alt={logo.alt}
            width={logo.width}
            height={logo.height}
            sizes="(min-width: 1024px) 112px, (min-width: 640px) 18vw, 28vw"
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
      <span className="self-start text-2xl font-light leading-none text-gray-300 sm:text-3xl lg:pt-1 lg:text-4xl xl:text-5xl" aria-hidden="true">:</span>
      <TimeUnit value={timeLeft.hours} label="Hours" />
      <span className="self-start text-2xl font-light leading-none text-gray-300 sm:text-3xl lg:pt-1 lg:text-4xl xl:text-5xl" aria-hidden="true">:</span>
      <TimeUnit value={timeLeft.minutes} label="Minutes" />
      <span className="self-start text-2xl font-light leading-none text-gray-300 sm:text-3xl lg:pt-1 lg:text-4xl xl:text-5xl" aria-hidden="true">:</span>
      <TimeUnit value={timeLeft.seconds} label="Seconds" />
    </>
  );

  return (
    <section className="shrink-0 bg-light" aria-label="Conference countdown and sponsors">
      <div className="mx-auto grid max-w-(--breakpoint-2xl) gap-5 px-6 py-5 sm:px-8 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] lg:items-center lg:gap-8 lg:pt-0">
        <div className="min-w-0">
          <h2 className="mb-3 text-center text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-500 lg:text-left lg:leading-4">
            Sponsored by
          </h2>
          <SponsorGroup />
        </div>
        <div className="flex justify-center border-t border-slate-200 pt-5 lg:self-stretch lg:items-center lg:border-t-0 lg:border-l lg:pt-7 lg:pl-8" role="timer" aria-label="Countdown to ACM23" aria-live="off">
          <div className="grid w-full max-w-80 grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)_auto_minmax(0,1fr)_auto_minmax(0,1fr)] gap-2 lg:max-w-none lg:gap-3">
            {units}
          </div>
        </div>
      </div>
    </section>
  );
}
