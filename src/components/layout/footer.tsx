import Link from "next/link";
import { LotusDecor } from "@/components/cultural";
import { Mail, MapPin } from "lucide-react";

const footerLinks = {
  conference: [
    { href: "/about", label: "About ACM" },
    { href: "/program", label: "Scientific Program" },
    { href: "/speakers", label: "Keynote Speakers" },
    { href: "/dates", label: "Important Dates" },
  ],
  participate: [
    { href: "/registration", label: "Registration" },
    { href: "/abstract", label: "Submit Abstract" },
    { href: "/venue", label: "Venue & Travel" },
    { href: "/faq", label: "FAQ" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-dark text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-gold flex items-center justify-center">
                <span className="text-xs font-extrabold text-dark">ACM</span>
              </div>
              <div>
                <div className="font-bold text-white text-lg">ACM23</div>
                <div className="text-xs text-gray-400">Hanoi, Vietnam · October 2026</div>
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed max-w-md">
              The 23rd Annual Meeting of the Asian Consortium for the
              Conservation and Sustainable Use of Microbial Resources.
            </p>
            <div className="flex items-center gap-4 mt-4 text-sm text-gray-400">
              <span className="flex items-center gap-1.5">
                <MapPin size={14} /> Hanoi, Vietnam
              </span>
              <span className="flex items-center gap-1.5">
                <Mail size={14} /> contact@acm23.org
              </span>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">
              Conference
            </h3>
            <ul className="space-y-2">
              {footerLinks.conference.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-gold transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">
              Participate
            </h3>
            <ul className="space-y-2">
              {footerLinks.participate.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-gold transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-700/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <LotusDecor color="#C8A951" size={16} />
            <span className="text-xs text-gray-500">
              &copy; 2026 ACM — Asian Consortium for Microbial Resources
            </span>
          </div>
          <Link
            href="https://www.acm-mrc.asia"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-gray-500 hover:text-gold transition-colors"
          >
            acm-mrc.asia
          </Link>
        </div>
      </div>
    </footer>
  );
}
