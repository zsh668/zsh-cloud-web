import store from '@/store'
import JSEncrypt from 'jsencrypt'

// key
export function randomNum(len: number, radix: number) {
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split(
    ''
  )
  const uuid = []
  radix = radix || chars.length

  if (len) {
    // Compact form
    let i: number
    for (i = 0; i < len; i++) uuid[i] = chars[0 | (Math.random() * radix)]
  } else {
    // rfc4122, version 4 form
    let r: number

    // rfc4122 requires these characters
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-'
    uuid[14] = '4'

    // Fill in random data.  At i==19 set the high bits of clock sequence as
    // per rfc4122, sec. 4.1.5
    let k: number
    for (k = 0; k < 36; k++) {
      if (!uuid[k]) {
        r = 0 | (Math.random() * 16)
        uuid[k] = chars[k === 19 ? (r & 0x3) | 0x8 : r]
      }
    }
  }
  return uuid.join('') + new Date().getTime()
}

// 多余的字用省略号
export function ellipsis(value: any, num: any) {
  if (!value) return ''
  if (value.length > num) {
    return value.substring(0, num) + '...'
  }
  return value
}

// 筛选刷新数据
export function restData(value: any, obj: any, index: any) {
  obj.status = !obj.status
  value[index] = obj
}

// 随机数
export const randomWord = (randomFlag: boolean, min: number, max: number) => {
  let str = ''
  let range = min
  let arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']

  // 随机产生
  if (randomFlag) {
    range = Math.round(Math.random() * (max - min)) + min
  }
  for (let i = 0; i < range; i++) {
    let pos = Math.round(Math.random() * (arr.length - 1))
    str += arr[pos]
  }
  return str
}

// rsa+base64 加密
export const loginJseEncode = function(str: any) {
  let encryptor = new JSEncrypt()
  let rsaPublicKey = 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDOwmFtEk1oJxDU0NI4kVO0Jx0Xnt+Abx+JKGUzcRzPwjUkd5z9Ice5rh87CCmj0XjZ5pPac6TtA3f0v5FqiK/kjQY5XMLti4weJ4dcp1/q1O7PCYxRX8WgetGxwsjxGn+uoZOZkclN1PFS4wRnKEso6+G/e60QGB29cZoo4jZnZwIDAQAB'
  encryptor.setPublicKey(rsaPublicKey)
  return encryptor.encrypt(str)
}

// 按钮权限
export const hasPermission = (key: any) => {
  return store.state.user.permissionsList.indexOf(key) !== -1 || false
}

/**
 * 判断终端以及浏览器
 * userAgent string User-Agent信息
 */
export const readUserAgent = (ua: any) => {
  let data = {
    terminal: '',
    browser: '',
    terminalType: {
      trident: ua.indexOf('Trident') > -1, // IE内核
      presto: ua.indexOf('Presto') > -1, // opera内核
      webKit: ua.indexOf('AppleWebKit') > -1, // 苹果、谷歌内核
      gecko: ua.indexOf('Gecko') > -1 && ua.indexOf('KHTML') === -1, // 火狐内核
      mobile: !!ua.match(/AppleWebKit.*Mobile.*/), // 是否为移动终端
      ios: !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), // ios终端
      android: ua.indexOf('Android') > -1 || ua.indexOf('Adr') > -1, // android终端
      iPhone: ua.indexOf('iPhone') > -1, // 是否为iPhone或者QQHD浏览器
      iPad: ua.indexOf('iPad') > -1, // 是否iPad
      webApp: ua.indexOf('Safari') === -1, // 是否web应该程序，没有头部与底部
      weixin: ua.indexOf('MicroMessenger') > -1, // 是否微信 （2015-01-22新增）
      qq: ua.match(/\sQQ/i) === ' qq' // 是否QQ
    }
  }

  if (data.terminalType.ios || data.terminalType.iPhone || data.terminalType.iPad) {
    data.terminal = '苹果'
  } else if (data.terminalType.android) {
    data.terminal = '安卓'
  } else {
    data.terminal = 'PC'
  }
  if (/msie/i.test(ua) && !/opera/.test(ua)) {
    data.browser = 'IE'
  } else if (/firefox/i.test(ua)) {
    data.browser = 'Firefox'
  } else if (/chrome/i.test(ua) && /webkit/i.test(ua) && /mozilla/i.test(ua)) {
    data.browser = 'Chrome'
  } else if (/opera/i.test(ua)) {
    data.browser = 'Opera'
  } else if (/iPad/i.test(ua)) {
    data.browser = 'iPad'
  } else if (/webkit/i.test(ua) && !(/chrome/i.test(ua) && /webkit/i.test(ua) && /mozilla/i.test(ua))) {
    data.browser = 'Safari'
  } else {
    data.browser = '未知'
  }
  return data
}
