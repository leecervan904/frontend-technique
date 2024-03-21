import React from 'react'
import { Outlet } from 'react-router-dom'

export const Component: React.FC = () => {
  return (
    <>
      <h2>home page</h2>

      <Outlet />
    </>
  )
}
