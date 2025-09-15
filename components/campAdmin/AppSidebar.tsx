"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Image from "next/image";
import Link from "next/link";
import churchLogo from "@/public/images/HWogo.png";
import { LayoutDashboard, Users, ChevronRight, DollarSign } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function AppSidebar() {
  const pathName = usePathname();
  const [openPayment, setOpenPayment] = useState(false);

  // auto-open payment if user is inside /payment or /transactions
  useEffect(() => {
    if (
      pathName.startsWith("/web/pastor/payment") ||
      pathName.startsWith("/web/pastor/transactions")
    ) {
      setOpenPayment(true);
    }
  }, [pathName]);

  return (
    <Sidebar className="z-30" side="left" variant="sidebar" collapsible="icon">
      <SidebarHeader>
        <Link href="/web/pastor" className="flex items-center gap-2">
          <Image src={churchLogo} height={100} width={130} alt="church_logo" />
        </Link>
      </SidebarHeader>

      <SidebarContent className=" px-2">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {/* Overview */}
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  className={`px-3 py-[18px] ${
                    pathName === "/web/camp-admin"
                      ? "bg-[#0fa2f7]/5 border-l-4 border-[#0fa2f7]"
                      : ""
                  }`}
                >
                  <Link href="/web/camp-admin" className="flex items-center">
                    <LayoutDashboard
                      className={`mr-2 ${
                        pathName === "/web/camp-admin" ? "text-[#0fa2f7]" : ""
                      }`}
                    />
                    <span>Overview</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {/* Cell Leader */}
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  className={`px-3 py-[18px] ${
                    pathName.startsWith("/web/camp-admin/members")
                      ? "bg-[#0fa2f7]/5 border-l-4 border-[#0fa2f7]"
                      : ""
                  }`}
                >
                  <Link
                    href="/web/camp-admin/members"
                    className="flex items-center"
                  >
                    <Users
                      className={`mr-2 ${
                        pathName === "/web/camp-admin/members"
                          ? "text-[#0fa2f7]"
                          : ""
                      }`}
                    />
                    <span>Member management</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter />
    </Sidebar>
  );
}
