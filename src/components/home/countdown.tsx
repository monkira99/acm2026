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

// Fitted into the existing h-20 band: bottoms aligned so the wordmark
// baselines sit on one line; optical areas balanced (stacked vs
// horizontal lockup). The inter-logo gap is doubled (16px lg / 24px xl)
// via BX margin so it breathes against the label and countdown gaps.
// At lg the left cell budgets ~264px against a 270px flank (1024px
// viewport, 420px countdown); at xl ~313px against a ~414px flank.
const SPONSORS = [
  {
    src: "/images/sponsors/suran-logo.svg",
    alt: "Suran — Medical and Scientific Solution",
    width: 929,
    height: 291,
    className: "h-7 w-auto shrink-0 xl:h-8",
  },
  {
    src: "/images/sponsors/bien-xanh-logo.svg",
    alt: "BIỂN XANH",
    width: 1814,
    height: 1343,
    className: "ms-2 h-11 w-auto shrink-0 xl:ms-3 xl:h-12",
  },
] as const;

function SponsorCell() {
  return (
    <div className="hidden min-w-0 flex-1 items-end gap-2 lg:flex xl:gap-3">
      <span className="shrink-0 whitespace-nowrap text-[10px] font-bold uppercase tracking-[0.15em] text-gray-400 xl:text-[11px] xl:tracking-[0.2em]">
        Sponsored by
      </span>
      {SPONSORS.map((logo) => (
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
    <section className="h-20 shrink-0 bg-light px-4" aria-label="Countdown to ACM23">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-center px-4 lg:justify-start">
        <SponsorCell />
        <div className="flex shrink-0 items-center gap-2 sm:gap-4 lg:gap-6">
          {units}
        </div>
        <div className="hidden flex-1 lg:block" aria-hidden="true" />
      </div>
    </section>
  );
}
