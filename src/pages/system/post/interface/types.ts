export interface IPostTableData {
    createdTime?:string
    createdBy?: string
    describe?: string
    id?: number
    name?: string
    orgId?: number
    orgName?: string
    status?: boolean
    updatedTime?: string
    updateUser?:number
}

export interface IPostTable {
    current?: number
    pages?: number
    list?: IPostTableData[]
    searchCount?: boolean
    size?: number
    total?: number
}
