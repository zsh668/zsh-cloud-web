import request from '@/utils/request'

// 获取验证码
export const getCode = (data: any) =>
  request({
    url: '/auth/captcha' + `?key=${data}`,
    method: 'get',
    responseType: 'arraybuffer',
    data
  })
// 登录
export const login = (data: any) =>
  request({
    url: '/auth/oauth/token',
    method: 'post',
    params: {
      username: data.account,
      password: data.password,
      code: data.code,
      key: data.key,
      client_id: 'client',
      client_secret: '123456',
      grant_type: 'password',
      scope: 'all'
    },
    data
  })
// 修改密码
export const alterPassword = (data: any) =>
  request({
    url: '/system/users/password',
    method: 'put',
    data
  })
export const loginInfo = (data: any) =>
  request({
    url: 'auth/loginLog/login/' +
      `${data.name}?` +
      '&' +
      `description=${data.description}`,
    method: 'get',
    data
  })
