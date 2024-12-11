"use client";
import {
  Monitor,
  Users,
  UserCheck,
  ShoppingCart,
  List,
  Banknote,
} from "lucide-react";

// Sample data with updated sidebar items
const SidebarItems = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/vendor",
      icon: Monitor,
    },
    {
      title: "Vendor Management",
      url: "/vendor/vendor-management",
      icon: Users,
    },
    {
      title: "Customer Management",
      url: "/vendor/customer-management",
      icon: UserCheck,
    },
    {
      title: "Shops",
      url: "/vendor/shops",
      icon: ShoppingCart,
    },
    {
      title: "Product Categories",
      url: "/vendor/product-categories",
      icon: List,
    },
    {
      title: "Transactions",
      url: "/vendor/transactions",
      icon: Banknote,
    },
  ],
};

export default SidebarItems;
