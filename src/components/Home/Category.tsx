/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import { useEffect } from "react";
import Aos from "aos";
import { useGetCategoriesQuery } from "@/redux/features/category/category.api";

const categories = [
  {
    id: 1,
    name: "Leafy Greens",
    image: "/images/veg-1.png", 
   
  },
  {
    id: 2,
    name: "Root Vegetables",
    image: "/images/veg-2.png", 
   
  },
  {
    id: 3,
    name: "Cruciferous",
    image: "/images/veg-3.png", 
   
  },
  {
    id: 4,
    name: "Gourds & Squashes",
    image: "/images/veg-4.png", 
  
  },
  {
    id: 5,
    name: "Allium Vegetables",
    image: "/images/veg-5.png", 
  
  },
  {
    id: 6,
    name: "Nightshades",
    image: "/images/veg-6.png", 
   
  },
];

const Category = () => {
  const {data} = useGetCategoriesQuery(undefined)
  useEffect(() => {
    Aos.init({
      duration: 1000,
    });
  }, []);

  return (
    <section className=" container mx-auto  mt-0 p-4">
      {/* <h2 className="text-4xl  mb-8 font-bold">
        Top <span className=" text-green-500">Categories</span>
      </h2> */}
      <div className="">
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
          {data?.data?.map((category: any) => (
            <SwiperSlide key={category.id}>
              <div
                data-aos="fade-up"
                className={`mt-5 flex bg-white  cursor-pointer items-center flex-col gap-4 justify-center p-8 rounded-xl  shadow-md transform transition-all duration-300 hover:scale-105 hover:shadow-xl ${category.bgColor}`}
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
                <h3 className="font-medium text-xl text-center text-gray-800">
                  {category.name}
                </h3>
                {/* Subtext or Button */}
                <button className="mt-2  bg-green-500 text-white py-1 px-4 rounded-lg hover:bg-green-500 transition">
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
