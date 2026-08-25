"use client";

import { useState, useTransition, type ChangeEvent, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import {
  ABSTRACT_SESSION_OPTIONS,
  SCIENTIST_CATEGORY_OPTIONS,
} from "@/lib/abstract-topics";
import { getFileError } from "@/lib/abstract-file";
import { submitAbstractAction } from "@/lib/actions/submit-abstract";
import { AlertCircle, FileText, Loader2, UploadCloud } from "lucide-react";

const fieldClassName =
  "w-full min-w-0 rounded-lg border border-[#2260AD]/15 bg-white px-4 py-2.5 text-[#143D78] outline-none transition focus:border-[#2260AD] focus:ring-2 focus:ring-[#2260AD]/20 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:opacity-70";

const labelClassName = "block text-sm font-bold text-[#143D78] mb-2";

function formatFileSize(size: number): string {
  if (size < 1024 * 1024) return `${Math.ceil(size / 1024)} KB`;
  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
}

export function AbstractForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [submitNotice, setSubmitNotice] = useState<string | null>(null);

  function onFileChange(event: ChangeEvent<HTMLInputElement>) {
    const nextFile = event.target.files?.[0] ?? null;
    setFile(nextFile);
    setFileError(getFileError(nextFile));
    setSubmitNotice(null);
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formEl = event.currentTarget;
    const fd = new FormData(formEl);

    const nextFileError = getFileError(file);
    setFileError(nextFileError);
    setSubmitNotice(null);

    if (!formEl.reportValidity() || nextFileError) return;

    startTransition(async () => {
      const result = await submitAbstractAction(fd);
      if (result.success) {
        router.push(`/abstract/success?id=${result.submissionId}`);
      } else {
        setSubmitNotice(
          result.error ??
            "An unexpected error occurred while submitting your abstract. Please try again.",
        );
      }
    });
  }

  return (
    <form
      onSubmit={onSubmit}
      className="flex h-full min-w-0 flex-col gap-5 lg:justify-between"
    >
      {submitNotice && (
        <div
          className="flex items-start gap-3 rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700"
          role="alert"
        >
          <AlertCircle
            className="mt-0.5 h-5 w-5 flex-shrink-0"
            aria-hidden="true"
          />
          <span>
            {submitNotice} If this persists, contact acm23@vnu.edu.vn.
          </span>
        </div>
      )}

      <div>
        <label className={labelClassName} htmlFor="abstractFile">
          Abstract file <span className="text-red-500">*</span>
        </label>
        <label
          htmlFor="abstractFile"
          className="flex cursor-pointer items-center gap-3 rounded-lg border-2 border-dashed border-[#2260AD]/25 bg-[#F4F8FD] px-4 py-3 text-center transition hover:border-[#2260AD] hover:bg-[#E8F1FA]"
        >
          <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-white text-[#2260AD] shadow-sm shadow-[#2260AD]/10">
            <UploadCloud className="h-5 w-5" aria-hidden="true" />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block max-w-full break-words text-sm font-bold text-[#143D78]">
              {file ? file.name : "Choose abstract file"}
            </span>
            <span className="block text-xs font-medium text-[#263D5C]/65">
              PDF, DOC, or DOCX. Maximum 10MB.
            </span>
          </span>
          {file && (
            <span className="inline-flex flex-shrink-0 items-center gap-1.5 text-xs font-semibold text-[#2260AD]">
              <FileText className="h-3.5 w-3.5" aria-hidden="true" />
              {formatFileSize(file.size)}
            </span>
          )}
        </label>
        <input
          id="abstractFile"
          name="abstractFile"
          type="file"
          accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          className="sr-only"
          onChange={onFileChange}
          disabled={isPending}
        />
        {fileError && (
          <p className="mt-2 text-sm font-semibold text-red-600" role="alert">
            {fileError}
          </p>
        )}
      </div>

      <fieldset>
        <legend className={labelClassName}>
          Scientist <span className="text-red-500">*</span>
        </legend>
        <div className="grid gap-2">
          {SCIENTIST_CATEGORY_OPTIONS.map((option) => (
            <label
              key={option.value}
              className="flex min-w-0 cursor-pointer items-start gap-3 rounded-lg border border-[#2260AD]/15 bg-white px-4 py-2.5 transition hover:border-[#2260AD]/40 hover:bg-[#F4F8FD] has-[:checked]:border-[#2260AD] has-[:checked]:bg-[#E8F1FA]"
            >
              <input
                type="radio"
                name="scientistCategory"
                value={option.value}
                required
                disabled={isPending}
                className="mt-1 h-4 w-4 accent-[#2260AD]"
              />
              <span className="min-w-0 break-words text-sm font-semibold leading-6 text-[#263D5C]">
                {option.label}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <div>
        <label className={labelClassName} htmlFor="sessionPreference">
          Which session would you prefer to present?{" "}
          <span className="text-red-500">*</span>
        </label>
        <select
          id="sessionPreference"
          name="sessionPreference"
          required
          defaultValue=""
          disabled={isPending}
          className={fieldClassName}
        >
          <option value="" disabled>
            Select preferred session
          </option>
          {ABSTRACT_SESSION_OPTIONS.map((session) => (
            <option key={session.value} value={session.value}>
              {session.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className={labelClassName} htmlFor="notificationEmail">
          Email for notifications <span className="text-red-500">*</span>
        </label>
        <input
          id="notificationEmail"
          name="notificationEmail"
          type="email"
          required
          autoComplete="email"
          placeholder="you@example.com"
          disabled={isPending}
          className={fieldClassName}
        />
        <p className="mt-2 text-xs font-medium text-[#263D5C]/65">
          We&apos;ll send your submission confirmation and updates to this
          address.
        </p>
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="flex h-12 w-full items-center justify-center rounded-lg bg-[#2260AD] text-base font-bold text-white transition-colors hover:bg-[#143D78] disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isPending ? (
          <>
            <Loader2
              className="mr-2 h-5 w-5 animate-spin"
              aria-hidden="true"
            />
            Submitting abstract…
          </>
        ) : (
          "Submit abstract"
        )}
      </button>
    </form>
  );
}
