export enum IRole {
  Admin = 'admin',
  Editor = 'editor',
  Guest = 'guest',
}

export interface IRoute {
  path: string
  role: IRole[]
  component: string
  children?: IRoute[]
}

const routes: IRoute[] = [
  {
    path: '/home',
    role: [IRole.Admin, IRole.Editor],
    component: '/@/pages/home/index.tsx',
    children: [
      {
        path: '/home/user',
        role: [IRole.Admin],
        component: '/@/pages/user/index.tsx',
      },
    ]
  },
]

function deepFilterRoutes(role: IRole, routes: IRoute[]): IRoute[] {
  return routes
    .filter(v => v.role.includes(role))
    .map(v => ({
      ...v,
      children: v.children ? deepFilterRoutes(role, v.children) : undefined,
    }))
}

export async function getRoutes(role: IRole) {
  return deepFilterRoutes(role, routes)
}
