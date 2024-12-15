"use client";
import React from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  removeItem,
  updateQuantity,
  clearCart,
} from "@/redux/features/cart/cartSlice";
import { useRouter } from "next/navigation";
import Link from "next/link";

const CartPage: React.FC = () => {
  
  const router = useRouter();
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state.cart); 
  console.log(cart);// Get cart from Redux state

  const handleQuantityChange = (id: number, quantity: number) => {
    if (quantity === 0) {
      dispatch(removeItem(id)); // Remove item if quantity is 0
    } else {
      dispatch(updateQuantity({ id, quantity })); // Update item quantity
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Order Section */}
        <div className="lg:col-span-8 bg-white p-8 rounded-lg shadow-md">
          <div className="flex justify-between">
            <h2 className="text-2xl font-medium mb-6 text-gray-800">
              Your Order
            </h2>
            <button
              onClick={() => dispatch(clearCart())}
              className=" bg-red-500 text-white btn-primary h-max rounded-lg hover:bg-red-600"
            >
              Clear Cart
            </button>
          </div>

          {/* Item List */}
          {cart.items.map((item) => (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row items-center justify-between mb-6 p-4 bg-gray-100 rounded-lg shadow-sm transition-all space-y-4 sm:space-y-0"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={item.photo}
                  alt={item.name}
                  className="w-16 h-16 bg-gray-300 rounded-lg object-cover"
                />
                <div>
                  <h3 className="text-lg font-medium text-gray-800">
                    {item.name}
                  </h3>
                  <p className="text-green-500 font-medium">
                    ${item.price * item.quantity}
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
                {/* Quantity Controls */}
                <div className="flex items-center space-x-2">
                  <button
                    className="py-1 px-3 text-lg text-black bg-red-300 rounded"
                    onClick={() =>
                      handleQuantityChange(item.id, item.quantity - 1)
                    }
                  >
                    -
                  </button>
                  <span className="text-lg font-medium text-gray-800">
                    {item.quantity}
                  </span>
                  <button
                    className="py-1 px-3 text-lg bg-green-500 text-white rounded"
                    onClick={() =>
                      handleQuantityChange(item.id, item.quantity + 1)
                    }
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          ))}
          {cart?.items?.length === 0 && (
            <div className=" flex mt-8 justify-center h-full">
              <p className=" text-lg text-center  text-gray-500">
                No Items added
              </p>
            </div>
          )}
        </div>

        {/* Payment Summary */}
        <div className="lg:col-span-4 space-y-8">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-medium mb-6 text-gray-800">
              Payment Summary
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between">
                <p className="text-gray-600">Total Items</p>
                <p className="font-medium text-gray-900">
                  {cart.totalQuantity}
                </p>
              </div>
              <div className="flex justify-between">
                <p className="text-gray-600">Total Price</p>
                <p className="font-medium text-gray-900">${cart.totalPrice}</p>
              </div>
              <div className="flex justify-between font-medium text-xl text-gray-900">
                <p>Total Amount</p>
                <p>${cart.totalPrice}</p>
              </div>
            </div>
            <Link
              href="/stripe-payment"
              className="mt-4 w-full btn-primary inline-block px-4 py-2 text-center bg-green-500 text-white hover:bg-green-600 rounded-lg"
            >
              Go For Payment
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
