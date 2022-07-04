import request from '@/utils/request'

// 角色列表
export const getDataList = (params: any) =>
  request({
    url: `/system/roles/list`,
    method: 'get',
    params
  })
// 角色列表
export const getRoleList = (params: any) =>
  request({
    url: `/system/roles`,
    method: 'get',
    params
  })
// 添加角色
export const addRole = (data: any) =>
  request({
    url: `/system/roles`,
    method: 'post',
    data
  })
// 编辑角色
export const editRole = (data: any) =>
  request({
    url: `/system/roles`,
    method: 'put',
    data
  })
// 禁用角色
export const disableRole = (id: any) =>
  request({
    url: `/system/roles/disable/${id}`,
    method: 'put'
  })
// 获取角色详情
export const detailRole = (id: any) =>
  request({
    url: `/system/roles/${id}`,
    method: 'get'
  })
// 删除角色
export const deleteRole = (params: any) =>
  request({
    url: `/system/roles`,
    method: 'delete',
    params
  })

// 获取全部角色
export const getAllList = (params: any) =>
  request({
    url: `/system/roles/findAllRoles `,
    method: 'get',
    params
  })
// 查询角色拥有的资源id集合
export const getRoleIdList = (id: any) =>
  request({
    url: `/system/roles/authority/${id}`,
    method: 'get'
  })

// 给角色配置权限 保存
export const setRole = (data: any) =>
  request({
    url: `/system/roles/authority`,
    method: 'put',
    data
  })
