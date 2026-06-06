import type { Metadata } from "next";
import Link from "next/link";
import { Mail, MapPin, Globe } from "lucide-react";
import { ContactForm } from "@/components/forms/contact-form";
import { SectionHero } from "@/components/ui/section-hero";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  const contactCards = [
    {
      icon: Mail,
      title: "Email",
      body: "acm23@vnu.edu.vn",
    },
    {
      icon: MapPin,
      title: "Location",
      body: "Hanoi, Vietnam",
    },
  ];

  return (
    <div className="bg-[#EAF2FB]">
      <SectionHero title="Contact us" />

      <div className="content-rail pb-12 pt-8 sm:pb-16 sm:pt-12">
        <div className="mb-8 flex flex-col gap-1 border-b border-[#2260AD]/20 pb-4 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="text-2xl font-black text-[#2260AD]">
            Organizing Team
          </h2>
          <p className="text-sm font-bold uppercase tracking-[0.14em] text-[#263D5C]">
            Get in touch
          </p>
        </div>

        <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">
          {contactCards.map((item) => (
            <div
              key={item.title}
              className="bg-white/75 px-5 py-5 shadow-sm shadow-[#2260AD]/5"
            >
              <item.icon
                size={24}
                className="mb-4 text-[#2260AD]"
                aria-hidden="true"
              />
              <h3 className="text-lg font-bold text-[#143D78]">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-[#263D5C]">
                {item.body}
              </p>
            </div>
          ))}

          <div className="border-l-4 border-[#80AF41] bg-white/80 px-5 py-5 shadow-sm shadow-[#2260AD]/5">
            <Globe size={24} className="mb-4 text-[#2260AD]" aria-hidden="true" />
            <h3 className="text-lg font-bold text-[#143D78]">IMBT Website</h3>
            <Link
              href="http://imbt.vnu.edu.vn/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-block text-sm font-semibold text-[#2260AD] transition-colors hover:text-[#143D78]"
            >
              http://imbt.vnu.edu.vn/
            </Link>
          </div>
        </div>

        <div className="bg-white/85 px-5 py-6 shadow-sm shadow-[#2260AD]/5 sm:px-7">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
