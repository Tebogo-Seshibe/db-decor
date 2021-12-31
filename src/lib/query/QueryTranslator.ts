import { TableDetails } from "../util/DatabaseState";

export interface Create
{
    name: string
    type: string
    
}

export interface Select
{
    name: string
    alias?: string
}

export interface Update
{
    name: string
    value: any
}

export interface Delete
{
    name: string
    cascade: boolean
}

export interface IQueryTranslator
{
    createTable(schema: string, table: string): string
    alterTable(schema: string, table: string): string
    dropTable(schema: string, table: string): string
    
    primaryKey(column: string): string
    foreignKey(column: string, referenceTable: string, referenceColumn: string): string
    number(columnName: string, nullable: boolean): string
    string(columnName: string, length: number | string, nullable: boolean): string
    date(columnName: string): string

    select(schema: string, table: string, ...columns: Select[]): string
    where(schema: string, table: string): string
    update(schema: string, table: string, ...columns: Update[]): string
    delete(schema: string, table: string, ...columns: Delete[]): string

    createIndex(schema: string, table: string, column: string, name: string): string
    alterIndex(schema: string, table: string, column: string, name: string): string
    dropIndex(schema: string, table: string, column: string, name: string): string
}
