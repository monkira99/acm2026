import type { ReactNode } from "react";
import { Reveal } from "./reveal";

interface SectionHeadingProps {
  /** Mono category label, e.g. "RESEARCH THEMES". An honest tag, not a number. */
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  /** Center the heading block (used on band sections). */
  align?: "left" | "center";
  /** Tone of the eyebrow dot + text. */
  tone?: "blue" | "light";
}

/**
 * Shared section heading: a colony-dot eyebrow tag in mono, a display title,
 * and optional intro copy. The leading dot ties every section back to the
 * page's cell/colony signature.
 */
export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  tone = "blue",
}: SectionHeadingProps) {
  const isLight = tone === "light";
  return (
    <Reveal
      className={
        align === "center"
          ? "mx-auto max-w-2xl text-center"
          : "max-w-2xl"
      }
    >
      <p
        className={`lp-mono flex items-center gap-2.5 text-[0.7rem] font-medium uppercase tracking-[0.22em] ${
          isLight ? "text-white/70" : "text-[#2260AD]"
        } ${align === "center" ? "justify-center" : ""}`}
      >
        <span
          className={`inline-block h-1.5 w-1.5 rounded-full ${
            isLight ? "bg-[#80AF41]" : "bg-[#80AF41]"
          }`}
          aria-hidden="true"
        />
        {eyebrow}
      </p>
      <h2
        className={`lp-display mt-4 text-3xl font-bold leading-[1.1] tracking-tight sm:text-4xl lg:text-[2.75rem] ${
          isLight ? "text-white" : "text-[#143D78]"
        }`}
      >
        {title}
      </h2>
      {intro ? (
        <p
          className={`mt-5 text-base leading-7 sm:text-lg sm:leading-8 ${
            isLight ? "text-white/80" : "text-[#3F5067]"
          }`}
        >
          {intro}
        </p>
      ) : null}
    </Reveal>
  );
}

interface SectionProps {
  id: string;
  children: ReactNode;
  /** Background tone for the band. */
  tone?: "white" | "tint" | "ink";
  className?: string;
}

const toneClass: Record<NonNullable<SectionProps["tone"]>, string> = {
  white: "bg-white",
  tint: "bg-[#EAF2FB]",
  ink: "bg-[#0B284F] text-white",
};

export function Section({ id, children, tone = "white", className }: SectionProps) {
  return (
    <section
      id={id}
      className={`scroll-mt-24 px-5 py-20 sm:px-8 sm:py-24 lg:py-28 ${toneClass[tone]} ${className ?? ""}`}
    >
      <div className="mx-auto w-full max-w-6xl">{children}</div>
    </section>
  );
}
