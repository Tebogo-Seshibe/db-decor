import { TableDetails } from "../components/Table"
import "../util/DatabaseState"

export function PrimaryKey()
{
    return function(target: Object, key: string | symbol)
    {
        const tableName = target.constructor.name
        let table: TableDetails | undefined = DatabaseState.tables.get(tableName)

        if (!table)
        {
            table =  { }
        }

        table.primaryKey = key as string

        DatabaseState.tables.set(target.constructor.name, table)
    }
}
