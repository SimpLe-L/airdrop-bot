import { ApiOutlined, FileTextOutlined, FundProjectionScreenOutlined, SettingOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { useNavigate } from 'react-router-dom';

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
  {
    key: 'accounts',
    label: '账号管理',
    icon: <FileTextOutlined />,
    children: [
      {
        key: "/accounts/twitter",
        label: "Twitter",
      },
      {
        key: "/accounts/discord",
        label: "Discord",
      },
      {
        key: "/accounts/telegram",
        label: "Telegram",
      },
      {
        key: "/accounts/emails",
        label: "Emails",
      },
    ],
  },
  {
    key: 'configs',
    label: '配置中心',
    icon: <SettingOutlined />,
    children: [
      {
        key: "/configs/common",
        label: "通用配置",
      },
      {
        key: "/configs/proxy",
        label: "代理配置",
      },
      {
        key: "/configs/wallets",
        label: "钱包配置",
      },
    ],
  },
  // {
  //   type: 'divider',
  // },
  {
    key: 'plugins',
    label: '插件市场',
    icon: <ApiOutlined />,
    children: [
      {
        key: "/plugins/hot",
        label: "热门项目",
      },
      {
        key: "/plugins/diy",
        label: "自定义插件",
      }
    ],
  },
  {
    key: 'projects',
    label: '项目中心',
    icon: <FundProjectionScreenOutlined />,
    children: [
      {
        key: "/projects/bot",
        label: "挂机项目",
      },
      {
        key: "/projects/testnet",
        label: "测试网",
      },
      {
        key: "/projects/sign",
        label: "签到项目",
      }
    ],
  },
];

const Aside = () => {

  const navigate = useNavigate();

  const onClick: MenuProps['onClick'] = (e) => {
    navigate(e.key);
  };

  return (
    <Menu
      onClick={onClick}
      style={{ width: 200, height: "100%" }}
      defaultSelectedKeys={['1']}
      defaultOpenKeys={['accounts']}
      mode="inline"
      items={items}
    />
  );
};

export default Aside;