"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { Search, DollarSign, ChevronLeft } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { CardContent } from "@/components/ui/card";
import Image from "next/image";
import mtnLogo from "@/public/payment/MTN-Icon-Logo-Vector.svg-.png";
import vodaphone from "@/public/payment/Vodafone-Symbol.png";

interface Member {
  id: string;
  name: string;
  email: string;
  phone: string;

  status: string;
  amountPaid: number;
  balance: number;
  paymentDate: string;
  method: string;
}

interface PaymentDialogProps {
  isOpen: boolean;
  onClose: () => void;
  members: Member[];
  onSubmit: (paymentData: {
    memberId: string;
    amount: number;
    method: string;
    date: string;
  }) => void;
}

export default function PaymentDialog({
  isOpen,
  onClose,
  members,
  onSubmit,
}: PaymentDialogProps) {
  const [step, setStep] = useState<"search" | "payment">("search");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [paymentAmount, setPaymentAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [paymentDate, setPaymentDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const filteredMembers = members.filter(
    (member) =>
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleMemberSelect = (member: Member) => {
    setSelectedMember(member);
    setPaymentAmount(member.balance.toString());
    setStep("payment");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMember || !paymentAmount || !paymentMethod) return;

    const amount = Number.parseFloat(paymentAmount);
    if (amount <= 0 || amount > selectedMember.balance) return;

    onSubmit({
      memberId: selectedMember.id,
      amount,
      method: paymentMethod,
      date: paymentDate,
    });

    setStep("search");
    setSearchTerm("");
    setSelectedMember(null);
    setPaymentAmount("");
    setPaymentMethod("");
    setPaymentDate(new Date().toISOString().split("T")[0]);
  };

  const handleClose = () => {
    setStep("search");
    setSearchTerm("");
    setSelectedMember(null);
    setPaymentAmount("");
    setPaymentMethod("");
    setPaymentDate(new Date().toISOString().split("T")[0]);
    onClose();
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Paid Full":
        return <Badge className="bg-[#0fa2f7] text-white">Paid Full</Badge>;
      case "Partial":
        return <Badge className="bg-[#0fa2f7] text-white">Partial</Badge>;
      case "Unpaid":
        return <Badge className="bg-[#0fa2f7] text-white">Unpaid</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getStatusBadge1 = (status: string) => {
    switch (status) {
      case "Paid Full":
        return (
          <Badge className="bg-[#30961c]/15 text-[#30961c]">Paid Full</Badge>
        );
      case "Partial":
        return (
          <Badge className="bg-[#f0cc56]/15 text-[#f0cc56]">Partial</Badge>
        );
      case "Unpaid":
        return <Badge className="bg-[#fc7f03]/15 text-[#fc7f03]">Unpaid</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  useEffect(() => {
    if (!isOpen) {
      setStep("search");
      setSearchTerm("");
      setSelectedMember(null);
      setPaymentAmount("");
      setPaymentMethod("");
      setPaymentDate(new Date().toISOString().split("T")[0]);
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <span className="font-bold mr-2 text-2xl">&#8373;</span> Add Payment
          </DialogTitle>
        </DialogHeader>

        {step === "search" && (
          <div className="space-y-4">
            <div>
              <Label htmlFor="member-search">Search Member</Label>
              <div className="relative mt-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  id="member-search"
                  placeholder="Search by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 mt-2"
                />
              </div>
            </div>

            <div className="space-y-2 max-h-96 overflow-y-auto">
              {filteredMembers.length === 0 ? (
                <p className="text-center text-gray-500 py-8">
                  {searchTerm
                    ? "No members found matching your search."
                    : "Start typing to search for members."}
                </p>
              ) : (
                filteredMembers.map((member) => (
                  <div
                    key={member.id}
                    className="cursor-pointer transition-colors"
                    onClick={() => handleMemberSelect(member)}
                  >
                    <CardContent className="px-4 py-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="h-10 w-10 bg-[#0fa2f7]/15 rounded-full flex items-center justify-center mr-3">
                            <span className="text-sm font-medium text-[#0fa2f7]">
                              {member.name
                                .split(" ")
                                .map((name) => name[0])
                                .join("")}
                            </span>
                          </div>
                          <div>
                            <div className="font-medium">{member.name}</div>
                            <div className="text-sm font-light text-gray-600">
                              {member.email}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          {getStatusBadge1(member.status)}
                          <div className="text-sm text-gray-600 mt-1">
                            Balance:{" "}
                            <span className="font-medium text-red-600">
                              ${member.balance}
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {step === "payment" && selectedMember && (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Selected Member Info */}
            <div className="bg-[#0fa2f7]/15 rounded-md">
              <CardContent className="p-4">
                <div className="flex items-center">
                  <div className="h-10 w-10 bg-[#0fa2f7]/15 rounded-full flex items-center justify-center mr-3">
                    <span className="text-sm font-medium text-[#0fa2f7]">
                      {selectedMember.name
                        .split(" ")
                        .map((name) => name[0])
                        .join("")}
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">{selectedMember.name}</div>
                    <div className="text-sm text-gray-600">
                      {selectedMember.email}
                    </div>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="bg-[#0fa2f7] hover:bg-[#0fa2f7] cursor-pointer hover:text-white text-white font-light"
                    onClick={() => setStep("search")}
                  >
                    <ChevronLeft size={16} /> Change
                  </Button>
                </div>
                <div className="mt-3 flex justify-between text-sm">
                  <span>
                    Current Status: {getStatusBadge(selectedMember.status)}
                  </span>
                  <span>
                    Outstanding Balance:{" "}
                    <span className="font-medium text-red-600">
                      ${selectedMember.balance}
                    </span>
                  </span>
                </div>
              </CardContent>
            </div>

            {/* Payment Form */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="amount">Payment Amount</Label>
                <div className="relative mt-1">
                  <Input
                    id="amount"
                    type="number"
                    step="0.01"
                    min="0.01"
                    max={selectedMember.balance}
                    value={paymentAmount}
                    onChange={(e) => setPaymentAmount(e.target.value)}
                    className="pl-4"
                    required
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Maximum: ₵{selectedMember.balance}
                </p>
              </div>{" "}
              <div>
                <Label>Select Network Provider</Label>
                <Select
                  value={paymentMethod}
                  onValueChange={setPaymentMethod}
                  required
                >
                  <SelectTrigger className="w-full rounded-xl mt-2">
                    <SelectValue placeholder="Choose your network provider" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mtn">
                      <div className="flex cursor-pointer items-center space-x-3">
                        <div className=" flex items-center justify-center text-white text-xs">
                          <Image
                            src={mtnLogo}
                            className="w-8 h-3  object-cover"
                            alt="mtn_paymet"
                          />
                        </div>
                        <span>MTN</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="vodafone">
                      <div className="flex items-center space-x-3">
                        <div className=" flex items-center justify-center text-white text-xs">
                          <Image
                            src={vodaphone}
                            className="w-8 h-5  object-cover"
                            alt="mtn_paymet"
                          />
                        </div>
                        <span>Vodafone</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Quick Amount Buttons */}
            <div>
              <Label>Quick Amount</Label>
              <div className="flex gap-2 mt-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setPaymentAmount("50")}
                  disabled={selectedMember.balance < 50}
                >
                  ₵100
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setPaymentAmount("100")}
                  disabled={selectedMember.balance < 100}
                >
                  ₵100
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setPaymentAmount(selectedMember.balance.toString())
                  }
                >
                  Full Balance (₵{selectedMember.balance})
                </Button>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <Button type="button" variant="outline" onClick={handleClose}>
                Cancel
              </Button>
              <Button type="submit" disabled={!paymentAmount || !paymentMethod}>
                Add Payment
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
