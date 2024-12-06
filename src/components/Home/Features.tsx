"use client"
import { MdOutlineLocalShipping, MdOutlineVerified } from "react-icons/md";
import { GiFarmer } from "react-icons/gi";
import Aos from "aos";
import { useEffect } from "react";

const Features = () => {
    useEffect(() => {
        Aos.init({
          duration: 1000,
        });
      }, []);
  return (
    <div className="grid grid-cols-1 lg:-mt-20 md:grid-cols-3 gap-8 mb-12 py-8 px-4">
      {/* Feature 1: Fresh From Farm */}
      <div
        className="flex flex-col justify-center items-center bg-orange-200 p-8 rounded-xl shadow-lg"
        data-aos="fade-right"
      >
        <GiFarmer className="text-5xl mb-5 text-green-600" />
        <div>
          <h3 className="font-bold text-center text-xl text-gray-800">
            Fresh From Farm
          </h3>
          <p className="text-sm text-center text-gray-600 mt-2">
            Enjoy the freshest produce directly sourced from local farmers.
          </p>
        </div>
      </div>
 
      {/* Feature 2: Certified Organic */}
      <div
        className="flex flex-col justify-center items-center bg-green-200 p-8 rounded-lg shadow-lg"
        data-aos="fade-up"
      >
        <MdOutlineVerified className="text-5xl mb-5 text-green-600" />
        <div>
          <h3 className="font-bold text-center text-xl text-gray-800">
            Certified Organic
          </h3>
          <p className="text-sm text-center text-gray-600 mt-2">
            All our products are certified organic to ensure premium quality.
          </p>
        </div>
      </div>

      {/* Feature 3: Free Delivery */}
      <div
        className="flex flex-col justify-center items-center bg-blue-200 p-8 rounded-lg shadow-lg"
        data-aos="fade-left"
      >
        <MdOutlineLocalShipping className="text-5xl mb-5 text-green-600" />
        <div>
          <h3 className="font-bold text-center text-xl text-gray-800">
            Free Delivery
          </h3>
          <p className="text-sm text-center text-gray-600 mt-2">
            Fast and reliable delivery, free on all orders above $50.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Features;
