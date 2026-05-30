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
      <nav className="mx-auto grid h-20 w-full max-w-[1640px] grid-cols-[auto_1fr_auto] items-center gap-4 px-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] lg:px-8">
        <Link
          href="/"
          className="text-lg font-black tracking-tight text-[#2260AD] sm:text-xl"
        >
        </Link>

        <div className="hidden items-center justify-center lg:flex">
          <ul className="flex items-center gap-x-1 xl:gap-x-3 2xl:gap-x-5">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="whitespace-nowrap rounded-md px-2.5 py-2 text-sm font-semibold text-gray-600 transition-colors hover:bg-[#EAF2FB] hover:text-[#2260AD] xl:px-3.5"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center justify-end gap-3">
          <Link
            href="/registration"
            className="hidden whitespace-nowrap rounded-md bg-[#80AF41] px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[#739D3B] lg:inline-flex"
          >
            Register Now
          </Link>
          <MobileMenu links={navLinks} />
        </div>
      </nav>
    </header>
  );
}
