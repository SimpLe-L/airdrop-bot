// import { SidebarProvider } from "@/components/ui/sidebar"
// import { AppSidebar } from "@/components/sideBar"
import { Outlet } from "react-router-dom"
import ElectronTitleBar from "../titleBar"

import React from 'react';
import { Flex, Layout } from 'antd';
import Aside from "../aside";

const { Sider, Content } = Layout;

const contentStyle: React.CSSProperties = {
  textAlign: 'center',
  height: '100%',
  color: '#fff',
  // backgroundColor: '#0958d9',
  padding: '20px',
};

const siderStyle: React.CSSProperties = {
  textAlign: 'center',
  height: '100%',
  color: '#fff',
  backgroundColor: '#ffffff',
  // borderRight: '1px solid #adadad',
};

const layoutStyle = {
  // borderRadius: 8,
  overflow: 'hidden',
  width: '100%',
  maxWidth: '100%',
  height: '100%',
};
const LayoutComp = () => {

  return (

    <div className="flex flex-col h-screen">
      <ElectronTitleBar />
      <Flex style={layoutStyle}>
        <Sider width="200" style={siderStyle}>
          <Aside />
        </Sider>
        <Content style={contentStyle}>
          <Outlet />
        </Content>
      </Flex>

    </div>

    // <div className="flex flex-col h-screen">
    //   <Outlet />
    //   {/* <ElectronTitleBar /> */}
    //   <div className="flex-1">
    //     {/* <SidebarProvider>
    //       <AppSidebar />
    //       <main className="flex-1">
    //         <Outlet />
    //       </main>

    //     </SidebarProvider> */}
    //   </div>

    // </div>

  )
}

export default LayoutComp