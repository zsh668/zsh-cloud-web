// 列表
export interface IArticleData {
  account?: string
  avatar?: string
  createTime?: string
  createUser?: number
  email?: string
  id?: string
  lastLoginTime?: string
  mobile?: string
  userName?: string
  orgId?: string
  orgName?: string
  password?: string
  passwordErrorLastTime?: string
  passwordErrorNum?: number
  passwordExpireTime?: string
  roleNames?: any[]
  roles?: any[]
  sex?: number
  stationId?: number
  superior?: string
  stationName?: string
  status?: boolean
  updateTime?: string
  updateUser?: number
  workDescribe?: string
}
// 用户翻页
export interface IManageUserPageListEntity {
  total?: string
  size?: string
  pages?: string
  current?: string
  list?: IArticleData[]
}

export interface Sex {
  code: string
  desc: string
}
// 表单
export interface IUserFreezeRequest {
  account?: string
  avatar?: string
  email?: string
  id?: string
  mobile?: string
  userName?: string
  orgId?: string
  superior?: string
  password?: string
  roles?:[]
  sex?: number
  stationId?: string
  status?: boolean
  workDescribe?: string
}
