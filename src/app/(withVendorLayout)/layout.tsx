"use client"
import dynamic from "next/dynamic";
import React from "react";
import {Poppins} from "next/font/google";

// Dynamically import SidebarLayout
const SidebarLayout = dynamic(() => import("@/components/Layout/SidebarLayout"), {
  ssr: false, //Disable SSR if this component should only render on the client-side
});
const PoppinsFont = Poppins({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});
export default function VendorLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className={`${PoppinsFont.className} overflow-x-hidden md:overflow-x-visible m-0 p-0`}>
      <div className="overflow-x-hidden overflow-y-auto mx-auto">
        <SidebarLayout>{children}</SidebarLayout>
      </div>
    </section>
  );
}
