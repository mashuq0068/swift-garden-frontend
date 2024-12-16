/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import  {
  AdminItems,
  UserItems,
  VendorItems,
} from "./SidebarItems";
import { TeamSwitcher } from "../ui/team-switcher";
import { NavMain } from "../ui/nav-main";
import { useAppSelector } from "@/redux/hooks";

// Define the props type for AppSidebar
interface AppSidebarProps {
  collapsible?: "icon" | "offcanvas" | "none" | undefined;
  [key: string]: any; // For additional props passed down to Sidebar
}

const AppSidebar: React.FC<AppSidebarProps> = (props) => {
  const auth = useAppSelector((state) => state.auth);
const sidebarItems =
    auth.role === "VENDOR"
      ? VendorItems.navMain
      : auth.role === "ADMIN"
      ? AdminItems.navMain
      : UserItems.navMain;
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={sidebarItems} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
};

export default AppSidebar;
