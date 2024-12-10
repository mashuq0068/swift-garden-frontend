"use client";

import { Work_Sans } from "next/font/google";
import "./globals.css";
import "aos/dist/aos.css";
import Navbar from "@/components/Shared/Navbar";
import ToastProvider from "@/lib/Toaster";
import Image from "next/image";
import useLoadingStore from "@/store/loadingStore";

// Import Google Font
const spinnaker = Work_Sans({
  weight: "500",
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { loading } = useLoadingStore();
  return (
    <html lang="en" className="overflow-x-hidden md:overflow-x-visible m-0 p-0">
      <body
        className={`${spinnaker.className}  bg-gray-100 overflow-x-hidden overflow-y-auto mx-auto`}
      >
        <ToastProvider />
        <div
          aria-live="polite"
          aria-busy={loading}
          className={`animated ${
            loading ? "flex" : "hidden"
          } LoadingOverlay text-center center-full-screen`}
        >
          <Image
            alt="Loading spinner"
            className="progressCustom-logo"
            src={"/images/spin.svg"}
            width={80}
            height={80}
          />
        </div>
        <header className="bg-gray-100 w-full sticky top-0 z-50 drop-shadow-sm shadow-sm">
          <Navbar />
        </header>
        {children}
      </body>
    </html>
  );
}
