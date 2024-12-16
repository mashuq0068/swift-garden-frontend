"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAppSelector } from "@/redux/hooks";
import ToastProvider from "@/lib/Toaster";
import Image from "next/image";
import { ReactNode } from "react";

const RootLayout = ({ children }: { children: ReactNode }) => {
  const loading = useAppSelector((state) => state.loading.isLoading); // Loading state
  const auth = useAppSelector((state) => state.auth); // Auth state (contains role)
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Public pages: Login, Register, Home
    const publicPages = ["/", "/login", "/registration"];

    // If the current route is not public and the user has no role, redirect to login
    if (!publicPages.includes(pathname) && !auth?.role) {
      router.push("/login");
    }
  }, [auth?.role, pathname, router]);

  return (
    <div>
      <ToastProvider />
      {/* Loading Overlay */}
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

      {/* Children content */}
      {children}
    </div>
  );
};

export default RootLayout;
