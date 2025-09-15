"use client";

import { use } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Users, DollarSign, Calendar, ArrowLeft, Wallet } from "lucide-react";
import Header from "@/components/pastor/Header";
import Link from "next/link";

function DateCell({ dateString }: { dateString: string }) {
  const formatted = new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(dateString));

  return <span>{formatted}</span>;
}

// Mock data - in a real app, this would come from your database
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

// Mock data for cell members
const members = [
  {
    id: 1,
    name: "John Smith",
    email: "john.smith@email.com",
    phone: "+1 (555) 111-2222",
    age: 28,
    gender: "Male",
    joinDate: "2023-02-15",
    paymentStatus: "Paid",
    lastPayment: "2024-01-15",
    attendanceRate: 85,
    campMeetings: 12,
    avatar: "/man-young.png",
  },
  {
    id: 2,
    name: "Mary Johnson",
    email: "mary.johnson@email.com",
    phone: "+1 (555) 222-3333",
    age: 34,
    gender: "Female",
    joinDate: "2023-01-20",
    paymentStatus: "Pending",
    lastPayment: "2023-12-15",
    attendanceRate: 92,
    campMeetings: 15,
    avatar: "/woman-middle-aged.png",
  },
  {
    id: 3,
    name: "Robert Davis",
    email: "robert.davis@email.com",
    phone: "+1 (555) 333-4444",
    age: 45,
    gender: "Male",
    joinDate: "2022-11-10",
    paymentStatus: "Paid",
    lastPayment: "2024-01-10",
    attendanceRate: 78,
    campMeetings: 18,
    avatar: "/man-older.png",
  },
];

export default function CellMembersPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const leaderId = Number.parseInt(id);

  // Find the leader data
  const leader = cellLeaders.find((l) => l.id === leaderId);

  if (!leader) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold text-foreground">
              Leader Not Found
            </h1>
            <p className="text-muted-foreground mt-2">
              The cell leader you're looking for doesn't exist.
            </p>
            <Link href="/cell-leaders">
              <Button className="mt-4">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Cell Leaders
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const totalMembers = members.length;
  const paidMembers = members.filter((m) => m.paymentStatus === "Paid").length;
  const averageAttendance = Math.round(
    members.reduce((sum, m) => sum + m.attendanceRate, 0) / members.length
  );

  return (
    <div className="min-h-screen">
      <Header />
      <div className=" mx-auto space-y-6">
        {/* Header with Back Button */}
        <div className="flex items-center justify-between">
          <div className="w-full space-y-2 bg-white p-5 rounded-md border">
            <div>
              <h1 className="text-xl font-bold text-foreground text-balance">
                {leader.cellName} Members
              </h1>
              <p className="text-xs mt-2">
                Led by {leader.name} • {leader.location}
              </p>
            </div>
          </div>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="payment">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Payment Due</CardTitle>

              <button className="bg-[#0fa2f7]/10 p-2 rounded-md">
                <Users className="h-4 w-4 text-[#0fa2f7]" />
              </button>
            </CardHeader>
            <CardContent>
              <div>
                <h1 className="font-semibold text-xl">GHS 4700.00</h1>
              </div>
              <div className="w-full mt-1 flex items-center gap-1">
                <span className="bg-[#ff8042] rounded-full h-[7px] w-[7px]" />
                <p className="text-xs">Total payment due</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Members
              </CardTitle>
              <button className="bg-[#0fa2f7]/10 p-2 rounded-md">
                <Users className="h-4 w-4 text-[#0fa2f7]" />
              </button>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-semibold text-primary">
                {totalMembers}
              </div>
              <div className="w-full mt-1 flex items-center gap-1">
                <span className="bg-[#ff8042] rounded-full h-[7px] w-[7px]" />
                <p className="text-xs">Total registered cell members</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Avg Attendance
              </CardTitle>
              <button className="bg-[#0fa2f7]/10 p-2 rounded-md">
                <Calendar className="h-4 w-4 text-[#0fa2f7]" />
              </button>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-semibold">{averageAttendance}%</div>
              <div className="w-full mt-1 flex items-center gap-1">
                <span className="bg-[#ff8042] rounded-full h-[7px] w-[7px]" />
                <p className="text-xs">Members paid</p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-[#0fa2f7] text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Payment
              </CardTitle>

              <button className="bg-white/20 p-2 rounded-md">
                <Wallet className="h-4 w-4 text-white" />
              </button>
            </CardHeader>
            <CardContent>
              <div>
                <h1 className="font-semibold text-xl">GHS 1700.00</h1>
              </div>
              <div className="w-full mt-1 flex items-center gap-1">
                <span className="bg-[#ff8042] rounded-full h-[7px] w-[7px]" />
                <p className="text-xs">Total amount paid</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Members Table */}
        <Card>
          <CardHeader>
            <CardTitle>Cell Members</CardTitle>
            <CardDescription>
              Overview of all members in this cell
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className=" overflow-x-auto">
              <Table className="min-w-[800px]">
                <TableHeader>
                  <TableRow>
                    <TableHead>Member</TableHead>
                    <TableHead>Age/Gender</TableHead>
                    <TableHead>Payment Status</TableHead>
                    <TableHead>Attendance</TableHead>
                    <TableHead>Camp Meetings</TableHead>
                    <TableHead>Join Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {members.map((member) => (
                    <TableRow key={member.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <Avatar>
                            <AvatarImage
                              src={member.avatar || "/placeholder.svg"}
                              alt={member.name}
                            />
                            <AvatarFallback>
                              {member.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium text-foreground">
                              {member.name}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {member.email}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div>{member.age} years</div>
                          <div className="text-muted-foreground">
                            {member.gender}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            member.paymentStatus === "Paid"
                              ? "default"
                              : "destructive"
                          }
                          className={
                            member.paymentStatus === "Paid"
                              ? "bg-[#30961c]/10  text-[#30961c]"
                              : "bg-red-600/10 text-red-600"
                          }
                        >
                          {member.paymentStatus}
                        </Badge>
                        <div className="text-xs text-muted-foreground mt-1">
                          Last: <DateCell dateString={member.lastPayment} />
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm">
                            {member.attendanceRate}%
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>{member.campMeetings}</TableCell>
                      <TableCell className="text-muted-foreground">
                        <DateCell dateString={member.joinDate} />
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
