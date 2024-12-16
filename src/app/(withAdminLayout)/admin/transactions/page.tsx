/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import SectionHeader from "@/components/Shared/SectionHeader";
import { useGetOrdersQuery } from "@/redux/features/order/order.api";

const TransactionPage = () => {
  // Mock data for transactions (replace with actual fetched data)
  const { data } = useGetOrdersQuery(localStorage.getItem("shop"));
  console.log(data?.data);

  return (
    <div>
      <SectionHeader title="Transaction History" />
      <div className="wrapper">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Transaction ID</TableHead>
              {/* <TableHead>Shop ID</TableHead>
               */}
              <TableHead>Total Price</TableHead>
              <TableHead>Payment Date</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.data?.data?.map((transaction: any) => (
              <TableRow key={transaction.id}>
                <TableCell>{transaction.id}</TableCell>
                {/* <TableCell>{transaction.shopId}</TableCell>  */}
                <TableCell>${transaction.totalPrice.toFixed(2)}</TableCell>

                <TableCell>
                  {new Date(transaction.createdAt).toLocaleString()}
                </TableCell>
                <TableCell>{"Paid"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default TransactionPage;
