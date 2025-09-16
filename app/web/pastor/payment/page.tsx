"use client";

import { useState } from "react";
import {
  Search,
  Filter,
  Plus,
  DollarSign,
  Users,
  AlertCircle,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Header from "@/components/pastor/Header";

const mockUsers = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@email.com",
    phone: "+1234567890",
    image: "/professional-man-headshot.png",
    campFee: 500,
    amountPaid: 500,
    paymentStatus: "paid",
    paymentHistory: [
      {
        date: "2024-01-15",
        amount: 500,
        method: "Bank Transfer",
        reference: "TXN001",
      },
    ],
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@email.com",
    phone: "+1234567891",
    image: "/professional-woman-headshot.png",
    campFee: 500,
    amountPaid: 250,
    paymentStatus: "partial",
    paymentHistory: [
      { date: "2024-01-10", amount: 250, method: "Cash", reference: "TXN002" },
    ],
  },
  {
    id: 3,
    name: "Mike Johnson",
    email: "mike.johnson@email.com",
    phone: "+1234567892",
    image: "/young-man-headshot.png",
    campFee: 500,
    amountPaid: 0,
    paymentStatus: "unpaid",
    paymentHistory: [],
  },
  {
    id: 4,
    name: "Sarah Wilson",
    email: "sarah.wilson@email.com",
    phone: "+1234567893",
    image: "/woman-glasses-headshot.png",
    campFee: 500,
    amountPaid: 500,
    paymentStatus: "paid",
    paymentHistory: [
      { date: "2024-01-20", amount: 300, method: "Card", reference: "TXN003" },
      { date: "2024-01-25", amount: 200, method: "Cash", reference: "TXN004" },
    ],
  },
  {
    id: 5,
    name: "David Brown",
    email: "david.brown@email.com",
    phone: "+1234567894",
    image: "/middle-aged-man-headshot.png",
    campFee: 500,
    amountPaid: 150,
    paymentStatus: "partial",
    paymentHistory: [
      {
        date: "2024-01-12",
        amount: 150,
        method: "Mobile Money",
        reference: "TXN005",
      },
    ],
  },
  {
    id: 6,
    name: "Emily Davis",
    email: "emily.davis@email.com",
    phone: "+1234567895",
    image: "/young-woman-headshot.png",
    campFee: 500,
    amountPaid: 300,
    paymentStatus: "partial",
    paymentHistory: [
      {
        date: "2024-01-18",
        amount: 300,
        method: "Bank Transfer",
        reference: "TXN006",
      },
    ],
  },
  {
    id: 7,
    name: "Robert Miller",
    email: "robert.miller@email.com",
    phone: "+1234567896",
    image: "/older-man-headshot.png",
    campFee: 500,
    amountPaid: 500,
    paymentStatus: "paid",
    paymentHistory: [
      { date: "2024-01-22", amount: 500, method: "Cash", reference: "TXN007" },
    ],
  },
  {
    id: 8,
    name: "Lisa Anderson",
    email: "lisa.anderson@email.com",
    phone: "+1234567897",
    image: "/curly-hair-woman-headshot.png",
    campFee: 500,
    amountPaid: 0,
    paymentStatus: "unpaid",
    paymentHistory: [],
  },
  {
    id: 9,
    name: "James Taylor",
    email: "james.taylor@email.com",
    phone: "+1234567898",
    image: "/man-with-beard-headshot.jpg",
    campFee: 500,
    amountPaid: 400,
    paymentStatus: "partial",
    paymentHistory: [
      { date: "2024-01-16", amount: 400, method: "Card", reference: "TXN008" },
    ],
  },
  {
    id: 10,
    name: "Maria Garcia",
    email: "maria.garcia@email.com",
    phone: "+1234567899",
    image: "/hispanic-woman-headshot.jpg",
    campFee: 500,
    amountPaid: 500,
    paymentStatus: "paid",
    paymentHistory: [
      {
        date: "2024-01-14",
        amount: 500,
        method: "Mobile Money",
        reference: "TXN009",
      },
    ],
  },
  {
    id: 11,
    name: "Kevin White",
    email: "kevin.white@email.com",
    phone: "+1234567800",
    image: "/athletic-man-headshot.png",
    campFee: 500,
    amountPaid: 200,
    paymentStatus: "partial",
    paymentHistory: [
      { date: "2024-01-19", amount: 200, method: "Cash", reference: "TXN010" },
    ],
  },
  {
    id: 12,
    name: "Amanda Clark",
    email: "amanda.clark@email.com",
    phone: "+1234567801",
    image: "/blonde-woman-headshot.png",
    campFee: 500,
    amountPaid: 0,
    paymentStatus: "unpaid",
    paymentHistory: [],
  },
];

type PaymentStatus = "all" | "paid" | "partial" | "unpaid";

export default function ChurchDashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<PaymentStatus>("all");
  const [selectedUser, setSelectedUser] = useState<
    (typeof mockUsers)[0] | null
  >(null);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState("");
  const [paymentNotes, setPaymentNotes] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  // Filter users based on search and status
  const filteredUsers = mockUsers.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());

    if (filterStatus === "all") return matchesSearch;

    const userStatus =
      user.amountPaid === 0
        ? "unpaid"
        : user.amountPaid < user.campFee
          ? "partial"
          : "paid";

    return matchesSearch && userStatus === filterStatus;
  });

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const startIndex = (currentPage - 1) * usersPerPage;
  const endIndex = startIndex + usersPerPage;
  const currentUsers = filteredUsers.slice(startIndex, endIndex);

  // Reset to first page when search or filter changes
  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handleFilterChange = (status: PaymentStatus) => {
    setFilterStatus(status);
    setCurrentPage(1);
  };

  // Calculate statistics
  const totalUsers = mockUsers.length;
  const paidUsers = mockUsers.filter((u) => u.amountPaid >= u.campFee).length;
  const partialUsers = mockUsers.filter(
    (u) => u.amountPaid > 0 && u.amountPaid < u.campFee
  ).length;
  const unpaidUsers = mockUsers.filter((u) => u.amountPaid === 0).length;
  const totalRevenue = mockUsers.reduce((sum, u) => sum + u.amountPaid, 0);

  const getStatusBadge = (user: (typeof mockUsers)[0]) => {
    if (user.amountPaid === 0) {
      return (
        <Badge
          variant="destructive"
          className="bg-red-100 text-red-800 hover:bg-red-200"
        >
          Not Paid
        </Badge>
      );
    } else if (user.amountPaid < user.campFee) {
      return (
        <Badge
          variant="secondary"
          className="bg-amber-100 text-amber-800 hover:bg-amber-200"
        >
          Partial
        </Badge>
      );
    } else {
      return (
        <Badge
          variant="default"
          className="bg-green-100 text-green-800 hover:bg-green-200"
        >
          Paid
        </Badge>
      );
    }
  };

  const handleAddPayment = () => {
    if (selectedUser && paymentAmount) {
      // In a real app, this would make an API call
      console.log("Adding payment:", {
        userId: selectedUser.id,
        amount: Number.parseFloat(paymentAmount),
        notes: paymentNotes,
      });

      // Reset form
      setPaymentAmount("");
      setPaymentNotes("");
      setIsPaymentModalOpen(false);
    }
  };

  return (
    <div className="min-h-screen w-full">
      <div className="w-full mx-auto space-y-6">
        <Header />
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-primary">Kabod Assembly</h1>
          <p className="text-lg text-muted-foreground">
            Camp Payment Management System
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-card border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-card-foreground">
                Total Members
              </CardTitle>
              <Users className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-card-foreground">
                {totalUsers}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-card-foreground">
                Fully Paid
              </CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-card-foreground">
                {paidUsers}
              </div>
              <p className="text-xs text-muted-foreground">
                {((paidUsers / totalUsers) * 100).toFixed(1)}% of total
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-card-foreground">
                Pending Payment
              </CardTitle>
              <AlertCircle className="h-4 w-4 text-amber-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-card-foreground">
                {partialUsers + unpaidUsers}
              </div>
              <p className="text-xs text-muted-foreground">
                {partialUsers} partial, {unpaidUsers} unpaid
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-card-foreground">
                Total Revenue
              </CardTitle>
              <DollarSign className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-card-foreground">
                ${totalRevenue}
              </div>
              <p className="text-xs text-muted-foreground">
                ${totalUsers * 500 - totalRevenue} remaining
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-card-foreground">
              Member Payment Status
            </CardTitle>
            <CardDescription>
              Manage camp payments for all registered members
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search by name or email..."
                  value={searchTerm}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  className="pl-10 bg-input border-border"
                />
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="border-border bg-transparent"
                  >
                    <Filter className="mr-2 h-4 w-4" />
                    Filter:{" "}
                    {filterStatus === "all"
                      ? "All Status"
                      : filterStatus === "paid"
                        ? "Fully Paid"
                        : filterStatus === "partial"
                          ? "Partial Payment"
                          : "Not Paid"}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="bg-popover border-border"
                >
                  <DropdownMenuItem onClick={() => handleFilterChange("all")}>
                    All Status
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleFilterChange("paid")}>
                    Fully Paid
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleFilterChange("partial")}
                  >
                    Partial Payment
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleFilterChange("unpaid")}
                  >
                    Not Paid
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Users Table */}
            <div className="rounded-md border border-border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead className="text-foreground">Member</TableHead>
                    <TableHead className="text-foreground">Contact</TableHead>
                    <TableHead className="text-foreground">Camp Fee</TableHead>
                    <TableHead className="text-foreground">
                      Amount Paid
                    </TableHead>
                    <TableHead className="text-foreground">Balance</TableHead>
                    <TableHead className="text-foreground">Status</TableHead>
                    <TableHead className="text-foreground">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentUsers.map((user) => (
                    <TableRow key={user.id} className="hover:bg-muted/30">
                      <TableCell className="font-medium text-foreground">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage
                              src={user.image || "/placeholder.svg"}
                              alt={user.name}
                            />
                            <AvatarFallback className="bg-primary text-primary-foreground font-medium">
                              {user.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{user.name}</div>
                            <div className="text-sm text-muted-foreground">
                              ID: {user.id}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-foreground">
                        <div className="text-sm">
                          <div>{user.email}</div>
                          <div className="text-muted-foreground">
                            {user.phone}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-foreground">
                        ${user.campFee}
                      </TableCell>
                      <TableCell className="text-foreground">
                        ${user.amountPaid}
                      </TableCell>
                      <TableCell className="text-foreground">
                        ${user.campFee - user.amountPaid}
                      </TableCell>
                      <TableCell>{getStatusBadge(user)}</TableCell>
                      <TableCell>
                        <Dialog>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0"
                              >
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                              align="end"
                              className="bg-popover border-border"
                            >
                              <DialogTrigger asChild>
                                <DropdownMenuItem
                                  onSelect={(e) => {
                                    e.preventDefault();
                                    setSelectedUser(user);
                                  }}
                                  className="cursor-pointer"
                                >
                                  Manage
                                </DropdownMenuItem>
                              </DialogTrigger>
                            </DropdownMenuContent>
                          </DropdownMenu>
                          <DialogContent className="max-w-2xl bg-popover border-border">
                            <DialogHeader>
                              <DialogTitle className="text-popover-foreground flex items-center gap-3">
                                <Avatar className="h-12 w-12">
                                  <AvatarImage
                                    src={user.image || "/placeholder.svg"}
                                    alt={user.name}
                                  />
                                  <AvatarFallback className="bg-primary text-primary-foreground font-medium">
                                    {user.name
                                      .split(" ")
                                      .map((n) => n[0])
                                      .join("")}
                                  </AvatarFallback>
                                </Avatar>
                                Payment Management - {user.name}
                              </DialogTitle>
                              <DialogDescription>
                                View payment history and add new payments for
                                this member
                              </DialogDescription>
                            </DialogHeader>

                            {/* Payment Summary */}
                            <div className="grid grid-cols-3 gap-4">
                              <Card className="bg-card border-border">
                                <CardContent className="pt-4">
                                  <div className="text-sm text-card-foreground">
                                    Camp Fee
                                  </div>
                                  <div className="text-2xl font-bold text-card-foreground">
                                    ${user.campFee}
                                  </div>
                                </CardContent>
                              </Card>
                              <Card className="bg-card border-border">
                                <CardContent className="pt-4">
                                  <div className="text-sm text-card-foreground">
                                    Amount Paid
                                  </div>
                                  <div className="text-2xl font-bold text-green-600">
                                    ${user.amountPaid}
                                  </div>
                                </CardContent>
                              </Card>
                              <Card className="bg-card border-border">
                                <CardContent className="pt-4">
                                  <div className="text-sm text-card-foreground">
                                    Balance Due
                                  </div>
                                  <div className="text-2xl font-bold text-red-600">
                                    ${user.campFee - user.amountPaid}
                                  </div>
                                </CardContent>
                              </Card>
                            </div>

                            {/* Payment History */}
                            <div>
                              <h3 className="text-lg font-semibold text-popover-foreground mb-3">
                                Payment History
                              </h3>
                              {user.paymentHistory.length > 0 ? (
                                <div className="space-y-2">
                                  {user.paymentHistory.map((payment, index) => (
                                    <div
                                      key={index}
                                      className="flex justify-between items-center p-3 bg-muted rounded-lg"
                                    >
                                      <div>
                                        <div className="font-medium text-foreground">
                                          ${payment.amount}
                                        </div>
                                        <div className="text-sm text-muted-foreground">
                                          {payment.method} • {payment.reference}
                                        </div>
                                      </div>
                                      <div className="text-sm text-muted-foreground">
                                        {payment.date}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              ) : (
                                <p className="text-muted-foreground">
                                  No payments recorded yet.
                                </p>
                              )}
                            </div>

                            {/* Add Payment Button */}
                            <div>
                              <Dialog
                                open={isPaymentModalOpen}
                                onOpenChange={setIsPaymentModalOpen}
                              >
                                <DialogTrigger asChild>
                                  <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                                    <Plus className="mr-2 h-4 w-4" />
                                    Add Payment
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="bg-popover border-border">
                                  <DialogHeader>
                                    <DialogTitle className="text-popover-foreground">
                                      Add Manual Payment
                                    </DialogTitle>
                                    <DialogDescription>
                                      Record a new payment for{" "}
                                      {selectedUser?.name}
                                    </DialogDescription>
                                  </DialogHeader>

                                  <div className="space-y-4">
                                    <div>
                                      <Label
                                        htmlFor="amount"
                                        className="text-popover-foreground"
                                      >
                                        Payment Amount
                                      </Label>
                                      <Input
                                        id="amount"
                                        type="number"
                                        placeholder="0.00"
                                        value={paymentAmount}
                                        onChange={(e) =>
                                          setPaymentAmount(e.target.value)
                                        }
                                        className="bg-input border-border"
                                      />
                                    </div>

                                    <div>
                                      <Label
                                        htmlFor="notes"
                                        className="text-popover-foreground"
                                      >
                                        Notes (Optional)
                                      </Label>
                                      <Textarea
                                        id="notes"
                                        placeholder="Additional notes about this payment"
                                        value={paymentNotes}
                                        onChange={(e) =>
                                          setPaymentNotes(e.target.value)
                                        }
                                        className="bg-input border-border"
                                      />
                                    </div>

                                    <div className="flex gap-2">
                                      <Button
                                        onClick={handleAddPayment}
                                        className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
                                        disabled={!paymentAmount}
                                      >
                                        Record Payment
                                      </Button>
                                      <Button
                                        variant="outline"
                                        onClick={() =>
                                          setIsPaymentModalOpen(false)
                                        }
                                        className="border-border"
                                      >
                                        Cancel
                                      </Button>
                                    </div>
                                  </div>
                                </DialogContent>
                              </Dialog>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {totalPages > 1 && (
              <div className="flex items-center justify-between mt-4">
                <div className="text-sm text-muted-foreground">
                  Showing {startIndex + 1} to{" "}
                  {Math.min(endIndex, filteredUsers.length)} of{" "}
                  {filteredUsers.length} members
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={currentPage === 1}
                    className="border-border"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Previous
                  </Button>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (page) => (
                        <Button
                          key={page}
                          variant={currentPage === page ? "default" : "outline"}
                          size="sm"
                          onClick={() => setCurrentPage(page)}
                          className={
                            currentPage === page
                              ? "bg-primary text-primary-foreground"
                              : "border-border"
                          }
                        >
                          {page}
                        </Button>
                      )
                    )}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                    className="border-border"
                  >
                    Next
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}

            {filteredUsers.length === 0 && (
              <div className="text-center py-8">
                <p className="text-muted-foreground">
                  No members found matching your search criteria.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
