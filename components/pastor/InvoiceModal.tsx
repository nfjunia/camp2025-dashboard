"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Phone,
  Smartphone,
  Calendar,
  CreditCard,
  Hash,
  Download,
  Printer as Print,
} from "lucide-react";

interface Transaction {
  id: string;
  date: string;
  amount: number;
  userName: string;
  phoneNumber: string;
  paymentMethod: string;
  status: string;
}

interface InvoiceModalProps {
  transaction: Transaction;
  isOpen: boolean;
  onClose: () => void;
}

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
        return "bg-green-100 text-green-800 border-green-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
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

export function InvoiceModal({
  transaction,
  isOpen,
  onClose,
}: InvoiceModalProps) {
  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    // In a real app, this would generate and download a PDF
    console.log("Downloading invoice for transaction:", transaction.id);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Transaction Invoice
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Invoice Header */}
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-primary">PayFlow</h2>
              <p className="text-sm text-muted-foreground">
                Transaction Management System
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Invoice Date</p>
              <p className="font-semibold">
                {new Date().toLocaleDateString("en-GB")}
              </p>
            </div>
          </div>

          <Separator />

          {/* Transaction Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Transaction Information</h3>

              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Hash className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Transaction ID
                    </p>
                    <p className="font-mono font-medium">{transaction.id}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Date</p>
                    <p className="font-medium">
                      {new Date(transaction.date).toLocaleDateString("en-GB")}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Payment Method
                    </p>
                    <PaymentMethodBadge method={transaction.paymentMethod} />
                  </div>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <StatusBadge status={transaction.status} />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Customer Information</h3>

              <div className="space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">Customer Name</p>
                  <p className="font-medium">{transaction.userName}</p>
                </div>

                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Phone Number
                    </p>
                    <p className="font-medium">{transaction.phoneNumber}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Amount Summary */}
          <div className="bg-muted/30 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  Transaction Amount
                </p>
                <p className="text-2xl font-bold text-primary">
                  GHS {transaction.amount.toFixed(2)}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Processing Fee</p>
                <p className="font-medium">GHS 0.00</p>
              </div>
            </div>

            <Separator className="my-3" />

            <div className="flex items-center justify-between">
              <p className="font-semibold">Total Amount</p>
              <p className="text-xl font-bold">
                GHS {transaction.amount.toFixed(2)}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 pt-4">
            <Button
              onClick={handlePrint}
              variant="outline"
              className="flex items-center gap-2 bg-transparent"
            >
              <Print className="w-4 h-4" />
              Print Invoice
            </Button>
            <Button
              onClick={handleDownload}
              variant="outline"
              className="flex items-center gap-2 bg-transparent"
            >
              <Download className="w-4 h-4" />
              Download PDF
            </Button>
            <Button onClick={onClose} className="ml-auto">
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
