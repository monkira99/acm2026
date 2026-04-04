"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { submitAbstractAction } from "@/lib/actions/submit-abstract";
import { Loader2, Upload } from "lucide-react";

export function AbstractForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [serverError, setServerError] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setServerError(null);
    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      const result = await submitAbstractAction(formData);
      if (result.success) {
        router.push(`/abstract/success?id=${result.submissionId}`);
      } else {
        setServerError(result.error ?? "Submission failed.");
      }
    });
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {serverError && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg text-sm" role="alert">{serverError}</div>
      )}

      <div>
        <label className="block text-sm font-semibold text-dark mb-1.5" htmlFor="title">Paper Title *</label>
        <input id="title" name="title" required className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-dark mb-1.5" htmlFor="authors">Authors *</label>
          <input id="authors" name="authors" required placeholder="e.g. J. Smith, K. Tanaka, N. Nguyen" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-dark mb-1.5" htmlFor="correspondingEmail">Corresponding Email *</label>
          <input id="correspondingEmail" name="correspondingEmail" type="email" required className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-dark mb-1.5" htmlFor="affiliation">Affiliation *</label>
          <input id="affiliation" name="affiliation" required className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-dark mb-1.5" htmlFor="presentationType">Presentation Type *</label>
          <select id="presentationType" name="presentationType" required className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition bg-white">
            <option value="">Select type</option>
            <option value="oral">Oral Presentation</option>
            <option value="poster">Poster Presentation</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-dark mb-1.5" htmlFor="abstractText">Abstract Text * (max 300 words)</label>
        <textarea id="abstractText" name="abstractText" required rows={8} className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition resize-none" />
      </div>

      <div>
        <label className="block text-sm font-semibold text-dark mb-1.5" htmlFor="keywords">Keywords * (3-5, comma-separated)</label>
        <input id="keywords" name="keywords" required placeholder="e.g. microbial diversity, conservation, biotechnology" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition" />
      </div>

      <div>
        <span className="block text-sm font-semibold text-dark mb-1.5">Upload PDF (optional, max 10MB)</span>
        <label className="flex items-center gap-3 px-4 py-3 rounded-lg border-2 border-dashed border-gray-200 hover:border-primary cursor-pointer transition-colors">
          <Upload size={20} className="text-gray-400" aria-hidden="true" />
          <span className="text-sm text-gray-500">{fileName ?? "Choose PDF file..."}</span>
          <input
            name="pdfFile"
            type="file"
            accept=".pdf"
            className="sr-only"
            onChange={(e) => setFileName(e.target.files?.[0]?.name ?? null)}
          />
        </label>
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full bg-primary text-white py-3.5 rounded-lg font-bold text-base hover:bg-primary/90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
      >
        {isPending && <Loader2 size={18} className="animate-spin" aria-hidden="true" />}
        {isPending ? "Submitting..." : "Submit Abstract"}
      </button>
    </form>
  );
}
