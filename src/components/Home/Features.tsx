"use client"
import { MdOutlineLocalShipping, MdOutlineVerified, MdOutlineVerifiedUser } from "react-icons/md";
import { GiFarmer } from "react-icons/gi";
import Aos from "aos";
import { useEffect } from "react";
import { CiDeliveryTruck } from "react-icons/ci";
import { IoIosCheckboxOutline } from "react-icons/io";
import { IoBagRemoveOutline } from "react-icons/io5";

const Features = () => {
    useEffect(() => {
        Aos.init({
          duration: 1000,
        });
    }, []);

    return (
        <div className="grid grid-cols-1 container mx-auto md:grid-cols-3 gap-8 pt-8 lg:pt-16 py-8 px-4">
            {/* Feature 1: Fresh From Farm */}
            <div
                className="flex flex-col justify-center items-center bg-white p-12 rounded-xl"
                data-aos="fade-right"
            >
                <IoBagRemoveOutline className="text-4xl mb-5 text-green-500 " />
                <div>
                    <h3 className="font-medium text-center text-xl text-gray-800">
                        Fresh From Farm
                    </h3>
                    <p className=" text-center text-gray-600 mt-2">
                        Enjoy the freshest produce directly sourced from local farmers.
                    </p>
                </div>
            </div>

            {/* Feature 2: Certified Organic */}
            <div
                className="flex flex-col justify-center items-center bg-white p-12 rounded-lg"
                data-aos="fade-up"
            >
               <IoIosCheckboxOutline className="text-4xl mb-5 font-thin text-green-500 " />
                <div>
                    <h3 className="font-medium text-center text-xl text-gray-800">
                        Certified Organic
                    </h3>
                    <p className=" text-center text-gray-600 mt-2">
                        All our products are certified organic to ensure premium quality.
                    </p>
                </div>
            </div>

            {/* Feature 3: Free Delivery */}
            <div
                className="flex flex-col justify-center items-center bg-white p-12 rounded-lg"
                data-aos="fade-left"
            >
                <CiDeliveryTruck className="text-5xl mb-5 text-green-500 " />
                <div>
                    <h3 className="font-medium text-center text-xl text-gray-800">
                        Free Delivery
                    </h3>
                    <p className=" text-center text-gray-600 mt-2">
                        Fast and reliable delivery, free on all orders above $50.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Features;
