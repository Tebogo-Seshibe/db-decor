import { State, TableDetails } from '../util/DatabaseState'

export function PrimaryKey(): PropertyDecorator
{
    return function (target: Object, key: string | symbol): void
    {
        const className = target.constructor.name
        const fieldName = key as string
        
        const tableInfo = State[className] ?? { }
        if (!tableInfo.table)
        {
            tableInfo.table = { }
        }

        const tableDetails: TableDetails =
        {
            ...tableInfo.table, 
            primaryKey: fieldName
        }

        tableInfo.table = tableDetails
        State[className] = tableInfo
    }
}
