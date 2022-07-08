// 列表
export interface IArticleData {
  account?: string
  avatar?: string
  createdTime?: string
  createdBy?: string
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
  roleIds?: any[]
  gender?: number
  stationId?: number
  superior?: string
  stationName?: string
  status?: boolean
  updatedTime?: string
  updatedBy?: string
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
  roleIds?:[]
  gender?: number
  stationId?: string
  workDescribe?: string
}
