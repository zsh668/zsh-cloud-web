import request from '@/utils/request'
// 路由
export const getRouterData = (data: any) =>
  request({
    url: `/system/menus/router`,
    method: 'get',
    data
  })
// 上传图片
export const getVisit = (data: any) =>
  request({
    url: `/file/attachment/upload`,
    method: 'post',
    data
  })
// 查询附件
export const getAttachment = (data: any) =>
  request({
    url: `/file/attachment`,
    method: 'post',
    data
  })
// 导入
export const exportExle = (data: any) =>
  request({
    url: `/system/users/importExcel`,
    method: 'post',
    responseType: 'blob',
    data
  })
// 角色
export const getRepelRole = (params: any) =>
  request({
    url: `/system/roles/list`,
    method: 'get',
    params
  })
// 组织
export const getAllTree = (params: any) =>
  request({
    url: `/system/orgs/tree`,
    method: 'get',
    params
  })
// 岗位
export const getAllStation = (params: any) =>
  request({
    url: `/system/stations`,
    method: 'get',
    params
  })

 // 获取个人信息及权限
 export const getUserAndPermissionInfo = () =>
  request({
    url: `/system/users/current`,
    method: 'get'
  })

 // 修改个人信息
 export const editUserInfo = (data: any) =>
  request({
    url: `/system/users/current`,
    method: 'put',
    data
  })
