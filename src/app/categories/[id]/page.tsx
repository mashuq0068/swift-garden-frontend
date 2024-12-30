/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useGetSingleCategoryQuery } from "@/redux/features/category/category.api";
import { useAppSelector } from "@/redux/hooks";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const CategoryProductsPage = () => {
  const params = useParams();
  const { searchTerm } = useAppSelector((state) => state.search);
  const { data } = useGetSingleCategoryQuery(params.id);
  const router = useRouter();
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);

  // Handle product click
  const handleProductClick = (id: string) => {
    router.push(`/products/${id}`);
  };

  // Filter products based on search term
  useEffect(() => {
    if (data?.data?.products) {
      const products = data.data.products;
      const filtered = searchTerm
        ? products.filter((product: any) =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase())
          )
        : products;

      setFilteredProducts(filtered);
    }
  }, [searchTerm, data]);
  return (
    <div className="min-h-screen mt-14 ">
      {/* <h1 className="text-center text-4xl mb-12 font-bold text-gray-800">
  Our <span className="text-green-500">Products</span>
</h1> */}
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts?.map((product: any, i: number) => (
            <div
              onClick={() => handleProductClick(product.id)}
              key={i}
              className="bg-white cursor:pointer rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
            >
              {/* Image Section */}
              <div className="relative h-56">
                <img
                  src={product.photo}
                  alt={product.title}
                  className="h-full w-full object-contain"
                />

                <span className="absolute top-2 left-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded">
                  New
                </span>
              </div>
              {/* Content Section */}
              <div className="p-4 space-y-2">
                <h3 className="text-gray-800 flex justify-between font-medium text-lg truncate">
                  {product.name}
                  <Image
                    src={product?.shop?.logo}
                    alt="product"
                    className="rounded-full object-cover"
                    width={30}
                    height={30}
                  />
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
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryProductsPage;
