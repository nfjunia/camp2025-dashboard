"use client";

import { useEffect, useState } from "react";
import AppSidebar from "@/components/pastor/app-sidebar";

export default function PastorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div
      className={`flex flex-col md:flex-row bg-neutral-100 min-h-screen w-full ${
        mounted ? "pt-[70px]" : ""
      }`}
    >
      {/* Sidebar */}
      <div className="w-full md:w-64">
        <AppSidebar />
      </div>

      {/* Main Content */}
      <main className="flex-1 px-4 py-6 md:px-6">{children}</main>
    </div>
  );
}
