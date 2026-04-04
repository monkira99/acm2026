interface DragonPatternProps {
  className?: string;
  color?: string;
  opacity?: number;
}

export function DragonPattern({
  className = "",
  color = "currentColor",
  opacity = 0.06,
}: DragonPatternProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 800 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ opacity }}
      aria-hidden="true"
    >
      <path
        d="M100 350c30-60 80-100 140-120s100-50 130-100c20-35 15-70-5-95
           s-55-35-90-25c-25 7-45 25-55 50s-10 55 5 80c20 30 50 45 85 40
           s65-30 80-60c25-45 60-75 110-85s105 5 140 45c30 35 40 80 25 120"
        stroke={color}
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M140 280c15-30 45-55 80-65s65-5 85 15c15 15 20 35 10 55
           s-35 35-60 35-50-10-65-30"
        stroke={color}
        strokeWidth="2"
        fill="none"
        strokeDasharray="8 6"
        strokeLinecap="round"
      />
      <circle cx="155" cy="195" r="6" fill={color} />
      <circle cx="158" cy="193" r="2" fill="white" />
      <path
        d="M600 80c-15-20-40-25-60-15s-30 30-20 50"
        stroke={color}
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M650 120c10-15 30-20 45-10s15 25 5 40"
        stroke={color}
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}
