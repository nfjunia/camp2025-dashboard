"use client";
import { useEffect, useState } from "react";
import { Bell } from "lucide-react";
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
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { SidebarTrigger, useSidebar } from "../ui/sidebar";
import { Input } from "../ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Search } from "lucide-react";

const Header = () => {
  const navigate = useRouter();
  const [blur, setBlur] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const [notifications] = useState<string[]>([]);

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

  const { state } = useSidebar();

  return (
    <>
      <div
        className={`w-full fixed transition-all ${
          state === "collapsed" ? "pl-12" : "lg:pl-70"
        } right-0 duration-200 px-5 ${blur ? "backdrop-blur-xs bg-white/50" : "bg-white"} z-20 top-0 h-[70px] border`}
      >
        <div className="w-full flex items-center h-full  mx-auto justify-between max-w-[1600px]">
          <div className="flex items-center gap-2">
            <SidebarTrigger />
            <div
              onClick={() => setIsSearchOpen(true)}
              className="bg-white lg:w-[400px] h-10 px-3 py-2 border border-input rounded-md cursor-pointer flex items-center gap-2 hover:bg-gray-50 transition-colors"
            >
              <Search size={16} className="text-gray-400" />
              <span className="text-sm text-gray-500">Search by name...</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="relative cursor-pointer outline-none">
                  <Bell size={22} />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-72 max-h-72 overflow-y-auto">
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
                  className="text-blue-[#0fa2f7] justify-center font-medium cursor-pointer hover:text-[#0fa2f7]"
                >
                  View all notifications
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <div className="cursor-pointer flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center outline-none cursor-pointer gap-2.5">
                  <Avatar>
                    {/**<AvatarImage src={""} /> */}
                    <AvatarFallback className="text-xs font-bold">
                      PD
                    </AvatarFallback>
                  </Avatar>
                  <span className="font-light text-[13px] hidden lg:block">
                    Pastor David Jnr
                  </span>
                  <ChevronDown size={13} className=" hidden lg:block" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>pastordavid@gmail.com</DropdownMenuLabel>
                  <DropdownMenuLabel className="flex">
                    <div className="bg-[#30961c]/15 text-xs font-medium py-0.5 px-3 rounded-xl text-[#30961c]">
                      Kabod Assembly
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => navigate.push("/")}
                    className="flex hover:text-red-600 cursor-pointer hover:bg-red-600/25 items-center gap-2.5"
                  >
                    <LogOut />
                    <span>Log Out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>

      <Dialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Search</DialogTitle>
          </DialogHeader>
          <div className="flex items-center space-x-2">
            <div className="grid flex-1 gap-2">
              <Input
                placeholder="Search by name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
                autoFocus
              />
            </div>
          </div>
          {searchQuery && (
            <div className="mt-4 p-4 bg-gray-50 rounded-md">
              <p className="text-sm text-gray-600">
                Searching for:{" "}
                <span className="font-medium">{searchQuery}</span>
              </p>
              {/* Add your search results here */}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Header;
