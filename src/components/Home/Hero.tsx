"use client";
import Aos from "aos";
import { useEffect } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { FiShoppingCart } from "react-icons/fi";
import Logo from "./Logo";

const Hero = () => {
  useEffect(() => {
    Aos.init({
      duration: 1000,
    });
  }, []);
  return (
    <div>
      {/* Header */}
      <header className="p-4 bg-white">
        <div className="flex flex-wrap justify-between items-center container mx-auto">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Logo />
          </div>

          {/* Search Bar (Hidden on Small Screens) */}
          <div className="hidden lg:flex items-center justify-center  flex-1 ">
            <input
              type="text"
              placeholder="Search products..."
              className="w-[70%]  border border-gray-300 rounded-l-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button className="bg-green-500 text-white px-4 py-2 rounded-r-md hover:bg-green-700">
              Search
            </button>
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-4">
            <FiShoppingCart className="text-2xl text-gray-700 hover:text-green-500 transition" />
            <AiOutlineUser className="text-2xl text-gray-700 hover:text-green-500 transition" />
          </div>

          {/* Mobile Search Bar Button */}
        
        </div>

        {/* Mobile Search Bar (Appears on Small Screens) */}
        <div className="lg:hidden flex mt-4">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
            <div className="lg:hidden flex items-center border-2 border-green-500 h-full space-x-4">
            <button className="bg-green-500 text-white h-full px-3 py-2 rounded-md hover:bg-green-700">
              Search
            </button>
          </div> 
        </div>
      </header>

      {/* Hero Section */}
      <section
        className="flex flex-col lg:flex-row items-center bg-gradient-to-r from-[#fcdb78] to-[#e5be52] py-4  p-10 lg:px-28 lg:p-16"
        data-aos="fade-up"
      >
        {/* Left Content */}
        <div className="flex-1 space-y-4">
          <h1 className="text-5xl font-bold text-green-700">
            Organic Foods <br />
            <span className="text-gray-800">at your</span>{" "}
            <span className="text-black">Doorsteps</span>
          </h1>
          <div className="text-gray-700">
            <p>
              19K+ Variety of Products | 9K+ Happy Customers | 10+ Store
              Locations
            </p>
          </div>
          <div className="flex space-x-4">
            <button className="bg-green-500 text-white px-6 py-3 rounded-md font-semibold hover:bg-green-700">
              Start Shopping
            </button>
            <button className="bg-gray-100 text-gray-800 px-6 py-3 rounded-md font-semibold border border-gray-300 hover:bg-gray-200">
              Join Us
            </button>
          </div>
        </div>
        {/* Right Content */}
        <div className="flex-1" data-aos="zoom-in">
          <img
            src="/images/veg (2).png"
            alt="Shopping Cart with Vegetables"
            className="w-full h-auto object-contain max-h-[550px]"
          />
        </div>
      </section>
    </div>
  );
};

export default Hero;
