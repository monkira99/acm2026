import type { LucideIcon } from "lucide-react";
import Link from "next/link";

interface AdminStatCardProps {
  label: string;
  value: number | string;
  icon: LucideIcon;
  href?: string;
  accent?: "blue" | "green" | "slate";
}

const accentStyles = {
  blue: "bg-[#E8F1FA] text-[#2260AD]",
  green: "bg-[#EEF7E2] text-[#5E822F]",
  slate: "bg-slate-100 text-slate-600",
};

export function AdminStatCard({
  label,
  value,
  icon: Icon,
  href,
  accent = "blue",
}: AdminStatCardProps) {
  const content = (
    <div className="rounded-xl border border-[#2260AD]/10 bg-white p-5 shadow-sm shadow-[#2260AD]/5 transition-shadow hover:shadow-md hover:shadow-[#2260AD]/10">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#263D5C]/70">
            {label}
          </p>
          <p className="mt-2 text-3xl font-black tabular-nums text-[#143D78]">
            {value}
          </p>
        </div>
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-lg ${accentStyles[accent]}`}
        >
          <Icon size={20} aria-hidden="true" />
        </div>
      </div>
      {href && (
        <p className="mt-3 text-xs font-semibold text-[#2260AD]">View details →</p>
      )}
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="block">
        {content}
      </Link>
    );
  }

  return content;
}
