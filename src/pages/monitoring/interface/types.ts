export interface TableData {
  account?: string
  browser?: string
  browserVersion?: string
  createdTime?: string
  createdBy?: string
  description?: string
  id?: number
  location?: string
  loginDate?: string
  operatingSystem?: string
  requestIp?: string
  ua?: string
  userId?: number
  userName?: string
}

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
  list?: TableData[]
}
