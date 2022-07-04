import Layout from '@/layout/index.vue'
export default [
  {
    path: '/role',
    component: Layout,
    children: [
      {
        path: '',
        component: () =>
          import(/* webpackChunkName: "form" */ '@/pages/system/role/index.vue'),
        meta: {
          title: '角色管理',
          icon: 'role'
        }
      },
      {
        path: 'detail/:id',
        component: () =>
          import(/* webpackChunkName: "form" */ '@/pages/system/role/index.vue'),
        meta: {
          title: '角色详情',
          hidden: true
        }
      }
    ]
  }
]
