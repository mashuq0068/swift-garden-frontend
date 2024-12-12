"use client";
import dynamic from "next/dynamic";
import React from "react";
import { Poppins } from "next/font/google";
import { useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";

// Dynamically import SidebarLayout
const SidebarLayout = dynamic(
  () => import("@/components/Layout/SidebarLayout"),
  {
    ssr: false, // Disable Server-Side Rendering for this component if needed
  }
);
// Import Google Font
const PoppinsFont = Poppins({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});
export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const auth = useAppSelector((state) => state.auth);
  const router = useRouter();

  if (auth?.role !== "ADMIN") {
    router.push("/login");
    return null;
  }
  return (
    <section
      className={`${PoppinsFont.className} overflow-x-hidden md:overflow-x-visible m-0 p-0`}
    >
      <div className="overflow-x-hidden overflow-y-auto mx-auto">
        <SidebarLayout>{children}</SidebarLayout>
      </div>
    </section>
  );
}
