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
      <nav className="mx-auto flex h-20 w-full max-w-6xl items-center px-4 sm:px-6 lg:px-8">
        <div className="hidden w-full lg:block">
          <ul className="flex w-full items-center justify-between gap-x-4">
            {navLinks.map((link, index) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`whitespace-nowrap rounded-md px-2.5 py-2 text-sm font-semibold text-gray-600 transition-colors hover:bg-[#EAF2FB] hover:text-[#2260AD] xl:px-3.5 ${
                    index === 0
                      ? "pl-0 xl:pl-0"
                      : index === navLinks.length - 1
                        ? "pr-0 xl:pr-0"
                        : ""
                  }`}
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
        className="absolute right-8 top-1/2 hidden -translate-y-1/2 whitespace-nowrap rounded-md bg-[#80AF41] px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[#739D3B] min-[1480px]:inline-flex"
      >
        Register Now
      </Link>
    </header>
  );
}
