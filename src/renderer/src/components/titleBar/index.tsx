import { useEffect, useState } from "react"

import { Maximize, Minus, X } from "lucide-react"
import { cn } from "@renderer/utils/cn"

const ElectronTitleBar = () => {

  const [isMac, setIsMac] = useState(false)
  useEffect(() => {
    setIsMac(window.electron.process.platform === 'darwin')
  }, [])

  const handleMinimize = () => {
    console.log("eeeeee")
    window.electron.ipcRenderer.send('window-minimize')
  }

  const handleClose = () => {
    window.electron.ipcRenderer.send('window-close')
  }

  const handleMaximize = () => {
    window.electron.ipcRenderer.send('window-maximize')

  }

  return (

    <div className={
      cn(
        "w-full flex items-center diy-title h-6 bg-sidebar",
        !isMac && "justify-end pr-2"
      )
    }>
      {
        !isMac && <div className="flex gap-2 items-center no-drag">
          <Minus className="size-4 cursor-pointer" onClick={handleMinimize} />
          <Maximize className="size-4 cursor-pointer" onClick={handleMaximize} />
          <X className="size-4 cursor-pointer" onClick={handleClose} />
        </div>
      }

    </div>

  )
}

export default ElectronTitleBar