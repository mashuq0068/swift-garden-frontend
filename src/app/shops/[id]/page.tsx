/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import CustomerReviews from "@/components/shop/CustomerReviews";
import { useGetSingleShopQuery } from "@/redux/features/shop/shopApi";
import { useParams, useRouter } from "next/navigation";

const ShopProductsPage = () => {
  const params = useParams();
  const router = useRouter();
  const { data } = useGetSingleShopQuery(params.id);
  const shop = data?.data;
  console.log(shop);

  const handleProductClick = async (id: string) => {
    router.push(`/products/${id}`);
  };

  return (
    <div className="min-h-screen mt-14">
      {/* Shop Banner */}
      <div className="bg-white shadow-md rounded-lg mx-auto w-11/12 p-6 mb-8">
        <div className="flex items-center gap-6">
          {/* Shop Logo */}
          <div className="w-24 h-24 rounded-full overflow-hidden">
            <img
              src={shop?.logo || "/placeholder-logo.png"}
              alt={`${shop?.name} logo`}
              className="h-full w-full object-cover"
            />
          </div>
          {/* Shop Details */}
          <div>
            <h1 className="text-2xl font-bold text-gray-800">{shop?.name}</h1>
            <p className="text-gray-600 mt-2">
              {shop?.description || "No description available."}
            </p>
            <p className="text-gray-500 mt-1">
              <span className="font-medium text-gray-700">Followers: </span>
              {shop?.Follower?.length }
            </p>
          </div>
        </div>
      </div>

      <CustomerReviews />

      {/* Products Section */}
      <div className="container mx-auto mt-8 px-4">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-8"><span className=" text-green-500">Explore</span> Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {shop?.Product && shop?.Product.length > 0 ? (
            shop.Product.map((product: any, i: number) => (
              <div
                onClick={() => handleProductClick(product?.id)}
                key={i}
                className="bg-white cursor-pointer rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
              >
                {/* Image Section */}
                <div className="relative h-56">
                  <img
                    src={product.photo || "/placeholder-product.png"}
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
                    {product.description || "No description available."}
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
            <p className="text-center mx-auto text-gray-500 mt-12">
              No products found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShopProductsPage;
