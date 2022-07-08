export interface RoleTableData {
  roleCode?:string
  createdTime?:string
  createUser?:number
  describe?: string
  dsType?: DsType
  id?: number
  roleName?: string
  readonly?: boolean
  repel?: number
  status?: boolean
  updatedTime?: string
  updatedBy?: string
}

export interface DsType {
  name?: string
  text?: string
  code?: number
}

// 用户翻页
export interface PageListEntity {
  total?: string
  size?: string
  pages?: string
  page?: string
  current?: string
  list?: RoleTableData[]
}
