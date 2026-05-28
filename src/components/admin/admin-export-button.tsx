import { Download } from "lucide-react";

interface AdminExportButtonProps {
  href: string;
  label?: string;
}

export function AdminExportButton({
  href,
  label = "Export CSV",
}: AdminExportButtonProps) {
  return (
    <a
      href={href}
      className="inline-flex items-center gap-2 rounded-lg bg-[#2260AD] px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[#143D78]"
    >
      <Download size={16} aria-hidden="true" />
      {label}
    </a>
  );
}
