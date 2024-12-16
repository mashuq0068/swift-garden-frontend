"use client"
/* 
eslint-disable @typescript-eslint/no-explicit-any */
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
import { useDeleteSingleUserMutation, useGetAllUsersQuery } from "@/redux/features/user/userApi";
import toast from "react-hot-toast";

const CustomerManagement = () => {
   // Mock data for user records (could be replaced with fetched data)

   const { data } = useGetAllUsersQuery({ role: "USER" });
   const [deleteUser] = useDeleteSingleUserMutation();
   const handleDelete = async (id: string) => {
     try {
       await deleteUser(id).unwrap();
       toast.success("User deleted successfully");
     } catch (error) {
       console.error("Delete Error:", error);
       toast.error("Failed to delete user. Please try again.");
     }
   };

  return (
    <div>
      <SectionHeader title="Customer Management" />
      <div className="wrapper">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer Name</TableHead>
              <TableHead>Customer ID</TableHead>
              <TableHead>Email</TableHead>
         
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.data?.map((user:any) => (
              <TableRow key={user?.id}>
                <TableCell >{user.name}</TableCell>
                <TableCell >{user.id}</TableCell>
                <TableCell>{user?.email}</TableCell>
              
                <TableCell>
                  {user?.role.charAt(0).toUpperCase() +
                    user.status.slice(1).toLowerCase()}
                </TableCell>

                <TableCell>
                  {user?.status.charAt(0).toUpperCase() +
                    user.status.slice(1).toLowerCase()}
                </TableCell>

                <TableCell>
                  {/* Delete Button */}
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
                          delete the user data.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel className="btn-primary bg-gray-200 text-black hover:text-black hover:bg-gray-300">
                          Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleDelete(user?.id)} className="btn-primary bg-red-500 hover:bg-red-600">
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

export default CustomerManagement;
