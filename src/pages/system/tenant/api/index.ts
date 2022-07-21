import request from '@/utils/request'

// 租户管理
export const getList = (params: any) =>
  request({
    url: `/system/tenants`,
    method: 'get',
    params
  })

// 租户列表
export const getTenantList = (params: any) =>
  request({
    url: `/system/tenants/list`,
    method: 'get',
    params
  })
// 添加租户
export const addTenant = (data: any) =>
  request({
    url: `/system/tenants`,
    method: 'post',
    data
  })
// 编辑租户
export const editTenant = (data: any) =>
  request({
    url: `/system/tenants`,
    method: 'put',
    data
  })
// 禁用租户
export const disableTenant = (id: any) =>
  request({
    url: `/system/tenants/disable/${id}`,
    method: 'put'
  })
// 获取租户详情
export const detailTenant = (id: any) =>
  request({
    url: `/system/tenants/${id}`,
    method: 'get'
  })
// 删除租户
export const deleteTenant = (data: any) =>
  request({
    url: `/system/tenants`,
    method: 'delete',
    data
  })
