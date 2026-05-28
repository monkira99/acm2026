"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { submitAbstractAction } from "@/lib/actions/submit-abstract";
import { ABSTRACT_TOPIC_OPTIONS } from "@/lib/abstract-topics";
import { Loader2, Plus, Trash2 } from "lucide-react";

interface CoAuthorField {
  id: number;
}

const MAX_WORDS = 300;

function countWords(text: string): number {
  return text.trim() === "" ? 0 : text.trim().split(/\s+/).length;
}

const fieldClassName =
  "w-full rounded-md border border-gray-300 bg-white px-4 py-2.5 text-[#143D78] placeholder:text-gray-400 outline-none transition focus:border-[#2260AD] focus:ring-2 focus:ring-[#2260AD]/15";

const labelClassName = "block text-sm font-bold text-[#143D78] mb-1.5";

const subLabelClassName = "block text-sm font-semibold text-[#143D78] mb-1.5";

export function AbstractForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [serverError, setServerError] = useState<string | null>(null);
  const [coAuthors, setCoAuthors] = useState<CoAuthorField[]>([]);
  const [nextCoAuthorId, setNextCoAuthorId] = useState(1);
  const [abstractText, setAbstractText] = useState("");

  const wordCount = countWords(abstractText);
  const isOverLimit = wordCount > MAX_WORDS;

  function addCoAuthor() {
    setCoAuthors((c) => [...c, { id: nextCoAuthorId }]);
    setNextCoAuthorId((c) => c + 1);
  }

  function removeCoAuthor(id: number) {
    setCoAuthors((c) => c.filter((a) => a.id !== id));
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (isOverLimit) return;
    setServerError(null);
    const formData = new FormData(e.currentTarget);
    startTransition(async () => {
      const result = await submitAbstractAction(formData);
      if (result.success) {
        router.push(`/abstract/success?id=${result.submissionId}`);
      } else {
        setServerError(result.error ?? "Submission failed.");
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    });
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {serverError && (
        <div
          className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
          role="alert"
        >
          {serverError}
        </div>
      )}

      <div>
        <label className={labelClassName} htmlFor="title">
          Title <span className="text-red-500">*</span>
        </label>
        <input
          id="title"
          name="title"
          type="text"
          required
          className={fieldClassName}
        />
      </div>

      <div>
        <label className={labelClassName}>
          Authors <span className="text-red-500">*</span>
        </label>

        <div className="rounded-md border border-[#2260AD]/20 bg-[#EAF2FB] p-4">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.12em] text-[#2260AD]">
            Presenting Author
          </p>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div>
              <label className={subLabelClassName} htmlFor="presentingAuthorName">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                id="presentingAuthorName"
                name="presentingAuthorName"
                type="text"
                required
                className={fieldClassName}
              />
            </div>
            <div>
              <label
                className={subLabelClassName}
                htmlFor="presentingAuthorAffiliation"
              >
                Affiliation <span className="text-red-500">*</span>
              </label>
              <input
                id="presentingAuthorAffiliation"
                name="presentingAuthorAffiliation"
                type="text"
                required
                className={fieldClassName}
              />
            </div>
            <div>
              <label
                className={subLabelClassName}
                htmlFor="presentingAuthorEmail"
              >
                Email <span className="text-red-500">*</span>
              </label>
              <input
                id="presentingAuthorEmail"
                name="presentingAuthorEmail"
                type="email"
                required
                className={fieldClassName}
              />
            </div>
          </div>
        </div>

        {coAuthors.map((author, index) => (
          <div
            key={author.id}
            className="mt-3 rounded-md border border-[#2260AD]/20 bg-[#EAF2FB] p-4"
          >
            <div className="mb-3 flex items-center justify-between">
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#2260AD]">
                Co-Author {index + 1}
              </p>
              <button
                type="button"
                onClick={() => removeCoAuthor(author.id)}
                aria-label={`Remove co-author ${index + 1}`}
                className="inline-flex items-center gap-1 text-xs font-semibold text-red-600 transition-colors hover:text-red-700"
              >
                <Trash2 size={13} aria-hidden="true" />
                Remove
              </button>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label
                  className={subLabelClassName}
                  htmlFor={`coAuthorName-${author.id}`}
                >
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  id={`coAuthorName-${author.id}`}
                  name="coAuthorName"
                  type="text"
                  required
                  className={fieldClassName}
                />
              </div>
              <div>
                <label
                  className={subLabelClassName}
                  htmlFor={`coAuthorAffiliation-${author.id}`}
                >
                  Affiliation <span className="text-red-500">*</span>
                </label>
                <input
                  id={`coAuthorAffiliation-${author.id}`}
                  name="coAuthorAffiliation"
                  type="text"
                  required
                  className={fieldClassName}
                />
              </div>
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={addCoAuthor}
          className="mt-3 inline-flex items-center gap-2 rounded-md border border-dashed border-[#2260AD]/30 bg-[#EAF2FB] px-4 py-2 text-sm font-semibold text-[#2260AD] transition-colors hover:border-[#2260AD] hover:bg-[#E8F1FA]/80"
        >
          <Plus size={15} aria-hidden="true" />
          Add Co-Author
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <label className={labelClassName} htmlFor="presentationType">
            Presentation Type <span className="text-red-500">*</span>
          </label>
          <select
            id="presentationType"
            name="presentationType"
            required
            defaultValue=""
            className={fieldClassName}
          >
            <option value="" disabled>
              Select type
            </option>
            <option value="oral">Oral Presentation</option>
            <option value="poster">Poster Presentation</option>
          </select>
        </div>
        <div>
          <label className={labelClassName} htmlFor="topic">
            Topic <span className="text-red-500">*</span>
          </label>
          <select
            id="topic"
            name="topic"
            required
            defaultValue=""
            className={fieldClassName}
          >
            <option value="" disabled>
              Select topic
            </option>
            {ABSTRACT_TOPIC_OPTIONS.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <div className="mb-1.5 flex items-baseline justify-between">
          <label className={`${labelClassName} mb-0`} htmlFor="abstractText">
            Abstract Text <span className="text-red-500">*</span>{" "}
            <span className="font-normal text-gray-500">(max 300 words)</span>
          </label>
          <span
            className={`text-xs tabular-nums ${
              isOverLimit ? "text-red-600" : "text-gray-500"
            }`}
          >
            {wordCount} / {MAX_WORDS}
          </span>
        </div>
        <textarea
          id="abstractText"
          name="abstractText"
          required
          rows={10}
          value={abstractText}
          onChange={(e) => setAbstractText(e.target.value)}
          className={`${fieldClassName} resize-y leading-7 ${
            isOverLimit ? "border-red-400 focus:border-red-500" : ""
          }`}
        />
      </div>

      <div>
        <label className={labelClassName} htmlFor="keywords">
          Keywords <span className="text-red-500">*</span>{" "}
          <span className="font-normal text-gray-500">
            (3-5, comma-separated)
          </span>
        </label>
        <input
          id="keywords"
          name="keywords"
          type="text"
          required
          placeholder="e.g. microbial diversity, conservation, biotechnology"
          className={fieldClassName}
        />
      </div>

      <button
        type="submit"
        disabled={isPending || isOverLimit}
        className="flex w-full items-center justify-center gap-2 rounded-md bg-[#2260AD] py-3 text-base font-bold text-white transition-colors hover:bg-[#143D78] disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isPending && (
          <Loader2 size={18} className="animate-spin" aria-hidden="true" />
        )}
        {isPending ? "Submitting…" : "Submit Abstract"}
      </button>
    </form>
  );
}
