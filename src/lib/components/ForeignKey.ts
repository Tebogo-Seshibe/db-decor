import { State } from '../util/DatabaseState'

export function ForeignKey(referenceTable: string)
{
    return (target: Object, key: string | symbol) =>
    {
        const className = target.constructor.name
        const fieldName = key as string
        
        let tableInfo = State[className] ?? { }
        if (!tableInfo.table)
        {
            tableInfo.table = { }
        }

        let foreignKeys = tableInfo.table.foreignKeys ?? []
        if (foreignKeys.findIndex(x => x.field === fieldName) !== -1)
        {
            throw `Duplicate foreign key found.\nClass: ${className}\nField: ${fieldName}\nReference Table: ${referenceTable}`
        }

        foreignKeys.push({
            field: fieldName,
            table: referenceTable
        })

        tableInfo.table.foreignKeys = foreignKeys
        State[className] = tableInfo
    }
}
