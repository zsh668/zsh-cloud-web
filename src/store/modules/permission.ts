import { VuexModule, Module, Mutation, Action, getModule } from 'vuex-module-decorators'
import { RouteConfig } from 'vue-router'
import { asyncRoutes, constantRoutes } from '@/router'
import Layout from '@/layout/index.vue'
import store from '@/store'

const hasPermission = (roles: string[], route: any) => {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

export const filterAsyncRoutes = (routes: RouteConfig[], roles: string[]) => {
  const res: RouteConfig[] = []
  routes.forEach(route => {
    const r = { ...route }
    if (hasPermission(roles, r)) {
      if (r.children) {
        r.children = filterAsyncRoutes(r.children, roles)
      }
      res.push(r)
    }
  })
  return res
}

export interface IPermissionState {
  routes: RouteConfig[]
  dynamicRoutes: RouteConfig[]
}

@Module({ dynamic: true, store, name: 'permission' })
class Permission extends VuexModule implements IPermissionState {
  public routes: RouteConfig[] = []
  public dynamicRoutes: RouteConfig[] = []

  @Mutation
  private SET_ROUTES(routes: RouteConfig[]) {
    this.routes = constantRoutes.concat(routes)
    this.dynamicRoutes = routes
  }

  @Action
  public GenerateRoutes(roles: string[]) {
    const routes = getRouters(roles, layzLoading)
    asyncRoutes.forEach(route => routes.push(route))
    let accessedRoutes
    if (roles.includes('admin')) {
      accessedRoutes = routes
    } else {
      accessedRoutes = filterAsyncRoutes(routes, roles)
    }
    this.SET_ROUTES(accessedRoutes)
  }
}

export const getRouters = (menu = [] as any, layzLoading: Function): any[] => {
  return menu.filter((route: any) => {
    const component = route.component
    if (component) {
      if (route.component === 'Layout') {
        route.component = Layout
      } else {
        route.component = layzLoading(route.component)
      }
      if (route.children && route.children.length) {
        route.children = getRouters(route.children, layzLoading)
      }
      return true
    }
  })
}

export const layzLoading = (path: string) => () => import(`@/pages/${path.replace(/^\/?/, '')}.vue`)

export const PermissionModule = getModule(Permission)
