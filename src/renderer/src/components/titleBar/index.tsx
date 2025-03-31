import { useEffect, useState } from "react"

import { Maximize, Minus, X } from "lucide-react"
import { cn } from "@renderer/utils/cn"

const ElectronTitleBar = () => {

  const [isMac, setIsMac] = useState(false)
  useEffect(() => {
    setIsMac(window.electron.process.platform === 'darwin')
  }, [])

  const handleMinimize = () => {
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
        "w-full flex items-center diy-title h-5",
        !isMac && "justify-end"
      )
    }>
      {
        !isMac && <div className="flex gap-2 items-center">
          <Minus className="size-4" onClick={handleMinimize} />
          <Maximize className="size-4" onClick={handleMaximize} />
          <X className="size-4" onClick={handleClose} />
        </div>
      }

    </div>

  )
}

export default ElectronTitleBar