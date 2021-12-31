import { Delete, IQueryTranslator, Select, Update } from "./QueryTranslator"

export class PostgreSQLTranslator implements IQueryTranslator
{
    where(schema: string, table: string): string {
        throw new Error("Method not implemented.")
    }
    
    public createTable(schema: string, table: string): string
    {
        return ''
    }

    public alterTable(schema: string, table: string): string
    {
        return ''
    }

    public dropTable(schema: string, table: string): string
    {
        return ''
    }

    public primaryKey(column: string): string
    {
        return ''
    }

    public foreignKey(column: string, referenceTable: string, referenceColumn: string): string
    {
        return ''
    }

    public number(columnName: string, nullable: boolean): string
    {
        return ''
    }

    public string(columnName: string, length: number | string, nullable: boolean): string
    {
        return ''
    }

    public date(columnName: string): string
    {
        return ''
    }

    public select(schema: string, table: string, ...columns: Select[]): string
    {
        return [
            'SELECT ',
                columns.map(c => `    "${ schema }"."${ table }"."${ c.name }" AS "${ c.alias ?? c.name }"`).join(',\n'),
            `FROM "${ schema }"."${ table }"`
        ].join('\n')
    }

    public update(schema: string, table: string, ...columns: Update[]): string
    {
        return ''
    }

    public delete(schema: string, table: string, ...columns: Delete[]): string
    {
        return ''
        // return [
        //     `DELETE FROM "${ schema }"."${ table }"`,
        //     ...[column, ...columns].
        // ].join('\n')
    }

    public createIndex(schema: string, table: string, column: string, name: string): string
    {
        return `CREATE INDEX "${ schema }"."${ name }" ON "${ table }"("${ column }");`
    }

    public alterIndex(schema: string, oldName: string, newName: string): string
    {
        return `ALTER INDEX "${ schema }"."${ oldName }" RENAME TO "${ newName }";`
    }

    public dropIndex(schema: string, name: string): string
    {
        return `DROP INDEX "${ schema }"."${ name }";`
    }
}
