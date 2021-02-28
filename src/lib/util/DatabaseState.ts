export type NameCasing = 'pascal' | 'camel' | 'snake' | 'kebab'

export interface TableProperties
{
    textCasing?: NameCasing
}
export interface TableDetails
{
    name?: string
    primaryKey?: string
    foreignKeys?: {
        field: string,
        table: string
    }[],
    textCasing?: NameCasing
}

export type ColumnType = 'number' | 'string' | 'date'

export interface ColumnProperties
{
    nullable?: boolean
}

export interface ColumnDetails
{
    field: string
    columnName: string
    columnType: ColumnType
    properties: ColumnProperties
}

export interface TableInfo
{
    table: TableDetails
    columns: Record<string, ColumnDetails>
}

export type DatabaseState = Record<string, TableInfo>

export const State: DatabaseState = { }
