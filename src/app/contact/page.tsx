import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/ui/page-header";
import { Mail, MapPin, Globe } from "lucide-react";
import { ContactForm } from "@/components/forms/contact-form";

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
            <p className="text-sm text-gray-500 mt-1">acm23@vnu.edu.vn</p>
          </div>
          <div className="p-6 rounded-xl border border-gray-100 text-center">
            <MapPin size={28} className="text-primary mx-auto mb-3" aria-hidden="true" />
            <h3 className="font-semibold text-dark">Location</h3>
            <p className="text-sm text-gray-500 mt-1">Hanoi, Vietnam</p>
          </div>
          <div className="p-6 rounded-xl border border-gray-100 text-center">
            <Globe size={28} className="text-primary mx-auto mb-3" aria-hidden="true" />
            <h3 className="font-semibold text-dark">IMBT Website</h3>
            <Link
              href="http://imbt.vnu.edu.vn/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-primary hover:text-primary/80 mt-1 inline-block"
            >
              http://imbt.vnu.edu.vn/
            </Link>
          </div>
        </div>
        <ContactForm />
      </div>
    </>
  );
}
