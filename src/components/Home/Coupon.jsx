'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FaClock, FaDollarSign, FaSeedling } from 'react-icons/fa';

const Coupon = () => {
  const router = useRouter();

  useEffect(() => {
    AOS.init({ duration: 1000 }); // Initialize AOS with a 1s animation duration
  }, []);

  return (
    <section className="py-16 mt-12">
      <div className="max-w-7xl mx-auto px-6 sm:px-12">
        <h2
          className="text-3xl font-extrabold text-gray-800 text-center mb-12"
          data-aos="zoom-in"
        >
          Special <span className="text-green-600">Offers</span> Just for You!
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Offer 1 */}
          <div
            className="relative bg-white border border-gray-200 shadow-md rounded-xl p-8 hover:shadow-xl transition-shadow duration-300"
            data-aos="zoom-in"
          >
            <div className="absolute -top-8 left-4 text-green-600 bg-green-100 p-3 rounded-full">
              <FaClock size={24} />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mt-6">
              Buy Within 24 Hours!
            </h3>
            <p className="text-gray-600 mt-4">
              Get an additional
              <span className="text-green-600 font-bold px-2">10% off</span>
              when you purchase within the next 24 hours.
            </p>
            <button
              onClick={() => router.push('/shops')}
              className="mt-6 w-full bg-green-500 text-white py-3 px-4 rounded-lg hover:bg-green-600 transition-colors duration-300"
            >
              Find Shops
            </button>
          </div>

          {/* Offer 2 */}
          <div
            className="relative bg-white border border-gray-200 shadow-md rounded-xl p-8 hover:shadow-xl transition-shadow duration-300"
            data-aos="zoom-in"
          >
            <div className="absolute -top-8 left-4 text-green-600 bg-green-100 p-3 rounded-full">
              <FaDollarSign size={24} />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mt-6">
              Spend More, Save More
            </h3>
            <p className="text-gray-600 mt-4">
              Spend
              <span className="text-green-600 font-bold px-2">$100</span>
              or more and get
              <span className="text-green-600 font-bold px-2">15% off</span>
              instantly.
            </p>
            <button
              onClick={() => router.push('/products')}
              className="mt-6 w-full bg-green-500 text-white py-3 px-4 rounded-lg hover:bg-green-600 transition-colors duration-300"
            >
              Purchase Vegetables
            </button>
          </div>

          {/* Offer 3 */}
          <div
            className="relative bg-white border border-gray-200 shadow-md rounded-xl p-8 hover:shadow-xl transition-shadow duration-300"
            data-aos="zoom-in"
          >
            <div className="absolute -top-8 left-4 text-green-600 bg-green-100 p-3 rounded-full">
              <FaSeedling size={24} />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mt-6">
              Early Bird Discount
            </h3>
            <p className="text-gray-600 mt-4">
              Pre-order any gardening kit and receive a
              <span className="text-green-600 font-bold px-2">20% discount</span>.
            </p>
            <button
              onClick={() => router.push('/products')}
              className="mt-6 w-full bg-green-500 text-white py-3 px-4 rounded-lg hover:bg-green-600 transition-colors duration-300"
            >
              Pre-Order Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Coupon;
