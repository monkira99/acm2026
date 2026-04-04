interface BorderPatternProps {
  className?: string;
  color?: string;
  opacity?: number;
}

export function BorderPattern({
  className = "",
  color = "currentColor",
  opacity = 0.15,
}: BorderPatternProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 400 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ opacity }}
      aria-hidden="true"
      preserveAspectRatio="none"
    >
      <defs>
        <pattern id="border-unit" x="0" y="0" width="40" height="12" patternUnits="userSpaceOnUse">
          <rect x="2" y="2" width="8" height="8" rx="1" stroke={color} strokeWidth="0.8" fill="none" />
          <line x1="12" y1="6" x2="28" y2="6" stroke={color} strokeWidth="0.6" />
          <rect x="30" y="2" width="8" height="8" rx="1" stroke={color} strokeWidth="0.8" fill="none" transform="rotate(45 34 6)" />
        </pattern>
      </defs>
      <rect width="400" height="12" fill={`url(#border-unit)`} />
    </svg>
  );
}
