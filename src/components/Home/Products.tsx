/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useCreateRecentProductMutation } from "@/redux/features/recentProducts/recentProductsApi";
import { useAppSelector } from "@/redux/hooks";
import useLoadingStore from "@/store/loadingStore";
import Aos from "aos";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Products = () => {
  // const products = [
  //   {
  //     id: 1,
  //     title: "Fresh Organic Fruit (50gm)",
  //     description: "Delicious organic fruit packed with nutrients.",
  //     price: 150,
  //     image: "/images/veg-1.png",
  //     categoryId: "1a67d6ba-5532-4fbb-a80b-83e6ef509920",
  //     shopId: "02bc7036-8505-415c-a0dc-e59fd99d3043",
  //   },
  //   {
  //     id: 2,
  //     title: "Orange Juice (5ltr)",
  //     description: "Freshly squeezed orange juice.",
  //     price: 150,
  //     image: "/images/veg-2.png",
  //     categoryId: "1a67d6ba-5532-4fbb-a80b-83e6ef509920",
  //     shopId: "02bc7036-8505-415c-a0dc-e59fd99d3043",
  //   },
  //   {
  //     id: 3,
  //     title: "Fresh Dried Almond (50g)",
  //     description: "High-quality dried almonds.",
  //     price: 200,
  //     image: "/images/veg-3.png",
  //     categoryId: "1a67d6ba-5532-4fbb-a80b-83e6ef509920",
  //     shopId: "02bc7036-8505-415c-a0dc-e59fd99d3043",
  //   },
  //   {
  //     id: 4,
  //     title: "Shrimp - Jumbo (5 lb)",
  //     description: "Fresh jumbo shrimps.",
  //     price: 230,
  //     image: "/images/veg-4.png",
  //     categoryId: "d5f537f2-5823-40bd-a10f-e94523a45b0e",
  //     shopId: "071dddd9-33c8-4dd7-9466-0c335c8b69e5",
  //   },
  //   {
  //     id: 5,
  //     title: "Sp. Red Fresh Guava",
  //     description: "Sweet and juicy guavas.",
  //     price: 42,
  //     image: "/images/veg-6.png",
  //     categoryId: "d5f537f2-5823-40bd-a10f-e94523a45b0e",
  //     shopId: "071dddd9-33c8-4dd7-9466-0c335c8b69e5",
  //   },
  //   {
  //     id: 1,
  //     title: "Fresh Organic Fruit (50gm)",
  //     description: "Delicious organic fruit packed with nutrients.",
  //     price: 150,
  //     image: "/images/veg-1.png",
  //     categoryId: "85a8ee6f-ce45-44b8-a77f-8fa85520c81a",
  //     shopId: "278e0e8b-2f50-448e-8948-411eebf52dee",
  //   },
  //   {
  //     id: 2,
  //     title: "Orange Juice (5ltr)",
  //     description: "Freshly squeezed orange juice.",
  //     price: 150,
  //     image: "/images/veg-2.png",
  //     categoryId: "85a8ee6f-ce45-44b8-a77f-8fa85520c81a",
  //     shopId: "278e0e8b-2f50-448e-8948-411eebf52dee",
  //   },
  //   {
  //     id: 3,
  //     title: "Fresh Dried Almond (50g)",
  //     description: "High-quality dried almonds.",
  //     price: 200,
  //     image: "/images/veg-3.png",
  //     categoryId: "85a8ee6f-ce45-44b8-a77f-8fa85520c81a",
  //     shopId: "278e0e8b-2f50-448e-8948-411eebf52dee",
  //   },
  //   {
  //     id: 4,
  //     title: "Shrimp - Jumbo (5 lb)",
  //     description: "Fresh jumbo shrimps.",
  //     price: 230,
  //     image: "/images/veg-4.png",
  //     categoryId: "85a8ee6f-ce45-44b8-a77f-8fa85520c81a",
  //     shopId: "278e0e8b-2f50-448e-8948-411eebf52dee",
  //   },
  //   {
  //     id: 5,
  //     title: "Sp. Red Fresh Guava",
  //     description: "Sweet and juicy guavas.",
  //     price: 42,
  //     image: "/images/veg-6.png",
  //     categoryId: "60e4a1a1-8572-4022-82f0-ffa3791a6f57",
  //     shopId: "5dbf2a54-3982-48d1-b475-c368250dd36a",
  //   },
  //   {
  //     id: 1,
  //     title: "Fresh Organic Fruit (50gm)",
  //     description: "Delicious organic fruit packed with nutrients.",
  //     price: 150,
  //     image: "/images/veg-1.png",
  //     categoryId: "60e4a1a1-8572-4022-82f0-ffa3791a6f57",
  //     shopId: "5dbf2a54-3982-48d1-b475-c368250dd36a",
  //   },
  //   {
  //     id: 2,
  //     title: "Orange Juice (5ltr)",
  //     description: "Freshly squeezed orange juice.",
  //     price: 150,
  //     image: "/images/veg-2.png",
  //     categoryId: "60e4a1a1-8572-4022-82f0-ffa3791a6f57",
  //     shopId: "5dbf2a54-3982-48d1-b475-c368250dd36a",
  //   },
  //   {
  //     id: 3,
  //     title: "Fresh Dried Almond (50g)",
  //     description: "High-quality dried almonds.",
  //     price: 200,
  //     image: "/images/veg-3.png",
  //     categoryId: "d8c8969c-7248-4b65-af14-c369179ff36d",
  //     shopId: "c31dd2cd-5f49-493f-91d3-0fdd2bea115c",
  //   },
  //   {
  //     id: 4,
  //     title: "Shrimp - Jumbo (5 lb)",
  //     description: "Fresh jumbo shrimps.",
  //     price: 230,
  //     image: "/images/veg-4.png",
  //     categoryId: "d8c8969c-7248-4b65-af14-c369179ff36d",
  //     shopId: "c31dd2cd-5f49-493f-91d3-0fdd2bea115c",
  //   },
  //   {
  //     id: 5,
  //     title: "Sp. Red Fresh Guava",
  //     description: "Sweet and juicy guavas.",
  //     price: 42,
  //     image: "/images/veg-6.png",
  //     categoryId: "d8c8969c-7248-4b65-af14-c369179ff36d",
  //     shopId: "c31dd2cd-5f49-493f-91d3-0fdd2bea115c",
  //   },
  //   {
  //     id: 4,
  //     title: "Shrimp - Jumbo (5 lb)",
  //     description: "Fresh jumbo shrimps.",
  //     price: 230,
  //     image: "/images/veg-4.png",
  //     categoryId: "d8c8969c-7248-4b65-af14-c369179ff36d",
  //     shopId: "c31dd2cd-5f49-493f-91d3-0fdd2bea115c",
  //   },
  //   {
  //     id: 5,
  //     title: "Sp. Red Fresh Guava",
  //     description: "Sweet and juicy guavas.",
  //     price: 42,
  //     image: "/images/veg-6.png",
  //     categoryId: "0b2c1eed-65cc-4afc-ab8b-185fa24b725a",
  //     shopId: "1474b7d6-10d6-4188-ab34-c31dec48b19d",
  //   },
  //   {
  //     id: 1,
  //     title: "Fresh Organic Fruit (50gm)",
  //     description: "Delicious organic fruit packed with nutrients.",
  //     price: 150,
  //     image: "/images/veg-1.png",
  //     categoryId: "0b2c1eed-65cc-4afc-ab8b-185fa24b725a",
  //     shopId: "1474b7d6-10d6-4188-ab34-c31dec48b19d",
  //   },
  //   {
  //     id: 2,
  //     title: "Orange Juice (5ltr)",
  //     description: "Freshly squeezed orange juice.",
  //     price: 150,
  //     categoryId: "0b2c1eed-65cc-4afc-ab8b-185fa24b725a",
  //     shopId: "1474b7d6-10d6-4188-ab34-c31dec48b19d",
  //   },
  //   {
  //     id: 4,
  //     title: "Shrimp - Jumbo (5 lb)",
  //     description: "Fresh jumbo shrimps.",
  //     price: 230,
  //     image: "/images/veg-4.png",
  //     categoryId: "0b2c1eed-65cc-4afc-ab8b-185fa24b725a",
  //     shopId: "1474b7d6-10d6-4188-ab34-c31dec48b19d",
  //   },
  //   {
  //     id: 5,
  //     title: "Sp. Red Fresh Guava",
  //     description: "Sweet and juicy guavas.",
  //     price: 42,
  //     categoryId: "350983d8-1955-4a0f-9e0d-d91a3554d479",
  //     shopId: "278e0e8b-2f50-448e-8948-411eebf52dee",
  //   },
  //   {
  //     id: 1,
  //     title: "Fresh Organic Fruit (50gm)",
  //     description: "Delicious organic fruit packed with nutrients.",
  //     price: 150,
  //     image: "/images/veg-1.png",
  //     categoryId: "350983d8-1955-4a0f-9e0d-d91a3554d479",
  //     shopId: "278e0e8b-2f50-448e-8948-411eebf52dee",
  //   },
  //   {
  //     id: 2,
  //     title: "Orange Juice (5ltr)",
  //     description: "Freshly squeezed orange juice.",
  //     price: 150,
  //     categoryId: "350983d8-1955-4a0f-9e0d-d91a3554d479",
  //     shopId: "278e0e8b-2f50-448e-8948-411eebf52dee",
  //   },
  // ];
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

      // Add search term
      if (search.searchTerm) {
        filterParams.append("search", search.searchTerm);
      }

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

      const response = await fetch(
        `${url}`
      );

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
  }, [search.searchTerm, filter.categories, filter.priceRange]);

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
