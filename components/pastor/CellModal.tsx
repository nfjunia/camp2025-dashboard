"use client";

import {
  User,
  DollarSign,
  Calendar,
  CheckCircle,
  Clock,
  AlertCircle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface CellMember {
  id: string;
  name: string;
  email: string;
  phone: string;
  campFee: number;
  amountPaid: number;
  amountLeft: number;
  paymentStatus: "paid" | "partial" | "pending";
  lastPaymentDate?: string;
}

const mockCellMembers: CellMember[] = [
  {
    id: "1",
    name: "Alice Thompson",
    email: "alice.thompson@email.com",
    phone: "+1 (555) 111-2222",
    campFee: 500,
    amountPaid: 500,
    amountLeft: 0,
    paymentStatus: "paid",
    lastPaymentDate: "2024-01-15",
  },
  {
    id: "2",
    name: "Bob Martinez",
    email: "bob.martinez@email.com",
    phone: "+1 (555) 222-3333",
    campFee: 500,
    amountPaid: 300,
    amountLeft: 200,
    paymentStatus: "partial",
    lastPaymentDate: "2024-01-10",
  },
  {
    id: "3",
    name: "Carol Williams",
    email: "carol.williams@email.com",
    phone: "+1 (555) 333-4444",
    campFee: 500,
    amountPaid: 0,
    amountLeft: 500,
    paymentStatus: "pending",
  },
  {
    id: "4",
    name: "Daniel Lee",
    email: "daniel.lee@email.com",
    phone: "+1 (555) 444-5555",
    campFee: 500,
    amountPaid: 500,
    amountLeft: 0,
    paymentStatus: "paid",
    lastPaymentDate: "2024-01-12",
  },
  {
    id: "5",
    name: "Emma Garcia",
    email: "emma.garcia@email.com",
    phone: "+1 (555) 555-6666",
    campFee: 500,
    amountPaid: 150,
    amountLeft: 350,
    paymentStatus: "partial",
    lastPaymentDate: "2024-01-08",
  },
];

const getPaymentStatusBadge = (status: string) => {
  switch (status) {
    case "paid":
      return (
        <Badge className="bg-[#30961c]/10 text-green-800">
          <CheckCircle className="mr-1 h-3 w-3" />
          Paid
        </Badge>
      );
    case "partial":
      return (
        <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100">
          <Clock className="mr-1 h-3 w-3" />
          Partial
        </Badge>
      );
    case "pending":
      return (
        <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
          <AlertCircle className="mr-1 h-3 w-3" />
          Pending
        </Badge>
      );
    default:
      return null;
  }
};

interface CellDetailsModalProps {
  cellLeader: any;
  isOpen: boolean;
  onClose: () => void;
}

export default function CellDetailsModal({
  cellLeader,
  isOpen,
  onClose,
}: CellDetailsModalProps) {
  if (!cellLeader) return null;

  const totalCollected = mockCellMembers.reduce(
    (sum, member) => sum + member.amountPaid,
    0
  );
  const totalPending = mockCellMembers.reduce(
    (sum, member) => sum + member.amountLeft,
    0
  );
  const paidMembers = mockCellMembers.filter(
    (member) => member.paymentStatus === "paid"
  ).length;
  const partialMembers = mockCellMembers.filter(
    (member) => member.paymentStatus === "partial"
  ).length;
  const pendingMembers = mockCellMembers.filter(
    (member) => member.paymentStatus === "pending"
  ).length;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <div className="space-y-6">
          {/* Members Table */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Camp Payment Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Member Information</TableHead>
                      <TableHead>Camp Fee</TableHead>
                      <TableHead>Amount Paid</TableHead>
                      <TableHead>Amount Left</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Last Payment</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockCellMembers.map((member) => (
                      <TableRow key={member.id}>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="font-medium">{member.name}</div>
                            <div className="text-sm text-muted-foreground">
                              {member.email}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {member.phone}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="font-medium">${member.campFee}</div>
                        </TableCell>
                        <TableCell>
                          <div className="font-medium text-[#30961c]">
                            ${member.amountPaid}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="font-medium text-orange-600">
                            ${member.amountLeft}
                          </div>
                        </TableCell>
                        <TableCell>
                          {getPaymentStatusBadge(member.paymentStatus)}
                        </TableCell>
                        <TableCell>
                          {member.lastPaymentDate ? (
                            <div className="flex items-center gap-1 text-sm">
                              <Calendar className="h-3 w-3" />
                              {new Date(
                                member.lastPaymentDate
                              ).toLocaleDateString()}
                            </div>
                          ) : (
                            <span className="text-muted-foreground text-sm">
                              No payments
                            </span>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}
