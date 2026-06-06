import Link from "next/link";
import type { CSSProperties } from "react";
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

const desktopNavStyle = {
  "--desktop-nav-start": "max(2rem, calc((100vw - 72rem) / 2))",
  "--desktop-cta-reserve": "13rem",
} as CSSProperties;

export function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-gray-100 bg-white">
      <nav
        className="flex h-20 w-full items-center px-4 sm:px-6 lg:px-0"
        style={desktopNavStyle}
      >
        <div className="hidden w-full items-center lg:flex">
          <ul className="ml-[var(--desktop-nav-start)] flex w-[min(72rem,calc(100vw-var(--desktop-nav-start)-var(--desktop-cta-reserve)))] min-w-0 items-center justify-between gap-x-1 xl:gap-x-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="whitespace-nowrap rounded-md px-2 py-2 text-sm font-semibold text-gray-600 transition-colors hover:bg-[#EAF2FB] hover:text-[#2260AD] xl:px-2.5 min-[1480px]:px-3.5"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="ml-auto flex items-center justify-end lg:hidden">
          <MobileMenu links={navLinks} />
        </div>
      </nav>
      <Link
        href="/registration"
        className="absolute right-4 top-1/2 hidden -translate-y-1/2 whitespace-nowrap rounded-md bg-[#80AF41] px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[#739D3B] sm:right-6 lg:right-8 lg:inline-flex"
      >
        Register Now
      </Link>
    </header>
  );
}
