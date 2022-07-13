import request from '@/utils/request'

// 岗位列表
export const getPostList = (params: any) =>
  request({
    url: `/system/stations`,
    method: 'get',
    params
  })
// 添加岗位
export const addPost = (data: any) =>
  request({
    url: `/system/stations`,
    method: 'post',
    data
  })
// 编辑岗位
export const editPost = (data: any) =>
  request({
    url: `/system/stations`,
    method: 'put',
    data
  })
// 禁用岗位
export const disablePost = (id: any) =>
  request({
    url: `/system/stations/disable/${id}`,
    method: 'put'
  })
// 获取岗位详情
export const detailPost = (id: any) =>
  request({
    url: `/system/stations/${id}`,
    method: 'get'
  })
// 删除岗位
export const deletePost = (data: any) =>
  request({
    url: `/system/stations`,
    method: 'delete',
    data
  })
