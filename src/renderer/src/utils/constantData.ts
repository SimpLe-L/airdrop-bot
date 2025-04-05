import {
  Laptop,
  Plug,
  Settings2,
  NotepadText,
} from "lucide-react"

export const asideData = {
  navMain: [
    {
      title: "账号管理",
      url: "#",
      icon: NotepadText,
      isActive: true,
      items: [
        {
          title: "Twitter",
          url: "/accounts/twitter",
        },
        {
          title: "Discord",
          url: "/accounts/discord",
        },
        {
          title: "Telegram",
          url: "/accounts/telegram",
        },
        {
          title: "Emails",
          url: "/accounts/emails",
        },
      ],
    },
    {
      title: "配置中心",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "通用配置",
          url: "/configs/common",
        },
        {
          title: "代理配置",
          url: "/configs/proxy",
        },
        {
          title: "钱包配置",
          url: "/configs/wallets",
        },
      ],
    },
    {
      title: "插件市场",
      url: "#",
      icon: Plug,
      items: [
        {
          title: "热门项目",
          url: "/plugins/hot",
        },
        {
          title: "自定义插件",
          url: "/plugins/diy",
        }
      ],
    },
    {
      title: "项目中心",
      url: "#",
      icon: Laptop,
      items: [
        {
          title: "挂机项目",
          url: "/projects/bot",
        },
        {
          title: "测试网",
          url: "/projects/testnet",
        },
        {
          title: "签到项目",
          url: "/projects/sign",
        }
      ],
    },
  ]
}