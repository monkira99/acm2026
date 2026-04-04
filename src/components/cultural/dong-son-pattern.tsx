interface DongSonPatternProps {
  className?: string;
  color?: string;
  opacity?: number;
}

export function DongSonPattern({
  className = "",
  color = "currentColor",
  opacity = 0.1,
}: DongSonPatternProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 200 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ opacity }}
      aria-hidden="true"
      preserveAspectRatio="none"
    >
      <circle cx="20" cy="20" r="16" stroke={color} strokeWidth="1" />
      <circle cx="20" cy="20" r="10" stroke={color} strokeWidth="0.8" strokeDasharray="3 2" />
      <circle cx="20" cy="20" r="4" fill={color} opacity={0.4} />
      <line x1="36" y1="20" x2="64" y2="20" stroke={color} strokeWidth="0.8" />
      <circle cx="80" cy="20" r="16" stroke={color} strokeWidth="1" />
      <circle cx="80" cy="20" r="10" stroke={color} strokeWidth="0.8" strokeDasharray="3 2" />
      <circle cx="80" cy="20" r="4" fill={color} opacity={0.4} />
      <line x1="96" y1="20" x2="104" y2="20" stroke={color} strokeWidth="0.8" />
      <circle cx="120" cy="20" r="16" stroke={color} strokeWidth="1" />
      <circle cx="120" cy="20" r="10" stroke={color} strokeWidth="0.8" strokeDasharray="3 2" />
      <circle cx="120" cy="20" r="4" fill={color} opacity={0.4} />
      <line x1="136" y1="20" x2="164" y2="20" stroke={color} strokeWidth="0.8" />
      <circle cx="180" cy="20" r="16" stroke={color} strokeWidth="1" />
      <circle cx="180" cy="20" r="10" stroke={color} strokeWidth="0.8" strokeDasharray="3 2" />
      <circle cx="180" cy="20" r="4" fill={color} opacity={0.4} />
    </svg>
  );
}
