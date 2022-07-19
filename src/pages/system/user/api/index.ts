import request from '@/utils/request'

// 用户管理
export const getList = (params: any) =>
  request({
    url: `/system/users`,
    method: 'get',
    params
  })

// 下载用户
export const getDownList = (params: any) =>
  request({
    url: `/system/users`,
    method: 'get',
    params,
    responseType: 'blob'
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
// 修改密码
export const changePassword = (data: any) =>
  request({
    url: `/system/users/password`,
    method: 'put',
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

// 获取用户关系
export const editAvatar = (data: any) =>
  request({
    url: `/system/users/avatar`,
    method: 'PUT',
    data
  })

// 下载模板
export const downTemplateFile = () =>
  request({
    url: `/system/users/importTemplateFile`,
    method: 'get',
    responseType: 'blob'
  })
