/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";


import { useGetSingleProductQuery } from "@/redux/features/product/productApi";
import { useAppDispatch, useAppSelector} from "@/redux/hooks";
import { addItem } from "@/redux/features/cart/cartSlice";
import toast from "react-hot-toast";
import { useParams } from "next/navigation";



const ProductPage = () => {
  const params = useParams();
  const cart = useAppSelector((state) => state.cart)
  console.log(cart);

  const dispatch = useAppDispatch();
  const { data } = useGetSingleProductQuery(params.id);
  console.log(data?.data);

  const addToCart = (data: any) => {
    if (!data || !data.shopId) return; // Ensure product and shopId exist
console.log(cart);
    // Check if there are items in the cart
    if (cart.items.length > 0) {
      // Verify if shopId matches existing shopId in the cart
      const existingShopId = cart.items[0].shopId;
      console.log("existed", existingShopId);
      console.log("new",data?.shopId);
      if (existingShopId !== data?.shopId) {
        toast.error("You cannot add products from different shops to the cart.");
        return; // Exit function without dispatching addItem
      }
    }

    // Dispatch addItem if shopId matches or cart is empty
    dispatch(addItem(data));
    toast.success("Product added to the cart.");
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        <div className="lg:flex">
          {/* Product Image Section */}
          <div className="lg:w-1/2">
            <div className="relative pb-2/3">
              <img
                src={data?.data?.photo}
                alt="Vegetable"
                height={400}
                width={400}
                className="rounded-lg object-cover"
              />
            </div>
          </div>

          {/* Product Information Section */}
          <div className="lg:w-1/2 px-6 py-8">
            <h2 className="text-3xl font-semibold text-gray-800">
              {data?.data?.name}
            </h2>
            <p className="mt-2 text-gray-500 text-lg">
              {data?.data?.description}
            </p>
            <div className="mt-4">
              <p className="text-2xl font-semibold text-green-500">
                ${data?.data?.price} / kg
              </p>
            </div>

            {/* Quantity Selector */}
            <div className="mt-6 flex items-center space-x-4">
              <label
                htmlFor="quantity"
                className="text-lg font-medium text-gray-700"
              >
                inventory:
              </label>
              <p className=" text-gray-500 text-lg">{data?.data?.inventory}</p>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={() => addToCart(data?.data)}
              className="mt-8 px-8 py-3 bg-green-500 text-white font-semibold text-lg rounded-lg hover:bg-green-600 transition-all duration-300"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
