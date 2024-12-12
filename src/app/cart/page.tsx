"use client";

import React, { useState } from "react";
import { useAppDispatch } from "@/redux/hooks";
import {
  removeItem,
  updateQuantity,
  clearCart,
} from "@/redux/features/cart/cartSlice";
import { FiDelete } from "react-icons/fi";

const CartPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const [selectedDelivery, setSelectedDelivery] = useState<string>("dpd");
  const [selectedServices, setSelectedServices] = useState<
    Record<string, boolean>
  >({
    carePackage: false,
    environmentFriendly: false,
    goldenGuard: false,
  });

  const handleServiceToggle = (service: string) => {
    setSelectedServices((prev) => ({
      ...prev,
      [service]: !prev[service],
    }));
  };

  const handleQuantityChange = (id: number, quantity: number) => {
    if (quantity === 0) {
      dispatch(removeItem(id));
    } else {
      dispatch(updateQuantity({ id, quantity }));
    }
  };

  const dummyData = [
    {
      id: 1,
      name: "Tomato",
      price: 2.5,
      quantity: 3,
      photo: "https://via.placeholder.com/150",
    },
    {
      id: 2,
      name: "Potato",
      price: 1.5,
      quantity: 5,
      photo: "https://via.placeholder.com/150",
    },
    {
      id: 3,
      name: "Carrot",
      price: 3,
      quantity: 2,
      photo: "https://via.placeholder.com/150",
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Main Content */}
      <div className="container mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Order Section */}
        <div className="lg:col-span-8 bg-white p-8 rounded-lg shadow-md">
          <div className="flex justify-between">
            <h2 className="text-2xl font-medium mb-6 text-gray-800">
              Your Order
            </h2>
            <button onClick={() => dispatch(clearCart())} className="py-2 px-3 flex items-center gap-2 bg-red-500 h-max text-white rounded hover:bg-red-600">
            <FiDelete />Clear Cart
            </button>
          </div>
          {/* Item List */}
          {dummyData.map((item) => (
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

                {/* Remove Button */}
              </div>
            </div>
          ))}
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
                  {dummyData.reduce((total, item) => total + item.quantity, 0)}
                </p>
              </div>
              <div className="flex justify-between">
                <p className="text-gray-600">Total Price</p>
                <p className="font-medium text-gray-900">
                  $
                  {dummyData.reduce(
                    (total, item) => total + item.price * item.quantity,
                    0
                  )}
                </p>
              </div>
              <div className="flex justify-between font-medium text-xl text-gray-900">
                <p>Total Amount</p>
                <p>
                  $
                  {dummyData.reduce(
                    (total, item) => total + item.price * item.quantity,
                    0
                  )}
                </p>
              </div>
            </div>
            <button
              onClick={() => dispatch(clearCart())}
              className="mt-4 w-full py-2 bg-green-500 text-white rounded-lg"
            >
              Go For Payment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
