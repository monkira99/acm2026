import Link from "next/link";
import { LotusDecor } from "@/components/cultural";
import { Mail, MapPin } from "lucide-react";

const footerLinks = {
  conference: [
    { href: "/welcome", label: "Welcome" },
    { href: "/program", label: "Scientific Program" },
    { href: "/speakers", label: "Keynote Speakers" },
    { href: "/dates", label: "Registration" },
  ],
  participate: [
    { href: "/registration", label: "Registration" },
    { href: "/abstract", label: "Submit Abstract" },
    { href: "/venue", label: "Venue & Travel" },
    { href: "/contact", label: "Contact Us" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-dark text-gray-300">
      <div className="max-w-7xl mx-auto px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="mb-3">
              <div>
                <div className="text-base font-bold text-white">ACM23</div>
                <div className="text-xs text-gray-400">Hanoi, Vietnam · November 16-18, 2026</div>
              </div>
            </div>
            <p className="max-w-md text-sm leading-6 text-gray-400">
              The 23rd Annual Meeting of the Asian Consortium for the
              Conservation and Sustainable Use of Microbial Resources.
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-gray-400">
              <span className="flex items-center gap-1.5">
                <MapPin size={14} aria-hidden="true" /> Hanoi, Vietnam
              </span>
              <span className="flex items-center gap-1.5">
                <Mail size={14} aria-hidden="true" /> acm23@vnu.edu.vn
              </span>
            </div>
          </div>

          <div>
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-white">
              Conference
            </h3>
            <ul className="space-y-1.5">
              {footerLinks.conference.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 transition-colors hover:text-gold"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-white">
              Participate
            </h3>
            <ul className="space-y-1.5">
              {footerLinks.participate.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 transition-colors hover:text-gold"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-gray-700/50 pt-5 sm:flex-row">
          <div className="flex items-center gap-2">
            <LotusDecor color="#C8A951" size={16} />
            <span className="text-xs text-gray-500">
              &copy; 2026 ACM — Asian Consortium for Microbial Resources
            </span>
          </div>
          <Link
            href="http://imbt.vnu.edu.vn/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-gray-500 hover:text-gold transition-colors"
          >
            IMBT
          </Link>
        </div>
      </div>
    </footer>
  );
}
