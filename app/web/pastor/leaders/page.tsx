"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Users,
  Calendar,
  MoreHorizontal,
  Edit,
  Trash2,
  Search,
  FolderOpen,
} from "lucide-react";
import Header from "@/components/pastor/Header";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

function DateCell({ dateString }: { dateString: string }) {
  const formatted = new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(dateString));

  return <span>{formatted}</span>;
}

const cellLeaders = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah.johnson@church.org",
    phone: "+1 (555) 123-4567",
    cellName: "Grace Cell",
    memberCount: 12,
    location: "Downtown Campus",
    joinDate: "2023-01-15",
    avatar: "/diverse-woman-smiling.png",
  },
  {
    id: 2,
    name: "Michael Chen",
    email: "michael.chen@church.org",
    phone: "+1 (555) 234-5678",
    cellName: "Hope Cell",
    memberCount: 8,
    location: "North Campus",
    joinDate: "2023-03-20",
    avatar: "/smiling-man.png",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    email: "emily.rodriguez@church.org",
    phone: "+1 (555) 345-6789",
    cellName: "Faith Cell",
    memberCount: 15,
    location: "South Campus",
    joinDate: "2022-11-10",
    avatar: "/professional-woman.png",
  },
  {
    id: 4,
    name: "David Thompson",
    email: "david.thompson@church.org",
    phone: "+1 (555) 456-7890",
    cellName: "Love Cell",
    memberCount: 10,
    location: "East Campus",
    joinDate: "2023-05-08",
    avatar: "/professional-man.png",
  },
];

export default function CellLeaderDashboard() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredLeaders = cellLeaders.filter(
    (leader) =>
      leader.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      leader.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
      leader.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalMembers = cellLeaders.reduce(
    (sum, leader) => sum + leader.memberCount,
    0
  );
  const totalCells = cellLeaders.length;

  const handleEditLeader = (leaderId: number) => {
    console.log("Edit leader:", leaderId);
  };

  const handleDeleteLeader = (leaderId: number) => {
    console.log("Delete leader:", leaderId);
  };

  return (
    <div className="h-screen">
      <Header />
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="w-full space-y-2 bg-white p-5 rounded-md border">
          <div className="flex items-center">
            <div>
              <h1 className="mb-2 text-[15px] font-bold">
                Cell Leader Management
              </h1>
              <p className="text-xs text-gray-600">
                Manage your cell leaders and oversee their communities
              </p>
            </div>
          </div>
        </div>
        <Separator className="mt-4" />

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-b-4 py-3 payment pb-0 relative border-b-[#0fa2f7]">
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-sm font-medium">
                Total Cell Leaders
              </CardTitle>
              <button className="bg-[#0fa2f7]/10 p-2 rounded-md">
                <Users className="h-4 w-4 text-[#0fa2f7]" />
              </button>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold text-primary">{totalCells}</div>
              <p className="text-xs text-muted-foreground">
                Active Cell leaders
              </p>
            </CardContent>
          </Card>

          <Card className="py-3">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Members
              </CardTitle>
              <button className="bg-[#0fa2f7]/10 p-2 rounded-md">
                <Users className="h-4 w-4 text-[#0fa2f7]" />
              </button>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold">{totalMembers}</div>
              <p className="text-xs text-muted-foreground">Across all cells</p>
            </CardContent>
          </Card>

          <Card className="py-3">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Average Cell Size
              </CardTitle>
              <button className="bg-[#0fa2f7]/10 p-2 rounded-md">
                <Calendar className="h-4 w-4 text-[#0fa2f7]" />
              </button>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold">
                {Math.round(totalMembers / totalCells)}
              </div>
              <p className="text-xs text-muted-foreground">Members per cell</p>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter */}
        <Card>
          <CardHeader>
            <CardTitle>Cell Leaders</CardTitle>
            <CardDescription>
              Manage and oversee your cell leaders
            </CardDescription>
            <div className="py-3">
              <Separator />
            </div>
            <div className="flex items-center space-x-2 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search by name, cell, or location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 lg:w-[440px]"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent className="border-t w-full">
            {/* Leaders Table */}
            <div className="overflow-x-auto w-full">
              <Table className="min-w-[700px]">
                <TableHeader className="w-full">
                  <TableRow>
                    <TableHead>Leader</TableHead>
                    <TableHead>Email Address</TableHead>
                    <TableHead>Phone Number</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Members</TableHead>
                    <TableHead>Join Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredLeaders.map((leader) => (
                    <TableRow key={leader.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <Avatar>
                            <AvatarImage
                              src={leader.avatar || "/placeholder.svg"}
                              alt={leader.name}
                            />
                            <AvatarFallback>
                              {leader.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium text-foreground">
                              {leader.name}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{leader.email}</TableCell>
                      <TableCell>{leader.phone}</TableCell>
                      <TableCell className="text-muted-foreground">
                        {leader.location}
                      </TableCell>
                      <TableCell>
                        <div className="flex bg-[#0fa2f7]/10 px-3 py-1 rounded-2xl items-center space-x-1">
                          <Users className="h-4 w-4 text-[#0fa2f7]" />
                          <span className="font-medium text-[#0fa2f7]">
                            {leader.memberCount}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <DateCell dateString={leader.joinDate} />
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem asChild>
                              <Link
                                href={`/web/pastor/leaders/${leader.id}/members`}
                              >
                                <FolderOpen className="mr-2 h-4 w-4" />
                                View Members
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleEditLeader(leader.id)}
                            >
                              <Edit className="mr-2 h-4 w-4" />
                              Edit Leader
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleDeleteLeader(leader.id)}
                              className="text-destructive"
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete Leader
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
