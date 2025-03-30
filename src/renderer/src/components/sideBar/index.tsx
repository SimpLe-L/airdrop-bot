import {
  AudioWaveform,
  BookOpen,
  Bot,
  ChevronRightIcon,
  Command,
  GalleryVerticalEnd,
  Settings2,
  SquareTerminal,
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

const data = {
  navMain: [
    {
      title: "账号管理",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Twitter",
          url: "#",
        },
        {
          title: "Discord",
          url: "#",
        },
        {
          title: "Telegram",
          url: "#",
        },
        {
          title: "邮箱",
          url: "#",
        },
      ],
    },
    {
      title: "配置中心",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "通用配置",
          url: "#",
        },
        {
          title: "代理配置",
          url: "#",
        },
        {
          title: "钱包配置",
          url: "#",
        },
      ],
    },
    {
      title: "插件市场",
      url: "#",
      icon: BookOpen,
      // items: [
      //   {
      //     title: "挂机项目",
      //     url: "#",
      //   },
      //   {
      //     title: "测试网",
      //     url: "#",
      //   },
      //   {
      //     title: "签到项目",
      //     url: "#",
      //   }
      // ],
    },
    {
      title: "项目中心",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "挂机项目",
          url: "#",
        },
        {
          title: "测试网",
          url: "#",
        },
        {
          title: "签到项目",
          url: "#",
        }
      ],
    },
  ]
}

export function AppSidebar() {
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
              {data.navMain.map((item) => (
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
                        <span>{item.title}</span>
                        {
                          item.items && <ChevronRightIcon className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                        }
                        {/* <ChevronRightIcon className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" /> */}
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.items?.map((subItem) => (
                          <SidebarMenuSubItem key={subItem.title}>
                            <SidebarMenuSubButton asChild>
                              <a href={subItem.url}>
                                <span>{subItem.title}</span>
                              </a>
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
      <SidebarFooter className="flex flex-row justify-end gap-0">
        <SidebarTrigger className="cursor-pointer" />
      </SidebarFooter>
    </Sidebar>
  )
}
