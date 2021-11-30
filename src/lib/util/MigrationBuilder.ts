import { DateColumnProperties } from "../columns/DateColumn"
import { FloatingPointColumnProperties, IntegerColumnProperties, NumberColumnProperties } from "../columns/NumberColumn"
import { StringColumnProperties } from "../columns/StringColumn"
import { Column, Table } from "./MigrationGenerator"

type MigrationColumn = 
    StringColumnProperties |
    DateColumnProperties |
    IntegerColumnProperties |
    FloatingPointColumnProperties

export class MigrationBuilder
{
    private _queries: Map<string, string[]> = new Map
    private _currentTable: string = ''
    private _query: string = ''

    public get Query(): string
    {
        return this._query
    }

    public createTable(tableName: string): MigrationBuilder
    {
        this._currentTable = tableName
        const table = `CREATE TABLE "${tableName}" (\n);`
        this._queries.set(this._currentTable, [table])
        return this
    }
    
    public alterTable(tableName: string): MigrationBuilder
    {
        this._currentTable = tableName
        this._queries.set(this._currentTable, [])
        return this
    }
    
    public dropTable(tableName: string): MigrationBuilder
    {
        this._currentTable = tableName
        this._queries.set(this._currentTable, [])
        return this
    }
    
    public createIndex(indexName: string): MigrationBuilder
    {
        return this
    }
    
    public alterIndex(indexName: string): MigrationBuilder
    {
        return this
    }
    
    public dropIndex(indexName: string): MigrationBuilder
    {
        return this
    }
    
    public addColumn(columnName: string, props: MigrationColumn): MigrationBuilder
    {
        const columns = this._queries.get(this._currentTable) ?? []
        const column = `\t${columnName} ${(<NumberColumnProperties>props).type}`

        this._queries.set(this._currentTable, [...columns, column])
        return this
    }

    public create(tableName: string, columnName: string)
    {
        const table = Table(tableName)
            .columns(
                Column(columnName).integer().primaryKey(),
                Column(columnName).integer(),
                Column(columnName).integer()
            )
    }
    public build(): void
    {

    }
}
