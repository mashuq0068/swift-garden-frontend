/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { FiShoppingCart } from "react-icons/fi";
import {
  FaTachometerAlt,
  FaStore,
  FaTags,
  FaEye,
  FaHistory,
} from "react-icons/fa"; // Import icons

import Logo from "../Home/Logo";
import { AiOutlineUser } from "react-icons/ai";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import { useState } from "react";
import { RiMenu2Line } from "react-icons/ri";
import { usePathname } from "next/navigation";

interface IFilters {
  categories: number[];
  priceRange: {
    min: number | string;
    max: number | string;
  };
}
const categories = [
  {
    id: 1,
    name: "Leafy Greens",
  },
  {
    id: 2,
    name: "Root Vegetables",
  },
  {
    id: 3,
    name: "Cruciferous",
  },
  {
    id: 4,
    name: "Gourds & Squashes",
  },
  {
    id: 5,
    name: "Allium Vegetables",
  },
  {
    id: 6,
    name: "Nightshades",
  },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathName = usePathname();
  const [filters, setFilters] = useState<IFilters>({
    categories: [],
    priceRange: { min: "", max: "" },
  });

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  const handleCategoryChange = (id: number) => {
    setFilters((prev: any) => {
      const isChecked = prev.categories.includes(id as number);
      const updatedCategories = isChecked
        ? prev.categories.filter((catId: number) => catId !== id)
        : [...prev.categories, id];
      return { ...prev, categories: updatedCategories };
    });
  };
  const isFilterActive =
    filters.priceRange.min !== "" &&
    filters.priceRange.max !== "" &&
    Number(filters.priceRange.min) <= Number(filters.priceRange.max);

  const handleApplyFilter = () => {
    if (isFilterActive) {
      // Perform the filtering logic (e.g., API call or local filtering)
      console.log("Filtering with range:", filters.priceRange);
    }
  };
  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      priceRange: { ...prev.priceRange, [name]: value },
    }));
  };
  const isAdminOrVendorPath =
    pathName.includes("/admin") || pathName.includes("/vendor");

  return (
    <div className={`${isAdminOrVendorPath ? "hidden" : "block"}`}>
      <div className="py-6 px-4 container mx-auto sticky top-0 z-50 ">
        <div className="flex flex-wrap justify-between items-center container mx-auto">
          {/* Logo , drawer */}
          <div className="flex items-center gap-5">
            <div>
              <button onClick={toggleDrawer}>
                <RiMenu2Line className="text-xl" />
              </button>
            </div>
            <Logo />
          </div>

          {/* Search Bar (Hidden on Small Screens) */}
          <div className="hidden lg:flex items-center justify-center  flex-1 ">
            <input
              type="text"
              placeholder="Search products..."
              className="w-[70%]  border border-gray-300 rounded-l-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button className="bg-green-500 border-green-500 border text-white px-4 py-2 rounded-r-md hover:bg-green-500">
              Search
            </button>
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-4">
            <FiShoppingCart className="text-2xl text-gray-700 hover:text-green-500 transition" />
            <AiOutlineUser className="text-2xl text-gray-700 hover:text-green-500 transition" />
          </div>

          {/* Mobile Search Bar Button */}
        </div>

        {/* Mobile Search Bar (Appears on Small Screens) */}
        <div className="lg:hidden flex mt-4">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <div className="lg:hidden flex items-center border-2 border-green-500 h-full space-x-4">
            <button className="bg-green-500 text-white h-full px-3 py-2 rounded-md hover:bg-green-500">
              Search
            </button>
          </div>
        </div>
      </div>
      {/* drawer */}
      <Drawer
        open={isOpen}
        onClose={toggleDrawer}
        direction="left"
        className="w-64 font-normal text-gray-600 shadow-lg"
      >
        <div className="p-4">
          {/* Header */}
          <h2 className="text-xl font-semibold mb-4">Menu</h2>

          {/* Menu Items */}
          <ul className="space-y-3">
            <li className="flex items-center space-x-2 cursor-pointer hover:text-green-500">
              <FaTachometerAlt />
              <span>Dashboard</span>
            </li>
            <li className="flex items-center space-x-2 cursor-pointer hover:text-green-500">
              <FaStore />
              <span>Shops</span>
            </li>
            <li className="flex items-center space-x-2 cursor-pointer hover:text-green-500">
              <FaTags />
              <span>Flash Sales</span>
            </li>
            <li className="flex items-center space-x-2 cursor-pointer hover:text-green-500">
              <FaEye />
              <span>Recently Viewed</span>
            </li>
            <li className="flex items-center space-x-2 cursor-pointer hover:text-green-500 mt-4">
              <FaHistory />
              <span>Order History</span>
            </li>

            {/* Filters Section */}
            <li className="pt-4">
              {/* <h3 className="text-sm font-medium mb-3">Filters</h3> */}
              {/* Category Filters */}
              <div className="mb-6">
                <h3 className="text-sm font-medium mb-2">Categories</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <label
                      key={category.id}
                      className="flex items-center space-x-2 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        className="form-checkbox h-4 w-4 text-green-500"
                        checked={filters?.categories?.includes(category.id)}
                        onChange={() => handleCategoryChange(category.id)}
                      />
                      <span>{category.name}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium mb-2">Price Range</h3>
                <div className="flex items-center space-x-2">
                  <input
                    type="number"
                    name="min"
                    value={filters.priceRange.min}
                    onChange={handlePriceChange}
                    placeholder="Min"
                    className="w-20 px-2 focus:border-0 focus:outline-2 focus:outline-green-500  py-1 border rounded"
                  />
                  <span>to</span>
                  <input
                    type="number"
                    name="max"
                    value={filters.priceRange.max}
                    onChange={handlePriceChange}
                    placeholder="Max"
                    className="w-20 focus:border-0 focus:outline-2 focus:outline-green-500  px-2 py-1 border rounded"
                  />
                </div>
              </div>
              <button
                onClick={handleApplyFilter}
                disabled={!isFilterActive}
                className={`px-4 py-2 mt-5 rounded text-white ${
                  isFilterActive
                    ? "bg-green-500 hover:bg-green-600"
                    : "bg-gray-300 cursor-not-allowed"
                }`}
              >
                Apply Price
              </button>
            </li>
          </ul>
        </div>
      </Drawer>
    </div>
  );
};

export default Navbar;
