"use client";
import React, { useEffect, useRef, useState } from "react";
import { Bell } from "lucide-react";
import { User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut } from "lucide-react";
import { ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import churchLogo from "../../public/images/HWogo.png";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Header = () => {
  const navigate = useRouter();
  const [blur, setBlur] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop > 30) {
        setBlur(true);
      } else {
        setBlur(false);
      }
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
      <div className="w-full flex items-center h-full  mx-auto justify-between max-w-[1300px]">
        <Link href="/camp-admin" className="flex items-center gap-2">
          <Image src={churchLogo} height={80} width={100} alt="church_logo" />
        </Link>
        <div className="flex items-center gap-4">
          <button className="relative cursor-pointer">
            {" "}
            <Bell size={22} />
            <span className="absolute w-[7px] top-0.5 right-1 h-[7px] rounded-full bg-red-600"></span>
          </button>
          <div className="cursor-pointer flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center outline-none cursor-pointer gap-2.5">
                <Avatar>
                  {/**<AvatarImage src={""} /> */}
                  <AvatarFallback className="text-xs font-bold">
                    CN
                  </AvatarFallback>
                </Avatar>
                <span className="font-light text-[13px] hidden lg:block">
                  Pastor David Jnr
                </span>
                <ChevronDown size={13} className=" hidden lg:block" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>leader@church.com</DropdownMenuLabel>
                <DropdownMenuLabel className="flex">
                  <div className="bg-[#30961c]/15 text-xs py-0.5 px-3 rounded-xl text-[#30961c]">
                    Kabod Assembly
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
