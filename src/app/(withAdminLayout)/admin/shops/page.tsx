/* eslint-disable @typescript-eslint/no-explicit-any */
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
import {
  useGetShopsQuery,
  useUpdateSingleShopMutation,
} from "@/redux/features/shop/shopApi";
import toast from "react-hot-toast";

const ShopManagement = () => {
  // Mock data for shops (can be replaced with fetched data)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [shops, setShops] = useState([
    {
      id: "1",
      name: "Green Veggies Store",
      description: "Fresh vegetables and leafy greens.",
      status: "ACTIVE", // Can toggle to 'BLACKLISTED'
    },
    {
      id: "2",
      name: "Root Veg Market",
      description: "Root vegetables and more.",
      status: "ACTIVE",
    },
    // Add more shops as needed
  ]);
  const { data } = useGetShopsQuery(undefined);
  const [updateShop] = useUpdateSingleShopMutation();
  const handelBlackListChange = async (status: string, id: string) => {
    if (status === "ACTIVE") {
      await updateShop({ status: "BLOCKED", id });
      toast.success("Shop Blocked Successfully");
    } else {
      await updateShop({ status: "ACTIVE", id });
      toast.success("Shop Unblocked Successfully");
    }
  };
  return (
    <div>
      <SectionHeader title="Shop Management" />
      <div className="wrapper">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Shop Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Blacklist</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.data?.map((shop: any) => (
              <TableRow key={shop.id}>
                <TableCell className="font-medium items-center flex gap-3">
                <img
                    src={shop?.logo}
                    alt="logo"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  {shop.name}{" "}
                
                </TableCell>
                <TableCell className="ellipsis">{shop.description}</TableCell>
                <TableCell>
                  {shop.status.charAt(0).toUpperCase() +
                    shop.status.slice(1).toLowerCase()}
                </TableCell>

                <TableCell>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      onChange={() =>
                        handelBlackListChange(shop.status, shop.id)
                      }
                      type="checkbox"
                      checked={shop?.status === "BLOCKED"}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:bg-green-500 peer-checked:before:translate-x-5 before:content-[''] before:absolute before:top-0.5 before:left-[2px] before:bg-white before:border before:border-gray-300 before:rounded-full before:h-5 before:w-5 before:transition-transform"></div>
                  </label>
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
                          delete the shop data.
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

export default ShopManagement;
