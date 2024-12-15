/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useGetSingleShopQuery } from "@/redux/features/shop/shopApi";
import { useParams, useRouter } from "next/navigation";

const ShopProductsPage = () => {
  const params = useParams();
  const router = useRouter();
  const { data } = useGetSingleShopQuery(params.id);
  console.log("shop data",data);

  const handleProductClick = async (id: string) => {
    router.push(`/products/${id}`);
  };
  return (
    <div className="min-h-screen mt-14 ">
      <h1 className="text-center text-4xl mb-12 font-bold text-gray-800">
     {data?.data?.name} <span className="text-green-500">Products</span>
  </h1>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {data?.data?.Product && data?.data?.Product?.length > 0 ? (
            data?.data?.Product?.map((product: any, i: number) => (
              <div
                onClick={() => handleProductClick(product?.id)}
                key={i}
                className="bg-white cursor-pointer rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
              >
                {/* Image Section */}
                <div className="relative h-56">
                  <img
                    src={product.photo}
                    alt={product.name}
                    className="h-full w-full object-contain"
                  />

                  <span className="absolute top-2 left-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded">
                    New
                  </span>
                </div>
                {/* Content Section */}
                <div className="p-4 space-y-2">
                  <h3 className="text-gray-800 font-medium text-lg truncate">
                    {product.name}
                  </h3>
                  <p className="text-gray-500 text-sm line-clamp-2">
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-semibold text-gray-900">
                      €{product.price.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className=" text-center mx-auto relative left-[35vw] w-max mt-12 text-gray-500">No recent products found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShopProductsPage;
