import {
  ChevronRightIcon,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Link } from "react-router-dom"

import { asideData } from "@/utils/constantData"
import { useState } from "react"

export function AppSidebar() {

  const [activeSubItem, setActiveSubItem] = useState(null);

  const handleSubItemClick = (subItemTitle) => {
    setActiveSubItem(subItemTitle);
  };

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="flex flex-row diy-title">
        <div
          className="flex gap-2 items-center"
        >
          <div className="bg-amber-300 flex aspect-square size-8 items-center justify-center rounded-lg">
          </div>
          <div className="grid flex-1 text-left text-sm">
            <span className="truncate">欢迎您！</span>
            <span className="truncate text-xs">xxxxx</span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {asideData.navMain.map((item) => (
                <Collapsible
                  key={item.title}
                  asChild
                  defaultOpen={item.isActive}
                  className="group/collapsible"
                >
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton tooltip={item.title} className="cursor-pointer">
                        {item.icon && <item.icon />}
                        <span className="truncate">{item.title}</span>
                        <ChevronRightIcon className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.items?.map((subItem) => (
                          <SidebarMenuSubItem key={subItem.title}>
                            <SidebarMenuSubButton asChild>
                              <Link
                                to={subItem.url}
                                onClick={() => handleSubItemClick(subItem.title)}
                                className={activeSubItem === subItem.title ? "!bg-blue-500 !text-white" : ""}
                              >
                                <span className="truncate">{subItem.title}</span>
                              </Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="flex flex-row justify-between gap-0">
        <SidebarTrigger className="cursor-pointer" />
      </SidebarFooter>
    </Sidebar>
  )
}
