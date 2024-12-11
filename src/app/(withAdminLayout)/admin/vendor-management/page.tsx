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

const VendorManagement = () => {
  // Mock data for user records (could be replaced with fetched data)
  const users = [
    {
      id: "1",
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "123-456-7890",
      role: "USER",
      status: "ACTIVE",
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane.smith@example.com",
      phone: "098-765-4321",
      role: "VENDOR",
      status: "BLOCKED",
    },
    // Add more user data as needed
  ];

  return (
    <div>
      <SectionHeader title="Vendor Management" />
      <div className="wrapper">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users?.map((user) => (
              <TableRow key={user?.id}>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>{user?.email}</TableCell>
                <TableCell>{user?.phone}</TableCell>
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

export default VendorManagement;
