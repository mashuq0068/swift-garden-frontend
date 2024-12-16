"use client";
import Aos from "aos";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Hero = () => {
  const router = useRouter()
  useEffect(() => {
    Aos.init({
      duration: 1000,
    });
  }, []);
  return (
    <div>
      {/* Header */}

      {/* Hero Section */}
      <section
        className="flex flex-col lg:flex-row  items-center lg:gap-36 gap-12 justify-center bg-white py-12 lg:py-4  p-10 lg:px-28 lg:p-16"
        data-aos="fade-up"
      >
        {/* Left Content */}
        <div className=" space-y-4">
          <h1 className="text-5xl font-bold text-green-500">
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
            <button onClick={() => router.push('/shops')} className="bg-green-500 text-white px-6 py-3 rounded-md font-medium hover:bg-green-500">
              Start Shopping
            </button>
            <button onClick={() => router.push('/registration')} className="bg-gray-100 text-gray-800 px-6 py-3 rounded-md font-medium border border-gray-300 hover:bg-gray-200">
              Join Us
            </button>
          </div>
        </div>
        {/* Right Content */}
        <div  data-aos="zoom-in">
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
