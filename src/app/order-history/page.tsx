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
import { useAppSelector } from "@/redux/hooks";

const OrderHistoryPage = () => {
  // Get user authentication information
  const auth = useAppSelector((state) => state.auth);

  // Fetch orders data
  const { data } = useGetOrdersQuery(undefined);

  // Filter orders for the authenticated user
  const userOrders = data?.data?.data?.filter(
    (order: any) => order.userId === auth.id
  );

  return (
    <div className="container p-12 mx-auto">
      <SectionHeader title="Order History" />
      <div className="wrapper">
        {userOrders && userOrders.length > 0 ? (
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
              {userOrders.map((order: any) => (
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
        ) : (
          <div className="text-center text-gray-500">
            No orders found. Start shopping to place your first order!
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderHistoryPage;
