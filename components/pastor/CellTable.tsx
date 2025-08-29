"use client";

import { useState } from "react";
import {
  MoreHorizontal,
  Edit,
  Trash2,
  Users,
  Phone,
  Mail,
  FolderOpen,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface CellLeader {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  status: "steward" | "deacon" | "elder" | "deaconess leader" | "minister";
  memberCount: number;
  meetingDay: string;
  totalPayments: number;
  pendingPayments: number;
}

const mockCellLeaders: CellLeader[] = [
  {
    id: "1",
    name: "Pastor John Smith",
    email: "john.smith@church.org",
    phone: "+1 (555) 123-4567",
    location: "Downtown Chapel",
    status: "minister",
    memberCount: 25,
    meetingDay: "Saturday 10:00 AM",
    totalPayments: 12500,
    pendingPayments: 3750,
  },
  {
    id: "2",
    name: "Deacon Mary Johnson",
    email: "mary.johnson@church.org",
    phone: "+1 (555) 234-5678",
    location: "North Community Center",
    status: "deacon",
    memberCount: 18,
    meetingDay: "Saturday 2:00 PM",
    totalPayments: 9000,
    pendingPayments: 2700,
  },
  {
    id: "3",
    name: "Elder David Wilson",
    email: "david.wilson@church.org",
    phone: "+1 (555) 345-6789",
    location: "West Side Hall",
    status: "elder",
    memberCount: 22,
    meetingDay: "Saturday 4:00 PM",
    totalPayments: 11000,
    pendingPayments: 3300,
  },
  {
    id: "4",
    name: "Deaconess Sarah Brown",
    email: "sarah.brown@church.org",
    phone: "+1 (555) 456-7890",
    location: "East Parish",
    status: "deaconess leader",
    memberCount: 15,
    meetingDay: "Saturday 11:00 AM",
    totalPayments: 7500,
    pendingPayments: 2250,
  },
  {
    id: "5",
    name: "Steward Michael Davis",
    email: "michael.davis@church.org",
    phone: "+1 (555) 567-8901",
    location: "South Chapel",
    status: "steward",
    memberCount: 12,
    meetingDay: "Saturday 3:00 PM",
    totalPayments: 6000,
    pendingPayments: 1800,
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "minister":
      return "bg-accent text-accent-foreground";
    case "elder":
      return "bg-primary text-primary-foreground";
    case "deacon":
      return "bg-secondary text-secondary-foreground";
    case "deaconess leader":
      return "bg-chart-2 text-white";
    case "steward":
      return "bg-muted text-muted-foreground";
    default:
      return "bg-muted text-muted-foreground";
  }
};

interface CellLeaderTableProps {
  onViewCell?: (id: string) => void;
}

export function CellLeaderTable({ onViewCell }: CellLeaderTableProps) {
  const [cellLeaders] = useState<CellLeader[]>(mockCellLeaders);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleDeleteSelected = () => {
    console.log("Delete selected IDs:", selectedIds);
  };

  return (
    <Card className="border-none">
      <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5" />
          Cell Leaders
        </CardTitle>
        {selectedIds.length > 0 && (
          <Button
            onClick={handleDeleteSelected}
            variant="destructive"
            size="sm"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete Selected ({selectedIds.length})
          </Button>
        )}
      </CardHeader>
      <CardContent className="px-2">
        <div className="overflow-x-auto">
          <Table className="w-full min-w-[800px]">
            <TableHeader className="font-bold">
              <TableRow className="font-bold text-base lg:text-[17px]">
                <TableHead className="w-[50px]">
                  <button
                    onClick={() => {
                      if (selectedIds.length === cellLeaders.length) {
                        setSelectedIds([]);
                      } else {
                        setSelectedIds(cellLeaders.map((l) => l.id));
                      }
                    }}
                    className={`h-5 w-5 cursor-pointer flex items-center justify-center rounded border transition ${
                      selectedIds.length === cellLeaders.length
                        ? "bg-[#0fa2f7] border-[#0fa2f7] text-white"
                        : "border-[#0fa2f7] text-transparent"
                    }`}
                  >
                    <Check className="h-4 w-4" />
                  </button>
                </TableHead>
                <TableHead className="min-w-[250px]">
                  Leader Information
                </TableHead>
                <TableHead className="min-w-[120px]">Office</TableHead>
                <TableHead className="min-w-[80px]">Members</TableHead>
                <TableHead className="min-w-[150px]">Payment Status</TableHead>
                <TableHead className="w-[50px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cellLeaders.map((leader) => {
                const isSelected = selectedIds.includes(leader.id);
                return (
                  <TableRow key={leader.id}>
                    <TableCell>
                      <button
                        onClick={() => toggleSelect(leader.id)}
                        className={`h-5 w-5 flex items-center justify-center rounded border ${
                          isSelected
                            ? "bg-[#0fa2f7] border-[#0fa2f7] text-white"
                            : "border-[#0fa2f7] text-transparent"
                        }`}
                      >
                        <Check className="h-4 w-4" />
                      </button>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="font-medium text-sm lg:text-base">
                          {leader.name}
                        </div>
                        <div className="flex flex-col gap-1 text-xs lg:text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Mail className="h-3 w-3 flex-shrink-0" />
                            <span className="truncate">{leader.email}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Phone className="h-3 w-3 flex-shrink-0" />
                            <span>{leader.phone}</span>
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className="bg-[#30961c]/10 text-[#30961c] border border-[#30961c]/30 text-xs">
                        {leader.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium text-sm lg:text-base">
                        {leader.memberCount}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="text-xs lg:text-sm">
                          <span className="text-green-600 font-medium">
                            ₵{leader.totalPayments.toLocaleString()}
                          </span>
                          <span className="text-muted-foreground">
                            {" "}
                            collected
                          </span>
                        </div>
                        <div className="text-xs lg:text-sm">
                          <span className="text-orange-600 font-medium">
                            ₵{leader.pendingPayments.toLocaleString()}
                          </span>
                          <span className="text-muted-foreground">
                            {" "}
                            pending
                          </span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            className="h-8 cursor-pointer w-8 p-0"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => onViewCell?.(leader.id)}
                          >
                            <FolderOpen className="mr-2 h-4 w-4" />
                            View Cell
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => console.log("Delete:", leader.id)}
                            className="text-destructive"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
