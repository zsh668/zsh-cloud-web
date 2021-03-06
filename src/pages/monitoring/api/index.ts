import request from '@/utils/request'

// 日志列表
export const getList = (params: any) =>
  request({
    url: `/system/loginLogs`,
    method: 'get',
    params
  })
// 操作日志列表
export const getOperationList = (params: any) =>
request({
  url: `/system/optLogs`,
  method: 'get',
  params
})
// 操作日志详情
export const detailOperation = (id: any) =>
request({
  url: `/system/optLogs/${id}`,
  method: 'get'
})
