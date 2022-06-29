export interface MenuTableData {
  code?: string
  createTime?: string
  createUser?: number
  describe?: string
  id?: number
  menuId?: number
  method?: string
  name?: string
  updateTime?: string
  updateUser?: number
  url?: string
}
// Generated by https://quicktype.io

export interface DsType {
  code?: string
  desc?: string
  val?: number
}

// 用户翻页
export interface PageListEntity {
  total?: string
  size?: string
  pages?: string
  page?: string
  current?: string
  records?: MenuTableData[]
}