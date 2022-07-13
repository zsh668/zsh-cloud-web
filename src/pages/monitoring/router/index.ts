import Layout from '@/layout/index.vue'
export default [
  {
    path: '/monitoring',
    component: Layout,
    redirect: '/log-login',
    meta: {
      title: '监控管理',
      icon: 'monitor'
    },
    children: [
      {
        path: 'log-login',
        component: () =>
          import(
            /* webpackChunkName: "form" */ '@/pages/monitoring/log-login/index.vue'
            ),
        meta: {
          title: '登录日志',
          icon: 'monitor'
        }
      },
      {
        path: 'log-operation',
        component: () =>
          import(
            /* webpackChunkName: "form" */ '@/pages/monitoring/log-operation/index.vue'
            ),
        meta: {
          title: '操作日志',
          icon: 'monitor'
          // icon: 'icon_menu_shenpi'
        }
      }
    ]
  }
]
