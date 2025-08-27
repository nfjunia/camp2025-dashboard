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
      className={`flex bg-neutral-100 min-h-screen w-full ${
        mounted ? "pt-[70px]" : ""
      }`}
    >
      <AppSidebar />
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
