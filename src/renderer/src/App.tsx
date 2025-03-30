// import Versions from './components/Versions'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { routes } from './router'
function App(): JSX.Element {
  // const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')
  const router = createBrowserRouter(routes);
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  )
}

export default App
