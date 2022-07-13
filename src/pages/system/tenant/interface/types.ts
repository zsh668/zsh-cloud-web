export interface ITenantTableData {
    createdTime?:string
    createdBy?: string
    describe?: string
    id?: number
    tenantCode?: string
    tenantName?: string
    status?: boolean
    updatedTime?: string
    updateUser?:number
}

export interface ITenantTable {
    current?: number
    pages?: number
    list?: ITenantTableData[]
    searchCount?: boolean
    size?: number
    total?: number
}
