"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties, ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Stagger delay in seconds. */
  delay?: number;
  as?: "div" | "li" | "section";
}

/**
 * Scroll-reveal with progressive enhancement.
 *
 * Content renders fully visible during SSR and without JavaScript — there is
 * never a state where the page is blank. On the client, JS only *arms* the
 * fade-in for elements that are still below the fold, so above-the-fold content
 * never flashes, and reduced-motion users always see static content.
 */
export function Reveal({ children, className, delay = 0, as = "div" }: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  // `armed` = JS has decided to animate this element (it was below the fold).
  const [armed, setArmed] = useState(false);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return; // leave content static & visible

    const rect = el.getBoundingClientRect();
    const belowFold = rect.top > window.innerHeight * 0.88;
    if (!belowFold) return; // already on screen — never hide it

    let observer: IntersectionObserver | undefined;
    // Arm one frame after mount: the element is off-screen, so hiding it now
    // causes no visible flash, and keeps state changes out of the sync effect.
    const raf = requestAnimationFrame(() => {
      setArmed(true);
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              setShown(true);
              observer?.disconnect();
            }
          }
        },
        { rootMargin: "0px 0px -10% 0px" },
      );
      observer.observe(el);
    });

    return () => {
      cancelAnimationFrame(raf);
      observer?.disconnect();
    };
  }, []);

  const style: CSSProperties | undefined = armed
    ? {
        opacity: shown ? 1 : 0,
        transform: shown ? "none" : "translateY(18px)",
        transition: `opacity 0.6s ease ${delay}s, transform 0.6s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s`,
      }
    : undefined;

  const Tag = as;
  return (
    <Tag
      ref={ref as React.Ref<HTMLDivElement & HTMLLIElement>}
      className={className}
      style={style}
    >
      {children}
    </Tag>
  );
}
