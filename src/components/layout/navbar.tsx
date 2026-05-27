import Link from "next/link";
import { MobileMenu } from "./mobile-menu";

const navLinks = [
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
        <div className="absolute left-1/2 hidden w-[760px] -translate-x-1/2 items-center justify-between lg:flex xl:w-[860px]">
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

        <MobileMenu links={navLinks} />
      </nav>
    </header>
  );
}
