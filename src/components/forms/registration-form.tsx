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
  "w-full min-w-0 rounded-lg border border-[#2260AD]/15 bg-white px-4 py-2.5 text-[#143D78] outline-none transition focus:border-[#2260AD] focus:ring-2 focus:ring-[#2260AD]/20";

const labelClassName = "block text-sm font-bold text-[#143D78] mb-2";

const errorClassName = "mt-2 text-sm font-semibold text-red-600";

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
          <label className={labelClassName} htmlFor="fullName">Full Name <span className="text-red-500">*</span></label>
          <input id="fullName" {...register("fullName")} className={fieldClassName} />
          {errors.fullName && <p className={errorClassName} role="alert">{errors.fullName.message}</p>}
        </div>
        <div>
          <label className={labelClassName} htmlFor="email">Email <span className="text-red-500">*</span></label>
          <input id="email" {...register("email")} type="email" className={fieldClassName} />
          {errors.email && <p className={errorClassName} role="alert">{errors.email.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className={labelClassName} htmlFor="affiliation">Affiliation <span className="text-red-500">*</span></label>
          <input id="affiliation" {...register("affiliation")} className={fieldClassName} />
          {errors.affiliation && <p className={errorClassName} role="alert">{errors.affiliation.message}</p>}
        </div>
        <div>
          <label className={labelClassName} htmlFor="country">Country <span className="text-red-500">*</span></label>
          <select id="country" {...register("country")} className={fieldClassName}>
            <option value="">Select country</option>
            {countries.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          {errors.country && <p className={errorClassName} role="alert">{errors.country.message}</p>}
        </div>
      </div>

      <div>
        <label className={labelClassName} htmlFor="role">Role <span className="text-red-500">*</span></label>
        <select id="role" {...register("role")} className={fieldClassName}>
          <option value="">Select role</option>
          <option value="researcher">Researcher</option>
          <option value="student">Student</option>
          <option value="industry">Industry Professional</option>
          <option value="other">Other</option>
        </select>
        {errors.role && <p className={errorClassName} role="alert">{errors.role.message}</p>}
      </div>

      <div>
        <label className={labelClassName} htmlFor="dietaryRequirements">Dietary Requirements</label>
        <input id="dietaryRequirements" {...register("dietaryRequirements")} className={fieldClassName} placeholder="e.g. Vegetarian, Halal, Allergies..." />
      </div>

      <div>
        <label className={labelClassName} htmlFor="specialRequests">Special Requests</label>
        <textarea id="specialRequests" {...register("specialRequests")} rows={3} className={`${fieldClassName} resize-none`} />
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-[#2260AD] text-base font-bold text-white transition-colors hover:bg-[#143D78] disabled:opacity-50"
      >
        {isPending && <Loader2 size={18} className="animate-spin" aria-hidden="true" />}
        {isPending ? "Submitting..." : "Register for ACM23"}
      </button>
    </form>
  );
}
