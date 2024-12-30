/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
"use client";

import { useGetCategoriesQuery } from "@/redux/features/category/category.api";
import { useGetShopsQuery } from "@/redux/features/shop/shopApi";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { HiChevronDown, HiChevronUp } from "react-icons/hi";

const Menu = () => {
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
  const [menuTimeout, setMenuTimeout] = useState<NodeJS.Timeout | null>(null);
  const router = useRouter();
  const { data: categoryData } = useGetCategoriesQuery(undefined);
  const { data: shopData } = useGetShopsQuery(undefined);
  const handleMouseEnter = (menu: string) => {
    if (menuTimeout) clearTimeout(menuTimeout); // Cancel any pending timeout
    setActiveMegaMenu(menu);
  };

  const handleMouseLeave = () => {
    const timeout = setTimeout(() => setActiveMegaMenu(null), 200); // Delay hiding
    setMenuTimeout(timeout);
  };

  return (
    <nav>
      <ul className="lg:flex hidden space-x-8 ml-12 mt-4">
        <li className="relative">
          <a href="/products" className="hover:text-green-600">
            Products
          </a>
        </li>

        {/* Categories Menu */}
        <li
          className="relative"
          onMouseEnter={() => handleMouseEnter("categories")}
          onMouseLeave={handleMouseLeave}
        >
          <a
            href="/categories"
            className="flex items-center hover:text-green-600"
          >
            Categories
            <span className="ml-2">
              {activeMegaMenu === "categories" ? (
                <HiChevronUp />
              ) : (
                <HiChevronDown />
              )}
            </span>
          </a>
          {activeMegaMenu === "categories" && (
            <div className="absolute left-0 top-full mt-2 bg-white text-gray-800 p-6 grid grid-cols-2 sm:grid-cols-4 gap-4 rounded-lg shadow-xl xl:w-[1000px] w-[80vw] cursor-pointer max-h-[400px] overflow-y-auto transition-all duration-300 ease-in-out z-50">
              {categoryData?.data?.map((category: any) => (
                <div
                  onClick={() => router.push(`/categories/${category?.id}`)}
                  key={category.id}
                  className="group relative overflow-hidden rounded-md hover:shadow-lg transition-shadow duration-300"
                >
                  <img
                    src={category?.image}
                    alt={category?.name}
                    className="w-full h-32 object-cover rounded-t-md group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="p-4 bg-gray-100 group-hover:bg-green-50 transition-colors duration-300 rounded-lg">
                    <h3 className="font-semibold text-lg text-gray-800 group-hover:text-green-600">
                      {category?.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {category?.description ||
                        "Explore amazing products in this category."}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </li>

        {/* Shops Menu */}
        <li
          className="relative"
          onMouseEnter={() => handleMouseEnter("shops")}
          onMouseLeave={handleMouseLeave}
        >
          <a href="/shops" className="flex items-center hover:text-green-600">
            Shops
            <span className="ml-2">
              {activeMegaMenu === "shops" ? <HiChevronUp /> : <HiChevronDown />}
            </span>
          </a>
          {activeMegaMenu === "shops" && (
            <div className="absolute left-0 top-full mt-2 bg-white text-gray-800 p-6 grid grid-cols-2 sm:grid-cols-3 gap-4 rounded-lg shadow-xl xl:w-[900px] w-[60vw] cursor-pointer max-h-[400px] overflow-y-auto transition-all duration-300 ease-in-out z-50">
              {shopData?.data?.map((shop: any) => (
                <div
                  onClick={() => router.push(`/shops/${shop?.id}`)}
                  key={shop.id}
                  className="group relative overflow-hidden rounded-md hover:shadow-lg transition-shadow duration-300"
                >
                  <img
                    src={shop?.logo}
                    alt={shop?.name}
                    className=" h-24 mx-auto object-contain rounded-t-md group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="p-4 bg-gray-50 group-hover:bg-green-50 transition-colors duration-300 rounded-lg">
                    <h3 className="font-semibold text-lg text-gray-800 group-hover:text-green-600">
                      {shop?.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {shop?.description?.slice(0,30) ||
                        "Explore amazing products in this shop."}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </li>

        <li className="relative">
          <a href="/flash-sales" className="hover:text-green-600">
            Flash Sales
          </a>
        </li>
        <li className="relative">
          <a href="/recent-products" className="hover:text-green-600">
            Recently Viewed
          </a>
        </li>
        <li className="relative">
          <a href="/order-history" className="hover:text-green-600">
            Order History
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Menu;
