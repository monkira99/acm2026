"use client";

import Link from "next/link";
import { useActionState } from "react";
import { adminLoginAction } from "@/lib/actions/admin-auth";
import { Loader2 } from "lucide-react";

export default function AdminLoginPage() {
  const [state, formAction, isPending] = useActionState(adminLoginAction, null);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[linear-gradient(135deg,#2260AD_0%,#2D78D4_58%,#143D78_100%)] px-4">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-xl shadow-[#143D78]/20 sm:p-10">
        <div className="mb-8 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#2260AD]">
            ACM23 Hanoi
          </p>
          <h1 className="mt-2 text-2xl font-black text-[#143D78]">Admin sign in</h1>
          <p className="mt-2 text-sm text-[#263D5C]">
            Manage registrations and abstract submissions.
          </p>
        </div>

        <form action={formAction} className="space-y-4">
          {state?.error && (
            <div
              className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
              role="alert"
            >
              {state.error}
            </div>
          )}

          <div>
            <label
              htmlFor="password"
              className="mb-1.5 block text-sm font-semibold text-[#143D78]"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-[#143D78] outline-none transition focus:border-[#2260AD] focus:ring-2 focus:ring-[#2260AD]/15"
            />
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#2260AD] py-3 text-sm font-bold text-white transition-colors hover:bg-[#143D78] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isPending && (
              <Loader2 size={18} className="animate-spin" aria-hidden="true" />
            )}
            {isPending ? "Signing in…" : "Sign in"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-[#263D5C]/70">
          <Link href="/" className="font-semibold text-[#2260AD] hover:underline">
            ← Back to website
          </Link>
        </p>
      </div>
    </div>
  );
}
