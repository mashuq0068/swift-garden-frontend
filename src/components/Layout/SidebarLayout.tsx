"use client"
import React, { ReactNode } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import TopBar from "./TopBar";
import AppSidebar from "./AppSidebar";


interface SidebarLayoutProps {
  children: ReactNode; 
}

const SidebarLayout: React.FC<SidebarLayoutProps> = ({ children }) => {

  return (
    <SidebarProvider className="min-h-[100vh]">
      <AppSidebar />
      <main className="w-full max-w-full overflow-x-hidden bg-green-50">
        <TopBar />

        <div className="p-4 lg:px-12 lg:py-0">{children}</div>
      </main>
    </SidebarProvider>
  );
};

export default SidebarLayout;
