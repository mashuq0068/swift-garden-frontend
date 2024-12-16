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

const OrderPage = () => {
  // Mock data for transactions (replace with actual fetched data)
  const { data } = useGetOrdersQuery(undefined);
  const shopOrders = data?.data?.data?.filter(
    (order: any) => order.shopId === localStorage.getItem("shop")
  );

  return (
    <div>
      <SectionHeader title="Order History" />
      <div className="wrapper">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>

              <TableHead>Total Price</TableHead>
              <TableHead>Payment Date</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {shopOrders?.map((order: any) => (
              <TableRow key={order.id}>
                <TableCell>{order.id}</TableCell>

                <TableCell>${order.totalPrice.toFixed(2)}</TableCell>

                <TableCell>
                  {new Date(order.createdAt).toLocaleString()}
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

export default OrderPage;
