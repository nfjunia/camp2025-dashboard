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
                    pathName === "/web/pastor"
                      ? "bg-[#0fa2f7]/5 border-l-4 border-[#0fa2f7]"
                      : ""
                  }`}
                >
                  <Link href="/web/pastor" className="flex items-center">
                    <LayoutDashboard
                      className={`mr-2 ${
                        pathName === "/web/pastor" ? "text-[#0fa2f7]" : ""
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
                    pathName.startsWith("/web/pastor/leaders")
                      ? "bg-[#0fa2f7]/5 border-l-4 border-[#0fa2f7]"
                      : ""
                  }`}
                >
                  <Link
                    href="/web/pastor/leaders"
                    className="flex items-center"
                  >
                    <Users
                      className={`mr-2 ${
                        pathName === "/web/pastor/leaders"
                          ? "text-[#0fa2f7]"
                          : ""
                      }`}
                    />
                    <span>Cell Leader</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {/* Payment (Expandable) */}
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => setOpenPayment((prev) => !prev)}
                  className={`px-3 py-[18px] cursor-pointer flex justify-between items-center ${
                    pathName.startsWith("/web/pastor/payment") ||
                    pathName.startsWith("/web/pastor/transactions")
                      ? "bg-[#0fa2f7]/5 border-l-4 border-[#0fa2f7]"
                      : ""
                  }`}
                >
                  <div className="flex items-center">
                    <DollarSign
                      size={17}
                      className={`mr-2 ${
                        pathName.startsWith(
                          "/web/pastor/payment" || "/web/pastor/transaction"
                        )
                          ? "text-[#0fa2f7]"
                          : ""
                      }`}
                    />
                    <span>Payment</span>
                  </div>
                  <ChevronRight
                    className={`transition-transform duration-200 ${
                      openPayment ? "rotate-90" : ""
                    }`}
                    size={18}
                  />
                </SidebarMenuButton>

                {/* Children (Make Payment + Transactions) */}
                {openPayment && (
                  <div className="ml-9 mt-1 border-l-2 pl-1.5 space-y-1">
                    <SidebarMenuButton
                      asChild
                      className={`px-3 py-2 text-sm ${
                        pathName === "/web/pastor/payment"
                          ? "text-[#0fa2f7]"
                          : ""
                      }`}
                    >
                      <Link href="/web/pastor/payment" className="text-[12px]">
                        Make Payment
                      </Link>
                    </SidebarMenuButton>

                    <SidebarMenuButton
                      asChild
                      className={`px-3 py-2 text-sm ${
                        pathName === "/web/pastor/transactions"
                          ? " text-[#0fa2f7]"
                          : ""
                      }`}
                    >
                      <Link
                        href="/web/pastor/transactions"
                        className="text-[12px]"
                      >
                        Transactions
                      </Link>
                    </SidebarMenuButton>
                  </div>
                )}
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter />
    </Sidebar>
  );
}
