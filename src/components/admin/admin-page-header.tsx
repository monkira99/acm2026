import type { ReactNode } from "react";

interface AdminPageHeaderProps {
  title: string;
  description?: string;
  count?: number;
  actions?: ReactNode;
}

export function AdminPageHeader({
  title,
  description,
  count,
  actions,
}: AdminPageHeaderProps) {
  return (
    <div className="mb-6 flex flex-col gap-4 border-b border-[#2260AD]/10 pb-5 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="text-2xl font-black text-[#143D78]">
          {title}
          {count !== undefined && (
            <span className="ml-2 text-lg font-bold text-[#2260AD]/70">
              ({count})
            </span>
          )}
        </h1>
        {description && (
          <p className="mt-1 text-sm text-[#263D5C]">{description}</p>
        )}
      </div>
      {actions && <div className="flex shrink-0 flex-wrap gap-2">{actions}</div>}
    </div>
  );
}
