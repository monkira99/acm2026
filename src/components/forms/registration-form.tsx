"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registrationSchema, type RegistrationInput } from "@/lib/validators";
import { registerAction } from "@/lib/actions/register";
import { Loader2 } from "lucide-react";

const countries = [
  "Cambodia", "China", "Indonesia", "Japan", "Korea", "Laos", "Malaysia",
  "Mongolia", "Myanmar", "Philippines", "Thailand", "Vietnam", "Other",
];

export function RegistrationForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegistrationInput>({
    resolver: zodResolver(registrationSchema),
  });

  function onSubmit(data: RegistrationInput) {
    setServerError(null);
    startTransition(async () => {
      const result = await registerAction(data);
      if (result.success) {
        router.push(`/registration/success?id=${result.confirmationId}`);
      } else {
        setServerError(result.error ?? "Registration failed.");
      }
    });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {serverError && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg text-sm" role="alert">{serverError}</div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-dark mb-1.5" htmlFor="fullName">Full Name *</label>
          <input id="fullName" {...register("fullName")} className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition" />
          {errors.fullName && <p className="text-red-500 text-xs mt-1" role="alert">{errors.fullName.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-semibold text-dark mb-1.5" htmlFor="email">Email *</label>
          <input id="email" {...register("email")} type="email" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition" />
          {errors.email && <p className="text-red-500 text-xs mt-1" role="alert">{errors.email.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-dark mb-1.5" htmlFor="affiliation">Affiliation *</label>
          <input id="affiliation" {...register("affiliation")} className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition" />
          {errors.affiliation && <p className="text-red-500 text-xs mt-1" role="alert">{errors.affiliation.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-semibold text-dark mb-1.5" htmlFor="country">Country *</label>
          <select id="country" {...register("country")} className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition bg-white">
            <option value="">Select country</option>
            {countries.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          {errors.country && <p className="text-red-500 text-xs mt-1" role="alert">{errors.country.message}</p>}
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-dark mb-1.5" htmlFor="role">Role *</label>
        <select id="role" {...register("role")} className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition bg-white">
          <option value="">Select role</option>
          <option value="researcher">Researcher</option>
          <option value="student">Student</option>
          <option value="industry">Industry Professional</option>
          <option value="other">Other</option>
        </select>
        {errors.role && <p className="text-red-500 text-xs mt-1" role="alert">{errors.role.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-semibold text-dark mb-1.5" htmlFor="dietaryRequirements">Dietary Requirements</label>
        <input id="dietaryRequirements" {...register("dietaryRequirements")} className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition" placeholder="e.g. Vegetarian, Halal, Allergies..." />
      </div>

      <div>
        <label className="block text-sm font-semibold text-dark mb-1.5" htmlFor="specialRequests">Special Requests</label>
        <textarea id="specialRequests" {...register("specialRequests")} rows={3} className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition resize-none" />
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full bg-primary text-white py-3.5 rounded-lg font-bold text-base hover:bg-primary/90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
      >
        {isPending && <Loader2 size={18} className="animate-spin" aria-hidden="true" />}
        {isPending ? "Submitting..." : "Register for ACM23"}
      </button>
    </form>
  );
}
