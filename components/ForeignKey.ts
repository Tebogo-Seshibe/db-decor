import DatabaseState from "../DatabaseState"
import { TableDetails } from "./Table"

const ForeignKey = (referenceTable: string) => {
    return (target: Object, key: string | symbol) => {
        const tableName = target.constructor.name
        let table: TableDetails | undefined = DatabaseState.tables.get(tableName)

        if (!table)
        {
            table =  { }
        }

        table.foreignKeys = [
            ...table.foreignKeys ?? [],
            {
                field: key as string,
                table: referenceTable
            }
        ]

        DatabaseState.tables.set(target.constructor.name, table)
    }

}

export default ForeignKey