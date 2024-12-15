"use client";
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import SectionHeader from "@/components/Shared/SectionHeader";

const OrderHistory = () => {
  // Mock data for orders (can be replaced with fetched data)
  const [orders] = useState([
    {
      id: "1",
      shop: { name: "Green Farm" },
      totalPrice: 29.99,
      status: "PENDING", // Assuming OrderStatus is an enum
      createdAt: "2024-12-01T14:30:00Z",
    },
    {
      id: "2",
      shop: { name: "Fresh Produce" },
      totalPrice: 15.75,
      status: "COMPLETED",
      createdAt: "2024-12-02T10:45:00Z",
    },
    {
      id: "3",
      shop: { name: "Veggie Market" },
      totalPrice: 45.50,
      status: "CANCELLED",
      createdAt: "2024-12-03T12:20:00Z",
    },
    // Add more orders as needed
  ]);

  return (
    <div>
      <SectionHeader title="Order History" />
      <div className="wrapper">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Shop</TableHead>
              <TableHead>Total Price</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.id}</TableCell>
                <TableCell>{order.shop.name}</TableCell>
                <TableCell>${order.totalPrice.toFixed(2)}</TableCell>
                <TableCell>{order.status}</TableCell>
                <TableCell>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default OrderHistory;
