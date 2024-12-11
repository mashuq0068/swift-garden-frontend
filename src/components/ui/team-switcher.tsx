import React from "react";
import { ChevronsUpDown } from "lucide-react";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  // useSidebar,
} from "@/components/ui/sidebar";
import { FaLeaf } from "react-icons/fa";

// Define the team object type
interface Team {
  name: string;
  plan: string;
  logo: string; // Path to the team's logo
}

// Dummy team data
const teams: Team[] = [
  {
    name: "Swift Garden",
    plan: "Control Panel",
    logo: "", // Replace with actual path to your logo
  },
];

export const TeamSwitcher: React.FC = () => {
  // const { isMobile } = useSidebar();
  const activeTeam = teams[0]; // Static active team since no dropdown is needed

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
        >
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg text-sidebar-primary-foreground">
           
              {/* Icon Section */}
              <div className="flex items-center space-x-1">
                <FaLeaf className="text-green-500 text-2xl" />
              </div>
           
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">{activeTeam.name}</span>
            <span className="truncate text-xs">{activeTeam.plan}</span>
          </div>
          <ChevronsUpDown className="ml-auto lg:block hidden" />
          <SidebarTrigger className="-ml-1 lg:hidden block" />
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};
