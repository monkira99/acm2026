"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

interface MobileMenuProps {
  links: { href: string; label: string }[];
}

export function MobileMenu({ links }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  return (
    <div className="lg:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-gray-600 hover:text-primary"
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {isOpen && (
        <div className="absolute left-0 right-0 top-20 max-h-[calc(100svh-5rem)] overflow-y-auto border-b border-gray-100 bg-white shadow-lg">
          <div className="mx-auto grid w-full max-w-7xl gap-1 px-4 py-4 sm:grid-cols-2 sm:px-6 lg:px-8">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block rounded-lg px-4 py-2.5 text-gray-600 transition-colors hover:bg-gray-50 hover:text-primary"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/registration"
              onClick={() => setIsOpen(false)}
              className="mt-1 block rounded-lg bg-[#80AF41] px-4 py-3 text-center text-sm font-bold text-white transition-colors hover:bg-[#739D3B] sm:col-span-2"
            >
              Register now
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
