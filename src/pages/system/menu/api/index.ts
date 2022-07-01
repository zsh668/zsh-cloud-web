import request from '@/utils/request'

// 菜单列表
export const getList = (params: any) =>
  request({
    url: `/system/menus`,
    method: 'get',
    params
  })
// 添加菜单
export const addMenu = (data: any) =>
  request({
    url: `/system/menus`,
    method: 'post',
    data
  })
// 编辑菜单
export const editMenu = (data: any) =>
  request({
    url: `/system/menus/${data.id}`,
    method: 'put',
    data
  })
// 获取菜单详情
export const detailMenu = (id: any) =>
  request({
    url: `/system/menus/${id}`,
    method: 'get'
  })
// 删除菜单
export const deleteMenu = (params: any) =>
  request({
    url: `/system/menus`,
    method: 'delete',
    params
  })
  // 获取菜单
export const getAllMenu = (params:any) =>
request({
  url: `/system/menus/tree`,
  method: 'get',
  params
})
  // 获取菜单按钮
  export const getMenuResource = (params:any) =>
  request({
    url: `/system/menus/resource/tree`,
    method: 'get',
    params
  })

   // 修改组织状态
export const editStatus = (data: any) =>
request({
  url: `/system/menus/enable`,
  method: 'put',
  data
})
// 拖动排序
export const move = (data: any) =>
  request({
    url: `/system/menus/move`,
    method: 'put',
    data
  })

// 菜单资源
export const getmenuList = (params: any) =>
  request({
    url: `/system/resource/page`,
    method: 'get',
    params
  })
  // 添加菜单
export const addJurisdiction = (data: any) =>
request({
  url: `/system/resource`,
  method: 'post',
  data
})
// 编辑菜单
export const editJurisdiction = (data: any) =>
request({
  url: `/system/resource`,
  method: 'put',
  data
})
// 获取菜单详情
export const detailJurisdiction = (id: any) =>
request({
  url: `/system/resource/${id}`,
  method: 'get'
})
// 删除菜单
export const deleteJurisdiction = (params: any) =>
request({
  url: `/system/resource`,
  method: 'delete',
  params
})