import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/page-header";
import { RegistrationForm } from "@/components/forms/registration-form";

export const metadata: Metadata = {
  title: "Registration",
  description: "Register for ACM23 — The 23rd Annual Meeting in Hanoi, Vietnam.",
};

export default function RegistrationPage() {
  return (
    <>
      <PageHeader title="Registration" subtitle="Register for ACM23 — Hanoi, November 16-17, 2026" />
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <RegistrationForm />
      </div>
    </>
  );
}
