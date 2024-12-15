/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useGetSingleRecentProductQuery } from "@/redux/features/recentProducts/recentProductsApi";
import { useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";

const RecentProductsPage = () => {
  const router = useRouter();
  const auth = useAppSelector((state) => state.auth);
  const { data } = useGetSingleRecentProductQuery(auth.id);
  console.log(data);

  const handleProductClick = async (id: string) => {
    router.push(`/products/${id}`);
  };
  return (
    <div className="min-h-screen mt-14 ">
      {/* <h1 className="text-center text-4xl mb-12 font-bold text-gray-800">
      Our <span className="text-green-500">Products</span>
    </h1> */}
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {data?.data && data.data.length > 0 ? (
            data.data.map((recentProduct: any, i: number) => (
              <div
                onClick={() => handleProductClick(recentProduct?.product?.id)}
                
                key={i}
                className="bg-white cursor-pointer rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
              >
                {/* Image Section */}
                <div className="relative h-56">
                  <img
                    src={recentProduct?.product.photo}
                    alt={recentProduct?.product.name}
                    className="h-full w-full object-contain"
                  />

                  <span className="absolute top-2 left-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded">
                    New
                  </span>
                </div>
                {/* Content Section */}
                <div className="p-4 space-y-2">
                  <h3 className="text-gray-800 font-medium text-lg truncate">
                    {recentProduct?.product.name}
                  </h3>
                  <p className="text-gray-500 text-sm line-clamp-2">
                    {recentProduct?.product.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-semibold text-gray-900">
                      €{recentProduct?.product.price.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No recent products found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecentProductsPage;
