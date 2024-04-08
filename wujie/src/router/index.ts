import { App } from 'vue'
import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

import { apps } from '../apps'

export interface IRouteMeta {
  path: string
  url: string
}

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('../views/Home.vue'),
  },
  ...apps.map(v => ({
    path: v.path,
    name: v.name,
    component: () => import('../views/MicroApp.vue'),
    meta: v,
  })),
]

export const router = createRouter({
  // history: createWebHistory(),
  history: createWebHashHistory(),
  routes,
})

export const setupRouter = (app: App) => {
  app.use(router)
}
