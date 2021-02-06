import DatabaseState from "../../DatabaseState"

interface TableDetails
{
    name?: string
    primaryKey?: string
    foreignKeys?: {
        field: string,
        table: string
    }[]
}

function Table(name?: string)
{
    return (constructor: Function) => {
        const tableName = name ?? constructor.name
        let table: TableDetails | undefined = DatabaseState.tables.get(constructor.name)

        if (table && table.name === tableName)
        {
            throw `Table ${ tableName } already exists`
        }

        if (!table)
        {
            table = { }
        }

        table.name = tableName

        DatabaseState.tables.set(constructor.name, table)
    }
}

export {
    Table as default,
    TableDetails
}
