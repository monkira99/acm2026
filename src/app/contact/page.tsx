import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/page-header";
import { Mail, MapPin, Globe } from "lucide-react";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <>
      <PageHeader title="Contact Us" subtitle="Get in touch with the ACM23 organizing team" />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="p-6 rounded-xl border border-gray-100 text-center">
            <Mail size={28} className="text-primary mx-auto mb-3" aria-hidden="true" />
            <h3 className="font-semibold text-dark">Email</h3>
            <p className="text-sm text-gray-500 mt-1">contact@acm23.org</p>
          </div>
          <div className="p-6 rounded-xl border border-gray-100 text-center">
            <MapPin size={28} className="text-primary mx-auto mb-3" aria-hidden="true" />
            <h3 className="font-semibold text-dark">Location</h3>
            <p className="text-sm text-gray-500 mt-1">Hanoi, Vietnam</p>
          </div>
          <div className="p-6 rounded-xl border border-gray-100 text-center">
            <Globe size={28} className="text-primary mx-auto mb-3" aria-hidden="true" />
            <h3 className="font-semibold text-dark">ACM Website</h3>
            <p className="text-sm text-gray-500 mt-1">acm-mrc.asia</p>
          </div>
        </div>
        <div className="rounded-xl bg-light p-8 text-center text-gray-400">
          Contact form placeholder
        </div>
      </div>
    </>
  );
}
