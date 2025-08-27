"use client";

import React, { useEffect, useState } from "react";
import { Bell, LogOut, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import Image from "next/image";
import churchLogo from "../public/images/HWogo.png";
import Link from "next/link";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const Header = () => {
  const navigate = useRouter();
  const [blur, setBlur] = useState(false);

  // Example notifications array (empty by default)
  const [notifications] = useState<string[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setBlur(scrollTop > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`w-full fixed transition-all duration-200 left-0 px-5 right-0 ${
        blur ? "backdrop-blur-xs bg-white/50" : "bg-white"
      } z-20 top-0 h-[70px] border`}
    >
      <div className="w-full flex items-center h-full mx-auto justify-between max-w-[1600px]">
        {/* Logo */}
        <Link href="/camp-admin" className="flex items-center gap-2">
          <Image src={churchLogo} height={80} width={100} alt="church_logo" />
        </Link>

        {/* Right section */}
        <div className="flex items-center gap-4">
          {/* Notification Bell */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="relative cursor-pointer outline-none">
                <Bell size={22} />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-72 max-h-64 overflow-y-auto">
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />

              {notifications.length === 0 ? (
                <div className="p-4 text-center text-sm text-gray-500">
                  No new notifications
                </div>
              ) : (
                notifications.map((note, index) => (
                  <DropdownMenuItem key={index}>{note}</DropdownMenuItem>
                ))
              )}

              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => navigate.push("/notifications")}
                className="text-blue-600 justify-center font-medium cursor-pointer hover:text-blue-700"
              >
                View all notifications
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User Avatar Dropdown */}
          <div className="cursor-pointer flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center outline-none cursor-pointer gap-2.5">
                <Avatar>
                  {/* <AvatarImage src={""} /> */}
                  <AvatarFallback className="text-xs font-bold">
                    SA
                  </AvatarFallback>
                </Avatar>
                <span className="font-semibold text-[13px] hidden lg:block">
                  Super Admin
                </span>
                <ChevronDown size={13} className="hidden lg:block" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>superadmin@gmial.com</DropdownMenuLabel>
                <DropdownMenuLabel className="flex">
                  <div className="bg-[#30961c]/15 text-xs py-0.5 px-3 rounded-xl text-[#30961c]">
                    Super Admin
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => navigate.push("/")}
                  className="flex hover:text-red-600 cursor-pointer hover:bg-red-600/25 items-center gap-2.5"
                >
                  <LogOut />
                  <span>LogOut</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
