import Link from "next/link";
import { MobileMenu } from "./mobile-menu";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/welcome", label: "Welcome" },
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
      <nav className="relative mx-auto flex h-20 w-full max-w-[1640px] items-center justify-end px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-y-0 left-4 right-44 hidden items-center justify-center gap-1 lg:flex xl:right-52">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="whitespace-nowrap rounded-md px-2 py-2 text-sm font-semibold text-gray-600 transition-colors hover:bg-gray-50 hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <Link
          href="/registration"
          className="hidden whitespace-nowrap rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-secondary lg:inline-flex"
        >
          Register Now
        </Link>

        <MobileMenu links={navLinks} />
      </nav>
    </header>
  );
}
