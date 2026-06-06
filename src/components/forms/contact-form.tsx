"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema, type ContactInput } from "@/lib/validators";
import { sendContactAction } from "@/lib/actions/send-contact";
import { Loader2, CheckCircle } from "lucide-react";

const fieldClassName =
  "w-full rounded-lg border border-[#2260AD]/15 bg-white px-4 py-3 text-[#143D78] outline-none transition focus:border-[#2260AD] focus:ring-2 focus:ring-[#2260AD]/20";

export function ContactForm() {
  const [isPending, startTransition] = useTransition();
  const [serverError, setServerError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
  });

  function onSubmit(data: ContactInput) {
    setServerError(null);
    startTransition(async () => {
      const result = await sendContactAction(data);
      if (result.success) {
        setSent(true);
      } else {
        setServerError(result.error ?? "Failed to send.");
      }
    });
  }

  if (sent) {
    return (
      <div className="text-center py-12">
        <CheckCircle size={48} className="mx-auto mb-4 text-[#80AF41]" aria-hidden="true" />
        <h3 className="text-xl font-bold text-[#143D78]">Message Sent!</h3>
        <p className="mt-2 text-[#263D5C]">We will get back to you as soon as possible.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {serverError && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg text-sm" role="alert">{serverError}</div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-[#143D78] mb-1.5" htmlFor="name">Your Name *</label>
          <input id="name" {...register("name")} className={fieldClassName} />
          {errors.name && <p className="text-red-500 text-xs mt-1" role="alert">{errors.name.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-semibold text-[#143D78] mb-1.5" htmlFor="contactEmail">Email *</label>
          <input id="contactEmail" {...register("email")} type="email" className={fieldClassName} />
          {errors.email && <p className="text-red-500 text-xs mt-1" role="alert">{errors.email.message}</p>}
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-[#143D78] mb-1.5" htmlFor="subject">Subject *</label>
        <input id="subject" {...register("subject")} className={fieldClassName} />
        {errors.subject && <p className="text-red-500 text-xs mt-1" role="alert">{errors.subject.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-semibold text-[#143D78] mb-1.5" htmlFor="message">Message *</label>
        <textarea id="message" {...register("message")} rows={6} className={`${fieldClassName} resize-none`} />
        {errors.message && <p className="text-red-500 text-xs mt-1" role="alert">{errors.message.message}</p>}
      </div>

      <button type="submit" disabled={isPending}
        className="flex items-center gap-2 rounded-lg bg-[#2260AD] px-8 py-3.5 font-bold text-white transition-colors hover:bg-[#143D78] disabled:opacity-50">
        {isPending && <Loader2 size={18} className="animate-spin" aria-hidden="true" />}
        {isPending ? "Sending..." : "Send message"}
      </button>
    </form>
  );
}
