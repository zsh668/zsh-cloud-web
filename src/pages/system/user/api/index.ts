import request from '@/utils/request'

// 用户管理
export const getList = (params: any) =>
  request({
    url: `/system/users`,
    method: 'get',
    params
  })

// 根据条件获取用户列表
export const getUserList = (params: any) =>
  request({
    url: `/system/users`,
    method: 'get',
    params
  })
// 添加用户
export const addUser = (data: any) =>
  request({
    url: `/system/users`,
    method: 'post',
    data
  })
// 编辑用户
export const editUser = (data: any) =>
  request({
    url: `/system/users`,
    method: 'put',
    data
  })
// 禁用用户
export const disableUser = (id: any) =>
  request({
    url: `/system/users/disable/${id}`,
    method: 'put'
  })
// 用户分配角色
export const editUserRole = (data: any) =>
  request({
    url: `/system/users/role`,
    method: 'put',
    data
  })
// 获取用户详情
export const detailUser = (id: any) =>
  request({
    url: `/system/users/${id}`,
    method: 'get'
  })
// 删除用户
export const delUser = (data: any) =>
  request({
    url: `/system/users`,
    method: 'delete',
    data
  })
// 重置密码
export const resetUser = (data: any) =>
  request({
    url: `/system/users/reset`,
    method: 'put',
    data
  })

// 获取用户关系
export const userHierarchy = (id: any) =>
  request({
    url: `/system/users/hierarchy/${id}`,
    method: 'get'
  })
