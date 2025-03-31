import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/sideBar"
import { Outlet } from "react-router-dom"
import ElectronTitleBar from "../titleBar"

const LayoutComp = () => {

  return (
    <div className="flex flex-col h-screen">
      <ElectronTitleBar />
      <div className="flex-1">
        <SidebarProvider>
          <AppSidebar />
          <main className="flex-1">
            <Outlet />
          </main>

        </SidebarProvider>
      </div>

    </div>

  )
}

export default LayoutComp