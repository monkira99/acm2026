"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { Navbar } from "./navbar";
import { PageFooter } from "./page-footer";

export function SiteChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex flex-1 flex-col pt-20 [&>*]:flex-1">
        {children}
      </main>
      <PageFooter />
    </div>
  );
}
