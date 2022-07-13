// 列表
export interface IArticleData {
  createdTime?: string
  createdBy?: string
  describe?: string
  id?: number
  groupName?: string
  roleId?: number
  roleName?: string
  status?: boolean
  updatedTime?: string
  updatedBy?: string
  userCount?: number
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
  createdTime?: string
  createdBy?: string
  describe?: string
  id?: number
  name?: string
  roleId?: string
  roleName?: string
  status?: boolean
  updatedTime?: string
  updatedBy?: string
  userCount?: number
  userIds?: []
  userNames?: []
}
