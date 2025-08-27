import Header from "@/components/pastor/Header";
import { TransactionTable } from "@/components/pastor/TransactionTable";
import AppSidebar from "@/components/pastor/app-sidebar";
import { Separator } from "@/components/ui/separator";
import React from "react";

const page = () => {
  return (
    <div className="w-full h-full pb-16 mx-auto ">
      <Header />
      <div className="w-full">
        <div className="w-full space-y-2 bg-white p-5 rounded-md border">
          <div className="flex items-center">
            <div>
              <h1 className="mb-2 text-[15px] font-bold">
                Camp Payment Transactions
              </h1>
              <p className="text-xs text-gray-600">Network overview for</p>
            </div>
          </div>
        </div>
        <Separator className="mt-4" />
        <div className="mt-3">
          <TransactionTable />
        </div>
      </div>
    </div>
  );
};

export default page;
