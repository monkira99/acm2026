import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle } from "lucide-react";

export const metadata: Metadata = { title: "Abstract Submitted" };

export default async function AbstractSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ id?: string }>;
}) {
  const { id } = await searchParams;
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <CheckCircle size={64} className="text-accent mx-auto mb-6" aria-hidden="true" />
        <h1 className="text-3xl font-bold text-dark mb-2">Abstract Submitted!</h1>
        {id && (
          <p className="text-lg text-primary font-semibold mb-4">
            Submission ID: {id}
          </p>
        )}
        <p className="text-gray-500 mb-8">
          A confirmation email has been sent. You will be notified of the review
          outcome by August 15, 2026.
        </p>
        <Link href="/" className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors">
          Back to Home
        </Link>
      </div>
    </div>
  );
}
