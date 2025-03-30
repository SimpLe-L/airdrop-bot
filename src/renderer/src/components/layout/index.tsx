import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/sideBar"
import { Outlet } from "react-router-dom"
import ElectronTitleBar from "../titleBar"

const LayoutComp = () => {

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex-1 flex flex-col p-2">
        <ElectronTitleBar />
        <Outlet />
      </main>
    </SidebarProvider>
  )
}

export default LayoutComp