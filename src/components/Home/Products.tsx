/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useCreateRecentProductMutation } from "@/redux/features/recentProducts/recentProductsApi";
import { useAppSelector } from "@/redux/hooks";
import useLoadingStore from "@/store/loadingStore";
import Aos from "aos";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {  useEffect, useState } from "react";

const Products = () => {
  const search = useAppSelector((state) => state.search);
  const [url, seturl] = useState(
    "https://swift-garden-backend.vercel.app/api/products"
  );
  const [addToRecentProduct] = useCreateRecentProductMutation();
  const auth = useAppSelector((state) => state.auth);
  const router = useRouter();
  const filter = useAppSelector((state) => state.filter);
  const [products, setProducts] = useState([]);
  const { setLoading } = useLoadingStore();

  const fetchProducts = async () => {
    setLoading(true);

    try {
      const filterParams = new URLSearchParams();
      // Add categories
      if (filter.categories.length > 0) {
        filter.categories.forEach((category) => {
          filterParams.append("filters[categories][]", category.toString());
        });
      }

      // Add price range
      const { min, max } = filter.priceRange;
      if (min) {
        filterParams.append("filters[minPrice]", min.toString());
      }
      if (max) {
        filterParams.append("filters[maxPrice]", max.toString());
      }

      // Check if filterParams has any keys (if it's not empty)
      if (filterParams && filterParams.toString()) {
        seturl(
          `https://swift-garden-backend.vercel.app/api/products?${filterParams.toString()}`
        ); // Append filter params to the URL
      }

      const response = await fetch(`${url}`);

      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }

      const data = await response.json();
      setProducts(data?.data);
    } catch (err: any) {
      console.log(err?.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [filter.categories, filter.priceRange]);

  useEffect(() => {
    if (!search.searchTerm) {
      fetchProducts() // Reset to all products when search.searchTerm term is cleared
      return;
    }
    const filtered = products.filter((product: any) =>
      product.name.toLowerCase().includes(search.searchTerm)
    );
    setProducts(filtered);
  }, [search.searchTerm]);

  useEffect(() => {
    Aos.init({
      duration: 2000,
    });
  }, []);

  const handleProductClick = async (id: string) => {
    try {
      await addToRecentProduct({ productId: id, userId: auth.id });
      router.push(`/products/${id}`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen mt-14">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products?.map((product: any, i: number) => (
            <div
              onClick={() => handleProductClick(product.id)}
              data-aos="fade-right"
              key={i}
              className="bg-white cursor-pointer rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
            >
              {/* Image Section */}
              <div className="relative h-56">
                <img
                  src={product.photo}
                  alt={product.title}
                  className="h-full w-full object-contain"
                />

                {/* Shop Name Badge */}

                <span className="absolute top-2 left-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded">
                  New
                </span>
              </div>

              {/* Content Section */}
              <div className="p-4 space-y-2">
                <h3 className="text-gray-800 flex justify-between font-medium text-lg truncate">
                  {product.name}
                  <Image
                    src={product.shop.logo}
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

export default Products;
