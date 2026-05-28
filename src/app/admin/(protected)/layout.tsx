import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import { verifyAdmin } from "@/lib/admin-session";
import { AdminSidebar } from "@/components/admin";

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const isAdmin = await verifyAdmin();
  if (!isAdmin) redirect("/admin/login");

  return (
    <div className="flex min-h-screen bg-[#EAF2FB]">
      <AdminSidebar />
      <main className="min-h-screen flex-1 overflow-auto">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
          {children}
        </div>
      </main>
    </div>
  );
}
