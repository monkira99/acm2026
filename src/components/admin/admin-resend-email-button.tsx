"use client";

import { useTransition } from "react";
import { Loader2, Mail, RotateCw } from "lucide-react";
import { toast } from "sonner";

interface AdminResendEmailButtonProps {
  id: string;
  sent: boolean;
  resendAction: (id: string) => Promise<{ success: boolean; error?: string }>;
}

export function AdminResendEmailButton({
  id,
  sent,
  resendAction,
}: AdminResendEmailButtonProps) {
  const [isPending, startTransition] = useTransition();

  function onClick() {
    startTransition(async () => {
      const result = await resendAction(id);
      if (result.success) {
        toast.success(
          sent ? "Confirmation email resent" : "Confirmation email sent",
        );
      } else {
        toast.error(result.error ?? "Failed to send email");
      }
    });
  }

  const Icon = isPending ? Loader2 : sent ? RotateCw : Mail;

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={isPending}
      className="inline-flex items-center gap-1.5 rounded-lg border border-[#2260AD]/20 px-3 py-1.5 text-xs font-bold text-[#2260AD] transition-colors hover:bg-[#E8F1FA] disabled:opacity-50"
    >
      <Icon
        size={14}
        aria-hidden="true"
        className={isPending ? "animate-spin" : undefined}
      />
      {sent ? "Resend" : "Send"}
    </button>
  );
}
