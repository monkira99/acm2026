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
    <div className="min-w-10 text-center sm:min-w-16">
      <div className="text-2xl font-extrabold leading-none text-[#2260AD] tabular-nums sm:text-3xl lg:text-4xl">
        {String(value).padStart(2, "0")}
      </div>
      <div className="mt-1 text-xs uppercase tracking-widest text-gray-500 sm:text-[0.6875rem]">
        {label}
      </div>
    </div>
  );
}

// Logo pairs mirror around the countdown: square marks hug the center
// (Bien Xanh left-inner, TABC right-inner), wide wordmarks sit outward
// (VNU first on the left, Suran on the right). Wide lockups share
// h-8/xl:h-9, square marks h-12/xl:h-13. At lg+ the bar is full-bleed
// (no container cap or padding): each flank cell is flex-1 with
// justify-evenly, so all six gaps from the true screen edges are exactly
// equal and the countdown stays centered. Bottoms aligned via items-end.
const LEFT_SPONSORS = [
  {
    src: "/images/sponsors/vnu-logo.svg",
    alt: "Vietnam National University, Hanoi (VNU)",
    width: 186,
    height: 60,
    className: "h-8 w-auto shrink-0 xl:h-9",
  },
  {
    src: "/images/sponsors/bien-xanh-logo.svg",
    alt: "BIỂN XANH",
    width: 1814,
    height: 1343,
    className: "h-12 w-auto shrink-0 xl:h-13",
  },
] as const;

const RIGHT_SPONSORS = [
  {
    src: "/images/sponsors/tabc-logo.png",
    alt: "TABC",
    width: 640,
    height: 467,
    className: "h-12 w-auto shrink-0 xl:h-13",
  },
  {
    src: "/images/sponsors/suran-logo.svg",
    alt: "Suran — Medical and Scientific Solution",
    width: 929,
    height: 291,
    className: "h-8 w-auto shrink-0 xl:h-9",
  },
] as const;

function SponsorCell({ logos }: { logos: typeof LEFT_SPONSORS | typeof RIGHT_SPONSORS }) {
  return (
    <div className="hidden min-w-0 flex-1 items-end justify-evenly lg:flex">
      {logos.map((logo) => (
        <Image
          key={logo.src}
          src={logo.src}
          alt={logo.alt}
          width={logo.width}
          height={logo.height}
          className={logo.className}
        />
      ))}
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

  const units = !mounted ? (
    ["Days", "Hours", "Minutes", "Seconds"].map((label) => (
      <TimeUnit key={label} value={0} label={label} />
    ))
  ) : (
    <>
      <TimeUnit value={timeLeft.days} label="Days" />
      <span className="text-lg font-light text-gray-300 sm:text-xl lg:text-2xl" aria-hidden="true">:</span>
      <TimeUnit value={timeLeft.hours} label="Hours" />
      <span className="text-lg font-light text-gray-300 sm:text-xl lg:text-2xl" aria-hidden="true">:</span>
      <TimeUnit value={timeLeft.minutes} label="Minutes" />
      <span className="text-lg font-light text-gray-300 sm:text-xl lg:text-2xl" aria-hidden="true">:</span>
      <TimeUnit value={timeLeft.seconds} label="Seconds" />
    </>
  );

  return (
    <section className="relative h-20 shrink-0 bg-light px-4 lg:px-0" aria-label="Countdown to ACM23">
      <span className="absolute left-4 top-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-400 lg:left-6">
        Sponsored by
      </span>
      <div className="flex h-full items-center justify-center">
        <SponsorCell logos={LEFT_SPONSORS} />
        <div className="flex shrink-0 items-center gap-2 sm:gap-4 lg:gap-6">
          {units}
        </div>
        <SponsorCell logos={RIGHT_SPONSORS} />
      </div>
    </section>
  );
}
