interface AdminEmptyStateProps {
  message: string;
}

export function AdminEmptyState({ message }: AdminEmptyStateProps) {
  return (
    <div className="rounded-xl border border-dashed border-[#2260AD]/25 bg-white px-6 py-14 text-center">
      <p className="text-sm font-medium text-[#263D5C]/70">{message}</p>
    </div>
  );
}
