"use client"
import dynamic from "next/dynamic";
import React from "react";

// Dynamically import SidebarLayout
const SidebarLayout = dynamic(() => import("@/components/Layout/SidebarLayout"), {
  ssr: false, // Disable Server-Side Rendering for this component if needed
});

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="overflow-x-hidden md:overflow-x-visible m-0 p-0">
      <div className="overflow-x-hidden overflow-y-auto mx-auto">
        <SidebarLayout>{children}</SidebarLayout>
      </div>
    </section>
  );
}
