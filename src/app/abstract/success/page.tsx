import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CalendarDays, CheckCircle2, Mail } from "lucide-react";
import { SectionHero } from "@/components/ui/section-hero";

export const metadata: Metadata = {
  title: "Abstract Submitted",
  description: "Your abstract submission for ACM23 Hanoi 2026 has been received.",
};

export default async function AbstractSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ id?: string }>;
}) {
  const { id } = await searchParams;

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#EAF2FB]">
      <SectionHero title="Abstract submission" />

      <div className="content-rail pb-12 pt-8 sm:pb-16 sm:pt-12">
        <div className="mb-8 flex flex-col gap-1 border-b border-[#2260AD]/20 pb-4 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="text-2xl font-black text-[#2260AD]">
            Submission received
          </h2>
        </div>

        <div className="mx-auto max-w-2xl">
          <div className="bg-white/85 p-6 shadow-sm shadow-[#2260AD]/5 sm:p-10">
            <div className="text-center">
              <div className="mx-auto mb-5 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#80AF41]/15">
                <CheckCircle2
                  size={32}
                  className="text-[#80AF41]"
                  aria-hidden="true"
                />
              </div>

              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#80AF41]">
                Abstract Submitted
              </p>
              <h3 className="mt-2 text-2xl font-black text-[#143D78] sm:text-3xl">
                Your abstract has been received
              </h3>

              {id && (
                <div className="mx-auto mt-5 inline-flex items-center gap-3 border border-[#2260AD]/20 bg-[#E8F1FA] px-5 py-2.5">
                  <span className="text-xs font-bold uppercase tracking-[0.14em] text-[#2260AD]">
                    Submission ID
                  </span>
                  <span className="font-mono text-base font-bold text-[#143D78]">
                    {id}
                  </span>
                </div>
              )}

              <p className="mx-auto mt-5 max-w-lg text-sm leading-6 text-[#263D5C]">
                A confirmation email will follow from the Scientific Committee.
                Please retain your submission ID for future correspondence with
                the Scientific Committee.
              </p>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="flex items-start gap-3 border-l-4 border-[#2260AD] bg-[#F4F8FD] p-4">
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
                  <p className="mt-0.5 text-xs text-[#263D5C]/70">
                    Review outcome will be sent by email.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 border-l-4 border-[#80AF41] bg-[#F4F8FD] p-4">
                <Mail
                  className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#2260AD]"
                  aria-hidden="true"
                />
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#2260AD]">
                    Secretariat
                  </p>
                  <a
                    href="mailto:acm23@vnu.edu.vn"
                    className="mt-1 block text-sm font-semibold text-[#2260AD] underline-offset-2 hover:underline"
                  >
                    acm23@vnu.edu.vn
                  </a>
                  <p className="mt-0.5 text-xs text-[#263D5C]/70">
                    For questions or amendments.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 border-t border-[#2260AD]/15 pt-6 sm:flex-row">
              <Link
                href="/"
                className="inline-flex w-full items-center justify-center rounded-lg bg-[#2260AD] px-6 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[#143D78] sm:w-auto"
              >
                Back to Home
              </Link>
              <Link
                href="/registration"
                className="inline-flex w-full items-center justify-center gap-1.5 rounded-lg border border-[#2260AD]/30 bg-white px-6 py-2.5 text-sm font-bold text-[#2260AD] transition-colors hover:border-[#2260AD] hover:bg-[#E8F1FA] sm:w-auto"
              >
                Continue to Registration
                <ArrowRight size={15} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
