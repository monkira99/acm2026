interface LotusDecorProps {
  className?: string;
  color?: string;
  size?: number;
}

export function LotusDecor({
  className = "",
  color = "currentColor",
  size = 24,
}: LotusDecorProps) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M24 6c-3 10-3 18 0 28c3-10 3-18 0-28z" fill={color} opacity={0.3} />
      <path d="M24 34c-6-4-14-6-18-2c6-1 12 0 18 2z" fill={color} opacity={0.5} />
      <path d="M24 28c-8-6-16-6-20 0c8-2 14 0 20 0z" fill={color} opacity={0.4} />
      <path d="M24 34c6-4 14-6 18-2c-6-1-12 0-18 2z" fill={color} opacity={0.5} />
      <path d="M24 28c8-6 16-6 20 0c-8-2-14 0-20 0z" fill={color} opacity={0.4} />
      <circle cx="24" cy="20" r="3" fill={color} opacity={0.6} />
    </svg>
  );
}
