import { TableDetails } from "../components/Table"
import DatabaseState from "../../DatabaseState"

const PrimaryKey = () => {
    return (target: Object, key: string | symbol) => {
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

export default PrimaryKey
