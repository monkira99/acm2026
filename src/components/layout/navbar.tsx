import Link from "next/link";
import { MobileMenu } from "./mobile-menu";

const navLinks = [
  { href: "/about", label: "About" },
  { href: "/program", label: "Program" },
  { href: "/speakers", label: "Speakers" },
  { href: "/dates", label: "Dates" },
  { href: "/venue", label: "Venue" },
  { href: "/committees", label: "Committees" },
  { href: "/sponsors", label: "Sponsors" },
  { href: "/gallery", label: "Gallery" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gold flex items-center justify-center">
            <span className="text-xs font-extrabold text-dark">ACM</span>
          </div>
          <span className="font-bold text-dark text-lg hidden sm:block">
            ACM23
          </span>
        </Link>

        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-3 py-2 text-sm text-gray-600 hover:text-primary transition-colors rounded-md hover:bg-gray-50"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/registration"
            className="hidden sm:inline-flex bg-primary text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors"
          >
            Register
          </Link>
          <MobileMenu links={navLinks} />
        </div>
      </nav>
    </header>
  );
}
