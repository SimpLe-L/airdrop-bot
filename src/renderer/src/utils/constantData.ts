// import {
//   Laptop,
//   Plug,
//   Settings2,
//   NotepadText,
// } from "lucide-react"

    // key: 'sub2',
    // label: 'Navigation Two',
    // icon: <AppstoreOutlined />,
    // children: [
    //   { key: '5', label: 'Option 5' },
    //   { key: '6', label: 'Option 6' },
    //   {
    //     key: 'sub3',
    //     label: 'Submenu',
    //     children: [
    //       { key: '7', label: 'Option 7' },
    //       { key: '8', label: 'Option 8' },
    //     ],
    //   },
    // ],

export const asideData = [
    {
      key: "accounts",
      label: "账号管理",
      icon: NotepadText,
      children: [
        {
          label: "Twitter",
          url: "/accounts/twitter",
        },
        {
          label: "Discord",
          url: "/accounts/discord",
        },
        {
          label: "Telegram",
          url: "/accounts/telegram",
        },
        {
          label: "Emails",
          url: "/accounts/emails",
        },
      ],
    },
    {
      label: "配置中心",
      icon: Settings2,
      items: [
        {
          label: "通用配置",
          url: "/configs/common",
        },
        {
          label: "代理配置",
          url: "/configs/proxy",
        },
        {
          label: "钱包配置",
          url: "/configs/wallets",
        },
      ],
    },
    {
      label: "插件市场",
      icon: Plug,
      items: [
        {
          label: "热门项目",
          url: "/plugins/hot",
        },
        {
          label: "自定义插件",
          url: "/plugins/diy",
        }
      ],
    },
    {
      label: "项目中心",
      icon: Laptop,
      items: [
        {
          label: "挂机项目",
          url: "/projects/bot",
        },
        {
          label: "测试网",
          url: "/projects/testnet",
        },
        {
          label: "签到项目",
          url: "/projects/sign",
        }
      ],
    },
  ]