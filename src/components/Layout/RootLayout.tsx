"use client";
import ToastProvider from "@/lib/Toaster";
import { useAppSelector } from "@/redux/hooks";
import Image from "next/image";
import { ReactNode } from "react";

const RootLayout = ({ children }: { children: ReactNode }) => {
  const loading = useAppSelector((state) => state.loading.isLoading); // Assuming your state has `isLoading`

  console.log(loading); // To debug the loading state

  return (
    <div className="">
      <ToastProvider />
      <div
        aria-live="polite"
        aria-busy={loading}
        className={`animated ${loading ? "flex" : "hidden"} LoadingOverlay text-center center-full-screen`}
      >
        <Image
          alt="Loading spinner"
          className="progressCustom-logo"
          src={"/images/spin.svg"}
          width={80}
          height={80}
        />
      </div>
      {children} {/* This renders the content inside the layout */}
    </div>
  );
};

export default RootLayout;
