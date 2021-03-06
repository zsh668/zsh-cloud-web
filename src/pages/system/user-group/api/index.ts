import request from '@/utils/request'

// 用户组管理
export const getUserGroupList = (params: any) =>
  request({
    url: `/system/userGroups`,
    method: 'get',
    params
  })
// 添加用户组
export const addUserGroup = (data: any) =>
  request({
    url: `/system/userGroups`,
    method: 'post',
    data
  })
// 编辑用户组
export const editUserGroup = (data: any) =>
  request({
    url: `/system/userGroups`,
    method: 'put',
    data
  })
// 禁用用户组
export const disableUserGroup = (id: any) =>
  request({
    url: `/system/userGroups/disable/${id}`,
    method: 'put'
  })
// 获取用户组详情
export const detailUserGroup = (id: any) =>
  request({
    url: `/system/userGroups/${id}`,
    method: 'get'
  })
// 删除用户组
export const delUserGroup = (data: any) =>
  request({
    url: `/system/userGroups`,
    method: 'delete',
    data
  })
// 分配用户
export const addGroupUser = (data: any) =>
  request({
    url: `/system/userGroups/user`,
    method: 'put',
    data
  })
