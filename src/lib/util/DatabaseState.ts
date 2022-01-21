import { ColumnProperties, ColumnType } from '../columns/columnType'

export type NameCasing = 'pascal' | 'camel' | 'snake' | 'kebab'

export interface TableProperties
{
    name?: string
}

export interface ReferenceDetails
{
    field?: string
    table?: string
    name?: string
}

export interface TableDetails extends TableProperties
{
    schema?: string
    primaryKey?: string
    foreignKeys?: ReferenceDetails[],
    indexes?: ReferenceDetails[]
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
    columns: Map<string, ColumnDetails>
}

export type DatabaseState = Record<string, TableInfo>

export const State: DatabaseState = { }
