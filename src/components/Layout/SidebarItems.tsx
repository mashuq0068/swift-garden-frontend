/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  Monitor,
  Users,
  UserCheck,
  ShoppingCart,
  List,
  Banknote,
} from "lucide-react";
import { AiFillProduct } from "react-icons/ai";
import { MdStore, MdRateReview, MdHistory } from "react-icons/md";

// Sample data with updated sidebar items
export const AdminItems = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/admin",
      icon: Monitor,
    },
    {
      title: "Vendor Management",
      url: "/admin/vendor-management",
      icon: Users,
    },
    {
      title: "Customer Management",
      url: "/admin/customer-management",
      icon: UserCheck,
    },
    {
      title: "Shops",
      url: "/admin/shops",
      icon: ShoppingCart,
    },
    {
      title: "Product Categories",
      url: "/admin/product-categories",
      icon: List,
    },
    {
      title: "Transactions",
      url: "/admin/transactions",
      icon: Banknote,
    },
  ],
};
export const VendorItems = {
  navMain: [
    {
      title: "Dashboard",
      url: "/vendor",
      icon: Monitor,
    },
    {
      title: "Shop Management",
      url: "/vendor/shop-management",
      icon: MdStore,
    },
    {
      title: "Product Management",
      url: "/vendor/product-management",
      icon: AiFillProduct,
    },
    {
      title: "Customer Reviews",
      url: "/vendor/customer-reviews",
      icon: MdRateReview,
    },
    {
      title: "Order History",
      url: "/vendor/order-history",
      icon: MdHistory,
    },
  ],
};

export const UserItems = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/admin",
      icon: Monitor,
    },
    {
      title: "Vendor Management",
      url: "/admin/vendor-management",
      icon: Users,
    },
    {
      title: "Customer Management",
      url: "/admin/customer-management",
      icon: UserCheck,
    },
    {
      title: "Shops",
      url: "/admin/shops",
      icon: ShoppingCart,
    },
    {
      title: "Product Categories",
      url: "/admin/product-categories",
      icon: List,
    },
    {
      title: "Transactions",
      url: "/admin/transactions",
      icon: Banknote,
    },
  ],
};

