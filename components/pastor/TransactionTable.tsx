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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  Phone,
  Smartphone,
  MoreHorizontal,
  FolderOpen,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { InvoiceModal } from "../pastor/InvoiceModal";

const transactions = [
  {
    id: "TXN-001",
    date: "2024-01-15",
    amount: 250.0,
    userName: "Kwame Asante",
    phoneNumber: "+233 24 123 4567",
    paymentMethod: "MTN",
    status: "completed",
  },
  {
    id: "TXN-002",
    date: "2024-01-15",
    amount: 150.5,
    userName: "Ama Osei",
    phoneNumber: "+233 20 987 6543",
    paymentMethod: "Vodafone",
    status: "completed",
  },
  {
    id: "TXN-003",
    date: "2024-01-14",
    amount: 500.0,
    userName: "Kofi Mensah",
    phoneNumber: "+233 55 456 7890",
    paymentMethod: "Hubtel",
    status: "pending",
  },
  {
    id: "TXN-004",
    date: "2024-01-14",
    amount: 75.25,
    userName: "Akosua Boateng",
    phoneNumber: "+233 24 321 0987",
    paymentMethod: "MTN",
    status: "completed",
  },
  {
    id: "TXN-005",
    date: "2024-01-13",
    amount: 320.0,
    userName: "Yaw Adjei",
    phoneNumber: "+233 20 654 3210",
    paymentMethod: "Vodafone",
    status: "failed",
  },
  {
    id: "TXN-006",
    date: "2024-01-13",
    amount: 180.75,
    userName: "Efua Darko",
    phoneNumber: "+233 55 789 0123",
    paymentMethod: "Hubtel",
    status: "completed",
  },
  {
    id: "TXN-007",
    date: "2024-01-12",
    amount: 95.5,
    userName: "Nana Akoto",
    phoneNumber: "+233 24 555 1234",
    paymentMethod: "MTN",
    status: "completed",
  },
  {
    id: "TXN-008",
    date: "2024-01-12",
    amount: 420.0,
    userName: "Abena Frimpong",
    phoneNumber: "+233 20 444 5678",
    paymentMethod: "Vodafone",
    status: "pending",
  },
  {
    id: "TXN-009",
    date: "2024-01-11",
    amount: 67.8,
    userName: "Kwaku Owusu",
    phoneNumber: "+233 55 333 9876",
    paymentMethod: "Hubtel",
    status: "completed",
  },
  {
    id: "TXN-010",
    date: "2024-01-11",
    amount: 890.25,
    userName: "Adwoa Sarpong",
    phoneNumber: "+233 24 222 4567",
    paymentMethod: "MTN",
    status: "failed",
  },
  {
    id: "TXN-011",
    date: "2024-01-10",
    amount: 125.0,
    userName: "Kojo Antwi",
    phoneNumber: "+233 20 111 7890",
    paymentMethod: "Vodafone",
    status: "completed",
  },
  {
    id: "TXN-012",
    date: "2024-01-10",
    amount: 340.6,
    userName: "Akua Gyamfi",
    phoneNumber: "+233 55 666 2345",
    paymentMethod: "Hubtel",
    status: "completed",
  },
  {
    id: "TXN-013",
    date: "2024-01-09",
    amount: 55.75,
    userName: "Fiifi Quartey",
    phoneNumber: "+233 24 777 8901",
    paymentMethod: "MTN",
    status: "pending",
  },
  {
    id: "TXN-014",
    date: "2024-01-09",
    amount: 275.4,
    userName: "Esi Baiden",
    phoneNumber: "+233 20 888 3456",
    paymentMethod: "Vodafone",
    status: "completed",
  },
  {
    id: "TXN-015",
    date: "2024-01-08",
    amount: 650.0,
    userName: "Kwesi Appiah",
    phoneNumber: "+233 55 999 6789",
    paymentMethod: "Hubtel",
    status: "failed",
  },
];

function PaymentMethodBadge({ method }: { method: string }) {
  const getMethodColor = (method: string) => {
    switch (method.toLowerCase()) {
      case "mtn":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "vodafone":
        return "bg-red-100 text-red-800 border-red-200";
      case "hubtel":
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <Badge variant="outline" className={getMethodColor(method)}>
      <Smartphone className="w-3 h-3 mr-1" />
      {method}
    </Badge>
  );
}

function StatusBadge({ status }: { status: string }) {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "bg-[#30961c]/10 text-[#30961c] border-[#30961c]/20";
      case "pending":
        return "bg-orange-100 text-orange-500 border-yellow-200";
      case "failed":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <Badge variant="outline" className={getStatusColor(status)}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  );
}

export function TransactionTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTransaction, setSelectedTransaction] = useState<
    (typeof transactions)[0] | null
  >(null);
  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);

  const itemsPerPage = 10;
  const totalPages = Math.ceil(transactions.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentTransactions = transactions.slice(startIndex, endIndex);

  const handleViewInvoice = (transaction: (typeof transactions)[0]) => {
    setSelectedTransaction(transaction);
    setIsInvoiceModalOpen(true);
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>All Transactions</span>
            <span className="text-sm font-normal text-muted-foreground">
              {transactions.length} total transactions
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-semibold">
                    Transaction ID
                  </TableHead>
                  <TableHead className="font-semibold">Date</TableHead>
                  <TableHead className="font-semibold">Amount</TableHead>
                  <TableHead className="font-semibold">User Details</TableHead>
                  <TableHead className="font-semibold">
                    Payment Method
                  </TableHead>
                  <TableHead className="font-semibold">Status</TableHead>
                  <TableHead className="font-semibold">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentTransactions.map((transaction) => (
                  <TableRow key={transaction.id} className="hover:bg-muted/50">
                    <TableCell className="font-mono font-medium">
                      {transaction.id}
                    </TableCell>
                    <TableCell>
                      {new Date(transaction.date).toLocaleDateString("en-GB")}
                    </TableCell>
                    <TableCell className="font-semibold">
                      GHS {transaction.amount.toFixed(2)}
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="font-medium">
                          {transaction.userName}
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Phone className="w-3 h-3 mr-1" />
                          {transaction.phoneNumber}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <PaymentMethodBadge method={transaction.paymentMethod} />
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={transaction.status} />
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            className="h-8 cursor-pointer w-8 p-0"
                          >
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            className="cursor-pointer"
                            onClick={() => handleViewInvoice(transaction)}
                          >
                            <FolderOpen />
                            View Invoice
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="flex items-center justify-between mt-6">
            <div className="text-sm text-muted-foreground">
              Showing {startIndex + 1} to{" "}
              {Math.min(endIndex, transactions.length)} of {transactions.length}{" "}
              transactions
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="w-4 h-4" />
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
                      className="w-8 h-8 p-0"
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
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {selectedTransaction && (
        <InvoiceModal
          transaction={selectedTransaction}
          isOpen={isInvoiceModalOpen}
          onClose={() => setIsInvoiceModalOpen(false)}
        />
      )}
    </>
  );
}
