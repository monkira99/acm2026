"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registrationSchema, type RegistrationInput } from "@/lib/validators";
import { registerAction } from "@/lib/actions/register";
import { Loader2 } from "lucide-react";

const countries = [
  "Cambodia",
  "China",
  "Chinese Taipei",
  "India",
  "Indonesia",
  "Iran",
  "Japan",
  "Korea",
  "Malaysia",
  "Mongolia",
  "Myanmar",
  "Philippines",
  "Thailand",
  "Vietnam",
  "Other",
];

const fieldClassName =
  "w-full rounded-lg border border-[#2260AD]/15 bg-white px-4 py-3 text-[#143D78] outline-none transition focus:border-[#2260AD] focus:ring-2 focus:ring-[#2260AD]/20";

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
          <label className="block text-sm font-semibold text-[#143D78] mb-1.5" htmlFor="fullName">Full Name *</label>
          <input id="fullName" {...register("fullName")} className={fieldClassName} />
          {errors.fullName && <p className="text-red-500 text-xs mt-1" role="alert">{errors.fullName.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-semibold text-[#143D78] mb-1.5" htmlFor="email">Email *</label>
          <input id="email" {...register("email")} type="email" className={fieldClassName} />
          {errors.email && <p className="text-red-500 text-xs mt-1" role="alert">{errors.email.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-[#143D78] mb-1.5" htmlFor="affiliation">Affiliation *</label>
          <input id="affiliation" {...register("affiliation")} className={fieldClassName} />
          {errors.affiliation && <p className="text-red-500 text-xs mt-1" role="alert">{errors.affiliation.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-semibold text-[#143D78] mb-1.5" htmlFor="country">Country *</label>
          <select id="country" {...register("country")} className={fieldClassName}>
            <option value="">Select country</option>
            {countries.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          {errors.country && <p className="text-red-500 text-xs mt-1" role="alert">{errors.country.message}</p>}
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-[#143D78] mb-1.5" htmlFor="role">Role *</label>
        <select id="role" {...register("role")} className={fieldClassName}>
          <option value="">Select role</option>
          <option value="researcher">Researcher</option>
          <option value="student">Student</option>
          <option value="industry">Industry Professional</option>
          <option value="other">Other</option>
        </select>
        {errors.role && <p className="text-red-500 text-xs mt-1" role="alert">{errors.role.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-semibold text-[#143D78] mb-1.5" htmlFor="dietaryRequirements">Dietary Requirements</label>
        <input id="dietaryRequirements" {...register("dietaryRequirements")} className={fieldClassName} placeholder="e.g. Vegetarian, Halal, Allergies..." />
      </div>

      <div>
        <label className="block text-sm font-semibold text-[#143D78] mb-1.5" htmlFor="specialRequests">Special Requests</label>
        <textarea id="specialRequests" {...register("specialRequests")} rows={3} className={`${fieldClassName} resize-none`} />
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#2260AD] py-3.5 text-base font-bold text-white transition-colors hover:bg-[#143D78] disabled:opacity-50"
      >
        {isPending && <Loader2 size={18} className="animate-spin" aria-hidden="true" />}
        {isPending ? "Submitting..." : "Register for ACM23"}
      </button>
    </form>
  );
}
