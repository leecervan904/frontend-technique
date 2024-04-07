import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createHashRouter } from 'react-router-dom'

import { router, createRoutes } from '/@/router/index.tsx'
import { IRole } from './router/asyncRoutes'
import './designs/index.css'

export const InternalRouterContext = React.createContext<{
  role?: IRole,
  setRole?: (role: IRole) => void,
}>({})

function InternalRouterProvider() {
  const [role, setRole] = useState<IRole>(IRole.Guest)
  const [innerRouter, setRouter] = useState(router)

  useEffect(() => {
    if (role) {
      createRoutes(role).then(routes => {
        console.log(routes)
        setRouter(createHashRouter(routes))
      })
    }
  }, [role])

  return (
    <>
      <InternalRouterContext.Provider value={{ role, setRole }}>
        <RouterProvider router={innerRouter} />
      </InternalRouterContext.Provider>
    </>
  )
}



declare global {
  interface Window {
    // 是否存在无界
    __POWERED_BY_WUJIE__?: boolean;
    // 子应用mount函数
    __WUJIE_MOUNT: () => void;
    // 子应用unmount函数
    __WUJIE_UNMOUNT: () => void;
    // 子应用无界实例
    __WUJIE: { mount: () => void };
  }
}

if (window.__POWERED_BY_WUJIE__) {
  window.__WUJIE_MOUNT = () => {
    ReactDOM.createRoot(document.getElementById('root')!).render(
      // <RouterProvider router={router} />
      <InternalRouterProvider />
    )
  };
  window.__WUJIE_UNMOUNT = () => {
    // ReactDOM.unmountComponentAtNode(document.getElementById("root"));
  };
} else {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    // <RouterProvider router={router} />
    <InternalRouterProvider />
  )
}
