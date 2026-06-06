import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CalendarDays, CheckCircle2, Mail } from "lucide-react";
import { SectionHero } from "@/components/ui/section-hero";

export const metadata: Metadata = { title: "Abstract Submitted" };

export default async function AbstractSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ id?: string }>;
}) {
  const { id } = await searchParams;
  return (
    <div className="bg-[#EAF2FB]">
      <SectionHero
        title="Submission Received"
        subtitle="Thank you for contributing to ACM23 Hanoi 2026."
      />

      <div className="mx-auto max-w-3xl px-4 pb-12 pt-8 sm:px-6 sm:pb-16 sm:pt-12 lg:px-8">
        <div className="bg-white/85 px-6 py-10 text-center shadow-sm shadow-[#2260AD]/5 sm:px-10">
          <div className="mx-auto mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-[#80AF41]/15">
            <CheckCircle2
              size={36}
              className="text-[#80AF41]"
              aria-hidden="true"
            />
          </div>

          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#80AF41]">
            Abstract Submitted
          </p>
          <h1 className="mt-2 text-3xl font-black text-[#143D78] sm:text-4xl">
            Your abstract is under review
          </h1>

          {id && (
            <div className="mx-auto mt-6 inline-flex items-center gap-3 border border-[#2260AD]/20 bg-[#E8F1FA] px-5 py-3">
              <span className="text-xs font-bold uppercase tracking-[0.14em] text-[#2260AD]">
                Submission ID
              </span>
              <span className="font-mono text-base font-bold text-[#143D78]">
                {id}
              </span>
            </div>
          )}

          <p className="mx-auto mt-6 max-w-xl text-sm leading-7 text-[#263D5C]">
            A confirmation email has been sent to the presenting author. Please
            retain your submission ID for future correspondence with the
            Scientific Committee.
          </p>

          <div className="mt-8 grid gap-3 text-left sm:grid-cols-2">
            <div className="flex items-start gap-3 border-l-4 border-[#2260AD] bg-[#F4F8FD] px-4 py-4">
              <CalendarDays
                className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#2260AD]"
                aria-hidden="true"
              />
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#2260AD]">
                  Notification
                </p>
                <p className="mt-1 text-sm font-semibold text-[#143D78]">
                  By August 15, 2026
                </p>
                <p className="mt-1 text-xs text-[#263D5C]/70">
                  Review outcome will be sent by email.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 border-l-4 border-[#80AF41] bg-[#F4F8FD] px-4 py-4">
              <Mail
                className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#2260AD]"
                aria-hidden="true"
              />
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#2260AD]">
                  Secretariat
                </p>
                <a
                  href="mailto:abstracts@acm23-hanoi.org"
                  className="mt-1 block text-sm font-semibold text-[#2260AD] underline-offset-2 hover:underline"
                >
                  abstracts@acm23-hanoi.org
                </a>
                <p className="mt-1 text-xs text-[#263D5C]/70">
                  For questions or amendments.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 border-t border-[#2260AD]/15 pt-8 sm:flex-row">
            <Link
              href="/"
              className="inline-flex w-full items-center justify-center rounded-lg bg-[#2260AD] px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-[#143D78] sm:w-auto"
            >
              Back to Home
            </Link>
            <Link
              href="/registration"
              className="inline-flex w-full items-center justify-center gap-1.5 rounded-lg border border-[#2260AD]/30 bg-white px-6 py-3 text-sm font-bold text-[#2260AD] transition-colors hover:border-[#2260AD] hover:bg-[#E8F1FA] sm:w-auto"
            >
              Continue to Registration
              <ArrowRight size={15} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
