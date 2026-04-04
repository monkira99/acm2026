import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/page-header";

export const metadata: Metadata = { title: "Gallery" };

export default function GalleryPage() {
  const placeholders = Array.from({ length: 12 }, (_, i) => i + 1);
  return (
    <>
      <PageHeader title="Gallery" subtitle="Photos from past ACM meetings" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {placeholders.map((n) => (
            <div
              key={n}
              className="aspect-square rounded-xl bg-light border border-gray-100 flex items-center justify-center text-sm text-gray-300"
            >
              Photo {n}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
