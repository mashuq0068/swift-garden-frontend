/* eslint-disable react/no-unescaped-entities */
'use client';

import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FaSearch, FaShoppingCart, FaTruck } from 'react-icons/fa';

const BuyingProcess = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 }); // Initialize AOS for animations
  }, []);

  return (
    <section className="py-16 ">
      <div className="max-w-7xl mx-auto px-6 sm:px-12">
        <h2
          className="text-2xl font-extrabold text-gray-800 text-center mb-12"
          data-aos="fade-up"
        >
          How to <span className="text-green-600">Buy Vegetables</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Step 1 */}
          <div
            className="relative bg-white border border-gray-200 shadow-md rounded-xl p-8 text-center hover:shadow-lg transition-shadow duration-300"
            data-aos="fade-up"
          >
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-green-600 bg-green-100 p-3 rounded-full">
              <FaSearch size={28} />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mt-8">Step 1: Browse</h3>
            <p className="text-gray-600 mt-4">
              Explore our wide range of fresh vegetables using the category filters or search bar.
            </p>
          </div>

          {/* Step 2 */}
          <div
            className="relative bg-white border border-gray-200 shadow-md rounded-xl p-8 text-center hover:shadow-lg transition-shadow duration-300"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-green-600 bg-green-100 p-3 rounded-full">
              <FaShoppingCart size={28} />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mt-8">
              Step 2: Add to Cart
            </h3>
            <p className="text-gray-600 mt-4">
              Select the vegetables you like and add them to your cart for easy checkout.
            </p>
          </div>

          {/* Step 3 */}
          <div
            className="relative bg-white border border-gray-200 shadow-md rounded-xl p-8 text-center hover:shadow-lg transition-shadow duration-300"
            data-aos="fade-up"
            data-aos-delay="400"
          >
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-green-600 bg-green-100 p-3 rounded-full">
              <FaTruck size={28} />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mt-8">Step 3: Delivery</h3>
            <p className="text-gray-600 mt-4">
              Place your order, and we'll deliver fresh vegetables right to your doorstep.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BuyingProcess;
