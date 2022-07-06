import request from '@/utils/request'

// 组织列表
export const getList = (params: any) =>
  request({
    url: `/system/orgs`,
    method: 'get',
    params
  })
// 添加组织
export const addUser = (data: any) =>
  request({
    url: `/system/orgs`,
    method: 'post',
    data
  })
// 编辑组织
export const edit = (data: any) =>
  request({
    url: `/system/orgs`,
    method: 'put',
    data
  })
// 获取组织详情
export const detail = (id: any) =>
  request({
    url: `/system/orgs/${id}`,
    method: 'get'
  })
// 删除
export const deletes = (params: any) =>
  request({
    url: `/system/orgs`,
    method: 'delete',
    params
  })
 // 修改组织状态
export const editStatus = (id: any) =>
request({
  url: `/system/orgs/disable/${id}`,
  method: 'put'
})
// 拖动排序
export const move = (data: any) =>
  request({
    url: `/system/orgs/move`,
    method: 'put',
    data
  })
