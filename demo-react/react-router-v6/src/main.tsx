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

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <RouterProvider router={router} />
  <InternalRouterProvider />
)
