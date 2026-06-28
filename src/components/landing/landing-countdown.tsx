"use client";

import { useEffect, useState } from "react";

const CONFERENCE_DATE = new Date("2026-11-16T09:00:00+07:00");

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const EMPTY: TimeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };

function calcTimeLeft(): TimeLeft {
  const diff = CONFERENCE_DATE.getTime() - Date.now();
  if (diff <= 0) return EMPTY;
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function Unit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <span className="lp-display tabular-nums text-2xl font-bold leading-none text-white sm:text-4xl">
        {String(value).padStart(2, "0")}
      </span>
      <span className="lp-mono mt-1.5 text-[0.55rem] uppercase tracking-[0.18em] text-white/55 sm:mt-2 sm:text-[0.6rem] sm:tracking-[0.2em]">
        {label}
      </span>
    </div>
  );
}

/** Countdown to the opening session, styled for the hero band. */
export function LandingCountdown() {
  const [mounted, setMounted] = useState(false);
  const [t, setT] = useState<TimeLeft>(EMPTY);

  useEffect(() => {
    void Promise.resolve().then(() => {
      setMounted(true);
      setT(calcTimeLeft());
    });
    const timer = setInterval(() => setT(calcTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, []);

  const show = mounted ? t : EMPTY;

  return (
    <div
      className="flex w-full max-w-sm items-center justify-between gap-2 rounded-2xl border border-white/15 bg-white/[0.06] px-4 py-3.5 backdrop-blur-sm sm:gap-5 sm:px-7 sm:py-4 lg:w-auto"
      aria-label="Countdown to the opening of ACM23"
    >
      <Unit value={show.days} label="Days" />
      <span className="text-lg font-light text-white/25 sm:text-xl" aria-hidden="true">·</span>
      <Unit value={show.hours} label="Hrs" />
      <span className="text-lg font-light text-white/25 sm:text-xl" aria-hidden="true">·</span>
      <Unit value={show.minutes} label="Min" />
      <span className="text-lg font-light text-white/25 sm:text-xl" aria-hidden="true">·</span>
      <Unit value={show.seconds} label="Sec" />
    </div>
  );
}
