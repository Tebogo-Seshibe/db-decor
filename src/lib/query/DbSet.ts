import { QueryBuilder } from './QueryBuilder'
import pg from 'pg'
import { Class } from '../util/Context'
import { PostgreSQLTranslator } from './PostgreSQLTranslator'
import { type } from 'os'
import { State, Context } from '..'
import { Entity, Entry, Header } from './QueryTranslator'

class Student
{
    id!: number
    name!: string
    dob!: Date
    alive!: boolean
}
type Accessor<T> = T[keyof T]

let s: Accessor<Student>

export class DbSet<T> extends QueryBuilder<T>
{
    constructor(type: Class<T>, context: Context)
    {
        super(type, context.client!, context.queryTranslator)
    }

    public async Add(...entries: T[]): Promise<void>
    {
        const client = this.client as pg.Client
        await client.connect()

        const { table, columns } = State[this.type.name]!
        const primaryKey = table.primaryKey!
        const headers: any[] = []

        columns.forEach(column =>
        {
            if (column.field !== primaryKey)
            {
                headers.push({
                    name: column.columnName,
                    type: mapType(column.columnType),
                    field: column.field
                })
            }
        })

        const values: Entity[] = entries.map((entry: any) => {
            return headers.reduce((obj, header) =>
            {
                const field = header['field']
                obj[header['name']] = entry[field]

                return obj
            }, {});
        })

        await client.query(
            this.translator.add(
                table.schema!,
                table.name!,
                headers as Header[],
                ...values
            )
        )

        await client.end()
    }
    
    public async Find(...ids: any[]): Promise<void>
    {

    }
    
    public async Update(...entries: T[]): Promise<void>
    {

    }
    
    public async Remove(...entries: Required<T>[]): Promise<void>
    public async Remove(...ids: any[]): Promise<void>
    public async Remove(...ids: (any | Required<T>)[]): Promise<void>
    {

    }
}

function mapType(columnType: string) {
    switch (columnType)
    {
        case 'number': return 'integer'
        case 'string': return 'varchar'
    }
}
