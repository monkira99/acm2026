import { formatAdminDate } from "@/lib/admin-format";

export function EmailStatus({
  sent,
  sentAt,
  error,
}: {
  sent?: boolean;
  sentAt?: Date;
  error?: string;
}) {
  if (sent) {
    return (
      <span className="inline-flex rounded-full bg-[#E6F6EF] px-2.5 py-0.5 text-xs font-semibold text-[#0D7377]">
        Sent · {formatAdminDate(sentAt)}
      </span>
    );
  }
  if (error) {
    return (
      <span
        className="inline-flex rounded-full bg-[#FDEAEA] px-2.5 py-0.5 text-xs font-semibold text-[#C0362C]"
        title={error}
      >
        Failed
      </span>
    );
  }
  return (
    <span className="inline-flex rounded-full bg-[#EEF1F5] px-2.5 py-0.5 text-xs font-semibold text-[#263D5C]/60">
      Not sent
    </span>
  );
}
