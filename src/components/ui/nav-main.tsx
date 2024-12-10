"use client"
import React, { useState, useEffect } from "react";
import { ChevronRight } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import Link from "next/link";


interface SubItem {
  title: string;
  url: string;
}

interface NavItem {
  title: string;
  url?: string;
  icon?: React.ElementType;
  items?: SubItem[];
}

interface NavMainProps {
  items: NavItem[];
}

export function NavMain({ items }: NavMainProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(
    () => parseInt(sessionStorage.getItem("openIndex") || "null") || null
  );

  useEffect(() => {
    if (openIndex !== null) {
      sessionStorage.setItem("openIndex", openIndex.toString());
    }
  }, [openIndex]);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, index: number) => {
    e.stopPropagation();
    setOpenIndex(index);
  };

  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map((item, index) => (
          <div key={item.title}>
            <SidebarMenuItem>
              {item.items ? (
                <Collapsible
                  asChild
                  open={openIndex === index}
                  onOpenChange={(open) => {
                    setOpenIndex(open ? index : null);
                  }}
                  className="group/collapsible"
                >
                  <SidebarMenuItem className="mt-3 text-base">
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton
                        className="text-base"
                        tooltip={item.title}
                      >
                        {item.icon && <item.icon />}
                        <span>{item.title}</span>
                        <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.items?.map((subItem) => (
                          <SidebarMenuSubItem key={subItem.title}>
                            <SidebarMenuSubButton
                              className="text-base mt-2"
                              asChild
                            >
                              <Link
                                href={subItem.url}
                                className="w-full"
                                onClick={(e) => handleLinkClick(e, index)}
                              >
                                <span>{subItem.title}</span>
                              </Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              ) : (
                <SidebarMenuButton
                  className="mt-3 text-base"
                  tooltip={item.title}
                >
                  {item.icon && <item.icon />}
                  <Link
                    href={item.url || "#"}
                    className="w-full"
                    onClick={() => setOpenIndex(null)}
                  >
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              )}
            </SidebarMenuItem>
          </div>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
