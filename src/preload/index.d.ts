import { ElectronAPI } from '@electron-toolkit/preload'

declare global {
  interface IElectronAPI extends ElectronAPI {
    platform: string
  }
  interface Window {
    electron: ElectronAPI
    api: unknown
  }
}
