"use client";
import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import SectionHeader from "@/components/Shared/SectionHeader";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { RiDeleteBinLine } from "react-icons/ri";

const TransactionPage = () => {
  // Mock data for transactions (replace with actual fetched data)
  const [transactions, setTransactions] = useState([
    {
      id: "1",
      orderId: "12345",
      amount: 100.5,
      paymentMethod: "Credit Card",
      status: "Completed",
      transactionId: "trans123",
      createdAt: "2024-12-01T12:00:00Z",
    },
    {
      id: "2",
      orderId: "12346",
      amount: 75.0,
      paymentMethod: "PayPal",
      status: "Pending",
      transactionId: "trans124",
      createdAt: "2024-12-02T14:00:00Z",
    },
    // Add more transactions as needed
  ]);

  // Function to fetch actual transactions from the backend (mocked here)
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch("/api/transactions");
        const data = await response.json();
        setTransactions(data);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };
    fetchTransactions();
  }, []);

  return (
    <div>
      <SectionHeader title="Transaction History" />
      <div className="wrapper">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Transaction ID</TableHead>
              <TableHead>Order ID</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Payment Method</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell>{transaction.transactionId}</TableCell>
                <TableCell>{transaction.orderId}</TableCell>
                <TableCell>${transaction.amount.toFixed(2)}</TableCell>
                <TableCell>{transaction.paymentMethod}</TableCell>
                <TableCell>{transaction.status}</TableCell>
                <TableCell>
                  {new Date(transaction.createdAt).toLocaleString()}
                </TableCell>
                <TableCell>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <button className="btn-outline border border-red-400 rounded-lg text-red-400 hover:text-white hover:bg-red-400 transition duration-300">
                        <RiDeleteBinLine size={18} />
                      </button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. It will permanently
                          delete the transaction data.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel className="btn-primary bg-gray-200 text-black hover:text-black hover:bg-gray-300">
                          Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction className="btn-primary bg-red-500 hover:bg-red-600">
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default TransactionPage;
