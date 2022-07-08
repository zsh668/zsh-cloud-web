export interface ITableData {
    abbreviation?: string
    createdTime?: string
    createdBy?: string
    describe?: string
    id?: number
    name?: string
    status?: boolean
    updatedTime?: string
    updatedBy?: string
}

export interface IPostTable {
    current?: number
    pages?: number
    list?: ITableData[]
    searchCount?: boolean
    size?: number
    total?: number
}
