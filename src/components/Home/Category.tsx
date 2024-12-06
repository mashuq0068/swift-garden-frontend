"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import { useEffect } from "react";
import Aos from "aos";

const categories = [
  {
    id: 1,
    name: "Leafy Greens",
    image: "/images/veg-1.png", // Replace with actual image URL
    bgColor: "bg-green-0",
  },
  {
    id: 2,
    name: "Root Vegetables",
    image: "/images/veg-2.png", // Replace with actual image URL
    bgColor: "bg-orange-0",
  },
  {
    id: 3,
    name: "Cruciferous Vegetables",
    image: "/images/veg-3.png", // Replace with actual image URL
    bgColor: "bg-yellow-0",
  },
  {
    id: 4,
    name: "Gourds & Squashes",
    image: "/images/veg-4.png", // Replace with actual image URL
    bgColor: "bg-cyan-0",
  },
  {
    id: 5,
    name: "Allium Vegetables",
    image: "/images/veg-5.png", // Replace with actual image URL
    bgColor: "bg-blue-0",
  },
  {
    id: 6,
    name: "Nightshades",
    image: "/images/veg-6.png", // Replace with actual image URL
    bgColor: "bg-green-0",
  },
];

const Category = () => {
  useEffect(() => {
    Aos.init({
      duration: 1000,
    });
  }, []);

  return (
    <section className="lg:p-0 p-4">
    <div className="mt-5">
      <Swiper
        modules={[Pagination, Navigation, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        autoplay={true}
        breakpoints={{
          768: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 4,
          },
        }}
        loop={true}
        className="category-swiper mx-auto"
      >
        {categories.map((category) => (
          <SwiperSlide key={category.id}>
            <div
              data-aos="fade-up"
              className={`mt-5 flex border rounded-xl border-green-300 cursor-pointer items-center flex-col gap-4 justify-center p-8  shadow-md transform transition-all duration-300 hover:scale-105 hover:shadow-xl ${category.bgColor}`}
            >
              {/* Category Image */}
              <div className="relative">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-44 h-36 object-contain"
                />
                <span className="absolute top-1 right-1 bg-green-500 text-white text-xs px-2 py-1 rounded-full shadow-md">
                  New
                </span>
              </div>
              {/* Category Name */}
              <h3 className="font-medium text-xl text-center mt-4 text-gray-800">
                {category.name}
              </h3>
              {/* Subtext or Button */}
              <button className="mt-2  bg-green-500 text-white py-1 px-4 rounded-lg hover:bg-green-600 transition">
                Explore
              </button>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  </section>
  
  );
};

export default Category;
