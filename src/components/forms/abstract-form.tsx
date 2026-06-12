"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import {
  ABSTRACT_SESSION_OPTIONS,
  SCIENTIST_CATEGORY_OPTIONS,
} from "@/lib/abstract-topics";
import { CheckCircle2, FileText, UploadCloud } from "lucide-react";

const MAX_FILE_SIZE = 10 * 1024 * 1024;
const ACCEPTED_EXTENSIONS = [".pdf", ".doc", ".docx"];
const ACCEPTED_FILE_TYPES = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);

const fieldClassName =
  "w-full min-w-0 rounded-lg border border-[#2260AD]/15 bg-white px-4 py-3 text-[#143D78] outline-none transition focus:border-[#2260AD] focus:ring-2 focus:ring-[#2260AD]/20";

const labelClassName = "block text-sm font-bold text-[#143D78] mb-2";

function formatFileSize(size: number): string {
  if (size < 1024 * 1024) return `${Math.ceil(size / 1024)} KB`;
  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
}

function getFileError(file: File | null): string | null {
  if (!file) return "Please upload your abstract file.";
  if (file.size > MAX_FILE_SIZE) return "Abstract file must be under 10MB.";

  const lowerName = file.name.toLowerCase();
  const hasAcceptedExtension = ACCEPTED_EXTENSIONS.some((extension) =>
    lowerName.endsWith(extension),
  );

  if (!ACCEPTED_FILE_TYPES.has(file.type) && !hasAcceptedExtension) {
    return "Only PDF, DOC, or DOCX files are accepted.";
  }

  return null;
}

export function AbstractForm() {
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

    const nextFileError = getFileError(file);
    setFileError(nextFileError);
    setSubmitNotice(null);

    if (!event.currentTarget.reportValidity() || nextFileError) return;

    setSubmitNotice(
      "The abstract submission form is ready. Data storage will be connected in the MongoDB step.",
    );
  }

  return (
    <form onSubmit={onSubmit} className="min-w-0 space-y-5">
      {submitNotice && (
        <div
          className="flex items-start gap-3 rounded-lg border border-[#80AF41]/25 bg-[#EEF7E2] px-4 py-3 text-sm font-semibold text-[#486724]"
          role="status"
        >
          <CheckCircle2
            className="mt-0.5 h-5 w-5 flex-shrink-0"
            aria-hidden="true"
          />
          <span>{submitNotice}</span>
        </div>
      )}

      <div>
        <label className={labelClassName} htmlFor="abstractFile">
          Abstract file <span className="text-red-500">*</span>
        </label>
        <label
          htmlFor="abstractFile"
          className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-[#2260AD]/25 bg-[#F4F8FD] px-5 py-6 text-center transition hover:border-[#2260AD] hover:bg-[#E8F1FA]"
        >
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#2260AD] shadow-sm shadow-[#2260AD]/10">
            <UploadCloud className="h-6 w-6" aria-hidden="true" />
          </span>
          <span className="max-w-full break-words text-sm font-bold text-[#143D78]">
            {file ? file.name : "Choose abstract file"}
          </span>
          <span className="text-xs font-medium text-[#263D5C]/65">
            PDF, DOC, or DOCX. Maximum 10MB.
          </span>
          {file && (
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#2260AD]">
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

      <button
        type="submit"
        className="flex h-12 w-full items-center justify-center rounded-lg bg-[#2260AD] text-base font-bold text-white transition-colors hover:bg-[#143D78]"
      >
        Submit abstract
      </button>
    </form>
  );
}
