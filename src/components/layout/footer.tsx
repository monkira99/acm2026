import Link from "next/link";
import { LotusDecor } from "@/components/cultural";
import { Mail, MapPin } from "lucide-react";

const footerLinks = [
  { href: "/welcome", label: "Welcome" },
  { href: "/program", label: "Program" },
  { href: "/speakers", label: "Speakers" },
  { href: "/dates", label: "Dates" },
  { href: "/registration", label: "Registration" },
  { href: "/abstract", label: "Submit abstract" },
  { href: "/venue", label: "Venue" },
  { href: "/contact", label: "Contact us" },
];

export function Footer() {
  return (
    <footer className="bg-dark text-gray-300">
      <div className="content-rail py-5 sm:py-6">
        <div className="grid gap-5 md:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] md:items-start">
          <div className="min-w-0">
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <div className="text-sm font-black text-white">ACM23</div>
              <div className="text-xs text-gray-400">
                Hanoi, Vietnam · Nov 16-18, 2026
              </div>
            </div>
            <p className="mt-2 hidden max-w-lg text-xs leading-5 text-gray-400 sm:block">
              The 23rd Annual Meeting of the Asian Consortium for the
              Conservation and Sustainable Use of Microbial Resources.
            </p>
            <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs text-gray-400">
              <span className="flex items-center gap-1.5">
                <MapPin size={13} aria-hidden="true" /> Hanoi, Vietnam
              </span>
              <span className="flex items-center gap-1.5">
                <Mail size={13} aria-hidden="true" /> acm23@vnu.edu.vn
              </span>
            </div>
          </div>

          <nav
            aria-label="Footer navigation"
            className="grid grid-cols-2 justify-items-center gap-x-5 gap-y-2 text-center text-xs sm:grid-cols-4"
          >
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-400 transition-colors hover:text-gold"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-5 flex flex-col justify-between gap-2 border-t border-gray-700/50 pt-4 text-xs text-gray-500 sm:flex-row sm:items-center">
          <div className="flex items-center gap-2">
            <LotusDecor color="#C8A951" size={14} />
            <span>
              &copy; 2026 ACM — Asian Consortium for Microbial Resources
            </span>
          </div>
          <Link
            href="http://imbt.vnu.edu.vn/"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-gold"
          >
            IMBT
          </Link>
        </div>
      </div>
    </footer>
  );
}
