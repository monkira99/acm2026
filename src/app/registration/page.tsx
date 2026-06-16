import type { Metadata } from "next";
import { RegistrationForm } from "@/components/forms/registration-form";
import { SectionHero } from "@/components/ui/section-hero";
import { Ordinal23 } from "@/components/ui/ordinal-23";
import { importantDates } from "@/data/dates";
import { Clock, UserCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Registration",
  description: "Register for ACM23 — The 23rd Annual Meeting in Hanoi, Vietnam.",
};

const registrationDeadline = importantDates.find(
  ({ label }) => label === "Registration",
);

export default function RegistrationPage() {
  return (
    <div className="bg-[#EAF2FB]">
      <SectionHero title="Registration" />

      <div className="content-rail pb-12 pt-8 sm:pb-16 sm:pt-12">
        <div className="mb-8 flex flex-col gap-1 border-b border-[#2260AD]/20 pb-4 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="text-2xl font-black text-[#2260AD]">
            Register for ACM23
          </h2>
        </div>

        <div className="grid gap-5 lg:grid-cols-[1fr_2fr]">
          <aside className="space-y-3">
            {registrationDeadline ? (
              <div className="flex items-start gap-3 border-l-4 border-[#80AF41] bg-white/75 px-5 py-4 shadow-sm shadow-[#2260AD]/5">
                <Clock
                  className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#2260AD]"
                  aria-hidden="true"
                />
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#2260AD]">
                    Registration deadline
                  </p>
                  <p className="mt-1 text-sm font-semibold text-[#263D5C]">
                    {registrationDeadline.date}
                  </p>
                </div>
              </div>
            ) : null}

            <div className="border-l-4 border-[#80AF41] bg-white/75 px-5 py-4 shadow-sm shadow-[#2260AD]/5">
              <UserCheck
                className="mb-3 h-5 w-5 text-[#2260AD]"
                aria-hidden="true"
              />
              <p className="text-sm leading-6 text-[#263D5C]">
                Complete the form to register your attendance for the{" "}
                <Ordinal23 /> Annual Meeting in Hanoi.
              </p>
            </div>
          </aside>

          <section className="bg-white/85 px-5 py-6 shadow-sm shadow-[#2260AD]/5 sm:px-7">
            <RegistrationForm />
          </section>
        </div>
      </div>
    </div>
  );
}
