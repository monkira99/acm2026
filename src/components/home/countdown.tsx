"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const CONFERENCE_DATE = new Date("2026-11-16T09:00:00+07:00");

const PARTNER_LOGOS = [
  {
    src: "/acm_logo.png",
    alt: "Asian Consortium for the Conservation and Sustainable Use of Microbial Resources logo",
    width: 1280,
    height: 274,
    className: "basis-[33.6%]",
    unoptimized: false,
  },
  {
    src: "/logo_imbt.png",
    alt: "Institute of Microbiology and Biotechnology logo",
    width: 1578,
    height: 238,
    className: "basis-[44.62%]",
    unoptimized: false,
  },
  {
    src: "/LogoVNU-2015.svg",
    alt: "Vietnam National University logo",
    width: 186,
    height: 60,
    className: "basis-[21.78%]",
    unoptimized: true,
  },
] as const;

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
    <div className="min-w-12 text-center sm:min-w-14 lg:min-w-0">
      <div className="text-2xl font-extrabold text-[#2260AD] tabular-nums sm:text-3xl xl:text-4xl">
        {String(value).padStart(2, "0")}
      </div>
      <div className="mt-1 text-[0.625rem] text-gray-500 uppercase tracking-widest sm:text-xs lg:text-[0.625rem] xl:text-xs">
        {label}
      </div>
    </div>
  );
}

function CountdownLogos() {
  return (
    <div className="mx-auto flex w-full max-w-4xl min-w-0 flex-nowrap items-center justify-center gap-3 lg:mx-0 lg:max-w-none lg:justify-start xl:gap-5">
      {PARTNER_LOGOS.map((logo) => (
        <Image
          key={logo.src}
          src={logo.src}
          alt={logo.alt}
          width={logo.width}
          height={logo.height}
          sizes="(min-width: 1280px) 18rem, (min-width: 1024px) 28vw, 70vw"
          unoptimized={logo.unoptimized}
          className={`${logo.className} h-auto min-w-0 max-w-full shrink object-contain`}
        />
      ))}
    </div>
  );
}

function CountdownTimer({ timeLeft }: { timeLeft: TimeLeft }) {
  return (
    <div className="flex min-w-0 items-center justify-center gap-1 sm:gap-2 lg:justify-end xl:gap-3">
      <TimeUnit value={timeLeft.days} label="Days" />
      <span
        className="text-xl font-light text-gray-300 sm:text-2xl xl:text-3xl"
        aria-hidden="true"
      >
        :
      </span>
      <TimeUnit value={timeLeft.hours} label="Hours" />
      <span
        className="text-xl font-light text-gray-300 sm:text-2xl xl:text-3xl"
        aria-hidden="true"
      >
        :
      </span>
      <TimeUnit value={timeLeft.minutes} label="Minutes" />
      <span
        className="text-xl font-light text-gray-300 sm:text-2xl xl:text-3xl"
        aria-hidden="true"
      >
        :
      </span>
      <TimeUnit value={timeLeft.seconds} label="Seconds" />
    </div>
  );
}

export function Countdown() {
  const [mounted, setMounted] = useState(false);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    void Promise.resolve().then(() => {
      setMounted(true);
      setTimeLeft(calcTimeLeft());
    });
    const timer = setInterval(() => setTimeLeft(calcTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, []);

  const displayTime = mounted
    ? timeLeft
    : { days: 0, hours: 0, minutes: 0, seconds: 0 };

  return (
    <section
      className="shrink-0 bg-light px-4 py-4 sm:py-5 lg:py-6"
      aria-label="Partner logos and countdown to ACM23"
    >
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid items-center gap-5 lg:grid-cols-[2fr_1fr] lg:gap-8">
          <CountdownLogos />
          <CountdownTimer timeLeft={displayTime} />
        </div>
      </div>
    </section>
  );
}
