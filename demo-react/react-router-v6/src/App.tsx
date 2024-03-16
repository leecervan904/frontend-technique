import { Outlet } from 'react-router-dom'

import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { IRole } from './router/asyncRoutes'

import { InternalRouterContext } from './main'
import { useContext } from 'react'

function App() {
  const routerCtx = useContext(InternalRouterContext)

  const changeRole = (role: IRole) => {
    routerCtx.setRole?.(role)
  }

  return (
    <>
      <h2>Role: {routerCtx.role}</h2>

      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>

      <div style={{ display: 'flex', gap: '5px' }}>
        <button onClick={(() => changeRole(IRole.Admin))}>Admin</button>
        <button onClick={(() => changeRole(IRole.Editor))}>Editor</button>
        <button onClick={(() => changeRole(IRole.Guest))}>Guest</button>
      </div>

      <Outlet />
    </>
  )
}

export default App
