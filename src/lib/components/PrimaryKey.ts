import { State, TableDetails } from "../util/DatabaseState"

export function PrimaryKey()
{
    return function(target: Object, key: string | symbol)
    {
        const className = target.constructor.name
        const fieldName = key as string
        
        let tableInfo = State[className] ?? { }
        if (!tableInfo.table)
        {
            tableInfo.table = { }
        }

        let tableDetails: TableDetails = {
            ...tableInfo.table, 
            primaryKey: fieldName
        }

        tableInfo.table = tableDetails
        State[className] = tableInfo
    }
}
