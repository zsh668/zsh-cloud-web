import Vue from 'vue'
import Router, { RouteConfig } from 'vue-router'
import Layout from '@/layout/index.vue'

Vue.use(Router)

export const constantRoutes: RouteConfig[] = [
  {
    path: '/login',
    component: () =>
      import(/* webpackChunkName: "login" */ '@/pages/auth/login/index.vue'),
    meta: {
      hidden: true
    }
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () =>
          import(
            /* webpackChunkName: "dashboard" */ '@/pages/dashboard/index.vue'
            ),
        meta: {
          title: '首页',
          icon: 'dashboard'
        }
      }
    ],
    meta: { hidden: true }
  },
  {
    path: '/404',
    component: Layout,
    // component: () => import(/* webpackChunkName: "404" */ '@/pages/base/pages/error/404.vue'),
    children: [
      {
        path: '',
        component: () =>
          import(/* webpackChunkName: "dashboard" */ '@/pages/error/404.vue'),
        meta: {
          title: '404',
          icon: '404'
        }
      }
    ],
    meta: { hidden: true }
  }
]
export const asyncRoutes: RouteConfig[] = [
  {
    path: '/profile',
    component: Layout,
    // component: () => import(/* webpackChunkName: "404" */ '@/pages/base/pages/error/404.vue'),
    children: [
      {
        path: '',
        component: () =>
          import(/* webpackChunkName: "dashboard" */ '@/pages/profile/index.vue'),
        meta: {
          title: '个人中心',
          icon: 'profile'
        }
      }
    ],
    meta: { hidden: true }
  },
  {
    path: '/404',
    component: Layout,
    // component: () => import(/* webpackChunkName: "404" */ '@/pages/base/pages/error/404.vue'),
    children: [
      {
        path: '',
        component: () =>
          import(/* webpackChunkName: "dashboard" */ '@/pages/error/404.vue'),
        meta: {
          title: '404',
          icon: '404'
        }
      }
    ],
    meta: { hidden: true }
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', meta: { hidden: true } }
]

const createRouter = () => new Router({
  // mode: 'history',  // Disabled due to Github Pages doesn't support this, enable this if you need.
  scrollBehavior: (to, from, savedPosition) => {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  },
  base: process.env.BASE_URL,
  routes: constantRoutes
})

const router = createRouter()

const originalPush = Router.prototype.push
Router.prototype.push = function push(location: any) {
  // @ts-ignore
  return originalPush.call(this, location).catch((err: any) => err)
}

export function resetRouter() {
  const newRouter = createRouter();
  (router as any).matcher = (newRouter as any).matcher // reset router
}

export default router
