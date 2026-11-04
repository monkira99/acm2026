import type { ReactNode } from "react";

interface SectionHeroProps {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  action?: ReactNode;
}

export function SectionHero({
  title,
  subtitle,
  eyebrow = "ACM23 Hanoi",
  action,
}: SectionHeroProps) {
  const compact = !subtitle;

  return (
    <section className="bg-[linear-gradient(135deg,#2260AD_0%,#2D78D4_58%,#143D78_100%)]">
      <div
        className={`content-rail ${
          compact ? "py-6 sm:py-8" : "py-14 sm:py-16"
        }`}
      >
        <p
          className={`text-sm font-bold uppercase tracking-[0.18em] text-white/80 ${
            compact ? "mb-2" : "mb-3"
          }`}
        >
          {eyebrow}
        </p>
        <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-4">
          <h1
            className={`max-w-4xl break-words font-black leading-tight text-white ${
              compact ? "text-3xl sm:text-4xl" : "text-4xl sm:text-5xl"
            }`}
          >
            {title}
          </h1>
          {action}
        </div>
        {subtitle && (
          <p className="mt-3 max-w-2xl break-words text-lg text-white/75">
            {subtitle}
          </p>
        )}
        <div
          className={`flex items-center gap-2 ${compact ? "mt-3" : "mt-5"}`}
        >
          <span className="h-1.5 w-14 rounded-full bg-[#80AF41]" />
          <span className="h-1.5 w-14 rounded-full bg-[#CC212A]" />
          <span className="h-1.5 w-14 rounded-full bg-[#B0ABAC]" />
          <span className="h-1.5 w-14 rounded-full bg-[#2260AD]" />
        </div>
      </div>
    </section>
  );
}
