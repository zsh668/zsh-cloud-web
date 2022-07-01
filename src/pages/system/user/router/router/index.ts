import Layout from '@/layout/index.vue'
export default [
  {
    path: '/user',
    component: Layout,
    children: [
      {
        path: '',
        component: () =>
          import(
            /* webpackChunkName: "form" */ '@/pages/system/user/index.vue'
          ),
        meta: {
          title: '用户管理'
        }
      },
      {
        path: 'detail/:id',
        component: () =>
          import(
            /* webpackChunkName: "form" */ '@/pages/system/user/index.vue'
          ),
        meta: {
          title: '用户详情',
          hidden: true
        }
      }
    ]
  }
]
