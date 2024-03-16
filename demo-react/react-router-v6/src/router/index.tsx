import { createRoutesFromElements, createHashRouter, Route, Navigate, type RouteObject } from 'react-router-dom'
import { getRoutes, type IRoute, IRole } from './asyncRoutes'

const staticRoutes: RouteObject[] = [
  // {
  //   path: '/',
  //   lazy: () => import('/@/layouts/index.tsx'),
  // },
]

const fallbackRoutes: RouteObject[] = [
  {
    path: '/404',
    lazy: () => import('/@/pages/404/index.tsx'),
  },
  {
    path: '*',
    element: <Navigate to="/404" />
  },
]

function genRouteObject(routes: IRoute[]): RouteObject[] {
  return routes.map(v => ({
    path: v.path,
    lazy: () => import(v.component),
    children: v.children?.length ? genRouteObject(v.children) : undefined,
  }))
}

export async function createRoutes(role: IRole) {
  const asyncRoutes = await getRoutes(role)

  return [
    {
      path: '/',
      lazy: () => import('/@/layouts/index.tsx'),
      children: [
        ...staticRoutes,
        ...genRouteObject(asyncRoutes),
      ]
    },
    ...fallbackRoutes,
  ]
}

// 集中式管理路由
// const routes = createRoutesFromElements(
//   <Route path='/' lazy={() => import('/@/layouts/')}>
//     <Route path='' element={<Navigate to='/home' />}></Route>
//     <Route path='/home' lazy={() => import('/@/pages/home/index.tsx')}></Route>

//     {/* 404 page */}
//     <Route path='/404' lazy={() => import('/@/pages/404/index.tsx')}></Route>
//     <Route path='*' element={<Navigate to='/404' />}></Route>
//   </Route>
// )

const router = createHashRouter([
  {
    path: '/',
    lazy: () => import('/@/layouts/index.tsx'),
    children: [
      ...staticRoutes,
    ]
  },
  ...fallbackRoutes,
])

export { router }
