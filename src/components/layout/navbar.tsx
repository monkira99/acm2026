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
      <nav className="mx-auto grid h-20 w-full max-w-[1640px] grid-cols-[auto_1fr_auto] items-center gap-4 px-4 sm:px-6 lg:gap-8 lg:px-8">
        <Link href="/" className="flex items-center shrink-0">
          <Image
            src="/logo_imbt.png"
            alt="IMBT logo"
            width={1578}
            height={238}
            className="h-12 w-auto max-w-none object-contain sm:h-14 lg:h-[54px] 2xl:h-[58px]"
            priority
          />
        </Link>

        <div className="hidden w-full items-center justify-between gap-2 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="whitespace-nowrap px-1.5 py-2 text-sm font-semibold text-gray-600 hover:text-primary transition-colors rounded-md hover:bg-gray-50 xl:px-2"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center justify-end gap-3">
          <Link
            href="/"
            className="hidden items-center sm:inline-flex"
            aria-label="IMBT home"
          >
            <Image
              src="/acm_logo.png"
              alt="ACM23 logo"
              width={1280}
              height={274}
              className="h-11 w-auto max-w-none object-contain sm:h-12 lg:h-[56px]"
            />
          </Link>
          <MobileMenu links={navLinks} />
        </div>
      </nav>
    </header>
  );
}
