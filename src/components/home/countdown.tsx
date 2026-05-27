"use client";

import { useEffect, useState } from "react";

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
    <div className="min-w-14 text-center sm:min-w-20">
      <div className="text-3xl font-extrabold text-[#2260AD] tabular-nums sm:text-5xl">
        {String(value).padStart(2, "0")}
      </div>
      <div className="text-xs text-gray-500 uppercase tracking-widest mt-1">
        {label}
      </div>
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

  if (!mounted) {
    return (
      <section className="shrink-0 bg-light px-4 py-5 sm:py-8 lg:py-10" aria-label="Countdown to ACM23">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-center gap-2 sm:gap-6 lg:gap-10">
            {["Days", "Hours", "Minutes", "Seconds"].map((label) => (
              <TimeUnit key={label} value={0} label={label} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="shrink-0 bg-light px-4 py-5 sm:py-8 lg:py-10" aria-label="Countdown to ACM23">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-center gap-2 sm:gap-6 lg:gap-10">
          <TimeUnit value={timeLeft.days} label="Days" />
          <span className="text-2xl text-gray-300 font-light sm:text-3xl" aria-hidden="true">:</span>
          <TimeUnit value={timeLeft.hours} label="Hours" />
          <span className="text-2xl text-gray-300 font-light sm:text-3xl" aria-hidden="true">:</span>
          <TimeUnit value={timeLeft.minutes} label="Minutes" />
          <span className="text-2xl text-gray-300 font-light sm:text-3xl" aria-hidden="true">:</span>
          <TimeUnit value={timeLeft.seconds} label="Seconds" />
        </div>
      </div>
    </section>
  );
}
