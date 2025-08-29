"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Check,
  X,
  Search,
  Users,
  AlertCircle,
  ArrowLeft,
  Plus,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import PaymentDialog from "../../../../components/PaymentDialog";
import { useRouter } from "next/navigation";
import Header from "@/components/pastor/Header";
import AppSidebar from "@/components/pastor/app-sidebar";

const Member = [
  {
    id: "1",
    name: "Solomon Johnson",
    email: "solomon@church.com",
    phone: "+1 (555) 123-4567",
    status: "Paid Full",
    amountPaid: 150,
    balance: 0,
    paymentDate: "Jan 15, 2024",
    method: "Cash",
  },
  {
    id: "2",
    name: "Mary Williams",
    email: "mary@church.com",
    phone: "+1 (555) 234-5678",
    status: "Partial",
    amountPaid: 100,
    balance: 50,
    paymentDate: "Jan 18, 2024",
    method: "Bank Transfer",
  },
  {
    id: "3",
    name: "David Chen",
    email: "david@church.com",
    phone: "+1 (555) 345-6789",
    status: "Unpaid",
    amountPaid: 0,
    balance: 150,
    paymentDate: "N/A",
    method: "N/A",
  },
  {
    id: "4",
    name: "Sarah Martinez",
    email: "sarah@church.com",
    phone: "+1 (555) 456-7890",
    status: "Unpaid",
    amountPaid: 0,
    balance: 150,
    paymentDate: "N/A",
    method: "N/A",
  },
  {
    id: "5",
    name: "Michael Brown",
    email: "michael@church.com",
    phone: "+1 (555) 567-8901",
    status: "Partial",
    amountPaid: 75,
    balance: 75,
    paymentDate: "Jan 20, 2024",
    method: "Credit Card",
  },
];
const Page = () => {
  const campFee = 150;

  const [members, setMembers] = useState(Member);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false);

  const filteredMembers = members.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase());

    if (filterStatus === "paid")
      return matchesSearch && member.amountPaid >= campFee;
    if (filterStatus === "partial")
      return (
        matchesSearch && member.amountPaid > 0 && member.amountPaid < campFee
      );
    if (filterStatus === "unpaid")
      return matchesSearch && member.amountPaid === 0;

    return matchesSearch;
  });

  const getPaymentStatus = (amountPaid: number) => {
    if (amountPaid >= campFee) return "paid";
    if (amountPaid > 0) return "partial";
    return "unpaid";
  };

  const getStatusBadge = (amountPaid: number) => {
    const status = getPaymentStatus(amountPaid);

    switch (status) {
      case "paid":
        return (
          <Badge className="bg-[#30961c]/15 text-[#30961c]">Paid Full</Badge>
        );
      case "partial":
        return (
          <Badge className="bg-[#f0cc56]/15 text-[#f0cc56]">Partial</Badge>
        );
      case "unpaid":
        return <Badge className="bg-[#fc7f03]/15 text-[#fc7f03]">Unpaid</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const getPaymentIcon = (amountPaid: number) => {
    if (amountPaid >= campFee) {
      return <Check className="h-4 w-4 text-green-600" />;
    } else if (amountPaid > 0) {
      return <AlertCircle className="h-4 w-4 text-yellow-600" />;
    }
    return <X className="h-4 w-4 text-red-600" />;
  };

  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const totalMembers = members.length;
  const totalCollected = members.reduce((sum, m) => sum + m.amountPaid, 0);
  const expectedTotal = totalMembers * campFee;

  const handlePaymentSubmit = (paymentData: {
    memberId: string;
    amount: number;
    method: string;
    date: string;
  }) => {
    setMembers((prevMembers) =>
      prevMembers.map((member) => {
        if (member.id === paymentData.memberId) {
          const newAmountPaid = member.amountPaid + paymentData.amount;
          const newBalance = Math.max(0, 150 - newAmountPaid);
          const newStatus =
            newBalance === 0
              ? "Paid Full"
              : newAmountPaid > 0
              ? "Partial"
              : "Unpaid";

          return {
            ...member,
            amountPaid: newAmountPaid,
            balance: newBalance,
            status: newStatus,
            paymentDate: paymentData.date,
            method: paymentData.method,
          };
        }
        return member;
      })
    );
    setIsPaymentDialogOpen(false);
  };
  const router = useRouter();

  return (
    <div className="w-full mx-auto pb-16">
      {/* Header */}
      <div className="flex w-full">
        <div className="w-full">
          <div className="w-full space-y-6 mx-auto">
            <Header />
            <div className="bg-white w-full py-4 border mt-4 rounded-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <button className="bg-[#0fa2f7]/15 p-2 rounded-md">
                    <Users className="h-4 w-4 text-[#0fa2f7]" />
                  </button>
                  Camp Registration
                </CardTitle>
                <CardDescription className="font-medium text-sm">
                  Track registration and payment status for all cell members.
                  Camp meeting fee: ${campFee}
                </CardDescription>
              </CardHeader>
            </div>

            {/* Financial Summary */}
            <div className="bg-white rounded-md border">
              <CardContent className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center gap-2">
                    <div>
                      <p className="text-sm font-light">
                        Total Amount Collected
                      </p>
                      <p className="text-xl gap-2.5 flex font-bold">
                        {" "}
                        <span className="font-medium text-[18px]">&#8373;</span>
                        {totalCollected}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div>
                      <p className="text-sm font-light">Expected Total</p>
                      <p className="text-xl gap-2.5 flex font-bold">
                        {" "}
                        <span className="font-medium text-xl">
                          &#8373;
                        </span>{" "}
                        {expectedTotal}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div>
                      <p className="text-sm font-light">Outstanding Amount</p>
                      <div className="text-xl gap-2.5 flex">
                        <span className="font-medium text-xl">&#8373;</span>{" "}
                        {expectedTotal - totalCollected}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </div>

            {/* Filters and Search */}
            <div className="bg-white rounded-md px-3">
              <div className="bg-white rounded-md">
                <CardContent className="py-4 px-0">
                  <div className="flex flex-col items-center md:flex-row gap-4">
                    <div className="flex-1">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="Search members by name or email..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-10"
                        />
                      </div>
                    </div>
                    <Select
                      value={filterStatus}
                      onValueChange={setFilterStatus}
                    >
                      <SelectTrigger className="w-full rounded-xl  border cursor-pointer md:w-[200px]">
                        <SelectValue placeholder="Filter by status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Members</SelectItem>
                        <SelectItem value="paid">Paid Full</SelectItem>
                        <SelectItem value="partial">Partial Payment</SelectItem>
                        <SelectItem value="unpaid">Not Paid</SelectItem>
                      </SelectContent>
                    </Select>

                    <button
                      onClick={() => setIsPaymentDialogOpen(true)}
                      className="bg-[#0fa2f7] text-sm gap-2.5 cursor-pointer flex items-center text-white px-5 py-2 rounded-md"
                    >
                      <Plus size={18} /> Add Payment
                    </button>
                  </div>
                </CardContent>
              </div>

              {/* Members Table */}
              <div className="bg-white rounded-md">
                <CardContent className="p-0">
                  <div className="rounded-md border overflow-x-auto">
                    <Table className="min-w-[700px]">
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[300px]">Member</TableHead>
                          <TableHead className="text-center">Status</TableHead>
                          <TableHead className="text-center">
                            Amount Paid
                          </TableHead>
                          <TableHead className="text-center">Balance</TableHead>
                          <TableHead className="text-center">
                            Payment Date
                          </TableHead>
                          <TableHead className="text-center">Method</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredMembers.map((member) => (
                          <TableRow key={member.id}>
                            <TableCell>
                              <div className="flex items-center gap-3">
                                <div className="relative">
                                  <Avatar className="h-10 w-10">
                                    <AvatarFallback>
                                      {member.name
                                        .split(" ")
                                        .map((n) => n[0])
                                        .join("")}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div className="absolute -bottom-1 -right-1">
                                    {getPaymentIcon(member.amountPaid)}
                                  </div>
                                </div>
                                <div>
                                  <div className="font-medium">
                                    {member.name}
                                  </div>
                                  <div className="text-sm text-muted-foreground">
                                    {member.email}
                                  </div>
                                  <div className="text-xs text-muted-foreground">
                                    {member.phone}
                                  </div>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell className="text-center">
                              {getStatusBadge(member.amountPaid)}
                            </TableCell>
                            <TableCell className="text-center">
                              <span className={`font-medium `}>
                                <span className="font-bold text-[14px]">
                                  &#8373;
                                </span>{" "}
                                {member.amountPaid}
                              </span>
                            </TableCell>
                            <TableCell className="text-center">
                              <span className={`font-medium `}>
                                <span className="font-bold text-[14px]">
                                  &#8373;
                                </span>{" "}
                                {Math.max(0, campFee - member.amountPaid)}
                              </span>
                            </TableCell>
                            <TableCell className="text-center text-sm">
                              {formatDate(member.paymentDate)}
                            </TableCell>
                            <TableCell className="text-center text-sm">
                              {member.method || "N/A"}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </div>
            </div>

            {filteredMembers.length === 0 && (
              <Card>
                <CardContent className="p-8 text-center">
                  <p className="text-muted-foreground">
                    No members found matching your search criteria.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
          <PaymentDialog
            isOpen={isPaymentDialogOpen}
            onClose={() => setIsPaymentDialogOpen(false)}
            members={members}
            onSubmit={handlePaymentSubmit}
          />
        </div>
      </div>
    </div>
  );
};

export default Page;
