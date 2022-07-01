import axios from 'axios'
import { Message } from 'element-ui'
import { getToken, getTenant } from '@/utils/cookies'
import { UserModule } from '@/store/modules/user'
import router from '@/router'

const service = axios.create({
  baseURL: '/api',
  timeout: 60000
})
// Request interceptors
// @ts-ignore
service.interceptors.request.use(
  config => {
    const token = getToken()
    const time: any = new Date()
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token
      config.headers['tenant_id'] = getTenant()
    }
    if (config.method === 'get') {
      config.params = {
        ...config.params,
        ts: Date.parse(time) / 1000
      }
    }
    return config
  },
  (error: any) => {
    Promise.reject(error)
  }
)

// Response interceptors
service.interceptors.response.use(
  response => {
    const status = response.status
    const res = response.data
    if (status !== 200) {
      Message({
        message: res.message || 'Error',
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      // token失效
      if (res.code === 524 || res.code === 525 || res.code === 526 || res.code === 527) {
        UserModule.LogOut()
        router.replace({ path: '/login' })
      }
      const msg = res.msg ? res.msg.slice(0, 4) : ''
      if (res.code === 401 && msg === '权限不足') {
        response.data.msg = msg
      }
      // console.log('response', response)
      // eslint-disable-next-line no-prototype-builtins
      if (response.data.hasOwnProperty('isSuccess')) {
        if (!response.data.isSuccess) {
          Message({
          message: response.data.msg || '操作失败！',
          type: 'error',
          duration: 2 * 1000
        })
        }
      }
      return response
    }
  },
  error => {
    Message({
      message: '网络出错啦！',
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
