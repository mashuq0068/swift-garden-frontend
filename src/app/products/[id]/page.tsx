/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useGetSingleProductQuery } from "@/redux/features/product/productApi";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { addItem } from "@/redux/features/cart/cartSlice";
import toast from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";
import ReactStarRatings from "react-star-ratings";
import Link from "next/link";
import { useGetSingleCategoryQuery } from "@/redux/features/category/category.api";
import Image from "next/image";

const ProductPage = () => {
  const params = useParams();
  const router = useRouter();
  const cart = useAppSelector((state) => state.cart);
 
  const dispatch = useAppDispatch();
  const { data , isLoading } = useGetSingleProductQuery(params.id);
  const {data:category} = useGetSingleCategoryQuery(data?.data?.categoryId , {skip : isLoading })
console.log(category);
  const addToCart = (product: any) => {
    if (!product || !product.shopId) return;

    if (cart.items.length > 0) {
      const existingShopId = cart.items[0].shopId;
      if (existingShopId !== product.shopId) {
        toast.error(
          "You cannot add products from different shops to the cart."
        );
        return;
      }
    }

    dispatch(addItem(product));
    toast.success("Product added to the cart.");
  };
  const handleProductClick = (id: string) => {
    router.push(`/products/${id}`);
  };

  return (
    <>
    <div className=" min-h-screen container mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className=" mx-auto  overflow-hidden">
        <div className="lg:flex gap-12">
          {/* Left Side: Image */}
          <div className="lg:w-1/2 p-6 bg-white shadow-md rounded-lg  items-center ">
            <img
              src={data?.data?.photo}
              alt={data?.data?.name || "Product Image"}
              className="rounded-lg object-cover max-h-[300px] w-full h-auto max-w-md shadow-sm"
            />
            <p className="text-lg text-gray-600 mt-4 leading-relaxed">
              {data?.data?.description || "No description available."}
            </p>
          </div>

          {/* Right Side: Details and Actions */}
          <div className="lg:w-1/2 h-max  p-6 bg-white shadow-md rounded-lg flex flex-col justify-between">
            <div>
              <h2 className="text-4xl font-bold text-gray-800 mb-4">
                {data?.data?.name || "Product Name"}
              </h2>

              {/* Product Rating */}
              <div className="mb-4">
                <ReactStarRatings
                  rating={4.5} // Static rating for now
                  starRatedColor="gold"
                  numberOfStars={5}
                  starDimension="20px"
                  starSpacing="2px"
                  name="rating"
                />
                <p className="text-sm text-gray-500 mt-1">4.5 out of 5 stars</p>
              </div>

              <div className="mb-6">
                <p className="text-2xl font-semibold text-green-600">
                  ${data?.data?.price || 0} / kg
                </p>
              </div>

              {/* Additional Details */}
              <div className="space-y-2 mb-2">
                <p className="text-lg font-thin text-gray-700">
                  <strong>Availability:</strong> In Stock
                </p>
                <p className="text-lg font-thin text-gray-700">
                  <strong>Shipping:</strong> Free delivery on orders over $50
                </p>
                <p className="text-lg font-thin text-gray-700">
                  <strong>Weight:</strong> 1kg
                </p>
                <p className="text-lg font-thin text-gray-700">
                  <strong>Shop Name:</strong> {data?.data?.shop?.name}
                </p>
                <p className="text-lg font-thin text-gray-700">
                  <strong>Category:</strong> {data?.data?.category?.name}
                </p>
              </div>

              {/* Inventory */}
              <div className="flex items-center space-x-4 mb-8">
                <span className="text-lg font-medium text-gray-700">
                  Inventory:
                </span>
                <span className="text-lg font-semibold text-gray-500">
                  {data?.data?.inventory || 0}
                </span>
              </div>
            </div>

            <div className="flex gap-3">
              {/* Add to Cart */}
              <button
                onClick={() => addToCart(data?.data)}
                className="px-6 py-3 max-w-[250px] bg-green-500 text-white  text-lg rounded-lg hover:bg-green-600 transition-all duration-300 shadow-md"
              >
                Add to Cart
              </button>
              {/* Add to Cart */}
              <Link
                href={`/shops/${data?.data?.shopId}`}
                className="px-6 py-3 max-w-[250px] bg-green-500 text-white  text-lg rounded-lg hover:bg-green-600 transition-all duration-300 shadow-md"
              >
                Visit Shop
              </Link>
            </div>
          </div>
        </div>

        {/* Comments Section */}
        <div className="mt-12 p-6 bg-white shadow-md rounded-lg">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">
            Customer Reviews
          </h3>

          <div className="space-y-6">
            {/* Comment 1 */}
            <div className="flex space-x-4 items-start">
              <img
                src="https://randomuser.me/api/portraits/men/32.jpg"
                alt="User Profile"
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h4 className="font-semibold text-gray-800">John Doe</h4>
                <ReactStarRatings
                  rating={5}
                  starRatedColor="gold"
                  numberOfStars={5}
                  starDimension="16px"
                  starSpacing="2px"
                  name="rating"
                />
                <p className="text-gray-600 mt-2">
                  {`"Excellent quality! These ${data?.data?.name?.toLowerCase()} were fresh and perfect for my salad. Highly recommend!"`}
                </p>
              </div>
            </div>

            {/* Comment 2 */}
            <div className="flex space-x-4 items-start">
              <img
                src="https://randomuser.me/api/portraits/women/45.jpg"
                alt="User Profile"
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h4 className="font-semibold text-gray-800">Jane Smith</h4>
                <ReactStarRatings
                  rating={4}
                  starRatedColor="gold"
                  numberOfStars={5}
                  starDimension="16px"
                  starSpacing="2px"
                  name="rating"
                />
                <p className="text-gray-600 mt-2">
                  {`"Good ${
                    data?.data?.name?.toLowerCase() || "products"
                  }, but slightly overripe for my liking. Still great for sauces."`}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="min-h-screen container mx-auto px-6 ">
          {/* <h1 className="text-center text-4xl mb-12 font-bold text-gray-800">
      Our <span className="text-green-500">Products</span>
    </h1> */}
          <div className=" mx-auto ">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {category?.data?.products?.map((product: any, i: number) => (
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
    </>
  );
};

export default ProductPage;
