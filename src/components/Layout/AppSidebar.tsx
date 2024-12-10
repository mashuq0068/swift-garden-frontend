/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import SidebarItems from "./SidebarItems";
import { TeamSwitcher } from "../ui/team-switcher";
import { NavMain } from "../ui/nav-main";

// Define the props type for AppSidebar
interface AppSidebarProps {
  collapsible?: "icon" | "offcanvas" | "none" | undefined;
  [key: string]: any; // For additional props passed down to Sidebar
}

const AppSidebar: React.FC<AppSidebarProps> = (props) => {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher/>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={SidebarItems.navMain} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
};

export default AppSidebar;
