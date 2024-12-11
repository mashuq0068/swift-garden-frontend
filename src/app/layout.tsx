"use client";
import { Work_Sans } from "next/font/google";
import "./globals.css";
import "aos/dist/aos.css";

// Import Google Font
const workSans = Work_Sans({
  weight: "500",
  subsets: ["latin"],
  display: "swap",
});
// src/app/layout.metadata.ts
// import type { Metadata } from "next";
import ReduxProvider from "@/redux/ReduxProvider";
import Navbar from "@/components/Shared/Navbar";
import RootLayout from "@/components/Layout/RootLayout";

// export const metadata: Metadata = {
//   title: "Swift Garden",
//   description: "Buy Fresh and Organic Vegetables",
// };

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="overflow-x-hidden md:overflow-x-visible m-0 p-0">
      <body
        className={`${workSans.className} bg-gray-100 overflow-x-hidden overflow-y-auto mx-auto`}
      >
        <ReduxProvider>
          <header className="bg-gray-100 w-full sticky top-0 z-50 drop-shadow-sm shadow-sm">
            <Navbar />
          </header>
          <RootLayout>{children}</RootLayout>
        </ReduxProvider>
      </body>
    </html>
  );
}
