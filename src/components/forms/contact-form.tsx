"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema, type ContactInput } from "@/lib/validators";
import { sendContactAction } from "@/lib/actions/send-contact";
import { Loader2, CheckCircle } from "lucide-react";

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
        <CheckCircle size={48} className="text-accent mx-auto mb-4" aria-hidden="true" />
        <h3 className="text-xl font-bold text-dark">Message Sent!</h3>
        <p className="text-gray-500 mt-2">We will get back to you as soon as possible.</p>
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
          <label className="block text-sm font-semibold text-dark mb-1.5" htmlFor="name">Your Name *</label>
          <input id="name" {...register("name")} className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition" />
          {errors.name && <p className="text-red-500 text-xs mt-1" role="alert">{errors.name.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-semibold text-dark mb-1.5" htmlFor="contactEmail">Email *</label>
          <input id="contactEmail" {...register("email")} type="email" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition" />
          {errors.email && <p className="text-red-500 text-xs mt-1" role="alert">{errors.email.message}</p>}
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-dark mb-1.5" htmlFor="subject">Subject *</label>
        <input id="subject" {...register("subject")} className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition" />
        {errors.subject && <p className="text-red-500 text-xs mt-1" role="alert">{errors.subject.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-semibold text-dark mb-1.5" htmlFor="message">Message *</label>
        <textarea id="message" {...register("message")} rows={6} className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition resize-none" />
        {errors.message && <p className="text-red-500 text-xs mt-1" role="alert">{errors.message.message}</p>}
      </div>

      <button type="submit" disabled={isPending}
        className="bg-primary text-white px-8 py-3.5 rounded-lg font-bold hover:bg-primary/90 transition-colors disabled:opacity-50 flex items-center gap-2">
        {isPending && <Loader2 size={18} className="animate-spin" aria-hidden="true" />}
        {isPending ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}
