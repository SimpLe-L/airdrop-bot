// import { useEffect, useState } from "react"

import { Maximize, Minus, X } from "lucide-react"

const ElectronTitleBar = () => {

  // const [isMac, setIsMac] = useState(false)
  // useEffect(() => {
  //   setIsMac(window.electron.process.platform === 'darwin')
  // }, [])

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
    <div className="w-full flex gap-2 justify-end diy-title">
      <Minus className="size-4" onClick={handleMinimize} />
      <Maximize className="size-4" onClick={handleMaximize} />
      <X className="size-4" onClick={handleClose} />
    </div>
  )
}

export default ElectronTitleBar