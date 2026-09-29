import { Lock } from "lucide-react";

export function SubmissionClosed({
  title,
  message,
}: {
  title: string;
  message: string;
}) {
  return (
    <div
      role="status"
      className="flex items-start gap-3 border-l-4 border-[#CC212A] bg-[#F4F8FD] px-5 py-5"
    >
      <Lock
        className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#CC212A]"
        aria-hidden="true"
      />
      <div>
        <p className="text-base font-black text-[#143D78]">{title}</p>
        <p className="mt-2 text-sm leading-6 text-[#263D5C]">{message}</p>
      </div>
    </div>
  );
}
