import Image from "next/image";
import Link from "next/link";
import { MobileMenu } from "./mobile-menu";

const navLinks = [
  { href: "/about", label: "Welcome" },
  { href: "/program", label: "Program" },
  { href: "/speakers", label: "Speakers" },
  { href: "/dates", label: "Registration" },
  { href: "/venue", label: "Venue" },
  { href: "/committees", label: "Committees" },
  { href: "/contact", label: "Contact Us" },
];

export function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-gray-100 bg-white">
      <nav className="mx-auto grid h-20 w-full max-w-7xl grid-cols-[auto_1fr_auto] items-center gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center shrink-0">
          <Image
            src="/logo_acm23.png"
            alt="ACM logo"
            width={1702}
            height={630}
            className="h-14 w-auto max-w-none object-contain"
            priority
          />
        </Link>

        <div className="hidden lg:flex items-center justify-center gap-1">
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

        <div className="flex items-center justify-end gap-3">
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
