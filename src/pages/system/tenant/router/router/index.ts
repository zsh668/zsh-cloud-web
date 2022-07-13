import Layout from '@/layout/index.vue'

export default [
  {
    path: '/tenant',
    component: Layout,
    children: [
      {
        path: '',
        component: () =>
          import(/* webpackChunkName: "form" */ '@/pages/system/tenant/index.vue'),
        meta: {
          title: '租户管理',
          icon: 'tenant'
        }
      },
      {
        path: 'detail/:id',
        component: () =>
          import(/* webpackChunkName: "form" */ '@/pages/system/tenant/index.vue'),
        meta: {
          title: '租户详情',
          hidden: true
        }
      }
    ]
  }
]
