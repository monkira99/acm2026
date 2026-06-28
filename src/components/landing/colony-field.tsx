/**
 * ColonyField — the landing page signature motif.
 *
 * A scatter of "cells" (dots) whose density rises from left to right, echoing
 * the conference theme "From Single Cells to Microbiomes". Positions are
 * deterministic (seeded) so server and client render identically — no
 * hydration drift, no runtime Math.random.
 */

interface Dot {
  cx: number;
  cy: number;
  r: number;
  o: number;
}

// Tiny deterministic PRNG (mulberry32). Same seed → same sequence on server
// and client, which keeps hydration stable.
function makeRng(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const WIDTH = 1200;
const HEIGHT = 600;

function buildDots(count: number, seed: number): Dot[] {
  const rng = makeRng(seed);
  const dots: Dot[] = [];
  for (let i = 0; i < count; i++) {
    // Bias x toward the right so the field "grows" into a colony.
    const bias = rng();
    const x = Math.pow(rng(), 0.6) * WIDTH * 0.5 + bias * WIDTH * 0.5;
    const y = rng() * HEIGHT;
    // Larger, denser dots where x is greater.
    const scale = 0.4 + (x / WIDTH) * 0.9;
    dots.push({
      cx: Math.round(x),
      cy: Math.round(y),
      r: +(1.4 + rng() * 3.4 * scale).toFixed(2),
      o: +(0.12 + rng() * 0.5 * scale).toFixed(3),
    });
  }
  return dots;
}

const DOTS = buildDots(150, 0x9e37);
// A few accent "active colonies" that gently pulse.
const ACCENTS = buildDots(7, 0x51ed).map((d) => ({ ...d, r: d.r + 2 }));

interface ColonyFieldProps {
  className?: string;
  /** Dot color; defaults to white for use over the dark hero. */
  color?: string;
  /** Accent color for the pulsing colonies. */
  accentColor?: string;
}

export function ColonyField({
  className,
  color = "#ffffff",
  accentColor = "#80AF41",
}: ColonyFieldProps) {
  return (
    <svg
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <g fill={color}>
        {DOTS.map((d, i) => (
          <circle key={i} cx={d.cx} cy={d.cy} r={d.r} opacity={d.o} />
        ))}
      </g>
      <g fill={accentColor}>
        {ACCENTS.map((d, i) => (
          <circle
            key={i}
            className="lp-pulse"
            cx={d.cx}
            cy={d.cy}
            r={d.r}
            opacity={Math.min(0.85, d.o + 0.3)}
            style={{ animationDelay: `${(i % 5) * 0.7}s` }}
          />
        ))}
      </g>
    </svg>
  );
}
