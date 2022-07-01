import Layout from '@/layout/index.vue'
export default [
  {
    path: '/user-group',
    component: Layout,
    children: [
      {
        path: '',
        component: () =>
          import(
            /* webpackChunkName: "form" */ '@/pages/system/user-group/index.vue'
          ),
        meta: {
          title: '用户组管理'
        }
      },
      {
        path: 'detail/:id',
        component: () =>
          import(
            /* webpackChunkName: "form" */ '@/pages/system/user-group/index.vue'
          ),
        meta: {
          title: '用户组详情',
          hidden: true
        }
      }
    ]
  }
]
