export interface MenuTableData {
  resourceCode?: string
  createTime?: string
  createUser?: number
  describe?: string
  id?: number
  menuId?: number
  method?: string
  resourceName?: string
  updateTime?: string
  updateUser?: number
  url?: string
}
// Generated by https://quicktype.io

// 用户翻页
export interface PageListEntity {
  total?: string
  size?: string
  pages?: string
  page?: string
  current?: string
  list?: MenuTableData[]
}
