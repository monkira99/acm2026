"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ExternalLink,
  FileText,
  LayoutDashboard,
  LogOut,
  Users,
} from "lucide-react";
import { adminLogoutAction } from "@/lib/actions/admin-auth";

const adminNav = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard, exact: true },
  { href: "/admin/registrations", label: "Registrations", icon: Users },
  { href: "/admin/abstracts", label: "Abstracts", icon: FileText },
];

function isActive(pathname: string, href: string, exact?: boolean) {
  if (exact) return pathname === href;
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex w-60 shrink-0 flex-col bg-[linear-gradient(180deg,#143D78_0%,#2260AD_100%)] text-white">
      <div className="border-b border-white/10 px-5 py-5">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/70">
          ACM23
        </p>
        <p className="mt-1 text-lg font-black">Admin</p>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-4" aria-label="Admin navigation">
        {adminNav.map((item) => {
          const active = isActive(pathname, item.href, item.exact);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold transition-colors ${
                active
                  ? "bg-white/15 text-white"
                  : "text-white/75 hover:bg-white/10 hover:text-white"
              }`}
              aria-current={active ? "page" : undefined}
            >
              <item.icon size={18} aria-hidden="true" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="space-y-1 border-t border-white/10 px-3 py-4">
        <Link
          href="/"
          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold text-white/75 transition-colors hover:bg-white/10 hover:text-white"
        >
          <ExternalLink size={18} aria-hidden="true" />
          View website
        </Link>
        <form action={adminLogoutAction}>
          <button
            type="submit"
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold text-white/75 transition-colors hover:bg-white/10 hover:text-white"
          >
            <LogOut size={18} aria-hidden="true" />
            Log out
          </button>
        </form>
      </div>
    </aside>
  );
}
