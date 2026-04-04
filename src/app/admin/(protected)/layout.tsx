import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import Link from "next/link";
import { verifyAdmin } from "@/lib/admin-session";
import { adminLogoutAction } from "@/lib/actions/admin-auth";
import { LayoutDashboard, Users, FileText, LogOut } from "lucide-react";

const adminNav = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/registrations", label: "Registrations", icon: Users },
  { href: "/admin/abstracts", label: "Abstracts", icon: FileText },
];

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const isAdmin = await verifyAdmin();
  if (!isAdmin) redirect("/admin/login");

  return (
    <div className="min-h-screen flex">
      <aside className="w-56 bg-dark flex-shrink-0 flex flex-col">
        <div className="p-5 border-b border-white/10">
          <span className="text-gold font-bold text-sm">ACM23 Admin</span>
        </div>
        <nav className="flex-1 py-4" aria-label="Admin navigation">
          {adminNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-5 py-3 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
            >
              <item.icon size={18} aria-hidden="true" />
              {item.label}
            </Link>
          ))}
        </nav>
        <form action={adminLogoutAction} className="p-4 border-t border-white/10">
          <button
            type="submit"
            className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
          >
            <LogOut size={16} aria-hidden="true" />
            Logout
          </button>
        </form>
      </aside>
      <main className="flex-1 bg-light p-8 overflow-auto">{children}</main>
    </div>
  );
}
