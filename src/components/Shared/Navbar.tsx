/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import {  PiShoppingCartLight } from "react-icons/pi";
import {
  FaTachometerAlt,
  FaStore,
  FaTags,
  FaEye,
  FaHistory,
} from "react-icons/fa";
import { AiOutlineUser } from "react-icons/ai";
import { RiMenu2Line } from "react-icons/ri";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import { FormEvent } from "react";
import { usePathname } from "next/navigation";
import Logo from "../Home/Logo";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  toggleCategory,
  updatePriceRange,
} from "@/redux/features/filter/filterSlice";
import { setSearchTerm } from "@/redux/features/search/searchSlice";
import { useGetCategoriesQuery } from "@/redux/features/category/category.api";
import Link from "next/link";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const cart = useAppSelector((state) => state.cart);
  const { data } = useGetCategoriesQuery(undefined);
  const dispatch = useAppDispatch();
  const pathName = usePathname();

  // Redux filter and local state for price range
  const filters = useAppSelector((state) => state.filter);
  const [localPriceRange, setLocalPriceRange] = useState({
    min: filters.priceRange.min || "",
    max: filters.priceRange.max || "",
  });

  // Toggle drawer visibility
  const toggleDrawer = () => setIsOpen(!isOpen);

  // Handle category change
  const handleCategoryChange = (id: number) => {
    dispatch(toggleCategory(id));
  };

  // Update local state for price range
  const handlePriceInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLocalPriceRange((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Determine if the price filter can be applied
  const isFilterActive =
    localPriceRange.min !== "" &&
    localPriceRange.max !== "" &&
    Number(localPriceRange.min) <= Number(localPriceRange.max);

  // Apply the price filter (dispatch to Redux store)
  const handleApplyFilter = () => {
    if (isFilterActive) {
      dispatch(updatePriceRange(localPriceRange));
      console.log("Filtering with range:", localPriceRange);
    }
  };

  // Search submission handler
  const handleSearchSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const searchTerm = (e.target as HTMLFormElement).search.value;
    dispatch(setSearchTerm(searchTerm));
  };

  const isAdminOrVendorPath =
    pathName.includes("/admin") || pathName.includes("/vendor");

  return (
    <div className={`${isAdminOrVendorPath ? "hidden" : "block"}`}>
      <div className="py-6 px-4 container mx-auto sticky top-0 z-50">
        <div className="flex flex-wrap justify-between items-center container mx-auto">
          {/* Logo and drawer toggle */}
          <div className="flex items-center gap-5">
            <button onClick={toggleDrawer}>
              <RiMenu2Line className="text-xl" />
            </button>
            <Link href="/">
              {" "}
              <Logo />
            </Link>
          </div>

          {/* Search Bar */}
          <form
            onSubmit={handleSearchSubmit}
            className="hidden lg:flex items-center justify-center flex-1"
          >
            <input
              type="text"
              name="search"
              placeholder="Search products..."
              className="w-[70%] border border-gray-300 rounded-l-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button className="bg-green-500 border-green-500 text-white px-4 py-2 rounded-r-md hover:bg-green-500">
              Search
            </button>
          </form>

          {/* Icons */}
          <div className="flex items-center space-x-4">
            <Link href="/cart" className="relative">
              <PiShoppingCartLight className="text-3xl text-gray-700 hover:text-green-500 transition" />

              {/* Cart Item Count Badge */}
              {cart.items.length > 0 && (
                <span className="absolute -top-2 -right-3 flex items-center justify-center w-5 h-5 bg-red-500 text-white text-xs font-semibold rounded-full">
                  {cart.items.length}
                </span>
              )}
            </Link>

            <AiOutlineUser className="text-2xl text-gray-700 hover:text-green-500 transition" />
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="lg:hidden flex mt-4">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-500">
            Search
          </button>
        </div>
      </div>

      {/* Drawer */}
      <Drawer
        open={isOpen}
        onClose={toggleDrawer}
        direction="left"
        className="w-64 font-normal text-gray-600 shadow-lg"
      >
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-4">Menu</h2>
          <ul className="space-y-3">
            <Link href='/' className="flex items-center space-x-2 cursor-pointer hover:text-green-500">
              <FaTachometerAlt />
              <span>Dashboard</span>
            </Link>
            <Link href='/'  className="flex items-center space-x-2 cursor-pointer hover:text-green-500">
              <FaStore />
              <span>Shops</span>
            </Link>
            <Link href='/'  className="flex items-center space-x-2 cursor-pointer hover:text-green-500">
              <FaTags />
              <span>Flash Sales</span>
            </Link>
            <Link href='/recent-products'  className="flex items-center space-x-2 cursor-pointer hover:text-green-500">
              <FaEye />
              <span>Recently Viewed</span>
            </Link>
            <Link href='/'  className="flex items-center space-x-2 cursor-pointer hover:text-green-500 mt-4">
              <FaHistory />
              <span>Order History</span>
            </Link>

            {/* Filters */}
            <li className="pt-4">
              <div className="mb-6">
                <h3 className="text-sm font-medium mb-2">Categories</h3>
                {data?.data?.map((category: any) => (
                  <label
                    key={category.id}
                    className="flex items-center mt-3 space-x-2 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      className="form-checkbox h-4 w-4 text-green-500"
                      checked={filters.categories.includes(category.id)}
                      onChange={() => handleCategoryChange(category.id)}
                    />
                    <span>{category.name}</span>
                  </label>
                ))}
              </div>

              <div>
                <h3 className="text-sm font-medium mb-2">Price Range</h3>
                <div className="flex items-center space-x-2">
                  <input
                    type="number"
                    name="min"
                    value={localPriceRange.min}
                    onChange={handlePriceInputChange}
                    placeholder="Min"
                    className="w-20 px-2 py-1 border rounded"
                  />
                  <span>to</span>
                  <input
                    type="number"
                    name="max"
                    value={localPriceRange.max}
                    onChange={handlePriceInputChange}
                    placeholder="Max"
                    className="w-20 px-2 py-1 border rounded"
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
