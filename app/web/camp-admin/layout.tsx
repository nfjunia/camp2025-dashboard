"use client";

import { useEffect, useState } from "react";
import AppSidebar from "@/components/campAdmin/AppSidebar";

export default function PastorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);
  const [collapsed, setCollapsed] = useState(false); // Track collapse state

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div
      className={`flex flex-col bg-neutral-100 min-h-screen w-full ${
        mounted ? "pt-[70px]" : ""
      }`}
    >
      {/* Sidebar + Main content wrapper */}
      <div className="flex flex-row flex-1">
        {/* Sidebar */}
        <div>
          <AppSidebar />
        </div>

        {/* Main Content */}
        <main className="flex-1 px-4 py-6 md:px-6 transition-all duration-300">
          {children}
        </main>
      </div>
    </div>
  );
}
