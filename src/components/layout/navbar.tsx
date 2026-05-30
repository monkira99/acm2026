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
        <div className="hidden w-full items-center gap-3 lg:flex xl:gap-5">
          <ul className="-mx-2 flex min-w-0 flex-1 items-center justify-between gap-x-1 xl:-mx-2.5 xl:gap-x-2 min-[1480px]:-mx-3.5">
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
          <Link
            href="/registration"
            className="hidden shrink-0 whitespace-nowrap rounded-md bg-[#80AF41] px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[#739D3B] max-[1479px]:inline-flex"
          >
            Register Now
          </Link>
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
