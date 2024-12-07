import type { Metadata } from "next";
import { Work_Sans } from "next/font/google";
import "./globals.css";
import "aos/dist/aos.css";
import { FiShoppingCart } from "react-icons/fi";
import { AiOutlineUser } from "react-icons/ai";
import Logo from "@/components/Home/Logo";

// Import Google Font
const spinnaker = Work_Sans({
  weight: "500",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Swift Garden",
  description: "Buy Fresh and Organic Vegetables",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="overflow-x-hidden m-0 p-0">
      <body
        className={`${spinnaker.className}  bg-gray-100 overflow-x-hidden overflow-y-hidden mx-auto`}
      >
       <div style={{position:'sticky' , top:'0px' ,zIndex:'999'}} className="z-50 bg-gray-100">
       <header className="py-6 px-4 container mx-auto ">
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
              <button className="bg-green-500 border-green-500 border text-white px-4 py-2 rounded-r-md hover:bg-green-500">
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
              <button className="bg-green-500 text-white h-full px-3 py-2 rounded-md hover:bg-green-500">
                Search
              </button>
            </div>
          </div>
        </header>
       </div>
        <div>{children}</div>
      </body>
    </html>
  );
}
