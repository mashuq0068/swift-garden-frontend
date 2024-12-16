/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useGetShopsQuery } from "@/redux/features/shop/shopApi";
import { useToggleFollowerMutation } from "@/redux/features/follower/followerApi";
import Link from "next/link";
import { useState } from "react";
import { useAppSelector } from "@/redux/hooks";
import { useGetProfileQuery } from "@/redux/features/user/userApi";

interface Shop {
  id: number;
  name: string;
  logo: string;
  description: string;
}

export default function ShopList() {
  const [followedShops, setFollowedShops] = useState<number[]>([]);

  const auth = useAppSelector((state) => state.auth);
  const { data: profile } = useGetProfileQuery(auth.id);
  console.log("profile", profile);
  const { data, isLoading, error } = useGetShopsQuery(undefined);
  const [toggleFollower, { isLoading: isToggling }] =
    useToggleFollowerMutation();

  const handleFollow = async (shopId: number) => {
    try {
      const status = await toggleFollower({ userId: auth.id, shopId }).unwrap(); // Replace `userId: 1` with the actual user ID.
      console.log(status);
      setFollowedShops((prev) =>
        status === "followed"
          ? [...prev, shopId]
          : prev.filter((id) => id !== shopId)
      );
    } catch (err) {
      console.log("Error toggling follow:", err);
    }
  };

  const handleViewProducts = (shopId: number) => {
    console.log(`Viewing products for shop ${shopId}`);
    // Implement product viewing logic (e.g., navigate to a product page)
  };

  if (isLoading) {
    return <div className="text-center py-10 text-lg">Loading shops...</div>;
  }

  if (error) {
    return (
      <div className="text-center py-10 text-red-500">
        Failed to load shops. Please try again.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="container mx-auto">
        <h1 className="text-3xl font-semibold text-center mb-8">
          Explore <span className="text-green-500">Shops</span>
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {data?.data?.map((shop: Shop) => (
            <div
              key={shop.id}
              className="bg-white shadow-md rounded-lg overflow-hidden transform transition-all duration-300 hover:scale-105"
            >
              <div className="p-6 flex flex-col items-center">
                <img
                  src={shop.logo}
                  alt={shop.name}
                  className="h-24 w-24 object-cover rounded-full mb-4"
                />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {shop.name}
                </h3>
                {/* <p className="text-sm text-gray-600 text-center mb-4">
                  {shop.description}
                </p> */}
                <div className="flex gap-4 w-full justify-center">
                  <button
                    onClick={() => handleFollow(shop.id)}
                    className={`px-4 py-2 rounded-lg text-white ${
                      followedShops.includes(shop.id)
                        ? "bg-green-500 hover:bg-green-600"
                        : "bg-gray-500 hover:bg-gray-600"
                    } transition duration-200 w-1/2`}
                    disabled={isToggling}
                  >
                    {profile?.data?.Follower?.find(
                      (follower: any) => follower.shopId === shop.id
                    )
                      ? "Unfollow"
                      : "Follow"}
                  </button>
                  <Link
                    href={`/shops/${shop.id}`}
                    onClick={() => handleViewProducts(shop.id)}
                    className="px-4 py-2 text-nowrap text-center rounded-lg text-white bg-green-500 hover:bg-green-600 transition duration-200 w-1/2"
                  >
                    View Shop
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
