"use client";

import { useActionState } from "react";
import { adminLoginAction } from "@/lib/actions/admin-auth";

export default function AdminLoginPage() {
  const [state, formAction, isPending] = useActionState(adminLoginAction, null);

  return (
    <div className="min-h-screen flex items-center justify-center bg-light">
      <div className="w-full max-w-sm p-8 bg-white rounded-2xl shadow-lg">
        <h1 className="text-2xl font-bold text-dark mb-6 text-center">ACM23 Admin</h1>
        <form action={formAction}>
          {state?.error && (
            <div
              className="bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-4"
              role="alert"
            >
              {state.error}
            </div>
          )}
          <input
            name="password"
            type="password"
            placeholder="Admin password"
            required
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition mb-4"
            aria-label="Admin password"
          />
          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-dark text-white py-3 rounded-lg font-semibold hover:bg-dark/90 transition-colors disabled:opacity-50"
          >
            {isPending ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
