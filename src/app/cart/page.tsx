"use client"; // Add this directive at the top

import React, { useState } from 'react';

const CartPage = () => {
  const [selectedDelivery, setSelectedDelivery] = useState("dpd");
  const [selectedServices, setSelectedServices] = useState({
    carePackage: false,
    environmentFriendly: false,
    goldenGuard: false,
  });

  const handleServiceToggle = (service) => {
    setSelectedServices((prev) => ({
      ...prev,
      [service]: !prev[service],
    }));
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Main Content */}
      <div className="container mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Order Section */}
        <div className="lg:col-span-8 bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-medium mb-6 text-gray-800">Your Order</h2>

          {/* Item List */}
          {[ 
            {
              id: 1,
              name: "Fresh Organic Carrots",
              color: "Orange",
              size: "1kg",
              price: 3.5,
              originalPrice: 4.0,
              image: "https://example.com/images/carrot.jpg",
              tags: ["Organic", "Fresh"],
            },
            {
              id: 2,
              name: "Green Lettuce",
              color: "Green",
              size: "500g",
              price: 2.0,
              originalPrice: 2.5,
              image: "https://example.com/images/lettuce.jpg",
              tags: ["Organic", "Fresh"],
            },
            {
              id: 3,
              name: "Tomato Bunch",
              color: "Red",
              size: "1kg",
              price: 4.0,
              originalPrice: null,
              image: "https://example.com/images/tomato.jpg",
              tags: ["Fresh", "Vegan"],
            },
          ].map((item) => (
            <div key={item.id} className="flex items-center justify-between mb-6 p-4 bg-gray-100 rounded-lg shadow-sm transition-all hover:bg-gray-200">
              <div className="flex items-center space-x-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 bg-gray-300 rounded-lg object-cover"
                />
                <div>
                  <h3 className="text-lg font-medium text-gray-800">{item.name}</h3>
                  <p className="text-sm text-gray-500">Color: {item.color}</p>
                  <p className="text-sm text-gray-500">Size: {item.size}</p>
                  <div className="flex space-x-2 mt-2">
                    {item.tags.map((tag) => (
                      <span key={tag} className="text-xs text-white bg-green-500 py-1 px-2 rounded-full">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="text-right space-y-1">
                <p className="text-red-500 font-medium">${item.price}</p>
                {item.originalPrice && (
                  <p className="text-sm text-gray-500 line-through">${item.originalPrice}</p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Payment Summary */}
        <div className="lg:col-span-4 space-y-8">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-medium mb-6 text-gray-800">Payment Summary</h2>
            <div className="space-y-4">
              <div className="flex justify-between">
                <p className="text-gray-600">Order Summary</p>
                <p className="font-medium text-gray-900">$122</p>
              </div>
              <div className="flex justify-between">
                <p className="text-gray-600">Additional Service</p>
                <p className="font-medium text-gray-900">$10</p>
              </div>
              <div className="flex justify-between font-medium text-xl text-gray-900">
                <p>Total Amount</p>
                <p>$132</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
